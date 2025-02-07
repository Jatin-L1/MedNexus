const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    emergencyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Emergency', 
        required: true 
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    senderModel: { 
        type: String, 
        enum: ['Patient', 'Doctor'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);