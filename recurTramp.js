const trampa = require('trampa')

function logNums(num) {
  if ( num === 20000 ) return
  else {
    console.log(num)
    return trampa.lazy(() => logNums(++num) )
  }
}

logNums(0).run()