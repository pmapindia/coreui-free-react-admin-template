import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
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

const PaymentType = (props) => {

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

    const [PaymentTypeList, setPaymentTypeList] = useState([]);
    const LoadPaymentType = async () => {
        await axios.post(process.env.REACT_APP_API + "PaymentTypesSetupList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setPaymentTypeList(response.data.payment_type_list);
            }
            else {
                setPaymentTypeList(response.data.payment_type_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadPaymentType();
    }, []);

    const [PaymentTypeAdd, setPaymentTypeAdd] = useState({
        payment_type_name: ""
    });

    const { payment_type_name } = PaymentTypeAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setPaymentTypeAdd({ ...PaymentTypeAdd, [e.target.name]: e.target.value });
    }

    const OnSubmitSource = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "PaymentTypesSetupAdd", {
            "payment_type_name": payment_type_name
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
        var temp_user = [...PaymentTypeList];
        temp_user.splice(index, 1);
        setPaymentTypeList([]);
        setPaymentTypeList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + PaymentTypeList);
        // console.log("Delete")
    }


    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PAYMENT_TYPE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Add New PaymentType</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitSource(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>PaymentType Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter PaymentType Name' required="required"
                                                            name='payment_type_name'
                                                            value={payment_type_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                                    <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} disabled={disablebutton}>Save</CButton>
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
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Payment Type Name</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {PaymentTypeList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.payment_type_name}</td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.payment_type_id}
                                                                    name={List.payment_type_name}
                                                                    index={index}
                                                                    apiname={"PaymentTypesSetupDelete"}
                                                                    guidinput={"payment_type_id"}
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
                    </div >
                    :
                    <Notification />
            }
        </>
    )
}
export default PaymentType;