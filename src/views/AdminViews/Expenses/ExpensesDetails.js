import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const ExpenseDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var ExpenseId = searchParams.get("ExpenseId");

    const [ExpenseDetails, setExpenseDetails] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadExpDetails = async () => {
        var list = {};
        list["exp_id"] = ExpenseId;

        await axios.post(process.env.REACT_APP_API + "ExpenseDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var ExpDate, CreaTeadAt, UpdatedAt;
                if (response.data.expense_details !== null) {
                    if (response.data.expense_details.exp_date !== null) {
                        var date = response.data.expense_details.exp_date
                        ExpDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        ExpDate = response.data.expense_details.exp_date;
                    }

                    if (response.data.expense_details.exp_created_at !== null) {
                        var date = response.data.expense_details.exp_created_at
                        CreaTeadAt = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        CreaTeadAt = response.data.expense_details.exp_created_at;
                    }

                    if (response.data.expense_details.exp_updated_at !== null) {
                        var date = response.data.expense_details.exp_updated_at
                        UpdatedAt = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        UpdatedAt = response.data.expense_details.exp_updated_at;
                    }


                    setExpenseDetails({
                        "exp_id": response.data.expense_details.exp_id,
                        "exp_date": ExpDate,
                        "exp_branch_id": response.data.expense_details.exp_branch_id,
                        "branch_name": response.data.expense_details.branch_name,
                        "exp_user_id": response.data.expense_details.exp_user_id,
                        "user_user_name": response.data.expense_details.user_user_name,
                        "exp_paying_for": response.data.expense_details.exp_paying_for,
                        "exp_company_name": response.data.expense_details.exp_company_name,
                        "exp_receiving_person": response.data.expense_details.exp_receiving_person,
                        "exp_amount": response.data.expense_details.exp_amount,
                        "exp_reference_number": response.data.expense_details.exp_reference_number,
                        "exp_payment_method": response.data.expense_details.exp_payment_method,
                        "exp_bank_details": response.data.expense_details.exp_bank_details,
                        "exp_created_at": CreaTeadAt,
                        "exp_created_by": response.data.expense_details.exp_created_by,
                        "exp_created_user_name": response.data.expense_details.exp_created_user_name,
                        "exp_updated_at": UpdatedAt,
                        "exp_updated_by": response.data.expense_details.exp_updated_by,
                        "exp_updated_user_name": response.data.expense_details.exp_updated_user_name
                    });
                }
                else {
                    setExpenseDetails({});
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadExpDetails();
    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_DETAILS) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h3>Expense Details</h3>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "14px" }}>EXPENSE DETAILS</th>
                                                </tr>
                                                <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>Date</td>
                                                    <td>BRANCH</td>
                                                    <td>USER NAME</td>
                                                    <td>PAYING FOR</td>

                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{ExpenseDetails.exp_date}</td>
                                                    <td>{ExpenseDetails.branch_name}</td>
                                                    <td>{ExpenseDetails.user_user_name}</td>
                                                    <td>{ExpenseDetails.exp_paying_for}</td>
                                                </tr>
                                                <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>COMPANY NAME</td>
                                                    <td>RECEIVING PERSON</td>
                                                    <td>AMOUNT</td>
                                                    <td>PAYMENT MODE</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{ExpenseDetails.exp_company_name}</td>
                                                    <td>{ExpenseDetails.exp_receiving_person}</td>
                                                    <td>{ExpenseDetails.exp_amount}</td>
                                                    <td>{ExpenseDetails.exp_payment_method}</td>
                                                </tr>
                                                <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td colSpan={2}>Reference NO</td>
                                                    <td colSpan={2}>BANK DETAILS</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td colSpan={2}>{ExpenseDetails.exp_reference_number}</td>
                                                    <td colSpan={2}>{ExpenseDetails.exp_bank_details}</td>
                                                </tr>
                                                <tr className='bgcolor1' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                                    <td>CREATED BY</td>
                                                    <td>CREATED AT</td>
                                                    <td>UPDATED BY</td>
                                                    <td>UPDATED AT</td>
                                                </tr>
                                                <tr style={{ textAlign: "center", color: "black" }}>
                                                    <td>{ExpenseDetails.exp_created_user_name}</td>
                                                    <td>{ExpenseDetails.exp_created_at}</td>
                                                    <td>{ExpenseDetails.exp_updated_user_name}</td>
                                                    <td>{ExpenseDetails.exp_updated_at}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
export default ExpenseDetails;