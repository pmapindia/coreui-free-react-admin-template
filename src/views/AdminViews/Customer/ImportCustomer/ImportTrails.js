import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ImportTrails = (props) => {
    return (
        <>
            <CForm >
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <h1 style={{ textAlign: "center" }}><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></h1>
                        <h6 style={{ textAlign: "center" }}>Download Sample Excel sheet(For Uploading Trails)</h6>
                    </CCol>

                    <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        <div className="bgcyan mb-3 white" style={{ borderRadius: "5px" }}>
                            <CButton download target="_self" href={process.env.REACT_APP_MEMBERS_SAMPLE_EXCEL_FILE}
                                style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px", textDecoration: "none" }}>
                                <i class="fa fa-file-excel-o" aria-hidden="true"></i>&nbsp;
                                Download Sample
                            </CButton>
                        </div>
                    </CCol>
                </CRow>
            </CForm>
        </>
    )
}
export default ImportTrails;