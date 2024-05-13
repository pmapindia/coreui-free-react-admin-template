import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const AddNewRole = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton, setDisableButton] = useState(false);
    let history = useHistory();

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [RoleInput, setRoleInput] = useState({
        role_id: "",
        role_name: "",
        role_feature_assigned_list: []
    });

    const {
        role_id,
        role_name,
        role_feature_assigned_list
    } = RoleInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setRoleInput({ ...RoleInput, [e.target.name]: e.target.value });
    }

    const [FeatureAssignedList, setFeatureAssignedList] = useState([]);

    const FeatureNameList = async () => {
        await axios.post(process.env.REACT_APP_API + "RoleFeatureNameList", {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.role_feature_name_list.length !== null) {
                    let ddlist = [];
                    for (let d = 0; d < response.data.role_feature_name_list.length; d++) {
                        var dd_list = response.data.role_feature_name_list[d];
                        console.log("dd_list" + dd_list);
                        ddlist.push({ "assigned_feature_name": dd_list.feature_name, "assigned_control": false });
                    }
                    setFeatureAssignedList(ddlist);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const OnParameterInputChange = (e, index, pid) => {
        console.log(index, e.target.name, e.target.checked, e.target.id,);

        for (let k = 0; k < FeatureAssignedList.length; k++) {
            if (FeatureAssignedList[k].assigned_feature_name === pid) {
                if (e.target.id === "yes") {
                    let values = [...FeatureAssignedList];

                    values[k]["assigned_control"] = true;
                    setFeatureAssignedList(values);
                }

                if (e.target.id === "no") {
                    let values = [...FeatureAssignedList];

                    values[k]["assigned_control"] = false;
                    setFeatureAssignedList(values);
                }
            }
        }
    }

    useEffect(() => {
        FeatureNameList();
    }, []);


    const OnSubmitRole = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (role_id === "") {
            await axios.post(process.env.REACT_APP_API + "RoleAdd", {
                "role_name": role_name,
                "role_feature_assigned_list": FeatureAssignedList
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    //window.location.reload(true);
                    history.push(`/role-list`);
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
            await axios.post(process.env.REACT_APP_API + "RoleUpdate", {
                "role_id": role_id,
                "role_name": role_name,
                "role_feature_assigned_list": FeatureAssignedList
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    //window.location.reload(true);
                    history.push(`/role-list`);
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

    const LoadRoleDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["role_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "RoleDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    if (response.data.role_details !== null) {
                        setRoleInput(response.data.role_details)
                    }

                    if (response.data.role_feature_assigned_list !== null) {
                        setFeatureAssignedList(response.data.role_feature_assigned_list)
                    }
                }
            })
        }
    }

    useEffect(() => {
        LoadRoleDetails();
    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_ROLE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        {props.location.pfid != null ? <h4>Update Role</h4>
                                            :
                                            <h4>Add New Role</h4>
                                        }
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitRole(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Role Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Role Name' required="required"
                                                            name='role_name'
                                                            value={role_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            {/* <CRow>
                                        <CCol xs="12" sm="6" md="6" lg="6"> */}
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <table className="table table-bordered-less table-sm width100">
                                                        <tbody>
                                                            <tr>
                                                                <th rowSpan={2}><CLabel>Name</CLabel></th>
                                                                <th colSpan={2} style={{ textAlign: "center" }}><CLabel>Access Control</CLabel></th>

                                                            </tr>
                                                            <tr>
                                                                <th><CLabel style={{ width: "30px", marginLeft: "50px" }}>Yes</CLabel></th>
                                                                <th><CLabel style={{ width: "20px", marginLeft: "50px" }}>No</CLabel></th>
                                                            </tr>

                                                            {FeatureAssignedList.map((AssignedList, index) => (
                                                                <tr key={index}>
                                                                    <td>{AssignedList.assigned_feature_name}</td>
                                                                    <td>
                                                                        <CInput style={{ width: "25px", marginLeft: "50px" }} type='radio'
                                                                            name={AssignedList.assigned_feature_name}
                                                                            id="yes"
                                                                            checked={AssignedList.assigned_control === true ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, AssignedList.assigned_feature_name)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <CInput style={{ width: "25px", marginLeft: "50px" }} type='radio'
                                                                            name={AssignedList.assigned_feature_name}
                                                                            id="no"
                                                                            checked={AssignedList.assigned_control === false ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, AssignedList.assigned_feature_name)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </CCol>
                                            </CRow>
                                            {/* </CCol>

                                    </CRow> */}
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
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
export default AddNewRole;