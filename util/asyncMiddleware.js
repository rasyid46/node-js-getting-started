const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

  module.exports = asyncMiddleware;

  //https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016