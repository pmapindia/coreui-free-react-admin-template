import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
import Select from 'react-select';

const BatchDetailsUpdateModal = ({ show, mem_id }, props) => {
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
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    useEffect(() => {
        if (show11 === true) {
            LoadBatchDetails();
        }
    }, [show11]);

    const LoadBatchDetails = async () => {
        var list = {};
        list["member_id"] = mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberBatchDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setBatchUpdateInput({
                    "member_id": response.data.member_batch_details.member_id,
                    "member_batch_id": response.data.member_batch_details.member_batch_id,
                    "member_in_time": response.data.member_batch_details.member_in_time,
                    "member_out_time": response.data.member_batch_details.member_out_time,
                })
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const [BatchUpdateInput, setBatchUpdateInput] = useState({
        "member_id": 1,
        "member_batch_id": 64,
        "member_in_time": "sample string 3",
        "member_out_time": "sample string 4"
    });

    const {
        member_id,
        member_batch_id,
        member_in_time,
        member_out_time
    } = BatchUpdateInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setBatchUpdateInput({ ...BatchUpdateInput, [e.target.name]: e.target.value });
    }

    const [disablebutton40, setDisableButton40] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();
    //console.log("Rem Bal " + props.Batch_amount)

    const [BatchDropdowns, setBatchDropdowns] = useState([]);


    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BATCHES", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BATCHES") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBatchDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangeBatchdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setBatchUpdateInput({ ...BatchUpdateInput, ["member_batch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const OnSubmitMemBatchUpdate = async (e) => {
        e.preventDefault();
        setDisableButton40(true);
        document.getElementById("img_gif_loading_btn40").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberBatchUpdate", {
            "member_id": member_id,
            "member_batch_id": member_batch_id,
            "member_in_time": member_in_time,
            "member_out_time": member_out_time
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton40(false);
                document.getElementById("img_gif_loading_btn40").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton40(false);
                document.getElementById("img_gif_loading_btn40").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton40(false);
                document.getElementById("img_gif_loading_btn40").style.display = "none";
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

                        <CModalTitle className=" white mt-2"><h4>Batch Details</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody >
                                        <CForm onSubmit={(e) => OnSubmitMemBatchUpdate(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Select Batch</CLabel><span className="red">*</span>
                                                        <Select value={BatchDropdowns.filter(function (option) {
                                                            return option.value === member_batch_id;
                                                        })}
                                                            options={BatchDropdowns}
                                                            onChange={(e) => onChangeBatchdropdown(e, "member_batch_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>In Time</CLabel>
                                                        <CSelect custom name='member_in_time' onChange={(e) => OnInputChange(e)}>
                                                            <option>Select Time</option>
                                                            <option selected={member_in_time === "06:00 am"} value="06:00 am">06:00 am</option>
                                                            <option selected={member_in_time === "06:15 am"} value="06:15 am">06:15 am</option>
                                                            <option selected={member_in_time === "06:30 am"} value="06:30 am">06:30 am</option>
                                                            <option selected={member_in_time === "06:45 am"} value="06:45 am">06:45 am</option>
                                                            <option selected={member_in_time === "07:00 am"} value="07:00 am">07:00 am</option>
                                                            <option selected={member_in_time === "07:15 am"} value="07:15 am">07:15 am</option>
                                                            <option selected={member_in_time === "07:30 am"} value="07:30 am">07:30 am</option>
                                                            <option selected={member_in_time === "07:45 am"} value="07:45 am">07:45 am</option>
                                                            <option selected={member_in_time === "08:00 am"} value="08:00 am">08:00 am</option>
                                                            <option selected={member_in_time === "08:15 am"} value="08:15 am">08:15 am</option>
                                                            <option selected={member_in_time === "08:30 am"} value="08:30 am">08:30 am</option>
                                                            <option selected={member_in_time === "08:45 am"} value="08:45 am">08:45 am</option>
                                                            <option selected={member_in_time === "09:00 am"} value="09:00 am">09:00 am</option>
                                                            <option selected={member_in_time === "09:15 am"} value="09:15 am">09:15 am</option>
                                                            <option selected={member_in_time === "09:30 am"} value="09:30 am">09:30 am</option>
                                                            <option selected={member_in_time === "09:45 am"} value="09:45 am">09:45 am</option>
                                                            <option selected={member_in_time === "10:00 am"} value="10:00 am">10:00 am</option>
                                                            <option selected={member_in_time === "10:15 am"} value="10:15 am">10:15 am</option>
                                                            <option selected={member_in_time === "10:30 am"} value="10:30 am">10:30 am</option>
                                                            <option selected={member_in_time === "10:45 am"} value="10:45 am">10:45 am</option>
                                                            <option selected={member_in_time === "11:00 am"} value="11:00 am">11:00 am</option>
                                                            <option selected={member_in_time === "11:15 am"} value="11:15 am">11:15 am</option>
                                                            <option selected={member_in_time === "11:30 am"} value="11:30 am">11:30 am</option>
                                                            <option selected={member_in_time === "11:45 am"} value="11:45 am">11:45 am</option>
                                                            <option selected={member_in_time === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                            <option selected={member_in_time === "12:15 pm"} value="12:15 pm">12:15 pm</option>
                                                            <option selected={member_in_time === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                            <option selected={member_in_time === "12:45 pm"} value="12:45 pm">12:45 pm</option>
                                                            <option selected={member_in_time === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                            <option selected={member_in_time === "01:15 pm"} value="01:15 pm">01:15 pm</option>
                                                            <option selected={member_in_time === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                            <option selected={member_in_time === "01:45 pm"} value="01:45 pm">01:45 pm</option>
                                                            <option selected={member_in_time === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                            <option selected={member_in_time === "02:15 pm"} value="02:15 pm">02:15 pm</option>
                                                            <option selected={member_in_time === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                            <option selected={member_in_time === "02:45 pm"} value="02:45 pm">02:45 pm</option>
                                                            <option selected={member_in_time === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                            <option selected={member_in_time === "03:15 pm"} value="03:15 pm">03:15 pm</option>
                                                            <option selected={member_in_time === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                            <option selected={member_in_time === "03:45 pm"} value="03:35 pm">03:45 pm</option>
                                                            <option selected={member_in_time === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                            <option selected={member_in_time === "04:15 pm"} value="04:15 pm">04:15 pm</option>
                                                            <option selected={member_in_time === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                            <option selected={member_in_time === "04:45 pm"} value="04:45 pm">04:45 pm</option>
                                                            <option selected={member_in_time === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                            <option selected={member_in_time === "05:14 pm"} value="05:14 pm">05:15 pm</option>
                                                            <option selected={member_in_time === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                            <option selected={member_in_time === "05:45 pm"} value="05:45 pm">05:45 pm</option>
                                                            <option selected={member_in_time === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                            <option selected={member_in_time === "06:15 pm"} value="06:15 pm">06:15 pm</option>
                                                            <option selected={member_in_time === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                            <option selected={member_in_time === "06:45 pm"} value="06:45 pm">06:45 pm</option>
                                                            <option selected={member_in_time === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                            <option selected={member_in_time === "07:15 pm"} value="07:15 pm">07:15 pm</option>
                                                            <option selected={member_in_time === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                            <option selected={member_in_time === "07:45 pm"} value="07:45 pm">07:45 pm</option>
                                                            <option selected={member_in_time === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                            <option selected={member_in_time === "08:15 pm"} value="08:15 pm">08:15 pm</option>
                                                            <option selected={member_in_time === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                            <option selected={member_in_time === "08:45 pm"} value="08:45 pm">08:45 pm</option>
                                                            <option selected={member_in_time === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                            <option selected={member_in_time === "09:15 pm"} value="09:15 pm">09:00 pm</option>
                                                            <option selected={member_in_time === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                            <option selected={member_in_time === "09:45 pm"} value="09:45 pm">09:45 pm</option>
                                                            <option selected={member_in_time === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Out Time</CLabel>
                                                        <CSelect custom name='member_out_time' onChange={(e) => OnInputChange(e)}>
                                                            <option>Select Time</option>
                                                            <option selected={member_out_time === "06:00 am"} value="06:00 am">06:00 am</option>
                                                            <option selected={member_out_time === "06:15 am"} value="06:15 am">06:15 am</option>
                                                            <option selected={member_out_time === "06:30 am"} value="06:30 am">06:30 am</option>
                                                            <option selected={member_out_time === "06:45 am"} value="06:45 am">06:45 am</option>
                                                            <option selected={member_out_time === "07:00 am"} value="07:00 am">07:00 am</option>
                                                            <option selected={member_out_time === "07:15 am"} value="07:15 am">07:15 am</option>
                                                            <option selected={member_out_time === "07:30 am"} value="07:30 am">07:30 am</option>
                                                            <option selected={member_out_time === "07:45 am"} value="07:45 am">07:45 am</option>
                                                            <option selected={member_out_time === "08:00 am"} value="08:00 am">08:00 am</option>
                                                            <option selected={member_out_time === "08:15 am"} value="08:15 am">08:15 am</option>
                                                            <option selected={member_out_time === "08:30 am"} value="08:30 am">08:30 am</option>
                                                            <option selected={member_out_time === "08:45 am"} value="08:45 am">08:45 am</option>
                                                            <option selected={member_out_time === "09:00 am"} value="09:00 am">09:00 am</option>
                                                            <option selected={member_out_time === "09:15 am"} value="09:15 am">09:15 am</option>
                                                            <option selected={member_out_time === "09:30 am"} value="09:30 am">09:30 am</option>
                                                            <option selected={member_out_time === "09:45 am"} value="09:45 am">09:45 am</option>
                                                            <option selected={member_out_time === "10:00 am"} value="10:00 am">10:00 am</option>
                                                            <option selected={member_out_time === "10:15 am"} value="10:15 am">10:15 am</option>
                                                            <option selected={member_out_time === "10:30 am"} value="10:30 am">10:30 am</option>
                                                            <option selected={member_out_time === "10:45 am"} value="10:45 am">10:45 am</option>
                                                            <option selected={member_out_time === "11:00 am"} value="11:00 am">11:00 am</option>
                                                            <option selected={member_out_time === "11:15 am"} value="11:15 am">11:15 am</option>
                                                            <option selected={member_out_time === "11:30 am"} value="11:30 am">11:30 am</option>
                                                            <option selected={member_out_time === "11:45 am"} value="11:45 am">11:45 am</option>
                                                            <option selected={member_out_time === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                            <option selected={member_out_time === "12:15 pm"} value="12:15 pm">12:15 pm</option>
                                                            <option selected={member_out_time === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                            <option selected={member_out_time === "12:45 pm"} value="12:45 pm">12:45 pm</option>
                                                            <option selected={member_out_time === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                            <option selected={member_out_time === "01:15 pm"} value="01:15 pm">01:15 pm</option>
                                                            <option selected={member_out_time === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                            <option selected={member_out_time === "01:45 pm"} value="01:45 pm">01:45 pm</option>
                                                            <option selected={member_out_time === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                            <option selected={member_out_time === "02:15 pm"} value="02:15 pm">02:15 pm</option>
                                                            <option selected={member_out_time === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                            <option selected={member_out_time === "02:45 pm"} value="02:45 pm">02:45 pm</option>
                                                            <option selected={member_out_time === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                            <option selected={member_out_time === "03:15 pm"} value="03:15 pm">03:15 pm</option>
                                                            <option selected={member_out_time === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                            <option selected={member_out_time === "03:45 pm"} value="03:35 pm">03:45 pm</option>
                                                            <option selected={member_out_time === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                            <option selected={member_out_time === "04:15 pm"} value="04:15 pm">04:15 pm</option>
                                                            <option selected={member_out_time === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                            <option selected={member_out_time === "04:45 pm"} value="04:45 pm">04:45 pm</option>
                                                            <option selected={member_out_time === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                            <option selected={member_out_time === "05:14 pm"} value="05:14 pm">05:15 pm</option>
                                                            <option selected={member_out_time === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                            <option selected={member_out_time === "05:45 pm"} value="05:45 pm">05:45 pm</option>
                                                            <option selected={member_out_time === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                            <option selected={member_out_time === "06:15 pm"} value="06:15 pm">06:15 pm</option>
                                                            <option selected={member_out_time === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                            <option selected={member_out_time === "06:45 pm"} value="06:45 pm">06:45 pm</option>
                                                            <option selected={member_out_time === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                            <option selected={member_out_time === "07:15 pm"} value="07:15 pm">07:15 pm</option>
                                                            <option selected={member_out_time === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                            <option selected={member_out_time === "07:45 pm"} value="07:45 pm">07:45 pm</option>
                                                            <option selected={member_out_time === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                            <option selected={member_out_time === "08:15 pm"} value="08:15 pm">08:15 pm</option>
                                                            <option selected={member_out_time === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                            <option selected={member_out_time === "08:45 pm"} value="08:45 pm">08:45 pm</option>
                                                            <option selected={member_out_time === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                            <option selected={member_out_time === "09:15 pm"} value="09:15 pm">09:00 pm</option>
                                                            <option selected={member_out_time === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                            <option selected={member_out_time === "09:45 pm"} value="09:45 pm">09:45 pm</option>
                                                            <option selected={member_out_time === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton40} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn40" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )

}
export default BatchDetailsUpdateModal;