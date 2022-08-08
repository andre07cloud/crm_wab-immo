const express = require("express");
const controller = require('../controllers/archives/archiveControllers');
const myAuthorization = require('../controllers/auth/verifyToken');

var archivRouter = express.Router() ;

    // // Get archiv list
     archivRouter.get('/list', controller.all);
    // //Create archiv
     archivRouter.post('/create', controller.addArchiv);
        
    // //Update archiv
    archivRouter.put('/:id', controller.updateArchiv); 
    //Delete archiv
    archivRouter.delete('/:id', controller.remove);
    // Show archiv details
    archivRouter.get('/:id', controller.one);
        
    //**************************************** *//
    //Test remote API deployed on AWS
    archivRouter.get('/test', controller.test);



//Export route to be used on another place
module.exports = archivRouter;