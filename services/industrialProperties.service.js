const { findIndustrialProperty, saveIndustrialProperty } = require("../DTA/industrialProperties.mongodb.dta")
const { dtoIndustriaPropertyName } = require("../DTO/industiralProperties.dto")

const chekIfIndustrialPropertyExistByName = async (data) =>{
    try {
        const propertyExist = await dtoIndustriaPropertyName(data)
        console.log(propertyExist)
        if(propertyExist) {
            return propertyExist
        }else{
            return(false)
        } 
    } catch (error) {
        console.log(error)
        return("Problem checking property existance! Call IT department")
    }
}
const createIndustrialProperty = async (data)=>{
    try {
        const industrialPorpertyCreated = await saveIndustrialProperty (data);
        console.log(industrialPorpertyCreated);
        return (industrialPorpertyCreated);
    } catch (error) {
        return error
    }
}
module.exports = {
    chekIfIndustrialPropertyExistByName, createIndustrialProperty
}