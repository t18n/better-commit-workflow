const { commitScopes } = require("./.config/commit-scopes");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": async (ctx) => [2, "always", commitScopes(ctx)],
    "wip-rule": [2, "always"],
    "subject-case": [
      2,
      "always", 
      ["sentence-case", "start-case", "pascal-case", "upper-case"]
    ],
  },
  helpUrl: `
  Commit messages must follow conventional commit format:
  https://www.conventionalcommits.org/en/v1.0.0/#summary
      type(optional-cope): subject
      
      [optional body]
  * To bypass pre-commit hooks run 'git commit --no-verify'
  >>> Use "yarn commit" for interactive prompt. <<< 
  `,
  plugins: [
    {
      rules: {
        "wip-rule": ({ subject }) => {
          if ((subject && subject.includes("WIP")) || subject.includes("wip")) {
            return [false, "Work In Progress (WIP) commits are not allowed"];
          }
          return [true];
        },
      },
    },
  ],
};
