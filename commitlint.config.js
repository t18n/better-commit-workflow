const { commitScopes } = require("./.config/commit-scopes");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": async (ctx) => [2, "always", commitScopes(ctx)],
  },
  helpUrl: `
  Commit messages must follow conventional commit format:
  https://www.conventionalcommits.org/en/v1.0.0/#summary
      type(optional-cope): subject
      
      [optional body]
  * To bypass pre-commit hooks run 'git commit --no-verify'
  >>> Use "yarn commit" for interactive prompt. <<< 
  `,
};
