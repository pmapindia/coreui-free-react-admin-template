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
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const SalesList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);
    const [disablebutton, setDisableButton] = useState(false);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [loading, setLoading] = useState(false);

    const [ListInput, setListInput] = useState({
        branch_id: "",
        from_date: "",
        to_date: "",
        sale_customer_id: "",
        list_limit: 500,
        current_size: ""
    });

    const {
        branch_id,
        from_date,
        to_date,
        sale_customer_id,
        list_limit,
        current_size
    } = ListInput;


    useEffect(() => {
        if (ListInput.from_date === "" && ListInput.to_date === "") {
            var todaysdate = new Date();
            var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
            setListInput({ ...ListInput, ["from_date"]: todays_date, ["to_date"]: todays_date });
            //console.log(todays_date);
        }
    }, [ListInput.from_date === ""], [ListInput.to_date === ""]);

    const [SalesLists, setSalesLists] = useState([]);
    const [SalesDetails, setSalesDetails] = useState({});
    const [ShowTotals, setShowTotals] = useState(false);

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCustomerDropdowns(ddlist);
                    }
                    // if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                    //     let ddlist = [];
                    //     // for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                    //     //     ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                    //     // }
                    //     setBranchDropdowns(ddlist.each_drop_down_list);
                    // }
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                        setBranchDropdowns(dd_list.each_drop_down_list);
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

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["sale_customer_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                //LoadAllSalesLists();
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
        setSalesLists([]);
    }

    const LoadSalesLists = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (currentsize != 0 && (currentsize >= list_count)) {
            // setLoadAllBtnDisabled(true);
            // setLoadMoreBtnDisabled(true);
            setLoading(false);
            return
        }

        var list = {};
        list["branch_id"] = branch_id;
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["sale_customer_id"] = sale_customer_id;
        list["search_text"] = search_text;
        list["list_limit"] = list_limit;
        list["current_size"] = 0;

        await axios.post(process.env.REACT_APP_API + "SalesList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var SalesList = [], CreatedAt, PayableDate;
                if (response.data.sales_list !== null) {
                    for (let i = 0; i < response.data.sales_list.length; i++) {
                        if (response.data.sales_list[i].sale_created_at !== null) {
                            var Date = response.data.sales_list[i].sale_created_at;
                            CreatedAt = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            CreatedAt = response.data.sales_list[i].sale_created_at;
                        }

                        if (response.data.sales_list[i].sale_balance_payable_date !== null) {
                            var Date = response.data.sales_list[i].sale_balance_payable_date;
                            PayableDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            PayableDate = response.data.sales_list[i].sale_balance_payable_date;
                        }
                        SalesList.push({
                            "member_branch_id": response.data.sales_list[i].member_branch_id,
                            "sale_member_id": response.data.sales_list[i].sale_member_id,
                            "sale_id": response.data.sales_list[i].sale_id,
                            "sale_trans_id": response.data.sales_list[i].sale_trans_id,
                            "sale_customer_id": response.data.sales_list[i].sale_customer_id,
                            "customer_name": response.data.sales_list[i].customer_name,
                            "customer_mobile_number": response.data.sales_list[i].customer_mobile_number,
                            "sale_total_amount": response.data.sales_list[i].sale_total_amount,
                            "sale_paid_amount": response.data.sales_list[i].sale_paid_amount,
                            "sale_balance_amount": response.data.sales_list[i].sale_balance_amount,
                            "sale_balance_payable_date": PayableDate,
                            "sale_created_at": CreatedAt,
                            "sale_created_by": response.data.sales_list[i].sale_created_by,
                            "created_user_name": response.data.sales_list[i].created_user_name
                        });
                    }
                    setSalesLists(SalesList);
                }

                if (response.data.sales_list != null) {
                    var sale_current_size = currentsize + response.data.sales_list.length;
                    console.log("currentsize" + sale_current_size);
                    setCurrentSize(sale_current_size);

                    var finalList = SalesLists.concat(SalesList);
                    console.log("final list" + finalList);
                    setSalesLists(finalList);

                    var sale_list_count = response.data.list_count;
                    setListCount(sale_list_count);
                }

                if (response.data.sales_totals != null) {
                    setShowTotals(true);
                    setSalesDetails(response.data.sales_totals)
                }

            }
            else {
                toast.error(response.data.msg);
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

    const LoadSalesList = async () => {
        setWarnings({ ["warning"]: "" });
        var list = {};
        list["branch_id"] = branch_id;
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["sale_customer_id"] = sale_customer_id;
        list["search_text"] = search_text;
        list["list_limit"] = list_limit;
        list["current_size"] = 0;

        await axios.post(process.env.REACT_APP_API + "SalesList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var SalesList = [], CreatedAt, PayableDate;
                if (response.data.sales_list !== null) {
                    for (let i = 0; i < response.data.sales_list.length; i++) {
                        if (response.data.sales_list[i].sale_created_at !== null) {
                            var Date = response.data.sales_list[i].sale_created_at;
                            CreatedAt = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            CreatedAt = response.data.sales_list[i].sale_created_at;
                        }

                        if (response.data.sales_list[i].sale_balance_payable_date !== null) {
                            var Date = response.data.sales_list[i].sale_balance_payable_date;
                            PayableDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            PayableDate = response.data.sales_list[i].sale_balance_payable_date;
                        }
                        SalesList.push({
                            "member_branch_id": response.data.sales_list[i].member_branch_id,
                            "sale_member_id": response.data.sales_list[i].sale_member_id,
                            "sale_id": response.data.sales_list[i].sale_id,
                            "sale_trans_id": response.data.sales_list[i].sale_trans_id,
                            "sale_customer_id": response.data.sales_list[i].sale_customer_id,
                            "customer_name": response.data.sales_list[i].customer_name,
                            "customer_mobile_number": response.data.sales_list[i].customer_mobile_number,
                            "sale_total_amount": response.data.sales_list[i].sale_total_amount,
                            "sale_paid_amount": response.data.sales_list[i].sale_paid_amount,
                            "sale_balance_amount": response.data.sales_list[i].sale_balance_amount,
                            "sale_balance_payable_date": PayableDate,
                            "sale_created_at": CreatedAt,
                            "sale_created_by": response.data.sales_list[i].sale_created_by,
                            "created_user_name": response.data.sales_list[i].created_user_name
                        });
                    }
                    setSalesLists(SalesList);
                }

                if (response.data.sales_totals != null) {
                    setShowTotals(true);
                    setSalesDetails(response.data.sales_totals)
                }

            }
            else {
                toast.error(response.data.msg);
                setLoading(false);
                setWarnings({ ["warning"]: response.data.msg });
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
            })
    }

    useEffect(() => {
        if (branch_id !== "") {
            LoadSalesList();
        }
    }, [branch_id]);

    const SaleDownloadPDF = async (sale_id, branch_id, member_id) => {
        //e.preventDefault();
        var list = {};
        list["branch_id"] = branch_id;
        list["member_id"] = member_id;
        list["sale_id"] = sale_id;
        await axios.post(process.env.REACT_APP_API + "SaleDownloadPDF", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var str = response.data.filename.replace(/"/g, "");
                console.log(str);
                const url = process.env.REACT_APP_DOCUMENTPATH + cookies.unique_code + "/CUSTOMER_INVOICE/" + str;
                console.log(url);
                window.open(url, '_blank');
            }
            else{
                toast.error(response.data.extra_info);
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
            })
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SALES_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Sales List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                    {/* <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "branch_id")} required="required">
                                                    </Select> */}
                                                    <CSelect custom name='branch_id' onChange={(e) => OnInputChange(e)}>
                                                        {/* <option>Select Branch</option> */}
                                                        {BranchDropdowns.map((branchdropdown, index) => (
                                                            <option
                                                                selected={branch_id === branchdropdown.dd_id}
                                                                key={index + 1}
                                                                value={branchdropdown.dd_id}
                                                            >
                                                                {branchdropdown.dd_name}
                                                            </option>
                                                        ))}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
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
                                                    <CLabel>Customer</CLabel>
                                                    <Select
                                                        options={CustomerDropdowns}
                                                        defaultValue={{ label: "ALL", value: "" }}
                                                        onChange={(e) => onChangeCustdropdown(e)} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="9" md="9" lg="9" >
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" >
                                                <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => LoadSalesLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
                                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                </div>
                                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>

                        {loading ?
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                    <CFormGroup>
                                                        <div class="inner-addon right-addon">
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
                                            </CRow>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                    <CLabel><h5>Total Amount: {SalesDetails.total_amount}</h5></CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                    <CLabel><h5>Total Paid Amount: {SalesDetails.total_paid_amount}</h5></CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                    <CLabel><h5>Total Balance Amount: {SalesDetails.total_balance_amount}</h5></CLabel>
                                                </CCol>
                                            </CRow>
                                            {/* <hr className="bgcolor" style={{ height: "1px" }} /> */}
                                            {/* <div className=" my-table table-responsive width100 mt-1"> */}
                                            <table className='table table-bordered-less table-responsive width100'>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Transaction_ID</th>
                                                        <th>Customer_Name</th>
                                                        <th>Mobile_No</th>
                                                        <th>Total_Amount</th>
                                                        <th>Paid_Amount</th>
                                                        <th>Balance_Amount</th>
                                                        <th>Balance_Payable_Date</th>
                                                        {/* <th>Edit</th> */}
                                                        {/* <th>Delete</th> */}
                                                        {
                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SALES_DETAILS) ?
                                                                <th>Details</th>
                                                                : null
                                                        }
                                                        <th>Download_Invoice</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {SalesLists.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.sale_trans_id}</td>
                                                            <td>{List.customer_name}</td>
                                                            <td>{List.customer_mobile_number}</td>
                                                            <td>{List.sale_total_amount}</td>
                                                            <td>{List.sale_paid_amount}</td>
                                                            <td>{List.sale_balance_amount}</td>
                                                            <td>{List.sale_balance_payable_date}</td>
                                                            {/* <td></td> */}
                                                            {/* <td></td> */}
                                                            {
                                                                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SALES_DETAILS) ?
                                                                    <td>
                                                                        <Link to={`/sales-details?saleid=${List.sale_id}`}
                                                                            className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                            Details
                                                                        </Link>
                                                                    </td>
                                                                    : null
                                                            }
                                                            <td>
                                                                <CButton className="btn btn-sm bgcolor white" onClick={(e) => SaleDownloadPDF(List.sale_id, List.member_branch_id, List.sale_member_id)} >Download Invoice</CButton>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* </div> */}
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
export default SalesList;