const Task = require('fun-task')

exports.taskify = fn => (...args) => Task.create((onSuc, onFail) =>
  fn(...args, (err, res) => err ? onFail(err) : onSuc(res) )
)

