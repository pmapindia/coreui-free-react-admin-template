const RenewMembershipValidation=(RenewalInput)=> {
    let errors={};
    
    if(!RenewalInput.package_paid_amount){
        errors.package_paid_amount="Paid Amount is Required.";
    }

    // if(!RenewalInput.package_balance_amount){
    //     errors.package_balance_amount="Balance Amount is Required.";
    // }
    
   return errors;
}

export default RenewMembershipValidation