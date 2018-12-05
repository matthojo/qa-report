const github = require('octonode');
const osHomedir = require('os-homedir');
const fs = require('fs');
const getRepoAndOwner = require('./get-repo-and-owner');
const configPath = osHomedir() + '/.qa-report.json';

/**
 * Posts comment to Pull Request
 *
 * @param {*} id
 * @param {*} repo
 * @param {*} approval
 * @param {*} body
 * @param {*} callback
 *
 * @return {Promise<string>} - Repo owner/name
 */
function postToPR(id, repo, approval, body) {
  return new Promise((resolve, reject) => {
    let config;

    try {
      config = JSON.parse(fs.readFileSync(configPath));
    } catch (e) {
      return callback(new Error('Can\'t read ' + configPath + '. Ensure it is present and is valid JSON.'));
    }

    const client = github.client(config);

    getRepoAndOwner(repo)
      .then(({repoName, owner}) => {
        const ghpr = client.pr(`${owner}/${repoName}`, id);
        ghpr.createReview({
          body: body,
          event: approval
        }, (error) => {
          if (error) {
            return reject(error);
          }
          resolve(owner + '/' + repoName);
        });
      })
      .catch((err) => {
        return reject(error);
      });
  });
}

module.exports = postToPR;
