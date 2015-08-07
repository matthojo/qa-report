var ghIssues = require('ghissues')
  , osHomedir = require('os-homedir')
  , fs = require('fs')
  , configPath = osHomedir() + '/.qa-report.json'

function postToPR(id, repo, body, callback) {
  var config
  
  try {
    config = JSON.parse(fs.readFileSync(osHomedir() + '/.qa-report.json', 'utf8'))
  } catch (e) {
    return callback(new Error('Can\'t read ' + configPath + '. Ensure it is present and is valid JSON.'))
  }

  repo = repo.split('/')

  if (repo.length !== 2) {
    return callback(new Error('repo must be provided as <owner>/<repoName>'))
  }

  var repoName = repo[1]
    , owner = repo[0]

  ghIssues.createComment(config, owner, repoName, id, body, callback)
}

module.exports = postToPR
