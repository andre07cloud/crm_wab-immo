

const cryptoJS = require("crypto-js");
const Contact = require('../../models/contacts');
const roles = require('../../models/roles');
const csv = require('csv-parser');
const csv2 = require('fast-csv').parse;
const path = require("path");
//const monpath = require('../../../uplaod/')

// File Csv UPLOAD
const bodyParser = require("body-parser");
const parse = require('csv-parse').parse
const fs = require('fs');
// var readline=require('readline');
// var stream=require('stream');

//CREATE Contact

exports.addContact = async (req, res) => {
    
    let newContact = new Contact(req.body);
    try{
        const savedContact = await newContact.save();
            console.log(savedContact)
            res.status(201).json(savedContact);
        
    } catch(e){
        //console.log(savedContact);
        console.log(e);
        res.status(500).json(e);
    }
    
};

//Add contact from csv file
exports.addContactByCsvLost = async (req, res) => {
    

    const results = [];

    fs.createReadStream('../../../uplaod/contact.csv')
        .pipe(csv({}))
        .on('data', (data) => results.push(data))
        .on('end', ()=> {
      console.log(results);
    });
    for(var element in results){
        let newContact = new Contact(element);
        try{
            const savedContact = await newContact.save();
            console.log(savedContact)
            res.status(201).json(savedContact);
        
        } catch(e){
            //console.log(savedContact);
            console.log(e);
            res.status(500).json(e);
        }
    }

    
    
};

exports.one = (req, res) =>{
    Contact.findById({id:req.params.id}, (err, obj) => {
        //console.log(obj);
        res.json(obj);
    });
    
};


exports.all = (req, res) =>{
    Contact.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


exports.updateContact = async(req, res) => {
    
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedContact);
    } catch(err){
        res.status(500).json(err);
    }
};



exports.Updatecsv = async(req, res)  => {

    try{
            
        //console.log(req.body)
        var data =req.body.file;
        var ex=req.body.ex;
        var name=req.body.name;
        console.log('=====> '+data);
        console.log('=======> '+name);
        console.log('=================> '+ex);
	var newHeader = 'Y2l2aWxpdGUsbGFzdE5hbWUsZmlyc3ROYW1lLGFkcmVzc2UsY29kZV9wb3N0YWwsdmlsbGUsZGF0ZV9uYWlzc2FuY2UscGhvbmUsZW1haWwK'
	data= newHeader + data.substring(96);
	
        console.log('=====>NEWWWWWWWWW '+data);
     
        if( ex=='jpg' || ex =='png' || ex== 'jpeg' || ex== 'pdf' || ex== 'mp4'){
            console.log('IMAGE');
            var buff = new Buffer.from(data,'base64');
            fs.writeFile('./uplaod/'+name,buff, {encoding: 'base64'}, function (err) {
            if (err) return console.log(err);
        console.log('=======>'+name);
        console.log('=================>'+ex);
        res.status(404).json({msg:'image ou doc ou video bien recu'})
                
        });

    }
        if( ex =='csv' || ex == 'txt' )
        {
            console.log('texte');
            var buff = new Buffer.from(data ,'base64');
            var text = buff.toString('ascii');
            fs.writeFile('./uplaod/'+name,text,function async (err)  {
                console.log('=======>'+name);
                console.log('=================>'+ex);
                if (err) return console.log(err);

                //add+++++++
                var response = [];
                fs.createReadStream('./uplaod/'+name)
                .pipe(csv({}))
                .on('data', (data) => response.push(data))
                .on('end', async ()=> {
                    console.log(response);
                    console.log("===========================>++++++++++++++++++++++++++");
                    //Save to DB
                  for(var element of response){

                    console.log('++++++++++++++++ELEMENT: '+Object.keys(element));

                    let newContact = new Contact({
                        firstName: element.firstName,
                        lastName: element.lastName,
                        email: element.email,
                        phone: element.phone,
                        civilite: element.civilite,
                        date_naissance: element.date_naissance,
                        adresse: element.adresse,
                        code_postal: element.code_postal,
                        ville: element.ville
                    });
                    try{
                    const savedContact = await newContact.save();
                    console.log("===========================>SSSSSSSSSSSSAAAAAAAAAAAVVVVEEEEE");
                    console.log(savedContact)
                    

                    } catch(e){
                    //console.log(savedContact);
                    console.log(e);
                    res.status(500).json(e);
                    }
              }  

              
                });

            });
    }
   // res.status(404).json({msg:'Contacts du csv enregistes avec succes'});
      //console.log('freed', allocator.free(offset), 'bytes');
      Buffer.alloc();

        
   } catch(err){
        res.status(500).json(err);
    }
}


exports.remove = (req, res) =>{
    Contact.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Test remote API
exports.test = (req, res) =>{
    res.status(200).json("Test of API");
}
