import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const EnquityUpdate = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    var enqid = searchParams.get("enqid");

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [SourceDropdowns, setSourceDropdowns] = useState([]);
    const [TypeDropdowns, setTypeDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [UpdateInput, setUpdateInput] = useState({
        enquiry_id: "",
        enquiry_branch_id: "",
        enquiry_customer_id: "",
        customer_first_name: "",
        customer_last_name: "",
        enquiry_source_id: "",
        enquiry_type_id: "",
        enquiry_comments: "",
        enquiry_next_follow_up_date: "",
        enquiry_joining_date: "",
        enquiry_status_text: "",
        enquiry_current_status: "",
        loggedin_user_id: ""
    });

    const {
        enquiry_id,
        enquiry_branch_id,
        enquiry_customer_id,
        customer_first_name,
        customer_last_name,
        enquiry_source_id,
        enquiry_type_id,
        enquiry_comments,
        enquiry_next_follow_up_date,
        enquiry_joining_date,
        enquiry_status_text,
        enquiry_current_status,
        loggedin_user_id
    } = UpdateInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setUpdateInput({ ...UpdateInput, [e.target.name]: e.target.value });
    }

    const LoadMemberDetails = async () => {
        var list = {};
        list["enquiry_id"] = enqid;

        await axios.post(process.env.REACT_APP_API + "EnquiryDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var followDate, joiningDate, LoginDate, CreatedAt, UpdatedAt;
                var newdate, time, Time, meridiemTime;
                if (response.data.enquiry_details !== null) {
                    if (response.data.enquiry_details.enquiry_next_follow_up_date !== null) {
                        var date = response.data.enquiry_details.enquiry_next_follow_up_date
                        followDate = date.substring(0, 10);
                    }
                    else {
                        followDate = "";
                    }

                    if (response.data.enquiry_details.enquiry_joining_date !== null) {
                        var date = response.data.enquiry_details.enquiry_joining_date;
                        joiningDate = date.substring(0, 10);
                    }
                    else {
                        joiningDate = "";
                    }

                    setUpdateInput({
                        "enquiry_id": response.data.enquiry_details.enquiry_id,
                        "enquiry_branch_id": response.data.enquiry_details.enquiry_branch_id,
                        "branch_name": response.data.enquiry_details.branch_name,
                        "enquiry_customer_id": response.data.enquiry_details.enquiry_customer_id,
                        "customer_first_name": response.data.enquiry_details.customer_first_name,
                        "customer_last_name": response.data.enquiry_details.customer_last_name,
                        "enquiry_source_id": response.data.enquiry_details.enquiry_source_id,
                        "source_name": response.data.enquiry_details.source_name,
                        "enquiry_type_id": response.data.enquiry_details.enquiry_type_id,
                        "enquiry_type_name": response.data.enquiry_details.enquiry_type_name,
                        "enquiry_comments": response.data.enquiry_details.enquiry_comments,
                        "enquiry_next_follow_up_date": followDate,
                        "enquiry_joining_date": joiningDate,
                        "enquiry_current_status": response.data.enquiry_details.enquiry_current_status,
                    })
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_SOURCES", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_TYPES", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_ENQUIRY_SOURCES") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setSourceDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_ENQUIRY_TYPES") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setTypeDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCustomerDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDown();
        LoadMemberDetails();
    }, []);

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setUpdateInput({ ...UpdateInput, ["enquiry_branch_id"]: e.value });
    };

    const onChangeSourcedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setUpdateInput({ ...UpdateInput, ["enquiry_source_id"]: e.value });
    };

    const onChangeTypedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setUpdateInput({ ...UpdateInput, ["enquiry_type_id"]: e.value });
    };

    const OnSubmitEnquiryUpdate = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "EnquiryUpdate", {
            "enquiry_id": enquiry_id,
            "enquiry_branch_id": enquiry_branch_id,
            "enquiry_customer_id": enquiry_customer_id,
            "enquiry_source_id": enquiry_source_id,
            "enquiry_type_id": enquiry_type_id,
            "enquiry_comments": enquiry_comments,
            "enquiry_next_follow_up_date": enquiry_next_follow_up_date,
            "enquiry_joining_date": enquiry_joining_date,
            "enquiry_status_text": "ACTIVE",
            "enquiry_current_status": enquiry_current_status,
            "loggedin_user_id": cookies.user_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                history.push(`/enquirylist`);
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

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Enquiry Update</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitEnquiryUpdate(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Enquiry Branch</CLabel><span className="red">*</span>
                                                <Select value={BranchDropdowns.filter(function (option) {
                                                    return option.value === enquiry_branch_id;
                                                })}
                                                    options={BranchDropdowns}
                                                    onChange={(e) => onChangedropdown(e, "enquiry_branch_id")} required="required">
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>First Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter First Name' required="required"
                                                    name='customer_first_name'
                                                    value={customer_first_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Last Name</CLabel>
                                                <CInput type='text' placeholder='Enter Last Name'
                                                    name='customer_last_name'
                                                    value={customer_last_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Enquiry Source</CLabel><span className="red">*</span>
                                                <Select value={SourceDropdowns.filter(function (option) {
                                                    return option.value === enquiry_source_id;
                                                })}
                                                    options={SourceDropdowns}
                                                    onChange={(e) => onChangeSourcedropdown(e, "enquiry_source_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Enquiry Type</CLabel><span className="red">*</span>
                                                <Select value={TypeDropdowns.filter(function (option) {
                                                    return option.value === enquiry_type_id;
                                                })}
                                                    options={TypeDropdowns}
                                                    onChange={(e) => onChangeTypedropdown(e, "enquiry_type_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Status</CLabel><span className="red">*</span>
                                                <CSelect name='enquiry_current_status' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Status</option>
                                                    <option selected={enquiry_current_status === "ENQUIRY"} value="ENQUIRY">ENQUIRY</option>
                                                    <option selected={enquiry_current_status === "VISITING"} value="VISITING">VISITING</option>
                                                    <option selected={enquiry_current_status === "CONVERTED"} value="CONVERTED">CONVERTED/JOINED</option>
                                                    <option selected={enquiry_current_status === "TRIAL_BOOKED"} value="TRIAL_BOOKED">TRIAL BOOKED</option>
                                                    <option selected={enquiry_current_status === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                    <option selected={enquiry_current_status === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                    <option selected={enquiry_current_status === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                    <option selected={enquiry_current_status === "NOT_INTERESTED"} value="NOT_INTERESTED">NOT INTERESTED</option>
                                                    {/* <option selected={enquiry_current_status === "JOINED"} value="JOINED">JOINED</option>
                                                    <option selected={enquiry_current_status === "JOINING"} value="JOINING">JOINING</option> */}

                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Next Follow Up Date</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Enter Next Follow Up Date' required="required"
                                                    name='enquiry_next_follow_up_date'
                                                    value={enquiry_next_follow_up_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Joining Date</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Joining Date' required="required"
                                                    name='enquiry_joining_date'
                                                    value={enquiry_joining_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="8" md="8" lg="8">
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
        </>
    )
}
export default EnquityUpdate;