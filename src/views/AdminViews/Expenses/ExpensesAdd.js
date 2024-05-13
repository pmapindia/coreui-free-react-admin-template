import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCardBody, CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const ExpensesAdd = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [disablebutton, setDisableButton] = useState(false);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [UserDropdowns, setUserDropdowns] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [InputVariables, setInputVariables] = useState({
        exp_id: "",
        exp_date: "",
        exp_branch_id: "",
        exp_user_id: "",
        exp_paying_for: "",
        exp_company_name: "",
        exp_receiving_person: "",
        exp_amount: "",
        exp_reference_number: "",
        exp_payment_method: "",
        exp_bank_details: "",
        exp_created_by: "",
    });

    const {
        exp_id,
        exp_date,
        exp_branch_id,
        exp_user_id,
        exp_paying_for,
        exp_company_name,
        exp_receiving_person,
        exp_amount,
        exp_reference_number,
        exp_payment_method,
        exp_bank_details,
        exp_created_by,
    } = InputVariables;

    const [ShowBank, setShowBank] = useState(false);
    const [ShowOther, setShowOther] = useState(false);

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setInputVariables({ ...InputVariables, [e.target.name]: e.target.value });

        if (e.target.value === "Bank") {
            setShowBank(true);
        }
        else {
            setShowBank(false);
        }

        if (e.target.value === "PhonePe" || e.target.value === "Google Pay" || e.target.value === "Cheque") {
            setShowOther(true);
        }
        else {
            setShowOther(false);
        }
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_User", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_User") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setUserDropdowns(ddlist);
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

        setInputVariables({ ...InputVariables, ["exp_branch_id"]: e.value });
    };

    const onChangeUserdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setInputVariables({ ...InputVariables, ["exp_user_id"]: e.value });
    };

    useEffect(() => {
        LoadExpDetails();
        GetDropDown();
    }, []);

    const LoadExpDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["exp_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "ExpenseDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    var ExpDate;
                    if (response.data.expense_details !== null) {
                        if (response.data.expense_details.exp_date !== null) {
                            var date = response.data.expense_details.exp_date
                            ExpDate = date.substring(0, 10);
                        }
                        else {
                            ExpDate = response.data.expense_details.exp_date;
                        }

                        setInputVariables({
                            "exp_id": response.data.expense_details.exp_id,
                            "exp_date": ExpDate,
                            "exp_branch_id": response.data.expense_details.exp_branch_id,
                            "exp_user_id": response.data.expense_details.exp_user_id,
                            "exp_paying_for": response.data.expense_details.exp_paying_for,
                            "exp_company_name": response.data.expense_details.exp_company_name,
                            "exp_receiving_person": response.data.expense_details.exp_receiving_person,
                            "exp_amount": response.data.expense_details.exp_amount,
                            "exp_reference_number": response.data.expense_details.exp_reference_number,
                            "exp_payment_method": response.data.expense_details.exp_payment_method,
                            "exp_bank_details": response.data.expense_details.exp_bank_details,
                        });
                    }
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    const OnSubmitExpense = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (exp_id === "") {
            await axios.post(process.env.REACT_APP_API + "ExpenseAdd", {
                "exp_date": exp_date,
                "exp_branch_id": exp_branch_id,
                "exp_user_id": exp_user_id,
                "exp_paying_for": exp_paying_for,
                "exp_company_name": exp_company_name,
                "exp_receiving_person": exp_receiving_person,
                "exp_amount": exp_amount,
                "exp_reference_number": exp_reference_number,
                "exp_payment_method": exp_payment_method,
                "exp_bank_details": exp_bank_details,
                "exp_created": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/expenses-list`);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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
            await axios.post(process.env.REACT_APP_API + "ExpenseUpdate", {
                "exp_id": exp_id,
                "exp_date": exp_date,
                "exp_branch_id": exp_branch_id,
                "exp_user_id": exp_user_id,
                "exp_paying_for": exp_paying_for,
                "exp_company_name": exp_company_name,
                "exp_receiving_person": exp_receiving_person,
                "exp_amount": exp_amount,
                "exp_reference_number": exp_reference_number,
                "exp_payment_method": exp_payment_method,
                "exp_bank_details": exp_bank_details,
                "exp_update": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/expenses-list`);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_EXPENSE) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        {props.location.pfid != null ? <h4>Update Expense</h4>
                                            :
                                            <h4>Add New Expense</h4>
                                        }

                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitExpense(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Date</CLabel><span className="red">*</span>
                                                        <CInput type='Date' placeholder='Enter Date'
                                                            name='exp_date'
                                                            value={exp_date}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                        <Select value={BranchDropdowns.filter(function (option) {
                                                            return option.value === exp_branch_id;
                                                        })}
                                                            options={BranchDropdowns}
                                                            onChange={(e) => onChangedropdown(e, "exp_branch_id")} required="required">
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Select User</CLabel><span className="red">*</span>
                                                        <Select value={UserDropdowns.filter(function (option) {
                                                            return option.value === exp_user_id;
                                                        })}
                                                            options={UserDropdowns}
                                                            onChange={(e) => onChangeUserdropdown(e, "exp_user_id")} required="required">
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Paying For</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Ex: BSNL Bill'
                                                            name='exp_paying_for'
                                                            value={exp_paying_for}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Company Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Ex: BSNL'
                                                            name='exp_company_name'
                                                            value={exp_company_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Receiving Person</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Receiving Person'
                                                            name='exp_receiving_person'
                                                            value={exp_receiving_person}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Amount</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Amount'
                                                            name='exp_amount'
                                                            value={exp_amount}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <CFormGroup>
                                                        <CLabel>Payment Method</CLabel><span className="red">*</span>
                                                        <CSelect name='exp_payment_method' onChange={(e) => OnInputChange(e)} custom>
                                                            <option>Select Payment Method</option>
                                                            <option selected={exp_payment_method === "PhonePe"} value="PhonePe">PhonePe</option>
                                                            <option selected={exp_payment_method === "Google Pay"} value="Google Pay">Google Pay</option>
                                                            <option selected={exp_payment_method === "Cheque"} value="Cheque">Cheque</option>
                                                            <option selected={exp_payment_method === "Cash"} value="Cash">Cash</option>
                                                            <option selected={exp_payment_method === "Bank"} value="Bank">Bank</option>
                                                        </CSelect>
                                                    </CFormGroup>
                                                </CCol>

                                                {ShowBank ?
                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                        <CFormGroup>
                                                            <CLabel>Bank Name</CLabel><span className="red">*</span>
                                                            <CInput type='text' placeholder='Enter Bank Name'
                                                                name='exp_bank_details'
                                                                value={exp_bank_details}
                                                                onChange={(e) => OnInputChange(e)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>
                                                    :
                                                    null}

                                                {ShowOther ?
                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                        <CFormGroup>
                                                            <CLabel>Reference No</CLabel><span className="red">*</span>
                                                            <CInput type='text' placeholder='Enter Reference No'
                                                                name='exp_reference_number'
                                                                value={exp_reference_number}
                                                                onChange={(e) => OnInputChange(e)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>
                                                    :
                                                    null}
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
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
export default ExpensesAdd