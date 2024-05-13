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
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const MailConfigurationDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var MailConfigid = searchParams.get("MailConfigid");

    const [MailConfigurationDetails, setMailConfigurationDetails] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadMailConfiDetails = async () => {
        var list = {};
        list["mail_setting_id"] = MailConfigid;

        await axios.post(process.env.REACT_APP_API + "SettingsMailConfigurationDetails", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var CreatedAt, UpdatedAt;
                if (response.data.mail_configuration_details !== null) {
                    if (response.data.mail_configuration_details.mail_setting_created_at !== null) {
                        var date = response.data.mail_configuration_details.mail_setting_created_at
                        CreatedAt = date.substring(0, 10);
                    }
                    else {
                        CreatedAt = response.data.mail_configuration_details.mail_setting_created_at;
                    }

                    if (response.data.mail_configuration_details.mail_setting_updated_at !== null) {
                        var date = response.data.mail_configuration_details.mail_setting_updated_at
                        UpdatedAt = date.substring(0, 10);
                    }
                    else {
                        UpdatedAt = response.data.mail_configuration_details.mail_setting_updated_at;
                    }

                    setMailConfigurationDetails({
                        "mail_setting_id": response.data.mail_configuration_details.mail_setting_id,
                        "mail_setting_branch_id": response.data.mail_configuration_details.mail_setting_branch_id,
                        "branch_name": response.data.mail_configuration_details.branch_name,
                        "mail_setting_host": response.data.mail_configuration_details.mail_setting_host,
                        "mail_setting_port": response.data.mail_configuration_details.mail_setting_port,
                        "mail_setting_is_ssl_enabled": response.data.mail_configuration_details.mail_setting_is_ssl_enabled.toString(),
                        "mail_setting_from_mail_id": response.data.mail_configuration_details.mail_setting_from_mail_id,
                        "mail_setting_from_mail_id_password": response.data.mail_configuration_details.mail_setting_from_mail_id_password,
                        "mail_setting_display_name": response.data.mail_configuration_details.mail_setting_display_name,
                        "mail_setting_cc_mail_id_1": response.data.mail_configuration_details.mail_setting_cc_mail_id_1,
                        "mail_setting_cc_mail_id_2": response.data.mail_configuration_details.mail_setting_cc_mail_id_2,
                        "mail_setting_cc_mail_id_3": response.data.mail_configuration_details.mail_setting_cc_mail_id_3,
                        "mail_setting_cc_mail_id_4": response.data.mail_configuration_details.mail_setting_cc_mail_id_4,
                        "mail_setting_created_at": CreatedAt,
                        "mail_setting_created_by": response.data.mail_configuration_details.mail_setting_created_by,
                        "mail_setting_created_user": response.data.mail_configuration_details.mail_setting_created_user,
                        "mail_setting_updated_at": UpdatedAt,
                        "mail_setting_updated_by": response.data.mail_configuration_details.mail_setting_updated_by,
                        "mail_setting_updated_user": response.data.mail_configuration_details.mail_setting_updated_user
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
        LoadMailConfiDetails();
    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MAIL_DETAILS) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Mail Configuration Details</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={4} className='bgcolor1' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "15px" }}>MAIL CONFIGURATION DETAILS</th>
                                                </tr>

                                                <tr className='bgcolor' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>BRANCH</td>
                                                    <td>FROM MAIL ID</td>
                                                    <td>HOST</td>
                                                    <td>DISPLAY NAME</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{MailConfigurationDetails.branch_name}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_from_mail_id}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_host}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_display_name}</td>
                                                </tr>
                                                <tr className='bgcolor' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>PORT</td>
                                                    <td>SSL ENABLED</td>
                                                    <td colSpan={2}>PASSWORD</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{MailConfigurationDetails.mail_setting_port}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_is_ssl_enabled}</td>
                                                    <td colSpan={2}>{MailConfigurationDetails.mail_setting_from_mail_id_password}</td>
                                                </tr>

                                                <tr className='bgcolor' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td colSpan={2}>CC 1</td>
                                                    <td colSpan={2}>CC 2</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td colSpan={2}>{MailConfigurationDetails.mail_setting_cc_mail_id_1}</td>
                                                    <td colSpan={2}>{MailConfigurationDetails.mail_setting_cc_mail_id_2}</td>
                                                </tr>

                                                <tr className='bgcolor' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td colSpan={2}>CC 3</td>
                                                    <td colSpan={2}>CC 4</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td colSpan={2}>{MailConfigurationDetails.mail_setting_cc_mail_id_3}</td>
                                                    <td colSpan={2}>{MailConfigurationDetails.mail_setting_cc_mail_id_4}</td>
                                                </tr>

                                                <tr className='bgcolor' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>CREATED BY</td>
                                                    <td>CREATED AT</td>
                                                    <td>UPDATED BY</td>
                                                    <td>UPDATED AT</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{MailConfigurationDetails.mail_setting_created_user}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_created_at}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_updated_user}</td>
                                                    <td>{MailConfigurationDetails.mail_setting_updated_at}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
export default MailConfigurationDetails;