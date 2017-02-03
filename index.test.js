const {__cat} = require('./index')

describe('cat', () => {


  const err = e => expect(e).toBe(null)
  const _ = jest.fn()
  let _readFile = jest.fn( (a, b, cb) => {
    setTimeout(() => cb(null, 'testd'), 100)
  })

  const eventuallyEqual = (expected, done) => res => {
    expect(res).toEqual(expected);
    done();
};

  test('happy path', (done) => {
    __cat(_readFile)('file').fork(_, eventuallyEqual('testd', done))

  });


});

