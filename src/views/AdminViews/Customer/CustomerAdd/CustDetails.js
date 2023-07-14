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

const CustomerDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var custid = searchParams.get("custid");

    const [CustomerDetails, setCustomerDetails] = useState({});

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
                var CustomerDetails = [], BirthDate, Time;
                if (response.data.customer_details !== null) {
                    if (response.data.customer_details.customer_date_of_birth !== null) {
                        var date = response.data.customer_details.customer_date_of_birth
                        BirthDate = date.substring(0, 10);
                    }
                    else {
                        BirthDate = response.data.customer_details.customer_date_of_birth;
                    }

                    setCustomerDetails({
                        "customer_id": response.data.customer_details.customer_id,
                        "customer_branch_id": response.data.customer_details.customer_branch_id,
                        "customer_first_name": response.data.customer_details.customer_first_name,
                        "customer_last_name": response.data.customer_details.customer_last_name,
                        "customer_mobile_number": response.data.customer_details.customer_mobile_number,
                        "customer_password": response.data.customer_details.customer_password,
                        "customer_alternative_mobile": response.data.customer_details.customer_alternative_mobile,
                        "customer_email_address": response.data.customer_details.customer_email_address,
                        "customer_address": response.data.customer_details.customer_address,
                        "customer_gender": response.data.customer_details.customer_gender,
                        "customer_photo": response.data.customer_details.customer_photo,
                        "customer_date_of_birth": BirthDate,
                        "customer_referred_by": response.data.customer_details.customer_referred_by,
                        "customer_source_id": response.data.customer_details.customer_source_id
                    });
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
                        <CCard>
                            <CCardBody>
                                <h4>Customer Details</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='bgcolor' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "17px" }}>CUSTOMER DETAILS</th>
                                        </tr>
                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
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

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>EMAIL ADDRESS</td>
                                            <td>GENDER</td>
                                            <td>DATE OF BIRTH</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{CustomerDetails.customer_email_address}</td>
                                            <td>{CustomerDetails.customer_gender}</td>
                                            <td>{CustomerDetails.customer_date_of_birth}</td>
                                        </tr>

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>ADDRESS</td>
                                            <td>MOBILE NUM</td>
                                            <td>EMERGENCY NUM</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{CustomerDetails.customer_address}</td>
                                            <td>{CustomerDetails.customer_mobile_number}</td>
                                            <td>{CustomerDetails.customer_alternative_mobile}</td>
                                        </tr>

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>REFERRAL CODE</td>
                                            <td>REFERRAL BY</td>
                                            <td>SOURCE</td>
                                            <td>PHOTO</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{CustomerDetails.customer_referral_code}</td>
                                            <td>{CustomerDetails.customer_referred_by}</td>
                                            <td>{CustomerDetails.customer_source_id}</td>
                                            <td>
                                                <img className="playerProfilePic_home_tile "
                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + CustomerDetails.customer_photo}
                                                    style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                                />
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
export default CustomerDetails;
