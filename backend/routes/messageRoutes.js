const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, sendMessage);  // Send a message
router.get('/', authMiddleware, getMessages);   // Get all messages for the logged-in user

module.exports = router;
