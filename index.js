const Task = require('data.task')
const Maybe = require('data.maybe')
const {readdir, readFile, lstat} = require('fs')
const R = require('ramda')
const { futurize } = require('futurize')

const taskfy = futurize(Task)

// str -> Task [str]
const ls = dir =>
  taskfy(readdir)(dir)

// str -> Task str
const __cat = readFile => file =>
  taskfy(readFile)(file, 'utf8')


const read = __cat(readFile)

//:: String -> Future Error String
let isFile = file => new Task( (rej, res) =>
  lstat(file, (e, stats) => e ? rej(e) : res(stats.isFile() ? file : false) )
)


// const res = ls('.')
// .chain(R.traverse(Task.of, isFile))
// .map(R.without([false]))
// .chain(R.traverse(Task.of, read))
// .fork(console.error, x => console.log(x.length))


const catDir = R.pipe(
  ls,
  R.chain(R.traverse(Task.of, isFile)),
  R.map(R.without([false])),
  R.chain(R.traverse(Task.of, read))
)

catDir('.')
.fork(console.error, x => console.log(x.length))

// console.log(res)
module.exports = {__cat}
