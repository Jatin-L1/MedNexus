const express = require('express');
const router = express.Router();
const { ChatMessage } = require('../websocket-chat');

// Get chat messages for a specific emergency
router.get('/messages/:emergencyId', async (req, res) => {
  try {
    const messages = await ChatMessage.find({ 
      emergencyId: req.params.emergencyId 
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat messages' });
  }
});

module.exports = router;