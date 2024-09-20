const express = require("express");
const path = require("path"); 
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use app.use instead of app.set for static files
app.use(express.static(path.join(__dirname, "public")));

let posts =[
    {
        id: uuidv4(),
        username :"aman",
        content: "i love coding"

    },
    {
        id: uuidv4(),
        username :"karan",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username :"rakesh",
        content: "i love coding"
    },
];
app.get("/posts", (req, res) => {
    // console.log("server working well");
    // res.send("Welcome!");

    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
   res.render("new.ejs");
});
//creating new post
app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});


});

app.delete("/posts/:id" ,(req,res) => {
    let { id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

 app.get("/", (req, res) =>  {
    console.log("server working well");
    res.send("Welcome!");
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
