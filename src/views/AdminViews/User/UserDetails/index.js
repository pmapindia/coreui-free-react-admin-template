import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const UserDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var userid = searchParams.get("userid");

    const [UserDetails, setUserDetails] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadUserDetails = async () => {
        var list = {};
        list["user_user_id"] = userid;

        await axios.post(process.env.REACT_APP_API + "UserDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var UserDetails = [], BirthDate, Time;
                if (response.data.user_details !== null) {
                    if (response.data.user_details.user_date_of_birth !== null) {
                        var date = response.data.user_details.user_date_of_birth
                        BirthDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        BirthDate = response.data.user_details.user_date_of_birth;
                    }


                    setUserDetails({
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
                        "user_document": response.data.user_details.user_document
                    });
                }
                else {
                    setUserDetails({});
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadUserDetails();
    }, []);

    const documentopen = (documentnamne) => {
        console.log(documentnamne);
        var str = documentnamne.replace(/"/g, "");
        console.log(str);
        const url = process.env.REACT_APP_DOCUMENTPATH + cookies.unique_code + "/USER_DOCUMENT/" + str;
        console.log(url);
        window.open(url, '_blank');
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h3>User Details</h3>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>USER DETAILS</th>
                                        </tr>
                                        <tr className='bgcolor1' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>FIRST NAME</td>
                                            <td>LAST NAME</td>
                                            <td>USER NAME</td>
                                            <td>PASSWORD</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{UserDetails.user_first_name}</td>
                                            <td>{UserDetails.user_last_name}</td>
                                            <td>{UserDetails.user_user_name}</td>
                                            <td>{UserDetails.user_password}</td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>EMAIL ADDRESS</td>
                                            <td>GENDER</td>
                                            <td>TYPE</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{UserDetails.user_email}</td>
                                            <td>{UserDetails.user_gender}</td>
                                            <td>{UserDetails.user_type}</td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>DATE OF BIRTH</td>
                                            <td colSpan={1}>ADDRESS</td>
                                            <td>PIN CODE</td>
                                            <td colSpan={1}>USER DOCUMENT</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{UserDetails.user_date_of_birth}</td>
                                            <td colSpan={1}>{UserDetails.user_address}</td>
                                            <td>{UserDetails.user_pincode}</td>
                                            <td><CButton 
                                                onClick={() => documentopen(UserDetails.user_document)}
                                            >
                                                {UserDetails.user_document}</CButton>
                                                
                                            </td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>MOBILE NUM</td>
                                            <td>EMERGENCY NUM</td>
                                            <td>AADHAAR NUM</td>
                                            <td>BRANCH NAME</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{UserDetails.user_mobile_number}</td>
                                            <td>{UserDetails.user_emergency_number}</td>
                                            <td>{UserDetails.user_aadhar_number}</td>
                                            <td>{UserDetails.branch_name}</td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>WORKING SHIFT</td>
                                            <td>SCHEDULE TIME</td>
                                            <td>SALARY</td>
                                            <td>PHOTO</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{UserDetails.user_shift}</td>
                                            <td>{UserDetails.user_time_schedule_from} - {UserDetails.user_time_schedule_to}</td>
                                            <td>{UserDetails.user_monthly_salary}</td>
                                            <td>
                                                {/* <div className=" table-responsive my-table"> */}
                                                {UserDetails.user_photo !== null || UserDetails.user_photo !== "" ?
                                                    < img className="playerProfilePic_home_tile "
                                                        src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/User/" + UserDetails.user_photo}
                                                        style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                                    />
                                                    : null
                                                }
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )

}
export default UserDetails;
