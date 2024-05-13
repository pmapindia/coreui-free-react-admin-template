import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody, CCardHeader } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddAttendence = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add Attendence</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CCard>
                                <CCardBody>
                                    <h6 className='text-center'>Customer Information</h6>
                                    <div style={{ marginLeft: "120px", borderRadius: "100%" }}>
                                        <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH_FOR_AADHAAR + ""}
                                            style={{ width: "70%", height: "100px", marginTop: "", float: "", paddingRight: "" }}
                                        />
                                    </div>
                                    <h5 className='text-center'>Customer Name</h5>
                                    <h6 className='text-center'>ID: 00001</h6>
                                    <h6 className='text-center'>Expairy Date: 01-07-2023</h6>
                                    <h6 className='text-center'><i class="fa fa-envelope-o bggreen" aria-hidden="true"></i> &nbsp; abc@gmail.com</h6>
                                    <h6 className='text-center'><i class="fa fa-phone bggreen" aria-hidden="true"></i> &nbsp; 1234567890</h6>
                                    <h5 className='text-center'>Available Additional Amount: 0.00</h5>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol xs="12" sm="8" md="8" lg="8">
                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Customer Name</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Customer Name'
                                    // name="member_name" value={member_name}
                                    // onChange={(e) => OnInputChange(e)} 
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Date</CLabel><span className="red">*</span>
                                    <CInput type='date' placeholder='Enter Date'
                                    // name="member_name" value={member_name}
                                    // onChange={(e) => OnInputChange(e)} 
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Time</CLabel><span className="red">*</span>
                                    <CInput type='time' placeholder='Enter Time'
                                    // name="member_name" value={member_name}
                                    // onChange={(e) => OnInputChange(e)} 
                                    />
                                </CCol>
                            </CRow>

                            <CRow className=" mt-5">
                                <CCol xs="12" sm="6" md="6" lg="6" className=" mt-4">
                                    <div className="bgcyan mt-3" style={{ borderRadius: "5px" }}>
                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Make Attendence</CButton>
                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                    </div>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </>
    )
}
export default AddAttendence;