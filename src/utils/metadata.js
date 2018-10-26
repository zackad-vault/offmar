const Meta = require('userscript-metadata')
const pkg = JSON.parse(JSON.stringify(require('../../package.json')))

let Metadata = {
  name: pkg.longName,
  namespace: pkg.namespace,
  author: pkg.author,
  version: pkg.version,
  description: pkg.description,
  include: pkg.include,
  exclude: pkg.exclude,
  grant: pkg.grant,
  run_at: 'document-start',
  license: pkg.license
}

exports.generate = function() {
  return Meta.validateAndStringify(Metadata).Right.stringified
}
