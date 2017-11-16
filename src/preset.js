const fs = require('fs');
const presetName = '';
const presetOptions = {};

/**
 * Define preset file
 *
 * @param {string} name - name of preset file
 * @return {Object} Preset configuration
 */
function preset(name) {
  presetName = name;
  init();

  return presetOptions;
}

/**
 * Init module
 *
 * @return {Object}
 */
function init() {
  var options = {};
  try {
    if (fs.lstatSync(presetName).isFile()) {
      if (presetName.substr((~-presetName.lastIndexOf('.') >>> 0) + 2) === 'json') {
        options = JSON.parse(fs.readFileSync(presetName, 'utf8'));
      } else {
        console.log('Preset path must be a .json file.');
        return process.exit(1);
      }
    }
  } catch (e) {
    try {
      options = JSON.parse(fs.readFileSync(__dirname + '/presets/' + presetName + '.json', 'utf8'));
    } catch (e) {
      console.log('This preset does not exist.');
      return process.exit(1);
    }
  }

  presetOptions = options;
}
module.exports = preset;
