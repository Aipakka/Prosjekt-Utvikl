const express=require("express");
const bcrypt=require("bcrypt");
const path=require("path");
const { response }=require("express");
const db=require("better-sqlite3")("ChatWebpageDB.db");
const session = require("express-session");
const app=express();
app.use(express.urlencoded({extended: true}));
const publicPath=path.join(__dirname, "/Public");
app.use(express.static(publicPath));








app.listen(port, bgg)
function bgg(){
    console.log("i am listenin g to your mother aslo called: " + port)
}