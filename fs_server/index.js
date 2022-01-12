//https://youtu.be/xVYa20DCUv0
const express = require('express');
const app = express();
const cors = require('cors');
const DAO = require('./dao');
const mongodb = require('./mongodb');

const client = mongodb.client;

var dao = new DAO();
app.use(cors());
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  //res.send('hello world' + req.params.id)
  console.log(dao.users())
  //console.log("hello world")
});
app.post('/', function (req,res) {
    let contenType = req.header('Content-Type');

    if (contenType === 'application/json') {
      console.log('json',req.body);
      //dao.addUser(req.body);
      dao.isUserWithEmail(req.body.name)
      .then(result => {
        if (result) {
          console.log("User already exists! Send status 409.")
          res.status(409);
          res.send('{msg:"Το email που καταχωρήθηκε υπάρχει ήδη!"}');
        }
        else {
          dao.addUser(req.body)
          .then (() => {
            console.log("User added successfully! Send status 201.")
            res.status(201);
            res.send('{msg:"Ο χρήστης καταχωρήθηκε στο σύστημα με επιτυχία!"}');
          })
        }
      })
    //   if (dao.isUserWithEmail(req.body.email)) {
    //     res.status(409);
    //     res.send('{msg:"Το email που καταχωρήθηκε υπάρχει ήδη!"}')
    //   }
    //   else {
    //     dao.addUser(req.body);
    //     res.status(201);
    //     res.send('{msg:"Ο χρήστης καταχωρήθηκε στο σύστημα με επιτυχία!"}');
    //   }
    // }
    // else {
    //   res.status(400);
    //   res.send('{msg:"Τα δεδομένα που στάλθηκαν δεν υποστηρίζονται από τον server!"}');
    }
    else {
      res.status(400);
      res.send('{msg:"Τα δεδομένα που στάλθηκαν δεν υποστηρίζονται από τον server!"}');
    }
});

client.connect()
.then(() => {
  console.log("Database connected!");
  app.listen(8080);
  console.log("Server is listening to port 8080!");
})