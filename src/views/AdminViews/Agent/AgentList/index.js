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


const AgentList = (props) => {

    const[currentsize,setCurrentSize]=useState(0); 
    const[listcount,setListCount]=useState(0);

    const[warnings,setWarnings]=useState({
        warning:""
    });

    const[disablebutton,setDisableButton]=useState(false);

    const[processdetails,setProcessDetails]=useState(false);//for hiding

    const[search_text1,setSearchText]=useState({
        search_text:""
    });
    const{search_text}=search_text1;

    const[ALInput,setALInput]=useState({
        agent_status_text: "",
        agent_type: ""
    });

    const{
        agent_status_text,
        agent_type
    }=ALInput;

    const[AgentLists,setAgentLists]=useState([]);

    const OnChangeTextSearch=(e)=>{
        console.log(e.target.value);
        setSearchText({...search_text1,[e.target.name]:e.target.value});
        setCurrentSize(0);
        setListCount(0);
        setAgentLists([]);  
    }

    const OnInputChange=(e)=>{
        console.log(e.target.value);
        setALInput({...ALInput,[e.target.name]:e.target.value});
    }

    const LoadAgentList=async(e)=>{
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display="block";

        var list={};

        list["search_text"]=search_text;
        list["agent_status_text"]=agent_status_text;
        list["agent_type"]=agent_type;
        list["list_limit"]=500;
        list["current_size"]=0;
        await axios.post(process.env.REACT_APP_API+"AgentList",list).then(response=>{
            console.log(response);
            setProcessDetails(true);

            var AgentLists=[], CreatedAtNew,UpdatedAtNew;

            for(let i=0;i<response.data.agent_list.length;i++){
                if(response.data.agent_list[i].agent_created_at!==null){
                    var CANew=response.data.agent_list[i].agent_created_at;
                    CreatedAtNew=CANew.substring(0,10);
                }
                else{
                    CreatedAtNew=response.data.agent_list[i].agent_created_at;
                }

                if(response.data.agent_list[i].agent_updated_at!==null){
                    var UANew=response.data.agent_list[i].agent_updated_at;
                    UpdatedAtNew=UANew.substring(0,10);
                }
                else{
                    UpdatedAtNew=response.data.agent_list[i].agent_updated_at;
                }

                AgentLists.push({
                    "agent_guid": response.data.agent_list[i].agent_guid,
                    "agent_name": response.data.agent_list[i].agent_name,
                    "agent_mobile_number": response.data.agent_list[i].agent_mobile_number,
                    "agent_email": response.data.agent_list[i].agent_email,
                    "agent_password": response.data.agent_list[i].agent_password,
                    "agent_address": response.data.agent_list[i].agent_address,
                    "agent_type": response.data.agent_list[i].agent_type,
                    "agent_status_text": response.data.agent_list[i].agent_status_text,
                    "agent_created_at": CreatedAtNew,
                    "agent_updated_at": UpdatedAtNew
                });
            }

            setAgentLists(AgentLists);

            if(response.data.is_success){
                toast.success(response.msg);
                setWarnings({["warning"]:""});
                
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display="none";
            }
            else{
                setAgentLists([]);
                setWarnings({["warning"]:response.data.msg});
               
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display="none";
            }

        }).catch(error=>{
            console.log(error);
            alert(error.message);
            setDisableButton(false);
            document.getElementById("img_gif_loading_btn").style.display="none";
        })

    }

    const  AgentDelete=async (agent_index,agent_guid)=>{
        var list={};
        
        list["agent_guid"]=agent_guid;
        await axios.post(process.env.REACT_APP_API+"AgentDelete",list).then(response=>{
          console.log(response);
          if(response.data.is_success){
      
          toast.success(response.data.msg);
          var temp_agent=AgentLists;
          temp_agent.splice(agent_index,1);
          setAgentLists([]);
          setAgentLists(temp_agent);
          }
          else{
            alert(response.data.msg);
        }
        }).catch(error=>{
          console.log(error);
          toast.error(""+error);
        })
    }



return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h2 className='fontweight' style={{color:"black"}}>Agent List</h2>
    <hr className="btncolor"  style={{height:"2px"}}/>
    <CRow>

        <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
            <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Type</CLabel>
                <CSelect custom name="agent_type"  onChange={(e)=>OnInputChange(e)}>
                    {/* <option>Select Type</option> */}
                    <option selected={agent_type==="All"} value="All" >All</option>
                    <option selected={agent_type==="Agent"} value="Agent" >Agent</option>
                    <option selected={agent_type==="Customer"} value="Customer">Customer</option>
                </CSelect>
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
            <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Status Text</CLabel>
                <CSelect custom name="agent_status_text"  onChange={(e)=>OnInputChange(e)}>
                    {/* <option>Select Status Text</option> */}
                    <option selected={agent_status_text==="ALL"} value="ALL" >ALL</option>
                    <option selected={agent_status_text==="ACTIVE"} value="ACTIVE" >ACTIVE</option>
                    <option selected={agent_status_text==="IN_ACTIVE"} value="IN_ACTIVE">IN_ACTIVE</option>
                    <option selected={agent_status_text==="BLOCKED"} value="BLOCKED">BLOCKED</option>
                    <option selected={agent_status_text==="DELETED"} value="DELETED">DELETED</option>
                    <option selected={agent_status_text==="REJECTED"} value="REJECTED">REJECTED</option>
                </CSelect>
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3"  className="mt-3 pt-3">
            <div className="inner-addon right-addon mt-1" >
                <i className="fa fa-search"></i>
                <CInput type="text"
                placeholder="Search"
                name="search_text"
                value={search_text}
                onChange={(e)=>OnChangeTextSearch(e)}
                onKeyUp={()=>LoadAgentList()}     
                ></CInput>
            </div>
        </CCol>
 
        < CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
            <div className="mt-4  bgblue" style={{borderRadius:"5px"}}>
                <CButton type="submit" style={{width:"100%",color:"white", fontWeight:"bold"}}
                onClick={(e)=>LoadAgentList(e)}
                disabled={disablebutton}>Generate</CButton>
                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
               
            {warnings.warning&&<p className="red">{warnings.warning}</p>}       
        </CCol>
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>

    {processdetails?
    <div>
    <div className="table-responsive  my-table" >
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight bgblue' style={{color:"black", fontSize:"13px"}} >
                <td>Sl_No</td>
                <td>Type</td>
                <td>Name</td>
                <td>Mobile No</td>
                <td>Address</td>
                <td>E - Mail</td>
                <td>Status</td>
                <td>Created_At</td>
                <td>Updated_At</td>
                <td>Edit</td>
                <td>Details</td>
                {/* <td>Make_Payment</td> */}
            </tr>
            {AgentLists.map((AList,index)=>(
                <tr className='fontweight' style={{color:"black", fontSize:"12px"}} key={index}>
                <td>{index+1}</td>
                <td>{AList.agent_type}</td>
                <td>{AList.agent_name}</td>
                <td>{AList.agent_mobile_number}</td>
                <td>{AList.agent_address}</td>
                <td>{AList.agent_email}</td>
                <td>{AList.agent_status_text}</td>
                <td>{AList.agent_created_at}</td>
                <td>{AList.agent_updated_at}</td>
                <td>
                    <Link to={{pathname:'/add-new-agent',
                        pfid:{
                            pfid:AList.agent_guid
                            }
                        }} className="btn" style={{paddingLeft:"2px"}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                </td>
                {/* <td>
                    <CButton  className="btn" onClick={()=> AgentDelete(index,AList.agent_guid)}>
                    <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"25px",color:"red"}}></i>
                    </CButton>
                </td> */}
                <td>
                <Link to={`/agent-details?agent_guid=${AList.agent_guid}`}
                className="btn bgblue white width100 fontweight bgclr " style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>

                {/* <td>
                <Link to={`/make-payment-add`}
                className="btn bgblue white width100 fontweight bgclr " style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Make Payment
                </Link>
                </td> */}
            </tr>
            ))}             
        </tbody>
    </table>
    </div>
    </div>
    :null}

    
</div>
</>
)
}
export default AgentList;