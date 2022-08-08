const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = PlanificationSchema = new Schema(
    {
        object_plan:{
            type: String
        },
        lien_rdv:{
            type: String, required: true, unique:true
        },
        date_rdv : {
            type: Date
        },
        isOk_plan: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model('Planification', PlanificationSchema);
