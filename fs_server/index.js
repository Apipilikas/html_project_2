//https://youtu.be/xVYa20DCUv0
const express = require('express');
const app = express();
const cors = require('cors');
const dao = require('./dao');

var dao = new DAO();
app.use(cors());
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world' + req.params.id)
  console.log("hello world")
});
app.post('/', function (req,res) {
    let contenType = req.header('Content-Type');

    if (contenType === 'application/json') {
      console.log('json',req.body);
      if (dao.isUserWithEmail(req.body.email)) {
        res.status(409);
        res.send('{msg:"Το email που καταχωρήθηκε υπάρχει ήδη!"}')
      }
      else {
        dao.addUser(req.body);
        res.status(201);
        res.send('{msg:"Ο χρήστης καταχωρήθηκε στο σύστημα με επιτυχία!"}');
      }
    }
    else {
      res.status(400);
      res.send('{msg:"Τα δεδομένα που στάλθηκαν δεν υποστηρίζονται από τον server!"}');
    }
});

app.listen(8080);