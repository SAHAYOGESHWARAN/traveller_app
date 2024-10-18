const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { receiver, message } = req.body;
    try {
        const newMessage = await Message.create({
            sender: req.user.id,
            receiver,
            message,
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    const messages = await Message.find({
        $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate('sender receiver', 'name email');
    res.json(messages);
};

module.exports = { sendMessage, get
