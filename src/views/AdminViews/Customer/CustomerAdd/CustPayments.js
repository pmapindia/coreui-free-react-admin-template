import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const CustPayment = (props) => {

    const [PaymetInput, setPaymetInput] = useState({
        payment_mode: "",
        payment_type: ""
    });

    const { payment_mode, payment_type } = PaymetInput;

    const [DisType, setDisType] = useState(false);
    const [DisMode, setDisMode] = useState(false);

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setPaymetInput({ ...PaymetInput, [e.target.name]: e.target.value });

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
            <CForm>
                <CRow>
                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Payment Mode</CLabel><span className="red">*</span>
                        <CSelect name="payment_mode" custom onChange={(e) => OnInputChange(e)}
                        >
                            <option>Select Payment Mode</option>
                            <option value="Cash" selected={payment_mode === "Cash"}>Cash</option>
                            <option value="Online" selected={payment_mode === "Online"}>Online</option>
                            <option value="UPI" selected={payment_mode === "UPI"}>UPI</option>
                            <option value="Cheque" selected={payment_mode === "Cheque"}>Cheque</option>
                        </CSelect>
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Payment Type</CLabel><span className="red">*</span>
                        <CSelect name="payment_type" custom onChange={(e) => OnInputChange(e)}
                        >
                            <option>Select Payment Type</option>
                            <option value="One Time Payment" selected={payment_type === "One Time Payment"}>One Time Payment</option>
                            <option value="Part Payment" selected={payment_type === "Part Payment"}>Part Payment</option>
                        </CSelect>
                    </CCol>

                    {DisMode ?
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Transcaction Number</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Transcaction Number'
                            />
                        </CCol>

                        : null}

                    {DisMode ?
                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                        <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                            Upload Transcaction Image
                            <CInput type="file" className="hide-file"
                            // name="cust_aadhaar_card"
                            // onChange={(e) => onChangePictureAadhaar(e)}
                            ></CInput>
                        </div>
                    </CCol>

                        : null}

                    {DisType ?
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Down Payment</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Down Payment'
                            />
                        </CCol>

                        : null}

                    {DisType ?
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Balance Amount</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Balance Amount'
                            />
                        </CCol>

                        : null}

                    {DisType ?
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Due Date</CLabel><span className="red">*</span>
                            <CInput type='date' placeholder='Enter Due Date'
                            />
                        </CCol>

                        : null}

                    {DisType ?
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <CLabel>Installment Amount</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Enter Installment Amount'
                            />
                        </CCol>

                        : null}

                    <CCol xs="12" sm="2" md="2" lg="2">
                        <CLabel>Discount Type</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Type</option>
                            <option>₹</option>
                            <option>%</option>
                        </CSelect>
                    </CCol>
                    <CCol xs="12" sm="2" md="2" lg="2">
                        <CLabel>Discount Value</CLabel><span className="red">*</span>
                        <CInput type='text' placeholder='Enter Value'
                            />
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Wallet Amount</CLabel><span className="red">*</span>
                        <CInput type='text' placeholder='Enter Wallet Amount'
                        />
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Tax</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Tax</option>
                        </CSelect>
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Coupon</CLabel><span className="red">*</span>
                        <CInput type='text' placeholder='Enter Coupon'
                        />
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Total Amount</CLabel><span className="red">*</span>
                        <CInput type='text' placeholder='Enter Total Amount'
                        />
                    </CCol>

                    <CCol xs="12" sm="4" md="4" lg="4">
                        <CLabel>Sale Added by</CLabel><span className="red">*</span>
                        <CSelect custom
                        >
                            <option>Select Added by</option>
                        </CSelect>
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
        </>
    )
}
export default CustPayment;