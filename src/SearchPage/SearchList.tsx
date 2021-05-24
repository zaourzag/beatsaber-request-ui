import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Translation } from "react-i18next";
import styled from "styled-components";
import LayoutRow from "../common/LayoutRow";
import { SongListDocsItem } from "./SearchPage";

// Trimmed LowerCase
const stringTLC = (s: string) => s.toLocaleLowerCase().trim();

const autoMappers = ["Beat Sage", "Deep Saber"];
const autoMappersTLC = autoMappers.map(stringTLC);

const CopyButton = styled.button`
  outline: none;
  box-sizing: border-box;
  height: 40px;
  padding: 10px 10px;
  margin-left: 12px;
  border-radius: 20px;
  border: 0px solid transparent;
  cursor: pointer;

  font-weight: normal;
  font-size: 0.8rem;
  color: var(--text);
  background-color: var(--background-input);
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`;

const isCreatedByAutomapper = (docData: SongListDocsItem) => {
  const songNameTLC = stringTLC(docData.metadata.songName);
  const songAuthorNameTLC = stringTLC(docData.metadata.songAuthorName);
  const levelAuthorNameTLC = stringTLC(docData.metadata.levelAuthorName);

  return autoMappersTLC.some((autoMapperTLC) => {
    return (
      songNameTLC.includes(autoMapperTLC) ||
      songAuthorNameTLC.includes(autoMapperTLC) ||
      levelAuthorNameTLC.includes(autoMapperTLC)
    );
  });
};

const Item = (docData: SongListDocsItem) => {
  const [copied, setCopied] = React.useState(false);
  const coverURL = `https://beatsaver.com${docData.coverURL}`;
  const allVotes = docData.stats.upVotes + docData.stats.downVotes;
  const percentVotes = ~~((docData.stats.upVotes / allVotes) * 1000) / 10;

  const shouldBeHidden = isCreatedByAutomapper(docData);

  if (shouldBeHidden) return <></>;

  return (
    <LayoutRow hasBorderBottom>
      <div className="doc__container">
        <div className="doc__cover">
          <img src={coverURL} />
        </div>
        <div className="doc__mapdata">
          <div className="doc__name">{docData.metadata.songName}</div>
          <div className="doc__author">{docData.metadata.songAuthorName}</div>
          <div className="doc__mapper">{docData.metadata.levelAuthorName}</div>
        </div>
        <div className="doc__saverdata">
          <div className="doc__key">{docData.key} 🔑</div>
          <div className="doc__downloads">{docData.stats.downloads} 💾</div>
        </div>
        <div className="doc__scoredata">
          <div className="doc__score--upvotes">{docData.stats.upVotes} 👍</div>
          <div className="doc__score--downvotes">{docData.stats.downVotes} 👎</div>
          <div className="doc__score--percentvotes">{percentVotes}% 💯</div>
        </div>
        <div className="doc__cta">
          {!copied ? (
            <CopyToClipboard text={`!bsr ${docData.key}`} onCopy={() => setCopied(true)}>
              <CopyButton>
                <Translation>{(t) => t("Copy")}</Translation> 📋
              </CopyButton>
            </CopyToClipboard>
          ) : (
            <div>
              <Translation>{(t) => t("Paste on chat")}</Translation>
              <br />
              <Translation>{(t) => t("to make request")}</Translation>
            </div>
          )}
        </div>
      </div>
    </LayoutRow>
  );
};

export default function ItemList({ documentList }: { documentList: SongListDocsItem[] }): JSX.Element {
  const renderedItems = documentList.map(Item);

  return (
    <div className="SearchList__container">
      <LayoutRow style={{ marginTop: "-45px" }} />
      {renderedItems}
      <LayoutRow />
    </div>
  );
}