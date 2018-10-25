const Meta = require('userscript-metadata')
const pkg = JSON.parse(JSON.stringify(require('../../package.json')))

let Metadata = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  description: pkg.description,
  run_at: 'document-start',
  license: pkg.license
}

exports.generate = function() {
  return Meta.validateAndStringify(Metadata).Right.stringified
}
