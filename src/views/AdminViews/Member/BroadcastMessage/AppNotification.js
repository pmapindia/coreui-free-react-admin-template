import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';

const AppNotification = (props) => {

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton3, setdisablebutton3] = useState(false)

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const OnSubmitAppNotif = async (e) => {
        e.preventDefault();
        // setDisableButton2(true);
        // document.getElementById("img_gif_loading_btn2").style.display = "block";

        alert("Coming Soon");
    }
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                    <CCard style={{ borderRadius: "20px" }}>
                        <CCardBody>
                            <CForm onSubmit={(e) => OnSubmitAppNotif(e)}>
                                <CRow className=''>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CFormGroup>
                                            <CLabel>Subject</CLabel><span className="red">*</span>
                                            <CInput type='text' rows={3} placeholder='Enter Subject'
                                            ></CInput>
                                        </CFormGroup>
                                    </CCol>


                                    <CCol xs="12" sm="7" md="7" lg="7" >
                                        <CFormGroup>
                                            <CLabel>Upload File</CLabel>
                                            <CInput type="file"
                                            // name="media"
                                            // onChange={(e) => onChangeFile(e)}
                                            ></CInput>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="5" md="5" lg="5" className="mt-1">
                                        <CFormGroup>
                                            <CButton type="submit" className="mt-4 bgcolor white" style={{ width: "100%" }}>Upload Documents</CButton>
                                        </CFormGroup>
                                    </CCol>


                                </CRow>
                                <CRow className='mt-3'>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="bggreen mb-3" style={{ borderRadius: "5px" }}>
                                            <CButton type="submit" disabled={disablebutton3} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >App Notification Now</CButton>
                                            <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                        </div>
                                        {warnings.warning && <p className="red">{warnings.warning}</p>}
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default AppNotification