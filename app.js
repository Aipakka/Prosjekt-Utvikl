const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("better-sqlite3")("ShoppingDB.sdb");
const session = require("express-session");
const hbs = require("hbs");
const { request } = require("http");
const { response } = require("express");
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


//lager brukere og sjekker at brukernavnet ikke kan vere et duplikat
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

//logger brukeren inn med info som blir sjekket opp mot databasen, og setter opp en session til brukeren
app.post("/login", async (request, response) => {
    const data = request.body;
    let hash = await bcrypt.hash(data.password, 10)
    let logindata = db.prepare("SELECT iduser, username, password FROM user WHERE username=?").get(data.username)
    if (logindata && await bcrypt.compare(data.password, logindata.password)) {
        request.session.userloggedinidfkwdwhtdttiifa = true;
        request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol = logindata;;;;;;

        response.redirect("/shopsite.html")
    } else {
        response.redirect("/feilpassord.html")
    }
})
app.post("/lagebrukerfraloginn", (request, response) =>{
    response.redirect("/signup.html")
})
//sletting av bruker fra databasen
app.post("/mordavsel", async (request, response) => {
    db.prepare("DELETE FROM shoppinCart WHERE user_iduser = ?").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser)
    db.prepare("DELETE FROM user WHERE iduser = ? AND username = ?").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.username)
    response.redirect("/")
})

//post metode for å logge ut brukeren
app.post("/altf4", async (request, response) => {
    request.session.destroy();
    response.redirect("/index.html")
})

//koden som sjekker hva brukeren har valgt å legge til i handlekurven, for å så legge det til å knytte
//det opp mot brukeren som la inn forespørselen
app.post("/cart", (request, response) => {
    const item = request.body.items;
    console.log(item)
    if (item === "bread") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts, description) VALUES (?, ?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 1, item)
        shoppinglist = db.prepare("SELECT description FROM shoppinCart WHERE user_iduser=?").all(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
    } else {
        console.log("u should want to die, bread failed")
    }
    if (item === "cereal") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts, description) VALUES (?, ?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 2, item)
        shoppinglist = db.prepare("SELECT description FROM shoppinCart WHERE user_iduser=?").all(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
        console.log("cope4")
    } else {
        console.log("u should want to die, cereal failed")
    }
    if (item === "milk") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts, description) VALUES (?, ?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 3, item)
        shoppinglist = db.prepare("SELECT description FROM shoppinCart WHERE user_iduser=?").all(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })

    } else {
        console.log("u should want to die, milk failed")
    }
    if (item === "nutz") {
        db.prepare("INSERT INTO shoppinCart (user_iduser, products_idproducts, description) VALUES (?, ?, ?);").run(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, 4, item)
        shoppinglist = db.prepare("SELECT description FROM shoppinCart WHERE user_iduser=?").all(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
        response.render("cart.hbs", {
            shoplist: shoppinglist
        })
    } else {
        console.log("u should want to die, nutz failed")
    }

})

//metode for å komme deg til handlekurven din uten å legge noe til i den
app.post("/cartalternate", (request, response) => {
    shoppinglist = db.prepare("SELECT description FROM shoppinCart WHERE user_iduser=?").all(Number(request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser))
    response.render("cart.hbs", {
        shoplist: shoppinglist
    })
})

//endrer passord knyttet til brukeren i databasen og logger brukeren ut
app.post("/pswdchange", async(request, response) =>{
    const pswdchang = request.body;
    let hash = await bcrypt.hash(pswdchang.password, 10)
    db.prepare("UPDATE user SET password = ? WHERE iduser = ? AND username = ?;").run(hash, request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.iduser, request.session.dataabouttheuserwhomiscurentlyloggedinntothiswebsitlol.username)
    request.session.destroy()
    response.redirect("/index.html")

})

//setter siden som du skal dra til om ud bare drar til localhost uten noe annet
app.get("/", (request, response) => {
    response.redirect("/index.html")
})

//sjekker en spesifikk port som er satt tidligere og sjekker når den er tilgjengelig, dette er hvro localhosten kjører
app.listen(port, bgg)
function bgg() {
    console.log("i am listenin g to your mother aslo called: " + port)
}