const ghIssues = require('ghissues');
const osHomedir = require('os-homedir');
const fs = require('fs');
const getRepoAndOwner = require('./get-repo-and-owner');
const configPath = osHomedir() + '/.qa-report.json';

/**
 * Posts comment to Pull Request
 *
 * @param {*} id
 * @param {*} repo
 * @param {*} body
 * @param {*} callback
 *
 * @return {Function}
 */
function postToPR(id, repo, body, callback) {
  var config;

  try {
    config = JSON.parse(fs.readFileSync(configPath));
  } catch (e) {
    return callback(new Error('Can\'t read ' + configPath + '. Ensure it is present and is valid JSON.'));
  }

  getRepoAndOwner(repo, (error, repoName, owner) => {
    if (error) return callback(error);
    ghIssues.createComment(config, owner, repoName, id, body, (error) => {
      if (error) return callback(error);
      callback(null, owner + '/' + repoName);
    });
  });
}

module.exports = postToPR;
