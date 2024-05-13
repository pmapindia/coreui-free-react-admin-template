import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DeleteModal from 'src/views/AdminViews/Modals/DeleteModal'
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const ExpensesList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [disablebutton, setDisableButton] = useState(false);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [loading, setLoading] = useState(false);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        exp_branch_id: "",
        exp_payment_method: "",
        search_text: "",
        list_limit: "",
        current_size: ""
    });

    const {
        from_date,
        to_date,
        exp_branch_id,
        exp_payment_method,
        search_text,
        list_limit,
        current_size
    } = ListInput;

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (ListInput.from_date === "" && ListInput.to_date === "") {
            var todaysdate = new Date();
            var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
            setListInput({ ...ListInput, ["from_date"]: todays_date, ["to_date"]: todays_date });
            //console.log(todays_date);
        }
    }, [ListInput.from_date === ""], [ListInput.to_date === ""]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
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

        setListInput({ ...ListInput, ["exp_branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);


    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                //LoadExpenseList();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setListInput({ ...ListInput, [e.target.name]: "" });
        } else {
            setListInput({ ...ListInput, [e.target.name]: e.target.value });

        }
        setExpensesLists([]);
    }

    const [ExpensesLists, setExpensesLists] = useState([]);
    const LoadExpenseLists = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        var list = {};
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["exp_branch_id"] = exp_branch_id;
        list["exp_payment_method"] = exp_payment_method;
        list["search_text"] = search_text;
        list["list_limit"] = 250;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "ExpenseList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";

                var ExpenseList = [], ExpDate;
                if (response.data.expense_list !== null) {

                    for (let i = 0; i < response.data.expense_list.length; i++) {
                        if (response.data.expense_list[i].exp_date !== null) {
                            var Date = response.data.expense_list[i].exp_date;
                            ExpDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            ExpDate = response.data.expense_list[i].exp_date;
                        }

                        ExpenseList.push({
                            "exp_id": response.data.expense_list[i].exp_id,
                            "exp_date": ExpDate,
                            "exp_branch_id": response.data.expense_list[i].exp_branch_id,
                            "branch_name": response.data.expense_list[i].branch_name,
                            "exp_user_id": response.data.expense_list[i].exp_user_id,
                            "user_user_name": response.data.expense_list[i].user_user_name,
                            "exp_paying_for": response.data.expense_list[i].exp_paying_for,
                            "exp_company_name": response.data.expense_list[i].exp_company_name,
                            "exp_receiving_person": response.data.expense_list[i].exp_receiving_person,
                            "exp_amount": response.data.expense_list[i].exp_amount,
                            "exp_reference_number": response.data.expense_list[i].exp_reference_number,
                            "exp_payment_method": response.data.expense_list[i].exp_payment_method,
                            "exp_bank_details": response.data.expense_list[i].exp_bank_details,
                            "exp_created_at": response.data.expense_list[i].exp_created_at,
                            "exp_created_by": response.data.expense_list[i].exp_created_by,
                            "exp_created_user_name": response.data.expense_list[i].exp_created_user_name,
                            "exp_updated_at": response.data.expense_list[i].exp_updated_at,
                            "exp_updated_by": response.data.expense_list[i].exp_updated_by,
                            "exp_updated_user_name": response.data.expense_list[i].exp_updated_user_name
                        });
                    }
                    setExpensesLists(ExpenseList);
                }
                else {
                    setExpensesLists([]);
                    setLoading(false);
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                }
            }
            else {
                setLoading(false);
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
        var temp_user = [...ExpensesLists];
        temp_user.splice(index, 1);
        setExpensesLists([]);
        setExpensesLists(temp_user);
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Expense List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CLabel>From Date</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Enter From Date'
                                                    name='from_date'
                                                    value={from_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CLabel>To Date</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Enter To Date'
                                                    name='to_date'
                                                    value={to_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>

                                            <CCol sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Branch</CLabel><span className="red">*</span>
                                                    <Select
                                                        options={BranchDropdowns}
                                                        defaultValue={{ label: "ALL", value: "0" }}
                                                        onChange={(e) => onChangedropdown(e, "exp_branch_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
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
                                            <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                                            <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="">
                                                <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => LoadExpenseLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
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
                        {loading ? <div>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1">
                                                    <CFormGroup>
                                                        <div class="inner-addon right-addon" style={{ borderRadius: "20px" }}>
                                                            <i class="fa fa-search"></i>
                                                            <CInput type="text" style={{ borderRadius: "20px" }}
                                                                placeholder="Search Here..."
                                                                name="search_text"
                                                                value={search_text}
                                                                onChange={(e) => OnInputChangeSearch(e)}
                                                            >
                                                            </CInput>
                                                        </div>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs="12" sm="5" md="5" lg="5"></CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1"></CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <div className=" my-table table-responsive width100 mt-1">
                                                        <table className="table table-bordered-less width100">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Date</th>
                                                                    <th>Branch</th>
                                                                    <th>Paying For</th>
                                                                    <th>Company Name</th>
                                                                    <th>Amount</th>
                                                                    <th>Payment Method</th>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_EDIT) ?
                                                                            <th>Edit</th>
                                                                            : null
                                                                    }
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_DELETE) ?
                                                                            <th>Delete</th>
                                                                            : null
                                                                    }

                                                                    <th>Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ExpensesLists.map((List, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{List.exp_date}</td>
                                                                        <td>{List.branch_name}</td>
                                                                        <td>{List.exp_paying_for}</td>
                                                                        <td>{List.exp_company_name}</td>
                                                                        <td>{List.exp_amount}</td>
                                                                        <td>{List.exp_payment_method}</td>
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_EDIT) ?
                                                                                <td>
                                                                                    <Link to={{
                                                                                        pathname: '/expenses',
                                                                                        pfid: {
                                                                                            pfid: List.exp_id
                                                                                        }
                                                                                    }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                                        </i>
                                                                                    </Link>
                                                                                </td>
                                                                                : null
                                                                        }
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_EXPENSE_DELETE) ?
                                                                                <td>
                                                                                    <DeleteModal delete_guid={List.exp_id}
                                                                                        name={List.branch_name}
                                                                                        index={index}
                                                                                        apiname={"ExpenseDelete"}
                                                                                        guidinput={"exp_id"}
                                                                                        changeDependency={Parentvaluetomodal}
                                                                                    />
                                                                                </td>
                                                                                : null
                                                                        }


                                                                        <td>
                                                                            <Link to={`/expence-details?ExpenseId=${List.exp_id}`}
                                                                                className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                                Details
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </div>
                            : null}
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default ExpensesList;
