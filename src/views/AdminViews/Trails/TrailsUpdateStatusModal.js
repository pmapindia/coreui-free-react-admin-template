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

const TrailsUpdateStatusModal = (props) => {
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

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [UsersDropdowns, setUsersDropdowns] = useState([]);
    const [ProductDropdowns, setProductDropdowns] = useState([]);

    const [disablebutton9, setDisableButton9] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [TrialsUpdateInput, setTrialsUpdateInput] = useState({
        trial_id: "",
        trial_branch_id: "",
        trial_customer_id: "",
        trial_assigned_user_id: "",
        trial_product_id: "",
        trial_start_date: "",
        trial_start_time: "",
        trial_end_date: "",
        trial_end_time: "",
        trial_status_text: "",
        trial_remarks: "",
        loggedin_user_id: ""
    });

    const {
        trial_id,
        trial_branch_id,
        trial_customer_id,
        trial_assigned_user_id,
        trial_product_id,
        trial_start_date,
        trial_start_time,
        trial_end_date,
        trial_end_time,
        trial_status_text,
        trial_remarks,
        loggedin_user_id
    } = TrialsUpdateInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTrialsUpdateInput({ ...TrialsUpdateInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
                { "dropdown_type": "DD_User", "dropdown_filter": "" },
                { "dropdown_type": "DD_PRODUCT_PACKAGE", "dropdown_filter": "" }
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBranchDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_User") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setUsersDropdowns(ddlist);
                    }


                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCustomerDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_PRODUCT_PACKAGE") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setProductDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setTrialsUpdateInput({ ...TrialsUpdateInput, ["trial_branch_id"]: e.value });
    };

    const onChangedCustropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setTrialsUpdateInput({ ...TrialsUpdateInput, ["trial_customer_id"]: e.value });
    };

    const onChangedUserropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setTrialsUpdateInput({ ...TrialsUpdateInput, ["trial_assigned_user_id"]: e.value });
    };

    const onChangeProddropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setTrialsUpdateInput({ ...TrialsUpdateInput, ["trial_product_id"]: e.value });
    };

    const LoadTrailDetails = async () => {
        var list = {};
        if (props.trial_id != null) {
            list["trial_id"] = props.trial_id;
            await axios.post(process.env.REACT_APP_API + "CustomerTrialsDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    var Start_Date, End_Date;
                    if (response.data.details !== null) {

                        if (response.data.details.trial_start_date !== null) {
                            var date = response.data.details.trial_start_date
                            Start_Date = date.substring(0, 10);
                        }
                        else {
                            Start_Date = response.data.details.trial_start_date;
                        }

                        if (response.data.details.trial_end_date !== null) {
                            var date = response.data.details.trial_end_date
                            End_Date = date.substring(0, 10);
                        }
                        else {
                            End_Date = response.data.details.trial_end_date;
                        }

                        setTrialsUpdateInput({
                            "trial_id": response.data.details.trial_id,
                            "trial_branch_id": response.data.details.trial_branch_id,
                            "trial_customer_id": response.data.details.trial_customer_id,
                            "trial_assigned_user_id": response.data.details.trial_assigned_user_id,
                            "trial_product_id": response.data.details.trial_product_id,
                            "trial_start_date": Start_Date,
                            "trial_start_time": response.data.details.trial_start_time,
                            "trial_end_date": End_Date,
                            "trial_end_time": response.data.details.trial_end_time,
                            "trial_status_text": response.data.details.trial_status_text,
                            "trial_remarks": response.data.details.trial_remarks
                        })
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
        LoadTrailDetails();
    }, []);

    const OnSubmitTrial = async (e) => {
        e.preventDefault();
        setDisableButton9(true);
        document.getElementById("img_gif_loading_btn9").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "CustomerTrialsUpdate", {
            "trial_id": trial_id,
            "trial_branch_id": trial_branch_id,
            "trial_customer_id": trial_customer_id,
            "trial_assigned_user_id": trial_assigned_user_id,
            "trial_product_id": trial_product_id,
            "trial_start_date": trial_start_date,
            "trial_start_time": trial_start_time,
            "trial_end_date": trial_end_date,
            "trial_end_time": trial_end_time,
            "trial_status_text": trial_status_text,
            "trial_remarks": trial_remarks,
            "loggedin_user_id": cookies.user_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton9(false);
                document.getElementById("img_gif_loading_btn9").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton9(false);
                document.getElementById("img_gif_loading_btn9").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton9(false);
                document.getElementById("img_gif_loading_btn9").style.display = "none";
            })
    }

    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm bgcolor5 white width100' style={{ fontSize: "13px", }} onClick={() => setPrimary(!primary)}>
                    Update Status
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="lg"
                >
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>
                        <CModalTitle className=" white mt-2"><h4>Update Trial</h4></CModalTitle>
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
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === trial_branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "trial_branch_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Customer</CLabel><span className="red">*</span>
                                                    <Select value={CustomerDropdowns.filter(function (option) {
                                                        return option.value === trial_customer_id;
                                                    })}
                                                        options={CustomerDropdowns}
                                                        onChange={(e) => onChangedCustropdown(e, "trial_customer_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Assigned User</CLabel><span className="red">*</span>
                                                    <Select value={UsersDropdowns.filter(function (option) {
                                                        return option.value === trial_assigned_user_id;
                                                    })}
                                                        options={UsersDropdowns}
                                                        onChange={(e) => onChangedUserropdown(e, "trial_assigned_user_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Product</CLabel><span className="red">*</span>
                                                    <Select value={ProductDropdowns.filter(function (option) {
                                                        return option.value === trial_product_id;
                                                    })}
                                                        options={ProductDropdowns}
                                                        onChange={(e) => onChangeProddropdown(e, "trial_product_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Start Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter Start Date'
                                                        name='trial_start_date'
                                                        value={trial_start_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Start Time</CLabel><span className="red">*</span>
                                                    <CInput type='time' placeholder='Enter Start Time'
                                                        name='trial_start_time'
                                                        value={trial_start_time}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>End Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter End Date'
                                                        name='trial_end_date'
                                                        value={trial_end_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>End Time</CLabel><span className="red">*</span>
                                                    <CInput type='time' placeholder='Enter End Time'
                                                        name='trial_end_time'
                                                        value={trial_end_time}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Status</CLabel><span className="red">*</span>
                                                    <CSelect name='trial_status_text' onChange={(e) => OnInputChange(e)} custom>
                                                        <option>Select Status</option>
                                                        <option selected={trial_status_text === "TRIAL_BOOKED"} value="TRIAL_BOOKED">TRIAL BOOKED</option>
                                                        <option selected={trial_status_text === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                        <option selected={trial_status_text === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                        <option selected={trial_status_text === "TRIAL_NOT_DONE"} value="TRIAL_NOT_DONE">TRIAL NOT DONE</option>
                                                        <option selected={trial_status_text === "RESHEDULED"} value="RESHEDULED">RESHEDULED</option>
                                                        {/* <option selected={trial_status_text === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                    <option selected={trial_status_text === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                    <option selected={trial_status_text === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                    <option selected={trial_status_text === "NOT_INTERESTED"} value="NOT_INTERESTED">NOT INTERESTED</option> */}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <CFormGroup>
                                                    <CLabel>Remarks</CLabel>
                                                    <CTextarea type='date' rows={3} placeholder='Enter Remarks Here .....'
                                                        name='trial_remarks'
                                                        value={trial_remarks}
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
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnSubmitTrial(e)} disabled={disablebutton9} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                    <img id="img_gif_loading_btn9" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default TrailsUpdateStatusModal;