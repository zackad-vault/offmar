const Meta = require('userscript-metadata')
const pkg = JSON.parse(JSON.stringify(require('../../package.json')))

let Metadata = {
  name: pkg.longName,
  namespace: pkg.namespace,
  author: pkg.author,
  version: pkg.version,
  description: pkg.description,
  updateURL: pkg.updateURL,
  downloadURL: pkg.downloadURL,
  include: pkg.include,
  exclude: pkg.exclude,
  grant: pkg.grant,
  run_at: pkg.runAt,
  license: pkg.license,
  copyright: `2015 - ${new Date().getFullYear()} (c) ${pkg.author}`,
}

const validateCustom = Meta.validateAndStringifyWith({
  items: {
    ...Meta.DEFAULT_ITEMS,
    copyright: new Meta.StringItem({
      key: 'copyright',
    }),
  },
})

exports.generate = function() {
  const result = validateCustom(Metadata)
  if (Meta.isRight(result)) {
    return result.Right.stringified
  }

  throw 'Invalid metadata'
}
