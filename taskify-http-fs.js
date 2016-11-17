const superagent = require('superagent')
const Task = require('fun-task')
const {taskify} = require('./taskify')
const { readFile } = require('fs')

const readTask = taskify(readFile)

readTask('./dummy-text.txt', 'utf8').run({
  success(res) {
    console.log(res)
  },
  failure(reason) {
    console.log(reason)
  }
})


const fetchTask = (url) =>
  Task.create( (onSuccess, onFailure) => {
    const req = superagent.get(url)
      .end( (err, res) => err ? onFailure(err) : onSuccess(res) )
    return () => req.abort
  })


const cancelfetch = fetchTask('https://google.com').run({
  failure: (err) => console.log(err),
  success: (res) => console.log(res.headers['set-cookie'])
})

// cancelfetch()
