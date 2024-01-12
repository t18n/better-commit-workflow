/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    {
      name: "main",
      prerelease: false,
    },
    {
      name: "next",
      prerelease: true,
    },
  ],
  debug: true,
  tagFormat: "v${version}",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    // "@semantic-release/changelog",
    "@semantic-release/git",
    // "@semantic-release/github",
    // "@semantic-release/npm",
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "set-version ${nextRelease.version}",
        "verifyReleaseCmd": "echo \"VERSION=${nextRelease.version}\" > RELEASE.env"
      }
    ],
  ]
};
