/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["main"],
  plugins: [
   "@semantic-release/changelog",
   "@semantic-release/git",
  ]
};
