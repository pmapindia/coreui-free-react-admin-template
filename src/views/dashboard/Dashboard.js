import React, { useState,useEffect,lazy } from 'react'

import {
  CWidgetDropdown,
CSelect,
CLabel,
CFormGroup,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';


import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))





const Dashboard = () => {


  const[branchdropdowns,setBranchDropDowns]=useState([]);

  useEffect(()=>{
    // setUsers({...users,["admin_guid"]:adminguid,["admin_password"]:adminpassword,["user_type"]:usertype});
    LoadDropdown();
  
   
  },[]);
  
  const LoadDropdown=async()=>{
  
  await axios.post(process.env.REACT_APP_API+"GetDropDownList",{dropdown_list:[
   {"dropdown_type":"DD_BRANCHES","dropdown_filter":""},
  
  ]}).then(response=>{
      console.log(response);
      if(response.data.drop_down_list!=null){
        for(let d=0;d<response.data.drop_down_list.length;d++){
          var dd_list=response.data.drop_down_list[d];
          console.log("dd_list"+dd_list);
          if(dd_list.each_drop_down_list!=null && dd_list.dropdown_type==="DD_BRANCHES"){
           // for(let sc=0;sc<dd_list.each_drop_down_list.length;sc++){
           //   setSubCategoryDropdowns();
  
           // }
           setBranchDropDowns(dd_list.each_drop_down_list);
  
          }
         
        }
     //  data.drop_down_list[0].each_drop_down_list
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  
  const[admindashboard,setAdminDashboard]=useState({
    total_new_route_card_created_today:"",
    total_route_card_pending:"",
    total_completed_route_card_today:""
  });
  const{ total_new_route_card_created_today,
    total_route_card_pending,
  total_completed_route_card_today}=admindashboard;

  const[tabledisable,setTableDisable]=useState(false);
  
  const OnInputChange=(e)=>{
   console.log(e.target.value);
   AdminDashboard(e.target.value);
  
  }
  const AdminDashboard=async(branch_guid)=>{
   
    var list={};
    list["branch_guid"]=branch_guid;
      await axios.post(process.env.REACT_APP_API+"AdminDashboard",list).then(response=>{
        console.log(response);
        if(response.data.is_success){
            // setBankDetails(response.data.company_bank_details);
            setTableDisable(true);
           
            setAdminDashboard({...admindashboard,
              ["total_new_route_card_created_today"]:response.data.total_new_route_card_created_today,
              ["total_route_card_pending"]:response.data.total_route_card_pending,
              ["total_completed_route_card_today"]:response.data.total_completed_route_card_today,
  
            });
            }
      
      }).catch(error=>{
        console.log(error);
      })
    }






  return (
    <>
      {/* <WidgetsDropdown /> */}
      <h3>Dashboard</h3>
      <hr color="gradient-primary" style={{height:"2px"}}/>
      <CRow>
    
    
         {/* <CCol xs="12" sm="8" md="8" lg="8"></CCol>
        <CCol xs="12" sm="4" md="4" lg="4">
    <CFormGroup>
              <CLabel>Select Branch</CLabel>
              <CSelect name="branch_guid" 
               onChange={(e)=>OnInputChange(e)}

              custom>
                <option >Select Branch</option>
                {branchdropdowns.map((branchdropdown,index) => (

              <option key={index+1} value={branchdropdown.dd_id}>{branchdropdown.dd_name}</option>

              ) )} 
              </CSelect>

   </CFormGroup>
    </CCol> */}
   

{/* 
    {
           tabledisable?          


 
<div>
              
               <CRow  className="ml-1">
               
    
    <CCol sm="6" lg="4">
     <CCard  style={{height:"150px"}}  color="gradient-info">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-caret-square-o-down  " aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>{admindashboard.total_new_route_card_created_today}</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Today's Created Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol>  <CCol sm="6" lg="4">
     <CCard  style={{height:"150px"}}  color="gradient-warning">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-share-alt" aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>{admindashboard.total_route_card_pending}</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Pending Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol>  <CCol sm="6" lg="4">
     <CCard  style={{height:"150px"}}  color="gradient-success">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-play" aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>{admindashboard.total_completed_route_card_today}</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Today's Completed Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol> 

  
               </CRow>

                   

</div>:
<div>
<CRow className="ml-1" >

    
    <CCol sm="6" lg="4" >
     <CCard  style={{height:"150px"}}  color="gradient-info">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-caret-square-o-down  " aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>0</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Today's Created Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol>  <CCol sm="6" lg="4">
     <CCard  style={{height:"150px"}}  color="gradient-warning">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-share-alt" aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>0</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Pending Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol>  <CCol sm="6" lg="4">
     <CCard  style={{height:"150px"}}  color="gradient-success">
     <CCardBody>
       <CRow className="justify-content-center">
         <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
     <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-play" aria-hidden="true"
              ></i> 
              </CCol>
              <CCol xs="6" sm="6" lg="6" md="6">
                <p style={{fontSize:"40px",color:"white"}}>0</p> 
              </CCol>
              </CRow>
       <h4 style={{color:"white"}}>Today's Completed Route Cards</h4>
       </CCardBody>
     </CCard>
    </CCol> 

  
</CRow>
</div>
                           
} */}
   
    </CRow>
        
    </>
  )
}

export default Dashboard
