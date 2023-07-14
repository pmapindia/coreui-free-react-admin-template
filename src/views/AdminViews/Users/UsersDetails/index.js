import React, { useEffect, useState } from 'react';
import {Link,useHistory,useParams,useLocation} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie';
import Select from 'react-select';
import axios from "axios";
import {CButton,CCardCCardBody,CCardHeader,CCol,CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CInput,CForm,CSelect,
  CRow,CLabel,CFormGroup} from '@coreui/react'
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';



const UserDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var UserGuid=searchParams.get("user_guid");

    const[UserDetails,setUserDetails]=useState({});

    useEffect(() => {
        UserDetailsByID();
    },[]);

    const UserDetailsByID=async()=>{
        var list={};
        list["user_guid"]=UserGuid;

        await axios.post(process.env.REACT_APP_API+"UserDetailsByID",list).then(response=>{
            console.log(response);
            var CreateDate,UpdateNew;

            if(response.data.user_details.user_created_at!=null){
                var CDate=response.data.user_details.user_created_at;
                CreateDate=CDate.substring(0,10);
            }
            else{
                CreateDate=response.data.user_details.user_created_at;
            }

            if(response.data.user_details.user_updated_at!=null){
                var UDate=response.data.user_details.user_updated_at;
                UpdateNew=UDate.substring(0,10);
            }
            else{
                UpdateNew=response.data.user_details.user_updated_at;
            }

            setUserDetails({
                "user_guid": response.data.user_details.user_guid,
                "user_name": response.data.user_details.user_name,
                "user_mobile_number": response.data.user_details.user_mobile_number,
                "user_email": response.data.user_details.user_email,
                "user_password": response.data.user_details.user_password,
                "user_type": response.data.user_details.user_type,
                "user_created_at": CreateDate,
                "user_updated_at": UpdateNew               
            });
        }).catch(error=>{
            console.log(error);
        });
    }

return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h1 className='fontweight' style={{color:"black"}}>User Details</h1>
    
    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"18px", textAlign:'center'}} >
                <td>User Name</td>
                <td>Mobile Number</td>
                <td>E - Mail</td>
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                <td>{UserDetails.user_name}</td>
                <td>+91 - {UserDetails.user_mobile_number}</td>
                <td>{UserDetails.user_email}</td>
            </tr>
        </tbody>
    </table>
    </div>

    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"18px", }} >
                <td align='center'>User Type</td>
                <td align='center'>Create At</td>
                <td align='center'>Update At</td>
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"15px", }}>
                <td align='center'>{UserDetails.user_type}</td>
                <td align='center'>{UserDetails.user_created_at}</td>
                <td align='center'>{UserDetails.user_updated_at}</td>
            </tr>
        </tbody>
    </table>
    </div>

    
</div>
</>
)
}
export default UserDetails;
