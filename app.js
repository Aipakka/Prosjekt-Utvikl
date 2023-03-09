const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const { response } = require("express");
const db = require("better-sqlite3")("ShoppingDB.sdb");
const session = require("express-session");
const hbs = require("hbs");
const { isArray } = require("util");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const viewPath = path.join(__dirname, "/views/pages")
const partialsPath = path.join(__dirname, "/views/partials")
const publicPath = path.join(__dirname, "/Public");
app.use(express.static(publicPath));
app.set("view engine", hbs)
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(session({
    secret: "tiddiesjihugyftdchgvjbknlkjøoiu9y8t7r6dytfuhkpåiuy9t8fudytchgjvbklnøjoipu90y89t786rdycghjvaszxdfybklnkijy8t9786fyuvh",
    resave: false,
    saveUninitialized: false
}))



app.post("/sendinn", async (request, response) => {
    const data = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    if (!db.prepare("SELECT username FROM user WHERE username=?").get(data.username)) {
        db.prepare("INSERT INTO user (username, password ) VALUES (?, ?)").run(data.username, hash)
        response.redirect("/login.html")
    } else {
        response.redirect("/signuperror.html")
    }
})

app.post("/login", async (request, response) => {
    const data = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    let logindata = db.prepare("SELECT iduser, username, password FROM user WHERE username=?").get(data.username)
    if (logindata && await bcrypt.compare(data.password, logindata.password)) {
        request.session.userloggedinidfkwdwhtdttiifa = true;
        request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol = logindata;;;;;;

        response.redirect("/shopsite.html")
    } else {
        response.redirect("/fuckdegfeilpassord.html")
    }
})

app.post("/mordavsel", async (request, response) => {
    db.prepare("DELETE FROM shoppinCart WHERE user_iduser = ?").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
    db.prepare("DELETE FROM user WHERE iduser = ? AND username = ?").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.username)
    response.redirect("/")
})
app.post("/altf4", async (request, response) => {
    console.log("jnflkøerngkjlwwjotfwgripfoegphidfjsdrftgyhujikokoijytrew1234567890++0987654321'1234567890+0987654321'2345678987654321'2345678987652qaw3sedrft")
    request.session.destroy();
    response.redirect("/index.html")
})
app.post("/cart", (request, response) => {
    const item = request.body.items;
    console.log(item)
    if (item === "bread") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts, description) VALUES (?, ?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 1, item)
        shoppinglist = db.prepare("SELECT products_idproducts FROM shoppinCart WHERE user_iduser=?").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
        console.log(shoppinglist)
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
    } else {
        console.log("u should want to die, bread failed")
    }
    if (item === "cereal") {
        console.log("cope")
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 2)
        console.log("cope2")
        shoppinglist = db.prepare("SELECT products_idproducts FROM shoppinCart WHERE user_iduser=?").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
        console.log("cope3")
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
        console.log("cope4")
    } else {
        console.log("u should want to die, cereal failed")
    }
    if (item === "milk") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 3)
        shoppinglist = db.prepare("SELECT products_idproducts FROM shoppinCart WHERE user_iduser=?").get(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
        response.render("cart.hbs", {
            shoplist: shoppinglist

        })

    } else {
        console.log("u should want to die, milk failed")
    }
    if (item === "nutz") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts) VALUES (?, ?);").run(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser), 4)
        shoppinglist = db.prepare("SELECT products_idproducts FROM shoppinCart WHERE user_iduser=?").get(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
        item = "";
    } else {
        console.log("u should want to die, nutz failed")
    }

})

app.get("/", (request, response) => {
    response.redirect("/index.html")
})

app.listen(port, bgg)
function bgg() {
    console.log("i am listenin g to your mother aslo called: " + port)
}