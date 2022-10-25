import React, { useState,useEffect,lazy } from 'react'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CWidgetDropdown,CSelect,CLabel,CFormGroup,CBadge,CButton,CButtonGroup,CCard,CCardBody,CCardFooter,CCardHeader,CCol,CProgress,CRow,
CCallout} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useCookies} from 'react-cookie';
import 'font-awesome/css/font-awesome.min.css';
import '../../../scss/_custom.scss';

const AdminDashboard = () => {

  const[cookies,setCookies,removeCookie]=useCookies(['admin']);
  const[tabledisable,setTableDisable]=useState(false);
  
  const[admindashboard,setAdminDashboard]=useState({});

  const AdminDashboard=async()=>{
    var list={};
    list["user_guid"]=cookies.user_guid;
      await axios.post(process.env.REACT_APP_API+"AdminDashboard",list).then(response=>{
        console.log(response);
          if(response.data.is_success){  
            if(response.data.total_new_agents!==0 || response.data.total_advance_pending_approval!==0 || response.data.total_active_agents!==0 || response.data.total_blocked_agents!==0 || response.data.total_projects!==0 || response.data.total_visitors!==0)
            {       
            setTableDisable(true);
            }
            else{
              setTableDisable(false);
            }
           
            setAdminDashboard({...admindashboard,
              ["total_new_agents"]:response.data.total_new_agents,
              ["total_advance_pending_approval"]:response.data.total_advance_pending_approval,
              ["total_active_agents"]:response.data.total_active_agents,
              ["total_blocked_agents"]:response.data.total_blocked_agents,
              ["total_projects"]:response.data.total_projects,
              ["total_visitors"]:response.data.total_visitors,
            });
          }     
    }).catch(error=>{
      console.log(error);
    })
  } 

  useEffect(() => {
    AdminDashboard();
  }, []);

 
return (
  <>
    <div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
      <CRow>
        <CCol xs="12" sm="4" md="4" lg="4">
          <h3>Dashboard</h3>
        </CCol>      
      </CRow>

      <hr color="gradient-primary" style={{height:"2px"}}/>   
      
      
      {
        tabledisable?          
          <div>
            <CRow  className="ml-1" align="center">
              <CCol sm="6" lg="3">
                <CCard  style={{height:"150px"}}  color="gradient-info">
                  <CCardBody>
                    <CRow className="justify-content-center">
                      <CCol xs="12" sm="2" lg="2" md="2" className="mt-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px", paddingRight:"0px" }}  className=" fa fa-user-plus" aria-hidden="true"
                      ></i>  
                      </CCol>
                      <CCol xs="6" sm="6" lg="6" md="6">
                        <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_new_agents}</p> 
                      </CCol>
                    </CRow>

                    <h4 style={{color:"white",fontWeight:"bold"}}>New Agents</h4>
                  </CCardBody>
                </CCard>
              </CCol> 

              <CCol sm="6" lg="3">
                <CCard  style={{height:"150px"}}  className="darkpink">
                  <CCardBody>
                    <CRow className="justify-content-center">
                      <CCol xs="2" sm="2" lg="2" md="2" className="mt-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user " aria-hidden="true"
                      ></i> 
                      </CCol>
                      <CCol xs="6" sm="6" lg="6" md="6">
                        <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_advance_pending_approval}</p> 
                      </CCol>
                    </CRow>
                    <h4 style={{color:"white",fontWeight:"bold"}}>Advance Approval</h4>
                  </CCardBody>
                </CCard>
              </CCol>  

              <CCol sm="6" lg="3">
                <CCard  style={{height:"150px"}}  className="purple">
                  <CCardBody>
                    <CRow className="justify-content-center">
                      <CCol xs="2" sm="2" lg="2" md="2" className="mt-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user " aria-hidden="true"
                      ></i>
                      </CCol>
                      <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_active_agents}</p>
                      </CCol>
                    </CRow>
                    <h4 style={{color:"white",fontWeight:"bold"}}>Active Agents</h4>
                  </CCardBody>
                </CCard>
              </CCol>
              
              <CCol sm="6" lg="3">
                <CCard  style={{height:"150px"}}  className="bgcyan">
                  <CCardBody>
                    <CRow className="justify-content-center">
                      <CCol xs="2" sm="2" lg="2" md="2" className="mt-3 ml-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user-times " aria-hidden="true"
                      ></i>
                      </CCol>
                      <CCol xs="6" sm="6" lg="6" md="6">
                        <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_blocked_agents}</p> 
                      </CCol>
                    </CRow>
                    <h4 style={{color:"white",fontWeight:"bold"}}>Blocked Agent</h4>
                  </CCardBody>
                </CCard>
              </CCol> 
      
            <CCol sm="6" lg="3">
              <CCard  style={{height:"150px"}}  color="gradient-warning">
                <CCardBody>
                  <CRow className="justify-content-center">
                    <CCol xs="2" sm="2" lg="2" md="2" className="mt-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-bars  " aria-hidden="true"
                      ></i>  
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_projects}</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white",fontWeight:"bold"}}>Projects</h4>
                </CCardBody>
              </CCard>
            </CCol> 

            <CCol sm="6" lg="3">
              <CCard  style={{height:"150px"}}  color="gradient-success">
                <CCardBody>
                  <CRow className="justify-content-center">
                    <CCol xs="2" sm="2" lg="2" md="2" className="mt-3" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-users  " aria-hidden="true"
                      ></i>
                    </CCol>
                      <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>{admindashboard.total_visitors}</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white",fontWeight:"bold"}}>Visitors</h4>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>:
        <div>
          <CRow className="ml-1" >
          <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  color="gradient-info">
                <CCardBody>
                  <CRow className="justify-content-center">
                    <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px", paddingRight:"0px" }}  className=" fa fa-user-plus" aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>New Agents</h4>
                </CCardBody>
              </CCard>
            </CCol>  

            <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  className="darkpink">
                <CCardBody>
                  <CRow className="justify-content-center">
                  <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user " aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Advance Approval</h4>
                </CCardBody>
              </CCard>
            </CCol> 

            <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  className="purple">
                <CCardBody>
                  <CRow className="justify-content-center">
                  <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"30%",}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user " aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Active Agents</h4>
                </CCardBody>
              </CCard>
            </CCol> 
     
     
            <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  className="bgcyan">
                <CCardBody>
                  <CRow className="justify-content-center">
                  <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"30%"}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-user-times " aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white",float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Blocked Agents</h4>
                </CCardBody>
              </CCard>
            </CCol> 

            <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  color="gradient-warning">
                <CCardBody>
                  <CRow className="justify-content-center">
                  <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"35%"}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-bars  " aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white", float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Projects</h4>
                </CCardBody>
              </CCard>
            </CCol> 

            <CCol xs="12" sm="3" lg="3" md="3" align='center'>
              <CCard  style={{height:"150px"}}  color="gradient-success">
                <CCardBody>
                  <CRow className="justify-content-center">
                  <CCol xs="1" sm="0" lg="0" md="0" className="mt-3 ml-0" style={{float:"right",paddingLeft:"35%"}}>
                      <i style={{color:"white",fontSize:"30px"}}  className=" fa fa-users  " aria-hidden="true"
                      ></i> 
                    </CCol>
                    <CCol xs="6" sm="6" lg="6" md="6">
                      <p style={{fontSize:"40px",color:"white", float:"left", paddingLeft:"10px"}}>0</p> 
                    </CCol>
                  </CRow>
                  <h4 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Visitors</h4>
                </CCardBody>
              </CCard>
            </CCol>  
          </CRow>
        </div>
      }
    </div>      
  </>
  )
}
export default AdminDashboard;
