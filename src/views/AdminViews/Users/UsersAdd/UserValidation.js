const UserValidation =(UsersAdd)=>{
    let errors={};
    if(!UsersAdd.user_name){
        errors.user_name="User Name is Required.";
    }

    if(!UsersAdd.user_mobile_number){
        errors.user_mobile_number="User Mobile No is Required.";
    }

    if(!UsersAdd.user_email){
        errors.user_email="User E-Mail is Required.";
    }

    if(!UsersAdd.user_password){
        errors.user_password="User Password is Required.";
    }

    if(!UsersAdd.user_type){
        errors.user_type="User Type is Required.";
    }

    // if(!UsersAdd.property_name){
    //     errors.property_name="User Name is Required.";
    // }
    return errors;
}
export default UserValidation