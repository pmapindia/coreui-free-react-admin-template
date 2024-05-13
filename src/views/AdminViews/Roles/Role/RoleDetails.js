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
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const RoleDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var roleid = searchParams.get("roleid");

    const [RoleDetails, setRoleDetails] = useState({});
    const [AccessControl, setAccessControl] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadRoleDetails = async () => {
        var list = {};
        list["role_id"] = roleid;

        await axios.post(process.env.REACT_APP_API + "RoleDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.role_details !== null) {
                    setRoleDetails(response.data.role_details);
                }

                if (response.data.role_feature_assigned_list !== null) {
                    setAccessControl(response.data.role_feature_assigned_list);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadRoleDetails();
    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_DETAILS) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h3>Role Details</h3>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th colSpan={1} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "13px" }}>ROLE DETAILS</th>
                                                        </tr>
                                                        <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                            <td>ROLE NAME</td>
                                                        </tr>
                                                        <tr style={{ textAlign: "center", color: "black" }}>
                                                            <td >{RoleDetails.role_name}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </CCol>
                                            <CCol xs="12" sm="8" md="8" lg="8">
                                                <table className="table table-bordered table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <th colSpan={2} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "13px" }}>ACCESS CONTROL DETAILS</th>
                                                        </tr>
                                                        <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                            <td> NAME</td>
                                                            <td> YES/NO</td>
                                                        </tr>
                                                        {AccessControl.map((List, index) => (
                                                            <tr style={{ textAlign: "", color: "black", fontWeight: "bold" }}>
                                                                <td>{List.assigned_feature_name}</td>
                                                                {List.assigned_control === true ?
                                                                    <td style={{ color: "green" }}>YES</td>
                                                                    :
                                                                    <td style={{ color: "red" }}>NO</td>
                                                                }
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
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}

export default RoleDetails;