const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    imageURL: { type: String },
    public_id: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Photo', PhotoSchema);