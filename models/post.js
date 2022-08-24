const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    userId: { type: String },
    email: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    video: { type: String },
    usersLiked: [(type = String)],
    usersDisliked: [(type = String)],
    comments: {
        type: [{
            commenterId: String,
            commenterEmail: String,
            text: String,
            timestamp: Number,
        }],
    },


}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);