const { findIndustrialProperty } = require("../DTA/industrialProperties.mongodb.dta")

const dtoIndustriaPropertyName = async (data) =>{
    const industrialPropertyName = {data}
    const propertyExist = await findIndustrialProperty(industrialPropertyName)
    return propertyExist
}


module.exports = {
    dtoIndustriaPropertyName
}