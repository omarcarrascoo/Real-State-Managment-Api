const { verifyTokenAdmin, verifyTokenAuthorization } = require("../auth/verifyToken")
const Province = require("../models/province.model")
const router = require("express").Router()

//CREATE
router.post("/add", verifyTokenAdmin, async (req, res) => {
    const provinceExist = await Province.findOne({provinceName: req.body.provinceName})

    if (provinceExist) {
        res.status(409).json("Country alrady in existance")
    } else {
        const newProvince = new Province(req.body)
        try {
            const savedProvince = await newProvince.save();
            res.status(200).json(savedProvince + "Province added correctly!")
        } catch (error) {
            res.status(500).json("Error creating province, try again later or contact support.")
        }
    }
})

//UPDATE
router.put("/:id", verifyTokenAuthorization, async (req, res) =>{
    try {
        const updatedProvince = await Province.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true} );

        res.status(200).json(updatedProvince)

    } catch (error) {
        res.status(500).json("Error updating the province, please try again later or contact support")
    }
})


//DELATE
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const deleatedProvince = await Province.findByIdAndDelete (req.params.id)
        res.status(200).json(deleatedProvince.provinceName + " deleated correctly")
    } catch (error) {
        res.status(500).json("Error deleating province, try again later or contact support")
    }
})

//GET PROVINCE
router.get("/find/:id", async (req,res)=>{
    try {
        const province = await Province.findById(req.params.id)
        res.status(200).json(province);
    } catch (error) {
       res.status(500).json(error) 
    }
})

//GET ALL PROVINCES
router.get("/", async (req,res)=>{
    const query = req.query.new;
    
    try {
        const provinces = await Province.find()
        res.status(200).json(provinces);
    } catch (error) {
       res.status(500).json(error) 
    }
})

module.exports = router;