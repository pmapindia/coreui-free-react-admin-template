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

const PaymentDetails = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var PaymentGuid=searchParams.get("payment_guid");

    const[PaymentDetails,setPaymentDetails]=useState({});

    const[PDetails,setPDetails]=useState(false);

    useEffect(() => {
        PaymentDetailsByID();
    },[]);

    const PaymentDetailsByID=async()=>{
        var list={};
        list["payment_guid"]=PaymentGuid;
        await axios.post(process.env.REACT_APP_API+"PaymentToAgentDetailsById",list).then(response=>{
            console.log(response);

            var PaymentDateNew,CreatedAtNew,UpdatedAtNew;

            if(response.data.payment_details.payment_date!==null){
                var PaymentDate=response.data.payment_details.payment_date;
                PaymentDateNew=PaymentDate.substring(0,10);
            }
            else{
                PaymentDateNew=response.data.payment_details.payment_date;
            }

            if(response.data.payment_details.payment_created_at!==null){
                var CreatedAt=response.data.payment_details.payment_created_at;
                CreatedAtNew=CreatedAt.substring(0,10);
            }
            else{
                CreatedAtNew=response.data.payment_details.payment_created_at;
            }

            if(response.data.payment_details.payment_updated_at!==null){
                var  UpdatedAt=response.data.payment_details.payment_updated_at;
                UpdatedAtNew= UpdatedAt.substring(0,10);
            }
            else{
                UpdatedAtNew=response.data.payment_details.payment_updated_at;
            }

            if(response.data.payment_details.payment_success_screenshot===""){
                setPDetails(false);
            }
            else{
                setPDetails(true);
            }

            setPaymentDetails({
                "payment_guid": response.data.payment_details.payment_guid,
                "payment_agent_guid": response.data.payment_details.payment_agent_guid,
                "payment_agent_name": response.data.payment_details.payment_agent_name,
                "payment_user_guid": response.data.payment_details.payment_user_guid,
                "payment_user_name": response.data.payment_details.payment_user_name,
                "payment_property_guid": response.data.payment_details.payment_property_guid,
                "payment_property_name": response.data.payment_details.payment_property_name,
                "payment_purpose": response.data.payment_details.payment_purpose,
                "payment_type": response.data.payment_details.payment_type,
                "payment_amount": response.data.payment_details.payment_amount,
                "payment_remarks": response.data.payment_details.payment_remarks,
                "payment_reference": response.data.payment_details.payment_reference,
                "payment_success_screenshot": response.data.payment_details.payment_success_screenshot,
                "payment_date": PaymentDateNew,
                "payment_created_at": CreatedAtNew,
                "payment_updated_at": UpdatedAtNew                
            });

        }).catch(error=>{
            console.log(error);
            alert(error.message);
            });
    }
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h3 className='fontweight' style={{color:"black"}}>Payment Details</h3>
    <hr className="bgclr" style={{height:"3px"}}/>
    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>User Name</td>
                <td>Agent Name</td>
                <td>Property Name</td>
                <td>Purpose</td>               
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{PaymentDetails.payment_user_name}</td>
                <td>{PaymentDetails.payment_agent_name}</td>
                <td>{PaymentDetails.payment_property_name}</td>
                <td>{PaymentDetails.payment_purpose}</td>
            </tr>

            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>Payment Date</td>
                <td>Project Type</td>
                <td>Reference</td>
                <td>Amount(In Rs)</td>               
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{PaymentDetails.payment_date}</td>
                <td>{PaymentDetails.payment_type}</td>
                <td>{PaymentDetails.payment_reference}</td>
                <td>{PaymentDetails.payment_amount}/-</td>
            </tr>

            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", }} >
                <td colSpan={2} align='center'>Remarks</td>
                <td align='center'>Created At</td>
                <td align='center'>Updated At</td>    
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", }}>
                <td colSpan={2} align='center'>{PaymentDetails.payment_remarks}</td>
                <td align='center'>{PaymentDetails.payment_created_at}</td>
                <td align='center'>{PaymentDetails.payment_updated_at}</td>
                
            </tr>
        </tbody>
    </table>
    </div>

    {PDetails?<div>
    <h6 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Payment Screenshot:</u> </h6>
    <CRow>
        <CCol xs="12" sm="4" md="4" lg="4" className="mb-3">
            <img className="playerProfilePic_home_tile mt-2" 
                src={process.env.REACT_APP_DOCUMENTS_PATH+PaymentDetails.payment_success_screenshot}
                style={{width:"180px",height:"150px",marginTop:"5px", }}
            />
        </CCol>
    </CRow>
    </div>:null}
</div>
</>
)
}
export default PaymentDetails;