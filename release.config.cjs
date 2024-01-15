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
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "docs", "scope": "README", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },
          { "scope": "no-release", "release": "patch" }
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ] // Keep it after artifact generation
  ]
};
