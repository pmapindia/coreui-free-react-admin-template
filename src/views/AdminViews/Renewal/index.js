import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody, CCardHeader } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewRenewal = (props) => {

    const [RenewalInput, setRenewalInput] = useState({
        payment_mode: "",
        payment_type: ""
    });

    const { payment_mode, payment_type } = RenewalInput;

    const [DisType, setDisType] = useState(false);
    const [DisMode, setDisMode] = useState(false);

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setRenewalInput({ ...RenewalInput, [e.target.name]: e.target.value });

        if (e.target.name === "payment_type") {
            if (e.target.value === "One Time Payment") {
                setDisType(false);
            }
            else {
                setDisType(true);
            }
        }

        if (e.target.name === "payment_mode") {
            if (e.target.value === "UPI") {
                setDisMode(true);
            }
            else {
                setDisMode(false);
            }
        }
    }
    return (
        <>
            <div style={{ paddingRight: "40px", paddingLeft: "40px", paddingTop: "40px" }}>
                <h4>Add New Renewal</h4>
                <hr className="bgcyan" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CCard>
                                <CCardBody>
                                    <h6 className='text-center'>Customer Information</h6>
                                    <div style={{ marginLeft: "120px", borderRadius: "100%" }}>
                                        <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH_FOR_AADHAAR + ""}
                                            style={{ width: "70%", height: "100px", marginTop: "", float: "", paddingRight: "" }}
                                        />
                                    </div>
                                    <h5 className='text-center'>Customer Name</h5>
                                    <h6 className='text-center'>ID: 00001</h6>
                                    <h6 className='text-center'>Expairy Date: 01-07-2023</h6>
                                    <h6 className='text-center'><i class="fa fa-envelope-o bggreen" aria-hidden="true"></i> &nbsp; abc@gmail.com</h6>
                                    <h6 className='text-center'><i class="fa fa-phone bggreen" aria-hidden="true"></i> &nbsp; 1234567890</h6>
                                    <h5 className='text-center'>Available Additional Amount: 0.00</h5>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol xs="12" sm="8" md="8" lg="8">
                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Customer Name</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Customer Name'
                                    // name="member_name" value={member_name}
                                    // onChange={(e) => OnInputChange(e)} 
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Select Membership Package</CLabel><span className="red">*</span>
                                    <CSelect>
                                        <option>Select Package</option>
                                    </CSelect>
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Select Payment Mode</CLabel><span className="red">*</span>
                                    <CSelect name="payment_mode" custom onChange={(e) => OnInputChange(e)}>
                                        <option>Select Payment Mode</option>
                                        <option value="Cash" selected={payment_mode === "Cash"}>Cash</option>
                                        <option value="Online" selected={payment_mode === "Online"}>Online</option>
                                        <option value="UPI" selected={payment_mode === "UPI"}>UPI</option>
                                        <option value="Cheque" selected={payment_mode === "Cheque"}>Cheque</option>
                                    </CSelect>
                                </CCol>

                                {DisMode ?
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <CLabel>Transcaction Number</CLabel><span className="red">*</span>
                                        <CInput type='text' placeholder='Enter Transcaction Number'
                                        />
                                    </CCol>

                                    : null}

                                {DisMode ?
                                    <CCol xs="12" sm="6" md="6" lg="6" className="mt-3">
                                        <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                            Upload Transcaction Image
                                            <CInput type="file" className="hide-file"
                                            // name="cust_aadhaar_card"
                                            // onChange={(e) => onChangePictureAadhaar(e)}
                                            ></CInput>
                                        </div>
                                    </CCol>

                                    : null}

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Activation Date</CLabel><span className="red">*</span>
                                    <CInput type='date' placeholder='Enter Customer Name'

                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Bill Date</CLabel><span className="red">*</span>
                                    <CInput type='date' placeholder='Enter Customer Name'
                                    />
                                </CCol>

                                <CCol xs="12" sm="3" md="3" lg="3">
                                    <CLabel>Discount Type</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Type</option>
                                        <option>₹</option>
                                        <option>%</option>
                                    </CSelect>
                                </CCol>

                                <CCol xs="12" sm="3" md="3" lg="3">
                                    <CLabel>Discount Value</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Value'
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Tax</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Tax</option>
                                    </CSelect>
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Total Amount</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Total Amount'
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Payment Type</CLabel><span className="red">*</span>
                                    <CSelect name="payment_type" custom onChange={(e) => OnInputChange(e)}
                                    >
                                        <option>Select Payment Type</option>
                                        <option value="One Time Payment" selected={payment_type === "One Time Payment"}>One Time Payment</option>
                                        <option value="Part Payment" selected={payment_type === "Part Payment"}>Part Payment</option>
                                    </CSelect>
                                </CCol>

                                {DisType ?
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <CLabel>Down Payment</CLabel><span className="red">*</span>
                                        <CInput type='text' placeholder='Enter Down Payment'
                                        />
                                    </CCol>

                                    : null}

                                {DisType ?
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <CLabel>Balance Amount</CLabel><span className="red">*</span>
                                        <CInput type='text' placeholder='Enter Balance Amount'
                                        />
                                    </CCol>

                                    : null}

                                {DisType ?
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <CLabel>Due Date</CLabel><span className="red">*</span>
                                        <CInput type='date' placeholder='Enter Due Date'
                                        />
                                    </CCol>

                                    : null}

                                {DisType ?
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <CLabel>Installment Amount</CLabel><span className="red">*</span>
                                        <CInput type='text' placeholder='Enter Installment Amount'
                                        />
                                    </CCol>

                                    : null}
                            </CRow>
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
export default AddNewRenewal;