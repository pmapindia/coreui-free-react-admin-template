import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddInventory = (props) => {
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Add Inventory</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />

                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Item Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Item Name' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Purchase Date</CLabel><span className="red">*</span>
                            <CInput type='date' placeholder='Enter Purchase Date' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Price</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Price' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Tax Amount</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Tax Amount' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Quantity</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Quantity' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Invoice Number</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Invoice Number' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Warranty/Service</CLabel><span className="red">*</span>
                            <CSelect>
                                <option>Select</option>
                                <option>1 Year</option>
                                <option>2 Years</option>
                                <option>3 Years</option>
                                <option>4 Years</option>
                                <option>5 Years</option>
                                <option>6 Years</option>
                                <option>7 Years</option>
                                <option>8 Years</option>
                                <option>9 Years</option>
                                <option>10 Years</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Upload Original Bill(pdf/image)</CLabel><span className="red">*</span>
                            <CInput type='file' placeholder='Enter Invoice Number' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                            <CButton className="bgcyan width100 white mt-2">Upload Document</CButton>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Person Responsible</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Person Responsible' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Phone Number</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Phone Number' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Seller Name</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Seller Name' required="required"
                            />
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>GST Number</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter GST Number' required="required"
                            />
                        </CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Maintenance Time</CLabel><span className="red">*</span>
                            <CSelect>
                                <option>Select</option>
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
                                <option>1 Year</option>
                                <option>2 Years</option>
                                <option>3 Years</option>
                                <option>4 Years</option>
                                <option>5 Years</option>
                                <option>6 Years</option>
                                <option>7 Years</option>
                                <option>8 Years</option>
                                <option>9 Years</option>
                                <option>10 Years</option>
                            </CSelect>
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Remarks</CLabel><span className="red">*</span>
                            <CTextarea type='time' rows={3} placeholder='Enter Remarks' required="required"
                            />
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
            </div>
        </>
    )
}
export default AddInventory;