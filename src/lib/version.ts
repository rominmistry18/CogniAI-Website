export const APP_VERSION = "1.0.0";
export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
export const BUILD_TIMESTAMP = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP || new Date().toISOString();
export const GIT_COMMIT = process.env.NEXT_PUBLIC_GIT_COMMIT || "local";

export function getVersionInfo() {
  return {
    version: APP_VERSION,
    buildId: BUILD_ID,
    buildTimestamp: BUILD_TIMESTAMP,
    gitCommit: GIT_COMMIT,
  };
}
