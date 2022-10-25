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


const MakePaymentList = (props) => {

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

    const[MPInput,setMPInput]=useState({
        psyment_agent_guid: ""
    });

    const{
        psyment_agent_guid
    }=MPInput;

    const[PaymentLists,setPaymentLists]=useState([]);

    const[AgentList,setAgentList]=useState([]);

    const LoadDropdowns=async()=>{
        await axios.post(process.env.REACT_APP_API+"GetDropDownList",{dropdown_list:[
            {
                "dropdown_type": "DD_AGENT","dropdown_filter": ""
            }        
            ]}).then(response=>{
                console.log(response);
                if(response.data.drop_down_list!=null){
                    for(let d=0;d<response.data.drop_down_list.length;d++){
                        var dd_list=response.data.drop_down_list[d];
                        if(dd_list.each_drop_down_list!=null && dd_list.dropdown_type==="DD_AGENT"){                     
                            let ddlist=[];
                            for(let sd=0;sd<dd_list.each_drop_down_list.length;sd++){                
                            ddlist.push({"value":dd_list.each_drop_down_list[sd].dd_id,"label":dd_list.each_drop_down_list[sd].dd_name})              
                            }
                            setAgentList(ddlist);                     
                        }
                    }
                }
            }).catch(error=>{
                console.log(error);
            }); 
    }

    useEffect(()=>{
        LoadDropdowns();
    },[]);

     //searcahble dropdown
     const onInputChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMPInput({...MPInput,["psyment_agent_guid"]:e.value});         
    };

    const OnChangeTextSearch=(e)=>{
        console.log(e.target.value);
        setSearchText({...search_text1,[e.target.name]:e.target.value});
        setCurrentSize(0);
        setListCount(0);
        setPaymentLists([]);  
    }

    const OnInputChange=(e)=>{
        console.log(e.target.value);
        setPaymentLists({...PaymentLists,[e.target.name]:e.target.value});
    }

    const LoadPaymentList=async(e)=>{
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display="block";

        var list={};

        list["search_text"]=search_text;
        list["psyment_agent_guid"]=psyment_agent_guid;
        await axios.post(process.env.REACT_APP_API+"PaymentToAgentList",list).then(response=>{
            console.log(response);
            setProcessDetails(true);

            var PaymentLists=[], CreatedAtNew,UpdatedAtNew,PaymentDateNew;

            for(let i=0;i<response.data.payment_list.length;i++){
                if(response.data.payment_list[i].payment_date!==null){
                    var PaymentDate=response.data.payment_list[i].payment_date;
                    PaymentDateNew=PaymentDate.substring(0,10);
                }
                else{
                    PaymentDateNew=response.data.payment_list[i].payment_date;
                }

                if(response.data.payment_list[i].payment_created_at!==null){
                    var CANew=response.data.payment_list[i].payment_created_at;
                    CreatedAtNew=CANew.substring(0,10);
                }
                else{
                    CreatedAtNew=response.data.payment_list[i].payment_created_at;
                }

                if(response.data.payment_list[i].payment_updated_at!==null){
                    var UANew=response.data.payment_list[i].payment_updated_at;
                    UpdatedAtNew=UANew.substring(0,10);
                }
                else{
                    UpdatedAtNew=response.data.payment_list[i].payment_updated_at;
                }

                PaymentLists.push({
                    "payment_guid": response.data.payment_list[i].payment_guid,
                    "payment_agent_guid": response.data.payment_list[i].payment_agent_guid,
                    "payment_agent_name": response.data.payment_list[i].payment_agent_name,
                    "payment_user_guid": response.data.payment_list[i].payment_user_guid,
                    "payment_user_name": response.data.payment_list[i].payment_user_name,
                    "payment_property_guid": response.data.payment_list[i].payment_property_guid,
                    "payment_property_name": response.data.payment_list[i].payment_property_name,
                    "payment_purpose": response.data.payment_list[i].payment_purpose,
                    "payment_type": response.data.payment_list[i].payment_type,
                    "payment_amount": response.data.payment_list[i].payment_amount,
                    "payment_remarks": response.data.payment_list[i].payment_remarks,
                    "payment_reference": response.data.payment_list[i].payment_reference,
                    "payment_success_screenshot": response.data.payment_list[i].payment_success_screenshot,
                    "payment_date": PaymentDateNew,
                    "payment_created_at": CreatedAtNew,
                    "payment_updated_at": UpdatedAtNew
                });
            }

            setPaymentLists(PaymentLists);

            if(response.data.is_success){
                toast.success(response.msg);
                setWarnings({["warning"]:""});
                
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display="none";
            }
            else{
                setPaymentLists([]);
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

    const  PaymentDelete=async (payment_index,payment_guid)=>{
        var list={};
        
        list["payment_guid"]=payment_guid;
        await axios.post(process.env.REACT_APP_API+"PaymentToAgentDelete",list).then(response=>{
          console.log(response);
          if(response.data.is_success){
      
          toast.success(response.data.msg);
          var temp_Payment=PaymentLists;
          temp_Payment.splice(payment_index,1);
          setPaymentLists([]);
          setPaymentLists(temp_Payment);
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
    <h2 className='fontweight' style={{color:"black"}}>Payment List</h2>
    <hr className="btncolor"  style={{height:"2px"}}/>
    <CRow>

        <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
            <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Agent</CLabel>
            <Select options={AgentList}
             onChange={(e)=>onInputChangedropdown(e)}
            ></Select> 
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3"  className="mt-3 pt-3">
            <div className="inner-addon right-addon mt-1" >
                <i className="fa fa-search"></i>
                <CInput type="text"
                placeholder="Search"
                name="search_text"
                value={search_text}
                onChange={(e)=>OnChangeTextSearch(e)}
                onKeyUp={()=>LoadPaymentList()}     
                ></CInput>
            </div>
        </CCol>
 
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-1"></CCol>
        < CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
            <div className="mt-4  bgblue" style={{borderRadius:"5px"}}>
                <CButton type="submit" style={{width:"100%",color:"white", fontWeight:"bold"}}
                onClick={(e)=>LoadPaymentList(e)}
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
                <td>Aget_Name</td>
                <td>User_Name</td>
                <td>Property_Name</td>
                <td>Payment_Date</td>
                <td>Payment_Type</td>
                <td>Reference</td>
                <td>Amount(In Rs)</td>
                <td>Purpose</td>
                <td>Remarks</td>
                <td>Created_At</td>
                <td>Updated_At</td>
                <td>Edit</td>                
                <td>Delete</td>
                <td>Details</td>
            </tr>
            {PaymentLists.map((PList,index)=>(
                <tr className='fontweight' style={{color:"black", fontSize:"12px"}} key={index}>
                <td>{index+1}</td>
                <td>{PList.payment_agent_name}</td>
                <td>{PList.payment_user_name}</td>
                <td>{PList.payment_property_name}</td>
                <td>{PList.payment_date}</td>
                <td>{PList.payment_type}</td>
                <td>{PList.payment_reference}</td>
                <td>{PList.payment_amount}</td>
                <td>{PList.payment_purpose}</td>
                <td>{PList.payment_remarks}</td>
                <td>{PList.payment_created_at}</td>
                <td>{PList.payment_updated_at}</td>
                <td>
                    <Link to={{pathname:'',
                        pfid:{
                            pfid:PList.payment_guid
                            }
                        }} className="btn" style={{paddingLeft:"2px"}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                </td>
                <td>
                    <CButton  className="btn" onClick={()=> PaymentDelete(index,PList.payment_guid)}>
                    <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"25px",color:"red"}}></i>
                    </CButton>
                </td>
                <td>
                <Link to={`/make-payment-details?payment_guid=${PList.payment_guid}`}
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
export default MakePaymentList;