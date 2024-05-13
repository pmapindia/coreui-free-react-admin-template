import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import DeleteModal from '../../Modals/DeleteModal';

const RoleFeatureNameAdd = (props) => {
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

    const [NameAddInput, setNameAddInput] = useState({
        feature_id: "",
        feature_name: ""
    });

    const {
        feature_id,
        feature_name
    } = NameAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setNameAddInput({ ...NameAddInput, [e.target.name]: e.target.value });
    }

    const OnSubmitFeatureName = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (feature_id === "") {
            await axios.post(process.env.REACT_APP_API + "RoleFeatureNameAdd", {
                "feature_name": feature_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //history.push(`/userlist`);
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
            await axios.post(process.env.REACT_APP_API + "RoleFeatureNameUpdate", {
                "feature_id": feature_id,
                "feature_name": feature_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //history.push(`/userlist`);
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

    // List API

    const [NameList, setNameList] = useState([]);
    const LoadNameList = async () => {
        await axios.post(process.env.REACT_APP_API + "RoleFeatureNameList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setNameList(response.data.role_feature_name_list);
            }
            else {
                setNameList(response.data.role_feature_name_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadNameList();
    }, []);

    const FeatureNameDetailsByID = async (id) => {
        var list = {};
        list["feature_id"] = id;
        await axios.post(process.env.REACT_APP_API + "RoleFeatureNameDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setNameAddInput(response.data.role_feature_name_details);

            } else {
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const Parentvaluetomodal = (data, index) => {

        var temp_user = [...NameList];
        temp_user.splice(index, 1);
        setNameList([]);
        setNameList(temp_user);
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Add New Feature Name</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitFeatureName(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Feature Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Feature Name' required="required"
                                                    name='feature_name'
                                                    value={feature_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
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
                                <h4>Feature Name List</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <div className="table-responsive  my-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Feature Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NameList.map((NameList, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{NameList.feature_name}</td>
                                                    <td>
                                                        <CButton className="btn" style={{ paddingLeft: "3px", alignSelf: "center" }} onClick={() => FeatureNameDetailsByID(NameList.feature_id)}>
                                                            <i className="fa fa-pencil" aria-hidden="true">
                                                            </i>
                                                        </CButton>
                                                    </td>
                                                    <td>
                                                        <DeleteModal delete_guid={NameList.feature_id}
                                                            name={NameList.feature_name}
                                                            index={index}
                                                            apiname={"RoleFeatureNameDelete"}
                                                            guidinput={"feature_id"}
                                                            changeDependency={Parentvaluetomodal}
                                                        />
                                                    </td>
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
        </>
    )
}
export default RoleFeatureNameAdd;