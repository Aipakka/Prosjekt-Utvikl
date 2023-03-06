const express=require("express");
const bcrypt=require("bcrypt");
const path=require("path");
const { response }=require("express");
const db=require("better-sqlite3")("ShoppingDB.sdb");
const session = require("express-session");
const hbs = require("hbs")
const app=express();
const port =3000;
app.use(express.urlencoded({extended: true}));
const viewPath = path.join(__dirname, "/views/pages")
const partialsPath = path.join(__dirname, "/views/partials")
const publicPath=path.join(__dirname, "/Public");
app.use(express.static(publicPath));
app.set("view engine", hbs)
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(session({
    secret: "tiddiesjihugyftdchgvjbknlkjøoiu9y8t7r6dytfuhkpåiuy9t8fudytchgjvbklnøjoipu90y89t786rdycghjvaszxdfybklnkijy8t9786fyuvh",
    resave: false,
    saveUninitialized: false
}))



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
    let logindata = db.prepare("SELECT iduser, username, password FROM user WHERE username=?").get(data.username)
    if (logindata && await bcrypt.compare(data.password, logindata.password) ){
        request.session.userloggedinidfkwdwhtdttiifa = true;
        request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol = logindata;;;;;;
        console.log(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol)
        response.redirect("/shopsite.html")
    }else{
        response.redirect("/fuckdegfeilpassord.html")
    }
})

app.post("/deleteuser", async(request,response) =>{
    const data = request.body
    db.prepare("DELETE FROM shoppinCart WHERE user_iduser = '?'").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
    db.prepare("DELETE FROM user WHERE iduser = '?' AND  username = '?'").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.username)
    response.redirect("/")

})
app.post("/cart",  async(request, response) =>{
    const item = request.body;
    console.log(item)
    if (item = "bread"){    
    db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 1)
    response.render("cart.hbs")
    }else if (item = "cereal"){    
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 2)
        response.render("cart.hbs")
        }else if (item = "milk"){    
            db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 3)
            response.render("cart.hbs")
            }else if (item = "nutz"){    
                db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 4)
                shoppinglist = db.prepare("SELECT products_idproducts FROM shoppinCart WHERE user_iduser=?").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
                response.render("cart.hbs",{
                    shoplist: shoppinglist
                })
                }

})

app.get("/", (request, response) =>{
    response.redirect("/index.html")
})

app.listen(port, bgg)
function bgg(){
    console.log("i am listenin g to your mother aslo called: " + port)
}