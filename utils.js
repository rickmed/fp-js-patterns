const R = require('ramda')

let throwType = msg => () =>
  new TypeError(msg)

// [*] -> [Fn]
let filterFns = args =>
  args.filter(R.is(Function))

// [*] -> fn | throw
exports.cbInArgs = R.pipe(
  filterFns,
  R.ifElse(
    R.equals(1),
    R.head,
    throwType('You must provide exactly one callback')
  )
)
