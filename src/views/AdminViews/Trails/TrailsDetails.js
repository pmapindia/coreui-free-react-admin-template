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

const TrailDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const searchParams = new URLSearchParams(location.search);

    var trialid = searchParams.get("trialid");

    const [TrailDetails, setTrailDetails] = useState({});

    const LoadTrailDetails = async () => {
        var list = {};
        list["trial_id"] = trialid;

        await axios.post(process.env.REACT_APP_API + "CustomerTrialsDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var StartDate, EndDate, Start_Time, End_Time;
                var newdate, time, Time, meridiemTime;
                if (response.data.details !== null) {
                    if (response.data.details.trial_start_date !== null) {
                        var date = response.data.details.trial_start_date
                        StartDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        StartDate = response.data.details.trial_start_date;
                    }

                    if (response.data.details.trial_end_date !== null) {
                        var date = response.data.details.trial_end_date;
                        EndDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        EndDate = response.data.details.trial_end_date;
                    }

                    if (response.data.details.trial_start_time !== null) {
                        Time = response.data.details.trial_start_time.substring(0, 5);

                        time = Time.split(':');// here the time is like "16:14"
                        Start_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                    }
                    else {
                        Start_Time = response.data.details.trial_start_time;
                    }

                    if (response.data.details.trial_end_time !== null) {
                        Time = response.data.details.trial_end_time.substring(0, 5);

                        time = Time.split(':');// here the time is like "16:14"
                        End_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                    }
                    else {
                        End_Time = response.data.details.trial_end_time;
                    }

                    setTrailDetails({
                        "trial_id": response.data.details.trial_id,
                        "trial_branch_id": response.data.details.trial_branch_id,
                        "branch_name": response.data.details.branch_name,
                        "trial_customer_id": response.data.details.trial_customer_id,
                        "customer_first_name": response.data.details.customer_first_name,
                        "customer_mobile_number": response.data.details.customer_mobile_number,
                        "customer_email_address": response.data.details.customer_email_address,
                        "customer_address": response.data.details.customer_address,
                        "customer_photo": response.data.details.customer_photo,
                        "trial_assigned_user_id": response.data.details.trial_assigned_user_id,
                        "trianer_name": response.data.details.trianer_name,
                        "trial_product_id": response.data.details.trial_product_id,
                        "product_name": response.data.details.product_name,
                        "trial_start_date": StartDate,
                        "trial_start_time": Start_Time,
                        "trial_end_date": EndDate,
                        "trial_end_time": End_Time,
                        "trial_status_text": response.data.details.trial_status_text,
                        "trial_remarks": response.data.details.trial_remarks,
                        "trial_created_at": response.data.details.trial_created_at,
                        "trial_created_by": response.data.details.trial_created_by,
                        "created_user_name": response.data.details.created_user_name
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
        LoadTrailDetails();
    }, []);

    return (
        <><div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
            <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                    <CCard style={{ borderRadius: "10px", backgroundColor: "white" }}>
                        <CCardBody>
                            <h4 >Trial Details</h4>
                            <hr className="bgcolor" style={{ height: "2px" }} />
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody style={{ color: "black" }}>
                                            <CRow>

                                                <CCol xs="12" sm="1" md="1" lg="1">
                                                    {TrailDetails.customer_photo !== "" ?
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + TrailDetails.customer_photo}
                                                            //src={process.env.PUBLIC_URL + '/avatars/img.jpg'}
                                                            style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                        />
                                                        : TrailDetails.customer_photo === null ?

                                                            <img className="playerProfilePic_home_tile "
                                                                //src={TrailDetails.customer_photo}
                                                                src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                            :
                                                            <img className="playerProfilePic_home_tile "
                                                                //src={TrailDetails.customer_photo}
                                                                src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                    }
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="ml-4 mt-2">
                                                    <h5 style={{ color: "black", fontWeight: "bold" }}>{TrailDetails.customer_first_name}</h5>
                                                    <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                                        src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                                        style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                    /> {TrailDetails.customer_mobile_number}</h6>
                                                    <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                                        src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                                        style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                    /> {TrailDetails.customer_email_address}</h6>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="ml-4 mt-2">
                                                    <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Address: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {TrailDetails.customer_address}</CLabel><br />
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="ml-4 mt-2">
                                                    <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Remarks: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {TrailDetails.trial_remarks}</CLabel><br />
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody style={{ color: "black" }}>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Branch</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Package Name</h6>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Trainer Name</h6>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Status</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.branch_name}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.product_name}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trianer_name}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trial_status_text}</h6>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody style={{ color: "black" }}>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Start Date</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>Start Time</h6>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>End Date</h6>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <h6 style={{ color: "grey" }}>End Time</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trial_start_date}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trial_start_time}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trial_end_date}</h6>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <h6 style={{ color: "black" }}>{TrailDetails.trial_end_time}</h6>
                                                </CCol>
                                            </CRow>
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
export default TrailDetails;