const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = ContactSchema = new Schema(
    {
        firstName:{
            type: String, maxlength:50,
        },
        lastName:{
            type: String, maxlength:50,
        },
        email:{
            type: String, required: true, unique:true
        },
        phone : {
            type: String, required: true, unique:true
        },
        civilite : {
            type: String
        },
        adresse : {
            type: String
        },
        code_postal : {
            type: Number
        },
        date_naissance : {
            type: Date
        },
        ville : {
            type: String
        },
       
        isOk: {
            type: Boolean,
            default: false
        },
        _creator: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
