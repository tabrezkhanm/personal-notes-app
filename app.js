//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to personal notes app.Here you can manage all your notes on the go with full flexibility and reliablity of the content.";
const aboutContent = "At this dwelling the street was said to be the entrance to the Zen, to the kids. It was said that the entrance to the world is to be delivered from the pain of the bears. Not a small boat but a porch. Each street is said to be pure arrows. But he wanted to hang on to the laughter of the price rather than the Olympic asset. Mauris in aliquam sem fringilla. There is always laughter in the planning of the pregnant makeup, everyone does not have land orcs. Love the mass of life, the torturer who can or should For example, the arrows of life as the earth element. Mauris ultrices eros in cursus turpis massa tincidunt dui..";
const contactContent = "Contact on below mobile numbers: 140-310-206";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var contentList = [];
var authorList = [];
var composeDate = [];
contentList.push(homeStartingContent);
authorList.push("Admin");

var currentDate = function(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
composeDate.push(currentDate());



app.get("/",function(req,res){
    res.render("home",{authorList : authorList , contentList: contentList , composeDate : composeDate});
    
});
app.get("/about",function(req,res){
    res.render("about",{about:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contact: contactContent})
});

app.get("/compose",function(req,res){
    res.render("compose");
    
    
})

app.post("/compose",function(req,res){
    var text = req.body.authorName;
    var content = req.body.content;
    console.log(text+" : "+content);
    contentList.push(content);
    authorList.push(text);
    composeDate.push(currentDate());
    
    res.redirect("/");
    
    
});
app.post("/",function(req,res){
    res.redirect("/compose");
})


app.get("/posts/:testing",function(req,res){
    res.send(req.params.testing);
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
