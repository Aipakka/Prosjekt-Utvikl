const express=require("express");
const bcrypt=require("bcrypt");
const path=require("path");
const { response }=require("express");
const db=require("better-sqlite3")("prosjektdb.sdb");
const session = require("express-session");
const { request } = require("http");
const app=express();
const port =3000;
app.use(express.urlencoded({extended: true}));
const publicPath=path.join(__dirname, "/Public");
app.use(express.static(publicPath));

app.post("/sendinn",  async(request, response) =>{
    //const svar = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    db.prepare("INSERT INTO user (username, password ) VALUES (?, ?)").run(data.username, hash)
    response.redirect("/login.html")

})

app.listen(port, bgg)
function bgg(){
    console.log("i am listenin g to your mother aslo called: " + port)
}