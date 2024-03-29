const express  = require("express");
const control = require("../control/authControllers");
const User = require("../model/user")


const router = express.Router();

router.get("/login",control.getLogin);
router.post("/signUp",async function(req,res){
    const user = new User(req.body.name,req.body.phone);
    await user.save();
    res.redirect("/login");
})

router.get("/logout", async function(req,res){
    req.session.isAuth = false;
    return res.redirect("/");
})
router.post("/login",async function(req,res){
    const user = new User(req.body.name, req.body.phone);
    if(await user.exists()){
        req.session.name = user.name;
        req.session.phone = user.phone
        req.session.isAuth = true;
        res.redirect("/dashboard");
    }
    else{
        res.redirect("/login")
    }
})

module.exports = router