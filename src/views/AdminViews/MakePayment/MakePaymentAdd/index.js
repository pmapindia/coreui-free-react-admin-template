import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie';
import Select from 'react-select';
import {Link,useHistory,useParams,useLocation} from 'react-router-dom';
import axios from "axios";
import {CButton,CCardCCardBody,CCardHeader,CCol,CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CInput,CForm,CSelect,
  CRow,CLabel,CFormGroup} from '@coreui/react'
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';
import PaymentValidation from './PaymentValidation';

const MakePaymentAdd = (props) => {

    const[cookies,setCookies,removeCookie]=useCookies(['admin']);

    const[errors,setErrors]=useState({});
    const[warnings,setWarnings]=useState({
    warnings:""
    });

    const[disablebutton,setDisableButton]=useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var Agentguid=searchParams.get("agent_guid");

    const[AgentDetails,setAgentDetails]=useState({});
    const[AgentBankDetails,setAgentBankDetails]=useState([]);

    useEffect(() => {
        AgentDetailsByID();
    },[]);

    const AgentDetailsByID=async()=>{
        var list={};
        list["agent_guid"]=Agentguid;

        await axios.post(process.env.REACT_APP_API+"AgentDetailsByID",list).then(response=>{
            console.log(response);
            setAgentDetails(response.data.agent_details);
            setAgentBankDetails(response.data.agent_bank_details);
        }).catch(error=>{
            console.log(error);
        });
    }

    //Add Function

    const[MakePaymentAdd,setMakePaymentAdd]=useState({
            payment_guid:"",
            payment_agent_guid: "",
            payment_user_guid: "",
            payment_property_guid: "",
            payment_purpose: "",
            payment_type: "",
            payment_amount: "",
            payment_remarks: "",
            payment_reference: "",
            payment_success_screenshot: "",
            payment_date: ""
    });

    const{
        payment_guid,
        payment_agent_guid,
        payment_user_guid,
        payment_property_guid,
        payment_purpose,
        payment_type,
        payment_amount,
        payment_remarks,
        payment_reference,
        payment_success_screenshot,
        payment_date
    }=MakePaymentAdd;

    const OnInputChange=(e)=>{
        console.log(e.target.value);
        setMakePaymentAdd({...MakePaymentAdd,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        if(MakePaymentAdd.payment_date===""){
        var todaysdate=new Date();
        var todays_date=todaysdate.getFullYear()+"-"+("0"+(todaysdate.getMonth()+1)).slice(-2)+"-"+("0"+(todaysdate.getDate())).slice(-2) ;      
        setMakePaymentAdd({...MakePaymentAdd,["payment_date"]:todays_date});      
        console.log(todays_date);
    }  
    },[MakePaymentAdd.payment_date===""]);

    const[PropertyList,setPropertyList]=useState([]);
    const LoadDropdowns=async()=>{
        await axios.post(process.env.REACT_APP_API+"GetDropDownList",{dropdown_list:[
            {
                "dropdown_type": "DD_PROPERTIES","dropdown_filter": ""
            }        
            ]}).then(response=>{
                console.log(response);
                if(response.data.drop_down_list!=null){
                    for(let d=0;d<response.data.drop_down_list.length;d++){
                        var dd_list=response.data.drop_down_list[d];
                        if(dd_list.each_drop_down_list!=null && dd_list.dropdown_type==="DD_PROPERTIES"){                     
                            let ddlist=[];
                            for(let sd=0;sd<dd_list.each_drop_down_list.length;sd++){                
                            ddlist.push({"value":dd_list.each_drop_down_list[sd].dd_id,"label":dd_list.each_drop_down_list[sd].dd_name})              
                            }
                            setPropertyList(ddlist);                     
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
         setMakePaymentAdd({...MakePaymentAdd,["payment_property_guid"]:e.value});         
    };

    //Payment Screenshots
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

    var image="";
    const [PictureDis, setPictureDis] = useState(false);

    const[imgdivc,setImgDivC]=useState(false);

    const onChangePicture = (e) => {
        
        //console.log(e.target.name);
        if (e.target.files[0]) {
          // console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        //console.log(e.target.files[0].name);
        var b1=e.target.files[0].name;
           
        const reader = new FileReader();
        reader.addEventListener("load", () => {
             //converting the image to base64
             //setImgData(reader.result);            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image=a;  
            var image_name=e.target.name;
            //var image_name=b1;
            UploadImage(image,image_name);
            //console.log("a:"+image)
            console.log("Property Cover Image Name:" +image_name); 
            // setPropertiesAdd({...ProjectsAdd,
            //     ["property_cover_image"]: a
            // });
            //console.log(image);  
           });
           reader.readAsDataURL(e.target.files[0]);   
         }
    };

    const UploadImage=async(cover_image,image_name)=>{
        
        console.log(image_name);//sdf
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
         
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
          console.log(response);
          setPictureDis(true);
          console.log("imagename");
          var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
          console.log(response.data.image_name);
          if(image_name==="payment_success_screenshot"){
    
            setMakePaymentAdd({ ...MakePaymentAdd, 
            ["payment_success_screenshot"]: response.data.image_name,
             
            });
            setImgDivC(true);
            setImgData(img11);
        }
        }).catch(error=>{
          console.log(error);
        })
    
      }
    
    //Remove images
    const Removeimage=(propertycoverimage)=>{
    // alert(propertycoverimage);
    setMakePaymentAdd({...MakePaymentAdd,[propertycoverimage]:""});
    setPictureDis(false);
   }


   //Add Api
    const OnSubmitPayment=async(e)=>{
        e.preventDefault();      
        setDisableButton(true); 
        document.getElementById("img_gif_loading_btn").style.display="block";     
        setErrors(PaymentValidation(MakePaymentAdd));
        var errorcount=Object.keys(PaymentValidation(MakePaymentAdd)).length;
        if(errorcount===0){
            await axios.post(process.env.REACT_APP_API+"PaymentToAgentAdd",{
                "payment_agent_guid": Agentguid,
                "payment_user_guid": cookies.user_guid,
                "payment_property_guid": payment_property_guid,
                "payment_purpose": payment_purpose,
                "payment_type": payment_type,
                "payment_amount": payment_amount,
                "payment_remarks": payment_remarks,
                "payment_reference": payment_reference,
                "payment_success_screenshot": payment_success_screenshot,
                "payment_date": payment_date
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(``);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display="none";
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
            setDisableButton(false);
            document.getElementById("img_gif_loading_btn").style.display="none";
        }
    }

return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
<h2 className='fontweight' style={{color:"black"}}>Make Payment</h2>
<hr className="bgclr" style={{height:"3px"}}/>
<div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>Type</td>
                <td>Name</td>
                <td>Mobile Number</td>
                <td>E - Mail</td>
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{AgentDetails.agent_type}</td>
                <td>{AgentDetails.agent_name}</td>
                <td>+91 - {AgentDetails.agent_mobile_number}</td>
                <td>{AgentDetails.agent_email}</td>
            </tr>
        </tbody>
    </table>
    {/* </div>

    <div className='mt-10'> */}
    <table class="table rs-table-bordered mb-5" >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", }} >
                <td>Address</td>    
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", }}>
                <td>{AgentDetails.agent_address}</td>
            </tr>
        </tbody>
    </table>
    </div>

    <h5 className='fontweight' style={{color:"black"}}><u>{AgentDetails.agent_type} Bank Details</u></h5>

    <table class="table rs-table-bordered ">
        <tbody>
            <tr className='fontweight' style={{color:"white", fontSize:"15px",textAlign:"center", backgroundColor:"green" }} >
                <td>Bank Name</td>  
                <td>A/C No</td>
                <td>IFSC Code</td>
                <td>UPI</td>  
            </tr>
            {AgentBankDetails.map((ABDetails,index)=>(
                <tr className='fontweight' style={{color:"black", fontSize:"13px",backgroundColor:"lightgreen", textAlign:"center"}}>
                <td>{ABDetails.bank_name}</td>
                <td>{ABDetails.bank_account_number}</td>
                <td>{ABDetails.bank_account_ifsc}</td>
                <td>{ABDetails.bank_account_upi}</td>
            </tr>
            ))}
            
        </tbody>
    </table>

    <CRow className="mt-3">
    <CCol xs="12" sm="3" md="3" lg="3" >
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Property</CLabel>(Optional)
            <Select options={PropertyList}
             onChange={(e)=>onInputChangedropdown(e)}
            ></Select>
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" >
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Payment Date <span className="red">*</span></CLabel>
            <CInput type='date' placeholder=''
            name='payment_date'
            value={payment_date}
            onChange={(e)=>OnInputChange(e)}
            ></CInput>
            {errors.payment_date&&<p className="red">{errors.payment_date}</p>}
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" >
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Payment Type <span className="red">*</span></CLabel>
            <CSelect custom 
            name="payment_type"  onChange={(e)=>OnInputChange(e)}
            >
                <option >Select Payment Type</option>
                <option selected={payment_type==="Cash"} value="Cash" >Cash</option>
                <option selected={payment_type==="Net Banking"} value="Net Banking" >Net Banking</option>
                <option selected={payment_type==="RTGS"} value="RTGS" >RTGS</option>
                <option selected={payment_type==="NEFT"} value="NEFT" >NEFT</option>
                <option selected={payment_type==="Cheque"} value="Cheque" >Cheque</option>
                <option selected={payment_type==="Google Pay"} value="Google Pay" >Google Pay</option>
                <option selected={payment_type==="PhonePe"} value="PhonePe" >PhonePe</option>
                <option selected={payment_type==="Paytm"} value="Paytm" >Paytm</option>
                <option selected={payment_type==="WhatsApp Payments"} value="WhatsApp Payments" >WhatsApp Payments</option>
                <option selected={payment_type==="Others"} value="Others" >Others</option>
            </CSelect>
            {errors.payment_type&&<p className="red">{errors.payment_type}</p>}
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" >
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Reference <span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Reference'
            name='payment_reference'
            value={payment_reference}
            onChange={(e)=>OnInputChange(e)}
            ></CInput>
            {errors.payment_reference&&<p className="red">{errors.payment_reference}</p>}
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Amount(In Rs) <span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Amount (In Rs)'
            name='payment_amount'
            value={payment_amount}
            onChange={(e)=>OnInputChange(e)}
            ></CInput>
            {errors.payment_amount&&<p className="red">{errors.payment_amount}</p>}
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Purpose <span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Purpose'
            name='payment_purpose'
            value={payment_purpose}
            onChange={(e)=>OnInputChange(e)}
            ></CInput>
            {errors.payment_purpose&&<p className="red">{errors.payment_purpose}</p>}
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Remarks</CLabel>
            <CInput type='text' placeholder='Remarks'
            name='payment_remarks'
            value={payment_remarks}
            onChange={(e)=>OnInputChange(e)}
            ></CInput>
    </CCol>

    <CCol xs="12" sm="3" md="3" lg="3" >
        <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Payment Screenshot <span className="red">*</span></CLabel>
            <div className="div" style={{fontSize:"13px", fontWeight:"bold"}}>
                Upload Screenshot
                <CInput type="file" className="hide-file"
                    name="payment_success_screenshot"
                    onChange={(e)=>onChangePicture(e)}
                ></CInput>
            </div>
            {PictureDis? 
            <div>
            <div className=" table-responsive my-table mt-5">
            <CFormGroup>
                <img className="playerProfilePic_home_tile mt-2" 
                    //src={process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+payment_success_screenshot}
                    src={process.env.REACT_APP_DOCUMENTS_PATH+payment_success_screenshot}
                    style={{width:"80%",height:"150px",marginTop:"2px", float:"right",paddingRight:"50px"}}/>
            </CFormGroup>
            </div> 
            <CFormGroup>
                <CButton  className="bgcyan white ml-1 mt-1" 
                 onClick={()=>Removeimage("property_cover_image")}
                 ><i className="fa fa-close"></i></CButton>
                </CFormGroup>
        </div>  :null}        
    </CCol>
    
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
    <CRow>
        <CCol xs="12" sm="5" md="5" lg="5" ></CCol>
        <CCol xs="12" sm="2" md="2" lg="2" >
            <div className="bgblue1 mb-2" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitPayment(e)} disabled={disablebutton} 
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
                {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        <CCol xs="12" sm="5" md="5" lg="5" ></CCol>
    </CRow>
</div>
</>
)
}
export default MakePaymentAdd;