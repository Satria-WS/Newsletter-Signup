// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();

//create body-parser, for grab the data from the sign up form
app.use(bodyParser.urlencoded({
    extended: true
}));
//create path static folder , for keep css or other files
app.use(express.static("public"));

//create home route 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});

// Setting up MailChimp
mailchimp.setConfig({
  apiKey: "4cf62c58223f7bd40723805b5838ff62-us14",
  server: "us14",
});

//create post route
app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const listId = "c4fc82ed35";
    //creating object with the users data
    const subscribingUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    //uploading data to server
    async function callPing() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            }


        });

        res, sendFile(__dirname + "/success.html");
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}`
        );
    }

    console.log(firstName , lastName , email);
    callPing().catch(e => res.sendFile(__dirname + "/failure.html"));
});

//listening Both of Heroku and local port.
app.listen(process.env.PORT||3000, () => {
  console.log("server is running on port 3000");
});

/* 
//listening HEROKU PORT
app.listen(process.env.PORT, ()=> {
    console.log("Server is running on port HEROKU");
})

//listening port 3000
app.listen(3000 , ()=> {
    console.log("local server is running on port 3000")
})
 */




//API key: 737ee8835f3f138146613adf9c5a94e0-us14
//List Id : c4fc82ed35