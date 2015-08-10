var ghIssues = require('ghissues')
  , osHomedir = require('os-homedir')
  , fs = require('fs')
  , getRepoAndOwner = require('./get-repo-and-owner')
  , configPath = osHomedir() + '/.qa-report.json'

function postToPR(id, repo, body, callback) {
  var config
  
  try {
    config = JSON.parse(fs.readFileSync(configPath))
  } catch (e) {
    return callback(new Error('Can\'t read ' + configPath + '. Ensure it is present and is valid JSON.'))
  }

  getRepoAndOwner(repo, function (error, repoName, owner) {
    if (error) return callback(error)
    ghIssues.createComment(config, owner, repoName, id, body, function (error) {
      if (error) return callback(error)                          
      callback(null, owner + '/' + repoName)
    })
  })
}

module.exports = postToPR
