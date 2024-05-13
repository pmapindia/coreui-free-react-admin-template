const UpdateStausValidation=(UpdateInput)=> {
    let errors={};
    
    if(!UpdateInput.bill_paid_amount){
        errors.bill_paid_amount="Paid Amount is Required.";
    }
    
   return errors;
}

export default UpdateStausValidation
