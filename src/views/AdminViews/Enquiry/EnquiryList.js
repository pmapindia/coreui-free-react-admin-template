import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteModal from 'src/views/AdminViews/Modals/DeleteModal'
import Select from 'react-select';

const EnquiryList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [loadmorebtndisabled, setLoadMoreBtnDisabled] = useState(false);
    const [loadallbtndisabled, setLoadAllBtnDisabled] = useState(false);
    const [disablebutton, setDisableButton] = useState(false);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);

    const [loading, setLoading] = useState(false);

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [EnquiryLists, setEnquiryLists] = useState([]);

    // const [search_text1, setSearchText] = useState({
    //     search_text: ""
    // });
    // const { search_text } = search_text1;

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        enquiry_branch_id: "",
        enquiry_customer_id: "",
        enquiry_next_follow_up_date: "",
        enquiry_joining_date: "",
        enquiry_current_status: "",
        search_text: "",
        list_limit: process.env.REACT_APP_LIST_LIMIT,
        list_count: "",
        current_size: 0
    });

    const {
        from_date,
        to_date,
        enquiry_branch_id,
        enquiry_customer_id,
        enquiry_next_follow_up_date,
        enquiry_joining_date,
        enquiry_current_status,
        search_text,
        list_limit,
        current_size
    } = ListInput;

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadEnquiryLists();
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
        setEnquiryLists([]);
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCustomerDropdowns(ddlist);
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

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["enquiry_customer_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadEnquiryLists = async (e) => {
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
        list["enquiry_branch_id"] = enquiry_branch_id;
        list["enquiry_customer_id"] = enquiry_customer_id;
        list["enquiry_next_follow_up_date"] = enquiry_next_follow_up_date;
        list["enquiry_joining_date"] = enquiry_joining_date;
        list["enquiry_current_status"] = enquiry_current_status;
        list["search_text"] = search_text;
        list["list_limit"] = list_limit;
        list["current_size"] = current_size;
        await axios.post(process.env.REACT_APP_API + "EnquiryList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var EnquiryList = [], CreatedAt, UpdatedAt, FollowUp, JoiningDate;
                if (response.data.Enquiries_list !== null) {

                    for (let i = 0; i < response.data.Enquiries_list.length; i++) {

                        if (response.data.Enquiries_list[i].enquiry_next_follow_up_date !== null) {
                            var Date = response.data.Enquiries_list[i].enquiry_next_follow_up_date;
                            FollowUp = Date.substring(0, 10);
                        }
                        else {
                            FollowUp = response.data.Enquiries_list[i].enquiry_next_follow_up_date;
                        }

                        if (response.data.Enquiries_list[i].enquiry_joining_date !== null) {
                            var Date = response.data.Enquiries_list[i].enquiry_joining_date;
                            JoiningDate = Date.substring(0, 10);
                        }
                        else {
                            JoiningDate = response.data.Enquiries_list[i].enquiry_joining_date;
                        }


                        if (response.data.Enquiries_list[i].enquiry_created_at !== null) {
                            var Date = response.data.Enquiries_list[i].enquiry_created_at;
                            CreatedAt = Date.substring(0, 10);
                        }
                        else {
                            CreatedAt = response.data.Enquiries_list[i].enquiry_created_at;
                        }

                        if (response.data.Enquiries_list[i].enquiry_updated_at !== null) {
                            var Date = response.data.Enquiries_list[i].enquiry_updated_at;
                            UpdatedAt = Date.substring(0, 10);
                        }
                        else {
                            UpdatedAt = response.data.Enquiries_list[i].enquiry_updated_at;
                        }

                        EnquiryList({
                            "enquiry_branch_id": response.data.Enquiries_list[i].enquiry_branch_id,
                            "branch_name": response.data.Enquiries_list[i].branch_name,
                            "enquiry_customer_id": response.data.Enquiries_list[i].enquiry_customer_id,
                            "Column1": response.data.Enquiries_list[i].Column1,
                            "enquiry_source_id": response.data.Enquiries_list[i].enquiry_source_id,
                            "source_name": response.data.Enquiries_list[i].source_name,
                            "enquiry_type_id": response.data.Enquiries_list[i].enquiry_type_id,
                            "enquiry_type_name": response.data.Enquiries_list[i].enquiry_type_name,
                            "enquiry_comments": response.data.Enquiries_list[i].enquiry_comments,
                            "enquiry_next_follow_up_date": FollowUp,
                            "enquiry_joining_date": JoiningDate,
                            "enquiry_current_status": response.data.Enquiries_list[i].enquiry_current_status,
                            "enquiry_created_at": CreatedAt,
                            "enquiry_created_by": response.data.Enquiries_list[i].enquiry_created_by,
                            "created_user_name": response.data.Enquiries_list[i].created_user_name,
                            "enquiry_updated_at": UpdatedAt,
                            "enquiry_updated_by": response.data.Enquiries_list[i].enquiry_updated_by,
                            "updated_user_name": response.data.Enquiries_list[i].updated_user_name
                        });
                    }
                    setEnquiryLists(EnquiryList);

                    if (response.data.Enquiries_list != null) {
                        var _enquiry_current_size = currentsize + response.data.Enquiries_list.length;
                        console.log("currentsize" + _enquiry_current_size);
                        setCurrentSize(_enquiry_current_size);
                        var finalList = EnquiryLists.concat(EnquiryList);
                        console.log("finalcustomerlist" + finalList);

                        setEnquiryLists(finalList);
                        // var _list_count = response.data.total_list_count;
                        // console.log(_rc_list_count);
                        // setListCount(_rc_list_count);
                    }
                }
                else {
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

    // const EnquiryListsLoad = async () => {
    //     setWarnings({ ["warning"]: "" });
    //     var list = {};
    //     list["from_date"] = from_date;
    //     list["to_date"] = to_date;
    //     list["enquiry_branch_id"] = enquiry_branch_id;
    //     list["enquiry_customer_id"] = enquiry_customer_id;
    //     list["enquiry_next_follow_up_date"] = enquiry_next_follow_up_date;
    //     list["enquiry_joining_date"] = enquiry_joining_date;
    //     list["enquiry_current_status"] = enquiry_current_status;
    //     list["search_text"] = search_text;
    //     list["list_limit"] = list_limit;
    //     list["current_size"] = current_size;
    //     await axios.post(process.env.REACT_APP_API + "EnquiryList", list, config).then(response => {
    //         console.log(response);
    //         if (response.data.is_success) {
    //             setLoading(true);
    //             setWarnings({ ["warning"]: "" });
    //             var EnquiryList = [], CreatedAt, UpdatedAt, FollowUp, JoiningDate;
    //             if (response.data.Enquiries_list !== null) {

    //                 for (let i = 0; i < response.data.Enquiries_list.length; i++) {

    //                     if (response.data.Enquiries_list[i].enquiry_next_follow_up_date !== null) {
    //                         var Date = response.data.Enquiries_list[i].enquiry_next_follow_up_date;
    //                         FollowUp = Date.substring(0, 10);
    //                     }
    //                     else {
    //                         FollowUp = response.data.Enquiries_list[i].enquiry_next_follow_up_date;
    //                     }

    //                     if (response.data.Enquiries_list[i].enquiry_joining_date !== null) {
    //                         var Date = response.data.Enquiries_list[i].enquiry_joining_date;
    //                         JoiningDate = Date.substring(0, 10);
    //                     }
    //                     else {
    //                         JoiningDate = response.data.Enquiries_list[i].enquiry_joining_date;
    //                     }


    //                     if (response.data.Enquiries_list[i].enquiry_created_at !== null) {
    //                         var Date = response.data.Enquiries_list[i].enquiry_created_at;
    //                         CreatedAt = Date.substring(0, 10);
    //                     }
    //                     else {
    //                         CreatedAt = response.data.Enquiries_list[i].enquiry_created_at;
    //                     }

    //                     if (response.data.Enquiries_list[i].enquiry_updated_at !== null) {
    //                         var Date = response.data.Enquiries_list[i].enquiry_updated_at;
    //                         UpdatedAt = Date.substring(0, 10);
    //                     }
    //                     else {
    //                         UpdatedAt = response.data.Enquiries_list[i].enquiry_updated_at;
    //                     }

    //                     EnquiryList({
    //                         "enquiry_branch_id": response.data.Enquiries_list[i].enquiry_branch_id,
    //                         "branch_name": response.data.Enquiries_list[i].branch_name,
    //                         "enquiry_customer_id": response.data.Enquiries_list[i].enquiry_customer_id,
    //                         "Column1": response.data.Enquiries_list[i].Column1,
    //                         "enquiry_source_id": response.data.Enquiries_list[i].enquiry_source_id,
    //                         "source_name": response.data.Enquiries_list[i].source_name,
    //                         "enquiry_type_id": response.data.Enquiries_list[i].enquiry_type_id,
    //                         "enquiry_type_name": response.data.Enquiries_list[i].enquiry_type_name,
    //                         "enquiry_comments": response.data.Enquiries_list[i].enquiry_comments,
    //                         "enquiry_next_follow_up_date": FollowUp,
    //                         "enquiry_joining_date": JoiningDate,
    //                         "enquiry_current_status": response.data.Enquiries_list[i].enquiry_current_status,
    //                         "enquiry_created_at": CreatedAt,
    //                         "enquiry_created_by": response.data.Enquiries_list[i].enquiry_created_by,
    //                         "created_user_name": response.data.Enquiries_list[i].created_user_name,
    //                         "enquiry_updated_at": UpdatedAt,
    //                         "enquiry_updated_by": response.data.Enquiries_list[i].enquiry_updated_by,
    //                         "updated_user_name": response.data.Enquiries_list[i].updated_user_name
    //                     });
    //                 }
    //                 setEnquiryLists(EnquiryList);

    //                 if (response.data.Enquiries_list != null) {
    //                     var _enquiry_current_size = currentsize + response.data.Enquiries_list.length;
    //                     console.log("currentsize" + _enquiry_current_size);
    //                     setCurrentSize(_enquiry_current_size);
    //                     var finalList = EnquiryLists.concat(EnquiryList);
    //                     console.log("finalcustomerlist" + finalList);

    //                     setEnquiryLists(finalList);
    //                     // var _list_count = response.data.total_list_count;
    //                     // console.log(_rc_list_count);
    //                     // setListCount(_rc_list_count);
    //                 }
    //             }
    //             else {
    //                 setLoading(false);
    //                 setWarnings({ ["warning"]: response.data.msg });

    //             }
    //         }
    //         else {
    //             setLoading(false);
    //             setWarnings({ ["warning"]: response.data.msg });

    //         }
    //     }).catch(
    //         error => {
    //             console.log(error);
    //             alert(error.message);

    //         })
    // }

    // useEffect(() => {
    //     EnquiryListsLoad();
    // }, []);

    const Parentvaluetomodal = (data, index) => {

        console.log("index: " + index);
        var temp_user = [...EnquiryLists];
        temp_user.splice(index, 1);
        setEnquiryLists([]);
        setEnquiryLists(temp_user);
        console.log("temp_user: " + temp_user);
        console.log("all user: " + EnquiryLists);
        console.log("Delete")
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Enquiry List</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />

                                <CForm>
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
                                                <Select value={BranchDropdowns.filter(function (option) {
                                                    return option.value === enquiry_branch_id;
                                                })}
                                                    options={BranchDropdowns}
                                                    onChange={(e) => onChangedropdown(e, "enquiry_branch_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer</CLabel><span className="red">*</span>
                                                <Select value={CustomerDropdowns.filter(function (option) {
                                                    return option.value === enquiry_customer_id;
                                                })}
                                                    options={CustomerDropdowns}
                                                    onChange={(e) => onChangeCustdropdown(e, "enquiry_customer_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Next Follow Up Date</CLabel><span className="red">*</span>
                                            <CInput type='date' placeholder='Enter Next Follow Up Date Date'
                                                name='enquiry_next_follow_up_date'
                                                value={enquiry_next_follow_up_date}
                                                onChange={(e) => OnInputChange(e)}
                                            />
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Joining Date</CLabel><span className="red">*</span>
                                            <CInput type='date' placeholder='Enter Joining Date'
                                                name='enquiry_joining_date'
                                                value={enquiry_joining_date}
                                                onChange={(e) => OnInputChange(e)}
                                            />
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Status</CLabel><span className="red">*</span>
                                                <CSelect name='enquiry_current_status' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Status</option>
                                                    <option selected={enquiry_current_status === "ENQUIRY"} value="ENQUIRY">ENQUIRY</option>
                                                    <option selected={enquiry_current_status === "VISITING"} value="VISITING">VISITING</option>
                                                    <option selected={enquiry_current_status === "TRAIL BOOKED"} value="TRAIL BOOKED">TRAIL BOOKED</option>
                                                    <option selected={enquiry_current_status === "TRAIL DONE"} value="TRAIL DONE">TRAIL DONE</option>
                                                    <option selected={enquiry_current_status === "TRAIL UNATTENDED"} value="TRAIL UNATTENDED">TRAIL UNATTENDED</option>
                                                    <option selected={enquiry_current_status === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                    <option selected={enquiry_current_status === "NOT INTERESTED"} value="NOT INTERESTED">NOT INTERESTED</option>
                                                    <option selected={enquiry_current_status === "JOINED"} value="JOINED">JOINED</option>
                                                    <option selected={enquiry_current_status === "JOINING"} value="JOINING">JOINING</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" onClick={(e) => LoadEnquiryLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
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

                {loading ? <div>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                            <CFormGroup>
                                                <div class="inner-addon right-addon">
                                                    <i class="fa fa-search"></i>
                                                    <CInput type="text"
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
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1">
                                            {/* <Link to={`/adduser`}
                                className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                Add New User
                            </Link> */}
                                        </CCol>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <div className=" my-table table-responsive width100 mt-1">
                                                <table className="table table-bordered-less width100">
                                                    <thead>
                                                        <tr>
                                                            <th>Sl_No</th>
                                                            <th>Branch</th>
                                                            <th>Customer</th>
                                                            <th>Source</th>
                                                            <th>Enquiry_Type</th>
                                                            <th>FollowUp_Date</th>
                                                            <th>Joining_Date</th>
                                                            <th>Status</th>
                                                            <th>Comments</th>
                                                            <th>Created_By</th>
                                                            <th>Created_At</th>
                                                            <th>Updated_By</th>
                                                            <th>Updated_At</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {EnquiryLists.map((List, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{List.branch_name}</td>
                                                                <td>{List.Column1}</td>
                                                                <td>{List.source_name}</td>
                                                                <td>{List.enquiry_type_name}</td>
                                                                <td>{List.enquiry_next_follow_up_date}</td>
                                                                <td>{List.enquiry_joining_date}</td>
                                                                <td>{List.enquiry_current_status}</td>
                                                                <td>{List.enquiry_comments}</td>
                                                                <td>{List.branch_created_user_name}</td>
                                                                <td>{List.branch_created_at}</td>
                                                                <td>{List.branch_updated_user_name}</td>
                                                                <td>{List.branch_updated_at}</td>
                                                                <td>
                                                                    <Link to={{
                                                                        pathname: '/adduser',
                                                                        pfid: {
                                                                            pfid: List.branch_id
                                                                        }
                                                                    }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                        </i>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <DeleteModal delete_guid={List.enquiries_id}
                                                                        name={List.branch_name}
                                                                        index={index}
                                                                        apiname={"EnquiryDelete"}
                                                                        guidinput={"enquiries_id"}
                                                                        changeDependency={Parentvaluetomodal}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <Link to={``}
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
                                    <CRow>
                                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CButton onClick={(e) => LoadEnquiryLists(e)} disabled={loadmorebtndisabled} className="btn bgcolor white mr-1 mb-2 mt-2 width100">Load More</CButton>
                                        </CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CButton onClick={() => ""()} disabled={loadallbtndisabled} className="btn bgcolor white mr-1 mb-2 mt-2 width100">Load All</CButton>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div> : null}


            </div >
        </>
    )
}
export default EnquiryList;