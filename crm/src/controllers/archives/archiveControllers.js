const cryptoJS = require("crypto-js");
const Archiv = require('../../models/archives');
const roles = require('../../models/roles');


//CREATE Archiv

exports.addArchiv = async (req, res) => {
    
    let newArchiv = new Archiv(req.body);
    try{
        const savedArchiv = await newArchiv.save();
            console.log(savedArchiv)
            res.status(201).json(savedArchiv);
        
    } catch(e){
        //console.log(savedArchiv);
        console.log(e);
        res.status(500).json(e);
    }
    
};

exports.one = (req, res) =>{
    Archiv.findById({id:req.params.id}, (err, obj) => {
        //console.log(obj);
        res.json(obj);
    });
    
};


exports.all = (req, res) =>{
    Archiv.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


exports.updateArchiv = async(req, res) => {
    
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedArchiv = await Archiv.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedArchiv);
    } catch(err){
        res.status(500).json(err);
    }
};


exports.remove = (req, res) =>{
    Archiv.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Test remote API
exports.test = (req, res) =>{
    res.status(200).json("Test of API");
}
