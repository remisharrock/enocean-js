#!/usr/bin/env node
// var fc = 0

const fs = require('fs')
const eepPath = 'packages/node_modules/@enocean-js/eep-transcoder/src/eep'
var eepfiles = fs.readdirSync(eepPath)
var docs_path = 'resources/enocean-specification/Enocean Equipment Profiles/'
var func = ''
var rorg = ''
fs.writeFileSync(docs_path + 'readme.md', '')
function append (data) {
  fs.appendFileSync(docs_path + 'readme.md', data + '\n')
}
function hexr (x) {
  return parseInt(x).toString(16).padStart(2, '0')
}
eepfiles.forEach(file => {
  var eepstr = fs.readFileSync(eepPath + '/' + file, 'utf8')
  eepstr = eepstr.replace(/"/g, '\\"')
  eepstr = eepstr.replace(/'/g, '"')
  var json = JSON.parse(eepstr.substr(21))
  if (json.rorg_number !== rorg) {
    rorg = json.rorg_number
    append(`* **${hexr(json.rorg_number)}** ${json.rorg_title} `)
  }
  if (json.func_number !== func) {
    func = json.func_number
    append(`    * **${hexr(json.rorg_number)}-${hexr(json.func_number)}** ${json.func_title} `)
  }
  append(`        * [**${json.eep}** ${json.title}](${json.eep}.md) `)
  fs.writeFileSync(docs_path + `${json.eep}.md`, `# ${json.eep}`)
})
