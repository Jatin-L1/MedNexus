const router = require('express').Router();
const ChatMessage = require('../models/ChatMessage');

// Send a message
router.post('/send', async (req, res) => {
  const { emergencyId, senderId, senderModel, message, timestamp } = req.body;

  try {
    const newMessage = new ChatMessage({ 
      emergencyId, 
      senderId, 
      senderModel, 
      message, 
      timestamp 
    });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: 'Error sending message' });
  }
});

// Get messages for a specific emergency
router.get('/:emergencyId', async (req, res) => {
  const { emergencyId } = req.params;

  try {
    const messages = await ChatMessage.find({ emergencyId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;