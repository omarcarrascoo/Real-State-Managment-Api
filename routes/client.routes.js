const Country = require("../models/country.model")
const router = require("express").Router()

router.get("/", async (req, res)=>{
    res.redirect("/es/bienes-raices-industriales/")
})




module.exports = router;