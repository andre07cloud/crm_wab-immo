const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = ArchivelSchema = new Schema(
    {
        fichier:{
            type: String, required: true,
        },
        contact: {
            type: Schema.ObjectId,
            ref: 'Contact'
        },
        conseiller: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Archive', ArchivelSchema);