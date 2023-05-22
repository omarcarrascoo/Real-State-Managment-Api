const {chekIfIndustrialPropertyExistByName, createIndustrialProperty} = require("../services/industrialProperties.service.js")

const addIndustiralProperty = async (req, res) => { 
    // try {
        const industrialPropertyExist = await chekIfIndustrialPropertyExistByName(req.body.h1ES)
        console.log(industrialPropertyExist)
        if(industrialPropertyExist){
            res.status(401).json("There is a property with the same h1, imposible to save property" + industrialPropertyExist)
        }
        else{
            const newIndustrialProperty = await createIndustrialProperty(req.body)
            res.status(200).json(newIndustrialProperty + "Industrial Property added correctly!")
        }
    // } catch (error) {
    //     res.status(500).json("Error creating category, try again later or contact support.")
    // }
}
module.exports = {
    addIndustiralProperty
}