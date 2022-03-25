// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//create path static folder , for keep css or other files

app.use(express.static("public"));

//create home route 
app.get("/" , (req,res)=> {
   res.sendFile(__dirname + "/signup.html")
})

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
})