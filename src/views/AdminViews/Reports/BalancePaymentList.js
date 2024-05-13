import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import BalancePaymentUpdateModal from '../Modals/BalancePaymentUpdateModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const BalancePaymentList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [disablebutton, setDisableButton] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        branch_id: ""
    });

    const {
        from_date,
        to_date,
        branch_id
    } = ListInput;

    useEffect(() => {
        if (ListInput.from_date === "" && ListInput.to_date === "") {
            var todaysdate = new Date();
            var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
            setListInput({ ...ListInput, ["from_date"]: todays_date, ["to_date"]: todays_date });
            //console.log(todays_date);
        }
    }, [ListInput.from_date === ""], [ListInput.to_date === ""]);

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
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

        setListInput({ ...ListInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const [BalancePaymentList, setBalancePaymentList] = useState([]);

    const BalancePaymentLists = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        setBalancePaymentList([]);
        await axios.post(process.env.REACT_APP_API + "SalesListForBalancePayment", {
            "from_date": from_date,
            "to_date": to_date,
            "branch_id": branch_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true)
                setBalancePaymentList(response.data.sales_balance_list);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                setLoading(false)
                setWarnings({ ["warning"]: response.data.msg });
                setBalancePaymentList([]);
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

    const LoadBalancePaymentList = async () => {
        setWarnings({ ["warning"]: "" });
        setBalancePaymentList([]);
        await axios.post(process.env.REACT_APP_API + "SalesListForBalancePayment", {
            "from_date": from_date,
            "to_date": to_date,
            "branch_id": branch_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true)
                setBalancePaymentList(response.data.sales_balance_list);
            }
            else {
                setLoading(false)
                setWarnings({ ["warning"]: response.data.msg });
                setBalancePaymentList([]);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        if (branch_id !== "") {
            LoadBalancePaymentList();
        }
    }, [branch_id]);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BALANCE_PAYMENT_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Balance Payment List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>From Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter From Date'
                                                        name='from_date'
                                                        value={from_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>To Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Enter To Date'
                                                        name='to_date'
                                                        value={to_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "branch_id")} required="required">
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                <div className="bgcolor mt-2" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => BalancePaymentLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
                                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                </div>
                                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                            </CCol>
                                        </CRow>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>

                        {loading ?
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <div className=" my-table table-responsive width100 mt-1">
                                                <table className="table table-bordered-less width100">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Trans ID</th>
                                                            <th>Customer Name</th>
                                                            <th>Mobile No</th>
                                                            <th>Total Amount</th>
                                                            <th>Paid Amount</th>
                                                            <th>Balance Amount</th>
                                                            <th>Balance Payable Date</th>
                                                            <th>Recieve_Balace</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {BalancePaymentList.map((PaymetList, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{PaymetList.sale_trans_id}</td>
                                                                <td>{PaymetList.customer_first_name}</td>
                                                                <td>{PaymetList.customer_mobile_number}</td>
                                                                <td>{PaymetList.sale_total_amount}</td>
                                                                <td>{PaymetList.sale_paid_amount}</td>
                                                                <td>{PaymetList.sale_balance_amount}</td>
                                                                {PaymetList.sale_balance_payable_date !== null ?
                                                                    <td>{PaymetList.sale_balance_payable_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                    : <td></td>
                                                                }
                                                                {PaymetList.sale_balance_amount >= 0 ?
                                                                    <td>
                                                                        <BalancePaymentUpdateModal
                                                                            saleid={PaymetList.sale_id}
                                                                            balance_amount={PaymetList.sale_balance_amount}
                                                                        />
                                                                    </td>
                                                                    : <td></td>
                                                                }
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
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
export default BalancePaymentList;