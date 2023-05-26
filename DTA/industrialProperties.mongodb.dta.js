const uploadFile = require('../middleware/uploadImage.js');
const industrialPropertiesModel = require ('../models/industrialProperty.model.js');

const findIndustrialProperty = async (data)=>{
    const industialProperty = await industrialPropertiesModel.findOne(data)
    console.log(industialProperty);
    return industialProperty
}
const saveIndustrialProperty = async (indusatrialPropertyData) =>{
   const newIndustrialProperty = new industrialPropertiesModel(indusatrialPropertyData)
   const industrialPropertySaved = await newIndustrialProperty.save()
   return(industrialPropertySaved)
}

module.exports ={
    findIndustrialProperty,
    saveIndustrialProperty
}