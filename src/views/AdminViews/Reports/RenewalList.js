import { CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex, cilCheckCircle, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin,
    cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale,
} from '@coreui/icons'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import MembershipRenewalModal from '../Modals/RenewMembershipModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const PostpaidBillReport = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [disablebutton, setDisableButton] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        branch_id: ""
    });

    const {
        from_date,
        to_date,
        branch_id
    } = ListInput;

    var todays_date

    useEffect(() => {
        if (ListInput.from_date === "" && ListInput.to_date === "") {
            var todaysdate = new Date();
            todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
            setListInput({ ...ListInput, ["from_date"]: todays_date, ["to_date"]: todays_date });
            //console.log(todays_date);
        }
    }, [ListInput.from_date === ""], [ListInput.to_date === ""]);

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
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

        setListInput({ ...ListInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const [RenewalList, setRenewalList] = useState([]);

    const MemberRenewalList = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        setRenewalList([]);
        await axios.post(process.env.REACT_APP_API + "MemberRenewalList", {
            "from_date": from_date,
            "to_date": to_date,
            "branch_id": branch_id
        }, config).then(response => {
            console.log(response);
            var Lists = [], StartDate, StartDate1, EndDate, EndDate1, LastLoginDate;
            var time, Time, meridiemTime;
            if (response.data.is_success) {
                if (response.data.member_renewal_list !== null) {
                    setLoading(true);
                    for (let x = 0; x < response.data.member_renewal_list.length; x++) {
                        if (response.data.member_renewal_list[x].member_product_start_date !== null) {
                            var date = response.data.member_renewal_list[x].member_product_start_date
                            StartDate = date.substring(0, 10).split('-').reverse().join('-');
                            StartDate1 = date.substring(0, 10)
                        }
                        else {
                            StartDate = response.data.member_renewal_list[x].member_product_start_date
                            StartDate1 = response.data.member_renewal_list[x].member_product_start_date
                        }
                        if (response.data.member_renewal_list[x].member_product_end_date !== null) {
                            var date = response.data.member_renewal_list[x].member_product_end_date
                            EndDate = date.substring(0, 10).split('-').reverse().join('-');
                            EndDate1 = date.substring(0, 10);
                        }
                        else {
                            EndDate = response.data.member_renewal_list[x].member_product_end_date
                            EndDate1 = ""
                        }

                        if (response.data.member_renewal_list[x].member_last_login_date !== null) {
                            var date = response.data.member_renewal_list[x].member_last_login_date;
                            LastLoginDate = date.substring(0, 10).split('-').reverse().join('-');
                            Time = date.substring(11, 17);
                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            LastLoginDate = "";
                            meridiemTime = "";
                        }

                        var startDate = StartDate1;
                        var endDate = EndDate1

                        var diffInMs = new Date(endDate) - new Date(startDate)
                        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                        console.log("Remaining:" + diffInDays);

                        Lists.push({
                            "member_id": response.data.member_renewal_list[x].member_id,
                            "member_customer_id": response.data.member_renewal_list[x].member_customer_id,
                            "customer_name": response.data.member_renewal_list[x].customer_name,
                            "customer_photo": response.data.member_renewal_list[x].customer_photo,
                            "customer_mobile_number": response.data.member_renewal_list[x].customer_mobile_number,
                            "customer_email_address": response.data.member_renewal_list[x].customer_email_address,
                            "member_product_id": response.data.member_renewal_list[x].member_product_id,
                            "product_name": response.data.member_renewal_list[x].product_name,
                            "member_product_start_date": StartDate,
                            "member_product_end_date": EndDate,
                            "no_of_days_left": diffInDays,
                            "member_batch_id": response.data.member_renewal_list[x].member_batch_id,
                            "batch_name": response.data.member_renewal_list[x].batch_name,
                            "member_in_time": response.data.member_renewal_list[x].member_in_time,
                            "member_out_time": response.data.member_renewal_list[x].member_out_time,
                            "member_last_login_date": LastLoginDate + " " + meridiemTime
                        })
                    }
                }
                setRenewalList(Lists)
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                setLoading(false);
                setRenewalList([]);
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

    const MemberRenewalLists = async () => {
        setWarnings({ ["warning"]: "" });
        setRenewalList([]);
        await axios.post(process.env.REACT_APP_API + "MemberRenewalList", {
            "from_date": from_date,
            "to_date": to_date,
            "branch_id": branch_id
        }, config).then(response => {
            console.log(response);
            var Lists = [], StartDate, StartDate1, EndDate, EndDate1, LastLoginDate;
            var time, Time, meridiemTime;
            if (response.data.is_success) {
                if (response.data.member_renewal_list !== null) {
                    setLoading(true);
                    for (let x = 0; x < response.data.member_renewal_list.length; x++) {
                        if (response.data.member_renewal_list[x].member_product_start_date !== null) {
                            var date = response.data.member_renewal_list[x].member_product_start_date
                            StartDate = date.substring(0, 10).split('-').reverse().join('-');
                            StartDate1 = date.substring(0, 10)
                        }
                        else {
                            StartDate = response.data.member_renewal_list[x].member_product_start_date
                            StartDate1 = response.data.member_renewal_list[x].member_product_start_date
                        }
                        if (response.data.member_renewal_list[x].member_product_end_date !== null) {
                            var date = response.data.member_renewal_list[x].member_product_end_date
                            EndDate = date.substring(0, 10).split('-').reverse().join('-');
                            EndDate1 = date.substring(0, 10);
                        }
                        else {
                            EndDate = response.data.member_renewal_list[x].member_product_end_date
                            EndDate1 = ""
                        }

                        if (response.data.member_renewal_list[x].member_last_login_date !== null) {
                            var date = response.data.member_renewal_list[x].member_last_login_date;
                            LastLoginDate = date.substring(0, 10).split('-').reverse().join('-');
                            Time = date.substring(11, 17);
                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            LastLoginDate = "";
                            meridiemTime = "";
                        }

                        var startDate = StartDate1;
                        var endDate = EndDate1

                        var diffInMs = new Date(endDate) - new Date(startDate)
                        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                        console.log("Remaining:" + diffInDays);

                        Lists.push({
                            "member_id": response.data.member_renewal_list[x].member_id,
                            "member_customer_id": response.data.member_renewal_list[x].member_customer_id,
                            "customer_name": response.data.member_renewal_list[x].customer_name,
                            "customer_photo": response.data.member_renewal_list[x].customer_photo,
                            "customer_mobile_number": response.data.member_renewal_list[x].customer_mobile_number,
                            "customer_email_address": response.data.member_renewal_list[x].customer_email_address,
                            "member_product_id": response.data.member_renewal_list[x].member_product_id,
                            "product_name": response.data.member_renewal_list[x].product_name,
                            "member_product_start_date": StartDate,
                            "member_product_end_date": EndDate,
                            "no_of_days_left": diffInDays,
                            "member_batch_id": response.data.member_renewal_list[x].member_batch_id,
                            "batch_name": response.data.member_renewal_list[x].batch_name,
                            "member_in_time": response.data.member_renewal_list[x].member_in_time,
                            "member_out_time": response.data.member_renewal_list[x].member_out_time,
                            "member_last_login_date": LastLoginDate + " " + meridiemTime
                        })
                    }
                }
                setRenewalList(Lists)
            }
            else {
                setLoading(false);
                setRenewalList([]);
                setWarnings({ ["warning"]: response.data.msg });
            }
        }).catch(
            error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (branch_id !== "") {
            MemberRenewalLists();
        }
    }, [branch_id]);
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_RENEWAL_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Renewal List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>From Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter From Date'
                                                        name='from_date'
                                                        value={from_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>To Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter To Date'
                                                        name='to_date'
                                                        value={to_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "branch_id")} required="required">
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                <div className="bgcolor mt-2" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => MemberRenewalList(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
                                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                </div>
                                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                            </CCol>
                                        </CRow>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>

                        {loading ?
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <div className=" my-table table-responsive width100 mt-1">
                                                <table className="table table-bordered-less width100">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th><CIcon icon={cilPeople} name="cil-people" aria-hidden="true" size="lg" className="ml-2" /></th>
                                                            <th>Name</th>
                                                            <th>Mobile No</th>
                                                            <th>Package Name</th>
                                                            <th>Stat Date</th>
                                                            <th>End Date</th>
                                                            <th>Days Left</th>
                                                            {/* <th>Batch</th>
                                                    <th>In Time</th>
                                                    <th>Out Time</th> */}
                                                            <th>Last Login</th>
                                                            <th>Renewal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {RenewalList.map((RenewalList, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {RenewalList.customer_photo !== "" ?
                                                                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "10px", borderColor: "red" }}>
                                                                            {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                                                            <img className="playerProfilePic_home_tile " style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + RenewalList.customer_photo}
                                                                            />
                                                                        </div>
                                                                        :
                                                                        RenewalList.customer_photo == null ?
                                                                            <div style={{ borderRadius: "50%", }}>
                                                                //     {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                                                                <img className="playerProfilePic_home_tile "
                                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                />
                                                                            </div>
                                                                            :
                                                                            <div style={{ borderRadius: "50%", }}>
                                                                                <img className="playerProfilePic_home_tile "
                                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                />
                                                                            </div>
                                                                    }
                                                                </td>
                                                                <td>{RenewalList.customer_name}</td>
                                                                <td>{RenewalList.customer_mobile_number}</td>
                                                                <td>{RenewalList.product_name}</td>
                                                                <td>{RenewalList.member_product_start_date}</td>
                                                                <td>{RenewalList.member_product_end_date}</td>
                                                                {RenewalList.no_of_days_left < 0 ?
                                                                    <td>0 Day</td>
                                                                    : RenewalList.no_of_days_left === 0 ?
                                                                        <td>0 Day</td>
                                                                        : <td>{RenewalList.no_of_days_left} Days</td>
                                                                }
                                                                {/* <td>{RenewalList.batch_name}</td>
                                                        <td>{RenewalList.member_in_time}</td>
                                                        <td>{RenewalList.member_out_time}</td> */}
                                                                <td>{RenewalList.member_last_login_date}</td>
                                                                <td>
                                                                    <MembershipRenewalModal
                                                                        memid={RenewalList.member_id}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                            : null}
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default PostpaidBillReport;