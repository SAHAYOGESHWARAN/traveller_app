const express = require('express');
const { createPost, likePost, commentPost } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);
router.put('/like/:id', likePost);
router.post('/comment/:id', commentPost);

module.exports = router;
