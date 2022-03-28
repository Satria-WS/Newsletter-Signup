const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const response  = require("express");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    console.log(firstName, lastName , email);
});

let data = {
    members: [
        {
            email_address: email,
            status:"subscribed",
            merger_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
}

const jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/c4fc82ed35";
const options = {
    method: "POST",
    auth: "tole: 4cf62c58223f7bd40723805b5838ff62-us14"
}


const request = https.request(url,option,()=> {
    response.on("data", (data)=> {
        console.log(JSON.parse(data));
    })
})


request.write(jsonData);
request.end();

app.listen(3001 , ()=> {
    console.log("server is running up on port 3001")
})

//List Id : c4fc82ed35
//apiKey: "4cf62c58223f7bd40723805b5838ff62-us14",