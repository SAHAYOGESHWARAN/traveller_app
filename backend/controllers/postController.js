const Post = require('../models/Post');

const createPost = async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.create({ user: req.user.id, text });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.user.id)) {
        post.likes = post.likes.filter(id => id !== req.user.id);
    } else {
        post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
};

const commentPost = async (req, res) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text });
    await post.save();
    res.json(post);
};

module.exports = { createPost, likePost, commentPost };
