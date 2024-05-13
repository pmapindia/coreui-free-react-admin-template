import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const WhatsAppConfiguration = (props) => {

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

    const [WAConfigurationInput, setWAConfigurationInput] = useState({
        whatsapp_config_id: "",
        whatsapp_config_branch_id: "",
        whatsapp_config_access_token: "",
        whatsapp_config_instance_id: ""
    });

    const {
        whatsapp_config_id,
        whatsapp_config_branch_id,
        whatsapp_config_access_token,
        whatsapp_config_instance_id
    } = WAConfigurationInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setWAConfigurationInput({ ...WAConfigurationInput, [e.target.name]: e.target.value });
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

        setWAConfigurationInput({ ...WAConfigurationInput, ["whatsapp_config_branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const OnSubmitWhatsAppConfiguration = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (whatsapp_config_id === "") {
            await axios.post(process.env.REACT_APP_API + "SettingsWhatsAppConfigurationsAdd", {
                "whatsapp_config_branch_id": whatsapp_config_branch_id,
                "whatsapp_config_access_token": whatsapp_config_access_token,
                "whatsapp_config_instance_id": whatsapp_config_instance_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    window.location.reload(true);
                }
                else {
                    toast.error(response.data.msg);
                    setWarnings({ ["warnings"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
        }
        else {
            await axios.post(process.env.REACT_APP_API + "SettingsWhatsAppConfigurationsUpdate", {
                "whatsapp_config_id": whatsapp_config_id,
                "whatsapp_config_branch_id": whatsapp_config_branch_id,
                "whatsapp_config_access_token": whatsapp_config_access_token,
                "whatsapp_config_instance_id": whatsapp_config_instance_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    window.location.reload(true);
                }
                else {
                    toast.error(response.data.msg);
                    setWarnings({ ["warnings"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }).catch(error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
        }
    }

    //list
    const [DisList, setDisList] = useState(false);

    const [SearchText, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = SearchText;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadWhatsAppConfigurationList();
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
        setWhatsAppConfigList([]);
    }

    const [WhatsAppConfigList, setWhatsAppConfigList] = useState([]);


    const LoadWhatsAppConfigurationList = async () => {
        var list = {};
        list["search_text"] = search_text;
        list["list_limit"] = 50;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "SettingsWhatsAppConfigurationsList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.whatsapp_configurations_list !== null) {
                    setDisList(true);
                    setWhatsAppConfigList(response.data.whatsapp_configurations_list);
                }
                else {
                    setWhatsAppConfigList([]);
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
        LoadWhatsAppConfigurationList();
    }, []);

    const WhatsAppConfigurationDetailsByID = async (id) => {
        var list = {};
        list["whatsapp_config_id"] = id;
        await axios.post(process.env.REACT_APP_API + "SettingsWhatsAppConfigurationsDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                setWAConfigurationInput(response.data.whatsapp_configurations_details);

            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const Parentvaluetomodal = (data, index) => {
        var temp_user = [...WhatsAppConfigList];
        temp_user.splice(index, 1);
        setWhatsAppConfigList([]);
        setWhatsAppConfigList(temp_user);
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_WHATSAPP_SETTINGS) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>WhatsApp Configuration Add</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm
                                            onSubmit={(e) => OnSubmitWhatsAppConfiguration(e)}
                                        >
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Branch</CLabel><span className="red">*</span>
                                                        <Select value={BranchDropdowns.filter(function (option) {
                                                            return option.value === whatsapp_config_branch_id;
                                                        })}
                                                            options={BranchDropdowns}
                                                            onChange={(e) => onChangedropdown(e, "whatsapp_config_branch_id")}>
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>WhatsApp Access Token</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='WhatsApp Access Token'
                                                            required="required"
                                                            name='whatsapp_config_access_token'
                                                            value={whatsapp_config_access_token}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>WhatsApp Instance Id</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='WhatsApp Instance Id'
                                                            required="required"
                                                            name='whatsapp_config_instance_id'
                                                            value={whatsapp_config_instance_id}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className='mt-3'>
                                                    <div className="bgcolor mt-2" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>

                        {DisList ?
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
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
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12" >
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Branch Name</th>
                                                                    <th>Access Token</th>
                                                                    <th>Instance ID</th>
                                                                    <th>Edit</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {WhatsAppConfigList.map((List, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{List.branch_name}</td>
                                                                        <td>{List.whatsapp_config_access_token}</td>
                                                                        <td>{List.whatsapp_config_instance_id}</td>
                                                                        <td>
                                                                            <CButton className="btn" style={{ paddingLeft: "3px", alignSelf: "center" }} onClick={() => WhatsAppConfigurationDetailsByID(List.whatsapp_config_id)}>
                                                                                <i className="fa fa-pencil" aria-hidden="true">
                                                                                </i></CButton>
                                                                        </td>
                                                                        <td>
                                                                            <DeleteModal delete_guid={List.whatsapp_config_id}
                                                                                name={List.whatsapp_config_access_token}
                                                                                index={index}
                                                                                apiname={"SettingsWhatsAppConfigurationsDelete"}
                                                                                guidinput={"whatsapp_config_id"}
                                                                                changeDependency={Parentvaluetomodal}
                                                                            />
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
                            : null}
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default WhatsAppConfiguration;