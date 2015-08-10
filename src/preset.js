var fs = require('fs')
  , presetName = ''
  , presetOptions = {}

function preset (name) {
  presetName = name
  init()

  return presetOptions
}

function init () {
  var options = {}
  try {
    if (fs.lstatSync(presetName).isFile()) {
      if (presetName.substr((~-presetName.lastIndexOf('.') >>> 0) + 2) === 'json') {
        options = JSON.parse(fs.readFileSync(presetName, 'utf8'))
      } else {
        console.log('Preset path must be a .json file.')
        return process.exit(1)
      }
    }
  }
  catch (e) {
    try {
      options = JSON.parse(fs.readFileSync(__dirname + '/presets/' + presetName + '.json', 'utf8'))
    }
    catch (e) {
      console.log('This preset does not exist.')
      return process.exit(1)
    }
  }

  presetOptions = options
}
module.exports = preset
