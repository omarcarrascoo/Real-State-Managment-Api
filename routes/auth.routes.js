const router = require("express").Router()
const User = require("../models/user.model")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// REGISTER
router.post("/register", async (req, res)=>{
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });
    console.log(newUser)
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//LOGIN
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        
        !user && res.status(401).json("User doesn't exisist!")

        const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);
        
        originalPassword !== req.body.password && res.status(401).json("Wrong passaword!")

        const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SEC,{expiresIn: "3d"});

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken})
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;