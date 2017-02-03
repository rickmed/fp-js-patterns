const Task = require('data.task')

exports.taskfy = fn =>
  (...args) => new Task( (rej, res) =>
    fn(...args, (e, x) => e ? rej(e) : res(x) )
  )

