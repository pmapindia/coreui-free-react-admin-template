import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import PostpaidBillUpdateStatusModal from '../Modals/PostpaidBillUpdateStatusModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const PostpaidBillReport = (props) => {
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

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        bill_member_id: "",
        bill_status_text: "",
        branch_id: ""
    });

    const {
        from_date,
        to_date,
        bill_member_id,
        bill_status_text,
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

    const [MemberDropdowns, setMemberDropdowns] = useState([]);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_MEMBER", "dropdown_filter": "" },
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setMemberDropdowns(ddlist);
                    }

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

        setListInput({ ...ListInput, ["bill_member_id"]: e.value });
    };

    const onChangedropdownBranch = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const [DueBillsList, setDueBillsList] = useState([]);

    const DuePostpaidBills = async (e) => {
        setDueBillsList([]);
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        var list = {}
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        if (bill_member_id === "") {
            list["bill_member_id"] = 0;
        }
        else {
            list["bill_member_id"] = bill_member_id;
        }
        if (branch_id === "") {
            list["branch_id"] = 0;
        }
        else {
            list["branch_id"] = branch_id;
        }

        list["bill_status_text"] = bill_status_text;
        await axios.post(process.env.REACT_APP_API + "PostPaidBillList", list, config).then(response => {
            console.log(response);
            var BillList = [], BillDate, FromDate, ToDate, DueDate;
            if (response.data.is_success) {
                setLoading(true);
                if (response.data.postpaid_bill_list !== null) {
                    for (let i = 0; i < response.data.postpaid_bill_list.length; i++) {
                        if (response.data.postpaid_bill_list[i].bill_generated_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_generated_date
                            BillDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            BillDate = response.data.postpaid_bill_list[i].bill_generated_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_from_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_from_date
                            FromDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            FromDate = response.data.postpaid_bill_list[i].bill_from_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_to_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_to_date
                            ToDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            ToDate = response.data.postpaid_bill_list[i].bill_to_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_last_due_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_last_due_date
                            DueDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            DueDate = response.data.postpaid_bill_list[i].bill_last_due_date
                        }

                        BillList.push({
                            "bill_id": response.data.postpaid_bill_list[i].bill_id,
                            "bill_member_id": response.data.postpaid_bill_list[i].bill_member_id,
                            "member_customer_id": response.data.postpaid_bill_list[i].member_customer_id,
                            "member_name": response.data.postpaid_bill_list[i].member_name,
                            "customer_mobile_number": response.data.postpaid_bill_list[i].customer_mobile_number,
                            "customer_photo": response.data.postpaid_bill_list[i].customer_photo,
                            "bill_postpaid_id": response.data.postpaid_bill_list[i].bill_postpaid_id,
                            "bill_generated_date": BillDate,
                            "bill_amount": response.data.postpaid_bill_list[i].bill_amount,
                            "bill_tax_group_id": response.data.postpaid_bill_list[i].bill_tax_group_id,
                            "bill_last_due_date": DueDate,
                            "bill_from_date": FromDate,
                            "bill_to_date": ToDate,
                            "bill_filename": response.data.postpaid_bill_list[i].bill_filename,
                            "bill_status_text": response.data.postpaid_bill_list[i].bill_status_text,
                            "bill_created_at": response.data.postpaid_bill_list[i].bill_created_at
                        })

                    }
                    setDueBillsList(BillList);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    //setDueBills(response.data.postpaid_bill_list.length);
                }
                else {
                    setDueBillsList([]);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }
            else {
                setLoading(false);
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                //toast.error(response.data.msg);
            }

        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
    }

    const DuePostpaidBill = async (e) => {
        setDueBillsList([]);
        setWarnings({ ["warning"]: "" });
        var list = {}
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        if (bill_member_id === "") {
            list["bill_member_id"] = 0;
        }
        else {
            list["bill_member_id"] = bill_member_id;
        }
        if (branch_id === "") {
            list["branch_id"] = 0;
        }
        else {
            list["branch_id"] = branch_id;
        }

        list["bill_status_text"] = bill_status_text;
        await axios.post(process.env.REACT_APP_API + "PostPaidBillList", list, config).then(response => {
            console.log(response);
            var BillList = [], BillDate, FromDate, ToDate, DueDate;
            if (response.data.is_success) {
                setLoading(true);
                if (response.data.postpaid_bill_list !== null) {
                    for (let i = 0; i < response.data.postpaid_bill_list.length; i++) {
                        if (response.data.postpaid_bill_list[i].bill_generated_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_generated_date
                            BillDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            BillDate = response.data.postpaid_bill_list[i].bill_generated_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_from_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_from_date
                            FromDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            FromDate = response.data.postpaid_bill_list[i].bill_from_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_to_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_to_date
                            ToDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            ToDate = response.data.postpaid_bill_list[i].bill_to_date
                        }

                        if (response.data.postpaid_bill_list[i].bill_last_due_date !== null) {
                            var date = response.data.postpaid_bill_list[i].bill_last_due_date
                            DueDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            DueDate = response.data.postpaid_bill_list[i].bill_last_due_date
                        }

                        BillList.push({
                            "bill_id": response.data.postpaid_bill_list[i].bill_id,
                            "bill_member_id": response.data.postpaid_bill_list[i].bill_member_id,
                            "member_customer_id": response.data.postpaid_bill_list[i].member_customer_id,
                            "member_name": response.data.postpaid_bill_list[i].member_name,
                            "customer_mobile_number": response.data.postpaid_bill_list[i].customer_mobile_number,
                            "customer_photo": response.data.postpaid_bill_list[i].customer_photo,
                            "bill_postpaid_id": response.data.postpaid_bill_list[i].bill_postpaid_id,
                            "bill_generated_date": BillDate,
                            "bill_amount": response.data.postpaid_bill_list[i].bill_amount,
                            "bill_tax_group_id": response.data.postpaid_bill_list[i].bill_tax_group_id,
                            "bill_last_due_date": DueDate,
                            "bill_from_date": FromDate,
                            "bill_to_date": ToDate,
                            "bill_filename": response.data.postpaid_bill_list[i].bill_filename,
                            "bill_status_text": response.data.postpaid_bill_list[i].bill_status_text,
                            "bill_created_at": response.data.postpaid_bill_list[i].bill_created_at
                        })

                    }
                    setDueBillsList(BillList);
                    //setDueBills(response.data.postpaid_bill_list.length);
                }
                else {
                    setDueBillsList([]);
                }
            }
            else {
                setLoading(false);
                setWarnings({ ["warning"]: response.data.msg });
                //toast.error(response.data.msg);
            }

        }).catch(
            error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (bill_member_id !== "") {
            DuePostpaidBill();
        }
    }, [bill_member_id]);

    useEffect(() => {
        if (branch_id !== "") {
            DuePostpaidBill();
        }
    }, [branch_id]);

    useEffect(() => {
        if (bill_status_text !== "") {
            DuePostpaidBill();
        }
    }, [bill_status_text]);
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_POSTPAID_BILL_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Postpaid Bill List</h4>
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
                                                    <CLabel>Select Member</CLabel><span className="red">*</span>
                                                    <Select
                                                        defaultValue={{ label: "ALL", value: 0 }}
                                                        options={MemberDropdowns}
                                                        onChange={(e) => onChangedropdown(e)}

                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Status</CLabel><span className="red">*</span>
                                                    <CSelect name='bill_status_text' onChange={(e) => OnInputChange(e)} custom>
                                                        <option>Select Status</option>
                                                        <option selected={bill_status_text === ""} value="0">ALL</option>
                                                        <option selected={bill_status_text === "PAID"} value="PAID">PAID</option>
                                                        <option selected={bill_status_text === "DUE"} value="DUE">DUE</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdownBranch(e, "branch_id")} required="required">
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" md="6" lg="6"></CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-4">
                                                <div className="bgcolor mt-2" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => DuePostpaidBills(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
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
                                                            <th>Name</th>
                                                            <th>Mobile No</th>
                                                            <th>Generated Date</th>
                                                            <th>Bill Amount</th>
                                                            <th>Last Due Date</th>
                                                            <th>From Date</th>
                                                            <th>To Date</th>
                                                            <th>Status</th>
                                                            <th>Close</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {DueBillsList.map((BillList, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{BillList.member_name}</td>
                                                                <td>{BillList.customer_mobile_number}</td>
                                                                <td>{BillList.bill_generated_date}</td>
                                                                <td>{BillList.bill_amount}</td>
                                                                <td>{BillList.bill_last_due_date}</td>
                                                                <td>{BillList.bill_from_date}</td>
                                                                <td>{BillList.bill_to_date}</td>
                                                                <td>{BillList.bill_status_text}</td>
                                                                {BillList.bill_status_text === "DUE" ?
                                                                    <td>
                                                                        <PostpaidBillUpdateStatusModal
                                                                            billid={BillList.bill_id}
                                                                            billamount={BillList.bill_amount}
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
export default PostpaidBillReport;