var exec = require('child_process').exec
  , parse = require('github-url-from-git')

function getRepo(repo, callback) {
  if (repo === true) { 
    exec('git config --get remote.origin.url', { cwd: process.cwd() }, function (error, stdout, stderr) {
      if (error || stderr) {
        return callback(new Error('Not in a git directory.'))
      }

      // convert the remotes url into a github url so we have a standard
      // form to work with, instead of having to worry about parsing http(s)/ssh urls
      var repo = parse(stdout).trim().split('/').slice(-2).join('/')

      // trim .git off the end if it exists
      if (/.git$/.test(repo)) repo = repo.substring(0, repo.length - 4)

      callback(null, repo)
    })
  } else {
    callback(null, repo)
  }
}

function getRepoAndOwner(repo, callback) {
  getRepo(repo, function (error, repo) {
    if (error) return callback(error)

    repo = repo.split('/')

    if (repo.length !== 2) {
      return callback(new Error('repo must be provided as <owner>/<repoName>'))
    }

    var repoName = repo[1]
      , owner = repo[0]

    callback(null, repoName, owner)
  })
}

module.exports = getRepoAndOwner
