const { verifyTokenAdmin } = require("../auth/verifyToken")
const Country = require("../models/country.model")
const router = require("express").Router()
const path = require("path")
const { verifyTokenAuthorization } = require("./verifyToken.routes")


//CREATE
router.post("/add", verifyTokenAdmin, async (req, res)=>{
    const countryExist = await Country.findOne({countryName: req.body.countryName})
    console.log(countryExist)
    if (countryExist) {
        res.status(409).json("Country alrady in existance")
    } else {
        const {countryFlag} = req.files;
        const imageSavingPath = path.join(__dirname, '../assets/imgs/') 
        console.log(countryFlag)
        const newCountry = new Country(req.body);

        if (!countryFlag) return res.status(400).json("Necesarly to upload image!")
        try {
            const savedCountry = await newCountry.save();
            countryFlag.mv(imageSavingPath + countryFlag.name)
            res.status(200).json(savedCountry)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
})

//UPDATE
router.put("/:id", verifyTokenAuthorization, async (req, res)=>{
    // const {countryFlag} = req.files;
    // console.log(countryFlag);
    // if (!countryFlag) return res.status(400).json("Necesarly to upload image!")
    try {
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id,{$set: 
            req.body
        });

        res.status(200).json(updatedCountry)
        
    } catch (error) {
        res.status(500).json("You can't update the country at this moment. Try again later. If the Error persist call Era Digital Solution")
    }
})

//DELATE

router.delete("/:id", verifyTokenAuthorization, async (req, res) =>{
    try {
        const deleatedCountry = await Country.findByIdAndDelete(req.params.id)
        res.status(200).json(deleatedCountry.countryName + " deleated correctly!")
    }
    catch(error){
        res.status(500).json("Error deleating country, try again later or contact support.")
    }
})

//GET COUNTRY
router.get("/find/:id", async (req,res)=>{
    try {
        const country = await Country.findById(req.params.id)
        res.status(200).json(country);
    } catch (error) {
       res.status(500).json(error) 
    }
})
router.get("/findByName/:country", async (req,res)=>{
    try {
        const country = await Country.find({urlCountry: req.params.country})
        res.status(200).json(country);
    } catch (error) {
       res.status(500).json(error) 
    }
})
//GET ALL COUNTRIES
router.get("/", async (req,res)=>{
    const query = req.query.new;
    try {
        const countries = await Country.find()
        res.status(200).json(countries);
    } catch (error) {
       res.status(500).json(error) 
    }
})

module.exports = router;