import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const CouponAdd = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add Coupon</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />

                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Coupon Code</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Coupon Code' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Select Coupon Type</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Type</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Coupon Value</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Coupon Value' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Coupon Limit No. of Members</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Coupon Limit No. of Members' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Select Coupon Status</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Status</option>
                                <option>Active</option>
                                <option>In-Active</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Apply Coupon for Package</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Package</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Start Date</CLabel><span className="red">*</span>
                            <CInput type='date' placeholder='Enter Start Date' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>End Date</CLabel><span className="red">*</span>
                            <CInput type='date' placeholder='Enter End Date' required="required"
                            />
                        </CCol>

                    </CRow>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <div className="bgcyan " style={{ borderRadius: "5px" }}>
                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>
                        </CCol>
                    </CRow>

                    <hr className="bgcyan mb-3" style={{ height: "1px" }} />

                    <h4 className='mt-3'>Coupon List</h4>

                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <div className="table-responsive  my-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Coupon Code</th>
                                            <th>Coupon Type</th>
                                            <th>Coupon Value</th>
                                            <th>Months</th>
                                            <th>Coupon Used</th>
                                            <th>Coupon Available</th>
                                            <th>Package</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Created By</th>
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
export default CouponAdd;