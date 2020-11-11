const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');

const app = express();

const homeContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor veritatis voluptate sit eum, expedita quos deserunt architecto ullam ipsum animi saepe numquam adipisci, magni eveniet eaque aut et iure necessitatibus. Facere unde porro laborum. Ipsa distinctio ullam debitis placeat odio dignissimos dolore quam. Asperiores ducimus pariatur molestiae natus quibusdam nam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor veritatis voluptate sit eum, expedita quos deserunt architecto ullam ipsum animi saepe numquam adipisci, magni eveniet eaque aut et iure necessitatibus. Facere unde porro laborum. Ipsa distinctio ullam debitis placeat odio dignissimos dolore quam. Asperiores ducimus pariatur molestiae natus quibusdam nam!";

const aboutContent = "Hi am Syed a blogger, web designer, and a student!";
const contactUs = "for more info on info@gtechmarket.com";
app.set('view engine', 'ejs');
const posts = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index', {home:homeContent, posts:posts})
})
app.get('/about', function(req, res){
    res.render('about', {about:aboutContent})
})
app.get('/contact', function(req, res){
    res.render('contact', {contact:contactUs})
})
app.get('/compose', function(req, res){
    res.render('compose');
})
app.get("/posts/:postName", function(req,res){
let requestedTitle =_.lowerCase(req.params.postName);
posts.forEach((post)=>{
    let storedTitle = _.lowerCase(post.title);
    if(requestedTitle===storedTitle){
        
            res.render("post", {title:post.title, content:post.content});
       
    }

})
})
app.post('/compose', function(req, res){
    const post = {
        title : req.body.postTitle,
        content: req.body.postContent,
    }
    posts.push(post);
    res.redirect("/");
})
app.listen(3000, function(){
    console.log("server started at port 3000");
})