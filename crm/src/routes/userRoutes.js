const express = require("express");
const controller = require('../controllers/users/userControllers');
const auth = require('../controllers/auth/authentification');
const myAuthorization = require('../controllers/auth/verifyToken');

var userRouter = express.Router() ;

    // // Get user list
     userRouter.get('/list', controller.all);
    // //Create user
     userRouter.post('/create', controller.addNewUser);
        
    // //Update user
        userRouter.put('/:id', controller.updateUser); 
    //Delete user
    userRouter.delete('/:id', controller.remove);
    // Show user details
    userRouter.get('/:id', controller.one);
        
    //************LOGIN ROUTE********************
    userRouter.post('/login', auth.login);
    //**************************************** *//
    //Test remote API deployed on AWS
    userRouter.get('/test', controller.test);



//Export route to be used on another place
module.exports = userRouter;