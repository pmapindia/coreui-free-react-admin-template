const Validation =(PropertiesAdd)=>{
    let errors={};
    if(!PropertiesAdd.property_name){
        errors.property_name=" Property Name is Required.";
    }

    if(!PropertiesAdd.property_location){
        errors.property_location=" Property Location is Required.";
    }

    if(!PropertiesAdd.property_price){
        errors.property_price=" Property Price is Required.";
    }

    if(!PropertiesAdd.property_dimension){
        errors.property_dimension=" Property Dimension is Required.";
    }

    if(!PropertiesAdd.property_site_number){
        errors.property_site_number=" Site Number is Required.";
    }

    if(!PropertiesAdd.property_block){
        errors.property_block=" Property Block is Required.";
    }

    if(!PropertiesAdd.property_rate_per_sqft){
        errors.property_rate_per_sqft=" Rate/Sqft is Required.";
    }

    if(!PropertiesAdd.property_total_sqft){
        errors.property_total_sqft=" Total Sqft is Required.";
    }

    if(!PropertiesAdd.property_current_status){
        errors.property_current_status=" Curent Status is Required.";
    }

    return errors;
}
export default Validation;