const express = require("express");
const controller = require('../controllers/contacts/contactControllers');
const myAuthorization = require('../controllers/auth/verifyToken');
const csvController = require('../../uplaod/testcvs');

var contactRouter = express.Router() ;

    // // Get user list
     contactRouter.get('/list', controller.all);
    // //Create user
     contactRouter.post('/create', controller.addContact);
        
    // //Update user
        contactRouter.put('/:id', controller.updateContact); 
    //Delete user
    contactRouter.delete('/:id', controller.remove);
    // Show user details
    contactRouter.get('/:id', controller.one);

    contactRouter.post('/update', controller.Updatecsv);
    contactRouter.post('/addcsv', csvController.addContactByCsv);
        
    //**************************************** *//
    //Test remote API deployed on AWS
    contactRouter.get('/test', controller.test);



//Export route to be used on another place
module.exports = contactRouter;