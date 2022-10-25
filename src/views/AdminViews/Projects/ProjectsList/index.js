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
import { index } from 'd3';

const ProjectsList = () => {

    const[search_text1,setSearchText]=useState({
        search_text:""
    });
    const{search_text}=search_text1;

    const[currentsize,setCurrentSize]=useState(0);
    const[listcount,setListCount]=useState(0);

    const[AllProjects,setAllProjects]=useState([]);

    const OnChangeTextSearch=(e)=>{
        console.log(e.target.value);
        setSearchText({search_text1,[e.target.name]:e.target.value});
        setCurrentSize(0);
        setListCount(0);
        setAllProjects([]);   
    }

    useEffect(()=>{
        LoadAllProjects();
    },[]);

    const LoadAllProjects=async()=>{
        var list={};
        list["search_text"]=search_text;
        list["list_limit"]=50;
        list["current_size"]=currentsize;

        await axios.post(process.env.REACT_APP_API+"PropertiesList",list).then(response=>{
            console.log(response);
            var PLists=[];
            var CreateAtNew="",AFA="",AFC="", PAA,PAC;

            for(let i=0;i<response.data.customer_parameter_list.length;i++){
                
                // AFA=response.data.customer_parameter_list[i].property_available_for_agent.toString();
                // AFC=response.data.customer_parameter_list[i].property_available_for_customers.toString();

                if(response.data.customer_parameter_list[i].property_created_at!=null){
                    var CDate=response.data.customer_parameter_list[i].property_created_at;
                    CreateAtNew=CDate.substring(0,10);
                }
                else{
                    CreateAtNew=response.data.customer_parameter_list[i].property_created_at;
                }

                if(response.data.customer_parameter_list[i].property_available_for_agent===true){
                    AFA="Yes"
                }
                else{
                    AFA="No"
                }

                if(response.data.customer_parameter_list[i].property_available_for_customers===true){
                    AFC="Yes"
                }
                else{
                    AFC="No"
                }

                PLists.push({
                    "property_guid":response.data.customer_parameter_list[i].property_guid,
                    "property_name": response.data.customer_parameter_list[i].property_name,
                    "property_location": response.data.customer_parameter_list[i].property_location,
                    "property_cover_image": response.data.customer_parameter_list[i].property_cover_image,
                    "property_price": response.data.customer_parameter_list[i].property_price,
                    "property_dimension": response.data.customer_parameter_list[i].property_dimension,
                    "property_site_number": response.data.customer_parameter_list[i].property_site_number,
                    "property_block": response.data.customer_parameter_list[i].property_block,
                    "property_rate_per_sqft": response.data.customer_parameter_list[i].property_rate_per_sqft,
                    "property_total_sqft": response.data.customer_parameter_list[i].property_total_sqft,
                    "property_current_status": response.data.customer_parameter_list[i].property_current_status,
                    "property_available_for_agent": AFA,
                    "property_available_for_customers": AFC,
                    "property_status_text": response.data.customer_parameter_list[i].property_status_text,
                    "property_created_at": CreateAtNew
                });
            }
            setAllProjects(PLists);
        }).catch(error=>{
            console.log(error);
        });
    }

    const  ProjectDelete=async (property_index,property_guid)=>{
        var list={};
        
        list["property_guid"]=property_guid;
        await axios.post(process.env.REACT_APP_API+"PropertiesDelete",list).then(response=>{
          console.log(response);
          if(response.data.is_success){
          toast.success(response.data.msg);
          var temp_agent=AllProjects;
          temp_agent.splice(property_index,1);
          setAllProjects([]);
          setAllProjects(temp_agent);
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
    <h3 className='fontweight' style={{color:"black"}}>Project List</h3>
    <CRow>
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-4 pt-1">
            <div class="inner-addon right-addon">
                <i class="fa fa-search"></i>                     
                <CInput type="text"
                    placeholder="Search"
                    name="search_text"
                    value={search_text}
                    onChange={(e)=>OnChangeTextSearch(e)}
                    onKeyUp={()=>LoadAllProjects()}
                    >
                </CInput>
            </div>
        </CCol>
    </CRow>
    <hr className="bgclr" style={{height:"3px"}}/>
    <div className='table-responsive  my-table mt-8'>
    <div>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight bgblue' style={{color:"black", fontSize:"13px",verticalAlign:"middle"}} align="center">
                <td rowSpan={2}>Sl_No</td>
                <td rowSpan={2}>Project_Name</td>
                <td rowSpan={2}>Location</td>
                {/* <td rowSpan={2}>Cover_Image</td> */}
                <td rowSpan={2}>Price</td>
                <td rowSpan={2}>Dimension</td>
                <td rowSpan={2}>Site_Num</td>
                <td rowSpan={2}>Block</td>
                <td rowSpan={2}>Rate/Sqft</td>
                <td rowSpan={2}>Total_Sqft</td>
                <td rowSpan={2}>Current_Status</td>
                <td colSpan={2} align="center">Available</td>
                {/* <td rowSpan={2}>Status_Text</td> */}
                <td rowSpan={2}>Created_At</td>
                <td rowSpan={2}>Edit</td>
                <td rowSpan={2}>Details</td>
                <td rowSpan={2}>Delete</td>
            </tr>
            <tr className='fontweight bgblue' style={{color:"black", fontSize:"13px"}} >
                <td>For_Agent</td>
                <td>For_Customer</td>
            </tr>

            {AllProjects.map((allprojects,index)=>(
                <tr key={index}className='fontweight' style={{color:"black", fontSize:"12px", textAlign:"center"}}>
                    <td>{index+1}</td>
                    <td>{allprojects.property_name}</td>
                    <td>{allprojects.property_location}</td>
                    {/* <td>{allprojects.property_cover_image}</td> */}
                    <td>{allprojects.property_price}</td>
                    <td>{allprojects.property_dimension}</td>
                    <td>{allprojects.property_site_number}</td>
                    <td>{allprojects.property_block}</td>
                    <td>{allprojects.property_rate_per_sqft}</td>
                    <td>{allprojects.property_total_sqft}</td>
                    <td>{allprojects.property_current_status}</td>
                    <td>{allprojects.property_available_for_agent}</td>
                    <td>{allprojects.property_available_for_customers}</td>
                    {/* <td>{allprojects.property_status_text}</td> */}
                    <td>{allprojects.property_created_at}</td>
                    <td>
                    <Link to={{pathname:'/add-new-project',
                        pfid:{
                            pfid:allprojects.property_guid
                            }
                        }} className="btn" style={{paddingLeft:"2px"}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    </td>
                    <td>
                        <Link to={`/project-details?property_guid=${allprojects.property_guid}`}
                            className="btn bgblue white width100 fontweight bgclr " style={{paddingLeft:"5px",backgroundColor:"blue"}}>
                            Details
                        </Link>
                    </td>
                    <td>
                        <CButton  className="btn" onClick={()=> ProjectDelete(index,allprojects.property_guid)}>
                            <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"20px",color:"red"}}></i>
                        </CButton>
                    </td>
                </tr>
            ))}
                
        </tbody>
    </table>
    </div>
    </div>
</div>
</>
)
}
export default ProjectsList;