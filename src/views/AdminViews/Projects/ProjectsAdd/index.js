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
import { post } from 'axios'; 
import Validation from './Validation';
import { index } from 'd3';

const ProjectsAdd = (props) => {

    const[cookies,setCookies,removeCookie]=useCookies(['admin']);

    const[errors,setErrors]=useState({});
    const[warnings,setWarnings]=useState({
    warnings:""
    });

    const[disablebutton,setDisableButton]=useState(false);

    let history=useHistory();

    const[PropertiesAdd,setPropertiesAdd]=useState({
        property_guid:"",
        property_name: "",
        property_location: "",
        property_cover_image: "",
        property_price: "",
        property_dimension: "",
        property_site_number: "",
        property_block: "",
        property_rate_per_sqft: "",
        property_total_sqft: "",
        property_current_status: "",
        property_available_for_agent: false,
        property_available_for_customers: false,
        property_status_text: "",
        property_access_list: [],
        property_details_list: [],
        property_documents_list: [],
        property_infrastucture_list: [],
        property_photos_list: []
    });

    const{
        property_guid,
        property_name,
        property_location,
        property_cover_image,
        property_price,
        property_dimension,
        property_site_number,
        property_block,
        property_rate_per_sqft,
        property_total_sqft,
        property_current_status,
        property_available_for_agent,
        property_available_for_customers,
        property_status_text,
        property_access_list,
        property_details_list,
        property_documents_list,
        property_infrastucture_list,
        property_photos_list
    }=PropertiesAdd;

    const OnInputChange=(e)=>{
        console.log(e.target.value);
        setPropertiesAdd({...PropertiesAdd,[e.target.name]:e.target.value});
    }

    //Checkbox for Product Related
    const OnCheckInputChangePAA=(e)=>{
        console.log(e.target.checked);
        setPropertiesAdd({...PropertiesAdd,["property_available_for_agent"]:e.target.checked});
    }

    //Checkbox for System Related
    const OnCheckInputChangePAC=(e)=>{
        console.log(e.target.checked);
        setPropertiesAdd({...PropertiesAdd,["property_available_for_customers"]:e.target.checked});
    }

    //Cover Image

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    //var image="";

    // const onChangePicture = e => {
    //     if (e.target.files[0]) {
    //         console.log("picture: ", e.target.files);
    //         setPicture(e.target.files[0]);
    //         console.log(e.target.files[0].name);
    //         var b=e.target.files[0].name;
    //        //setUser({ ...user, ["category_image"]: b });
          
    //         // setUser({category_image:e.target.files[0]});
    //         const reader = new FileReader();
    //         reader.addEventListener("load", () => {
    //         //converting the image to base64
    //         setImgData(reader.result);
    //         var b=reader.result;
    //         //to remove data:image/png;base64, use split method to split the string till comma(,)
    //         var a=reader.result.split(',')[1];
    //         image=a;
  
    //         setPropertiesAdd({ ...PropertiesAdd, ["property_cover_image"]: a });
    //         console.log(b);
    //         console.log(a); 
    //       });
    //       reader.readAsDataURL(e.target.files[0]);
  
    //     }
    //   };

      
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
        
        console.log(image_name);
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
          if(image_name==="property_cover_image"){
    
            setPropertiesAdd({ ...PropertiesAdd, 
            ["property_cover_image"]: response.data.image_name,
             
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
    setPropertiesAdd({...PropertiesAdd,[propertycoverimage]:""});
    setPictureDis(false);
   }

    //Properties Details
    const[PropertiesDetailsAdd,setPropertiesDetailsAdd]=useState([]);
    const OnInventoryChange=(e,index)=>{ 
        console.log(e.target.value); 
        console.log(e.target.name,index);//output:rcpn_dc_date 0 //name and index of row 
        var temp_Inventory_List=[...PropertiesDetailsAdd];   
        temp_Inventory_List[index][e.target.name]=e.target.value; 
        setPropertiesDetailsAdd(temp_Inventory_List); 
    }

    const RemoveGeneralRow=(index)=>{
        let values=[...PropertiesDetailsAdd];
        values.splice(index,1);
        setPropertiesDetailsAdd(values);
    }

    const AddDocumentsRow=()=>{        
        setPropertiesDetailsAdd([...PropertiesDetailsAdd,{
            ["property_details_heading"]: "", 
            ["property_details_description"]: "",      
       }
      ]);
    }

    //Property Infrastructure
    const[PropertiesInfrastucuteList,setPropertiesInfrastucuteList]=useState([
        {
        "infrastructure_heading": "", 
        "infrastructure_current_status": false, 
        "infrastructure_description":""
        }
    ]);

    //Checkbox for infrastructure_current_status
    const OnCheckInputChangePIL=(e,index)=>{
        if(e.target.checked===true){
            //alert(1);
            var temp_pil=[...PropertiesInfrastucuteList];
            temp_pil[index]["infrastructure_current_status"]=true;
            setPropertiesInfrastucuteList(temp_pil);
            console.log(temp_pil);
        }
        else{
            //alert(2);
            for(let i=0;i<PropertiesInfrastucuteList.length;i++){
                if(PropertiesInfrastucuteList[i].infrastructure_current_status===true){
                    var temp_pil=[...PropertiesInfrastucuteList];
                    temp_pil[index]["infrastructure_current_status"]=false;
                    setPropertiesInfrastucuteList(temp_pil);
                }
            }
            console.log(temp_pil);
        }

        console.warn("fgg"+PropertiesInfrastucuteList);
        // console.log(e.target.checked);
        // setPropertiesInfrastucuteList([{...PropertiesInfrastucuteList,["infrastructure_current_status"]:e.target.checked}]);
    }

    
    const OnPIListChange=(e,index)=>{ 
        console.log(e.target.value); 
        console.log(e.target.name,index);//output:rcpn_dc_date 0 //name and index of row 
        var temp_Inventory_List=[...PropertiesInfrastucuteList];   
        temp_Inventory_List[index][e.target.name]=e.target.value; 
        setPropertiesInfrastucuteList(temp_Inventory_List); 
    }

    const AddPIListRow=()=>{        
        setPropertiesInfrastucuteList([...PropertiesInfrastucuteList,{
            ["infrastructure_heading"]: "", 
            ["infrastructure_current_status"]: false, 
            ["infrastructure_description"]:""     
       }
      ]);
    }

    const RemovePIListRow=(index)=>{
        let values=[...PropertiesInfrastucuteList];
        values.splice(index,1);
        setPropertiesInfrastucuteList(values);
    }


    //Upload Documets

    const[documentnames,setDocumentnames]=useState({
        document_name:""
    });

    const{document_name}=documentnames;

    const[documents,setDocuments]=useState([
        //   {
        //   document_name:"",
        //   document_file:""
        // },
    ]);

    const AddDocumentsRow1=()=>{
        setDocuments([...documents,{ document_name:"",document_image:""}]);
    }
    
    const OnDocumentChange=(e)=>{
        console.log(e.target.value);
        setDocumentnames({...documentnames,["document_name"]:e.target.value});
        console.log("setvalue");
        console.log(documentnames.document_name);
    }

    const RemoveDocumentsRow=(index)=>{
        let values=[...documents];
        values.splice(index,1);
        setDocuments(values);
    }

    const[files,setFiles]=useState({
        file:"",
    });

    const setFile=(e)=>{    
        setFiles({...files,["file"]: e.target.files[0]});
    }

    const submit=async(e)=>{
        e.preventDefault();  
        var documentarray=[];  
        var filefor="PROPERTY"
        const url = (process.env.REACT_APP_API+`UploadFile?file_for=${filefor}`);    
        const formData = new FormData();    
        formData.append('body',files.file);    
        const config = {    
            headers: {    
                'content-type': 'multipart/form-data',    
            },    
        };
       
        return post(url, formData, config).then(response=>{
            var adc=documentnames.document_name;
                console.log(response);
                console.log(response.data.file_name);
                console.log(documentarray);
                if(response.data.is_success){
                    toast.success("Successfully Uploaded");    
                    setDocuments([...documents,{["document_name"]:documentnames.document_name,["document_file_name"]:response.data.file_name}]);
                }
                else{
                    toast.error(response.data.msg);
                }
        });   
    }
    //Multiple Images
    const[MultipleImages,setMultipleImages]=useState([]);

    //Upload Video

    const[Video,setVideo]=useState([]);

    const[files1,setFiles1]=useState({
        filename1:"",
    });

    const setFile1=(e)=>{    
        setFiles1({...files1,["filename1"]: e.target.files[0]});
    }

    const SubmitVideo=async(e)=>{
        e.preventDefault();  
        var documentarray=[];  
        var filefor="PROPERTY"
        const url = (process.env.REACT_APP_API+`UploadFile?file_for=${filefor}`);    
        const formData = new FormData();    
        formData.append('body',files1.filename1);    
        const config = {    
            headers: {    
                'content-type': 'multipart/form-data',    
            },    
        };
       
        return post(url, formData, config).then(response=>{
            var adc=documentnames.document_name;
                console.log(response);
                console.log(response.data.file_name);
                console.log(documentarray);
                if(response.data.is_success){
                    toast.success("Successfully Uploaded");    
                    setVideo([...Video,{["video_file_name"]:response.data.file_name}]);
                }
                else{
                    toast.error(response.data.msg);
                }
        });   
    }

    const RemoveVideo=(index)=>{
        let values=[...Video];
        values.splice(index,1);
        setVideo(values);
    }


    //Property for Agent or Customer

    const[AgentList,setAgentList]=useState([]);

    const[PALists,setPALists,]=useState([]);

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

    const AgentOnChange=async(e)=>{
        // alert(e);here i will get the object
            console.warn(e.value);//here i will get the specific selected value
            if(e.value!=null){
                var Agent_Guid="";
                for(let i=0;i<AgentList.length;i++){
                    if(e.value===AgentList[i].dd_id){
                        Agent_Guid=AgentList[i].dd_id;
                    }
                }

                if(Agent_Guid===""){
                    setPALists([...PALists,{
                        ["access_agent_guid"]:e.value,
                        ["access_agent_name"]:e.label
                     }]);    
                }
            }
        }

    const RemoveRowAgent=(index)=>{
        let values=[...PALists];
        values.splice(index,1);
        setPALists(values);
    }


    useEffect(()=>{
        LoadDropdowns();
    },[]);

    //Multiple Images

    const [picture2, setPicture2] = useState(null);
    const [imgData2, setImgData2] = useState(null);
    const [PictureDis2, setPictureDis2] = useState(null);
    var image2="";
    const[imgdivc2,setImgDivC2]=useState(false);

    const onChangeMultiplePicture = (e) => {
        if (e.target.files[0]) {
        setPicture2(e.target.files[0]);
        var b1=e.target.files[0].name;
           
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image2=a;  
            var image_name2=e.target.name;
            UploadImage2(image2,image_name2);
            console.log("Multhiple Image Name:" +image_name2); 
           });
           reader.readAsDataURL(e.target.files[0]);
         }
    };

    const UploadImage2=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
         
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
          console.log(response);
          setPictureDis2(true);
          console.log("imagename");
          var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
          console.log(response.data.image_name);
          if(image_name==="photo_file_name"){
    
            setMultipleImages([ ...MultipleImages,{
            ["photo_file_name"]: response.data.image_name,
            }
            ]);
            setImgDivC2(true);
            setImgData2(img11);
        }
        }).catch(error=>{
          console.log(error);
        })
    }

    const RemoveMI=(index)=>{
        let values=[...MultipleImages];
        values.splice(index,1);
        setMultipleImages(values);
    }


    const OnProjectAddSubmit=async(e)=>{
        e.preventDefault();
        setDisableButton(true); 
        document.getElementById("img_gif_loading_btn").style.display="block";     
        setErrors(Validation(PropertiesAdd));
        var errorcount=Object.keys(Validation(PropertiesAdd)).length;
        if(errorcount===0){
            if(property_guid===""){
                await axios.post(process.env.REACT_APP_API+"PropertiesAdd",{
                    "property_name": property_name,
                    "property_location": property_location,
                    "property_cover_image": property_cover_image,
                    "property_price": property_price,
                    "property_dimension": property_dimension,
                    "property_site_number": property_site_number,
                    "property_block": property_block,
                    "property_rate_per_sqft": property_rate_per_sqft,
                    "property_total_sqft": property_total_sqft,
                    "property_current_status": property_current_status,
                    "property_available_for_agent": property_available_for_agent,
                    "property_available_for_customers": property_available_for_customers,
                    "property_status_text": property_status_text,
                    "property_access_list":PALists ,
                    "property_details_list":PropertiesDetailsAdd ,
                    "property_documents_list":documents,
                    "property_infrastucture_list": PropertiesInfrastucuteList,
                    "property_photos_list":MultipleImages,
                    "property_video_list": Video
                }).then(response=>{
                    console.log(response);
                    if(response.data.is_success){
                        toast.success(response.data.msg);
                        setWarnings({["warning"]:""});
                        history.push(`/project-list`);
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
                await axios.post(process.env.REACT_APP_API+"PropertiesUpdate",{
                    "property_guid":property_guid,
                    "property_name": property_name,
                    "property_location": property_location,
                    "property_cover_image": property_cover_image,
                    "property_price": property_price,
                    "property_dimension": property_dimension,
                    "property_site_number": property_site_number,
                    "property_block": property_block,
                    "property_rate_per_sqft": property_rate_per_sqft,
                    "property_total_sqft": property_total_sqft,
                    "property_current_status": property_current_status,
                    "property_available_for_agent": property_available_for_agent,
                    "property_available_for_customers": property_available_for_customers,
                    "property_status_text": property_status_text,
                    "property_access_list":PALists ,
                    "property_details_list":PropertiesDetailsAdd ,
                    "property_documents_list":documents,
                    "property_infrastucture_list": PropertiesInfrastucuteList,
                    "property_photos_list":MultipleImages,
                    "property_video_list": Video
                }).then(response=>{
                    console.log(response);
                    if(response.data.is_success){
                        toast.success(response.data.msg);
                        setWarnings({["warning"]:""});
                        history.push(`/project-list`);
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

    const LoadProjectDetails=async()=>{
        var list={};
        if(props.location.pfid!=null){
            list["property_guid"]=props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API+"PropertiesDetailsByID",list).then(response=>{
                console.log(response);{
                    setPropertiesAdd({
                        "property_guid": response.data.property_list.property_guid,
                        "property_name": response.data.property_list.property_name,
                        "property_location": response.data.property_list.property_location,
                        "property_cover_image": response.data.property_list.property_cover_image,
                        "property_price": response.data.property_list.property_price,
                        "property_dimension":response.data.property_list.property_dimension,
                        "property_site_number": response.data.property_list.property_site_number,
                        "property_block": response.data.property_list.property_block,
                        "property_rate_per_sqft":response.data.property_list.property_rate_per_sqft,
                        "property_total_sqft": response.data.property_list.property_total_sqft,
                        "property_current_status": response.data.property_list.property_current_status, 
                        "property_available_for_agent": response.data.property_list.property_available_for_agent,
                        "property_available_for_customers": response.data.property_list.property_available_for_customers,                    
                    });

                    setPALists(response.data.property_access_list);
                    setPropertiesDetailsAdd(response.data.property_details_list);
                    setDocuments(response.data.property_documents_list);
                    setPropertiesInfrastucuteList(response.data.property_infrastucture_list);
                    setMultipleImages(response.data.property_photos_list);
                    setVideo(response.data.property_videos_list);
                }
            })
        }
    }

    useEffect(()=>{
        LoadProjectDetails();
    },[]);


return(
<>
<div style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
{props.location.pfid!=null?
    <h2 className='fontweight' style={{color:"black"}}> Update Project </h2> :
    <h2 className='fontweight' style={{color:"black"}}> Add New Project </h2>
}
    <hr className="bgclr" style={{height:"3px"}}/>
    {/* <hr className="bgblue" style={{ height: "2px" }} /> */}
    <CForm>
        <CRow className="mt-4">
        <CCol xs="12" sm="9" md="9" lg="9">
            <CRow>
            <CCol xs="12" sm="4" md="4" lg="4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Project Name<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Project Name'
                    name='property_name'
                    value={property_name}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_name&&<p className="red">{errors.property_name}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Location<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='E.g: Vijay Nagar 4th Stage Mysore-21'
                    name='property_location'
                    value={property_location}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_location&&<p className="red">{errors.property_location}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Price (In Rs)<span className="red">*</span></CLabel>
                    <CInput type='' placeholder='Price (In Rs)'
                    pattern="^\d*(\.\d{0,2})?$"
                    step="0.1"
                    name='property_price'
                    value={property_price}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_price&&<p className="red">{errors.property_price}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Dimension<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='E.g: 30 * 40'
                    name='property_dimension'
                    value={property_dimension}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_dimension&&<p className="red">{errors.property_dimension}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Site No<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Site No'
                    name='property_site_number'
                    value={property_site_number}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_site_number&&<p className="red">{errors.property_site_number}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Block<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Block'
                    name='property_block'
                    value={property_block}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_block&&<p className="red">{errors.property_block}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Rate per Sqft(In Rs.)<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Rate per Sqft(In Rs.)'
                    name='property_rate_per_sqft'
                    value={property_rate_per_sqft}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_rate_per_sqft&&<p className="red">{errors.property_rate_per_sqft}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Total Sqft<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Total Sqft'
                    name='property_total_sqft'
                    value={property_total_sqft}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_total_sqft&&<p className="red">{errors.property_total_sqft}</p>}
            </CCol>

            <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Current Status<span className="red">*</span></CLabel>
                    <CInput type='text' placeholder='Current Status'
                    name='property_current_status'
                    value={property_current_status}
                    onChange={(e)=>OnInputChange(e)}
                    ></CInput>
                    {errors.property_current_status&&<p className="red">{errors.property_current_status}</p>}
            </CCol>
            </CRow>
        </CCol>

            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
            
                <div className="div mt-3" style={{fontSize:"15px", fontWeight:"bold"}}>
                    Cover Image
                    <CInput type="file" className="hide-file"
                        name="property_cover_image"
                        onChange={(e)=>onChangePicture(e)}
                    ></CInput>
                </div>
                {PictureDis? <div>
                <br></br>
                <div className=" table-responsive my-table mt-5">
                {/* <img className="playerProfilePic_home_tile" src={imgData} style={{width:"200px",height:"200px"}}/> */}              
                <img className="playerProfilePic_home_tile mt-2" 
                    src={process.env.REACT_APP_DOCUMENTS_PATH+property_cover_image}
                    style={{width:"80%",height:"150px",marginTop:"2px", float:"right",paddingRight:"50px"}}
                />     
                </div>                         
                <CFormGroup>
                <CButton  className="bgcyan white ml-1 mt-1" 
                 onClick={()=>Removeimage("property_cover_image")}
                 ><i className="fa fa-close"></i></CButton>
                </CFormGroup>
                </div> : null}
            </CCol>

        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Project Details</u> </h5>
        <CRow className="">
        
            <CCol xs="12" sm="6" md="" lg="9">
                <table class="table rs-table-bordered " >
                    <tbody style={{color:"black", fontSize:"15px", textAlign:'center', fontWeight:"bold"}}>
                        <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                            <td>Heading</td>
                            <td>Description</td>
                            <td>Remove</td>
                        </tr>

                    {PropertiesDetailsAdd.map((PDAdd,index)=>(
                        <tr key={index}>
                            <td style={{width:"400px"}}>
                                <CInput type="text" 
                                    placeholder="Heading"
                                    name="property_details_heading"
                                    value={PDAdd.property_details_heading}
                                    onChange={(e)=>OnInventoryChange(e,index)}
                                />
                            </td>

                            <td style={{width:"500px"}}>
                            <CInput type="text" 
                                    placeholder="Description"
                                    name="property_details_description"
                                    value={PDAdd.property_details_description}
                                    onChange={(e)=>OnInventoryChange(e,index)}
                                />
                            </td>

                            <td align='center'>
                            <CButton  style={{textAlign:"center",fontSize:"20px", fontWeight:"bold",}}
                                onClick={()=>RemoveGeneralRow(index)}
                                ><i class="fa fa-trash-o" aria-hidden="false"  style={{fontSize:"25px",color:"red"}}></i>
                                </CButton>  
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CCol>
            <CCol xs="12" sm="6" md="6" lg="4"></CCol>
            <CCol xs="12" sm="5" md="5" lg="4"></CCol>
            <CCol xs="12" sm="1" md="1" lg="1">
                <CButton className="bgclr" style={{borderRadius:"30px",paddingLeft:"10%",float:"right", borderColor:"black", fontSize:"15px", fontWeight:"bold"}}
                    onClick={()=>AddDocumentsRow()}>
                    <i className=" fa fa-plus" aria-hidden="false"></i>
                </CButton>
            </CCol>
        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <h5 className='fontweight' style={{color:"black"}}><u>Project Infrastucture</u></h5>
        <CRow>
            <CCol xs="12" sm="3" md="6" lg="12">
                <table class="table rs-table-bordered " >
                    <tbody style={{color:"black", fontSize:"15px", textAlign:'center', fontWeight:"bold"}}>
                        <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                            <td>Heading</td>
                            <td>Current Stutus</td>
                            <td>Description</td>
                            <td>Remove</td>
                        </tr>

                        {PropertiesInfrastucuteList.map((PIlist,index)=>(
                            <tr key={index}>
                                <td style={{width:"400px"}}>
                                    <CInput type="text" 
                                        placeholder="Heading"
                                        name="infrastructure_heading"
                                        value={PIlist.infrastructure_heading}
                                        onChange={(e)=>OnPIListChange(e,index)}
                                    />
                                </td>

                                <td style={{width:"400px"}} align="center">
                                <CRow>
                                <CCol xs="12" sm="3" ></CCol>
                                <CCol xs="12" sm="2" ></CCol>
                                    <CCol xs="12" sm="3" >
                                    <CInput type="checkbox" 
                                        //placeholder="Heading"
                                        name="infrastructure_current_status"
                                        value={PIlist.infrastructure_current_status}
                                        checked={PIlist.infrastructure_current_status===true}
                                        onChange={(e)=>OnCheckInputChangePIL(e,index)}
                                        //onChange={(e)=>OnPIListChange(e,index)}
                                    />
                                    </CCol>
                                </CRow>
                                </td>

                                <td style={{width:"700px"}}>
                                    <CInput type="text" 
                                        placeholder="Description"
                                        name="infrastructure_description"
                                        value={PIlist.infrastructure_description}
                                        onChange={(e)=>OnPIListChange(e,index)}
                                    />
                                </td>

                                <td align='center'>
                                    <CButton  style={{textAlign:"center",fontSize:"20px", fontWeight:"bold",}}
                                    onClick={()=>RemovePIListRow(index)}
                                    ><i class="fa fa-trash-o" aria-hidden="false"  style={{fontSize:"25px",color:"red"}}></i>
                                    </CButton>  
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </CCol>
            <CCol xs="12" sm="11" md="11" lg="11"></CCol>
            <CCol xs="12" sm="1" md="1" lg="1">
                <CButton className="bgclr" style={{borderRadius:"30px",paddingLeft:"10%",float:"right", borderColor:"black", fontSize:"15px", fontWeight:"bold"}}
                    onClick={()=>AddPIListRow()}>
                    <i className=" fa fa-plus" aria-hidden="false"></i>
                </CButton>
            </CCol>
        </CRow>

        {/* <h5 className='fontweight' style={{color:"black"}}>Upload Documents</h5> */}
        <hr className="btncolor"  style={{height:"2px"}}/>
        <CRow >
            <CCol xs="12" sm="6" md="3" lg="3" >
                <CFormGroup>
                    <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Document Name</CLabel>
                        <CInput id="name" placeholder="Document Name" 
                        name="document_name"
                        value={document_name}
                        onChange={(e)=>OnDocumentChange(e)}
                        />
                </CFormGroup>
            </CCol>
            
            <CCol xs="12" sm="6" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select File</CLabel>
                <CInput type="file"  
                onChange={(e)=>setFile(e)} 
                />
            </CCol>

            <CCol xs="12" sm="6" md="3" lg="3" className="mt-2">
                <CButton type="submit" 
                onClick={(e)=>submit(e)} 
                className="mt-4 bgcyan white" style={{width:"100%"}}>Upload Documents</CButton>    
            </CCol>

            <CCol xs="12" sm="6" md="6" lg="6">
            <table class="table rs-table-bordered ">
                <tbody style={{color:"black", fontSize:"15px", fontWeight:"bold"}}>
                    <tr className='fontweight orgclr' style={{color:"black", fontSize:"13px"}}>
                        <td>Document Name</td>
                        <td>File Name</td>
                        <td align='center'>Delete</td>
                    </tr>

                    {documents.map((documet,index)=>(
                        <tr key={index}>
                            <td style={{color:"black", fontSize:"13px"}}>{documet.document_name}</td>
                            <td style={{color:"black", fontSize:"13px"}}>{documet.document_file_name}</td>
                            <td align='center'>
                                <CButton  style={{textAlign:"center",fontSize:"15px", fontWeight:"bold",}}
                                onClick={()=>RemoveDocumentsRow(index)}
                                ><i class="fa fa-trash-o" aria-hidden="false"  style={{fontSize:"20px",color:"red"}}></i>
                                </CButton> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </CCol>
        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Property Availablity</u> </h5>
        <CRow>
            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>For Agent</CLabel>
                <CRow>
                    <CCol xs="12" sm="3" >
                        <CFormGroup>
                            <CInput type='checkbox' placeholder=''
                                name='property_available_for_agent'
                                value={property_available_for_agent}
                                checked={property_available_for_agent===true}
                                onChange={(e)=>OnCheckInputChangePAA(e)} 
                                ></CInput>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>For Customer</CLabel>
                <CRow>
                    <CCol xs="12" sm="3" >
                        <CFormGroup>
                            <CInput type='checkbox' placeholder=''
                             name='property_available_for_customers'
                            value={property_available_for_customers}
                            checked={property_available_for_customers===true}
                            onChange={(e)=>OnCheckInputChangePAC(e)}        
                            ></CInput>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CCol>            
        </CRow>
        <h6 className='fontweight' style={{color:"black"}}>Select Agent for Projects</h6>
        <CRow>
        <CCol xs="12" sm="3" md="3" lg="3">
            <Select options={AgentList} onChange={(e)=>AgentOnChange(e)}></Select>
        </CCol>
        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
        <CCol xs="12" sm="4" md="4" lg="4">
                <table class="table rs-table-bordered " >
                    <tbody style={{color:"black", fontWeight:"bold"}}>
                        <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px"}}>
                            <td>Agent Name</td>
                            <td align='center'>Delete</td>
                        </tr>

                        {PALists.map((agent,index)=>(
                        <tr key={index} style={{fontSize:"15px"}}>
                            <td>{agent.access_agent_name}</td>
                            <td align='center'>
                                <CButton  style={{textAlign:"center",fontSize:"10px", fontWeight:"bold",}}
                                onClick={()=>RemoveRowAgent(index)}
                                ><i class="fa fa-trash-o" aria-hidden="false"  style={{fontSize:"22px",color:"red"}}></i>
                                </CButton>    
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </CCol>
        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <h5 className='fontweight' style={{color:"black"}}>Upload Multiple Photos</h5>
        <CRow>
        
        <CCol xs="12" sm="2" md="2" lg="2">
        <div className="div mt-3" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="photo_file_name"
                        onChange={(e)=>onChangeMultiplePicture(e)}
                    ></CInput>
                </div>
        </CCol>
        <CCol xs="12" sm="10" md="10" lg="10"></CCol>
        <CCol xs="12" sm="12" md="12" lg="12">
            <div className="table-responsive   mt-2" >
                <table>
                    <tbody>           
                        <tr>
                            {MultipleImages.map((MImages,index)=>(           
                                <td>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 mr-3 ml-1">
                                            <img className="playerProfilePic_home_tile mt-2" 
                                                src={process.env.REACT_APP_DOCUMENTS_PATH+MImages.photo_file_name}
                                                style={{width:"150px",height:"130px",marginTop:"5px", }}
                                            />
                                             <CFormGroup >
                                                <CButton  className="bgcyan white ml-1 mt-1" style={{fontSize:"10px"}}
                                                onClick={()=>RemoveMI(index)}
                                                ><i className="fa fa-close"></i>
                                                </CButton>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                </td>        
                            ))}
                        </tr>           
                    </tbody>
                </table>
            </div>
            </CCol>
        </CRow>

        <hr className="btncolor"  style={{height:"2px"}}/>
        {/* <h5 className='fontweight' style={{color:"black"}}>Upload Video</h5> */}
        <CRow>
        
            <CCol xs="12" sm="3" md="3" lg="3">
                <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Select Video</CLabel>
                <CInput type="file"  
                onChange={(e)=>setFile1(e)} 
                />
            </CCol>

            <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                <CButton type="submit" 
                onClick={(e)=>SubmitVideo(e)} 
                className="mt-4 bgcyan white" style={{width:"100%"}}>Upload Video</CButton>    
            </CCol>

            <CCol xs="12" sm="6" md="6" lg="6" className="mt-2"></CCol>
            
            <div className="table-responsive   mt-2" >
                <table>
                    <tbody>                  
                        <tr>
                            {Video.map((video,index)=>(                           
                                <td>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 mr-3 ml-3">
                                            <video width="235" height="170" controls >
                                                <source src={process.env.REACT_APP_DOCUMENTS_PATH+video.video_file_name} type="video/mp4"/>
                                            </video>
                                            {/* <CFormGroup >
                                                <CButton  className="bgcyan white ml-1 mt-1" style={{fontSize:"10px"}}
                                                onClick={()=>RemoveVideo(index)}
                                                ><i className="fa fa-close"></i>
                                                </CButton>
                                            </CFormGroup> */}
                                        </CCol>
                                    </CRow>
                                </td>                       
                            ))}
                        </tr>                   
                    </tbody>
                </table>
            </div>
        
        </CRow>
        <hr className="btncolor"  style={{height:"2px"}}/>
        <CRow className="mb-4">
            <CCol xs="12" sm="9" md="9" lg="9" className="mt-1"></CCol>
            <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
                <div className="  bgblue1" style={{borderRadius:"5px"}}>
                    <CButton type="submit" onClick={(e)=>OnProjectAddSubmit(e)} disabled={disablebutton} style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
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
export default ProjectsAdd;
