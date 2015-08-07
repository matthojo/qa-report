var fs = require('fs')

var presetName = '',
    presetOptions

function preset (name) {
  presetName = name
  init()

  return presetOptions
}

function init () {
  var options = JSON.parse(fs.readFileSync(__dirname + '/presets/' + presetName + '.json', 'utf8'))
  presetOptions = options
}
module.exports = preset
