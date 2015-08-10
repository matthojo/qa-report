var inquirer = require('inquirer')
  , async = require('async')
  , chalk = require('chalk')
  , find = require('lodash.find')
  , preset = require('./src/preset')

function qaReport (opts, callback) {
  opts = opts || {}
  callback = callback || noop

  var presets = ''
    , md = '# QA'

  async.series(
    [
      function (done) {
        // LOAD PRESET
        if (opts.preset) {
          presets = preset(opts.preset)
        } else {
          presets = preset('default')
        }
        done()
      }
    , function (done) {
        // GENERATE MD
        var answers = presets.answers
          , questionSets = presets.questionSets
          , availableAnswers = []

        for (var answer in answers) {
          if (answers.hasOwnProperty(answer)) {
            availableAnswers.push(answers[answer].title)
          }
        }

        async.eachSeries(questionSets, function (value, next) {
          // Set title in markdown
          md += '\n\n## ' + value.title + '\n\n'
          // Set questions
          var questionSet = value.questions
        , questionSetLength = questionSet.length
        , inquirerQuestions = []
          for (var i = 0; i < questionSetLength; i++) {
            var q = questionSet[i]
            inquirerQuestions.push({
              type: 'list'
            , name: '' + i
            , message: q
            , choices: availableAnswers
            })
          }
          console.log(chalk.magenta('\n' + value.title + '\n' + '==========='))
          inquirer.prompt(
            inquirerQuestions
              , function ( completed ) {
              // console.log('Answers: ', JSON.stringify(completed, null, "  ") );
              for (var item in completed) {
                var answerValue = find(answers, { title: completed[item] })
                md += answerValue.value + ' ' + questionSet[parseInt(item)] + '\n'
              }
              next()
            }
          )
        }
      , done)
      }
    , function (done) {
        console.log(chalk.magenta('\nAdditional Notes\n' + '==========='))
        md += '\n\n## Additional Notes\n\n'
        inquirer.prompt([
            { type: 'input'
            , name: 'notes'
            , message: 'Additional Notes:'
            }
          ]
          ,   function (completed) {
            // console.log('Answers: ', JSON.stringify(completed, null, "  ") );
            md += completed.notes
            done()
          }
        )
      }
    ]
  , function () {
      callback(null, md)
    }
  )
}

function noop() {}

module.exports = qaReport
