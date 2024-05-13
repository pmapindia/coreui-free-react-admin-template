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


const MemberAttendance = () => {
    const [value, onChange] = useState('10:00');
    // const now = moment();


    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [MemberDropdowns, setMemberDropdowns] = useState([]);

    const [MemberDetails, setMemberDetails] = useState({});
    const format = 'HH:mm:ss';

    const [disablebutton, setDisableButton] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();


    const [AttendanceAddInput, setAttendanceAddInput] = useState({
        att_branch_id: "",
        att_member_id: "",
        att_user_id: 0,
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
                { "dropdown_type": "DD_MEMBER", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setMemberDropdowns(ddlist);
                    }



                }
            }
        }).catch(error => {
            console.log(error);
        })
    }




    const onChangebranchdropdown = (e) => {

        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setAttendanceAddInput({ ...AttendanceAddInput, ["att_branch_id"]: e.value });
    };

    const onChangedropdown = (e) => {

        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setAttendanceAddInput({ ...AttendanceAddInput, ["att_member_id"]: e.value });
        LoadMemberDetails(e.value)

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
                //history.push(`/member-attendance-list`);
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


    const LoadMemberDetails = async (memid) => {
        var list = {};
        list["member_id"] = memid;

        await axios.post(process.env.REACT_APP_API + "MemberDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var StartDate, EndDate, LoginDate, CreatedAt, UpdatedAt;
                var newdate, time, Time, meridiemTime;
                if (response.data.member_details !== null) {
                    if (response.data.member_details.member_product_start_date !== null) {
                        var date = response.data.member_details.member_product_start_date
                        StartDate = date.substring(0, 10);
                    }
                    else {
                        StartDate = "";
                    }

                    if (response.data.member_details.member_product_end_date !== null) {
                        var date = response.data.member_details.member_product_end_date;
                        EndDate = date.substring(0, 10);
                    }
                    else {
                        EndDate = "";
                    }

                    if (response.data.member_details.member_last_login_date !== null) {
                        var date = response.data.member_details.member_last_login_date;
                        LoginDate = date.substring(0, 10).split('-').reverse().join('-');
                        Time = date.substring(11, 17);

                        time = Time.split(':');// here the time is like "16:14"
                        meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';

                    }
                    else {
                        LoginDate = "";
                        meridiemTime = ""
                    }

                    if (response.data.member_details.member_created_at !== null) {
                        var date = response.data.member_details.member_created_at;
                        CreatedAt = date.substring(0, 10);
                    }
                    else {
                        CreatedAt = "";
                    }

                    if (response.data.member_details.member_updated_at !== null) {
                        var date = response.data.member_details.member_updated_at;
                        UpdatedAt = date.substring(0, 10);
                    }
                    else {
                        UpdatedAt = "";
                    }
                    setMemberDetails({
                        "member_id": response.data.member_details.member_id,
                        "member_customer_id": response.data.member_details.member_customer_id,
                        "customer_first_name": response.data.member_details.customer_first_name,
                        "customer_last_name": response.data.member_details.customer_last_name,
                        "customer_mobile_number": response.data.member_details.customer_mobile_number,
                        "customer_email_address": response.data.member_details.customer_email_address,
                        "customer_address": response.data.member_details.customer_address,
                        "customer_photo": response.data.member_details.customer_photo,
                        "member_branch_id": response.data.member_details.member_branch_id,
                        "branch_name": response.data.member_details.branch_name,
                        "member_unique_id": response.data.member_details.member_unique_id,
                        "member_is_postpaid": response.data.member_details.member_is_postpaid,
                        "member_postpaid_id": response.data.member_details.member_postpaid_id,
                        "member_product_id": response.data.member_details.member_product_id,
                        "product_name": response.data.member_details.product_name,
                        "member_product_start_date": StartDate,
                        "member_product_end_date": EndDate,
                        "member_batch_id": response.data.member_details.member_batch_id,
                        "batch_name": response.data.member_details.batch_name,
                        "member_in_time": response.data.member_details.member_in_time,
                        "member_out_time": response.data.member_details.member_out_time,
                        "member_last_login_date": LoginDate + " " + meridiemTime,
                        "member_remarks": response.data.member_details.member_remarks,
                        "member_created_at": "2023-07-18T21:54:12.4579762-07:00",
                        "member_created_by": response.data.member_details.member_created_by,
                        "created_user_name": response.data.member_details.created_user_name,
                        "member_updated_at": "2023-07-18T21:54:12.4579762-07:00",
                        "member_updated_by": response.data.member_details.member_updated_by,
                        "updated_user_name": response.data.member_details.updated_user_name
                    })
                }
            }
            else {
                setMemberDetails({
                    "customer_photo": null
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
        LoadMemberDetails();
        CronGetAttendanceData();
    }, []);

    const CronGetAttendanceData = async () => {

        var unique_code = cookies.unique_code

        await axios.get(process.env.REACT_APP_API + `CronJobGetAttendanceDataFromBiometric?unique_code=${unique_code}`, {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.total_attendance_inserted !== 0) {
                    // setDasboardCount({
                    //   ...DasboardCount,
                    //   ["today_bills"]: response.data._total_bill_generated
                    // });
                }
                else {
                    // setDasboardCount({
                    //   ...DasboardCount,
                    //   ["today_bills"]: response.data._total_bill_generated
                    // });
                }
            }
            else {
                // setDasboardCount({
                //   ...DasboardCount,
                //   ["today_bills"]: response.data._total_bill_generated
                // });
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
            })
    }
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MEMBER_MARK_ATTENDANCE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Member Attendance</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="2" md="2" lg="2"></CCol>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CCard style={{ borderRadius: "20px" }}>
                                                    <CCardBody align=''>
                                                        <h5 className='text-center'><u>Mark Member Attendance</u></h5>

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
                                                                <CLabel>Select Member</CLabel><span className="red">*</span>
                                                                <Select
                                                                    value={MemberDropdowns.filter(function (option) {
                                                                        return option.value === att_member_id;
                                                                    })}
                                                                    options={MemberDropdowns}
                                                                    onChange={(e) => onChangedropdown(e, "att_member_id")}
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
                                                        <h5 className='text-center'><u>Member Details</u></h5>
                                                        {MemberDetails.customer_photo !== null ?
                                                            <img className="playerProfilePic_home_tile "
                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                            : MemberDetails.customer_photo === "" ?
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                                :
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                        }
                                                        <h6 className='text-center mt-2'>Member ID: {MemberDetails.member_unique_id}</h6>
                                                        <h6 className='text-center'>Name: {MemberDetails.customer_first_name} {MemberDetails.customer_last_name}</h6>
                                                        <h6 className='text-center'><i class="fa fa-phone bggreen" aria-hidden="true"></i> &nbsp; {MemberDetails.customer_mobile_number}</h6>
                                                        <h6 className='text-center'>Last Login: {MemberDetails.member_last_login_date} </h6>
                                                        <h6 className='text-center'>Package : {MemberDetails.product_name}</h6>
                                                        <h6 className='text-center'>End Date :{MemberDetails.member_product_end_date} </h6>


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
export default MemberAttendance;