const {
    verifyTokenAdmin,
    verifyTokenAuthorization
} = require("../middleware/verifyToken")
const IndustrialProperty = require("../models/industrialProperty.model")
const router = require("express").Router()

const { addIndustiralProperty } = require("../controllers/industrialProperty.controllers")
const uploadFile = require("../middleware/uploadImage")



//CREATE
router.post("/add", verifyTokenAdmin, uploadFile(), addIndustiralProperty)

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
router.get("/find/:country", async(req,res) =>{
    try {
        console.log(req.params.country);
        const Data = await IndustrialProperty.find({ urlCountry: req.params.country })
        console.log(Data);
        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/findByUrl/:urlES", async(req,res) =>{
    try {
        const Data = await IndustrialProperty.findOne({ urlEs: req.params.urlES })
        res.status(200).json(Data)
    } catch (error) {
        res.status(500).json(error)
    }
})
// router.get("/find/:id", async (req, res) => {
//     try {
//         const industrialProperty = await IndustrialProperty.findById(req.params.id)
//         res.status(200).json(industrialProperty);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

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