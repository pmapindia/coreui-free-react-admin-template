import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea,CCardBody,CCard  } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewEnquity = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

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

    const [EnquiriesAddInput, setEnquiriesAddInput] = useState({
        enquiry_branch_id: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_mobile_number: "",
        customer_alternative_mobile: "",
        customer_email_address: "",
        customer_address: "",
        customer_gender: "",
        customer_date_of_birth: "",
        customer_referred_by: "",
        enquiry_source_id: "",
        enquiry_type_id: "",
        enquiry_comments: "",
        enquiry_next_follow_up_date: "",
        enquiry_joining_date: "",
        enquiry_current_status: "",
        loggedin_user_id: ""
    });

    const {
        enquiry_branch_id,
        customer_first_name,
        customer_last_name,
        customer_mobile_number,
        customer_alternative_mobile,
        customer_email_address,
        customer_address,
        customer_gender,
        customer_date_of_birth,
        customer_referred_by,
        enquiry_source_id,
        enquiry_type_id,
        enquiry_comments,
        enquiry_next_follow_up_date,
        enquiry_joining_date,
        enquiry_current_status,
        loggedin_user_id
    } = EnquiriesAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setEnquiriesAddInput({ ...EnquiriesAddInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_SOURCES", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_TYPES", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMERS", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMERS") {
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

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setEnquiriesAddInput({ ...EnquiriesAddInput, ["enquiry_branch_id"]: e.value });
    };

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setEnquiriesAddInput({ ...EnquiriesAddInput, ["customer_referred_by"]: e.value });
    };

    const onChangeSourcedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setEnquiriesAddInput({ ...EnquiriesAddInput, ["enquiry_source_id"]: e.value });
    };

    const onChangeTypedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setEnquiriesAddInput({ ...EnquiriesAddInput, ["enquiry_type_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const OnSubmitEnquiry = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "EnquiryAdd", {
            "enquiry_branch_id": enquiry_branch_id,
            "customer_first_name": customer_first_name,
            "customer_last_name": customer_last_name,
            "customer_mobile_number": customer_mobile_number,
            "customer_alternative_mobile": customer_alternative_mobile,
            "customer_email_address": customer_email_address,
            "customer_address": customer_address,
            "customer_gender": customer_gender,
            "customer_date_of_birth": customer_date_of_birth,
            "customer_referred_by": customer_referred_by,
            "enquiry_source_id": enquiry_source_id,
            "enquiry_type_id": enquiry_type_id,
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
                        <CCard>
                            <CCardBody>
                                <h4>Add New Enquiry</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />

                                <CForm onSubmit={(e) => OnSubmitEnquiry(e)}>
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
                                                <CLabel>Customer First Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter First Name' required="required"
                                                    name='customer_first_name'
                                                    value={customer_first_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Customer Last Name</CLabel>
                                                <CInput type='text' placeholder='Enter Last Name'
                                                    name='customer_last_name'
                                                    value={customer_last_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Mobile Number</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Mobile Number' required="required"
                                                    name='customer_mobile_number'
                                                    value={customer_mobile_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>


                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Alternative Mobile</CLabel>
                                                <CInput type='text' placeholder='Enter Alternative Mobile'
                                                    name='customer_alternative_mobile'
                                                    value={customer_alternative_mobile}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Email Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Email Address' required="required"
                                                    name='customer_email_address'
                                                    value={customer_email_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Address' required="required"
                                                    name='customer_address'
                                                    value={customer_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Gender</CLabel><span className="red">*</span>
                                                <CSelect name='customer_gender' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Gender</option>
                                                    <option selected={customer_gender === "Male"} value="Male">Male</option>
                                                    <option selected={customer_gender === "Female"} value="Female">Female</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Date of Birth</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='' required="required"
                                                    name='customer_date_of_birth'
                                                    value={customer_date_of_birth}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Customer Referred By</CLabel><span className="red">*</span>
                                                <Select value={CustomerDropdowns.filter(function (option) {
                                                    return option.value === customer_referred_by;
                                                })}
                                                    options={CustomerDropdowns}
                                                    onChange={(e) => onChangeCustdropdown(e, "customer_referred_by")} >
                                                </Select>
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

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Status</CLabel><span className="red">*</span>
                                                <CSelect name='enquiry_current_status' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Status</option>
                                                    <option selected={enquiry_current_status === "ENQUIRY"} value="ENQUIRY">ENQUIRY</option>
                                                    <option selected={enquiry_current_status === "VISITING"} value="VISITING">VISITING</option>
                                                    <option selected={enquiry_current_status === "TRAIL BOOKED"} value="TRAIL BOOKED">TRAIL BOOKED</option>
                                                    <option selected={enquiry_current_status === "TRAIL DONE"} value="TRAIL DONE">TRAIL DONE</option>
                                                    <option selected={enquiry_current_status === "TRAIL UNATTENDED"} value="TRAIL UNATTENDED">TRAIL UNATTENDED</option>
                                                    <option selected={enquiry_current_status === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                    <option selected={enquiry_current_status === "NOT INTERESTED"} value="NOT INTERESTED">NOT INTERESTED</option>
                                                    <option selected={enquiry_current_status === "JOINED"} value="JOINED">JOINED</option>
                                                    <option selected={enquiry_current_status === "JOINING"} value="JOINING">JOINING</option>
                                                </CSelect>
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
                                            <div className="bgcolor mb-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
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
export default AddNewEnquity;
