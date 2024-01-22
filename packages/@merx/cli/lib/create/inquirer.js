/**
 * @file inquirer.js
 */
const inquirer = require('inquirer');
const meta = require('./meta');

// const evaluate = (exp, data) => {
//     /* eslint-disable no-new-func */
//     const fn = new Function('data', `return ${exp}`);
//     try {
//         return fn(data);
//     } catch (error) {
//         console.error(`Error when evaluating filter condition: ${exp}`);
//     }
// };
async function prompt(option, { complete }) {
  const answers = [];
  const keys = Object.keys(meta.prompts);
  let name;
  while ((name = keys.shift())) {
    const question = {
      name,
      ...meta.prompts[name],
    };
    // console.log(evaluate('mobile', answers));
    if (question.name === 'vant' && question.when != 'mobile') {
      continue;
    }
    const response = await inquirer.prompt([question]);
    answers.push({
      name,
      prompt: response[name],
    });
  }
  option.result = answers;
  complete && complete(meta.complete);
  // return meta
}
module.exports = {
  prompt,
};
