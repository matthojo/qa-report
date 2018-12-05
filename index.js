const inquirer = require('inquirer');
const async = require('async');
const chalk = require('chalk');
const find = require('lodash.find');
const preset = require('./src/preset');

/**
 * Generate QA report
 *
 * @param {*} opts
 * @return {Promise<string>} - Markdown for comment
 */
function qaReport(opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {};

    let presets = '';
    let md = '# QA';
    let approval = null;

    async.series(
      [
        (done) => {
          // LOAD PRESET
          if (opts.preset) {
            presets = preset(opts.preset);
          } else {
            presets = preset('default');
          }
          done();
        },
        (done) => {
          // GENERATE MD
          const answers = presets.answers;
          const questionSets = presets.questionSets;
          let availableAnswers = [];

          for (let answer in answers) {
            if (answers.hasOwnProperty(answer)) {
              availableAnswers.push(answers[answer].title);
            }
          }

          async.eachSeries(questionSets, (value, next) => {
            // Set title in markdown
            md += '\n\n## ' + value.title + '\n\n';
            // Set questions
            const questionSet = value.questions;
            const questionSetLength = questionSet.length;
            let inquirerQuestions = [];
            for (let i = 0; i < questionSetLength; i++) {
              let q = questionSet[i];
              inquirerQuestions.push({
                type: 'list',
                name: '' + i,
                message: q,
                choices: availableAnswers
              });
            }
            console.log(chalk.magenta('\n' + value.title + '\n' + '==========='));
            inquirer.prompt(
              inquirerQuestions,
              ( completed ) => {
                // console.log('Answers: ', JSON.stringify(completed, null, "  ") );
                for (let item in completed) {
                  if (completed.hasOwnProperty(item)) {
                    const answerValue = find(answers, {title: completed[item]});
                    if (!answerValue.hide) {
                      md += answerValue.value + ' ' + questionSet[parseInt(item)] + '\n';
                    }
                  }
                }
                next();
              }
            );
          }
            , done);
        },
        (done) => {
          console.log(chalk.magenta('\nAdditional Notes\n' + '==========='));
          inquirer.prompt([
            {
              type: 'input',
              name: 'notes',
              message: 'Additional Notes:'
            }
          ],
          (completed) => {
            // console.log('Answers: ', JSON.stringify(completed, null, "  ") );
            if (completed.notes) {
              md += '\n\n## Additional Notes\n\n';
              md += completed.notes;
            }
            done();
          }
          );
        },
        (done) => {
          console.log(chalk.magenta('\nReview Status\n' + '==========='));
          inquirer.prompt([
            {
              type: 'list',
              name: 'approval',
              message: 'Status:',
              choices: [
                {
                  name: 'Comment only',
                  value: 'COMMENT'
                },
                new inquirer.Separator(),
                {
                  name: 'Approved',
                  value: 'APPROVE'
                },
                {
                  name: 'Request Changes',
                  value: 'REQUEST_CHANGES'
                }
              ]
            }
          ],
          (completed) => {
            // console.log('Answers: ', JSON.stringify(completed, null, "  ") );
            approval = completed.approval;
            done();
          }
          );
        }
      ]
      , () => {
        resolve({approval, md});
      }
    );
  });
}

module.exports = qaReport;
