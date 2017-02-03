const R = require('ramda')
const fs = require('fs')
const {Future} = require('ramda-fantasy')
const paramNames = require('function-arguments')


const onNodeCB = onE => onA =>
  (e, a) => e ? onE(e) : onA(a)

const futureCB = fn => (...args) =>
  (onE, onA) => R.partialRight(fn, [onNodeCB(onE)(onA)] )(...args)

// need to provide all node args including optional
// nodeFn -> (...args) -> Future nodeFn
const futurize = fn => R.curry(
  R.pipe(
    futureCB(fn),
    Future
  )
)



let fnFstLine = R.pipe(
  R.toString,
  R.split('\n'),
  R.head
)

// module -> [Str]
const fstLine = R.pipe(
  R.valuesIn
, R.filter(R.is(Function))
, R.map(fnFstLine)
)

const fnFstLineAndparamNames = fstLine => prmNames =>
  R.zip(fstLine, prmNames)

console.log(R.mapObjIndexed( (num, key, obj) => `${key}`, fs))

module.exports = { futurize, fs }

// TODO: make this a library.