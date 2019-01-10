const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const rm = require('rimraf').sync

module.exports = function (metadata = {}, src) {
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }

  console.log('generator metadata',metadata, 'generator src', src );

  const dest = metadata.projectName || '.';

  
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
      	const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          // console.log('generator fileName', fileName, metadata.projectName);
          const t = files[fileName].contents.toString()
          files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))

          if(/__[\w-]+__/.test(fileName)) {
            const fileNameNew = fileName.replace(/__[\w-]+__/, metadata.projectName);
            files[fileNameNew] = files[fileName];
            delete files[fileName];
          }
        })
      	done()
      }).build(err => {
      	rm(src)
      	err ? reject(err) : resolve()
      })
  })
}

