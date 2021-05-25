const Post = require('./../models/posts.class');


class PostsController {

    index(req, res, next) {
        const pageSize = +req.query.pageSize;
        const currentPage = +req.query.page;
        const postQuery = Post.find();
        let fetchedPosts;
        if (pageSize && currentPage) {
            postQuery
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize)
        }
        postQuery
            .then((document) => {
                fetchedPosts = document;
                return Post.countDocuments()
            })
            .then(count => {
                res.status(200).json({
                    posts: fetchedPosts,
                    maxPosts: count,
                })
            });
    }

    getPost(req, res, next) {
        Post.findById(req.params.id).then((data) => {
            res.status(200).json(data)
        })
    }

    edit(req, res, next) {
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
        })
        Post.updateOne({ _id: req.params.id }, post)
            .then(result => {
                console.log(result)
                res.status(200).json({ message: "updated successfully" })
            })
    }

    add(req, res, next) {
        const url = req.protocol + '://' + req.get("host");
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file.filename
        })
        post.save().then((createdPost) => {
            res.status(201).json({
                message: 'Success',
                post: {
                    id: createdPost._id,
                    title: createdPost.title,
                    content: createdPost.content,
                    imagePath: createdPost.imagePath
                }
            });
        });
    }

    deletePost(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: "Post deleted" });
            })
    }



}


module.exports = new PostsController();