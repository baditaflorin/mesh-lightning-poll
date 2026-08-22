import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-lightning-poll",
  description: "A one-choice-per-peer live poll.",
  accentHex: "#2864b6",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
