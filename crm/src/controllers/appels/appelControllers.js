const cryptoJS = require("crypto-js");
const Appel = require('../../models/appels');
const Formateur = require('../../models/users');
const Contact = require('../../models/contacts');
const roles = require('../../models/roles');


//CREATE Appel

exports.addAppel = async (req, res) => {
    var formateur = await Formateur.findById(req.params.formateur);
    var contact = await Contact.findById(req.params.contact);
    let newAppel = new Appel({
        duree_appel: req.body.duree_appel,
    });
    newAppel.formateur = formateur;
    newAppel.contact = contact;
    try{
        const savedAppel = await newAppel.save();
            console.log(savedAppel)
            res.status(201).json(savedAppel);
        
    } catch(e){
        //console.log(savedAppel);
        console.log(e);
        res.status(500).json(e);
    }
    
};

exports.one = (req, res) =>{
    Appel.findById({id:req.params.id}, (err, obj) => {
        //console.log(obj);
        res.json(obj);
    });
    
};

exports.history = (req, res) =>{
    //var endDate = startingDate;
    var endDate = req.params.startingDate + 'T23:59:59';
    Appel.find({createdAt: {$gte: req.params.startingDate, $lte: endDate}}, (err, obj) => {
        console.log(obj);
        console.log("HISTORY");
        console.log(err);
        res.json(obj);
    });
    
};


exports.all = (req, res) =>{
    Appel.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

exports.callByContact = (req, res) =>{
    Appel.find({contact:req.params.contactId},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

exports.updateAppel = async(req, res) => {
    
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedAppel = await Appel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedAppel);
    } catch(err){
        res.status(500).json(err);
    }
};


exports.remove = (req, res) =>{
    Appel.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Test remote API
exports.test = (req, res) =>{
    res.status(200).json("Test of API");
}
