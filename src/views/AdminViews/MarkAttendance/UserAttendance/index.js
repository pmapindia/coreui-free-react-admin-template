import { CForm, CFormGroup, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const UserAttendance = () => {
    const [value, onChange] = useState('10:00');
    // const now = moment();


    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [UserDropdowns, setUserDropdowns] = useState([]);

    const [UserDetails, setUserDetails] = useState({});
    const format = 'HH:mm:ss';

    const [disablebutton, setDisableButton] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();


    const [AttendanceAddInput, setAttendanceAddInput] = useState({
        att_branch_id: "",
        att_member_id: 0,
        att_user_id: "",
        att_login_date: "",
        att_login_time: "",
    });

    const {
        att_branch_id,
        att_member_id,
        att_user_id,
        att_login_date,
        att_login_time
    } = AttendanceAddInput;



    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_USER", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_USER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setUserDropdowns(ddlist);
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

        setAttendanceAddInput({ ...AttendanceAddInput, ["att_user_id"]: e.value });
        LoadUserDetails(e.value)
    };


    const onChangebranchdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setAttendanceAddInput({ ...AttendanceAddInput, ["att_branch_id"]: e.value });
    };


    function onChangeEnd(value) {
        console.log("inputElend");
        if (value != null) {

            console.log(value.format(format));
            setAttendanceAddInput({ ...AttendanceAddInput, ["att_login_time"]: value.format(format) });

            console.log(value && value.format(format));
            console.log(value);

        }
    }

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setAttendanceAddInput({ ...AttendanceAddInput, [e.target.name]: e.target.value });
    }


    const OnSubmitAttendance = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";

        await axios.post(process.env.REACT_APP_API + "AttendanceAdd", {
            "att_branch_id": att_branch_id,
            "att_member_id": att_member_id,
            "att_user_id": att_user_id,
            "att_login_date": att_login_date,
            "att_login_time": att_login_time
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                window.location.reload(true);
                //history.push(`/user-attendance-list`);
                // setDisableButton(false);
                // document.getElementById("img_gif_loading_btn").style.display = "none";
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


    const LoadUserDetails = async (uid) => {
        var list = {};
        list["user_user_id"] = uid;

        await axios.post(process.env.REACT_APP_API + "UserDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var StartDate, EndDate, LoginDate, CreatedAt, UpdatedAt;
                var newdate, time, Time, BirthDate, Time;
                ;
                if (response.data.user_details !== null) {
                    if (response.data.user_details !== null) {
                        if (response.data.user_details.user_date_of_birth !== null) {
                            var date = response.data.user_details.user_date_of_birth
                            BirthDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            BirthDate = response.data.user_details.user_date_of_birth;
                        }

                    }




                    setUserDetails({
                        "user_user_id": response.data.user_details.user_user_id,
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
                        "user_photo": response.data.user_details.user_photo,

                    })
                }
            }
            else {
                setUserDetails({
                    "user_photo": null
                });
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        console.log("moment()");

        console.log(moment().format("hh:mm:ss"));
        var todaysdate = new Date();


        var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);

        setAttendanceAddInput({
            ...AttendanceAddInput, ["att_login_date"]: todays_date,
            ["att_login_time"]: moment().format(format)
        });

        GetDropDown();
        LoadUserDetails();
    }, []);
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_CUSTOMER_MARK_ATTENDANCE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>User Attendance</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="2" md="2" lg="2"></CCol>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CCard style={{ borderRadius: "20px" }}>
                                                    <CCardBody align=''>
                                                        <h5 className='text-center'><u>Mark User Attendance</u></h5>

                                                        <CCol xs="12" sm="12" md="12" lg="12" className="mt-4">
                                                            <CFormGroup>
                                                                <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                                <Select
                                                                    value={BranchDropdowns.filter(function (option) {
                                                                        return option.value === att_branch_id;
                                                                    })}
                                                                    options={BranchDropdowns}
                                                                    onChange={(e) => onChangebranchdropdown(e, "att_branch_id")}
                                                                    required="required">
                                                                </Select>
                                                            </CFormGroup>
                                                        </CCol>

                                                        <CCol xs="12" sm="12" md="12" lg="12" className="mt-4">
                                                            <CFormGroup>
                                                                <CLabel>Select User</CLabel><span className="red">*</span>
                                                                <Select
                                                                    value={UserDropdowns.filter(function (option) {
                                                                        return option.value === att_user_id;
                                                                    })}
                                                                    options={UserDropdowns}
                                                                    onChange={(e) => onChangedropdown(e, "att_user_id")}
                                                                    required="required">
                                                                </Select>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <CFormGroup>
                                                                <CLabel>Date</CLabel><span className="red">*</span>
                                                                <CInput type='date'
                                                                    placeholder='Enter Date'
                                                                    name='att_login_date'
                                                                    value={att_login_date}
                                                                    onChange={(e) => OnInputChange(e)}
                                                                />
                                                            </CFormGroup>
                                                        </CCol>
                                                        {/* <CCol xs="12" sm="12" md="12" lg="12">
                                            <CFormGroup>
                                                <CLabel>Date</CLabel><span className="red">*</span>
                                                <CInput type='time'
                                                    placeholder='Enter Date of Birth'
                                                    name='att_login_date'
                                                    value={att_login_date}
                                                 //   onChange={(e) => OnInputChange(e)}
                                                />
                                                    

                                            </CFormGroup>
                                            
                                        </CCol> */}
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <CLabel>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</CLabel>

                                                            <TimePicker
                                                                placeholder="Select Time"

                                                                showSecond={false}
                                                                inputIcon
                                                                focusOnOpen={true}
                                                                // defaultValue={now}

                                                                name="att_login_time"
                                                                //  format={format}
                                                                defaultValue={moment()}

                                                                onChange={onChangeEnd}

                                                            //onChange={e => setTime(e.format('LT'))}
                                                            //onChange={(e)=>OnStartInputChange(e)}

                                                            />
                                                        </CCol>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                                <CButton id="gene" onClick={(e) => OnSubmitAttendance(e)} style={{ width: "100%", color: "white" }} disabled={disablebutton}>Submit</CButton>
                                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                            </div>
                                                        </CCol>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CCard style={{ borderRadius: "20px" }}>
                                                    <CCardBody align='center'>
                                                        <h5 className='text-center'><u>User Details</u></h5>
                                                        {UserDetails.user_photo !== null ?
                                                            <img className="playerProfilePic_home_tile "
                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + UserDetails.user_photo}
                                                                style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                            :
                                                            <img className="playerProfilePic_home_tile "
                                                                src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                        }
                                                        <h6 className='text-center'>Name: {UserDetails.user_first_name} {UserDetails.customer_last_name}</h6>
                                                        <h6 className='text-center'><i class="fa fa-envelope-o bggreen" aria-hidden="true"></i> &nbsp; {UserDetails.user_email}</h6>

                                                        <h6 className='text-center'><i class="fa fa-phone bggreen" aria-hidden="true"></i> &nbsp; {UserDetails.user_mobile_number}</h6>

                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default UserAttendance;