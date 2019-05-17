const download = require('download-git-repo');
const path = require('path');
const ora = require('ora');


module.exports = (target, projectType) => {
    const projectUrl = {
        'vue-spa': 'https://github.com/LouisaNikita/fed-vue-spa-temp.git#master',
        'react-spa': 'https://github.com/LouisaNikita/fed-vue-spa-temp.git#master'  // 占位
    }
    target = path.join(target || '.', 'download-tmp');
    // target = path.join(target || '.');
    console.log('target', target);
    return new Promise((resolve, reject) => {
        const spinner = ora('=================== 正在下载项目模板 ===================')
        spinner.start()
        download(`direct:${projectUrl[projectType]}`, target, { clone: true }, (err) =>{
            // to do 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
            console.log('download done', target, err);
            if(err) {
                spinner.fail();
                reject(err);
            }else{
                spinner.succeed();
                resolve(target);
            }
        })
    })
}