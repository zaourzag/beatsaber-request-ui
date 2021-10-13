import { BroadcasterConfiguration } from "./BroadcasterConfiguration";
import { extractPanelConfig } from "./extractPanelConfig";
import { extractScoreSaberConfig } from "./extractScoreSaberConfig";

function broadcasterConfigFromString(broadcasterString: string): BroadcasterConfiguration {
  return {
    panelPosition: extractPanelConfig(broadcasterString),
    scoreSaber: extractScoreSaberConfig(broadcasterString)
  };
}

export { broadcasterConfigFromString };
