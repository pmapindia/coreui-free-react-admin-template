import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import AddNewPackage from './CreatePackege';

const AddNewPackageCategory = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Add New Package Category </h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Package Category Name</CLabel><span className="red">*</span>
                                            <CInput type='text' placeholder='Enter Package Category Name' required="required"
                                            />
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CForm>
                                <hr className="bgcolor" style={{ height: "1px" }} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Package Category List</h4>
                                <hr className="bgcolor" style={{ height: "1px" }} />
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>SL No</th>
                                                        <th>Package Category Name</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div >
        </>
    )
}
export default AddNewPackageCategory;