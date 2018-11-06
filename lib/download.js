const download = require('download-git-repo');
const path = require('path');


module.exports = (target) => {
    // target = path.join(target || '.', 'download-tmp');
    target = path.join(target || '.');
    console.log('target', target);
    return new Promise((resolve, reject) => {
        download('direct:https://github.com/LouisaNikita/vue-paginator-simple.git#master', target, { clone: true }, (err) =>{
            // to do 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
            console.log('download done', target, err);
            err ? reject(err) : resolve(target)
        })
    })
}