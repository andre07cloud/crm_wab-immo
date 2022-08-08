
const Planification = require('../../models/planifications');
const Formateur = require('../../models/users');
const Contact = require('../../models/contacts');
//CREATE Planification

exports.addPlanification = async (req, res) => {
    var formateur = await Formateur.findById(req.params.formateur);
    var contact = await Contact.findById(req.params.contact);
    var newPlanification = new Planification({
        object_plan: req.body.object_plan,
        lien_rdv: req.body.lien_rdv,
        date_rdv: req.body.date_rdv
    });
    newPlanification.formateur = formateur;
    newPlanification.contact = contact;
    try{
        const savedPlanification = await newPlanification.save();
            console.log(savedPlanification)
            res.status(201).json(savedPlanification);
        
    } catch(e){
        //console.log(savedPlanification);
        console.log(e);
        res.status(500).json(e);
    }
    
};

exports.one = (req, res) =>{
    Planification.findById({id:req.params.id}, (err, obj) => {
        //console.log(obj);
        res.json(obj);
    });
    
};


exports.all = (req, res) =>{
    Planification.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

exports.planByContact = (req, res) =>{
    Planification.find({contact:req.params.contactId},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


exports.updatePlanification = async(req, res) => {
    
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedPlanification = await Planification.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedPlanification);
    } catch(err){
        res.status(500).json(err);
    }
};


exports.remove = (req, res) =>{
    Planification.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Test remote API
exports.test = (req, res) =>{
    res.status(200).json("Test of API");
}
