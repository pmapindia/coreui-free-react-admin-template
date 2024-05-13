import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const AddNewMailConfiguration = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [MailConfigurationInput, setMailConfigurationInput] = useState({
        mail_setting_id: "",
        mail_setting_branch_id: "",
        mail_setting_host: "",
        mail_setting_port: "",
        mail_setting_is_ssl_enabled: false,
        mail_setting_from_mail_id: "",
        mail_setting_from_mail_id_password: "",
        mail_setting_display_name: "",
        mail_setting_cc_mail_id_1: "",
        mail_setting_cc_mail_id_2: "",
        mail_setting_cc_mail_id_3: "",
        mail_setting_cc_mail_id_4: "",
        mail_setting_updated_user_id: ""
    });

    const {
        mail_setting_id,
        mail_setting_branch_id,
        mail_setting_host,
        mail_setting_port,
        mail_setting_is_ssl_enabled,
        mail_setting_from_mail_id,
        mail_setting_from_mail_id_password,
        mail_setting_display_name,
        mail_setting_cc_mail_id_1,
        mail_setting_cc_mail_id_2,
        mail_setting_cc_mail_id_3,
        mail_setting_cc_mail_id_4,
        mail_setting_updated_user_id
    } = MailConfigurationInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setMailConfigurationInput({ ...MailConfigurationInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBranchDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMailConfigurationInput({ ...MailConfigurationInput, ["mail_setting_branch_id"]: e.value });
    };

    const OnCheckChange = (e) => {
        console.log(e.target.checked);
        setMailConfigurationInput({ ...MailConfigurationInput, [e.target.name]: e.target.checked });
    }

    useEffect(() => {
        GetDropDown();
        LoadMailConfigurationDetails();
    }, []);

    const OnSubmitMailConfiguration = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (mail_setting_id === "") {
            await axios.post(process.env.REACT_APP_API + "SettingsMailConfigurationAdd", {
                "mail_setting_branch_id": mail_setting_branch_id,
                "mail_setting_host": mail_setting_host,
                "mail_setting_port": mail_setting_port,
                "mail_setting_is_ssl_enabled": mail_setting_is_ssl_enabled,
                "mail_setting_from_mail_id": mail_setting_from_mail_id,
                "mail_setting_from_mail_id_password": mail_setting_from_mail_id_password,
                "mail_setting_display_name": mail_setting_display_name,
                "mail_setting_cc_mail_id_1": mail_setting_cc_mail_id_1,
                "mail_setting_cc_mail_id_2": mail_setting_cc_mail_id_2,
                "mail_setting_cc_mail_id_3": mail_setting_cc_mail_id_3,
                "mail_setting_cc_mail_id_4": mail_setting_cc_mail_id_4,
                "mail_setting_created_by": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/mail-configuration-list`);
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        }
        else {
            await axios.post(process.env.REACT_APP_API + "SettingsMailConfigurationUpdate", {
                "mail_setting_id": mail_setting_id,
                "mail_setting_branch_id": mail_setting_branch_id,
                "mail_setting_host": mail_setting_host,
                "mail_setting_port": mail_setting_port,
                "mail_setting_is_ssl_enabled": mail_setting_is_ssl_enabled,
                "mail_setting_from_mail_id": mail_setting_from_mail_id,
                "mail_setting_from_mail_id_password": mail_setting_from_mail_id_password,
                "mail_setting_display_name": mail_setting_display_name,
                "mail_setting_cc_mail_id_1": mail_setting_cc_mail_id_1,
                "mail_setting_cc_mail_id_2": mail_setting_cc_mail_id_2,
                "mail_setting_cc_mail_id_3": mail_setting_cc_mail_id_3,
                "mail_setting_cc_mail_id_4": mail_setting_cc_mail_id_4,
                "mail_setting_updated_user_id": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/mail-configuration-list`);
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        }
    }

    const LoadMailConfigurationDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["mail_setting_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "SettingsMailConfigurationDetails", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    setMailConfigurationInput({
                        "mail_setting_id": response.data.mail_configuration_details.mail_setting_id,
                        "mail_setting_branch_id": response.data.mail_configuration_details.mail_setting_branch_id,
                        "mail_setting_host": response.data.mail_configuration_details.mail_setting_host,
                        "mail_setting_port": response.data.mail_configuration_details.mail_setting_port,
                        "mail_setting_is_ssl_enabled": response.data.mail_configuration_details.mail_setting_is_ssl_enabled,
                        "mail_setting_from_mail_id": response.data.mail_configuration_details.mail_setting_from_mail_id,
                        "mail_setting_from_mail_id_password": response.data.mail_configuration_details.mail_setting_from_mail_id_password,
                        "mail_setting_display_name": response.data.mail_configuration_details.mail_setting_display_name,
                        "mail_setting_cc_mail_id_1": response.data.mail_configuration_details.mail_setting_cc_mail_id_1,
                        "mail_setting_cc_mail_id_2": response.data.mail_configuration_details.mail_setting_cc_mail_id_2,
                        "mail_setting_cc_mail_id_3": response.data.mail_configuration_details.mail_setting_cc_mail_id_3,
                        "mail_setting_cc_mail_id_4": response.data.mail_configuration_details.mail_setting_cc_mail_id_4,
                    })
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }
    
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_MAIL) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        {props.location.pfid != null ? <h4>Update Mail Configuration</h4>
                                            :
                                            <h4>Add New Mail Configuration</h4>
                                        }
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm
                                            onSubmit={(e) => OnSubmitMailConfiguration(e)}
                                        >
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Branch</CLabel><span className="red">*</span>
                                                        <Select value={BranchDropdowns.filter(function (option) {
                                                            return option.value === mail_setting_branch_id;
                                                        })}
                                                            options={BranchDropdowns}
                                                            onChange={(e) => onChangedropdown(e, "mail_setting_branch_id")}>
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>From Mail ID</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='From Mail ID'
                                                            required="required"
                                                            name='mail_setting_from_mail_id'
                                                            value={mail_setting_from_mail_id}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Host</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Host'
                                                            required="required"
                                                            name='mail_setting_host'
                                                            value={mail_setting_host}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Port</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Port'
                                                            required="required"
                                                            name='mail_setting_port'
                                                            value={mail_setting_port}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="pt-1">
                                                    <CRow>
                                                        <CCol className="pt-3" >
                                                            <CFormGroup>
                                                                <CLabel>SSL Enabled</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol className="pt-3">
                                                            <CFormGroup>
                                                                <CInput style={{ width: "20%" }} placeholder="SSL Enabled"
                                                                    type="checkbox"
                                                                    name="mail_setting_is_ssl_enabled"
                                                                    checked={mail_setting_is_ssl_enabled === true}
                                                                    onChange={(e) => OnCheckChange(e)}
                                                                />
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Password</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Password'
                                                            required="required"
                                                            name='mail_setting_from_mail_id_password'
                                                            value={mail_setting_from_mail_id_password}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Display Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Display Name'
                                                            name='mail_setting_display_name'
                                                            value={mail_setting_display_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>CC1</CLabel>
                                                        <CInput type='text' placeholder='CC1'
                                                            name='mail_setting_cc_mail_id_1'
                                                            value={mail_setting_cc_mail_id_1}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>CC2</CLabel>
                                                        <CInput type='text' placeholder='CC2'
                                                            name='mail_setting_cc_mail_id_2'
                                                            value={mail_setting_cc_mail_id_2}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>CC3</CLabel>
                                                        <CInput type='text' placeholder='CC3'
                                                            name='mail_setting_cc_mail_id_3'
                                                            value={mail_setting_cc_mail_id_3}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>CC4</CLabel>
                                                        <CInput type='text' placeholder='CC4'
                                                            name='mail_setting_cc_mail_id_4'
                                                            value={mail_setting_cc_mail_id_4}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                        </CForm>
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
export default AddNewMailConfiguration;
