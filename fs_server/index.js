const express = require('express');
const app = express();
const cors = require('cors');
const DAO = require('./dao');
const mongodb = require('./mongodb');

const client = mongodb.client;

var dao = new DAO();
app.use(cors());
app.use(express.json());

app.get('/user/:email', function (req, res) {
  let contenType = req.header('Accept');

  if (contenType === 'application/json') {
    console.log("New GET request with email param ",req.params.email)
    dao.findUserByEmail(req.params.email)
      .then(result => {
        res.send(result[0]);
      })
  }
});

app.post('/signin', function (req, res) {

  let contenType = req.header('Content-Type');

  if (contenType === 'application/json') {

    console.log("New POST request with content: ", req.body);
    dao.isUserWithEmail(req.body.signin_email)
      .then(result => {
        if (result) { //there is a user with this email
          dao.findUserByEmail(req.body.signin_email)
            .then(userResult => {
              if (userResult[0]._password === req.body.signin_password) { //correct password
                console.log("User signin successfully! Send status 202.");
                res.status(202).send({ msg: "Ο χρήστης εισήγαγε σωστά τα στοιχεία εισόδου!" });
              }
              else { //false password
                console.log("User signin not successful! Send status 410.");
                res.status(410).send({ msg: "Τα στοιχεία σύνδεσης είναι λάθος!" });
              }
            })
        }
        else { //no user with this email
          console.log("Email doesnt match any users! Send status 411.");
          res.status(411).send({ msg: "Το email που καταχωρήθηκε δεν αντιστοιχεί σε κάποιον χρήστη!" });
        }
      })
  }
})

app.post('/registerUser', function (req, res) {

  let contenType = req.header('Content-Type');

  if (contenType === 'application/json') {

    console.log("New POST request with content: ", req.body);
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
})

client.connect()
  .then(() => {
    console.log("Database connected!");
    app.listen(8080);
    console.log("Server is listening to port 8080!");
  })
