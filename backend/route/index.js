const postsRouter = require('./routes/posts.route');
const usersRouter = require('./routes/users.route');

function route(app) {
  app.use('/api/posts', postsRouter);
  app.use('/api/users', usersRouter);
}

module.exports = route;
