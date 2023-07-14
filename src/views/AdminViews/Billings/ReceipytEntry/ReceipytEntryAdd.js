import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const RecieptEntryAdd = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add Reciept-Entry</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />

                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Maintenance Type</CLabel><span className="red">*</span>
                            <Select></Select>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Bill No</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Bill No' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Date of Bill</CLabel><span className="red">*</span>
                            <CInput type='date' placeholder='Enter Date of Bill'
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Cost</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Cost'
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Purpose</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Purpose'
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Received By</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Received By'
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Contact Number</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Contact Number'
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                            <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                Upload Bill
                                <CInput type="file" className="hide-file mt-1"
                                // name="cust_aadhaar_card"
                                // onChange={(e) => onChangePictureAadhaar(e)}
                                ></CInput>
                            </div>
                        </CCol>
                    </CRow>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <div className="bgcyan mb-3" style={{ borderRadius: "5px" }}>
                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>

                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </>
    )

}
export default RecieptEntryAdd;