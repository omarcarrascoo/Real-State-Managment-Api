const { verifyTokenAdmin, verifyTokenAuthorization } = require("../auth/verifyToken")
const City = require("../models/city.model")
const router = require("express").Router()

//CREATE CITY
router.post("/add", verifyTokenAdmin, async (req, res) => {
    const cityExist = await City.findOne({cityName: req.body.cityName})

    if (cityExist) {
        res.status(409).json("City alrady in existance")
    } else {
        const newCity = new City(req.body)
        try {
            const savedCity = await newCity.save();
            res.status(200).json(savedCity + "City added correctly!")
        } catch (error) {
            res.status(500).json("Error creating City, try again later or contact support.")
        }
    }
})
//UPDATE CITY
router.put("/:id", verifyTokenAuthorization, async (req, res) =>{
    try {
        const updatedCity = await City.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true} );

        res.status(200).json(updatedCity)

    } catch (error) {
        res.status(500).json("Error updating the city, please try again later or contact support")
    }
})


//DELATE CITY
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const deleatedCity = await City.findByIdAndDelete (req.params.id)
        res.status(200).json(deleatedCity.cityName + " deleated correctly")
    } catch (error) {
        res.status(500).json("Error deleating province, try again later or contact support")
    }
})

//GET CITY
router.get("/find/:id", async (req,res)=>{
    try {
        const city = await City.findById(req.params.id)
        res.status(200).json(city);
    } catch (error) {
       res.status(500).json(error) 
    }
})

//GET ALL CITIES
router.get("/", async (req,res)=>{
    const query = req.query.new;
    
    try {
        const cities = await City.find()
        res.status(200).json(cities);
    } catch (error) {
       res.status(500).json(error) 
    }
})

module.exports = router;