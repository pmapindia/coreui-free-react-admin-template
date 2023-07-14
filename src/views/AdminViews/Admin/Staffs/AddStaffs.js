import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CCard,CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const AddNewStaff = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton, setDisableButton] = useState(false);

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    let history = useHistory();

    const [UserAddInput, setUserAddInput] = useState({
        user_user_id: "",
        user_first_name: "",
        user_last_name: "",
        user_user_name: "",
        user_password: "",
        user_email: "",
        user_gender: "",
        user_shift: "",
        user_time_schedule_from: "",
        user_time_schedule_to: "",
        user_branch_id: "",
        user_emergency_number: "",
        user_mobile_number: "",
        user_aadhar_number: "",
        user_monthly_salary: "",
        user_date_of_birth: "",
        user_address: "",
        user_type: "",
        user_pincode: "",
        user_photo: ""
    });

    const {
        user_user_id,
        user_first_name,
        user_last_name,
        user_user_name,
        user_password,
        user_email,
        user_gender,
        user_shift,
        user_time_schedule_from,
        user_time_schedule_to,
        user_branch_id,
        user_emergency_number,
        user_mobile_number,
        user_aadhar_number,
        user_monthly_salary,
        user_date_of_birth,
        user_address,
        user_type,
        user_pincode,
        user_photo
    } = UserAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setUserAddInput({ ...UserAddInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
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
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setUserAddInput({ ...UserAddInput, ["user_branch_id"]: e.value });
    };

    //Upload User Photo

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    var image = "";
    const [imgData, setImgData] = useState(null);
    const [PictureDis, setPictureDis] = useState(false);

    const [imgdivc, setImgDivC] = useState(false);
    const [picture, setPicture] = useState(null);

    const onChangePictureUser = (e) => {

        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            var b1 = e.target.files[0].name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                //converting the image to base64            
                var b = reader.result;
                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;

                UploadImageUser(image, image_name);

                console.log("Aadhaar Card: " + image_name);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImageUser = async (user_image, image_name) => {

        console.log(image_name);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = user_image;
        list["image_for"] = "USER";

        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);
            setPictureDis(true);
            console.log("imagename");
            var img11 = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/USER/" + response.data.image_name;
            console.log(response.data.image_name);
            if (image_name === "user_photo") {

                setUserAddInput({
                    ...UserAddInput,
                    ["user_photo"]: response.data.image_name,

                });
                setImgDivC(true);
                setImgData(img11);
            }
        }).catch(error => {
            console.log(error);
        })

    }

    //Remove images
    const Removeimagefront = (userphoto) => {
        // alert(propertycoverimage);
        setUserAddInput({ ...UserAddInput, [userphoto]: "" });
        setPictureDis(false);
    }

    const onChangePicture = (e) => {
        setPictureDis(true);
        console.log(e.target.name);
        if (e.target.files[0]) {

            setPicture(e.target.files[0]);
            var b = e.target.files[0].name;
            const reader = new FileReader();
            reader.addEventListener("load", () => {

                var b = reader.result;

                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;
                UploadImage(image, image_name);
                console.log("User Photo");
            });
            reader.readAsDataURL(e.target.files[0]);

        }
    };

    const UploadImage = async (image, image_name) => {

        console.log(image_name);

        console.log("UPload image api");

        var list = {};
        list["image_base64_string"] = image;
        list["image_for"] = "USER";

        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);
            setPictureDis(true);
            console.log("imagename");
            var img11 = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/USER/" + response.data.image_name;;
            console.log(response.data.image_name);
            if (image_name === "user_photo1") {

                setUserAddInput({
                    ...UserAddInput,
                    ["user_photo"]: response.data.image_name,
                });
                setImgDivC(true);
                setImgData(img11);
            }
        }).catch(error => {
            console.log(error);
        })

    }

    const OnSubmitUser = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        // setErrors(UserValidation(UserAddInput));
        // var errorcount = Object.keys(UserValidation(UserAddInput)).length;
        // if (errorcount === 0) {
        if (user_user_id === "") {
            await axios.post(process.env.REACT_APP_API + "UserAdd", {
                "user_first_name": user_first_name,
                "user_last_name": user_last_name,
                "user_user_name": user_user_name,
                "user_password": user_password,
                "user_email": user_email,
                "user_gender": user_gender,
                "user_shift": user_shift,
                "user_time_schedule_from": user_time_schedule_from,
                "user_time_schedule_to": user_time_schedule_to,
                "user_branch_id": user_branch_id,
                "user_emergency_number": user_emergency_number,
                "user_mobile_number": user_mobile_number,
                "user_aadhar_number": user_aadhar_number,
                "user_monthly_salary": user_monthly_salary,
                "user_date_of_birth": user_date_of_birth,
                "user_address": user_address,
                "user_type": "STAFF",
                "user_pincode": user_pincode,
                "user_photo": user_photo
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/userlist`);
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
        else {
            await axios.post(process.env.REACT_APP_API + "UserUpdate", {
                "user_user_id": user_user_id,
                "user_first_name": user_first_name,
                "user_last_name": user_last_name,
                "user_user_name": user_user_name,
                "user_password": user_password,
                "user_email": user_email,
                "user_gender": user_gender,
                "user_shift": user_shift,
                "user_time_schedule_from": user_time_schedule_from,
                "user_time_schedule_to": user_time_schedule_to,
                "user_branch_id": user_branch_id,
                "user_emergency_number": user_emergency_number,
                "user_mobile_number": user_mobile_number,
                "user_aadhar_number": user_aadhar_number,
                "user_monthly_salary": user_monthly_salary,
                "user_date_of_birth": user_date_of_birth,
                "user_address": user_address,
                "user_type": "STAFF",
                "user_pincode": user_pincode,
                "user_photo": user_photo
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/userlist`);
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
        // }
        // else {
        //     setDisableButton(false);
        //     document.getElementById("img_gif_loading_btn").style.display = "none";
        // }
    }

    const LoadUserDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["user_user_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "UserDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    setPicture(true);
                    var UserDetails = [], BirthDate, Time;
                    if (response.data.user_details !== null) {
                        if (response.data.user_details.user_date_of_birth !== null) {
                            var date = response.data.user_details.user_date_of_birth
                            BirthDate = date.substring(0, 10);
                        }
                        else {
                            BirthDate = response.data.user_details.user_date_of_birth;
                        }

                        setPictureDis(true);
                        setUserAddInput({
                            "user_first_name": response.data.user_details.user_first_name,
                            "user_last_name": response.data.user_details.user_last_name,
                            "user_user_name": response.data.user_details.user_user_name,
                            "user_password": response.data.user_details.user_password,
                            "user_email": response.data.user_details.user_email,
                            "user_gender": response.data.user_details.user_gender,
                            "user_shift": response.data.user_details.user_shift,
                            "user_time_schedule_from": response.data.user_details.user_time_schedule_from,
                            "user_time_schedule_to": response.data.user_details.user_time_schedule_to,
                            "user_branch_id": response.data.user_details.user_branch_id,
                            "branch_name": response.data.user_details.branch_name,
                            "user_emergency_number": response.data.user_details.user_emergency_number,
                            "user_mobile_number": response.data.user_details.user_mobile_number,
                            "user_aadhar_number": response.data.user_details.user_aadhar_number,
                            "user_monthly_salary": response.data.user_details.user_monthly_salary,
                            "user_date_of_birth": BirthDate,
                            "user_address": response.data.user_details.user_address,
                            "user_type": response.data.user_details.user_type,
                            "user_pincode": response.data.user_details.user_pincode,
                            "user_photo": response.data.user_details.user_photo
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
        LoadUserDetails();
        GetDropDown();
    }, []);
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                {props.location.pfid != null ? <h4>Update Staff</h4>
                                    :
                                    <h4>Add New Staff</h4>
                                }
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitUser(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>First Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter First Name' required="required"
                                                    name='user_first_name'
                                                    value={user_first_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Last Name</CLabel>
                                                <CInput type='text' placeholder='Enter Last Name' required="required"
                                                    name='user_last_name'
                                                    value={user_last_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>User Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter User Name' required="required"
                                                    name='user_user_name'
                                                    value={user_user_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Password</CLabel><span className="red">*</span>
                                                <CInput type='password' placeholder='Enter Password' required="required"
                                                    name='user_password'
                                                    value={user_password}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>E-Mail</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter E-Mail' required="required"
                                                    name='user_email'
                                                    value={user_email}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Gender</CLabel><span className="red">*</span>
                                                <CSelect name='user_gender' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Gender</option>
                                                    <option selected={user_gender === "Male"} value="Male">Male</option>
                                                    <option selected={user_gender === "Female"} value="Female">Female</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Work Shift</CLabel><span className="red">*</span>
                                                <CSelect name='user_shift' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Shift</option>
                                                    <option selected={user_shift === "Morning"} value="Morning">Morning</option>
                                                    <option selected={user_shift === "Afternoon"} value="Afternoon">Afternoon</option>
                                                    <option selected={user_shift === "Night"} value="Night">Night</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Time Shcedule From</CLabel><span className="red">*</span>
                                                <CSelect name='user_time_schedule_from' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Time</option>
                                                    <option selected={user_time_schedule_from === "06:00 am"} value="06:00 am">06:00 am</option>
                                                    <option selected={user_time_schedule_from === "06:30 am"} value="06:30 am">06:30 am</option>
                                                    <option selected={user_time_schedule_from === "07:00 am"} value="07:00 am">07:00 am</option>
                                                    <option selected={user_time_schedule_from === "07:30 am"} value="07:30 am">07:30 am</option>
                                                    <option selected={user_time_schedule_from === "08:00 am"} value="08:00 am">08:00 am</option>
                                                    <option selected={user_time_schedule_from === "08:30 am"} value="08:30 am">08:30 am</option>
                                                    <option selected={user_time_schedule_from === "09:00 am"} value="09:00 am">09:00 am</option>
                                                    <option selected={user_time_schedule_from === "09:30 am"} value="09:30 am">09:30 am</option>
                                                    <option selected={user_time_schedule_from === "10:00 am"} value="10:00 am">10:00 am</option>
                                                    <option selected={user_time_schedule_from === "10:30 am"} value="10:30 am">10:30 am</option>
                                                    <option selected={user_time_schedule_from === "11:00 am"} value="11:00 am">11:00 am</option>
                                                    <option selected={user_time_schedule_from === "11:30 am"} value="11:30 am">11:30 am</option>
                                                    <option selected={user_time_schedule_from === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                    <option selected={user_time_schedule_from === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                    <option selected={user_time_schedule_from === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                    <option selected={user_time_schedule_from === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                    <option selected={user_time_schedule_from === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                    <option selected={user_time_schedule_from === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                    <option selected={user_time_schedule_from === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                    <option selected={user_time_schedule_from === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                    <option selected={user_time_schedule_from === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                    <option selected={user_time_schedule_from === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                    <option selected={user_time_schedule_from === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                    <option selected={user_time_schedule_from === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                    <option selected={user_time_schedule_from === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                    <option selected={user_time_schedule_from === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                    <option selected={user_time_schedule_from === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                    <option selected={user_time_schedule_from === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                    <option selected={user_time_schedule_from === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                    <option selected={user_time_schedule_from === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                    <option selected={user_time_schedule_from === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                    <option selected={user_time_schedule_from === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                    <option selected={user_time_schedule_from === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                    <option selected={user_time_schedule_from === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Time Shcedule To</CLabel><span className="red">*</span>
                                                <CSelect name="user_time_schedule_to" onChange={(e) => OnInputChange(e)} custom>
                                                    <option >Select Time</option>
                                                    <option selected={user_time_schedule_to === "06:00 am"} value="06:00 am">06:00 am</option>
                                                    <option selected={user_time_schedule_to === "06:30 am"} value="06:30 am">06:30 am</option>
                                                    <option selected={user_time_schedule_to === "07:00 am"} value="07:00 am">07:00 am</option>
                                                    <option selected={user_time_schedule_to === "07:30 am"} value="07:30 am">07:30 am</option>
                                                    <option selected={user_time_schedule_to === "08:00 am"} value="08:00 am">08:00 am</option>
                                                    <option selected={user_time_schedule_to === "08:30 am"} value="08:30 am">08:30 am</option>
                                                    <option selected={user_time_schedule_to === "09:00 am"} value="09:00 am">09:00 am</option>
                                                    <option selected={user_time_schedule_to === "09:30 am"} value="09:30 am">09:30 am</option>
                                                    <option selected={user_time_schedule_to === "10:00 am"} value="10:00 am">10:00 am</option>
                                                    <option selected={user_time_schedule_to === "10:30 am"} value="10:30 am">10:30 am</option>
                                                    <option selected={user_time_schedule_to === "11:00 am"} value="11:00 am">11:00 am</option>
                                                    <option selected={user_time_schedule_to === "11:30 am"} value="11:30 am">11:30 am</option>
                                                    <option selected={user_time_schedule_to === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                    <option selected={user_time_schedule_to === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                    <option selected={user_time_schedule_to === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                    <option selected={user_time_schedule_to === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                    <option selected={user_time_schedule_to === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                    <option selected={user_time_schedule_to === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                    <option selected={user_time_schedule_to === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                    <option selected={user_time_schedule_to === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                    <option selected={user_time_schedule_to === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                    <option selected={user_time_schedule_to === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                    <option selected={user_time_schedule_to === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                    <option selected={user_time_schedule_to === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                    <option selected={user_time_schedule_to === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                    <option selected={user_time_schedule_to === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                    <option selected={user_time_schedule_to === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                    <option selected={user_time_schedule_to === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                    <option selected={user_time_schedule_to === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                    <option selected={user_time_schedule_to === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                    <option selected={user_time_schedule_to === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                    <option selected={user_time_schedule_to === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                    <option selected={user_time_schedule_to === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                    <option selected={user_time_schedule_to === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Work Place</CLabel><span className="red">*</span>
                                                <Select value={BranchDropdowns.filter(function (option) {
                                                    return option.value === user_branch_id;
                                                })}
                                                    options={BranchDropdowns}
                                                    onChange={(e) => onChangedropdown(e, "user_branch_id")}>
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Emergency No</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Emergency No' required="required"
                                                    name='user_emergency_number'
                                                    value={user_emergency_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Phone No</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Phone No' required="required"
                                                    name='user_mobile_number'
                                                    value={user_mobile_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Aadhaar No</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Aadhaar No' required="required"
                                                    name='user_aadhar_number'
                                                    value={user_aadhar_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        {/* <CCol xs="12" sm="3" md="3" lg="3">
                            <CFormGroup>
                                <CLabel>User Type</CLabel><span className="red">*</span>
                                <CSelect onChange={(e) => OnInputChange(e)} name='user_type' custom>
                                    <option>Select Type</option>
                                    <option selected={user_type === "ADMIN"} value="ADMIN">ADMIN</option>
                                    <option selected={user_type === "USER"} value="USER">USER</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol> */}

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Monthly Salary</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Monthly Salary' required="required"
                                                    name='user_monthly_salary'
                                                    value={user_monthly_salary}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Date of Birth</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Enter Date of Birth' required="required"
                                                    name='user_date_of_birth'
                                                    value={user_date_of_birth}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>


                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Address</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Address' required="required"
                                                    name='user_address'
                                                    value={user_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Pin Code</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Pin Code' required="required"
                                                    name='user_pincode'
                                                    value={user_pincode}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="4" >
                                            <CFormGroup>
                                                <CLabel className="red">Photo Size :"width: "100%", height: "150px"</CLabel>
                                                <div className="div " style={{ fontSize: "15px", fontWeight: "" }}>
                                                    Upload Photo
                                                    <CInput type="file" className="hide-file"
                                                        name="user_photo1"
                                                        onChange={(e) => onChangePicture(e)}
                                                    ></CInput>
                                                </div>
                                                {PictureDis ? <div>
                                                    <div className=" table-responsive my-table mt-5">
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/USER/" + user_photo}
                                                            style={{ width: "100%", height: "150px", marginTop: "", float: "", paddingRight: "" }}
                                                        />
                                                    </div>
                                                    <CFormGroup>
                                                        <CButton className="bgcolor white ml-1 mt-1"
                                                            onClick={() => Removeimagefront("user_photo")}
                                                        ><i className="fa fa-close"></i></CButton>
                                                    </CFormGroup>
                                                </div> : null
                                                    // <div>
                                                    // <div className=" table-responsive my-table mt-5">
                                                    //     <img className="playerProfilePic_home_tile "
                                                    //         src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + user_photo}
                                                    //         style={{ width: "100%", height: "150px", marginTop: "", float: "", paddingRight: "" }}
                                                    //     />
                                                    // </div>
                                                    // <CFormGroup>
                                                    //     <CButton className="bgcolor white ml-1 mt-1"
                                                    //         onClick={() => Removeimagefront("user_photo")}
                                                    //     ><i className="fa fa-close"></i></CButton>
                                                    // </CFormGroup>
                                                    // </div>
                                                }
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <div className="bgcolor" style={{ borderRadius: "5px" }}>
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
            </div >
        </>
    )
}
export default AddNewStaff;