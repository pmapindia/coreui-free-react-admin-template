import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CTextarea, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
import Select from 'react-select';

const EnquiryFollowUpModal = (props) => {
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [errors, setErrors] = useState({});

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };
    const [disablebutton3, setDisableButton3] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [FollowUpInput, setFollowUpInput] = useState({
        enquiry_id: props.enquiry_id,
        enquiry_comments: "",
        enquiry_next_follow_up_date: "",
        enquiry_joining_date: "",
        enquiry_current_status: "",
        loggedin_user_id: ""
    });

    const {
        enquiry_id,
        enquiry_comments,
        enquiry_next_follow_up_date,
        enquiry_joining_date,
        enquiry_current_status,
        loggedin_user_id
    } = FollowUpInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setFollowUpInput({ ...FollowUpInput, [e.target.name]: e.target.value });
    }

    const OnSubmitFollwUp = async (e) => {
        e.preventDefault();
        setDisableButton3(true);
        document.getElementById("img_gif_loading_btn3").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "EnquiryUpdateFollowup", {
            "enquiry_id": enquiry_id,
            "enquiry_comments": enquiry_comments,
            "enquiry_next_follow_up_date": enquiry_next_follow_up_date,
            "enquiry_joining_date": enquiry_joining_date,
            "enquiry_current_status": enquiry_current_status,
            "loggedin_user_id": cookies.user_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            })
    }
    return (
        <CRow>
            <CCol>
            <CButton className=' btn btn-sm bgblue white width100' style={{ fontSize: "13px", }} onClick={() => setPrimary(!primary)}>
                    Follow Up
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>
                        <CModalTitle className=" white mt-2"><h4>Follow Up</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Next Followup Date</CLabel>
                                                    <CInput type='date'
                                                        placeholder='Next Followup Date'
                                                        name='enquiry_next_follow_up_date'
                                                        value={enquiry_next_follow_up_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Joining Date</CLabel>
                                                    <CInput type='date'
                                                        placeholder='Joining Date'
                                                        name='enquiry_joining_date'
                                                        value={enquiry_joining_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Status</CLabel>
                                                    <CSelect name='enquiry_current_status' onChange={(e) => OnInputChange(e)} custom>
                                                        <option>Select Status</option>
                                                        <option selected={enquiry_current_status === "ENQUIRY"} value="ENQUIRY">ENQUIRY</option>
                                                        <option selected={enquiry_current_status === "VISITING"} value="VISITING">VISITING</option>
                                                        <option selected={enquiry_current_status === "TRIAL_BOOKED"} value="TRIAL_BOOKED">TRIAL BOOKED</option>
                                                        <option selected={enquiry_current_status === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                        <option selected={enquiry_current_status === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                        <option selected={enquiry_current_status === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                        <option selected={enquiry_current_status === "NOT_INTERESTED"} value="NOT_INTERESTED">NOT INTERESTED</option>
                                                        {/* <option selected={enquiry_current_status === "JOINED"} value="JOINED">JOINED</option>
                                                        <option selected={enquiry_current_status === "JOINING"} value="JOINING">JOINING</option> */}
                                                        <option selected={enquiry_current_status === "CONVERTED"} value="CONVERTED">CONVERTED</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <CFormGroup>
                                                    <CLabel>Enquiry Comments</CLabel>
                                                    <CTextarea type='date' rows={3} placeholder='Enquiry Comments'
                                                        name='enquiry_comments'
                                                        value={enquiry_comments}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>

                            <CCol xs="12" sm="2" md="2" lg="2"></CCol>
                            <CCol xs="12" sm="8" md="8" lg="8">
                                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnSubmitFollwUp(e)} disabled={disablebutton3} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                    <img id="img_gif_loading_btn3" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                </div>
                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default EnquiryFollowUpModal;