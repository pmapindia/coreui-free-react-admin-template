import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea, CCardHeader } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const MemberDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var memid = searchParams.get("memid");

    const [MemberDetails, setMemberDetails] = useState({});
    const [PostDetails, setPostDetails] = useState({});
    const [SalesDetails, setSalesDetails] = useState([]);
    const [BalanceHistory, setBalanceHistory] = useState([]);
    const [PersonalInfo, setPersonalInfo] = useState({});
    const [HealthInfo, setHealthInfo] = useState([]);
    const [KYCDetails, setKYCDetails] = useState([]);
    const [BillList, setBillList] = useState([]);

    const [Post, setPost] = useState(false);
    const [Pre, setPre] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadMemberDetails = async () => {
        var list = {};
        list["member_id"] = memid;

        await axios.post(process.env.REACT_APP_API + "MemberDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var StartDate, StartDate1, EndDate, LoginDate, CreatedAt, UpdatedAt, DOB, HealthValue, HealthList = [];
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
                        LoginDate = date.substring(0, 10);
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

                    if (response.data.member_details.customer_date_of_birth !== null) {
                        var date = response.data.member_details.customer_date_of_birth;
                        DOB = date.substring(0, 10);
                    }
                    else {
                        DOB = "";
                    }

                    if (response.data.member_details.member_is_postpaid === true) {
                        setPost(true);
                        setPre(false)
                    }

                    if (response.data.member_details.member_is_postpaid === false) {
                        setPre(true)
                        setPost(false);
                    }
                    setMemberDetails({
                        "member_id": response.data.member_details.member_id,
                        "member_customer_id": response.data.member_details.member_customer_id,
                        "customer_first_name": response.data.member_details.customer_first_name,
                        "customer_last_name": response.data.member_details.customer_last_name,
                        "customer_mobile_number": response.data.member_details.customer_mobile_number,
                        "customer_email_address": response.data.member_details.customer_email_address,
                        "customer_address": response.data.member_details.customer_address,
                        "customer_gender": response.data.member_details.customer_gender,
                        "customer_photo": response.data.member_details.customer_photo,
                        "customer_date_of_birth": DOB,
                        "customer_referral_code": response.data.member_details.customer_referral_code,
                        "source_name": response.data.member_details.source_name,
                        "primary_goal_name": response.data.member_details.primary_goal_name,
                        "secondary_goal_name": response.data.member_details.secondary_goal_name,
                        "member_branch_id": response.data.member_details.member_branch_id,
                        "branch_name": response.data.member_details.branch_name,
                        "member_unique_id": response.data.member_details.member_unique_id,
                        "member_is_postpaid": response.data.member_details.member_is_postpaid,
                        "member_postpaid_id": response.data.member_details.member_postpaid_id,
                        "member_product_id": response.data.member_details.member_product_id,
                        "product_type": response.data.member_details.product_type,
                        "product_name": response.data.member_details.product_name,
                        "member_product_start_date": StartDate,
                        "member_product_end_date": EndDate,
                        "member_batch_id": response.data.member_details.member_batch_id,
                        "referred_first_name": response.data.member_details.referred_first_name,
                        "referred_second_name": response.data.member_details.referred_second_name,
                        "batch_name": response.data.member_details.batch_name,
                        "member_in_time": response.data.member_details.member_in_time,
                        "member_out_time": response.data.member_details.member_out_time,
                        "member_last_login_date": LoginDate + " " + meridiemTime,
                        "member_remarks": response.data.member_details.member_remarks,
                        "member_created_at": response.data.member_details.member_created_at,
                        "member_created_by": response.data.member_details.member_created_by,
                        "created_user_name": response.data.member_details.created_user_name,
                        "member_updated_at": response.data.member_details.member_updated_at,
                        "member_updated_by": response.data.member_details.member_updated_by,
                        "updated_user_name": response.data.member_details.updated_user_name
                    })
                }
                if (response.data.member_postpaid_details !== null) {
                    if (response.data.member_postpaid_details.postpaid_start_date !== null) {
                        var date = response.data.member_postpaid_details.postpaid_start_date;
                        StartDate1 = date.substring(0, 10);
                    }
                    else {
                        StartDate1 = "";
                    }

                    setPostDetails({
                        "postpaid_advance_amount": response.data.member_postpaid_details.postpaid_advance_amount,
                        "postpaid_start_date": StartDate1,
                        "postpaid_monthly_bill_date": response.data.member_postpaid_details.postpaid_monthly_bill_date,
                        "postpaid_last_due_date_after_bill_date": response.data.member_postpaid_details.postpaid_last_due_date_after_bill_date,
                        "postpaid_monthly_payable_amount": response.data.member_postpaid_details.postpaid_monthly_payable_amount,
                        "postpaid_dues_allowed_for_attendance": response.data.member_postpaid_details.postpaid_dues_allowed_for_attendance,
                        "postpaid_last_bill_date": response.data.member_postpaid_details.postpaid_last_bill_date,
                        "postpaid_next_bill_date": response.data.member_postpaid_details.postpaid_next_bill_date
                    })
                }

                var BillLists = [], fromdate, todate, gendate, duedate;
                if (response.data.postpaid_bill_list !== null) {

                    for (let k = 0; k < response.data.postpaid_bill_list.length; k++) {
                        if (response.data.postpaid_bill_list[k].bill_from_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_from_date;
                            fromdate = date.substring(0, 10);
                        }
                        else {
                            fromdate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_to_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_to_date;
                            todate = date.substring(0, 10);
                        }
                        else {
                            todate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_generated_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_generated_date;
                            gendate = date.substring(0, 10);
                        }
                        else {
                            gendate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_last_due_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_last_due_date;
                            duedate = date.substring(0, 10);
                        }
                        else {
                            duedate = "";
                        }

                        BillLists.push({
                            "bill_id": response.data.postpaid_bill_list[k].bill_id,
                            "bill_member_id": response.data.postpaid_bill_list[k].bill_member_id,
                            "bill_postpaid_id": response.data.postpaid_bill_list[k].bill_postpaid_id,
                            "bill_generated_date": gendate,
                            "bill_amount": response.data.postpaid_bill_list[k].bill_amount,
                            "bill_tax_group_id": response.data.postpaid_bill_list[k].bill_tax_group_id,
                            "tax_group_name": response.data.postpaid_bill_list[k].tax_group_name,
                            "bill_last_due_date": duedate,
                            "bill_from_date": fromdate,
                            "bill_to_date": todate,
                            "bill_filename": response.data.postpaid_bill_list[k].bill_filename,
                            "bill_status_text": response.data.postpaid_bill_list[k].bill_status_text,
                            "bill_created_at": response.data.postpaid_bill_list[k].bill_created_at
                        })
                    }
                    setBillList(BillLists);
                }

                if (response.data.sales_details !== null) {
                    setSalesDetails(response.data.sales_details);
                }

                if (response.data.balance_history_list !== null) {
                    setBalanceHistory(response.data.balance_history_list);
                }

                if (response.data.personal_information_details !== null) {
                    setPersonalInfo(response.data.personal_information_details);
                }

                if (response.data.health_details !== null) {
                    for (let i = 0; i < response.data.health_details.length; i++) {
                        if (response.data.health_details[i].mh_value === true) {
                            HealthValue = "Yes"
                        }
                        if (response.data.health_details[i].mh_value === false) {
                            HealthValue = "No"
                        }
                        else {
                            HealthValue = ""
                        }

                        HealthList.push({
                            "mh_id": response.data.health_details[i].mh_id,
                            "mh_member_id": response.data.health_details[i].mh_member_id,
                            "mh_health_id": response.data.health_details[i].mh_health_id,
                            "health_name": response.data.health_details[i].health_name,
                            "mh_value": HealthValue
                        })
                    };

                    setHealthInfo(HealthList);
                }

                if (response.data.kyc_list !== null) {
                    setKYCDetails(response.data.kyc_list);
                }


            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadMemberDetails();
    }, []);
    return (
        <><div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
            <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                    <CCard style={{ borderRadius: "20px", backgroundColor: "#ced4de" }}>
                        <CCardBody>
                            <h4 align="center" style={{ color: "" }}>Member Details</h4>
                            <hr className="bgcolor" style={{ height: "2px" }} />
                            <CRow>
                                <CCol xs="12" sm="4" md="4" lg="4" align="center">
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "", backgroundColor: "#868c96", padding: "0px", margin: "8px" }}>
                                                {/*<CCardBody> */}
                                                <div classID='btn-primary btn-sm width100 ' style={{ width: "100%", color: "blue", fontSize: "20px ", fontWeight: "bold", fontFamily: "sans-serif", borderWidth: "5px", borderColor: "gray" }}>{MemberDetails.branch_name} Branch</div>
                                                {/* </CCardBody>*/}
                                            </CCard>
                                        </CCol>

                                        <CCol xs="12" sm="12" md="12" lg="12" className="">
                                            <CCard style={{ borderRadius: "20px" }}>
                                                <CCardBody style={{ color: "black" }}>
                                                    <CRow>
                                                        <CCol xs="12" align='center'>
                                                            {MemberDetails.customer_photo !== "" ?
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                    //src={process.env.PUBLIC_URL + '/avatars/img.jpg'}
                                                                    style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                                :
                                                                <img className="playerProfilePic_home_tile "
                                                                    //src={MemberDetails.customer_photo}
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                            }
                                                        </CCol>
                                                    </CRow>
                                                    {/* <h5 className='text-center'><u>Member Information</u></h5> */}

                                                    <CLabel className=' mt-2' style={{ padding: "0px", margin: "0px" }}><h6>Member ID: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_unique_id}</CLabel><br />

                                                    <CLabel style={{ padding: "0px", margin: "0px" }}><h6>Name: &#160;</h6> </CLabel><CLabel> {MemberDetails.customer_first_name} {MemberDetails.customer_last_name}</CLabel><br />

                                                    <CLabel style={{ padding: "0px", margin: "0px" }}><h6><img className="playerProfilePic_home_tile "
                                                        src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                                        style={{ width: "15px", height: "15px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                    /> &nbsp;</h6> </CLabel><CLabel> {MemberDetails.customer_mobile_number}</CLabel><br />

                                                    <CLabel style={{ padding: "0px", margin: "0px" }}><h6><img className="playerProfilePic_home_tile "
                                                        src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                                        style={{ width: "17px", height: "17px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                    /> &nbsp;</h6> </CLabel><CLabel> {MemberDetails.customer_email_address}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Address: &#160;</h6> </CLabel><CLabel> {MemberDetails.customer_address}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Date of Birth: &#160;</h6> </CLabel><CLabel> {MemberDetails.customer_date_of_birth}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Gender: &#160;</h6> </CLabel><CLabel> {MemberDetails.customer_gender}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Referral Code: &#160;</h6> </CLabel><CLabel> {MemberDetails.customer_referral_code}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Source: &#160;</h6> </CLabel><CLabel> {MemberDetails.source_name}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Referred By: &#160;</h6> </CLabel><CLabel> {MemberDetails.referred_first_name} {MemberDetails.referred_second_name}</CLabel><br />

                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6>Last Login: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_last_login_date}</CLabel><br />

                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard align='center' style={{ borderRadius: "20px" }}>
                                                <CCardHeader style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                                    <h5 style={{ fontWeight: "bold" }}>Primary Goal</h5>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <h6>{MemberDetails.primary_goal_name}</h6>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard align='center' style={{ borderRadius: "20px" }}>
                                                <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                                    <h5 style={{ fontWeight: "bold" }}>Secondary Goal</h5>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <h6>{MemberDetails.secondary_goal_name}</h6>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "20px" }}>
                                                <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                                    <h5 style={{ fontWeight: "bold" }}>Personal Information</h5>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Occupation: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_occupation} </CLabel><br />
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Level of Physical Activity: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_level_of_physical_activity}</CLabel><br />
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Stress In Job: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_stress_in_job}</CLabel><br />
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Average Hour's of sleep: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_avg_hours_of_sleep}</CLabel><br />
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Quality of Sleep: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_quality_of_sleep}</CLabel><br />
                                                    <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>Time of Sleep: &#160;</h6> </CLabel><CLabel> {PersonalInfo.info_time_of_sleep}</CLabel><br />
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CCol xs="12" sm="4" md="4" lg="4">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                            <h5 style={{ fontWeight: "bold" }}>Health Information</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                {HealthInfo.map((Info, index) => (
                                                    <CCol xs="12" sm="12" md="12" lg="12">
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px" }}><h6 style={{ fontWeight: "bold" }}>{Info.health_name}: &#160;</h6> </CLabel><CLabel> {Info.mh_value}</CLabel><br />
                                                    </CCol>
                                                ))}
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>


                            <CRow>
                                {Pre ?
                                    <CCol xs="12" sm="1" md="1" lg="1"></CCol>
                                    : null
                                }
                                {Pre ?

                                    <CCol xs="12" sm="5" md="5" lg="5">
                                        <CCard style={{ borderRadius: "20px" }}>
                                            <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                                <h5 style={{ fontWeight: "bold" }}>Package Details</h5>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="12" md="12" lg="12">
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Type: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_type}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Product Name: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_name}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Start Date: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_product_start_date}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>End Date: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_product_end_date}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Batch: &#160;</h6> </CLabel><CLabel> {MemberDetails.batch_name}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>In Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_in_time}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Out Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_out_time}</CLabel><br />
                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Remarks: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_remarks}</CLabel><br />
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    : null}

                                {Post ?
                                    <CCol xs="12" sm="7" md="7" lg="7">
                                        <CCard style={{ borderRadius: "20px" }}>
                                            <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                                <h5 style={{ fontWeight: "bold" }}>Postpaid Details</h5>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="12" md="12" lg="12">
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Advance Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;&#160;{PostDetails.postpaid_advance_amount}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Start date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_start_date}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Bill Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_bill_date}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Last Due Date after Bill Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_last_due_date_after_bill_date}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Monthly Payable Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_payable_amount}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Dues Allowed for Attendance: </CLabel> <CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_dues_allowed_for_attendance}</CLabel><br />
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs="12" sm="12" md="12" lg="12">
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <th colSpan={6} className='bgcolor1' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "12px" }}>Postpaid Bill List</th>
                                                                </tr>
                                                                <tr className='bgcolor white'>
                                                                    <td>Date</td>
                                                                    <td>Amount</td>
                                                                    <td>Tax</td>
                                                                    <td>Last Due Date</td>
                                                                    <td>Bill Date</td>
                                                                    <td>Status</td>
                                                                </tr>
                                                                {BillList.map((Lists, index) => (
                                                                    <tr key={index}>
                                                                        <td>{Lists.bill_generated_date}</td>
                                                                        <td>{Lists.bill_amount}</td>
                                                                        <td>{Lists.tax_group_name}</td>
                                                                        <td>{Lists.bill_last_due_date}</td>
                                                                        <td>{Lists.bill_from_date} to {Lists.bill_to_date}</td>
                                                                        <td>{Lists.bill_status_text}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    : null
                                }

                                <CCol xs="12" sm="5" md="5" lg="5">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardHeader align='center' style={{ borderRadius: "20px", padding: "2px", margin: "0px" }}>
                                            <h5 style={{ fontWeight: "bold" }}>KYC Details</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr className='bgcolor1 white'>
                                                                <td>KYC Name</td>
                                                                <td>KYC Number</td>
                                                                <td>KYC File Name</td>
                                                            </tr>

                                                            {KYCDetails.map((List, index) => (
                                                                <tr key={index}>
                                                                    <td>{List.kyc_name}</td>
                                                                    <td>{List.kyc_number}</td>
                                                                    <td>{List.kyc_filename}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={6} className='bgcolor1' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "12px" }}>Sales Details</th>
                                                    </tr>
                                                    <tr align="center" className='bgcolor fontweight white'>
                                                        <td>#</td>
                                                        <td>Trans ID</td>
                                                        <td>Total Amount</td>
                                                        <td>Paid Amount</td>
                                                        <td>Balance Amount</td>
                                                        <td>Payable Date</td>
                                                    </tr>

                                                    {SalesDetails.map((List, index) => (
                                                        <tr align="center" key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.sale_trans_id}</td>
                                                            <td>{List.sale_total_amount}</td>
                                                            <td>{List.sale_paid_amount}</td>
                                                            <td>{List.sale_balance_amount}</td>
                                                            {List.sale_balance_payable_date !== null ?
                                                                <td>
                                                                    {List.sale_balance_payable_date.substring(0, 10)}
                                                                </td>
                                                                : null
                                                            }
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={5} className='bgcolor1' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "12px" }}>Payment Balance History</th>
                                                    </tr>
                                                    <tr align="center" className='bgcolor fontweight white' >
                                                        <td>Paid Date</td>
                                                        <td>Paid Amount</td>
                                                        <td>Balance Amount</td>
                                                        <td>Remarks</td>
                                                        <td>Received By</td>
                                                    </tr>
                                                    {BalanceHistory.map((history, index) => (
                                                        <tr key={index} style={{ color: "black", textAlign: "center", }}>
                                                            {history.history_paid_date !== null ?
                                                                <td>
                                                                    {history.history_paid_date.substring(0, 10)}
                                                                </td>
                                                                :
                                                                <td>

                                                                </td>
                                                            }
                                                            <td>{history.history_paid_amount}</td>
                                                            <td>{history.history_balance_amount}</td>
                                                            <td>{history.history_remarks}</td>
                                                            <td>{history.user_user_name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
        </>
    )
}
export default MemberDetails;