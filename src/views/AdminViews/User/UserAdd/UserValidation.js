const UserValidation=(UserAddInput)=> {
    let errors={};
    if(!UserAddInput.user_name){
        errors.user_name="User Name is Required.";
    }
    
    if(!UserAddInput.user_mobile_number){
        errors.user_mobile_number="User Number is Required.";
    }

    if(!UserAddInput.user_email){
        errors.user_email="User Email is Required.";
    }

    if(!UserAddInput.user_password){
        errors.user_password="User Password is Required.";
    }

    if(!UserAddInput.user_type){
        errors.user_type="User Type is Required.";
    }

    
   return errors;
}

export default UserValidation