const express=require("express");
const bcrypt=require("bcrypt");
const path=require("path");
const { response }=require("express");
const db=require("better-sqlite3")("prosjektdb.sdb");
const session = require("express-session");
const app=express();
const port =3000;
app.use(express.urlencoded({extended: true}));
const publicPath=path.join(__dirname, "/Public");
app.use(express.static(publicPath));

app.post("/sendinn",  async(request, response) =>{
    const data = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    if (!db.prepare("SELECT username FROM user WHERE username=?").get(data.username)){
        db.prepare("INSERT INTO user (username, password ) VALUES (?, ?)").run(data.username, hash)
    response.redirect("/login.html")
    }else{
    response.redirect("/signuperror.html")
    }
})

app.post("/login",  async(request, response) =>{
    const data = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    db.prepare("SELECT username, password FROM user WHERE username=?").get(data.username)
    response.redirect("/shopsite.html")
    console.log("titenjsofs")
    

})
app.get("/", (request, response) =>{
    response.redirect("/index.html")
}
)
app.listen(port, bgg)
function bgg(){
    console.log("i am listenin g to your mother aslo called: " + port)
}