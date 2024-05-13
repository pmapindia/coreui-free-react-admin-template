import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const MemberHealthSetup = (props) => {
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

    const [HealthSetupInput, setHealthSetupInput] = useState({
        health_id: "",
        health_name: ""
    });

    const {
        health_id,
        health_name
    } = HealthSetupInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setHealthSetupInput({ ...HealthSetupInput, [e.target.name]: e.target.value });
    }

    const OnSubmitHealthSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (health_id === "") {
            await axios.post(process.env.REACT_APP_API + "MemberHealthSetupAdd", {
                "health_name": health_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    // history.push(`/customerlist`);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
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
            await axios.post(process.env.REACT_APP_API + "MemberHealthSetupUpdate", {
                "health_id": health_id,
                "health_name": health_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    // history.push(`/customerlist`);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
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

    //List Details

    const [HealthList, setHealthList] = useState([]);

    const [Loading, setLoading] = useState(false);

    const LoadAllHealthList = async () => {

        var list = {};
        await axios.post(process.env.REACT_APP_API + "MemberHealthSetupList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                if (response.data.health_list !== null) {
                    setHealthList(response.data.health_list)
                }
                else {
                    setHealthList([]);
                }
            }
            else {
                setLoading(false);
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
            alert(error.message);
        })
    }

    useEffect(() => {
        LoadAllHealthList();
    }, []);

    const HealthSetupDetailsByID = async (id) => {
        var list = {};
        list["health_id"] = id;
        await axios.post(process.env.REACT_APP_API + "MemberHealthSetupDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                setHealthSetupInput(response.data.health_details);

            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...HealthList];
        temp_user.splice(index, 1);
        setHealthList([]);
        setHealthList(temp_user);
        //console.log("temp_user: " + temp_user);
        //console.log("all user: " + HealthList);
        //console.log("Delete")
    }
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_HEALTH_INFO) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CForm onSubmit={(e) => OnSubmitHealthSetup(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <h4> Health Setup</h4>
                                            <hr className="bgcolor" style={{ height: "2px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Health Name</CLabel><span className="red">*</span>
                                                        <CInput type='text'
                                                            placeholder='Enter Health Name'
                                                            name='health_name'
                                                            value={health_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className='mt-3'>
                                                    <div className="bgcolor mt-2" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            {Loading ?
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px" }}>
                                            <CCardBody>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>SL No</th>
                                                            <th>Health Setup Name</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {HealthList.map((List, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{List.health_name}</td>
                                                                <td>
                                                                    <CButton className="btn" style={{ paddingLeft: "2px" }} onClick={() => HealthSetupDetailsByID(List.health_id)}>
                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                        </i></CButton>
                                                                </td>
                                                                <td>
                                                                    <DeleteModal delete_guid={List.health_id}
                                                                        name={List.health_name}
                                                                        index={index}
                                                                        apiname={"MemberHealthSetupDelete"}
                                                                        guidinput={"health_id"}
                                                                        changeDependency={Parentvaluetomodal}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                                : null}
                        </CForm>
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default MemberHealthSetup;