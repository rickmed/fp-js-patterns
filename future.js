const fs = require('fs')
const {Future} = require('ramda-fantasy')
const R = require('ramda')

// // String -> Future Error [String]
// ls = path => Future((onErr, onSuc) =>
//   fs.readdir(path, (err, files) => err ? onErr(err) : onSuc(files)))

// // String -> Future Error String
// cat = file => Future((onErr, onSuc) =>
//   fs.readFile(file, 'utf8', (err, data) => err ? onErr(err) : onSuc(data)))

// catDir = dir =>
//   ls(dir)
//   .chain(traverse(Future.of, cat)) // traverse [String] -> [Future String]
//   .map(join('\n'))

// catDir('./')
//   .fork(e => console.log(e), val => console.log(val))


// fileType => stat =>
//   switch (stat) {

//   }

let isFn = dataType =>
  Object(dataType) instanceof Function ? true : false

let isMethod = obj => k =>
  isFn(obj[k])

let callMethod = inp => obj => k =>
  obj[k](inp)

// Spec -> Obj -> *
let callMethodsWhile => ({inp, out}) => obj => {
  let callMthd = callMethod(inp)(obj)
  let ks = R.keysIn(obj)
  return isMethod(obj)(k) ? callMth(k)
}

// continue starting a function from keysIn(obj).map(etc...)


let onErr = e => console.log(e)
let onSuc = v => console.log(v)

let nodeCB = (errCB, sucCB) => (e, v) =>
    e ? errCB(e) : sucCB(v)

// nodeCB = (onErr, onSuc) => err ? onErr(err) : onSuc(v)

fs.stat('.', nodeCB(onErr, onSuc))

console.log(R.is(Function, () => {}))
