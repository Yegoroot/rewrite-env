/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies

const p = require('path')
const envfile = require('envfile')
const fs = require('fs')

const writeEnvToFile = (envVariables) => {
  // get `.env` from path of current directory
  const path = p.resolve(__dirname, '../.env.production')
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const parsedFile = envfile.parse(data)
    envVariables.forEach((envVar) => {
      if (envVar.key) {
        parsedFile[envVar.key] = envVar.value
      }
    })
    fs.writeFileSync(path, envfile.stringify(parsedFile))
    // console.log('Updated .env: ', parsedFile)
  })
}

exports.writeEnvToFile = writeEnvToFile
