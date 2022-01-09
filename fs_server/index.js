//https://youtu.be/xVYa20DCUv0
var express = require('express');
var app = express();
var cors = require('cors');
const DAO = require('./dao');
//const User = require('./user');
//user = dao.User("a","a","a","a","a","a","a");
let dao = new DAO();
//console.log(user);

app.use(cors());
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world' + req.params.id)
  console.log("hello world")
});
app.post('/', function (req,res) {
    //let contentype = req.header('Content-Type');

    // if (contentype === 'application/json') {
    //     console.log('json',req.body)
    // }

    //res.send("hi");
    res.status(201).send("res");
    console.log("post", req.body);
});

//app.listen(8080);