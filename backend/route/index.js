const postsRouter = require('./routes/posts.route')


function route(app) {
    app.use('/api/posts', postsRouter);
}

module.exports = route;