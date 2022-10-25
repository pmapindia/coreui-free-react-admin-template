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

const ProjectsDetails = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var PropertyGuid=searchParams.get("property_guid");

    const[ProjectsDetails,setProjectsDetails]=useState({});
    const[PropertyDetails,setPropertyDetails]=useState([]);
    const[PIList,setPIList]=useState([]);
    const[PDList,setPDList]=useState([]);
    const[MultipleImages,setMultipleImages]=useState([]);
    const[Video,setVideo]=useState([]);

    useEffect(() => {
        ProjectDetailsByID();
    },[]);

    const ProjectDetailsByID=async()=>{
        var list={};
        list["property_guid"]=PropertyGuid;

        await axios.post(process.env.REACT_APP_API+"PropertiesDetailsByID",list).then(response=>{
            console.log(response);

            var Name,Name1;
            if(response.data.property_list.property_available_for_agent==true){
                Name="Yes";
            }
            else{
                Name="No";
            }

            if(response.data.property_list.property_available_for_customers==true){
                Name1="Yes";
            }
            else{
                Name1="No"
            }
            
            setProjectsDetails({
                "property_guid": response.data.property_list.property_guid,
                "property_name": response.data.property_list.property_name,
                "property_location": response.data.property_list.property_location,
                "property_cover_image": response.data.property_list.property_cover_image,
                "property_price": response.data.property_list.property_price,
                "property_dimension": response.data.property_list.property_dimension,
                "property_site_number": response.data.property_list.property_site_number,
                "property_block": response.data.property_list.property_block,
                "property_rate_per_sqft": response.data.property_list.property_rate_per_sqft,
                "property_total_sqft": response.data.property_list.property_total_sqft,
                "property_current_status": response.data.property_list.property_current_status,
                "property_available_for_agent": Name,
                "property_available_for_customers": Name1,
                "property_status_text": response.data.property_list.property_status_text,
                "property_created_at": response.data.property_list.property_created_at
            });
            setPropertyDetails(response.data.property_details_list);

            var PICS,PILists=[];
            for(let i=0;i<response.data.property_infrastucture_list.length;i++){
                if(response.data.property_infrastucture_list[i].infrastructure_current_status===true){
                    PICS="Yes"
                }
                else{
                    PICS="No"
                }
                PILists.push({
                    "infrastructure_guid": response.data.property_infrastucture_list[i].infrastructure_guid,
                    "infrastructure_property_guid": response.data.property_infrastucture_list[i].infrastructure_property_guid,
                    "infrastructure_heading": response.data.property_infrastucture_list[i].infrastructure_heading,
                    "infrastructure_current_status": PICS,
                    "infrastructure_description": response.data.property_infrastucture_list[i].infrastructure_description
                });
            }
            setPIList(PILists);
            setPDList(response.data.property_documents_list);
            setMultipleImages(response.data.property_photos_list);
            setVideo(response.data.property_videos_list);
        }).catch(error=>{
            console.log(error);
            alert(error.message);
            });
    }
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h3 className='fontweight' style={{color:"black"}}>Projects Details</h3>
    <hr className="bgclr" style={{height:"3px"}}/>
    <div className='mt-10'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>Project Name</td>
                <td>Location</td>
                {/* <td>Cover_Image</td> */}
                <td>Price(In Rs.)</td>               
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{ProjectsDetails.property_name}</td>
                <td>{ProjectsDetails.property_location}</td>
                {/* <td>{ProjectsDetails.property_cover_image}</td> */}
                <td>{ProjectsDetails.property_price}</td>
            </tr>

            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>Dimension</td>
                <td>Site_Num</td>
                <td>Block</td>
                
                  
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{ProjectsDetails.property_dimension}</td>
                <td>{ProjectsDetails.property_site_number}</td>
                <td>{ProjectsDetails.property_block}</td>
                
            </tr>

            <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}} >
                <td>Rate/Sqft(In Rs.)</td>
                <td>Total_Sqft</td> 
                <td>Current_Status</td>
                {/* <td>Available for Agent</td>
                <td>Available for Customer</td> */}
            </tr>

            <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                <td>{ProjectsDetails.property_rate_per_sqft}</td>
                <td>{ProjectsDetails.property_total_sqft}</td>
                <td>{ProjectsDetails.property_current_status}</td>
                {/* <td>{ProjectsDetails.property_available_for_agent}</td>
                <td>{ProjectsDetails.property_available_for_customers}</td> */}
            </tr>
        </tbody>
    </table>
    </div>
    <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Property Details:</u> </h5>
    <CRow>
        <CCol xs="12" sm="4" md="4" lg="4">
            <table class="table rs-table-bordered " >
                <tbody style={{color:"black", fontSize:"18px", textAlign:'center', fontWeight:"bold"}}>
                    <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                        <td>Heading</td>
                        
                        <td>Description</td>                            
                    </tr>
                    
                    {PropertyDetails.map((Pdetails,index)=>(
                        <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                            <td>{Pdetails.property_details_heading}</td>
                            
                            <td>{Pdetails.property_details_description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CCol>
    </CRow>

    <h5 className='fontweight mt-2' style={{color:"black", marginBottom:"1px"}}><u> Property Infrastructure:</u> </h5>
    <CRow>
        <CCol xs="12" sm="8" md="8" lg="8">
            <table class="table rs-table-bordered " >
                <tbody style={{color:"black", fontSize:"18px", textAlign:'center', fontWeight:"bold"}}>
                    <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                        <td>Heading</td>
                        <td>Status</td>
                        <td>Description</td>                            
                    </tr>
                    
                    {PIList.map((PILists,index)=>(
                        <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                            <td>{PILists.infrastructure_heading}</td>
                            <td>{PILists.infrastructure_current_status}</td>
                            <td>{PILists.infrastructure_description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>            
        </CCol>
    </CRow>

    <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Property Documents:</u> </h5>
    <CRow>
        <CCol xs="12" sm="5" md="5" lg="5">
            <table class="table rs-table-bordered " >
                <tbody style={{color:"black", fontSize:"18px", textAlign:'center', fontWeight:"bold"}}>
                    <tr className='fontweight orgclr' style={{color:"black", fontSize:"15px", textAlign:'center'}}>
                        <td>Document Name</td>                       
                        <td>File Name</td>                            
                    </tr>
                    
                    {PDList.map((PDLists,index)=>(
                        <tr className='fontweight orgclr1' style={{color:"black", fontSize:"13px", textAlign:'center'}}>
                            <td>{PDLists.document_name}</td>                           
                            <td>{PDLists.document_file_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CCol>
    </CRow>

    <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Property Images:</u> </h5>
    <CRow>
        <CCol xs="12" sm="12" md="12" lg="12">
            <div className="table-responsive " >
                <table>
                    <tbody>           
                        <tr>
                            {MultipleImages.map((MImages,index)=>(           
                                <td>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 mr-3 ml-2">
                                            <img className="playerProfilePic_home_tile mt-2" 
                                                src={process.env.REACT_APP_DOCUMENTS_PATH+MImages.photo_file_name}
                                                style={{width:"150px",height:"130px",marginTop:"5px", }}
                                            />
                                             
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
    <h5 className='fontweight mt-4' style={{color:"black", marginBottom:"1px"}}><u> Property Videos:</u> </h5>
    <CRow>
        <CCol xs="12" sm="12" md="12" lg="12">
            <div className="table-responsive " >
                <table>
                    <tbody>                  
                        <tr>
                            {Video.map((video,index)=>(                           
                                <td>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 mr-3 ml-2">
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
        </CCol>
    </CRow>
    <hr className="bgclr" style={{height:"3px"}}/>
</div>
</>
)
}
export default ProjectsDetails;