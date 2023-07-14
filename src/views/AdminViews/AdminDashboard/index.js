import React, { useState, useEffect, lazy } from 'react'
import { Link } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';

const AdminDashboard = () => {

  const [DasboardCount, setDasboardCount] = useState({});
  const LoadDashBoardCount = async () => {
    var list = {};
    await axios.post(process.env.REACT_APP_API + "Dashboard", list).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setDasboardCount({
          "member_application": response.data.member_application,
          "customer_application": response.data.customer_application,
          "user_application": response.data.user_application,
          "whatsapp_application": response.data.whatsapp_application
        })
      }
    })
  }

  useEffect(() => {
    LoadDashBoardCount();
  }, []);

  return (
    <>
      <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
        <h3>Dashboard</h3>
        <hr className="bgcyan" style={{ height: "2px" }} />
        <CRow className="ml-1 mr-1" >

          <CCol sm="6" lg="3">

            <CCard style={{ height: "170px" }} className="bgyellow">
              <CCardBody>
                <CRow className="justify-content-center">
                  <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
                    <i style={{ color: "white", fontSize: "30px" }} className=" fa fa-user-plus" aria-hidden="true"
                    ></i>
                  </CCol>
                  <CCol xs="6" sm="6" lg="6" md="6">
                    <p style={{ fontSize: "40px", color: "white" }}>{DasboardCount.user_application }</p>

                  </CCol>
                </CRow>
                <Link to='/userlist' className="btn  width100"
                  style={{ paddingLeft: "2px", marginTop: "10px" }}
                >
                  <h4 style={{ color: "white" }}>Users</h4>
                </Link>

              </CCardBody>
            </CCard>
          </CCol>

          <CCol sm="6" lg="3">

            <CCard style={{ height: "170px" }} color="gradient-info">
              <CCardBody>
                <CRow className="justify-content-center">
                  <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
                    <i style={{ color: "white", fontSize: "30px" }} className="fa fa-users" aria-hidden="true"
                    ></i>
                  </CCol>
                  <CCol xs="6" sm="6" lg="6" md="6">
                    <p style={{ fontSize: "40px", color: "white", paddingLeft: "10px" }}>{DasboardCount.member_application }</p>

                    {/* <p style={{fontSize:"40px",color:"white"}}>8</p>  */}
                  </CCol>
                </CRow>
                <Link to='/memberlist' className="btn  width100"
                  style={{ paddingLeft: "2px", marginTop: "10px" }}
                >
                  <h4 style={{ color: "white" }}>Members</h4>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol sm="6" lg="3">

            <CCard style={{ height: "170px" }} className="bggreen">
              <CCardBody>
                <CRow className="justify-content-center">
                  <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
                    <i style={{ color: "white", fontSize: "30px" }} className=" fa fa-user-plus" aria-hidden="true"
                    ></i>
                  </CCol>
                  <CCol xs="6" sm="6" lg="6" md="6">
                    <p style={{ fontSize: "40px", color: "white" }}>{DasboardCount.customer_application}</p>

                  </CCol>
                </CRow>

                <Link
                  to={`/customerlist`}

                  className="btn  width100"
                  style={{ paddingLeft: "2px", marginTop: "10px" }}
                >
                  <h4 style={{ color: "white" }}>Customer</h4>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol sm="6" lg="3">

            <CCard style={{ height: "170px" }} color="gradient-primary">
              <CCardBody>
                <CRow className="justify-content-center">
                  <CCol xs="2" sm="2" lg="2" md="2" className="mt-3">
                    <i style={{ color: "white", fontSize: "30px" }} className="fa fa-address-card" aria-hidden="true"
                    ></i>
                  </CCol>
                  <CCol xs="6" sm="6" lg="6" md="6">
                    <p style={{ fontSize: "40px", color: "white" }}>{DasboardCount.whatsapp_application }</p>

                    {/* <p style={{fontSize:"40px",color:"white"}}>8</p>  */}
                  </CCol>
                </CRow>
                <Link
                  to={``}
                  className="btn  width100"
                  style={{ paddingLeft: "2px", marginTop: "10px" }}
                >
                  <h4 style={{ color: "white" }}>Marketing</h4>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>


        </CRow>
      </div>
    </>
  )
}

export default AdminDashboard
