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

const TrailsList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [disablebutton, setDisableButton] = useState(false);
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CusromerDropdowns, setCusromerDropdowns] = useState([]);
    const [UserDropdowns, setUserDropdowns] = useState([]);

    const [loadmorebtndisabled, setLoadMoreBtnDisabled] = useState(false);
    const [loadallbtndisabled, setLoadAllBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [ListInput, setListInput] = useState({
        from_date: "",
        to_date: "",
        branch_id: "",
        trainer_id: "",
        created_user_id: "",
        customer_id: "",
        status_text: "",
        search_text: "",
        list_limit: "",
        current_size: ""
    });

    const {
        from_date,
        to_date,
        branch_id,
        trainer_id,
        created_user_id,
        customer_id,
        status_text,
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
                LoadTrailLists();
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
        setTrailsList([]);
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCusromerDropdowns(ddlist);
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

    useEffect(() => {
        GetDropDown();
    }, []);

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["branch_id"]: e.value });
    };

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["customer_id"]: e.value });
    };

    const onChangeUserdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setListInput({ ...ListInput, ["trainer_id"]: e.value });
    };

    const [TrailsList, setTrailsList] = useState([]);

    const LoadTrailLists = async (e) => {
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
        if (branch_id === "") {
            list["branch_id"] = 0;
        }
        else {
            list["branch_id"] = branch_id;
        }

        if (trainer_id === "") {
            list["trainer_id"] = 0;
        }
        else {
            list["trainer_id"] = trainer_id;
        }

        if (customer_id === "") {
            list["customer_id"] = 0;
        }
        else {
            list["customer_id"] = customer_id;
        }

        list["created_user_id"] = cookies.user_id;
        list["status_text"] = status_text;
        list["search_text"] = search_text;
        list["list_limit"] = 100;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "CustomerTrialsList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                var TrailList = [], StartDate, EndDate, Start_Time, End_Time, time, Time;
                if (response.data.list !== null) {

                    for (let i = 0; i < response.data.list.length; i++) {

                        if (response.data.list[i].trial_start_date !== null) {
                            var Date = response.data.list[i].trial_start_date;
                            StartDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            StartDate = response.data.list[i].trial_start_date;
                        }

                        if (response.data.list[i].trial_end_date !== null) {
                            var Date = response.data.list[i].trial_end_date;
                            EndDate = Date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            EndDate = response.data.list[i].trial_end_date;
                        }

                        if (response.data.list[i].trial_start_time !== null) {
                            Time = response.data.list[i].trial_start_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            Start_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            Start_Time = response.data.list[i].trial_start_time;
                        }

                        if (response.data.list[i].trial_end_time !== null) {
                            Time = response.data.list[i].trial_end_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            End_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            End_Time = response.data.list[i].trial_end_time;
                        }

                        TrailList.push({
                            "trial_id": response.data.list[i].trial_id,
                            "branch_name": response.data.list[i].branch_name,
                            "trial_customer_id": response.data.list[i].trial_customer_id,
                            "customer_first_name": response.data.list[i].customer_first_name,
                            "customer_mobile_number": response.data.list[i].customer_mobile_number,
                            "customer_email_address": response.data.list[i].customer_email_address,
                            "customer_address": response.data.list[i].customer_address,
                            "customer_photo": response.data.list[i].customer_photo,
                            "trainer_name": response.data.list[i].trainer_name,
                            "product_name": response.data.list[i].product_name,
                            "trial_start_date": StartDate,
                            "trial_start_time": Start_Time,
                            "trial_end_date": EndDate,
                            "trial_end_time": End_Time,
                            "trial_status_text": response.data.list[i].trial_status_text
                        });
                    }
                    setTrailsList(TrailList);
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
        var temp_user = [...TrailsList];
        temp_user.splice(index, 1);
        setTrailsList([]);
        setTrailsList(temp_user);
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Trial List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CLabel>From Date</CLabel>
                                                <CInput type='date' placeholder='Enter From Date'
                                                    name='from_date'
                                                    value={from_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CLabel>To Date</CLabel>
                                                <CInput type='date' placeholder='Enter To Date'
                                                    name='to_date'
                                                    value={to_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>

                                            <CCol sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Branch</CLabel>
                                                    <Select
                                                        options={BranchDropdowns}
                                                        defaultValue={{ label: "ALL", value: "0" }}
                                                        onChange={(e) => onChangedropdown(e, "branch_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Customer</CLabel>
                                                    <Select
                                                        options={CusromerDropdowns}
                                                        defaultValue={{ label: "ALL", value: "0" }}
                                                        onChange={(e) => onChangeCustdropdown(e, "customer_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Trainer</CLabel>
                                                    <Select
                                                        options={UserDropdowns}
                                                        defaultValue={{ label: "ALL", value: "0" }}
                                                        onChange={(e) => onChangeUserdropdown(e, "trainer_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                <CFormGroup>
                                                    <CLabel>Select Status</CLabel>
                                                    <CSelect name='status_text' onChange={(e) => OnInputChange(e)} custom>
                                                        <option>Select Status</option>
                                                        <option selected={status_text === "TRIAL_BOOKED"} value="TRIAL_BOOKED">TRIAL BOOKED</option>
                                                        <option selected={status_text === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                        <option selected={status_text === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                        <option selected={status_text === "TRIAL_NOT_DONE"} value="TRIAL_NOT_DONE">TRIAL NOT DONE</option>
                                                        <option selected={status_text === "RESHEDULED"} value="RESHEDULED">RESHEDULED</option>
                                                        {/* <option selected={status_text === "TRIAL_DONE"} value="TRIAL_DONE">TRIAL DONE</option>
                                                    <option selected={status_text === "TRIAL_UNATTENDED"} value="TRIAL_UNATTENDED">TRIAL UNATTENDED</option>
                                                    <option selected={status_text === "RESCHEDULED"} value="RESCHEDULED">RESCHEDULED</option>
                                                    <option selected={status_text === "NOT_INTERESTED"} value="NOT_INTERESTED">NOT INTERESTED</option> */}
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => LoadTrailLists(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Generate</CButton>
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
                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1">
                                                </CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <div className=" my-table table-responsive width100 mt-1">
                                                        <table className="table table-bordered-less width100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Branch_Name</th>
                                                                    <th>Customer_Name</th>
                                                                    <th>Trainer_Name</th>
                                                                    <th>Product_Name</th>
                                                                    <th>Start_Date</th>
                                                                    <th>Start_Time</th>
                                                                    <th>End_Date</th>
                                                                    <th>End_Time</th>
                                                                    <th>Status_Text</th>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_EDIT) ?
                                                                            <th>Edit</th>
                                                                            : null}
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_DELETE) ?
                                                                            <th>Delete</th>
                                                                            : null}
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_DETAILS) ?
                                                                            <th>Details</th>
                                                                            : null}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {TrailsList.map((List, index) => (
                                                                    <tr key={index}>
                                                                        <td>{List.branch_name}</td>
                                                                        <td>{List.customer_first_name}</td>
                                                                        <td>{List.trainer_name}</td>
                                                                        <td>{List.product_name}</td>
                                                                        <td>{List.trial_start_date}</td>
                                                                        <td>{List.trial_start_time}</td>
                                                                        <td>{List.trial_end_date}</td>
                                                                        <td>{List.trial_end_time}</td>
                                                                        <td>{List.trial_status_text}</td>
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_EDIT) ?
                                                                                <td>
                                                                                    <Link to={{
                                                                                        pathname: '/trailsadd',
                                                                                        pfid: {
                                                                                            pfid: List.trial_id
                                                                                        }
                                                                                    }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                                        </i>
                                                                                    </Link>
                                                                                </td>
                                                                                : null}
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_DELETE) ?
                                                                                <td>
                                                                                    <DeleteModal delete_guid={List.trial_id}
                                                                                        name={List.customer_first_name}
                                                                                        index={index}
                                                                                        apiname={"CustomerTrialsDelete"}
                                                                                        guidinput={"trial_id"}
                                                                                        changeDependency={Parentvaluetomodal}
                                                                                    />
                                                                                </td>
                                                                                : null}
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_TRIAL_DETAILS) ?
                                                                                <td>
                                                                                    <Link to={`/trailsdetails?trialid=${List.trial_id}`}
                                                                                        className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                                        Details
                                                                                    </Link>
                                                                                </td>
                                                                                : null}




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
                        </div> : null}
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default TrailsList;