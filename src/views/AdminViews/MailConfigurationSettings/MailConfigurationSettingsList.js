import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const MailConfigurationList = () => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };


    const [MailLists, setMailLists] = useState([]);
    const [currentsize, setCurrentSize] = useState(0);
    const [listcount, setListCount] = useState(0);

    const [warnings, setWarnings] = useState({
        warning: ""
    });
    const [SearchText, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = SearchText;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadMailConfigurationList();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...SearchText, [e.target.name]: "" });
        } else {
            setSearchText({ ...SearchText, [e.target.name]: e.target.value });

        }
        setCurrentSize(0);
        setMailLists([]);
    }

    const LoadMailConfigurationList = async () => {
        var list = {};
        list["search_text"] = search_text;
        list["list_limit"] = 50;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "SettingsMailConfigurationLists", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.mail_configuration_list !== null) {
                    setMailLists(response.data.mail_configuration_list);
                }
                else {
                    setMailLists([]);
                }
            }
            else {
                toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadMailConfigurationList();
    }, []);


    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MAIL_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Mail Configuration List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3" >
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
                                            </CCol>
                                            <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                            {/* {MailLists.length > 0 ?
                                        <CCol xs="12" sm="3" md="3" lg="3" >
                                            <Link to='/mail-configuration-add'>
                                                <CButton disabled="true" className="btn bgcolor white mr-1 mb-2  width100">Add</CButton>
                                            </Link>
                                        </CCol>
                                        : */}
                                            <CCol xs="12" sm="3" md="3" lg="3" >
                                                <Link to='/mail-configuration-add'>
                                                    <CButton className="btn bgcolor white mr-1 mb-2 width100">Add</CButton>
                                                </Link>
                                            </CCol>
                                            {/* } */}
                                        </CRow>

                                        <CRow>
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <div className=" my-table table-responsive width100 mt-4">
                                                    <table className="table table-bordered-less width100">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Branch_Name</th>
                                                                <th>From_Mail_Id</th>
                                                                <th>Host</th>
                                                                <th>Port</th>
                                                                <th>SSL_Enabled</th>
                                                                <th>Password</th>
                                                                <th>Display_Name</th>
                                                                <th>CC1</th>
                                                                <th>CC2</th>
                                                                <th>CC3</th>
                                                                <th>CC4</th>
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MAIL_EDIT) ?
                                                                        <th>Edit</th>
                                                                        : null
                                                                }
                                                                <th>Details</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {MailLists.map((List, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{List.branch_name}</td>
                                                                    <td>{List.mail_setting_from_mail_id}</td>
                                                                    <td>{List.mail_setting_host}</td>
                                                                    <td>{List.mail_setting_port}</td>
                                                                    <td>{List.mail_setting_is_ssl_enabled.toString()}</td>
                                                                    <td>{List.mail_setting_from_mail_id_password}</td>
                                                                    <td>{List.mail_setting_display_name}</td>
                                                                    <td>{List.mail_setting_cc_mail_id_1}</td>
                                                                    <td>{List.mail_setting_cc_mail_id_2}</td>
                                                                    <td>{List.mail_setting_cc_mail_id_3}</td>
                                                                    <td>{List.mail_setting_cc_mail_id_4}</td>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MAIL_EDIT) ?
                                                                            <td>
                                                                                <Link to={{
                                                                                    pathname: 'mail-configuration-add',
                                                                                    pfid: {
                                                                                        pfid: List.mail_setting_id
                                                                                    }
                                                                                }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                                    </i>
                                                                                </Link>
                                                                            </td>
                                                                            : null
                                                                    }

                                                                    <td>
                                                                        <Link to={`/mail-configuration-details?MailConfigid=${List.mail_setting_id}`}
                                                                            className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                            Details
                                                                        </Link>
                                                                    </td>
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
export default MailConfigurationList;