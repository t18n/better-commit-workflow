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
  plugins: ["@semantic-release/changelog", "@semantic-release/git"],
};
