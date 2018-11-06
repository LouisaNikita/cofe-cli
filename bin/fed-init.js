const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const download = require('../lib/download');
const inquirer = require('inquirer');

program.usage('<project-name>').parse(process.argv)

console.log('initing a new project')

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'projectType',
    message: '想要新建什么项目？',
    choices: [
      'vue-be',
      'react-hybrid',
      'react-pc'
    ]
  }
]).then(answers => {
  console.log('inquirer answer', answers)

  // project name
  let projectName = program.args[0];

  if (!projectName) {
    program.help();
    return;
  }

  // 当前目录为空，如果当前目录的名称和project-name一样，则直接在当前目录下创建工程，
  // 否则，在当前目录下创建以project-name作为名称的目录作为工程的根目录
  // 当前目录不为空，如果目录中不存在与project-name同名的目录，
  // 则创建以project-name作为名称的目录作为工程的根目录，
  // 否则提示项目已经存在，结束命令执行。

  const list = glob.sync('*'); //遍历当前目录
  let rootName = path.basename(process.cwd());
  console.log('rootName', rootName, 'list', list);

  if (list.length) {
    let existPro = list.filter(name => {
      const fileName = path.resolve(process.cwd(), path.join('.', name));
      console.log('filter fileName', fileName);
      const isDir = fs.statSync(fileName).isDirectory();
      return name.indexOf(projectName) !== -1 && isDir;
    })
    if (existPro.length !== 0) {
      console.log(`项目 ${projectName} 已存在`);
      return;
    }
    rootName = projectName;
  } else if (rootName === projectName) {
    rootName = '.';
  } else {
    rootName = projectName;
  }

  go()

  function go() {
    // 预留，处理子命令  
    let copyPath = path.resolve(process.cwd(), path.join('.', rootName));
    console.log('copypath', copyPath);
    download(rootName).then(target => {
      console.log('go', target);

      // to do 模版
    }).catch(err => {
      console.log('go err', err);
    })
  }
})

