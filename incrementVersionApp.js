/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */

const p = require('path')
const fs = require('fs')
const wtf = require('./writeEnvToFile')

const configPath = p.resolve(__dirname, './../src/metadata.json')

console.log('Incrementing build number...')
fs.readFile(configPath, (err, content) => {
  if (err) throw err
  const metadata = JSON.parse(content)
  metadata.REACT_APP_VERSION += 1
  fs.writeFile(configPath, JSON.stringify(metadata), (err) => {
    if (err) throw err

    const obj = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const envVariablesFromMetaJson = []
    for (const key in obj) {
      const value = obj[key]
      envVariablesFromMetaJson.push({ key, value })
    }

    console.log(envVariablesFromMetaJson)
    wtf.writeEnvToFile(envVariablesFromMetaJson) // [{  key: 'REACT_APP_VERSION', value: metadata.REACT_APP_VERSION }]
  })
})
