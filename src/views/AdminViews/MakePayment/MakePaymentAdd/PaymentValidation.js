const PaymentValidation =(MakePaymentAdd)=>{
    let errors={};
    if(!MakePaymentAdd.payment_date){
        errors.payment_date="Payment Date is Required.";
    }

    if(!MakePaymentAdd.payment_type){
        errors.payment_type="Payment Type is Required.";
    }

    if(!MakePaymentAdd.payment_reference){
        errors.payment_reference="Reference is Required.";
    }

    if(!MakePaymentAdd.payment_amount){
        errors.payment_amount="Payment Amount is Required.";
    }

    if(!MakePaymentAdd.payment_purpose){
        errors.payment_purpose="Payment Purpose is Required.";
    }

    return errors;

}
export default PaymentValidation;