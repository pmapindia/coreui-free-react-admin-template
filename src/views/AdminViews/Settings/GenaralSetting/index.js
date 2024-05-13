import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const GeneralSetting = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [SettingInput, setSettingInput] = useState({
        setting_id: "",
        setting_member_id_prefix: "",
        setting_invoice_id_prefix: "",
        setting_reward_points_for_each_attendance: "",
        setting_reward_points_for_referral: "",
        setting_reward_points_for_one_value: ""
    });

    const {
        setting_id,
        setting_member_id_prefix,
        setting_invoice_id_prefix,
        setting_reward_points_for_each_attendance,
        setting_reward_points_for_referral,
        setting_reward_points_for_one_value
    } = SettingInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setSettingInput({ ...SettingInput, [e.target.name]: e.target.value });
    }

    const OnSubmitGeneralSettings = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "GeneralSettingAddOrUpdate", {
            "setting_id": setting_id,
            "setting_member_id_prefix": setting_member_id_prefix,
            "setting_invoice_id_prefix": setting_invoice_id_prefix,
            "setting_reward_points_for_each_attendance": setting_reward_points_for_each_attendance,
            "setting_reward_points_for_referral": setting_reward_points_for_referral,
            "setting_reward_points_for_one_value": setting_reward_points_for_one_value
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                //history.push(`/enquirylist`);
                window.location.reload(true);
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

    const LoadGeneralSettingsDetails = async () => {
        await axios.post(process.env.REACT_APP_API + "GeneralSettingDetails", {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setSettingInput(response.data.prefix_settings_details);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }


    //----------------------------List--------------------------------------------

    const [SettingList, setSettingList] = useState([]);

    const LoadGeneralSettingsList = async () => {
        await axios.post(process.env.REACT_APP_API + "GeneralSettingList", {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setSettingList(response.data.branch_list);
            }
            else {
                setSettingList([]);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadGeneralSettingsList();
        LoadGeneralSettingsDetails();
    }, []);


    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_GENERAL_SETTINGS) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>General Settings</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitGeneralSettings(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Member Prefix</CLabel>
                                                        <CInput type='text' placeholder='Enter Member Prefix'
                                                            name='setting_member_id_prefix'
                                                            value={setting_member_id_prefix}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Invoice Prefix</CLabel>
                                                        <CInput type='text' placeholder='Enter Invoice Prefix'
                                                            name='setting_invoice_id_prefix'
                                                            value={setting_invoice_id_prefix}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Reward Points for Each Attendance</CLabel>
                                                        <CInput type='text' placeholder='Enter Reward Points for Each Attendance'
                                                            name='setting_reward_points_for_each_attendance'
                                                            value={setting_reward_points_for_each_attendance}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Reward Points for Referral</CLabel>
                                                        <CInput type='text' placeholder='Enter Reward Points for Referral'
                                                            name='setting_reward_points_for_referral'
                                                            value={setting_reward_points_for_referral}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Reward Points for One Value</CLabel>
                                                        <CInput type='text' placeholder='Enter Reward Points for One Value'
                                                            name='setting_reward_points_for_one_value'
                                                            value={setting_reward_points_for_one_value}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <div className="bgcolor" disabled={disablebutton} style={{ borderRadius: "5px" }}>
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

                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>General Settings List</h4>
                                        <hr className="bgcolor" style={{ height: "2px", }} />
                                        <div className="table-responsive  my-table">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <th rowSpan={2}>#</th>
                                                        <th rowSpan={2}>Member Prefix</th>
                                                        <th rowSpan={2}>Invoice Prefix</th>
                                                        <th colSpan={3} style={{ textAlign: "center" }}>Reward Points for</th>
                                                        {/* <th rowSpan={2}>Edit</th> */}
                                                    </tr>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <th>Each Attendance</th>
                                                        <th>Referral</th>
                                                        <th>One Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {SettingList.map((List, index) => (
                                                        <tr key={index} style={{ textAlign: "center" }}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.setting_member_id_prefix}</td>
                                                            <td>{List.setting_invoice_id_prefix}</td>
                                                            <td>{List.setting_reward_points_for_each_attendance}</td>
                                                            <td>{List.setting_reward_points_for_referral}</td>
                                                            <td>{List.setting_reward_points_for_one_value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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
export default GeneralSetting