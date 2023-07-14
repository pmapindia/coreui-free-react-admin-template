import React, { useState,useEffect,PropTypes} from 'react'
import { Link,useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Object } from 'core-js';
import AdminLoginValidation from './AdminLoginValidation';
import {CButton,CCard,CCardBody,CCardGroup,CCol,CContainer,CForm,CInput,CInputGroup,CInputGroupPrepend,CInputGroupText,CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import 'font-awesome/css/font-awesome.min.css';
import '../../../../scss/_custom.scss';


const AdminLogin = () => {
  const[userdetails,setUserDetails]=useState({});
   

  let d=new Date();
   d.setTime(d.getTime()+(30*24*60*60*1000));//expires in one month
   //d.setTime(d.getTime()+(1*24*60*60*1000));//expires in one day

    //d.setTime(d.getTime()+(1*60*1000));//expires in one minute
   let history=useHistory();
  const[cookies,setCookies,removeCookie]=useCookies(['admin']);
  const[errors,setErrors]=useState({});
  const[warnings,setWarnings]=useState({
    warning:""
  });
  const[adminlogin,setAdminLogin]=useState({
    user_username: "",
    user_password: ""
  });
  const{user_username,user_password}=adminlogin;
  const OnInputChange=(e)=>{
    console.log(e.target.value);
    setAdminLogin({...adminlogin,[e.target.name]:e.target.value});
  }


  
  const setlogincredentialtocookie=async()=>{
    setErrors(AdminLoginValidation(adminlogin));
    var errorcount=Object.keys(AdminLoginValidation(adminlogin)).length;
if(errorcount===0){
  //alert(errorcount);
  // e.preventDefault();
  await axios.post(process.env.REACT_APP_API+"UserLogin",adminlogin).then(response=>{
  console.log(response);
  if(response.data.is_success){
    setUserDetails(response.data.user_details);
    
      setCookies('user_guid',response.data.user_details.user_guid,{path:'/',expires:d});
      setCookies('user_type',response.data.user_details.user_type,{path:'/',expires:d});
      setCookies('user_name',response.data.user_details.user_name,{path:'/',expires:d});
      setCookies('user_mobile_number',response.data.user_details.user_mobile_number,{path:'/',expires:d});
      setCookies('user_email',response.data.user_details.user_email,{path:'/',expires:d});
    
    setWarnings({["warning"]:""});

    toast.success(response.data.msg);
    setUserDetailsId({...userdetailsid,["userdetailsid1"]:"true"});
    history.push("/admindashboard");
    window.location.reload(true);
    // if(userdetails.user_type==="Admin")
    // {
    //   history.push("/admindashboard");
    // }
    // else{
    //   alert.msg(response.data.msg);
    // }
      
  
 }
  else{
     toast.error(response.data.msg);
    // history.push("/");
    setWarnings({["warning"]:response.data.msg});
  }
  
  }).catch(error=>{
  console.log(error);
  })
}
}

const[userdetailsid,setUserDetailsId]=useState(
  {
  userdetailsid1:"false"
  }
);
const{userdetailsid1}=userdetailsid;


// useEffect(() => {
//   if(userdetailsid1!="false"){
//  LoadUserDetails();
//   }
// }, [userdetailsid1])

// const LoadUserDetails=async()=>{
//   var list={};
//   list["user_guid"]=userdetails.user_guid;
//   axios.post(process.env.REACT_APP_API+"UserDetailsByID",{ list
//     //user_guid:userdetails.user_guid
//   }).then(response=>{
//     if(response.data.user_details!=null){
//       if(userdetails.user_type==="ADMIN"){
//         history.push("/admindashboard");
//        // window.location.href="/dashboard";
//         window.location.reload(true);
//       }
//       else{
//         alert("Plz Contact Admin")
//       }
//     }
//     else{
//       removeCookie("user_guid");
//      removeCookie("user_type");
    
//     removeCookie("user_username");
//     removeCookie("user_mobile_number");
//     // removeCookie("user_password");
    

//         alert("User Details are not found please contact admin");
//         history.push('/adminlogin');
//       window.location.reload(true);
//     }
//   })
// }



const handleSubmit = e => {
 // e.preventDefault();
 setlogincredentialtocookie();
  // or you can send data to backend
};

const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.key === "Enter") {
    handleSubmit();
  }
};
  return (
 <>
 <div>
   <CRow style={{backgroundColor:"blue",color:"white",height:"40px"}}>
     <CCol xs="6" sm="6" md="6" lg="6">
     <h5 style={{paddingLeft:"10px",paddingTop:"10px"}} className="fontsize"> <i className=" fa fa-envelope" aria-hidden="true"
                ></i>  info@pmapindia.com</h5>
     </CCol>
     <CCol xs="6" sm="6" md="6" lg="6">
     <h5  style={{float:"right",paddingRight:"10px",paddingTop:"10px"}} className="fontsize"><i className=" fa fa-mobile" aria-hidden="true"
                ></i> +91 9663025636</h5>
     </CCol>
   </CRow>
 </div>
 
  
  <div>
 <CRow className="justify-content-center mt-5">
          <CCol xs="1" md="3" lg="3" sm="3">

          </CCol>
          <CCol xs="6" md="6" lg="6" sm="12" className="mt-5">
            
            <CRow className="ml40">
              <CCol xs="2" md="1" lg="1" sm="4"></CCol>
              <CCol xs="4" md="4" lg="4" sm="4" align='center'>
              
              {<img className="aligncenter " src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'} height="100px" width="250px" />}

              </CCol>
              <CCol xs="4" md="4" lg="4"></CCol>

              </CRow>
              <CRow>
              <CCol xs="4" md="1" lg="1" sm="4"></CCol>
              <CCol xs="" md="3" lg="4" sm="4">
              <h5 className="textaligncenter fontweight mt-4" style={{color:"black"}}>Login</h5>

              </CCol>
              <CCol xs="4" md="4" lg="4"></CCol>

              </CRow>
            <CRow>
              <CCol xs="12" sm="8" md="7" lg="7" style={{padding:"25px"}} className="widthofinput">
            <CInput type="text" placeholder="Mobile Number / E-mail " className="inputborderradius"
            name="user_username"
            value={user_username}
            onKeyPress={handleKeypress}

            onChange={(e)=>OnInputChange(e)}
            ></CInput>
             {errors.user_username&&<p className="red">{errors.user_username}</p>}

            <br/>
            <CInput type="password" placeholder="Password" className="inputborderradius"
            name="user_password"
            value={user_password}
            onKeyPress={handleKeypress}

            onChange={(e)=>OnInputChange(e)}
            ></CInput>
           {errors.user_password&&<p className="red">{errors.user_password}</p>}

            <br/>
       
            <CButton color="primary" className="inputborderradius" style={{width:"100%"}} onClick={()=>setlogincredentialtocookie()}>Login</CButton>
                        <p className="red">{warnings.warning}</p>
                        
            </CCol>

            </CRow>
          </CCol>
          </CRow>
 </div>
 




    </>
  )
}




export default AdminLogin
