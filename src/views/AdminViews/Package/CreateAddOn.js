import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddPackageAddOn = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add New Package Add On</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Add On Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Add On Name' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Staus</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Status</option>
                                <option>ACTIVE</option>
                                <option>INACTIVE</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Price</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Price' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Commission(%)</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Commission(%)' required="required"
                            />
                        </CCol>

                        

                        <CCol xs="12" sm="6" md="6" lg="6">
                            <CLabel>Add On Features</CLabel><span className="red">*</span>
                            <CTextarea type='text' rows={3} placeholder='Enter Add On' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>No of Months</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Month</option>
                                <option>1 Month</option>
                                <option>2 Months</option>
                                <option>3 Months</option>
                                <option>4 Months</option>
                                <option>5 Months</option>
                                <option>6 Months</option>
                                <option>7 Months</option>
                                <option>8 Months</option>
                                <option>9 Months</option>
                                <option>10 Months</option>
                                <option>11 Months</option>
                                <option>12 Months</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>No of Days</CLabel><span className="red">*</span>
                            <CSelect custom>
                                <option>Select Days</option>
                                <option>1 Day</option>
                                <option>2 Days</option>
                                <option>3 Days</option>
                                <option>4 Days</option>
                                <option>5 Days</option>
                                <option>6 Days</option>
                                <option>7 Days</option>
                                <option>8 Days</option>
                                <option>9 Days</option>
                                <option>10 Days</option>
                                <option>11 Day</option>
                                <option>12 Days</option>
                                <option>13 Days</option>
                                <option>14 Days</option>
                                <option>15 Days</option>
                                <option>16 Days</option>
                                <option>17 Days</option>
                                <option>18 Days</option>
                                <option>19 Days</option>
                                <option>20 Days</option>
                                <option>21 Day</option>
                                <option>22 Days</option>
                                <option>23 Days</option>
                                <option>24 Days</option>
                                <option>25 Days</option>
                                <option>26 Days</option>
                                <option>27 Days</option>
                                <option>28 Days</option>
                                <option>29 Days</option>
                                <option>30 Days</option>
                                <option>31 Days</option>
                            </CSelect>
                        </CCol>
                        <CCol xs="12" sm="3" md="3" lg="3">
                            <CLabel>Session Count By Attendence</CLabel><span className="red">*</span>
                            <CInput type='checkbox' placeholder='Enter Session'
                            />
                        </CCol>

                        <CCol xs="12" sm="3" md="3" lg="3">
                            <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                Upload Image
                                <CInput type="file" className="hide-file mt-1"
                                // name="cust_aadhaar_card"
                                // onChange={(e) => onChangePictureAadhaar(e)}
                                ></CInput>
                            </div>
                        </CCol>
                    </CRow>
                    <hr className="bgcyan" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                        <CCol xs="12" sm="3" md="3" lg="3">
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
export default AddPackageAddOn;