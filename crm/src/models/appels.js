const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = AppelSchema = new Schema(
    {
        duree_appel:{
            type: String, required: true,
        },
        formateur: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        contact: {
            type: Schema.ObjectId,
            ref: 'Contact'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appel', AppelSchema);