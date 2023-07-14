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
import ImportEnquiry from './ImportEnquiry';
import ImportTrails from './ImportTrails';
import UploadEnquiry from './UploadEnquirt';
import UploadTrails from './UploadTrails';

const ImportCustomer = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CForm >
                    <CRow>
                        <CCol xs="12" sm="6" md="6" lg="6">
                            <CCard>
                                <CCardHeader>
                                    <h2 ><i class="fa fa-cog" aria-hidden="true"></i>&nbsp; Download Sample File</h2>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol>
                                            <Tabs>
                                                <TabList>
                                                    <Tab style={{fontWeight:"bold"}}>Customer </Tab>
                                                    <Tab style={{fontWeight:"bold"}}>Enquiry</Tab>
                                                    <Tab style={{fontWeight:"bold"}}>Trails</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <CRow className="mb-3">
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <h1 style={{ textAlign: "center" }}><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></h1>
                                                            <h6 style={{ textAlign: "center" }}>Download Sample Excel sheet(For Uploading Customer)</h6>


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
                                                </TabPanel>
                                                <TabPanel>
                                                    <ImportEnquiry />
                                                </TabPanel>

                                                <TabPanel>
                                                    <ImportTrails />
                                                </TabPanel>
                                            </Tabs>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>

                        <CCol xs="12" sm="6" md="6" lg="6">
                            <CCard>
                                <CCardHeader>
                                    <h2><i class="fa fa-cog" aria-hidden="true"></i>&nbsp; Import Excel Sheet</h2>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol>
                                            <Tabs>
                                                <TabList>
                                                    <Tab style={{fontWeight:"bold"}}>Customer </Tab>
                                                    <Tab style={{fontWeight:"bold"}}>Enquiry</Tab>
                                                    <Tab style={{fontWeight:"bold"}}>Trails</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <CRow className="mb-3">
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <h1 style={{ textAlign: "center" }}><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></h1>
                                                            <h6 style={{ textAlign: "center" }}>Upload Excel sheet for Customer(Format .xls Only)</h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="6" md="6" lg="6">
                                                            <CInput type="file"
                                                                //onChange={(e) => setFile(e)}
                                                                id="exampleFile"
                                                            //ref={emptyfileinputvalue}
                                                            />
                                                        </CCol>
                                                        <CCol xs="12" sm="6" md="6" lg="6">
                                                            <div className="bgcyan mb-3" style={{ borderRadius: "5px" }}>
                                                                <CButton type="submit"  style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >
                                                                <i class="fa fa-file-excel-o" aria-hidden="true"></i>&nbsp; Upload Excel Sheet</CButton>
                                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </TabPanel>
                                                <TabPanel>
                                                    <UploadEnquiry />
                                                </TabPanel>

                                                <TabPanel>
                                                    <UploadTrails />
                                                </TabPanel>
                                            </Tabs>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </>
    )
}
export default ImportCustomer;