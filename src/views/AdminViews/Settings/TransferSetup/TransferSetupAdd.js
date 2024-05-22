import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';
import { Link } from 'react-router-dom';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const TranferSetup = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [TransferSetup, setTransferSetup] = useState({
        transfer_setup_id: "",
        transfer_setup_amount: "",
        logged_in_user_id: ""
    });

    const {
        transfer_setup_id,
        transfer_setup_amount,
        logged_in_user_id
    } = TransferSetup;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTransferSetup({ ...TransferSetup, [e.target.name]: e.target.value });
    }

    const OnSubmitSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (transfer_setup_id === "") {
            await axios.post(process.env.REACT_APP_API + "SettingsTransferSetupAdd", {
                "transfer_setup_amount": transfer_setup_amount,
                "logged_in_user_id": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push('/trans-setup-list');
                    //window.location.reload(true);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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
        } else {
            await axios.post(process.env.REACT_APP_API + "SettingsTransferSetupUpdate", {
                "transfer_setup_id": transfer_setup_id,
                "transfer_setup_amount": transfer_setup_amount,
                "logged_in_user_id": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push('/trans-setup-list');
                    //window.location.reload(true);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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

    const LoadSetupDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["transfer_setup_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "SettingsTransferSetupDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    if (response.data.transfer_setup_details !== null) {
                        setTransferSetup(response.data.transfer_setup_details);
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
        LoadSetupDetails();
    }, []);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Transfer Setup</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitSetup(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Amount</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Amount' required="required"
                                                    name='transfer_setup_amount'
                                                    value={transfer_setup_amount}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} disabled={disablebutton}>Save</CButton>
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
        </>
    )
}
export default TranferSetup;