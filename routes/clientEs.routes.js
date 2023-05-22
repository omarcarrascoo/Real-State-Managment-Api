const Country = require("../models/country.model")
const industrialPropertyModel = require("../models/industrialProperty.model")
const router = require("express").Router()


router.get("/", async (req, res) =>{
    try {
        const countries = await Country.find()
        res.render('index', {data: countries})
    } catch (error) {
       res.status(500).json(" Error en index") 
    }
})
router.get("/:country"), async (req,res) => {
    try {
        const properties = await industrialPropertyModel.find({country: req.params.country})
        res.render('properties', {data: properties})
    } catch (error) {
        
    }
}




module.exports = router;