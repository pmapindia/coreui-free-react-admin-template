import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteModal from 'src/views/AdminViews/Modals/DeleteModal'
import Select from 'react-select';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const BranchInventoryList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [disablebutton, setDisableButton] = useState(false);
    const [loadmorebtndisabled, setLoadMoreBtnDisabled] = useState(false);
    const [loadallbtndisabled, setLoadAllBtnDisabled] = useState(false);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [loading, setLoading] = useState(false);

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [InventoryLists, setInventoryLists] = useState([]);

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        inventory_branch_id: "",
        inventory_status_text: "",
        search_text: "",
        list_limit: "",
        current_size: ""
    });

    const {
        from_date,
        to_date,
        inventory_branch_id,
        inventory_status_text,
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

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadInventoryLists();
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
        setInventoryLists([]);
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
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

        setListInput({ ...ListInput, ["enquiry_branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadInventoryLists = async (e) => {
        e.preventDefault();
        setWarnings({ ["warning"]: "" });
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (currentsize != 0 && (currentsize >= list_count)) {
            setLoadAllBtnDisabled(true);
            setLoadMoreBtnDisabled(true);
            setLoading(false);
            return
        }
        var list = {};
        list["from_date"] = from_date;
        list["to_date"] = to_date;
        list["inventory_branch_id"] = inventory_branch_id;
        list["inventory_status_text"] = "ACTIVE"
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;

        await axios.post(process.env.REACT_APP_API + "BranchInventoryList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                if (response.data.branch_inventory_list !== null) {
                    setInventoryLists(response.data.branch_inventory_list);
                }
                else {
                    setInventoryLists([]);
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
        var temp_user = [...InventoryLists];
        temp_user.splice(index, 1);
        setInventoryLists([]);
        setInventoryLists(temp_user);
    }


    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Branch Inventory List</h4>
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
                                                        onChange={(e) => onChangedropdown(e, "enquiry_branch_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => LoadInventoryLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
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
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <div className=" my-table table-responsive width100 mt-1">
                                                    <table className="table table-bordered-less width100">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>BRANCH</th>
                                                                <th>PURCHASE_DATE</th>
                                                                <th>INVOICE_NO</th>
                                                                <th>ITEM_NAME</th>
                                                                <th>QUANTITY</th>
                                                                <th>TAX_AMOUNT</th>
                                                                <th>PRICE</th>
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_EDIT) ?
                                                                        <th>EDIT</th>
                                                                        : null
                                                                }
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_DELETE) ?
                                                                        <th>DELETE</th>
                                                                        : null
                                                                }

                                                                <th>DETAILS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {InventoryLists.map((InventoryList, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{InventoryList.branch_name}</td>
                                                                    {InventoryList.inventory_purchase_date !== null ?
                                                                        <td>{InventoryList.inventory_purchase_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                        : <td></td>
                                                                    }
                                                                    <td>{InventoryList.inventory_invoice_number}</td>
                                                                    <td>{InventoryList.inventory_item_name}</td>
                                                                    <td>{InventoryList.inventory_quantity}</td>
                                                                    <td>{InventoryList.inventory_total_tax_amount}</td>
                                                                    <td>{InventoryList.inventory_total_price}</td>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_EDIT) ?
                                                                            <td>
                                                                                <Link to={{
                                                                                    pathname: '/branch-inventory',
                                                                                    pfid: {
                                                                                        pfid: InventoryList.inventory_id
                                                                                    }
                                                                                }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                                    </i>
                                                                                </Link>
                                                                            </td>
                                                                            : null
                                                                    }
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_DELETE) ?
                                                                            <td>
                                                                                <DeleteModal delete_guid={InventoryList.inventory_id}
                                                                                    name={InventoryList.inventory_item_name}
                                                                                    index={index}
                                                                                    apiname={"BranchInventoryDelete"}
                                                                                    guidinput={"inventory_id"}
                                                                                    changeDependency={Parentvaluetomodal}
                                                                                />
                                                                            </td>
                                                                            : null
                                                                    }


                                                                    <td>
                                                                        <Link to={`/branch-inventory-details?inventoryid=${InventoryList.inventory_id}`}
                                                                            className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
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
                    :
                    <Notification />
            }
        </>
    )
}
export default BranchInventoryList;
