const commander = require('commander');
const { getIndexUrl } = require('@merx/cl-shared-utils');

class programParse {
  constructor() {
    this.program = new commander.Command();
    this.options = {};
    this.parse();
    this.setDevName();
  }
  parse() {
    this.program
      .option('-t, --moduleType <type>', '定义模块类型，例如：h5、app', 'h5')
      .option('-n, --moduleName <name>', '定义模块名称，例如：demo')
      .option(
        '-b, --buildType <type>',
        '定义构建类型，例如：build、dev、debug、upload',
      )
      .option(
        '-e, --configEnv <env>',
        '定义环境类型，例如：build_ioc、build_zw、local',
      )
      .option(
        '-m, --multipleName <name>',
        '定义多选模块构建名称，为multiple.json中的multipleName',
      )
      .allowUnknownOption();

    this.program.parse(process.argv);
    this.options = this.program.opts();
    process.m8Argv = this.options;
  }
  setDevName() {
    const { moduleName, moduleType, buildType } = this.options;

    if (moduleType === 'h5' || moduleType === 'app') {
      if (buildType === 'dev' || process.env.NODE_ENV === 'development') {
        if (moduleName) {
          const indexURL = getIndexUrl(moduleName, moduleType);

          process.env.devName = `#/${indexURL}`;
        }
      }
    }
  }
}
exports.program = new programParse();
