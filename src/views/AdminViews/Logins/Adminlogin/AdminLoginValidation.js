
 const AdminLoginValidation=(adminlogin)=> {
    let errors={};
    if(!adminlogin.user_unique_code){
        errors.user_unique_code="Required User Unique Code";
    }
    if(!adminlogin.user_username){
        errors.user_username="username is required.";
    }
    if(!adminlogin.user_password){
        errors.user_password="password cannot be empty";
    }
    
   return errors;
}

export default AdminLoginValidation
