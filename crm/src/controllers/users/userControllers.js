
const cryptoJS = require("crypto-js");
const User = require('../../models/users');
const roles = require('../../models/roles');


//CREATE USER

exports.addNewUser = async (req, res) => {
    var isAdmin=false;
    if(req.body.role==roles.ROLE_ADMIN){
        isAdmin=true;
        console.log("ADDDDDMMMIIINNN");
    }
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        username : req.body.username,
        campagne: req.body.campagne,
        groupe : req.body.groupe,
        role: req.body.role,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        creator: req.body.creator,
        isAdmin:isAdmin

    });
    try{
        const savedUser = await newUser.save();
            console.log(savedUser)
            res.status(201).json(savedUser);
        
    } catch(e){
        //console.log(savedUser);
        console.log(e);
        res.status(500).json(e);
    }
    
};


exports.one = (req, res) =>{
    User.findById({id:req.params.id}, (err, obj) => {
        //console.log(obj);
        res.json(obj);
    });
    
};


exports.all = (req, res) =>{
    User.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


exports.updateUser = async(req, res) => {
    
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
};

exports.test = (req, res) =>{
    res.status(200).json("Test of API");
}

exports.remove = (req, res) =>{
    User.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};