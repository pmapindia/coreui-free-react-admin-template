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
import AgentValidation from './AgentValidation';

const AgentAdd = (props) => {

    const[cookies,setCookies,removeCookie]=useCookies(['admin']);

    const[errors,setErrors]=useState({});
    const[warnings,setWarnings]=useState({
    warnings:""
    });

    const[disablebutton,setDisableButton]=useState(false);

    let history=useHistory();

    const[SVPDAgentAdd,setSVPDAgentAdd]=useState({
        agent_guid:"",
        agent_name: "",
        agent_mobile_number: "",
        agent_email: "",
        agent_password: "",
        agent_address: "",
        agent_type: "",
        agent_status_text: ""
    });
    const{
        agent_guid,
        agent_name,
        agent_mobile_number,
        agent_email,
        agent_password,
        agent_address,
        agent_type,
        agent_status_text
    }=SVPDAgentAdd;

    const OnInputChange=(e)=>{
        console.log(e.target.value);
        setSVPDAgentAdd({...SVPDAgentAdd,[e.target.name]:e.target.value});
    }

    const OnSubmitSVDPAgentAdd=async(e)=>{
        e.preventDefault();      
        setDisableButton(true); 
        document.getElementById("img_gif_loading_btn").style.display="block";     
        setErrors(AgentValidation(SVPDAgentAdd));
        var errorcount=Object.keys(AgentValidation(SVPDAgentAdd)).length;
        if(errorcount===0){
        if(agent_guid===""){    
            await axios.post(process.env.REACT_APP_API+"AgentAdd",{
                "agent_name": agent_name,
                "agent_mobile_number": agent_mobile_number,
                "agent_email": agent_email,
                "agent_password": agent_password,
                "agent_address": agent_address,
                "agent_type": agent_type,
                "agent_status_text": "ACTIVE"
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    history.push(`/agent-list`);
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
                  })
        }
        else{
            await axios.post(process.env.REACT_APP_API+"AgentUpdate",{
                "agent_name": agent_name,
                "agent_guid":agent_guid,
                "agent_mobile_number": agent_mobile_number,
                "agent_email": agent_email,
                "agent_password": agent_password,
                "agent_address": agent_address,
                "agent_type": agent_type,
                "agent_status_text": "ACTIVE"
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    history.push(`/agent-list`);
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
                  })
        }
        }
        else{
            setDisableButton(false);
            document.getElementById("img_gif_loading_btn").style.display="none";
        }
    }

    const LoadAgentDetails=async()=>{
        var list={};
        if(props.location.pfid!=null){
            list["agent_guid"]=props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API+"AgentDetailsByID",list).then(response=>{
                console.log(response);{
                    setSVPDAgentAdd({
                        "agent_guid": response.data.agent_details.agent_guid,
                        "agent_name": response.data.agent_details.agent_name,
                        "agent_mobile_number": response.data.agent_details.agent_mobile_number,
                        "agent_email": response.data.agent_details.agent_email,
                        "agent_password": response.data.agent_details.agent_password,
                        "agent_address": response.data.agent_details.agent_address,
                        "agent_type": response.data.agent_details.agent_type,
                        "agent_status_text": response.data.agent_details.agent_status_text                       
                    });
                }
            })
        }
    }

    useEffect(()=>{
        LoadAgentDetails();
    },[]);



return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
{props.location.pfid!=null? <h2 className='fontweight' style={{color:"black"}}> Update Agent </h2> :
    <h2 className='fontweight' style={{color:"black"}}> Add New Agent </h2>
}
    <hr className="btncolor"  style={{height:"2px"}}/>
    {/* <hr className="bgblue" style={{ height: "2px" }} /> */}
    <CForm>
        <CRow className="mt-4">
            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Type <span className="red">*</span></CLabel>
                    <CSelect custom name="agent_type"  onChange={(e)=>OnInputChange(e)}>
                        <option>Select Type</option>
                        <option selected={agent_type==="Agent"} value="Agent" >Agent</option>
                        <option selected={agent_type==="Customer"} value="Customer">Customer</option>
                    </CSelect>
                    {errors.agent_type&&<p className="red">{errors.agent_type}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Name <span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Enter Name'
                    name='agent_name'
                    value={agent_name}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.agent_name&&<p className="red">{errors.agent_name}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Mobile Number <span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Enter Mobile Number' maxLength={10}
                    //pattern="[0-9]+"
                    name='agent_mobile_number'
                    value={agent_mobile_number}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.agent_mobile_number&&<p className="red">{errors.agent_mobile_number}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>E - mail <span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Enter E - mail'
                    name='agent_email'
                    value={agent_email}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.agent_email&&<p className="red">{errors.agent_email}</p>}
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Password <span className="red">*</span></CLabel>
                    <CInput type='password' placeholder='Enter Password'
                    name='agent_password'
                    value={agent_password}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.agent_password&&<p className="red">{errors.agent_password}</p>}
            </CCol>

            <CCol xs="12" sm="6" md="6" lg="6" className="mt-4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Address <span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Enter Address'
                    name='agent_address'
                    value={agent_address}
                    onChange={(e)=>OnInputChange(e)}></CInput>
                    {errors.agent_address&&<p className="red">{errors.agent_address}</p>}
            </CCol>

            {/* <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"18px"}}>Select Status Text</CLabel>
                    <CSelect custom name="agent_status_text"  onChange={(e)=>OnInputChange(e)}>
                        <option>Select Status Text</option>
                        <option selected={agent_status_text==="ACTIVE"} value="ACTIVE" >ACTIVE</option>
                        <option selected={agent_status_text==="IN_ACTIVE"} value="IN_ACTIVE">IN_ACTIVE</option>
                        <option selected={agent_status_text==="BLOCKED"} value="BLOCKED">BLOCKED</option>
                        <option selected={agent_status_text==="DELETED"} value="DELETED">DELETED</option>
                        <option selected={agent_status_text==="REJECTED"} value="REJECTED">REJECTED</option>
                    </CSelect>
            </CCol> */}

            
        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <CRow>
            <CCol xs="12" sm="9" md="9" lg="9" ></CCol>
            <CCol xs="12" sm="3" md="3" lg="3" >
                <div className="bgblue1" style={{borderRadius:"5px"}}>
                    <CButton type="submit" onClick={(e)=>OnSubmitSVDPAgentAdd(e)} disabled={disablebutton} style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
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
export default AgentAdd;