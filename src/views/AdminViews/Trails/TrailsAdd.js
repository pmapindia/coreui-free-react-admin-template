import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewTrails = (props) => {
    return (
        <>
            <div style={{ paddingRight: "40px", paddingLeft: "40px", paddingTop: "40px" }}>
                <h4>Add New Trails</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />

                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Customer Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Customer Name'
                            // name="member_name" value={member_name}
                            // onChange={(e) => OnInputChange(e)} 
                            />
                        </CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Phone No</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Phone No'
                            // name="member_name" value={member_name}
                            // onChange={(e) => OnInputChange(e)} 
                            />
                        </CCol>
    
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Assigned Trainer</CLabel><span className="red">*</span>
                            <CSelect>
                                <option>Select Trainer</option>
                            </CSelect>
                        </CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Duration of Trail</CLabel><span className="red">*</span>
                            <CSelect>
                                <option>Select Duration</option>
                                <option>1 Day</option>
                                <option>2 Days</option>
                                <option>3 Days</option>
                                <option>4 Days</option>
                                <option>5 Days</option>
                                <option>6 Days</option>
                                <option>7 Days</option>
                            </CSelect>
                        </CCol>
                    </CRow>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <div className="bgcyan mb-3" style={{ borderRadius: "5px" }}>
                                <CButton type="submit" 
                                // disabled={disablebutton} 
                                style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </>
    )

}
export default AddNewTrails;