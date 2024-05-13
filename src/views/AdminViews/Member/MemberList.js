import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody, } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { CButtonGroup, CCardFooter, CProgress, } from '@coreui/react-pro';
import { CTable, CTableRow, CAvatar, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from '@coreui/react-pro';
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import {
    cibCcAmex, cilCheckCircle, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin,
    cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale,
} from '@coreui/icons'
import MakeInactiveModal from './MemberUpdateModals/MakeInactiveModal';
import MakeActiveModal from './MemberUpdateModals/MakeActiveModal';
import DeleteModal from '../Modals/DeleteModal';
import SendMessageModal from './MemberUpdateModals/SendMessageModal';
import RenewMembershipValidation from '../Modals/RenewMembershipValidation';
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const MemberList = (props) => {

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

    const [MemberLists, setMemberLists] = useState([]);

    const [MemberListInput, setMemberListInput] = useState({
        member_product_id: "",
        branch_id: "",
    });

    const { member_product_id, branch_id } = MemberListInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setMemberListInput({ ...MemberListInput, [e.target.name]: e.target.value });
        setMemberLists([]);//PASSING EMPTY ARRAY
    }

    const [ProductPackageList, setProductPackageList] = useState([]);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_PRODUCT_PACKAGE", "dropdown_filter": "" },
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_PRODUCT_PACKAGE") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            // ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setProductPackageList(dd_list.each_drop_down_list);
                    }

                    // if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                    //     let ddlist = [];
                    //     for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                    //         ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                    //     }
                    //     setBranchDropdowns(ddlist);
                    // }
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                        setBranchDropdowns(dd_list.each_drop_down_list);
                        if (dd_list.each_drop_down_list.length === 1) {
                            setMemberListInput({ ...MemberListInput, "branch_id": dd_list.each_drop_down_list.dd_id })
                        }
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
        setMemberListInput({ ...MemberListInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadAllMemberLists();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...search_text1, [e.target.name]: "" });
        } else {
            setSearchText({ ...search_text1, [e.target.name]: e.target.value });

        }
        setMemberLists([]);
    }

    var img;
    const LoadAllMemberLists = async () => {
        var list = {};
        list["member_product_id"] = 0;
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "MemberList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var MemList = [];
                var newdate, time, Time, meridiemTime, EndDate, ProductName, NewDate;
                if (response.data.member_list !== null) {

                    for (let i = 0; i < response.data.member_list.length; i++) {
                        if (response.data.member_list[i].member_last_login_date !== null) {
                            var date = response.data.member_list[i].member_last_login_date;
                            newdate = date.substring(0, 10);

                            NewDate = newdate.split('-').reverse().join('-')
                            Time = date.substring(11, 17);

                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                            //console.log("time:"+meridiemTime);
                        }
                        else {
                            NewDate = "";
                            meridiemTime = ""
                        }

                        if (response.data.member_list[i].member_product_end_date !== null) {
                            var date = response.data.member_list[i].member_product_end_date;
                            EndDate = date.substring(0, 10);
                            EndDate = EndDate.split('-').reverse().join('-')
                        }
                        else {
                            EndDate = "";
                        }

                        if (response.data.member_list[i].product_type === "PRODUCT") {
                            ProductName = response.data.member_list[i].product_name
                        }
                        else if (response.data.member_list[i].product_type === "PROGRAM" || response.data.member_list[i].product_type === "PACKAGE") {
                            ProductName = response.data.member_list[i].product_name
                        }
                        else {
                            ProductName = "POSTPAID"
                        }

                        img = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + response.data.member_list[i].customer_photo;
                        MemList.push({
                            "member_id": response.data.member_list[i].member_id,
                            "member_customer_id": response.data.member_list[i].member_customer_id,
                            "customer_name": response.data.member_list[i].customer_name,
                            "customer_mobile_number": response.data.member_list[i].customer_mobile_number,
                            "customer_email_address": response.data.member_list[i].customer_email_address,
                            "customer_photo": response.data.member_list[i].customer_photo,
                            "member_branch_id": response.data.member_list[i].member_branch_id,
                            "member_unique_id": response.data.member_list[i].member_unique_id,
                            "member_product_id": response.data.member_list[i].member_product_id,
                            "member_product_end_date": EndDate,
                            "member_is_postpaid": response.data.member_list[i].member_is_postpaid,
                            "product_name": ProductName,
                            "member_status_text": response.data.member_list[i].member_status_text,
                            "member_fingerprint_data": response.data.member_list[i].member_fingerprint_data,
                            "member_last_login_date": NewDate + " " + meridiemTime
                        });
                    }
                    //setMemberLists(response.data.member_list)
                    setMemberLists(MemList);

                }
                else {
                    setMemberLists([]);
                }
            }
            else {
                toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const LoadAllMemberList = async () => {
        var list = {};
        list["branch_id"] = branch_id;
        list["member_product_id"] = member_product_id;
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "MemberList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var MemList = [];
                var newdate, time, Time, meridiemTime, EndDate, ProductName, NewDate;
                if (response.data.member_list !== null) {

                    for (let i = 0; i < response.data.member_list.length; i++) {
                        if (response.data.member_list[i].member_last_login_date !== null) {
                            var date = response.data.member_list[i].member_last_login_date;
                            newdate = date.substring(0, 10);

                            NewDate = newdate.split('-').reverse().join('-')
                            Time = date.substring(11, 17);

                            time = Time.split(':');// here the time is like "16:14"
                            meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                            //console.log("time:"+meridiemTime);
                        }
                        else {
                            NewDate = "";
                            meridiemTime = ""
                        }

                        if (response.data.member_list[i].member_product_end_date !== null) {
                            var date = response.data.member_list[i].member_product_end_date;
                            EndDate = date.substring(0, 10);
                            EndDate = EndDate.split('-').reverse().join('-')
                        }
                        else {
                            EndDate = "";
                        }

                        if (response.data.member_list[i].product_type === "PRODUCT") {
                            ProductName = response.data.member_list[i].product_name
                        }
                        else if (response.data.member_list[i].product_type === "PROGRAM" || response.data.member_list[i].product_type === "PACKAGE") {
                            ProductName = response.data.member_list[i].product_name
                        }
                        else {
                            ProductName = "POSTPAID"
                        }

                        img = process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + response.data.member_list[i].customer_photo;
                        MemList.push({
                            "member_id": response.data.member_list[i].member_id,
                            "member_customer_id": response.data.member_list[i].member_customer_id,
                            "customer_name": response.data.member_list[i].customer_name,
                            "customer_mobile_number": response.data.member_list[i].customer_mobile_number,
                            "customer_email_address": response.data.member_list[i].customer_email_address,
                            "customer_photo": response.data.member_list[i].customer_photo,
                            "member_branch_id": response.data.member_list[i].member_branch_id,
                            "member_unique_id": response.data.member_list[i].member_unique_id,
                            "member_product_id": response.data.member_list[i].member_product_id,
                            "member_product_end_date": EndDate,
                            "member_is_postpaid": response.data.member_list[i].member_is_postpaid,
                            "product_name": ProductName,
                            "member_status_text": response.data.member_list[i].member_status_text,
                            "member_fingerprint_data": response.data.member_list[i].member_fingerprint_data,
                            "member_last_login_date": NewDate + " " + meridiemTime
                        });
                    }
                    //setMemberLists(response.data.member_list)
                    setMemberLists(MemList);

                }
                else {
                    setMemberLists([]);
                }
            }
            else {
                toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadAllMemberLists();
        GetDropDown();
    }, []);

    useEffect(() => {
        LoadAllMemberList();
    }, [member_product_id]);

    useEffect(() => {
        LoadAllMemberList();
    }, [branch_id]);

    const Parentvaluetomodal = (data, index) => {
        var temp_user = [...MemberLists];
        temp_user.splice(index, 1);
        setMemberLists([]);
        setMemberLists(temp_user);
    }

    const [checklists1, setCheckLists1] = useState([]);
    const [checklists2, setCheckLists2] = useState([]);
    const [checklists3, setCheckLists3] = useState([]);
    var checkall = [];
    var checksin = [];

    const handleChange1 = (e) => {
        const { value, checked } = e.target;
        if (value === "allSelect") {
            let tempUser = MemberLists.map((user) => {
                //const[allnewroutecards,setAllNewRouteCards]=useState([]);

                console.log("all");
                console.warn({ ...user, isChecked: checked });
                //console.warn("Branch Id: "+user.member_branch_id);

                checkall.push(user.member_id);

                // checkno.push(user.customer_mobile_number);

                // checkemail.push(user.customer_email_address);
                return { ...user, isChecked: checked };
            });

            for (let a = 0; a < tempUser.length; a++) {
                if (tempUser[a].isChecked === true) {
                    // console.warn("if");
                    // console.warn(checkall);
                    setCheckLists1(checkall);
                    // console.warn(checkno);
                    // setCheckLists2(checkno);
                    // console.warn(checkemail);
                    // setCheckLists3(checkemail);
                }
                else {
                    setCheckLists1([]);
                    // setCheckLists2([]);
                    // setCheckLists3([]);
                }
            }
            setMemberLists(tempUser);
        }
        else {
            alert("Else Condition");
            let tempUser = MemberLists.map((user) =>
                user.member_id === value ? { ...user, isChecked: checked } : user);
            var temp_category = [...checklists1];
            console.warn("Check List");
            console.warn(checklists1);

            for (let u = 0; u < tempUser.length; u++) {
                console.log(tempUser[u].isChecked === true);
                console.warn(tempUser);
                console.warn(checksin);
                if (tempUser[u].isChecked === true) {
                    console.warn(checklists1);
                    checksin.push(tempUser[u].member_id);
                    setCheckLists1(checksin);
                }
                else {
                    var id_index = "";
                    console.log("checklists1");

                    for (let i = 0; i < checklists1.length; i++) {
                        if (checklists1[i] === value) {
                            alert(checklists1[i] === value);
                            id_index = i;

                            temp_category.splice(id_index, 1);
                            setCheckLists1([]);
                            console.warn("temp_category single");
                            console.log(id_index);
                            console.warn(temp_category);
                            setCheckLists1(temp_category);

                        }
                    }
                }
            }
            console.warn("temp_categoryhjhh");
            console.log(id_index);
            console.warn(temp_category);
            setMemberLists(tempUser);
        }
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (value === "allSelect") {
            let tempUser = MemberLists.map((user) => {
                //const[allnewroutecards,setAllNewRouteCards]=useState([]);

                console.log("all");
                console.warn({ ...user, isChecked: checked });
                console.warn(user.member_id);

                checkall.push(user.member_id);
                return { ...user, isChecked: checked };
            });

            for (let a = 0; a < tempUser.length; a++) {
                if (tempUser[a].isChecked === true) {
                    console.warn("if");
                    console.warn(checkall);
                    setCheckLists1(checkall);
                }
                else {
                    setCheckLists1([]);
                }
            }
            setMemberLists(tempUser);
        }
        else {
            let tempUser = MemberLists.map((user) =>
                user.member_id === value ? { ...user, isChecked: checked } : user);
            var temp_category = [...checklists1];
            console.log(MemberLists.length);
            console.log(tempUser.length);

            for (let u = 0; u < tempUser.length; u++) {
                console.log(tempUser[u].isChecked === true);
                console.warn(tempUser);
                console.warn(checksin);
                if (tempUser[u].isChecked === true) {
                    console.warn(checklists1);
                    checksin.push(tempUser[u].member_id);
                    setCheckLists1(checksin);
                }
                else {
                    var guid_index = "";
                    console.log("checklists1");

                    for (let i = 0; i < checklists1.length; i++) {
                        if (checklists1[i] === value) {
                            guid_index = i;
                            temp_category.splice(guid_index, 1);
                            setCheckLists1([]);
                            console.warn("temp_category single");
                            console.log(guid_index);
                            console.warn(temp_category);
                            setCheckLists1(temp_category);
                        }
                    }
                }
            }
            console.warn("temp_categoryhjhh");
            console.log(guid_index);
            console.warn(temp_category);
            setMemberLists(tempUser);
        }
    };


    const modaltoparent = () => {
        LoadAllMemberLists();
    }

    const [disablebuttondc, setDisableButtonDC] = useState(false);
    const MemberExportExcel = async (e) => {
        e.preventDefault();
        setDisableButtonDC(true);
        document.getElementById("img_gif_loading_btn_DC").style.display = "block";
        var list = {};
        list["branch_id"] = branch_id;
        list["member_product_id"] = member_product_id;
        await axios.post(process.env.REACT_APP_API + "MemberExportExcel", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var documentnamne = response.data.filename

                console.log(documentnamne);
                var str = documentnamne.replace(/"/g, "");
                console.log(str);
                const url = process.env.REACT_APP_DOCUMENTPATH_FOR_MEMBER_EXCEL + cookies.unique_code + "/DOWNLOADS/" + str;
                console.log(url);
                window.open(url, '_blank');
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            }
            else {
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            }


        }).catch(error => {
            console.log(error);
            setDisableButtonDC(false);
            document.getElementById("img_gif_loading_btn_DC").style.display = "none";
        })
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MEMBER_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Member List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel>
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
                                                    {/* <Select value={BranchDropdowns.filter(function (option) {
                                                        return option.value === branch_id;
                                                    })}
                                                        options={BranchDropdowns}
                                                        onChange={(e) => onChangedropdown(e, "branch_id")} required="required" selected="true">
                                                    </Select> */}
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Package/Product</CLabel>
                                                    <CSelect
                                                        name="member_product_id"

                                                        custom
                                                        onChange={(e) => OnInputChange(e)}
                                                    >
                                                        <option >Select Package/Product</option>
                                                        {ProductPackageList.map((branchdropdown, index) => (

                                                            <option selected={member_product_id === branchdropdown.dd_id} key={index + 1} value={branchdropdown.dd_id}>{branchdropdown.dd_name}</option>
                                                        ))}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-4 pt-1">
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
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="2" md="2">
                                                <CFormGroup>
                                                    <CLabel>Select All</CLabel>
                                                    <CRow>
                                                        <CCol xs="6" sm="4">
                                                            <CFormGroup>
                                                                <CInput style={{ width: "30px", marginLeft: "15px" }}
                                                                    type="checkbox"
                                                                    value="allSelect"
                                                                    checked={!MemberLists.some((user) => user?.isChecked !== true)}
                                                                    onChange={handleChange}
                                                                />
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4" className="mt-1"></CCol>
                                            <CCol xs="12" sm="2" md="2" lg="2" className="mt-4">
                                                <SendMessageModal
                                                    changeDependency={modaltoparent}
                                                    mem_ids={checklists1}
                                                />
                                                {/* <CButton className='btn btn-sm bgcolor width100 white' style={{}}>Send Message</CButton> */}
                                            </CCol>
                                            <CCol xs="12" sm="2" md="2" lg="2" className="mt-4">
                                                <Link to={'/memberimportexcel'} className='btn width100 btn-sm btn-outline-success'>
                                                    <i class="fa fa-file-excel-o"></i> Import Excel
                                                </Link>
                                            </CCol>
                                            <CCol xs="12" sm="2" md="2" lg="2" className="mt-4">
                                                <div className="" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" className='btn btn-sm btn-outline-danger'
                                                        onClick={(e) => MemberExportExcel(e)}
                                                        disabled={disablebuttondc}
                                                        style={{ width: "100%", color: "", fontWeight: "50%", fontSize: "12px" }} ><i class="fa fa-file-excel-o"></i> Export Excel</CButton>
                                                    <img id="img_gif_loading_btn_DC" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "5px", display: "none" }} />
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs="12" sm="12" md="12" lg="12" >
                                                <table className="mb-0 table border width100">
                                                    <thead>
                                                        <th className="text-center"><CIcon icon={cilCheckCircle} name="cil-check-circle" aria-hidden="true" size="lg" className="" /></th>
                                                        <th ><CIcon icon={cilPeople} name="cil-people" aria-hidden="true" size="lg" className="ml-2" /></th>
                                                        <th>Member</th>
                                                        <th>Package</th>
                                                        <th>Expiry Date</th>
                                                        <th>Last Login</th>
                                                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DELETE_MEMBER) ?
                                                            <th>Delete</th>
                                                            : null
                                                        }
                                                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DETAILS_MEMBER) ?
                                                            <th>Details</th>
                                                            : null
                                                        }
                                                    </thead>
                                                    <tbody>
                                                        {MemberLists.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <CInput type='checkbox'
                                                                        value={item.member_id}
                                                                        checked={item?.isChecked || false}
                                                                        onChange={handleChange}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    {item.customer_photo !== "" ?
                                                                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "10px", borderColor: "red" }}>
                                                                            {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                                                            <img className="playerProfilePic_home_tile " style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + item.customer_photo}
                                                                            />
                                                                        </div>
                                                                        :
                                                                        item.customer_photo == null ?
                                                                            <div style={{ borderRadius: "50%", }}>
                                                                //     {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                                                                <img className="playerProfilePic_home_tile "
                                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                />
                                                                            </div>
                                                                            :
                                                                            <div style={{ borderRadius: "50%", }}>
                                                                                <img className="playerProfilePic_home_tile "
                                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                                />
                                                                            </div>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div>{item.customer_name}</div>
                                                                    <div className="small text-medium-emphasis">
                                                                        <span>{item.member_unique_id}</span> | {item.customer_mobile_number}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>{item.product_name}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{item.member_product_end_date.substring(0, 10)}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{item.member_last_login_date}</div>
                                                                </td>
                                                                {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DELETE_MEMBER) ?
                                                                    <td>
                                                                        <DeleteModal delete_guid={item.member_id}
                                                                            name={item.customer_name}
                                                                            index={index}
                                                                            apiname={"MemberDelete"}
                                                                            guidinput={"member_id"}
                                                                            changeDependency={Parentvaluetomodal}
                                                                        />
                                                                    </td>
                                                                    : null
                                                                }
                                                                {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DETAILS_MEMBER) ?
                                                                    <td>
                                                                        <Link to={`/member-details?memid=${item.member_id}`}
                                                                            className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                            Details
                                                                        </Link>
                                                                    </td>
                                                                    : null}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </CCol>
                                        </CRow>

                                        {/* <CTable align="middle" className="mb-0 border" hover responsive>
                                    <CTableHead color="light" >
                                        <CTableRow>
                                            <CTableHeaderCell className="text-center">
                                                <CIcon icon={cilCheckCircle} name="cil-check-circle" aria-hidden="true" size="lg" className="" />
                                            </CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">
                                                <CIcon icon={cilPeople} name="cil-people" aria-hidden="true" size="lg" className="" />
                                                {/* <i class="fa fa-user" aria-hidden="true"></i> */}
                                        {/* </CTableHeaderCell>
                                            <CTableHeaderCell>Member</CTableHeaderCell>
                                            <CTableHeaderCell >Package</CTableHeaderCell>
                                            <CTableHeaderCell>Expiry Date</CTableHeaderCell>
                                            <CTableHeaderCell >Last Login</CTableHeaderCell>
                                            {cookies.user_type === "ADMIN" ?
                                                <CTableHeaderCell >Delete</CTableHeaderCell>
                                                : null
                                            }  */}
                                        {/* <CTableHeaderCell >Active/Inactive</CTableHeaderCell> */}
                                        {/* <CTableHeaderCell >Diet Chart</CTableHeaderCell>
                                            <CTableHeaderCell >Workout History</CTableHeaderCell> */}
                                        {/* <CTableHeaderCell>Details</CTableHeaderCell> */}
                                        {/* </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {MemberLists.map((item, index) => (
                                            <CTableRow v-for="item in tableItems" key={index}>
                                                <CTableDataCell className="text-center">
                                                    <CInput type='checkbox'
                                                        value={item.member_id}
                                                        checked={item?.isChecked || false}
                                                        onChange={handleChange}
                                                    />
                                                </CTableDataCell>

                                                <CTableDataCell className="text-center">
                                                    {item.customer_photo !== "" ?
                                                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "10px", borderColor: "red" }}> */}
                                        {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                        {/* <img className="playerProfilePic_home_tile " style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + item.customer_photo}
                                                            />
                                                        </div>
                                                        :
                                                        item.customer_photo == null ?
                                                            <div style={{ borderRadius: "50%", }}> */}
                                        {/* <CAvatar size="sm" shape='rounded-circle'  src={item.customer_photo} status={'success'} /> */}
                                        {/* <img className="playerProfilePic_home_tile "
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                            </div>
                                                            :
                                                            <div style={{ borderRadius: "50%", }}>
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                            </div> */}
                                        {/* }

                                                </CTableDataCell>

                                                <CTableDataCell>
                                                    <div>{item.customer_name}</div>
                                                    <div className="small text-medium-emphasis">
                                                        <span>{item.member_unique_id}</span> | {item.customer_mobile_number}
                                                    </div>
                                                </CTableDataCell>

                                                <CTableDataCell>
                                                    <div>{item.product_name}</div>
                                                </CTableDataCell>

                                                <CTableDataCell> */}
                                        {/* <div className="clearfix">
                                                        <div className="float-start"> */}
                                        {/* <strong>{item.usage.value}%</strong> */}
                                        {/* </div>
                                                    </div> */}
                                        {/* <div>{item.member_product_end_date.substring(0, 10)}</div>
                                                </CTableDataCell>

                                                <CTableDataCell>
                                                    <div>{item.member_last_login_date}</div>
                                                </CTableDataCell> */}

                                        {/* <CTableDataCell>
                                                    <Link 
                                                    //to={`/dietchart?memid=${item.member_id}`}
                                                        className="btn btn-sm bgblue white width100" style={{paddingLeft: "4px", textAlign: "center", }}>
                                                        Diet Chart
                                                    </Link>
                                                </CTableDataCell>

                                                <CTableDataCell>
                                                    <Link 
                                                    //to={`/work-out-history?memid=${item.member_id}`}
                                                        className="btn bggreen btn-sm white width100" style={{paddingLeft: "4px", textAlign: "center" }}>
                                                        Workout History
                                                    </Link>
                                                </CTableDataCell> */}

                                        {/* {item.member_status_text!=="INACTIVE" ?
                                                    <CTableDataCell>
                                                        <MakeInactiveModal
                                                            //index={index}
                                                            mem_id={item.member_id}
                                                            name={item.customer_name}
                                                            //changeDependency={Parentvaluetomodal}
                                                        />
                                                    </CTableDataCell>
                                                    : 
                                                    <CTableDataCell>
                                                        <MakeActiveModal
                                                            //index={index}
                                                            mem_id={item.member_id}
                                                            name={item.customer_name}
                                                            //changeDependency={Parentvaluetomodal}
                                                        />
                                                    </CTableDataCell>
                                                } */}
                                        {/* {cookies.user_type === "ADMIN" ?
                                                    <CTableDataCell>
                                                        <DeleteModal delete_guid={item.member_id}
                                                            name={item.customer_name}
                                                            index={index}
                                                            apiname={"MemberDelete"}
                                                            guidinput={"member_id"}
                                                            changeDependency={Parentvaluetomodal}
                                                        />
                                                    </CTableDataCell>
                                                    : null
                                                }
                                                <CTableDataCell>
                                                    <Link to={`/member-details?memid=${item.member_id}`}
                                                        className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                        Details
                                                    </Link>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable> */}
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
export default MemberList;