const {
    verifyTokenAdmin,
    verifyTokenAuthorization
} = require("../middleware/verifyToken")
const IndustrialProperty = require("../models/industrialProperty.model")
const router = require("express").Router()

//CREATE
router.post("/add", verifyTokenAdmin, async (req, res) => {
    const industrialPropertyExist = await IndustrialProperty.findOne({h1ES: req.body.h1ES})
    if(industrialPropertyExist){
        res.status(401).json("There is a property with the same h1, imposible to save property")
    }
    else{
        const newIndustrialProperty = new IndustrialProperty(req.body)
    
    try {
        const savedIndustrialProperty = await newIndustrialProperty.save();
        res.status(200).json(savedIndustrialProperty + "Industrial Property added correctly!")
    } catch (error) {
        res.status(500).json("Error creating category, try again later or contact support.")
    }
    }
})

//UPDATE
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const updatedIndustrialProperty = await IndustrialProperty.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });

        res.status(200).json(updatedIndustrialProperty)

    } catch (error) {
        res.status(500).json("Error updating the industrial property, please try again later or contact support")
    }
})


//DELATE
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const deleatedIndustrialProperty = await IndustrialProperty.findByIdAndDelete(req.params.id)
        res.status(200).json(deleatedIndustrialProperty.h1ES + " deleated correctly")
    } catch (error) {
        res.status(500).json("Error deleating indusrial property, try again later or contact support")
    }
})

//GET
router.get("/find/:id", async (req, res) => {
    try {
        const industrialProperty = await IndustrialProperty.findById(req.params.id)
        res.status(200).json(industrialProperty);
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL
router.get("/", async (req, res) => {
    

    try {
        const industrialProperty = await IndustrialProperty.find()
        res.status(200).json(industrialProperty);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;