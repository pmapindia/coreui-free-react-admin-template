import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const Tax = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add Tax</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Tax Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Tax Name' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Tax Percentage</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Tax Percentage' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4" className='mt-3'>
                            <div className="bgcyan mt-3" style={{ borderRadius: "5px" }}>
                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>
                        </CCol>
                    </CRow>
                    <hr className="bgcyan mb-3" style={{ height: "1px" }} />

                    <h4 className='mt-3'>Tax List</h4>

                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <div className="table-responsive  my-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Tax Name</th>
                                            <th>Tax Percentage</th>
                                            <th>Details</th>
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
export default Tax;