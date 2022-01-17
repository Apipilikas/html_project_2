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
app.post('/', function (req, res) {
  let contenType = req.header('Content-Type');

  if (contenType === 'application/json') {

    var size = Object.keys(req.body).length;
    console.log("New POST request with content: ", req.body, size);

    if (size==2){ //user sign in --profile.html
      dao.isUserWithEmail(req.body.signin_email)
      .then(result => {
        if (result) { //there is a user with this email
          dao.findUserByEmail(req.body.signin_email)
          .then(userResult => {
            console.log(userResult)
            console.log(userResult._password)
            console.log(req.body.signin_password)
            if(userResult.password === req.body.signin_password){ //correct password
              console.log("User signin successfully! Send status 202.");
              res.status(202).send({ msg: "Ο χρήστης εισήγαγε σωστά στοιχεία εισόδου!" });
            }
            else{ //false password
              console.log("User signin not successful! Send status 410.");
              res.status(410).send({ msg: "Τα στοιχεία σύνδεσης είναι λάθος!" });
            }
          })
        }
        else{ //no user with this email
          console.log("Email doesnt match any users! Send status 411.");
          res.status(411).send({ msg: "Το email που καταχωρήθηκε δεν αντιστοιχεί σε κάποιον χρήστη!" });
        }
      })
    }

    else { //user sign up --register.html
      dao.isUserWithEmail(req.body.email)
      .then(result => {
        if (result) {
          console.log("User already exists! Send status 409.");
          res.status(409).send({ msg: "Το email που καταχωρήθηκε χρησιμοποιείται από άλλον χρήστη!" });
        }
        else {
          dao.addUser(req.body)
            .then(() => {
              console.log("User added successfully! Send status 201.");
              res.status(201).send({ msg: "Ο χρήστης καταχωρήθηκε με επιτυχία!" });
            })
        }
      })
    }
  }

  else {
    res.status(400).send({ msg: "Τα δεδομένα που στάλθηκαν δεν υποστηρίζονται από τον server!" });
  }
});

client.connect()
  .then(() => {
    console.log("Database connected!");
    app.listen(8080);
    console.log("Server is listening to port 8080!");
  })