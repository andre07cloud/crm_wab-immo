const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = UserSchema = new Schema(
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
        username : {
            type: String, required: true, unique: true
        },
        password : {
            type: String, required: true
        },
        campagne:{
            type: String
        },
        groupe:{
            type: String
        },
        isAdmin : {
            type: Boolean, default: false
        },
        role:{
            type: String, required:true,
            default: Role.ROLE_FORMATEUR, 
            enum:[Role.ROLE_SUPER_ADMIN, Role.ROLE_CONSEILLER, Role.ROLE_FORMATEUR]
        },
        active: {
            type: Boolean,
            default: false
        },
        creator: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        /* For user login */
        token: {
            type: String
        },
        expires: {
            type: Date
        },
        /* For reset password */
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        
    },
    { timestamps: true }
);

module.exports= User = mongoose.model('User', UserSchema);
