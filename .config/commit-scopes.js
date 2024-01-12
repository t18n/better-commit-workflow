const fs = require("fs");
const path = require("path");

/**
 * scopePaths defines which paths will have their subdirectories added to the list of scopes.
 *
 * The top level path (src) is not included.
 *
 * So with the directory structure:
 *  .
 * └── src
 *     ├── components
 *     │   ├── my-first-component
 *     │   │   └── first-component-subfolder
 *     │   └── my-second-compoent
 *     ├── services
 *     │   └── my-first-service
 *     └── hooks
 *         └── my-first-hook
 *
 * An object like this:
 *
 * {
 *  src: ['components', "hooks"]
 * }
 *
 * The follwing scopes would be added:
 *
 *  [
 *    'components--my-first-component',
 *    'components--my-second-component',
 *    'hooks--my-first-hook
 *  ]
 */
const scopePaths = {
  src: ["components", "utils"],
};

/**
 * Top level scopes are sorted and appended to the list of scopes as-is.
 */
const topLevelScopes = ["dependencies", "storybook", "config", "environment"];

/**
 * @param {string} dir directory to scan
 * @returns {string[]} an array of subdirectory names
 */
function getSubscope(dir) {
  const uniqueNames = new Set();

  fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory() || (dirent.isFile() && !dirent.name.startsWith("index"))) {
      uniqueNames.add(path.parse(dirent.name).name);
    }
  });

  return Array.from(uniqueNames);
}

/**
 * Scans a given folder for immediate subdirectories and returns a list of scope names.
 * @param {string} topLevelDir the top level directory (`src`, `_templates`)
 * @param {string} scopeDir the directory to be scanned for subdirectories
 * @returns {string[]} an array of scopes in the format `scopeDir/subdirectory`
 */
function mapSubDirectoriesToScopeNames(topLevelDir, scopeDir) {
  const scopeDirPath = `${topLevelDir}/${scopeDir}`;

  const subScope = getSubscope(scopeDirPath);

  if (subScope.length === 0) {
    return;
  }

  const subScopes = subScope.map((scopeSubDir) => `${scopeDir}--${scopeSubDir}`);

  return subScopes;
}

/**
 * Generates a list of scopes for commitlint validation by scanning specified directories.
 *
 *  - components--my-component
 *  - vscode
 *
 * @param {object} pathObj An object in the format  `{dir: ['subdirA', 'subdirB', 'subdirC']}`
 * @param {string[]} listOfScopes An array of strings to be added directly as scopes.
 * @returns {string[]} An array of scopes e.g. `['components/my-component', 'eslint']`
 */
function getScopes(pathObj, listOfScopes) {
  let scopes = [];

  Object.keys(pathObj).forEach((topLevelDir) => {
    const scopeDirs = pathObj[topLevelDir];

    scopeDirs.forEach((scopeDir) => {
      const scopesInScopeDir = mapSubDirectoriesToScopeNames(topLevelDir, scopeDir);
      if (Array.isArray(scopesInScopeDir)) {
        scopes = [...scopes, ...scopesInScopeDir];
      }
    });
  });

  scopes = [...scopes.sort(), ...listOfScopes.sort()];

  return scopes;
}

const logScopes = () => {
  console.log(getScopes(scopePaths, topLevelScopes, ""));
};

const commitScopes = (ctx) => {
  return getScopes(scopePaths, topLevelScopes);
};

module.exports = { commitScopes, logScopes };
