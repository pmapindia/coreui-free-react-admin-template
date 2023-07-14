import { CForm, CCardBody, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';
import { Link } from 'react-router-dom';

const TermsAndConditions = (props) => {

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

    const [TermsAndConditionsList, setTermsAndConditionsList] = useState([]);
    const LoadTermsAndConditionsList = async () => {
        await axios.post(process.env.REACT_APP_API + "TermsAndConditionsList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setTermsAndConditionsList(response.data.terms_and_conditions_list);
            }
            else {
                setTermsAndConditionsList(response.data.terms_and_conditions_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadTermsAndConditionsList();
    }, []);

    const [TermsAndConditionsAdd, setTermsAndConditionsAdd] = useState({
        terms_and_conditions: ""
    });

    const { terms_and_conditions } = TermsAndConditionsAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTermsAndConditionsAdd({ ...TermsAndConditionsAdd, [e.target.name]: e.target.value });
    }

    const OnSubmitTermsAndConditions = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "TermsAndConditionsAdd", {
            "terms_and_conditions": terms_and_conditions
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

        console.log("index: " + index);
        var temp_user = [...TermsAndConditionsList];
        temp_user.splice(index, 1);
        setTermsAndConditionsList([]);
        setTermsAndConditionsList(temp_user);
        console.log("temp_user: " + temp_user);
        console.log("all user: " + TermsAndConditionsList);
        console.log("Delete")
    }

    const TermsAndConditionsDetailsByID = async (id) => {
        var list = {};
        list["terms_and_conditions_id"] = id;
        await axios.post(process.env.REACT_APP_API + "TermsAndConditionsDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                setTermsAndConditionsAdd(response.data.terms_and_conditions_details);

            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Add New Terms and Conditions</h4>

                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitTermsAndConditions(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9">
                                            <CFormGroup>
                                                <CLabel>Terms and Conditions</CLabel><span className="red">*</span>
                                                <CTextarea type='text' rows={3} placeholder='Enter Terms and Conditions' required="required"
                                                    name='terms_and_conditions'
                                                    value={terms_and_conditions}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
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
                        <CCard>
                            <CCardBody>
                                <div className="table-responsive  my-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>SL_No</th>
                                                <th>Terms and Conditions</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TermsAndConditionsList.map((List, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{List.terms_and_conditions}</td>
                                                    <td>
                                                        <CButton className="btn" style={{ paddingLeft: "2px" }} onClick={() => TermsAndConditionsDetailsByID(List.terms_and_conditions_id)}>
                                                            <i className="fa fa-pencil" aria-hidden="true">
                                                            </i></CButton></td>
                                                    <td>
                                                        <DeleteModal delete_guid={List.terms_and_conditions_id}
                                                            name={List.terms_and_conditions_id}
                                                            index={index}
                                                            apiname={"PaymentTypesSetupDelete"}
                                                            guidinput={"terms_and_conditions_id"}
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
export default TermsAndConditions;