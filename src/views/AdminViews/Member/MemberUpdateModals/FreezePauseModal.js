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

const FreezePauseModal = (props) => {
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

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    useEffect(() => {
        if (FreezeInput.pause_from_date === "" && FreezeInput.pause_to_date === "") {
            var todaysdate = new Date();
            var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);

            var diffInMs = new Date(todays_date) - new Date(todays_date)
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            setFreezeInput({ ...FreezeInput, ["pause_from_date"]: todays_date, ["pause_to_date"]: todays_date, ["pause_number_of_days"]: diffInDays });
            //console.log(todays_date);
        }
    }, []);

    const [disablebutton7, setDisableButton7] = useState(false);

    const [FreezeInput, setFreezeInput] = useState({
        pause_member_id: props.mem_id,
        pause_number_of_days: "",
        pause_from_date: "",
        pause_to_date: "",
        pause_created_user_id: "",
        pause_created_member_id: 0
    });

    const {
        pause_member_id,
        pause_number_of_days,
        pause_from_date,
        pause_to_date,
        pause_created_user_id,
        pause_created_member_id
    } = FreezeInput;

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setFreezeInput({ ...FreezeInput, [e.target.name]: e.target.value });
    }


    const OnInputDays = (e) => {
        var diffInMs = new Date(pause_to_date) - new Date(pause_from_date)
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        console.log("No of days:" + diffInDays);
        setFreezeInput({ ...FreezeInput, "pause_number_of_days": diffInDays });
    }

    const OnInputNoOfDays = (e) => {
        var diffInMs = new Date(pause_to_date) - new Date(pause_from_date)
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        console.log("No of days:" + diffInDays);
        setFreezeInput({ ...FreezeInput, "pause_number_of_days": diffInDays });

    }

    const OnSubmitfreeze = async (e) => {
        e.preventDefault();
        setDisableButton7(true);
        document.getElementById("img_gif_loading_btn7").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberPausesAdd", {
            "pause_member_id": props.mem_id,
            "pause_number_of_days": pause_number_of_days,
            "pause_from_date": pause_from_date,
            "pause_to_date": pause_to_date,
            "pause_created_user_id": cookies.user_id,
            "pause_created_member_id": 0
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton7(false);
                document.getElementById("img_gif_loading_btn7").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton7(false);
                document.getElementById("img_gif_loading_btn7").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton7(false);
                document.getElementById("img_gif_loading_btn7").style.display = "none";
            })
    }

    return (
        <CRow>
            <CCol>
                <CButton className="btn btn-sm white width100"
                    style={{ backgroundColor: "#F44336" }}
                    onClick={() => setPrimary(!primary)}
                >Freeze/Pause
                </CButton>
                {/* <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton> */}

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Freeze/Pause</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CForm onSubmit={(e) => OnSubmitfreeze(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>From Date</CLabel><span className="red">*</span>
                                                        <CInput type='date' placeholder='Enter From Date'
                                                            name='pause_from_date'
                                                            value={pause_from_date}
                                                            onChange={(e) => OnInputChange(e)}
                                                            //onKeyUp={(e) => OnInputDays(e)}
                                                            onSelect={(e) => OnInputNoOfDays(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>To Date</CLabel><span className="red">*</span>
                                                        <CInput type='date' placeholder='Enter To Date'
                                                            name='pause_to_date'
                                                            value={pause_to_date}
                                                            onChange={(e) => OnInputChange(e)}
                                                            //onKeyUp={(e) => OnInputDays(e)}
                                                            onSelect={(e) => OnInputNoOfDays(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <CFormGroup>
                                                        <CLabel>No of Days</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter No of Days' disabled
                                                            name='pause_number_of_days'
                                                            value={pause_number_of_days}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton7} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Freeze/Pause</CButton>
                                                        <img id="img_gif_loading_btn7" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default FreezePauseModal;