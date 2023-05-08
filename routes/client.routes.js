const Country = require("../models/country.model")
const router = require("express").Router()

router.get("/", async (req, res)=>{
    try {
        const countries = await Country.find()
        res.status(200).json(countries);
    } catch (error) {
       res.status(500).json(" Erro en index") 
    }
})





module.exports = router;