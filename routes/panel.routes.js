const router = require("express").Router();

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