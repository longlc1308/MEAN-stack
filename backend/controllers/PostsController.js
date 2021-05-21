const Post = require('./../models/posts.class');


class PostsController {

    index(req, res, next) {
        Post.find().then((document) => {
            res.status(200).json({
                posts: document
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
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
        })
        post.save().then((createdPost) => {
            res.status(201).json({
                message: 'Success',
                postId: createdPost._id
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