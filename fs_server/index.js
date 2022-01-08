var express = require('express')
var app = express()

app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world' + req.params.id)
  console.log("hello world")
})
app.post('/', function (req,res) {
    let contentype = req.header('Content-Type');

    if (contentype === 'application/json') {
        console.log('json',req.body)
    }

    res.status(201).send();
    console.log("post", req.body);
})

app.listen(8080);