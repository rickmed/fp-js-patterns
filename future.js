const fs = require('fs')
const path = require('path')
const {Future} = require('ramda-fantasy')
const R = require('ramda')
const {futurize} = require('./futurize.js')


//
let f_readdir = futurize(fs.readdir)
let f_readFile = futurize(fs.readFile)
let f_stat = futurize(fs.stat)
// refactor to send a list of fns with destructuring


let print = a =>
  console.log(a)


// Str -> stat -> Bool
let isType = type => stat =>
  stat[type]() ? true : false


  // .filter(isType('isDirectory'))


// String -> Future Error String
let catDir = dir =>
  f_readdir(dir, 'utf8')
  .chain(R.traverse(Future.of, R.flip(f_readFile)('utf8'))) // traverse [Future Str] -> Future [String]
  .map(R.join('\n'))

catDir('.git/hooks/')
  // print could be a function that checks for error type and reacts
  .fork(print, print)


let nodeCB = (errCB, sucCB) => (e, v) =>
    e ? errCB(e) : sucCB(v)

// then implement with fluture (cancellation) and fn calls instead of dot chaining

// f_readFile('eff.js', 'utf8').fork(print, print)

