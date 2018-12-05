const exec = require('child_process').exec;
const parse = require('github-url-from-git');

/**
 * Get GitHub Repo URL
 *
 * @param {String} repo - Repository location
 * @return {Promise<string>}
 */
function getRepo(repo) {
  return new Promise((resolve, reject) => {
    if (repo === true) {
      exec('git config --get remote.origin.url', {cwd: process.cwd()}, (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(new Error('Not in a git directory.'));
        }

        // convert the remotes url into a github url so we have a standard
        // form to work with, instead of having to worry about parsing http(s)/ssh urls
        var repo = parse(stdout).trim().split('/').slice(-2).join('/');

        // trim .git off the end if it exists
        if (/.git$/.test(repo)) repo = repo.substring(0, repo.length - 4);

        resolve(repo);
      });
    } else {
      resolve(repo);
    }
  });
}

/**
 * Get Repository owner and name
 *
 * @param {String} repo - Repository location
 * @return {Promise<object>} - {repoName, owner}
 */
function getRepoAndOwner(repo) {
  return new Promise((resolve, reject) => {
    getRepo(repo)
      .then((repo) => {
        repo = repo.split('/');

        if (repo.length !== 2) {
          return reject(new Error('repo must be provided as <owner>/<repoName>'));
        }

        const repoName = repo[1];
        const owner = repo[0];

        resolve({repoName, owner});
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = getRepoAndOwner;
