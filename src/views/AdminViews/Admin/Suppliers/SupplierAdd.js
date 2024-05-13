import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const AddNewSupplier = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    let history = useHistory();

    const [SupplierInput, setSupplierInput] = useState({
        supplier_id: "",
        supplier_name: "",
        supplier_mobile_no: "",
        supplier_address: "",
        supplier_email_address: "",
        supplier_gstn: "",
        supplier_code: ""
    });

    const {
        supplier_id,
        supplier_name,
        supplier_mobile_no,
        supplier_address,
        supplier_email_address,
        supplier_gstn,
        supplier_code
    } = SupplierInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setSupplierInput({ ...SupplierInput, [e.target.name]: e.target.value });
    }

    const OnSubmitSupplier = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (supplier_id === "") {
            await axios.post(process.env.REACT_APP_API + "SupplierAdd", {
                "supplier_name": supplier_name,
                "supplier_mobile_no": supplier_mobile_no,
                "supplier_address": supplier_address,
                "supplier_email_address": supplier_email_address,
                "supplier_gstn": supplier_gstn,
                "supplier_code": supplier_code
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/supplier-list`);
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        }
        else {
            await axios.post(process.env.REACT_APP_API + "SupplierUpdate", {
                "supplier_id": supplier_id,
                "supplier_name": supplier_name,
                "supplier_mobile_no": supplier_mobile_no,
                "supplier_address": supplier_address,
                "supplier_email_address": supplier_email_address,
                "supplier_gstn": supplier_gstn,
                "supplier_code": supplier_code
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/supplier-list`);
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        }
    }

    const LoadSupplierDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["supplier_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "SupplierDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    if (response.data.supplier_details !== null) {
                        setSupplierInput(response.data.supplier_details)
                    }
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    useEffect(() => {
        LoadSupplierDetails();
    }, []);

    return (
        <>
        {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_SUPPLIER) ?
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                {props.location.pfid != null ? <h4>Update Supplier</h4>
                                    :
                                    <h4> Add New Supplier</h4>
                                }
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitSupplier(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Organization/Supplier Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Organization/Supplier Name' required="required"
                                                    name='supplier_name'
                                                    value={supplier_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Supplier Mobile No</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Supplier Mobile No' required="required"
                                                    name='supplier_mobile_no'
                                                    value={supplier_mobile_no}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Supplier Email Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Supplier Email Address' required="required"
                                                    name='supplier_email_address'
                                                    value={supplier_email_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Supplier Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Supplier Address' required="required"
                                                    name='supplier_address'
                                                    value={supplier_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Supplier GSTN</CLabel>
                                                <CInput type='text' placeholder='Enter Supplier GSTN'
                                                    name='supplier_gstn'
                                                    value={supplier_gstn}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>


                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Supplier Code</CLabel>
                                                <CInput type='text' placeholder='Enter Supplier Code'
                                                    name='supplier_code'
                                                    value={supplier_code}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
            :
            <Notification />
    }
        </>
    )
}
export default AddNewSupplier