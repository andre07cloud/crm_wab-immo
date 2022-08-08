const express = require("express");
const controller = require('../controllers/appels/appelControllers');
const myAuthorization = require('../controllers/auth/verifyToken');

var appelRouter = express.Router() ;

    // // Get appel list
     appelRouter.get('/list', controller.all);
    // //Create appel
     appelRouter.post('/create/:formateur/:contact', controller.addAppel);
        
    // //Update appel
    appelRouter.put('/:id', controller.updateAppel); 
    //Delete appel
    appelRouter.delete('/:id', controller.remove);
    // Show appel details
    appelRouter.get('/:id', controller.one);

    // Show story call by Date
    appelRouter.get('/history/:startingDate', controller.history);    

    //Show call by Contact
    appelRouter.get('/contact/:contactId', controller.callByContact);

    //**************************************** *//
    //Test remote API deployed on AWS
    appelRouter.get('/test', controller.test);



//Export route to be used on another place
module.exports = appelRouter;