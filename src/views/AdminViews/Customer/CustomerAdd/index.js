import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CCardBody, CCard} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CustPackage from './CustPackegeAdd';
import CustPayment from './CustPayments';
import CustHealthInfo from './CustHealthInfo';

const AddNewCustomer = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [SourceDropdowns, setSourceDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const [CustomerAddInput, setCustomerAddInput] = useState({
        customer_id: "",
        customer_branch_id: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_mobile_number: "",
        customer_password: "",
        customer_alternative_mobile: "",
        customer_email_address: "",
        customer_address: "",
        customer_gender: "",
        customer_photo: "1",
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
    } = CustomerAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setCustomerAddInput({ ...CustomerAddInput, [e.target.name]: e.target.value });
    }

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

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
                setCustomerAddInput({ ...CustomerAddInput, ["customer_photo"]: response.data.image_name });
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
        setCustomerAddInput({ ...CustomerAddInput, [customerphoto]: "" });
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

        setCustomerAddInput({ ...CustomerAddInput, ["customer_branch_id"]: e.value });
    };

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setCustomerAddInput({ ...CustomerAddInput, ["customer_referred_by"]: e.value });
    };

    const onChangeSourcedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setCustomerAddInput({ ...CustomerAddInput, ["customer_source_id"]: e.value });
    };

    const LoadCustDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["customer_id"] = props.location.pfid.pfid;
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
                        setCustomerAddInput({
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
    }

    useEffect(() => {
        LoadCustDetails();
        GetDropDown();
    }, []);

    const OnSubmitCustomer = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (customer_id === "") {
            await axios.post(process.env.REACT_APP_API + "CustomerAdd", {
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
                "customer_referred_by": customer_referred_by,
                "customer_source_id": customer_source_id,
                "customer_created": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/customerlist`);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
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
                })
        }
        else {
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
                "customer_referred_by": customer_referred_by,
                "customer_source_id": customer_source_id,
                "customer_created": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/customerlist`);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
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

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4> Add New Customer</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />

                                <CForm onSubmit={(e) => OnSubmitCustomer(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
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

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer First Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter First Name' required="required"
                                                    name='customer_first_name'
                                                    value={customer_first_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer Last Name</CLabel>
                                                <CInput type='text' placeholder='Enter Last Name'
                                                    name='customer_last_name'
                                                    value={customer_last_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Mobile Number</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Mobile Number' required="required"
                                                    name='customer_mobile_number'
                                                    value={customer_mobile_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Password</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Password' required="required"
                                                    name='customer_password'
                                                    value={customer_password}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Alternative Mobile</CLabel>
                                                <CInput type='text' placeholder='Enter Alternative Mobile'
                                                    name='customer_alternative_mobile'
                                                    value={customer_alternative_mobile}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Email Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Email Address' required="required"
                                                    name='customer_email_address'
                                                    value={customer_email_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Address' required="required"
                                                    name='customer_address'
                                                    value={customer_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Gender</CLabel><span className="red">*</span>
                                                <CSelect name='customer_gender' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Gender</option>
                                                    <option selected={customer_gender === "Male"} value="Male">Male</option>
                                                    <option selected={customer_gender === "Female"} value="Female">Female</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Date of Birth</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='' required="required"
                                                    name='customer_date_of_birth'
                                                    value={customer_date_of_birth}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
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

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer Source</CLabel><span className="red">*</span>
                                                <Select value={SourceDropdowns.filter(function (option) {
                                                    return option.value === customer_source_id;
                                                })}
                                                    options={SourceDropdowns}
                                                    onChange={(e) => onChangeSourcedropdown(e, "customer_source_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="">
                                            <CFormGroup>
                                                {/* <CLabel className="red">Photo Size :"width: "100%", height: "150px"</CLabel> */}
                                                <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                                    Upload Customer Photo
                                                    <CInput type="file" className="hide-file"
                                                        name="customer_photo"
                                                        onChange={(e) => onChangePicture(e)}
                                                    ></CInput>
                                                </div>
                                                {PictureDis ? <div>
                                                    <br></br>
                                                    <div className=" table-responsive my-table mt-5">
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + CustomerAddInput.customer_photo}
                                                            style={{ width: "100%", height: "150px", marginTop: "", float: "", paddingRight: "" }}
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
                                        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CForm>

                                {/* <CForm >
                    <Tabs>
                        <TabList>
                            <Tab>Customer Details</Tab>
                            <Tab>Package</Tab>
                            <Tab>Payments</Tab>
                            <Tab>Health Info</Tab>
                        </TabList>
                        <TabPanel>
                            <h3>Customer Details</h3>
                            <hr className="bgcyan" style={{ height: "2px" }} />
                            <CRow>
                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>First Name</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter First Name'
                                    // name="cust_name" value={cust_name}
                                    // onChange={(e) => OnInputChange(e)}
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>User Name</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter User Name'
                                    // name="cust_mobile_number" value={cust_mobile_number}
                                    // onChange={(e) => OnInputChange(e)}
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Password</CLabel><span className="red">*</span>
                                    <CInput type='password' placeholder='Enter Password'
                                    />
                                </CCol>

                                <CCol xs="12" sm="2" md="2" lg="4">
                                    <CLabel>Gender</CLabel><span className="red">*</span>
                                    <CRow style={{ textAlign: "center" }}>
                                        <CCol xs="12" sm="2" md="3" lg="4">
                                            <CLabel>Male</CLabel>
                                            <CInput type='radio' placeholder='Enter Customer Name'
                                            // name="member_name" value={member_name}
                                            // onChange={(e) => OnInputChange(e)} 
                                            />
                                        </CCol>
                                        <CCol xs="12" sm="2" md="3" lg="4">
                                            <CLabel>FeMale</CLabel>
                                            <CInput type='radio' placeholder='Enter Customer Name'
                                            // name="member_name" value={member_name}
                                            // onChange={(e) => OnInputChange(e)} 
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Street Address</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Address'
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Phone No</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Phone No'
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Date of Birth</CLabel><span className="red">*</span>
                                    <CInput type='date' placeholder=''
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Enquiry Source?</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Source</option>
                                    </CSelect>
                                    <CLabel>+ Add New</CLabel>
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>Referral</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Referral'
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CLabel>ID Proof Number</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter ID Proof Number'
                                    />
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                    <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                        Upload Customer Photo
                                        <CInput type="file" className="hide-file"
                                        // name="cust_aadhaar_card"
                                        // onChange={(e) => onChangePictureAadhaar(e)}
                                        ></CInput>
                                    </div>
                                </CCol>


                            </CRow>
                            <hr className="bgcyan" style={{ height: "1px" }} />
                            <CRow>
                                <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <div className="bgcyan mb-3" style={{ borderRadius: "5px" }}>
                                        <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                    </div>
                                    {warnings.warning && <p className="red">{warnings.warning}</p>}
                                </CCol>
                            </CRow>
                        </TabPanel>
                        <TabPanel>
                        <h3>Customer Package</h3>
                            <hr className="bgcyan" style={{ height: "2px" }} />
                            <CustPackage/>
                        </TabPanel>
                        <TabPanel>
                        <h3>Customer Payments</h3>
                            <hr className="bgcyan" style={{ height: "2px" }} />
                            <CustPayment />
                        </TabPanel>
                        <TabPanel>
                        <h3>Customer Health info</h3>
                            <hr className="bgcyan" style={{ height: "2px" }} />
                            <CustHealthInfo />
                        </TabPanel>
                    </Tabs>

                </CForm> */}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )

}
export default AddNewCustomer;