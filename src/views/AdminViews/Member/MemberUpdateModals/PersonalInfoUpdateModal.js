import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';

const PersonalInfoUpdateModal = ({ mem_id, show }, props) => {
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };


    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    useEffect(() => {
        if (show11 === true) {
            LoadPersonalInfoDetails();
        }
    }, [show11]);

    const [disablebutton2, setDisableButton2] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [PersonalInfoUpdate, setPersonalInfoUpdate] = useState({
        info_member_id: props.mem_id,
        info_level_of_physical_activity: "",
        info_stress_in_job: "",
        info_occupation: "",
        info_avg_hours_of_sleep: "",
        info_quality_of_sleep: "",
        info_time_of_sleep: ""
    });

    const {
        info_member_id,
        info_level_of_physical_activity,
        info_stress_in_job,
        info_occupation,
        info_avg_hours_of_sleep,
        info_quality_of_sleep,
        info_time_of_sleep
    } = PersonalInfoUpdate;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setPersonalInfoUpdate({ ...PersonalInfoUpdate, [e.target.name]: e.target.value });
    }

    const LoadPersonalInfoDetails = async () => {
        var list = {};
        list["member_id"] = mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberPersonalInformationsDetailsByMemberID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setPersonalInfoUpdate({
                    "info_member_id": response.data.member_personal_informations_details.info_member_id,
                    "info_level_of_physical_activity": response.data.member_personal_informations_details.info_level_of_physical_activity,
                    "info_stress_in_job": response.data.member_personal_informations_details.info_stress_in_job,
                    "info_occupation": response.data.member_personal_informations_details.info_occupation,
                    "info_avg_hours_of_sleep": response.data.member_personal_informations_details.info_avg_hours_of_sleep,
                    "info_quality_of_sleep": response.data.member_personal_informations_details.info_quality_of_sleep,
                    "info_time_of_sleep": response.data.member_personal_informations_details.info_time_of_sleep
                })
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const OnSubmitPersonalInfoUpdate = async (e) => {
        e.preventDefault();
        setDisableButton2(true);
        document.getElementById("img_gif_loading_btn2").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberPersonalInformationsUpdate", {
            "info_member_id": info_member_id,
            "info_level_of_physical_activity": info_level_of_physical_activity,
            "info_stress_in_job": info_stress_in_job,
            "info_occupation": info_occupation,
            "info_avg_hours_of_sleep": info_avg_hours_of_sleep,
            "info_quality_of_sleep": info_quality_of_sleep,
            "info_time_of_sleep": info_time_of_sleep
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton2(false);
                document.getElementById("img_gif_loading_btn2").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton2(false);
                document.getElementById("img_gif_loading_btn2").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton2(false);
                document.getElementById("img_gif_loading_btn2").style.display = "none";
            })
    }
    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Update Personal Info</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CForm onSubmit={(e) => OnSubmitPersonalInfoUpdate(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Occupation</CLabel>
                                                        <CInput type='text' placeholder='Enter Occupation'
                                                            name='info_occupation'
                                                            value={info_occupation}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Level of Physical Activity</CLabel>
                                                        <CSelect custom name='info_level_of_physical_activity' onChange={(e) => OnInputChange(e)}
                                                        >
                                                            <option>Select Activity</option>
                                                            <option selected={info_level_of_physical_activity === "10%"} value="10%">10%</option>
                                                            <option selected={info_level_of_physical_activity === "20%"} value="20%">20%</option>
                                                            <option selected={info_level_of_physical_activity === "30%"} value="30%">30%</option>
                                                            <option selected={info_level_of_physical_activity === "40%"} value="40%">40%</option>
                                                            <option selected={info_level_of_physical_activity === "50%"} value="50%">50%</option>
                                                            <option selected={info_level_of_physical_activity === "60%"} value="60%">60%</option>
                                                            <option selected={info_level_of_physical_activity === "70%"} value="70%">70%</option>
                                                            <option selected={info_level_of_physical_activity === "80%"} value="80%">80%</option>
                                                            <option selected={info_level_of_physical_activity === "90%"} value="90%">90%</option>
                                                            <option selected={info_level_of_physical_activity === "100%"} value="100%">100%</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Stress In Job</CLabel>
                                                        <CSelect custom name='info_stress_in_job' onChange={(e) => OnInputChange(e)}
                                                        >
                                                            <option>Select Stress</option>
                                                            <option selected={info_stress_in_job === "Low"} value="Low">Low</option>
                                                            <option selected={info_stress_in_job === "Medium"} value="Medium">Medium</option>
                                                            <option selected={info_stress_in_job === "High"} value="High">High</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Average Hour of sleep</CLabel>
                                                        <CInput type='text' placeholder='Enter Average Hour of sleep'
                                                            name='info_avg_hours_of_sleep'
                                                            value={info_avg_hours_of_sleep}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Quality of Sleep</CLabel>
                                                        <CInput type='text' placeholder='Enter Quality of Sleep'
                                                            name='info_quality_of_sleep'
                                                            value={info_quality_of_sleep}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Time of Sleep</CLabel>
                                                        <CInput type='text' placeholder='Enter Time of Sleep'
                                                            name='info_time_of_sleep'
                                                            value={info_time_of_sleep}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton2} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn2" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>

    )
}
export default PersonalInfoUpdateModal;