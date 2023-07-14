import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewBatch = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add New Batch</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Batch Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Batch Name' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                            <div className="bgcyan mt-3" style={{ borderRadius: "5px" }}>
                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>
                        </CCol>
                    </CRow>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <h4>Batch List</h4>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <div className="table-responsive  my-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Batch Name</th>
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
                </CForm>
            </div>
        </>
    )
}
export default AddNewBatch;