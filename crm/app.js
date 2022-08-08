const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser'); 
const superUser = require("./src/controllers/users/super_admin");
const initdb =require('./initdb');
const dotenv = require("dotenv").config();



//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//Use all parser utilities
app.use(express.json({limit: '1000000mb'}));
app.use(cookieParser());
//path of build web app to deploy in Node Js server
app.use(express.static(path.join(__dirname, './build/web')));


//allows multiple http request anywhere
app.use(cors());





const userRouter = require("./src/routes/userRoutes");
const contactRouter = require("./src/routes/contactRoutes");
const appelRouter = require("./src/routes/appelRoutes");
const archivRouter = require("./src/routes/archivRoutes");
const planificationRouter = require("./src/routes/planificationRoutes");

// All router app
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/appels', appelRouter);
app.use('/api/archives', archivRouter);
app.use('/api/planifications', planificationRouter);





//connection mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONG0_URL, {
  user: process.env.DBUSERNAME, 
  pass: process.env.DBPWD, 
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
console.log('base cree avec succes ');
//Create a first super user automatically

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log('mongodb running');

  superUser.createSuperUser();
  initdb.createAppelInit();
  initdb.createUserInit();
  initdb.createContactInit();
  initdb.createPlanificationInit();
  initdb.createArchivInit();
    
});

//App listener
app.listen(process.env.APP_PORT, () => 
  console.log(`your server is on port ${process.env.APP_PORT}`)
  );
