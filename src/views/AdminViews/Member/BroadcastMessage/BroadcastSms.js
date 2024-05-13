import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup, CTextarea
} from '@coreui/react'
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BroadcastSms = (props) => {

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton2, setDisableButton2] = useState(false)

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const OnSubmitSMSBulk = async (e) => {
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
                            <CForm onSubmit={(e) => OnSubmitSMSBulk(e)}>
                                <CRow className=''>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CFormGroup>
                                            <CLabel>Message</CLabel><span className="red">*</span>
                                            <CTextarea type='text' rows={3} placeholder='Enter Message'
                                            ></CTextarea>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow className='mt-3'>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="bggreen mb-3" style={{ borderRadius: "5px" }}>
                                            <CButton type="submit" disabled={disablebutton2} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >SMS Now</CButton>
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
export default BroadcastSms