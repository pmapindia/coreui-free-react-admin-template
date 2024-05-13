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

const MemBasicInfoUpdateModal = ({ cust_id, show }, props) => {
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
            LoadCustDetails();
        }
    }, [show11]);

    const [disablebutton1, setDisableButton1] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [errors, setErrors] = useState({});

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [SourceDropdowns, setSourceDropdowns] = useState([]);

    const [BasicInfoUpdateInput, setBasicInfoUpdateInput] = useState({
        customer_id: props.cust_id,
        customer_branch_id: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_mobile_number: "",
        customer_password: "",
        customer_alternative_mobile: "",
        customer_email_address: "",
        customer_address: "",
        customer_gender: "",
        customer_photo: "",
        customer_date_of_birth: "",
        customer_referred_by: "",
        customer_source_id: "",
        customer_created: ""
    });

    const {
        customer_id,
        customer_branch_id,
        customer_first_name,
        customer_last_name,
        customer_mobile_number,
        customer_password,
        customer_alternative_mobile,
        customer_email_address,
        customer_address,
        customer_gender,
        customer_photo,
        customer_date_of_birth,
        customer_referred_by,
        customer_source_id,
        customer_created
    } = BasicInfoUpdateInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, [e.target.name]: e.target.value });
    }

    //Upload Logo
    const [image_warnings, setImageWarnings] = useState({
        image_warning: ""
    });

    const [PictureDis, setPictureDis] = useState(false);

    var image = "";
    const onChangePicture = (e) => {
        console.log("jkfjjfjfg");
        console.log(e.target.name);
        if (e.target.files[0]) {

            var b = e.target.files[0].name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                var b = reader.result;
                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;
                UploadImage(image, image_name);
                console.log("Customer image");
                //console.log(image);  
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage = async (customer_photo, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = customer_photo;
        list["image_for"] = "CUSTOMER";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, ["customer_photo"]: response.data.image_name });
            }
            else {
                setImageWarnings({ ["image_warning"]: response.data.msg });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Remove images
    const Removeimagefront = (customerphoto) => {
        // alert(propertycoverimage);
        setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, [customerphoto]: "" });
        setPictureDis(false);
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_SOURCES", "dropdown_filter": "" },
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

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, ["customer_branch_id"]: e.value });
    };

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, ["customer_referred_by"]: e.value });
    };

    const onChangeSourcedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setBasicInfoUpdateInput({ ...BasicInfoUpdateInput, ["customer_source_id"]: e.value });
    };


    //console.log("Cust Id: " + cust_id)
    const LoadCustDetails = async () => {
        var list = {};
        list["customer_id"] = cust_id;
        await axios.post(process.env.REACT_APP_API + "CustomerDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var UserDetails = [], BirthDate, Time;
                if (response.data.customer_details !== null) {
                    if (response.data.customer_details.customer_date_of_birth !== null) {
                        var date = response.data.customer_details.customer_date_of_birth
                        BirthDate = date.substring(0, 10);
                    }
                    else {
                        BirthDate = response.data.customer_details.customer_date_of_birth;
                    }

                    setPictureDis(true);
                    setBasicInfoUpdateInput({
                        "customer_id": response.data.customer_details.customer_id,
                        "customer_branch_id": response.data.customer_details.customer_branch_id,
                        "customer_first_name": response.data.customer_details.customer_first_name,
                        "customer_last_name": response.data.customer_details.customer_last_name,
                        "customer_mobile_number": response.data.customer_details.customer_mobile_number,
                        "customer_password": response.data.customer_details.customer_password,
                        "customer_alternative_mobile": response.data.customer_details.customer_alternative_mobile,
                        "customer_email_address": response.data.customer_details.customer_email_address,
                        "customer_address": response.data.customer_details.customer_address,
                        "customer_gender": response.data.customer_details.customer_gender,
                        "customer_photo": response.data.customer_details.customer_photo,
                        "customer_date_of_birth": BirthDate,
                        "customer_referred_by": response.data.customer_details.customer_referred_by,
                        "customer_source_id": response.data.customer_details.customer_source_id
                    });
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        //LoadCustDetails();
        GetDropDown();
    }, []);

    const OnSubmitMemBasicInfoUpdate = async (e) => {
        e.preventDefault();
        setDisableButton1(true);
        document.getElementById("img_gif_loading_btn1").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "CustomerUpdate", {
            "customer_id": customer_id,
            "customer_branch_id": customer_branch_id,
            "customer_first_name": customer_first_name,
            "customer_last_name": customer_last_name,
            "customer_mobile_number": customer_mobile_number,
            "customer_password": customer_password,
            "customer_alternative_mobile": customer_alternative_mobile,
            "customer_email_address": customer_email_address,
            "customer_address": customer_address,
            "customer_gender": customer_gender,
            "customer_photo": customer_photo,
            "customer_date_of_birth": customer_date_of_birth,
            // "customer_referred_by": customer_referred_by,
            // "customer_source_id": customer_source_id,
            "customer_created": cookies.user_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
            })
    }
    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }} onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="lg"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Update Basic Info </h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CForm onSubmit={(e) => OnSubmitMemBasicInfoUpdate(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Customer Branch</CLabel><span className="red">*</span>
                                                        <Select value={BranchDropdowns.filter(function (option) {
                                                            return option.value === customer_branch_id;
                                                        })}
                                                            options={BranchDropdowns}
                                                            onChange={(e) => onChangedropdown(e, "customer_branch_id")} required="required">
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>First Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter First Name'
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
                                                        <CLabel>Date of Birth</CLabel>
                                                        <CInput type='date' placeholder=''
                                                            name='customer_date_of_birth'
                                                            value={customer_date_of_birth}
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
                                                            <option selected={customer_gender === "Others"} value="Others">Others</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Mobile Number</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Mobile Number' required="required"
                                                            name='customer_mobile_number'
                                                            maxLength={10}
                                                            value={customer_mobile_number}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Alternative Mobile Num</CLabel>
                                                        <CInput type='text' placeholder='Enter Alternative Mobile Num'
                                                            name='customer_alternative_mobile'
                                                            maxLength={10}
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
                                                        <CLabel>Password</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Password' required="required"
                                                            name='customer_password'
                                                            value={customer_password}
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

                                                {/* <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Customer Referred By</CLabel>
                                                        <Select value={CustomerDropdowns.filter(function (option) {
                                                            return option.value === customer_referred_by;
                                                        })}
                                                            options={CustomerDropdowns}
                                                            onChange={(e) => onChangeCustdropdown(e, "customer_referred_by")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol> */}

                                                {/* <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Customer Source</CLabel>
                                                        <Select value={SourceDropdowns.filter(function (option) {
                                                            return option.value === customer_source_id;
                                                        })}
                                                            options={SourceDropdowns}
                                                            onChange={(e) => onChangeSourcedropdown(e, "customer_source_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol> */}

                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                    <CFormGroup>
                                                        {/* <CLabel className="red">Photo Size :"width: "100%", height: "150px"</CLabel> */}
                                                        <div className="div" style={{ fontSize: "15px", fontWeight: "" }}>
                                                            Upload Profile Photo
                                                            <CInput type="file" className="hide-file"
                                                                name="customer_photo"
                                                                onChange={(e) => onChangePicture(e)}
                                                            ></CInput>
                                                        </div>
                                                        {PictureDis ? <div>
                                                            <br></br>
                                                            <div className=" table-responsive my-table mt-3">
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + customer_photo}
                                                                    style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                                />
                                                            </div>
                                                            <CFormGroup>
                                                                <CButton className="bgcolor white ml-1 mt-1"
                                                                    onClick={() => Removeimagefront("customer_photo")}
                                                                ><i className="fa fa-close"></i></CButton>
                                                            </CFormGroup>
                                                        </div> : null}
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton1} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn1" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default MemBasicInfoUpdateModal;