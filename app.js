const express = require("express");
//const bodyParser = require("body-parser");
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/services", function (req, res) {
    // this is synchronous, which I believe means it will get slow with heavy site traffic?
    const jsonData = require('./services.json'); 
    //a temporary system for getting json data, later this should read from Muhammed's database

    console.log('services request')
    res.send(jsonData); 
});

app.listen(4000, function(){
    console.log("Server is running on port 4000");
  });