import React, { useEffect, useState } from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie';
import Select from 'react-select';
import axios from "axios";
import {CButton,CCardCCardBody,CCardHeader,CCol,CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CInput,CForm,CSelect,
  CRow,CLabel,CFormGroup} from '@coreui/react'
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';
import UserValidation from './UserValidation';

const UsersAdd = (props) => {

  const[cookies,setCookies,removeCookie]=useCookies(['admin']);

    const[errors,setErrors]=useState({});
    const[warnings,setWarnings]=useState({
    warnings:""
    });

    const[disablebutton,setDisableButton]=useState(false);

    let history=useHistory();

    const[UsersAdd,setUsersAdd]=useState({
      user_guid:"",
      user_name: "",
      user_mobile_number: "",
      user_email: "",
      user_password: "",
      user_type: ""
    });

    const{
      user_guid,
      user_name,
      user_mobile_number,
      user_email,
      user_password,
      user_type
    }=UsersAdd;

    const OnInputChange=(e)=>{
      console.log(e.target.value);
      setUsersAdd({...UsersAdd,[e.target.name]:e.target.value});
  }

  const OnSubmitSVDPUserAdd=async(e)=>{
    e.preventDefault();      
    setDisableButton(true); 
    setErrors(UserValidation(UsersAdd));
    document.getElementById("img_gif_loading_btn").style.display="block";   
    var errorcount=Object.keys(UserValidation(UsersAdd)).length;
      if(errorcount===0){ 
        if(user_guid===""){   
        await axios.post(process.env.REACT_APP_API+"UserAdd",{
          "user_name": user_name,
          "user_mobile_number": user_mobile_number,
          "user_email": user_email,
          "user_password": user_password,
          "user_type": user_type
        }).then(response=>{
            console.log(response);
            if(response.data.is_success){
                toast.success(response.data.msg);
                setWarnings({["warning"]:""});
                history.push(`/users-list`);
            }
            else{
                
                setWarnings({["warning"]:response.data.msg});
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display="none";
                }
            }).catch(
              error=>{
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display="none";
              });
        }
        else{
          await axios.post(process.env.REACT_APP_API+"UserUpdate",{
            "user_guid":user_guid,
            "user_name": user_name,
            "user_mobile_number": user_mobile_number,
            "user_email": user_email,
            "user_password": user_password,
            "user_type": user_type
          }).then(response=>{
              console.log(response);
              if(response.data.is_success){
                  toast.success(response.data.msg);
                  setWarnings({["warning"]:""});
                  history.push(`/users-list`);
              }
              else{
                  
                  setWarnings({["warning"]:response.data.msg});
                  setDisableButton(false);
                  document.getElementById("img_gif_loading_btn").style.display="none";
                  }
              }).catch(
                error=>{
                  console.log(error);
                  alert(error.message);
                  setDisableButton(false);
                  document.getElementById("img_gif_loading_btn").style.display="none";
                });
        }
        }
        else{
          setDisableButton(false);
          document.getElementById("img_gif_loading_btn").style.display="none";
        }
}

const LoadUserDetails=async()=>{
  var list={};
  if(props.location.pfid!=null){
      list["user_guid"]=props.location.pfid.pfid;
      await axios.post(process.env.REACT_APP_API+"UserDetailsByID",list).then(response=>{
          console.log(response);{
            setUsersAdd({
              "user_guid": response.data.user_details.user_guid,
              "user_name": response.data.user_details.user_name,
              "user_mobile_number": response.data.user_details.user_mobile_number,
              "user_email": response.data.user_details.user_email,
              "user_password": response.data.user_details.user_password,
              "user_type": response.data.user_details.user_type,
            });
          }
      })
  }
}

useEffect(()=>{
  LoadUserDetails();
},[]);
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
{props.location.pfid!=null?
<h2 className='fontweight' style={{color:"black"}}>UpDate User </h2> : 
<h2 className='fontweight' style={{color:"black"}}>Add New User </h2>
}

<hr className="bgclr" style={{height:"3px"}}/>
    <CForm>
        <CRow className="mt-4">

            <CCol xs="12" sm="3" md="3" lg="3" >
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select User Type<span className="red">*</span></CLabel>
                    <CSelect custom name="user_type"  onChange={(e)=>OnInputChange(e)}>
                        <option>Select User Type</option>
                        <option selected={user_type==="ADMIN"} value="ADMIN" >ADMIN</option>
                        <option selected={user_type==="USER"} value="USER">USER</option>
                    </CSelect>
                    {errors.user_type&&<p className="red">{errors.user_type}</p>}
            </CCol>
  
            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>User Name<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='User Name'
                    name='user_name'
                    value={user_name}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.user_name&&<p className="red">{errors.user_name}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>User Mobile Number<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='User Mobile Number'
                    name='user_mobile_number'
                    value={user_mobile_number}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.user_mobile_number&&<p className="red">{errors.user_mobile_number}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>User E - mail<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='User E - mail'
                    name='user_email'
                    value={user_email}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.user_email&&<p className="red">{errors.user_email}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>User Password<span className="red">*</span></CLabel>
                    <CInput type='password' placeholder='User Password'
                    name='user_password'
                    value={user_password}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.user_password&&<p className="red">{errors.user_password}</p>}
            </CCol>

        </CRow>
        <hr className="bgclr" style={{height:"3px"}}/>
        <CRow>
            <CCol xs="12" sm="9" md="9" lg="9" ></CCol>
            <CCol xs="12" sm="3" md="3" lg="3" >
                <div className="bgblue1" style={{borderRadius:"5px"}}>
                    <CButton type="submit"
                      disabled={disablebutton}
                      onClick={(e)=>OnSubmitSVDPUserAdd(e)}
                      style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
                </div>
                {warnings.warning&&<p className="red">{warnings.warning}</p>}
            </CCol>
        </CRow>
    </CForm>
</div>
</>
)
}
export default UsersAdd;