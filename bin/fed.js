const program = require('commander');

program.version('1.0.0')
    .usage('<command> [project name]')
    .command('init', 'init new project')
    .parse(process.argv);
