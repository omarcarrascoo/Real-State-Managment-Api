const { verifyTokenAdmin, verifyTokenAuthorization } = require("../middleware/verifyToken")
const Category = require("../models/category.model")
const router = require("express").Router()

//CREATE
router.post("/add", verifyTokenAdmin, async (req, res) => {
    const categoryExist = await Category.findOne({categoryTitle: req.body.categoryTitle})
    console.log(req.body.categoryTitle)
    console.log(categoryExist);
    

    if (categoryExist) {
        res.status(409).json("Category already in existance")
    } else {
        const newCategory = new Category(req.body)
        console.log(newCategory);
        try {
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory + "Category added correctly!")
        } catch (error) {
            res.status(500).json("Error creating category, try again later or contact support.")
        }
    }
})

//UPDATE
router.put("/:id", verifyTokenAuthorization, async (req, res) =>{
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true} );

        res.status(200).json(updatedCategory)

    } catch (error) {
        res.status(500).json("Error updating the category, please try again later or contact support")
    }
})


//DELATE
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
    try {
        const deleatedCategory = await Category.findByIdAndDelete (req.params.id)
        res.status(200).json(deleatedCategory.categoryTitle + " deleated correctly")
    } catch (error) {
        res.status(500).json("Error deleating category, try again later or contact support")
    }
})

//GET PROVINCE
router.get("/find/:id", async (req,res)=>{
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category);
    } catch (error) {
       res.status(500).json(error) 
    }
})

//GET ALL PROVINCES
router.get("/", async (req,res)=>{
    const query = req.query.new;
    
    try {
        const categories = await Category.find()
        res.status(200).json(categories );
    } catch (error) {
       res.status(500).json(error) 
    }
})

module.exports = router;