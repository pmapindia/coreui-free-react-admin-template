import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const EnquiryDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var enqid = searchParams.get("enqid");




    const [MemberDetails, setMemberDetails] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadMemberDetails = async () => {
        var list = {};
        list["enquiry_id"] = enqid;

        await axios.post(process.env.REACT_APP_API + "EnquiryDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var followDate, joiningDate, LoginDate, CreatedAt, UpdatedAt;
                var newdate, time, Time, meridiemTime;
                if (response.data.enquiry_details !== null) {
                    if (response.data.enquiry_details.enquiry_next_follow_up_date !== null) {
                        var date = response.data.enquiry_details.enquiry_next_follow_up_date
                        followDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        followDate = "";
                    }

                    if (response.data.enquiry_details.enquiry_joining_date !== null) {
                        var date = response.data.enquiry_details.enquiry_joining_date;
                        joiningDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        joiningDate = "";
                    }

                    // if (response.data.enquiry_details.member_last_login_date !== null) {
                    //     var date = response.data.enquiry_details.member_last_login_date;
                    //     LoginDate = date.substring(0, 10);
                    //     Time = date.substring(11, 17);

                    //     time = Time.split(':');// here the time is like "16:14"
                    //     meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';

                    // }
                    // else {
                    //     LoginDate = "";
                    //     meridiemTime = ""
                    // }

                    // if (response.data.enquiry_details.member_created_at !== null) {
                    //     var date = response.data.enquiry_details.member_created_at;
                    //     CreatedAt = date.substring(0, 10);
                    // }
                    // else {
                    //     CreatedAt = "";
                    // }

                    // if (response.data.enquiry_details.member_updated_at !== null) {
                    //     var date = response.data.enquiry_details.member_updated_at;
                    //     UpdatedAt = date.substring(0, 10);
                    // }
                    // else {
                    //     UpdatedAt = "";
                    // }
                    setMemberDetails({
                        "enquiry_id": response.data.enquiry_details.enquiry_id,
                        "enquiry_branch_id": response.data.enquiry_details.enquiry_branch_id,
                        "branch_name": response.data.enquiry_details.branch_name,
                        "enquiry_customer_id": response.data.enquiry_details.enquiry_customer_id,
                        "customer_first_name": response.data.enquiry_details.customer_first_name,
                        "customer_last_name": response.data.enquiry_details.customer_last_name,
                        "enquiry_source_id": response.data.enquiry_details.enquiry_source_id,
                        "source_name": response.data.enquiry_details.source_name,
                        "enquiry_type_id": response.data.enquiry_details.enquiry_type_id,
                        "enquiry_type_name": response.data.enquiry_details.enquiry_type_name,
                        "enquiry_comments": response.data.enquiry_details.enquiry_comments,
                        "enquiry_next_follow_up_date": followDate,
                        "enquiry_joining_date": joiningDate,
                        "enquiry_current_status": response.data.enquiry_details.enquiry_current_status,
                        "customer_photo": response.data.enquiry_details.customer_photo,


                        // "customer_email_address": response.data.enquiry_details.customer_email_address,
                        // "customer_address": response.data.enquiry_details.customer_address,

                        // "member_is_postpaid": response.data.enquiry_detailsenquiry_details.member_is_postpaid,
                        // "member_postpaid_id": response.data.enquiry_details.member_postpaid_id,
                        // "member_product_id": response.data.enquiry_details.member_product_id,
                        // "product_name": response.data.enquiry_details.product_name,
                        // "member_product_start_date": StartDate,
                        // "member_product_end_date": EndDate,
                        // "member_batch_id": response.data.enquiry_details.member_batch_id,
                        // "member_in_time": response.data.enquiry_details.member_in_time,
                        // "member_out_time": response.data.enquiry_details.member_out_time,
                        // "member_last_login_date": LoginDate + " " + meridiemTime,
                        // "member_remarks": response.data.enquiry_details.member_remarks,
                        // "member_created_at": "2023-07-18T21:54:12.4579762-07:00",
                        // "member_created_by": response.data.enquiry_details.member_created_by,
                        // "created_user_name": response.data.enquiry_details.created_user_name,
                        // "member_updated_at": "2023-07-18T21:54:12.4579762-07:00",
                        // "member_updated_by": response.data.enquiry_details.member_updated_by,
                        // "updated_user_name": response.data.enquiry_details.updated_user_name
                    })
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
                    <CCard style={{ borderRadius: "10px", backgroundColor: "white" }}>
                        <CCardBody>
                            <h4 style={{ color: "#1a8cff" }}>Enquiry Details</h4>
                            <hr className="bgcolor" style={{ height: "2px" }} />
                            <CRow>
                                {/* <CCol xs="12" sm="3" md="3" lg="3">

                                </CCol> */}

                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody style={{ color: "black" }}>
                                            <CRow>

                                                <CCol xs="12" sm="1" md="1" lg="1">
                                                    {MemberDetails.customer_photo !== "" ?
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                            //src={process.env.PUBLIC_URL + '/avatars/img.jpg'}
                                                            style={{ width: "70px", height: "70px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                        />
                                                        :
                                                        <img className="playerProfilePic_home_tile "
                                                            //src={MemberDetails.customer_photo}
                                                            src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                            style={{ width: "70px", height: "70px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                        />
                                                    }
                                                </CCol>
                                                <CCol xs="12" sm="8" md="8" lg="8" className="mt-2 ml-4">
                                                    <h6 style={{ color: "black", }}>
                                                        {MemberDetails.customer_first_name} {MemberDetails.customer_last_name}

                                                    </h6>
                                                    <h6 style={{ color: "grey" }}> {MemberDetails.enquiry_current_status}</h6>
                                                </CCol>

                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                    {/* <h5 className='text-center'><u>Member Information</u></h5> */}
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody style={{ color: "black" }}>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <h6 style={{ color: "grey" }}>First Name </h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <h6 style={{ color: "grey" }}>Last Name</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <h6 style={{ color: "black", }}>
                                                        {MemberDetails.customer_first_name}
                                                    </h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <h6 style={{ color: "black", }}>
                                                        {MemberDetails.customer_last_name}
                                                    </h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                    <h6 style={{ color: "grey" }}>Branch</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">

                                                    <h6 style={{ color: "grey" }}>Source Name</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                    <h6 style={{ color: "black" }}> {MemberDetails.branch_name}</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">

                                                    <h6 style={{ color: "black" }}>{MemberDetails.source_name}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                    <h6 style={{ color: "grey" }}>Type</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">

                                                    <h6 style={{ color: "grey" }}>Comments</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                    <h6 style={{ color: "black" }}> {MemberDetails.enquiry_type_name}</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">

                                                    <h6 style={{ color: "black" }}>{MemberDetails.enquiry_comments}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                    <h6 style={{ color: "grey" }}>FollowUp Date</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">

                                                    <h6 style={{ color: "grey" }}>Joining Date</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                    <h6 style={{ color: "black" }}> {MemberDetails.enquiry_next_follow_up_date}</h6>

                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">

                                                    <h6 style={{ color: "black" }}>{MemberDetails.enquiry_joining_date}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="">
                                                </CCol>

                                            </CRow>
                                        </CCardBody>
                                    </CCard>

                                    {/* <h6><img className="playerProfilePic_home_tile "
                                                src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                                style={{ width: "15px", height: "15px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            /> &nbsp; {MemberDetails.customer_mobile_number}</h6>
                                            <h6><img className="playerProfilePic_home_tile "
                                                src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                                style={{ width: "17px", height: "17px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            /> {MemberDetails.customer_email_address}</h6> */}
                                    {/* <h6 >Address: {MemberDetails.customer_address}</h6>
                                            <h6 >Gender: {MemberDetails.customer_address}</h6>
                                            <h6 >Date of Birth: {MemberDetails.customer_address}</h6>
                                            <h6 >Referred By: {MemberDetails.customer_address}</h6>
                                            <h6 >Created By: {MemberDetails.customer_address}</h6> */}

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
export default EnquiryDetails;