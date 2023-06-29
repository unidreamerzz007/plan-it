const {MongoClient} = require("mongodb");

let mongo;
let db;
var curUser = {};
let eventId=0;
const fs = require('fs');
async function insertUserDetails(userDetails){

    let isok = false;
    
    
    mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
    db = mongo.db("test");
    console.log(userDetails['email']);
    const givenmail = userDetails['email'];
    user = await db.collection('users').find({"email": givenmail}).limit(1).toArray();
    console.log(user);
    if(user.length==0){
    await db.collection('users').insertOne(userDetails);
    mongo.close();
    curUser =  userDetails;
    return "Signup successful";
    }
    else
    return "email already exist"

}

async function insertOrgDetails(orgDetails){

  let isok = false;
  
  
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  console.log(orgDetails['email']);
  const givenmail = orgDetails['email'];
  user = await db.collection('organizers').find({"email": givenmail}).limit(1).toArray();
  console.log(user);
  if(user.length==0){
  await db.collection('organizers').insertOne(orgDetails);
  mongo.close();
   curUser = orgDetails;
  return "Signup succes                              sful";
 
  }
  else
  return "email already exist"

}



async function getUsers(){
    mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
    db = mongo.db("test");
    let res = await db.collection('users').find({}).toArray();
    
    mongo.close();
    return res;
    
    }
async function insertEvent(data){
 
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  isexist = await db.collection('events').find({title: data['title']}).limit(1).toArray();
  if(isexist.length==0){
  await db.collection('events').insertOne(data);
  mongo.close();
  return 200;
  }
  else
  return 403;
  

}

async function getEvents(){

  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  let res = await db.collection('events').find({}).toArray();
  
  mongo.close();
  return res;
}

async function getEventsOrg(){

  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  let res = await db.collection('events').find({organizer:curUser['name']}).toArray();
  console.log(curUser['name']);
  mongo.close();
  return res;
}



async function login(cred){
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  console.log(cred["email"]);
  const givenmail = cred['email'];
  user = await db.collection('users').find({"email": givenmail}).limit(1).toArray();
  console.log(user);
  if(user.length==0){
  return "User not found";
  }
  else
  {
    console.log(user[0]['password']);
    console.log(console.log(user[0]['password\n']));
    if(cred['password'] == user[0]['password']){
    curUser =  user[0];
    console.log('current user '+curUser['name']);
    return "Login Successful";
    
    }
    else
    return "incorrect password"
  }
}
function curUserNoPass(){
  console.log(curUser['name']);
  const curusernopass = {
    name:curUser['name'],
    email:curUser['email'],
    phone:curUser['phone']

  };
  return curusernopass;
}

async function orgLogin(cred){
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  console.log(cred["email"]);
  const givenmail = cred['email'];
  user = await db.collection('organizers').find({"email": givenmail}).limit(1).toArray();
  console.log(user);
  if(user.length==0){
  return "User not found";
  }
  else
  {
    console.log(user[0]['password']);
    console.log(console.log(user[0]['password\n']));
    if(cred['password'] == user[0]['password']){
    curUser =  user[0];
    console.log('current user '+curUser['name']);
    return "Login Successful";
    
    }
    else
    return "incorrect password"
  }
}

async function insertUsertoEvent(ename){
  console.log(curUser['name']==undefined);
  if(curUser['name']==undefined){
    return 204;
  }
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  const usernopass = curUserNoPass();
  check = await db.collection(`${ename}`).find({"email": usernopass['email']}).limit(1).toArray();
  
  console.log(usernopass['name']);
  if(check.length==0){
  await db.collection(`${ename}`).insertOne(usernopass);
  return 202;
  }
  else return 208;
}

async function getParticipants(){
  mongo = await MongoClient.connect(process.env.MONGO_URI||'mongodb+srv://namenotfound:shravantoxica@planit.zo1vmdu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }); 
  db = mongo.db("test");
  console.log("id is "+eventId);
  let list = await db.collection(eventId).find({}).toArray();
  
  mongo.close();
  return list;
}
    const multer = require('multer');  
    const path = require('path');

const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/api/send-register',async (req, res) => {
 // console.log("helloworld");
  const inputValue = req.query.value;
  const userdetails = JSON.parse(inputValue);
  console.log(userdetails['email']);
  const message =await insertUserDetails(userdetails);
  res.send({ message });
});

app.get('/api/getusers',async (req, res) => {
    // console.log("helloworld");
    
     const message =await getUsers();
     console.log(message);
     res.send(JSON.stringify(message));
});
   const upload = multer({ dest: 'public/uploads/' });
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   
app.post('/api/events', upload.single('image'),async (req, res) => {
const { eventTitle, location, date, time } = req.body;
const image = req.file;
let result;
console.log(eventTitle);

 const eventdata = {
  title:eventTitle,
  location:location,
  date:date,
  time:time,
  image:image,
  organizer:curUser['name']
}
console.log(eventdata);
 message =await insertEvent(eventdata);


      console.log(message);
      res.sendStatus(message);

   });

  app.get('/api/getevents',async (req, res) => {
    // console.log("helloworld");

    const message =await getEvents();
    console.log(message);
    res.send(JSON.stringify(message));
  });

   app.get('/api/send-login',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     console.log(JSON.parse(inputValue)['name']);
     const message =await login(JSON.parse(inputValue));
     res.send({ message });
   });



   app.get('/api/org-register',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     const userdetails = JSON.parse(inputValue);
     console.log(userdetails['email']);
     const message =await insertOrgDetails(userdetails);
     res.send({ message });
   });

   app.get('/api/org-login',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     console.log(JSON.parse(inputValue)['name']);
     const message =await orgLogin(JSON.parse(inputValue));
     res.send({ message });
   });

   app.get('/api/geteventsorg',async (req, res) => {
    // console.log("helloworld");
    
     const message =await getEventsOrg();
     console.log(message);
     res.send(JSON.stringify(message));
   });

   app.get('/api/addusertoevent',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     console.log(inputValue);
     const reply= await insertUsertoEvent(inputValue);
     
     res.sendStatus(reply);
   });

   app.get('/api/setselectedevent',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     console.log(inputValue);
     eventId =  inputValue;
     const reply= 200
     res.sendStatus(reply);
   });

   app.get('/api/getparticipants',async (req, res) => {
    // console.log("helloworld");
     const message =await getParticipants();
     console.log(message);
     res.send(JSON.stringify(message));
   });
   module.exports = app;