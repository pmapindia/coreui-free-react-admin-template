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



const AgentDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var Agentguid=searchParams.get("agent_guid");

    let history=useHistory();

    const[warnings,setWarnings]=useState({
        warnings:""
        });

    const[AgentDetails,setAgentDetails]=useState({});

    useEffect(() => {
        AgentDetailsByID();
    },[]);

    const AgentDetailsByID=async()=>{
        var list={};
        list["agent_guid"]=Agentguid;

        await axios.post(process.env.REACT_APP_API+"AgentDetailsByID",list).then(response=>{
            console.log(response);
            setAgentDetails(response.data.agent_details);
        }).catch(error=>{
            console.log(error);
        });
    }

    const AgentDelete=async()=>{
        var list={};
        list["agent_guid"]=Agentguid;

        await axios.post(process.env.REACT_APP_API+"AgentDelete",list).then(response=>{
            console.log(response);
            if(response.data.is_success){
                toast.success(response.data.msg);
                setWarnings({["warning"]:""});
                history.push(`/agent-list`);
            }
            
            //setAgentDetails(response.data.agent_details);
        }).catch(error=>{
            console.log(error);
        });
    }

    const AgentApproved=async()=>{
        var list={};
        list["agent_guid"]=Agentguid;
        list["agent_status_text"]="ACTIVE"

        await axios.post(process.env.REACT_APP_API+"AgentStatusTextUpdate",list).then(response=>{
            console.log(response);
            if(response.data.is_success){
                toast.success(response.data.msg);
                setWarnings({["warning"]:""});
                //history.push(`/agent-list`);
            }
            
            //setAgentDetails(response.data.agent_details);
        }).catch(error=>{
            console.log(error);
        });
    }

    const AgentBlocked=async()=>{
        var list={};
        list["agent_guid"]=Agentguid;
        list["agent_status_text"]="BLOCKED"

        await axios.post(process.env.REACT_APP_API+"AgentStatusTextUpdate",list).then(response=>{
            console.log(response);
            if(response.data.is_success){
                toast.success(response.data.msg);
                setWarnings({["warning"]:""});
                //history.push(`/agent-list`);
            }
            
            //setAgentDetails(response.data.agent_details);
        }).catch(error=>{
            console.log(error);
        });
    }


return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h1 className='fontweight' style={{color:"black"}}>Agent Details</h1>
    
    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"18px", textAlign:'center'}} >
                <td>Type</td>
                <td>Agent Name</td>
                <td>Mobile Number</td>
                <td>E - Mail</td>
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                <td >{AgentDetails.agent_type}</td>
                <td>{AgentDetails.agent_name}</td>
                <td>+91 - {AgentDetails.agent_mobile_number}</td>
                <td>{AgentDetails.agent_email}</td>
            </tr>
        </tbody>
    </table>
    </div>

    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"18px", }} >
                <td>Address</td>
                <td align='center'>Status Text</td>
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"15px", }}>
                <td>{AgentDetails.agent_address}</td>
                <td align='center'>{AgentDetails.agent_status_text}</td>
            </tr>
        </tbody>
    </table>
    </div>

    <CRow mt-4>
        <CCol xs="12" sm="2" md="2" lg="2"></CCol>

        <CCol xs="12" sm="2" md="2" lg="2">
            <div className="mt-3 " style={{borderRadius:"5px"}}>
                <CButton 
                type="submit" 
                onClick={(e)=>AgentApproved()}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"18px", backgroundColor:"green"}} >Approve</CButton>
            </div>
        </CCol>

        <CCol xs="12" sm="2" md="2" lg="2">
            <div className="mt-3  bgred" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>AgentBlocked()}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"18px"}} >Block</CButton>
            </div>
        </CCol>

        <CCol xs="12" sm="2" md="2" lg="2">
            <div className="mt-3  pink" style={{borderRadius:"5px"}}>
                <CButton type="submit"
                onClick={(e)=>AgentDelete()}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"18px"}} >Delete</CButton>
            </div>
        </CCol>

        <CCol xs="12" sm="2" md="2" lg="2">
            <div className="mt-3  pink" style={{borderRadius:"5px"}}>
                <CButton to={`/make-payment-add?agent_guid=${AgentDetails.agent_guid}`} style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"16px",backgroundColor:"blue"}} >Make Payment</CButton>
            </div>
        </CCol>

        <CCol xs="12" sm="2" md="2" lg="2"></CCol>
    </CRow>
</div>
</>
)
}
export default AgentDetails;
