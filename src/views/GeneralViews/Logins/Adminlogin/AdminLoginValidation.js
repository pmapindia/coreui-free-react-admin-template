
 const AdminLoginValidation=(adminlogin)=> {
    let errors={};
    if(!adminlogin.user_username){
        errors.user_username="Enter Mobile No or E-Mail Id.";
    }
    if(!adminlogin.user_password){
        errors.user_password="Password Cannot be Empty";
    }

   return errors;
}

export default AdminLoginValidation
