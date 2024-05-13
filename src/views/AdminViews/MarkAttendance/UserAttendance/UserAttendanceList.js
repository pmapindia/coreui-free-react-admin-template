import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody, } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import axios from 'axios';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { CButtonGroup, CCardFooter, CProgress, } from '@coreui/react-pro';
import { CTable, CTableRow, CAvatar, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from '@coreui/react-pro';
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import {
    cibCcAmex, cilCheckCircle, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin,
    cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale,
} from '@coreui/icons'
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const UserAttendanceList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [UserDropdowns, setUserDropdowns] = useState([]);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [disablebutton, setDisableButton] = useState(false);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        user_user_id: "",
        branch_id: ""
    });

    const {
        from_date,
        to_date,
        user_user_id,
        branch_id
    } = ListInput;

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [UserLists, setUserLists] = useState([]);

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadAllUserList();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["user_user_id"]: e.value });
    };

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...search_text1, [e.target.name]: "" });
        } else {
            setSearchText({ ...search_text1, [e.target.name]: e.target.value });

        }
        setUserLists([]);
    }

    var img;

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_USER", "dropdown_filter": "" },
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);


                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_USER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setUserDropdowns(ddlist);
                    }

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

    const onChangedropdownBranch = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setListInput({ ...ListInput, ["branch_id"]: e.value });
    };

    const LoadAllUserLists = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        var list = {};
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["user_user_id"] = user_user_id;
        list["branch_id"] = branch_id;
        await axios.post(process.env.REACT_APP_API + "AttendanceListOfUser", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var MemList = [];
                var newdate, time, Time, meridiemTime;
                if (response.data.batches_list !== null) {

                    for (let i = 0; i < response.data.attendance_user_list.length; i++) {
                        if (response.data.attendance_user_list[i].att_login_date !== null) {
                            var date = response.data.attendance_user_list[i].att_login_date;
                            newdate = date.substring(0, 10).split('-').reverse().join('-');
                            Time = date.substring(11, 17);

                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                            //console.log("time:"+meridiemTime);
                        }
                        else {
                            newdate = "";
                            meridiemTime = ""
                        }
                        img = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + response.data.attendance_user_list[i].customer_photo;
                        MemList.push({
                            "att_id": response.data.attendance_user_list[i].att_id,
                            "att_branch_id": response.data.attendance_user_list[i].att_branch_id,
                            "branch_name": response.data.attendance_user_list[i].branch_name,
                            "att_user_id": response.data.attendance_user_list[i].att_user_id,
                            "user_user_name": response.data.attendance_user_list[i].user_user_name,

                            "user_photo": response.data.attendance_user_list[i].user_photo,
                            "att_login_date": newdate,
                            "att_login_time": response.data.attendance_user_list[i].att_login_time,




                        });
                    }
                    //setUserLists(response.data.batches_list)
                    setUserLists(MemList);

                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    setUserLists([]);
                }
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                //toast.error(response.data.msg);
            }
        }).catch(
            error => {
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                console.log(error);
                alert(error.message);
            })
    }

    const LoadAllUserList = async () => {

        setWarnings({ ["warning"]: "" });
        var list = {};
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["user_user_id"] = user_user_id;
        list["branch_id"] = branch_id;
        await axios.post(process.env.REACT_APP_API + "AttendanceListOfUser", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var MemList = [];
                var newdate, time, Time, meridiemTime;
                if (response.data.batches_list !== null) {

                    for (let i = 0; i < response.data.attendance_user_list.length; i++) {
                        if (response.data.attendance_user_list[i].att_login_date !== null) {
                            var date = response.data.attendance_user_list[i].att_login_date;
                            newdate = date.substring(0, 10).split('-').reverse().join('-');
                            Time = date.substring(11, 17);

                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                            //console.log("time:"+meridiemTime);
                        }
                        else {
                            newdate = "";
                            meridiemTime = ""
                        }
                        img = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + response.data.attendance_user_list[i].customer_photo;
                        MemList.push({
                            "att_id": response.data.attendance_user_list[i].att_id,
                            "att_branch_id": response.data.attendance_user_list[i].att_branch_id,
                            "branch_name": response.data.attendance_user_list[i].branch_name,
                            "att_user_id": response.data.attendance_user_list[i].att_user_id,
                            "user_user_name": response.data.attendance_user_list[i].user_user_name,

                            "user_photo": response.data.attendance_user_list[i].user_photo,
                            "att_login_date": newdate,
                            "att_login_time": response.data.attendance_user_list[i].att_login_time,
                        });
                    }
                    //setUserLists(response.data.batches_list)
                    setUserLists(MemList);

                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setUserLists([]);
                }
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                //toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        if(user_user_id!==""){
            LoadAllUserList();
        }
    }, [user_user_id]);

    useEffect(() => {
        if(branch_id!==""){
            LoadAllUserList();
        }
    }, [branch_id]);

    useEffect(() => {
        GetDropDown();

        var todaysdate = new Date();


        var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);

        setListInput({
            ...ListInput, ["from_date"]: todays_date,
            ["to_date"]: todays_date,
        });


    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_CUSTOMER_ATTENDANCE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>User Attendance Report</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <CFormGroup>
                                                    <CLabel>From Date</CLabel><span className="red">*</span>
                                                    <CInput type='date'
                                                        placeholder='Enter From Date'
                                                        name='from_date'
                                                        value={from_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <CFormGroup>
                                                    <CLabel>To Date</CLabel><span className="red">*</span>
                                                    <CInput type='date'
                                                        placeholder='Enter To Date'
                                                        name='to_date'
                                                        value={to_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <CFormGroup>
                                                    <CLabel>Select User</CLabel><span className="red">*</span>
                                                    <Select
                                                        value={UserDropdowns.filter(function (option) {
                                                            return option.value === user_user_id;
                                                        })}
                                                        options={UserDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "user_user_id")}
                                                        required="required">
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    <Select
                                                        value={BranchDropdowns.filter(function (option) {
                                                            return option.value === branch_id;
                                                        })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdownBranch(e, "branch_id")}
                                                        required="required">
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                <CFormGroup>
                                                    <div class="inner-addon right-addon">
                                                        <i class="fa fa-search"></i>
                                                        <CInput type="text" style={{ borderRadius: "20px" }}
                                                            placeholder="Search Here..."
                                                            name="search_text"
                                                            value={search_text}
                                                            onChange={(e) => OnInputChangeSearch(e)}
                                                        >
                                                        </CInput>
                                                    </div>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="5" md="5" lg="5" className="mt-2 pt-1">
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => LoadAllUserLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
                                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                </div>
                                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                            </CCol>
                                        </CRow>
                                        <CTable align="middle" className="mb-0 border" hover responsive>
                                            <CTableHead color="light" >
                                                <CTableRow>
                                                    {/* <CTableHeaderCell className="text-center">
                                                <CIcon icon={cilCheckCircle} name="cil-check-circle" aria-hidden="true" size="lg" className="" />
                                            </CTableHeaderCell> */}
                                                    <CTableHeaderCell className="text-center">
                                                        <CIcon icon={cilPeople} name="cil-people" aria-hidden="true" size="lg" className="" />
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>Branch</CTableHeaderCell>
                                                    <CTableHeaderCell >User</CTableHeaderCell>
                                                    <CTableHeaderCell>Login Date</CTableHeaderCell>
                                                    <CTableHeaderCell >Login Time</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {UserLists.map((item, index) => (
                                                    <CTableRow v-for="item in tableItems" key={index}>
                                                        {/* <CTableDataCell className="text-center">
                                                    <CInput type='checkbox' />
                                                </CTableDataCell> */}

                                                        <CTableDataCell className="text-center">
                                                            <div style={{ borderRadius: "50%", }}>
                                                                {item.user_photo !== "" || item.user_photo !== null ?
                                                                    <img className="playerProfilePic_home_tile "
                                                                        src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + item.user_photo}
                                                                        style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                    />
                                                                    :
                                                                    <img className="playerProfilePic_home_tile "
                                                                        src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                        style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                    />
                                                                }
                                                            </div>

                                                        </CTableDataCell>

                                                        <CTableDataCell>
                                                            <div>{item.branch_name}</div>

                                                        </CTableDataCell>

                                                        <CTableDataCell>
                                                            <div>{item.user_user_name}</div>
                                                        </CTableDataCell>



                                                        <CTableDataCell>
                                                            <div>{item.att_login_date}</div>
                                                        </CTableDataCell>


                                                        <CTableDataCell>
                                                            <div>{item.att_login_time}</div>
                                                        </CTableDataCell>



                                                    </CTableRow>
                                                ))}
                                            </CTableBody>
                                        </CTable>
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
export default UserAttendanceList;