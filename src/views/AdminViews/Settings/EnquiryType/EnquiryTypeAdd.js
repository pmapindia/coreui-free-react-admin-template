import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';


const AddNewEnquityType = (props) => {

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

    // List API

    const [EnquiryTypeList, setEnquiryTypeList] = useState([]);
    const LoadEnquiryTypeList = async () => {
        await axios.post(process.env.REACT_APP_API + "EnquiryTypeList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setEnquiryTypeList(response.data.enquiry_type_list);
            }
            else {
                setEnquiryTypeList(response.data.enquiry_type_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadEnquiryTypeList();
    }, []);

    const [EnquiryTypeAdd, setEnquiryTypeAdd] = useState({
        enquiry_type_name: ""
    });

    const { enquiry_type_name } = EnquiryTypeAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setEnquiryTypeAdd({ ...EnquiryTypeAdd, [e.target.name]: e.target.value });
    }

    const OnSubmitType = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "EnquiryTypesAdd", {
            "enquiry_type_name": enquiry_type_name
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                window.location.reload(true);
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

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...EnquiryTypeList];
        temp_user.splice(index, 1);
        setEnquiryTypeList([]);
        setEnquiryTypeList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + EnquiryTypeList);
        // console.log("Delete")
    }
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_TYPE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Add New Enquiry Type</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitType(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Enquiry Type Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Enquiry Type Name' required="required"
                                                            name='enquiry_type_name'
                                                            value={enquiry_type_name}
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
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>SL No</th>
                                                        <th>Enquiry Type</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {EnquiryTypeList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.enquiry_type_name}</td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.enquiry_type_id}
                                                                    name={List.enquiry_type_name}
                                                                    index={index}
                                                                    apiname={"EnquiryTypeDelete"}
                                                                    guidinput={"enquiry_type_id"}
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
                    :
                    <Notification />
            }
        </>
    )
}
export default AddNewEnquityType;