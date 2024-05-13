import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const StaffsList = (props) => {

    const [StaffsList, setStaffsList] = useState([]);

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [currentsize, setCurrentSize] = useState(0);
    const [listcount, setListCount] = useState(0);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadStaffList();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...search_text1, [e.target.name]: "" });
        } else {
            setSearchText({ ...search_text1, [e.target.name]: e.target.value });

        }
        setCurrentSize(0);
        setStaffsList([]);
    }

    const LoadStaffList = async () => {
        var list = {};
        list["user_type"] = "STAFF";
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "UserList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                //toast.success(response.data.msg);
                var UserList = [], DateofBirth;
                if (response.data.user_list !== null) {

                    for (let i = 0; i < response.data.user_list.length; i++) {
                        if (response.data.user_list[i].user_date_of_birth !== null) {
                            var Date = response.data.user_list[i].user_date_of_birth;
                            DateofBirth = Date.substring(0, 10);
                        }
                        else {
                            DateofBirth = response.data.user_list[i].user_date_of_birth;
                        }
                        UserList.push({
                            "user_user_id": response.data.user_list[i].user_user_id,
                            "user_first_name": response.data.user_list[i].user_first_name,
                            "user_last_name": response.data.user_list[i].user_last_name,
                            "user_user_name": response.data.user_list[i].user_user_name,
                            "user_password": response.data.user_list[i].user_password,
                            "user_email": response.data.user_list[i].user_email,
                            "user_gender": response.data.user_list[i].user_gender,
                            "user_shift": response.data.user_list[i].user_shift,
                            "user_time_schedule_from": response.data.user_list[i].user_time_schedule_from,
                            "user_time_schedule_to": response.data.user_list[i].user_time_schedule_to,
                            "user_branch_id": response.data.user_list[i].user_branch_id,
                            "branch_name": response.data.user_list[i].branch_name,
                            "user_emergency_number": response.data.user_list[i].user_emergency_number,
                            "user_mobile_number": response.data.user_list[i].user_mobile_number,
                            "user_aadhar_number": response.data.user_list[i].user_aadhar_number,
                            "user_monthly_salary": response.data.user_list[i].user_monthly_salary,
                            "user_date_of_birth": DateofBirth,
                            "user_address": response.data.user_list[i].user_address,
                            "user_type": response.data.user_list[i].user_type,
                            "user_pincode": response.data.user_list[i].user_pincode,
                            "user_photo": response.data.user_list[i].user_photo
                        });
                    }
                    setStaffsList(UserList);
                }
            }
            else {
                //toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadStaffList();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...StaffsList];
        temp_user.splice(index, 1);
        setStaffsList([]);
        setStaffsList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + StaffsList);
        // console.log("Delete")
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Staff List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
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
                                            <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <Link to={`/addstaff`}
                                                    className="btn bgcolor white width100 " style={{ paddingLeft: "4px", textAlign: "center", backgroundColor: "#3b3f4b" }}>
                                                    Add New Staff
                                                </Link>
                                            </CCol>
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <div className=" my-table table-responsive width100 mt-2">
                                                    <table className="table table-bordered-less width100">
                                                        <thead>
                                                            <tr>
                                                                <th>Sl No</th>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>User Name</th>
                                                                <th>Mobile Number</th>
                                                                <th>Email Id</th>
                                                                {/* <th>Date_of_Birth</th>
                                            <th>Gender</th>
                                            <th>Adress</th> */}
                                                                <th>Type</th>
                                                                <th>Branch</th>
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_EDIT) ?
                                                                        <th>Edit</th>
                                                                        : null
                                                                }

                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_DELETE) ?
                                                                        <th>Delete</th>
                                                                        : null
                                                                }

                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_DETAILS) ?
                                                                        <th>Details</th>
                                                                        : null
                                                                }


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {StaffsList.map((List, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{List.user_first_name}</td>
                                                                    <td>{List.user_last_name}</td>
                                                                    <td>{List.user_user_name}</td>
                                                                    <td>{List.user_mobile_number}</td>
                                                                    <td>{List.user_email}</td>
                                                                    {/* <td>{List.user_date_of_birth}</td>
                                                <td>{List.user_gender}</td>
                                                <td>{List.user_address}</td> */}
                                                                    <td>{List.user_type}</td>
                                                                    <td>{List.branch_name}</td>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_EDIT) ?
                                                                            <td>
                                                                                <Link to={{
                                                                                    pathname: '/addstaff',
                                                                                    pfid: {
                                                                                        pfid: List.user_user_id
                                                                                    }
                                                                                }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                                    </i>
                                                                                </Link>
                                                                            </td>
                                                                            : null
                                                                    }

                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_DELETE) ?
                                                                            <td>
                                                                                <DeleteModal delete_guid={List.user_user_id}
                                                                                    name={List.user_first_name}
                                                                                    index={index}
                                                                                    apiname={"UserDelete"}
                                                                                    guidinput={"user_user_id"}
                                                                                    changeDependency={Parentvaluetomodal}
                                                                                />
                                                                            </td>
                                                                            : null
                                                                    }

                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_STAFF_DETAILS) ?
                                                                            <td>
                                                                                <Link to={`/staff-details?staffid=${List.user_user_id}`}
                                                                                    className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                                    Details
                                                                                </Link>
                                                                            </td>
                                                                            : null
                                                                    }
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
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
export default StaffsList;