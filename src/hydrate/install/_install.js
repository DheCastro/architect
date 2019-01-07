let assert = require('@smallwins/validate/assert')
let npm = require('../providers/npm')

module.exports = function install(params, callback) {

  assert(params, {
    pathToCode: Array,
    // tick: Function,
  })

  let { pathToCode, tick } = params

  let total = pathToCode.length
  if (tick) tick(`Installing dependencies in ${total} Functions`)

  // Build out the queue of dependencies that need hydrating
  let queue = []
  pathToCode.forEach(path => {
    // Normalize absolute paths
    if (path.startsWith('src/')) path = process.cwd() + '/' + path
    // NPM specific impl: ci for package installation
    let args = ['ci', '--ignore-scripts']
    queue.push([path, args])
  })

  npm(queue, err => {
    if (err) {
      callback(err)
    }
    else {
      if (tick) tick('')
      callback()
    }
  })
}
