const Country = require("../models/country.model")
const industrialPropertyModel = require("../models/industrialProperty.model")
const { verifyTokenAuthorization } = require("./verifyToken.routes")
const router = require("express").Router()


router.get("/", async (req, res) =>{
    try {
        const countries = await Country.find()
        res.render('index', {data: countries})
    } catch (error) {
       res.status(500).json(" Error en index") 
    }
})
router.get("/panel", async (req, res) =>{
    try {
        res.render('properties')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})




module.exports = router;