import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import EnquiryFollowUpModal from '../../Modals/EnquiryFollowUpModal';
import TrailsUpdateStatusModal from '../../Trails/TrailsUpdateStatusModal';

const CustomerDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var custid = searchParams.get("custid");

    const [CustomerDetails, setCustomerDetails] = useState({});
    const [EnquiriesList, setEnquiriesList] = useState([]);
    const [TrailList, setTrailList] = useState([]);

    const [DisEnqyiry, setDisEnqyiry] = useState(false);
    const [DisTrails, setDisTrails] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadCustomerDetails = async () => {
        var list = {};
        list["customer_id"] = custid;

        await axios.post(process.env.REACT_APP_API + "CustomerDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var Trails = [], BirthDate, Time;
                var newdate, time, Time, meridiemTime, LoginDate;
                if (response.data.customer_details !== null) {
                    if (response.data.customer_details.customer_date_of_birth !== null) {
                        var date = response.data.customer_details.customer_date_of_birth
                        BirthDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        BirthDate = response.data.customer_details.customer_date_of_birth;
                    }

                    if (response.data.customer_details.member_last_login_date !== null) {
                        var date = response.data.customer_details.member_last_login_date;
                        LoginDate = date.substring(0, 10).split('-').reverse().join('-');
                        Time = date.substring(11, 17);

                        time = Time.split(':');// here the time is like "16:14"
                        meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';

                    }
                    else {
                        LoginDate = "";
                        meridiemTime = ""
                    }

                    setCustomerDetails({
                        "customer_id": response.data.customer_details.customer_id,
                        "customer_branch_id": response.data.customer_details.customer_branch_id,
                        "branch_name": response.data.customer_details.branch_name,
                        "customer_first_name": response.data.customer_details.customer_first_name,
                        "customer_last_name": response.data.customer_details.customer_last_name,
                        "customer_mobile_number": response.data.customer_details.customer_mobile_number,
                        "customer_password": response.data.customer_details.customer_password,
                        "customer_alternative_mobile": response.data.customer_details.customer_alternative_mobile,
                        "customer_email_address": response.data.customer_details.customer_email_address,
                        "customer_address": response.data.customer_details.customer_address,
                        "member_last_login_date": LoginDate + " " + meridiemTime,
                        "customer_gender": response.data.customer_details.customer_gender,
                        "customer_photo": response.data.customer_details.customer_photo,
                        "customer_referral_code": response.data.customer_details.customer_referral_code,
                        "member_reward_points": response.data.customer_details.member_reward_points,
                        "customer_date_of_birth": BirthDate,
                        "customer_referred_by": response.data.customer_details.customer_referred_name,
                        "source_name": response.data.customer_details.source_name
                    });
                }

                if (response.data.enquiry_list !== null) {
                    setEnquiriesList(response.data.enquiry_list);
                    if (response.data.enquiry_list.length !== 0) {
                        setDisEnqyiry(true);
                    }
                    else {
                        setDisEnqyiry(false);
                    }
                }

                var TrailSDate, TrailEDate, TrailSTime, TrailETime, Time, time;
                if (response.data.trial_list !== null) {

                    if (response.data.trial_list.length !== 0) {
                        setDisTrails(true);
                    }
                    else {
                        setDisTrails(false);
                    }
                    for (let x = 0; x < response.data.trial_list.length; x++) {

                        if (response.data.trial_list[x].trial_start_date !== null) {
                            var date = response.data.trial_list[x].trial_start_date;
                            TrailSDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            TrailSDate = response.data.trial_list[x].trial_start_date;
                        }

                        if (response.data.trial_list[x].trial_end_date !== null) {
                            var date = response.data.trial_list[x].trial_end_date;
                            TrailEDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            TrailEDate = response.data.trial_list[x].trial_end_date;
                        }


                        if (response.data.trial_list[x].trial_start_time !== null) {
                            Time = response.data.trial_list[x].trial_start_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            TrailSTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            TrailSTime = response.data.trial_list[x].trial_start_time;
                        }

                        if (response.data.trial_list[x].trial_end_time !== null) {
                            Time = response.data.trial_list[x].trial_end_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            TrailETime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            TrailETime = response.data.trial_list[x].trial_end_time;
                        }

                        Trails.push({
                            "trial_id": response.data.trial_list[x].trial_id,
                            "branch_name": response.data.trial_list[x].branch_name,
                            "trial_customer_id": response.data.trial_list[x].trial_customer_id,
                            "customer_first_name": response.data.trial_list[x].customer_first_name,
                            "customer_mobile_number": response.data.trial_list[x].customer_mobile_number,
                            "customer_email_address": response.data.trial_list[x].customer_email_address,
                            "customer_address": response.data.trial_list[x].customer_address,
                            "customer_photo": response.data.trial_list[x].customer_photo,
                            "trainer_name": response.data.trial_list[x].trainer_name,
                            "product_name": response.data.trial_list[x].product_name,
                            "trial_start_date": TrailSDate,
                            "trial_start_time": TrailSTime,
                            "trial_end_date": TrailEDate,
                            "trial_end_time": TrailETime,
                            "trial_status_text": response.data.trial_list[x].trial_status_text
                        })
                    }
                    setTrailList(Trails);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadCustomerDetails();
    }, []);
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Customer Details</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>CUSTOMER DETAILS</th>
                                        </tr>
                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>BRANCH</td>
                                            <td>FIRST NAME</td>
                                            <td>LAST NAME</td>
                                            <td>PASSWORD</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{CustomerDetails.branch_name}</td>
                                            <td>{CustomerDetails.customer_first_name}</td>
                                            <td>{CustomerDetails.customer_last_name}</td>
                                            <td>{CustomerDetails.customer_password}</td>
                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td >LAST LOGIN</td>
                                            <td >EMAIL ADDRESS</td>
                                            <td>GENDER</td>
                                            <td>DATE OF BIRTH</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td >{CustomerDetails.member_last_login_date}</td>
                                            <td >{CustomerDetails.customer_email_address}</td>
                                            <td>{CustomerDetails.customer_gender}</td>
                                            <td>{CustomerDetails.customer_date_of_birth}</td>

                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>ADDRESS</td>
                                            <td>MOBILE NUM</td>
                                            <td>EMERGENCY NUM</td>
                                            <td>REWARD POINTS</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{CustomerDetails.customer_address}</td>
                                            <td>{CustomerDetails.customer_mobile_number}</td>
                                            <td>{CustomerDetails.customer_alternative_mobile}</td>
                                            <td>{CustomerDetails.member_reward_points}</td>
                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>REFERRAL CODE</td>
                                            <td>REFERRAL BY</td>
                                            <td>SOURCE</td>
                                            <td>PHOTO</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{CustomerDetails.customer_referral_code}</td>
                                            <td>{CustomerDetails.customer_referred_by}</td>
                                            <td>{CustomerDetails.source_name}</td>
                                            <td>
                                                {CustomerDetails.customer_photo !== "" || CustomerDetails.customer_photo !== null ?
                                                    <img className="playerProfilePic_home_tile "
                                                        src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + CustomerDetails.customer_photo}
                                                        style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                                    />
                                                    : null
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                {DisEnqyiry ?
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px", borderColor: "#3256a8", borderWidth: "1px" }}>
                                <CCardBody>
                                    {/* <h5>Enquiry List</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} /> */}

                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "14px" }}>ENQUIRY LIST</th>
                                                    </tr>
                                                    <tr className=' white' style={{ backgroundColor: "#38acec" }}>
                                                        <td>Source</td>
                                                        <td>Type</td>
                                                        <td>Next FollowUp Date</td>
                                                        <td>Joining Date</td>
                                                        <td>Status Text</td>
                                                        <td>Current Status</td>
                                                        <td>Comments</td>
                                                        <td>Follow Up</td>
                                                    </tr>
                                                    {EnquiriesList.map((EnquiryList, index) => (
                                                        <tr key={index}>
                                                            <td>{EnquiryList.source_name}</td>
                                                            <td>{EnquiryList.enquiry_type_name}</td>
                                                            {EnquiryList.enquiry_next_follow_up_date !== null ?
                                                                <td>{EnquiryList.enquiry_next_follow_up_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                : <td></td>
                                                            }

                                                            {EnquiryList.enquiry_joining_date !== null ?
                                                                <td>{EnquiryList.enquiry_joining_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                : <td></td>
                                                            }
                                                            <td>{EnquiryList.enquiry_status_text}</td>
                                                            <td>{EnquiryList.enquiry_current_status}</td>
                                                            <td>{EnquiryList.enquiry_comments}</td>
                                                            <td >
                                                                {EnquiryList.enquiry_current_status === "CONVERTED" ?
                                                                    null
                                                                    :
                                                                    <EnquiryFollowUpModal
                                                                        enquiry_id={EnquiryList.enquiry_id}
                                                                    />
                                                                }
                                                            </td>
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
                    :
                    null}

                {DisTrails ?
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px", borderColor: "#738055", borderWidth: "1px" }}>
                                <CCardBody>
                                    {/* <h5>Trail List</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} /> */}
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "14px" }}>TRIAL LIST</th>
                                                    </tr>
                                                    <tr className=' white' style={{ backgroundColor: "#38acec" }}>
                                                        <td>Branch</td>
                                                        <td>Trainer Name</td>
                                                        <td>Product Name</td>
                                                        <td>Start Date</td>
                                                        <td>Start Time</td>
                                                        <td>End Date</td>
                                                        <td>End Time</td>
                                                        <td>Status Text</td>
                                                        <td>Update Status</td>
                                                    </tr>
                                                    {TrailList.map((TrailList, index) => (
                                                        <tr key={index}>
                                                            <td>{TrailList.branch_name}</td>
                                                            <td>{TrailList.trainer_name}</td>
                                                            <td>{TrailList.product_name}</td>
                                                            <td>{TrailList.trial_start_date}</td>
                                                            <td>{TrailList.trial_start_time}</td>
                                                            <td>{TrailList.trial_end_date}</td>
                                                            <td>{TrailList.trial_end_time}</td>
                                                            <td>{TrailList.trial_status_text}</td>
                                                            <td>
                                                                <TrailsUpdateStatusModal
                                                                    trial_id={TrailList.trial_id}
                                                                />
                                                            </td>
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
                    :
                    null}
            </div>
        </>
    )

}
export default CustomerDetails;
