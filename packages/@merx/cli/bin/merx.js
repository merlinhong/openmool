#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const { chalk, semver, leven } = require('@vuecli-build/cli-shared-utils');
const requiredVersion = require('../package.json').engines.node;
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.',
      ),
    );
    process.exit(1);
  }
}
checkNodeVersion(requiredVersion, '@vuecli-build/cli');

// const fs = require('fs')
// const path = require('path')
// const slash = require('slash')
const minimist = require('minimist');

// // enter debug mode when creating test repo
// if (
//     slash(process.cwd()).indexOf('/packages/test') > 0 && (
//         fs.existsSync(path.resolve(process.cwd(), '../@vue')) ||
//         fs.existsSync(path.resolve(process.cwd(), '../../@vue'))
//     )
// ) {
//     process.env.VUE_CLI_DEBUG = true
// }

const program = require('commander');
// const loadCommand = require('../cli/util/loadCommand')

program
  .version(`@merx/cli ${require('../package.json').version}`)
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('create a new project powered by @merx/cli')
  .option(
    '-p, --preset <presetName>',
    'Skip prompts and use saved or remote preset',
  )
  .option('-d, --default', 'Skip prompts and use default preset')
  // .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')
  // .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
  // .option('-g, --git [message]', 'Force git initialization with initial commit message')
  // .option('-n, --no-git', 'Skip git initialization')
  // .option('-f, --force', 'Overwrite target directory if it exists')
  // .option('--merge', 'Merge target directory if it exists')
  // .option('-c, --clone', 'Use git clone when fetching remote preset')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
        ),
      );
    }
    // --git makes commander to default git to true
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true;
    }
    require('../lib/create')(name, options);
  });

program
  .command('serve')
  .description('alias of "npm run serve" in the current project')
  .allowUnknownOption()
  .action(() => {
    // require('../cli/util/runNpmScript')('serve', process.argv.slice(3))
  });

program
  .command('build')
  .description('alias of "npm run build" in the current project')
  .action((cmd) => {
    // require('../cli/util/runNpmScript')('build', process.argv.slice(3))
  });

// program
//     .command('ui')
//     .description('start and open the vue-cli ui')
//     .option('-H, --host <host>', 'Host used for the UI server (default: localhost)')
//     .option('-p, --port <port>', 'Port used for the UI server (by default search for available port)')
//     .option('-D, --dev', 'Run in dev mode')
//     .option('--quiet', `Don't output starting messages`)
//     .option('--headless', `Don't open browser on start and output port`)
//     .action((options) => {
//         checkNodeVersion('>=8.6', 'vue ui')
//         require('../lib/ui')(options)
//     })

program
  .command('init <template> <app-name>')
  .description(
    'generate a project from a remote template (legacy API, requires @vuecli-build/cli)',
  )
  .option('-c, --clone', 'Use git clone when fetching remote template')
  .option('--offline', 'Use cached template')
  .action(() => {
    // loadCommand('init', '@vue/cli-init')
  });

program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>', 'set option value')
  .option('-d, --delete <path>', 'delete option from config')
  .option('-e, --edit', 'open config with default editor')
  .option('--json', 'outputs JSON result only')
  .action((value, options) => {
    // require('../cli/config')(value, options)
  });

// output help information on unknown commands,未知命令的处理
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `merx <command> --help`,
    )} for detailed usage of given command.`,
  );
  console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

// enhance common error messages
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages');

enhanceErrorMessages('missingArgument', (argName) => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages('unknownOption', (optionName) => {
  return `Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return (
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``)
  );
});

program.parse(process.argv); // 解析命令行参数

function suggestCommands(unknownCommand) {
  const availableCommands = program.commands.map((cmd) => cmd._name);

  let suggestion;

  availableCommands.forEach((cmd) => {
    const isBestMatch =
      leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}
