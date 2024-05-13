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
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';

const EnquiryList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [loadmorebtndisabled, setLoadMoreBtnDisabled] = useState(false);
    const [loadallbtndisabled, setLoadAllBtnDisabled] = useState(false);
    const [disablebutton, setDisableButton] = useState(false);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [loading, setLoading] = useState(false);

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [EnquiryLists, setEnquiryLists] = useState([]);

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        follow_up_from_date: "",
        follow_up_to_date: "",
        enquiry_branch_id: "",
        enquiry_status_text: "",
        enquiry_current_status: "",
        search_text: "",
        list_limit: "",
        current_size: ""
    });

    const {
        from_date,
        to_date,
        follow_up_from_date,
        follow_up_to_date,
        enquiry_branch_id,
        enquiry_status_text,
        enquiry_current_status,
        search_text,
        list_limit,
        current_size
    } = ListInput;

    const OnInputChange = (e) => {
        console.warn(e.target.value);
        setListInput({ ...ListInput, [e.target.name]: e.target.value });
    }

    // useEffect(() => {
    //     if (ListInput.from_date === "" && ListInput.to_date === "") {
    //         var todaysdate = new Date();
    //         var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
    //         setListInput({ ...ListInput, ["from_date"]: todays_date, ["to_date"]: todays_date });
    //         //console.log(todays_date);
    //     }
    // }, [ListInput.from_date === ""], [ListInput.to_date === ""]);

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
        if (enquiry_branch_id === "") {
            list["enquiry_branch_id"] = 0;
        }
        else {
            list["enquiry_branch_id"] = enquiry_branch_id;
        }
        list["follow_up_from_date"] = follow_up_from_date;
        list["follow_up_to_date"] = follow_up_to_date;
        list["enquiry_status_text"] = "ACTIVE"
        list["enquiry_current_status"] = enquiry_current_status;
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "EnquiryList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var EnquiryList = [], CreatedAt, UpdatedAt, FollowUp, JoiningDate;
                if (response.data.enquiries_list !== null) {

                    for (let i = 0; i < response.data.enquiries_list.length; i++) {

                        if (response.data.enquiries_list[i].enquiry_next_follow_up_date !== null) {
                            var Date = response.data.enquiries_list[i].enquiry_next_follow_up_date;
                            FollowUp = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            FollowUp = response.data.enquiries_list[i].enquiry_next_follow_up_date;
                        }

                        if (response.data.enquiries_list[i].enquiry_joining_date !== null) {
                            var Date = response.data.enquiries_list[i].enquiry_joining_date;
                            JoiningDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            JoiningDate = response.data.enquiries_list[i].enquiry_joining_date;
                        }


                        if (response.data.enquiries_list[i].enquiry_created_at !== null) {
                            var Date = response.data.enquiries_list[i].enquiry_created_at;
                            CreatedAt = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            CreatedAt = response.data.enquiries_list[i].enquiry_created_at;
                        }

                        if (response.data.enquiries_list[i].enquiry_updated_at !== null) {
                            var Date = response.data.enquiries_list[i].enquiry_updated_at;
                            UpdatedAt = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            UpdatedAt = response.data.enquiries_list[i].enquiry_updated_at;
                        }

                        EnquiryList.push({
                            "enquiry_id": response.data.enquiries_list[i].enquiry_id,
                            "enquiry_branch_id": response.data.enquiries_list[i].enquiry_branch_id,
                            "branch_name": response.data.enquiries_list[i].branch_name,
                            "enquiry_customer_id": response.data.enquiries_list[i].enquiry_customer_id,
                            "customer_name": response.data.enquiries_list[i].customer_name,
                            "enquiry_source_id": response.data.enquiries_list[i].enquiry_source_id,
                            "source_name": response.data.enquiries_list[i].source_name,
                            "enquiry_type_id": response.data.enquiries_list[i].enquiry_type_id,
                            "enquiry_type_name": response.data.enquiries_list[i].enquiry_type_name,
                            "enquiry_comments": response.data.enquiries_list[i].enquiry_comments,
                            "enquiry_next_follow_up_date": FollowUp,
                            "enquiry_joining_date": JoiningDate,
                            "enquiry_current_status": response.data.enquiries_list[i].enquiry_current_status,
                            "enquiry_created_at": CreatedAt,
                            "enquiry_created_by": response.data.enquiries_list[i].enquiry_created_by,
                            "created_user_name": response.data.enquiries_list[i].created_user_name,
                            "enquiry_updated_at": UpdatedAt,
                            "enquiry_updated_by": response.data.enquiries_list[i].enquiry_updated_by,
                            "updated_user_name": response.data.enquiries_list[i].updated_user_name
                        });
                    }
                    setEnquiryLists(EnquiryList);
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

    const Parentvaluetomodal = (data, index) => {
        var temp_user = [...EnquiryLists];
        temp_user.splice(index, 1);
        setEnquiryLists([]);
        setEnquiryLists(temp_user);
    }

    const [checklists1, setCheckLists1] = useState([]);
    var checkall = [];
    var checksin = [];


    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (value === "allSelect") {
            let tempUser = EnquiryLists.map((user) => {

                console.log("all");
                console.warn({ ...user, isChecked: checked });
                console.warn(user.enquiry_id);

                checkall.push(user.enquiry_id);
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
            setEnquiryLists(tempUser);
        }
        else {
            let tempUser = EnquiryLists.map((user) =>
                user.enquiry_id === value ? { ...user, isChecked: checked } : user);
            var temp_category = [...checklists1];
            console.log(EnquiryLists.length);
            console.log(tempUser.length);

            for (let u = 0; u < tempUser.length; u++) {
                console.log(tempUser[u].isChecked === true);
                // console.warn(tempUser);
                // console.warn(checksin);
                if (tempUser[u].isChecked === true) {
                    console.warn(checklists1);
                    checksin.push(tempUser[u].enquiry_id);
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
            //setRouteCardPartNumberDetails(tempUser);
        }
    };

    return (
        <>{
            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_LIST) ?
                <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px" }}>
                                <CCardBody>
                                    <h4>Enquiry List</h4>
                                    <hr className="bgcolor" style={{ height: "2px" }} />

                                    <CForm>
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Created From  Date</CLabel>
                                                    <CInput type='date' placeholder='Enter From Date'
                                                        name='from_date'
                                                        value={from_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Created To Date</CLabel>
                                                    <CInput type='date' placeholder='Enter To Date'
                                                        name='to_date'
                                                        value={to_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>FollowUp From  Date</CLabel>
                                                    <CInput type='date' placeholder='Enter From Date'
                                                        name='follow_up_from_date'
                                                        value={follow_up_from_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>FollowUp To Date</CLabel>
                                                    <CInput type='date' placeholder='Enter To Date'
                                                        name='follow_up_to_date'
                                                        value={follow_up_to_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Branch</CLabel>
                                                    <Select
                                                        options={BranchDropdowns}
                                                        defaultValue={{ label: "ALL", value: "0" }}
                                                        onChange={(e) => onChangedropdown(e, "enquiry_branch_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Status</CLabel>
                                                    <CSelect name='enquiry_current_status' onChange={(e) => OnInputChange(e)} custom>
                                                        <option>Select Status</option>
                                                        <option selected={enquiry_current_status === ""} value="0">ALL</option>
                                                        <option selected={enquiry_current_status === "ENQUIRY"} value="ENQUIRY">ENQUIRY</option>
                                                        <option selected={enquiry_current_status === "VISITING"} value="VISITING">VISITING</option>
                                                        <option selected={enquiry_current_status === "CONVERTED"} value="CONVERTED">CONVERTED/JOINED</option>
                                                        <option selected={enquiry_current_status === "TRIAL_BOOKED"} value="TRIAL_BOOKED">TRIAL BOOKED</option>
                                                        <option selected={enquiry_current_status === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                        <option selected={enquiry_current_status === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                        <option selected={enquiry_current_status === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                        <option selected={enquiry_current_status === "NOT INTERESTED"} value="NOT INTERESTED">NOT INTERESTED</option>
                                                        {/* <option selected={enquiry_current_status === "JOINED"} value="JOINED">JOINED</option>
                                                    <option selected={enquiry_current_status === "JOINING"} value="JOINING">JOINING</option> */}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3"></CCol>
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
                                                                <th>Select</th>
                                                                <th>Branch</th>
                                                                <th>Customer Name</th>
                                                                <th>Source</th>
                                                                <th>Enquiry Type</th>
                                                                <th>FollowUp Date</th>
                                                                <th>JoiningDate</th>
                                                                <th>Status</th>
                                                                {/* <th>Comments</th> */}
                                                                {/* <th>Created_By</th>
                                                            <th>Created_At</th>
                                                            <th>Updated_By</th>
                                                            <th>Updated_At</th> */}
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_EDIT) ?
                                                                        <th>Edit</th>
                                                                        : null}
                                                                <th>Delete</th>
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_DETAILS) ?
                                                                        <th>Details</th>
                                                                        : null}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {EnquiryLists.map((List, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <CInput
                                                                            type='checkbox'
                                                                            value={List.enquiry_id}
                                                                            checked={List?.isChecked || false}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </td>
                                                                    <td>{List.branch_name}</td>
                                                                    <td>{List.customer_name}</td>
                                                                    <td>{List.source_name}</td>
                                                                    <td>{List.enquiry_type_name}</td>
                                                                    <td>{List.enquiry_next_follow_up_date}</td>
                                                                    <td>{List.enquiry_joining_date}</td>
                                                                    <td>{List.enquiry_current_status}</td>
                                                                    {/* <td>{List.enquiry_comments}</td>
                                                                <td>{List.branch_created_user_name}</td>
                                                                <td>{List.branch_created_at}</td>
                                                                <td>{List.branch_updated_user_name}</td>
                                                                <td>{List.branch_updated_at}</td> */}
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_EDIT) ?
                                                                            <td>
                                                                                <Link
                                                                                    to={`/enquiryupdate?enqid=${List.enquiry_id}`}
                                                                                    className="btn" style={{ paddingLeft: "2px" }}>
                                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                                    </i>
                                                                                </Link>
                                                                            </td>
                                                                            : null}

                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_DELETE) ?
                                                                            <td>
                                                                                <DeleteModal delete_guid={List.enquiry_id}
                                                                                    name={List.branch_name}
                                                                                    index={index}
                                                                                    apiname={"EnquiryDelete"}
                                                                                    guidinput={"enquiries_id"}
                                                                                    changeDependency={Parentvaluetomodal}
                                                                                />
                                                                            </td>
                                                                            :
                                                                            <td></td>
                                                                    }


                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ENQUIRY_DETAILS) ?
                                                                            <td>
                                                                                <Link to={`/enquiry-details?enqid=${List.enquiry_id}`}
                                                                                    className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                                    Details
                                                                                </Link>
                                                                            </td>
                                                                            :
                                                                            null
                                                                    }


                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CRow>
                                        {/* <CRow>
                                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CButton onClick={(e) => LoadEnquiryLists(e)} disabled={loadmorebtndisabled} className="btn bgcolor white mr-1 mb-2 mt-2 width100">Load More</CButton>
                                        </CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CButton onClick={() => ""()} disabled={loadallbtndisabled} className="btn bgcolor white mr-1 mb-2 mt-2 width100">Load All</CButton>
                                        </CCol>
                                    </CRow> */}
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </div> : null}


                </div >
                :
                <Notification />
        }
        </>
    )
}
export default EnquiryList;