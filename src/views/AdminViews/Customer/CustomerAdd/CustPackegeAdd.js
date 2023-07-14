import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewCustPackage = (props) => {
    return (
        <>
            <CForm>
                <CRow>
                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Select Customer Package</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Package</option>
                        </CSelect>
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Packagen Price</CLabel><span className="red">*</span>
                        <CInput type='text' placeholder='Enter Packagen Price'
                        />
                    </CCol>
                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Bill Date</CLabel><span className="red">*</span>
                        <CInput type='date' placeholder='Bill Date'
                        />
                    </CCol>
                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Activation Date</CLabel><span className="red">*</span>
                        <CInput type='date' placeholder='Activation Date'
                        />
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Select Batch</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Batch</option>
                        </CSelect>
                    </CCol>

                    <CCol xs="12" sm="2" md="2" lg="2">
                        <CLabel>In Time</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Time</option>
                            <option>06:00 am</option>
                            <option>06:15 am</option>
                            <option>06:30 am</option>
                            <option>06:45 am</option>
                            <option>07:00 am</option>
                            <option>07:15 am</option>
                            <option>07:30 am</option>
                            <option>07:45 am</option>
                            <option>08:00 am</option>
                            <option>08:15 am</option>
                            <option>08:30 am</option>
                            <option>08:45 am</option>
                            <option>09:00 am</option>
                            <option>09:15 am</option>
                            <option>09:30 am</option>
                            <option>09:45 am</option>
                            <option>10:00 am</option>
                            <option>10:15 am</option>
                            <option>10:30 am</option>
                            <option>10:45 am</option>
                            <option>11:00 am</option>
                            <option>11:15 am</option>
                            <option>11:30 am</option>
                            <option>11:45 am</option>
                            <option>12:00 pm</option>
                            <option>12:15 pm</option>
                            <option>12:30 pm</option>
                            <option>12:45 pm</option>
                            <option>01:00 pm</option>
                            <option>01:15 pm</option>
                            <option>01:30 pm</option>
                            <option>01:45 pm</option>
                            <option>02:00 pm</option>
                            <option>02:15 pm</option>
                            <option>02:30 pm</option>
                            <option>02:45 pm</option>
                            <option>03:00 pm</option>
                            <option>03:15 pm</option>
                            <option>03:30 pm</option>
                            <option>03:45 pm</option>
                            <option>04:00 pm</option>
                            <option>04:15 pm</option>
                            <option>04:30 pm</option>
                            <option>04:45 pm</option>
                            <option>05:00 pm</option>
                            <option>05:15 pm</option>
                            <option>05:30 pm</option>
                            <option>05:45 pm</option>
                            <option>06:00 pm</option>
                            <option>06:15 pm</option>
                            <option>06:30 pm</option>
                            <option>06:45 pm</option>
                            <option>07:00 pm</option>
                            <option>07:15 pm</option>
                            <option>07:30 pm</option>
                            <option>07:45 pm</option>
                            <option>08:00 pm</option>
                            <option>08:15 pm</option>
                            <option>08:30 pm</option>
                            <option>08:45 pm</option>
                            <option>09:00 pm</option>
                            <option>09:15 pm</option>
                            <option>09:30 pm</option>
                            <option>09:45 pm</option>
                            <option>10:00 pm</option>
                        </CSelect>
                    </CCol>

                    <CCol xs="12" sm="2" md="2" lg="2">
                        <CLabel>Out Time</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Time</option>
                            <option>06:00 am</option>
                            <option>06:15 am</option>
                            <option>06:30 am</option>
                            <option>06:45 am</option>
                            <option>07:00 am</option>
                            <option>07:15 am</option>
                            <option>07:30 am</option>
                            <option>07:45 am</option>
                            <option>08:00 am</option>
                            <option>08:15 am</option>
                            <option>08:30 am</option>
                            <option>08:45 am</option>
                            <option>09:00 am</option>
                            <option>09:15 am</option>
                            <option>09:30 am</option>
                            <option>09:45 am</option>
                            <option>10:00 am</option>
                            <option>10:15 am</option>
                            <option>10:30 am</option>
                            <option>10:45 am</option>
                            <option>11:00 am</option>
                            <option>11:15 am</option>
                            <option>11:30 am</option>
                            <option>11:45 am</option>
                            <option>12:00 pm</option>
                            <option>12:15 pm</option>
                            <option>12:30 pm</option>
                            <option>12:45 pm</option>
                            <option>01:00 pm</option>
                            <option>01:15 pm</option>
                            <option>01:30 pm</option>
                            <option>01:45 pm</option>
                            <option>02:00 pm</option>
                            <option>02:15 pm</option>
                            <option>02:30 pm</option>
                            <option>02:45 pm</option>
                            <option>03:00 pm</option>
                            <option>03:15 pm</option>
                            <option>03:30 pm</option>
                            <option>03:45 pm</option>
                            <option>04:00 pm</option>
                            <option>04:15 pm</option>
                            <option>04:30 pm</option>
                            <option>04:45 pm</option>
                            <option>05:00 pm</option>
                            <option>05:15 pm</option>
                            <option>05:30 pm</option>
                            <option>05:45 pm</option>
                            <option>06:00 pm</option>
                            <option>06:15 pm</option>
                            <option>06:30 pm</option>
                            <option>06:45 pm</option>
                            <option>07:00 pm</option>
                            <option>07:15 pm</option>
                            <option>07:30 pm</option>
                            <option>07:45 pm</option>
                            <option>08:00 pm</option>
                            <option>08:15 pm</option>
                            <option>08:30 pm</option>
                            <option>08:45 pm</option>
                            <option>09:00 pm</option>
                            <option>09:15 pm</option>
                            <option>09:30 pm</option>
                            <option>09:45 pm</option>
                            <option>10:00 pm</option>
                        </CSelect>
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
        </>
    )
}
export default AddNewCustPackage;