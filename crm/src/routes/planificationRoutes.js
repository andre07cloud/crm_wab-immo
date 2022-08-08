const express = require("express");
const controller = require('../controllers/planifications/planificationControllers');
//const myAuthorization = require('../controllers/auth/verifyToken');

var planificationRouter = express.Router() ;

    // // Get user list
     planificationRouter.get('/list', controller.all);
    // Create user
     planificationRouter.post('/create/:formateur/:contact', controller.addPlanification);
        
    //Update user
        planificationRouter.put('/:id', controller.updatePlanification); 
    //Delete user
    planificationRouter.delete('/:id', controller.remove);
    // Show planification details
    planificationRouter.get('/:id', controller.one);
    //Show planification by Contact
    planificationRouter.get('/contact/:contactId', controller.planByContact);
        
    //**************************************** *//
    //Test remote API deployed on AWS
    planificationRouter.get('/test', controller.test);



//Export route to be used on another place
module.exports = planificationRouter;