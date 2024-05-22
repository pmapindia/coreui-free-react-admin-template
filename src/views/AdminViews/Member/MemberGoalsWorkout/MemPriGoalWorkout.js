import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const MemPriGoalWorkOut = (props) => {

    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [errors, setErrors] = useState({});

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [MemWorkoutAdd, setMemWorkoutAdd] = useState({
        mem_wc_map_id: "",
        mem_wc_map_member_id: "",
        mem_wc_map_primary_goal_id: "",
        mem_wc_map_secondary_goal_id: 0,
        mem_wc_map_week_name: "",
        mem_wc_map_wc_id: ""
    });

    const {
        mem_wc_map_id,
        mem_wc_map_member_id,
        mem_wc_map_primary_goal_id,
        mem_wc_map_secondary_goal_id,
        mem_wc_map_week_name,
        mem_wc_map_wc_id
    } = MemWorkoutAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setMemWorkoutAdd({ ...MemWorkoutAdd, [e.target.name]: e.target.value });
    }

    const [WorkoutSetupList, setWorkoutSetupList] = useState([]);
    const [MemberList, setMemberList] = useState([]);
    const [PrimaryDropdowns, setPrimaryDropdowns] = useState([])

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_MEMBER_PRIMARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_WORKOUT_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_MEMBER", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    //console.log("dd_list" + dd_list);

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_PRIMARY_GOALS_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setPrimaryDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_WORKOUT_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setWorkoutSetupList(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setMemberList(ddlist);
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

    const onChangeWOdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemWorkoutAdd({ ...MemWorkoutAdd, ["mem_wc_map_wc_id"]: e.value });
    }

    const onChangeMemdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemWorkoutAdd({ ...MemWorkoutAdd, ["mem_wc_map_member_id"]: e.value });
    }

    const onChangePridropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemWorkoutAdd({ ...MemWorkoutAdd, ["mem_wc_map_primary_goal_id"]: e.value });
    }

    const [disablebuttonmw, setDisableButtonMW] = useState(false);

    const OnSubmitMemWorkout = async (e) => {
        e.preventDefault();
        setDisableButtonMW(true);
        document.getElementById("img_gif_loading_btn_mw").style.display = "block";
        if (mem_wc_map_id === "") {
            await axios.post(process.env.REACT_APP_API + "MemberWorkoutAdd", {
                "mem_wc_map_member_id": mem_wc_map_member_id,
                "mem_wc_map_primary_goal_id": mem_wc_map_primary_goal_id,
                "mem_wc_map_secondary_goal_id": mem_wc_map_secondary_goal_id,
                "mem_wc_map_week_name": mem_wc_map_week_name,
                "mem_wc_map_wc_id": mem_wc_map_wc_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //LoadWorkoutMapLists();
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    //alert(error.message);
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                })
        }
        else {
            await axios.post(process.env.REACT_APP_API + "MemberWorkoutUpdate", {
                "mem_wc_map_id": mem_wc_map_id,
                "mem_wc_map_member_id": mem_wc_map_member_id,
                "mem_wc_map_primary_goal_id": mem_wc_map_primary_goal_id,
                "mem_wc_map_secondary_goal_id": mem_wc_map_secondary_goal_id,
                "mem_wc_map_week_name": mem_wc_map_week_name,
                "mem_wc_map_wc_id": mem_wc_map_wc_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //LoadWorkoutMapLists();
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                }
                else {
                    setWarnings({ ["warning"]: response.data.msg });
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                }
            }).catch(
                error => {
                    console.log(error);
                    //alert(error.message);
                    setDisableButtonMW(false);
                    document.getElementById("img_gif_loading_btn_mw").style.display = "none";
                })
        }

    }


    // List
    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadWorkoutMapLists();
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
        setPriWorkoutList([]);
    }

    const [WorkoutMapList, setPriWorkoutList] = useState([])

    const LoadWorkoutMapLists = async () => {
        setPriWorkoutList([])
        var list = {};
        list["search_text"] = search_text;
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutListForPrimaryGoal", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.member_workout_primary_goal_list !== null) {
                    setPriWorkoutList(response.data.member_workout_primary_goal_list)
                }
                else {
                    setPriWorkoutList([])
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);

            })
    }

    useEffect(() => {
        LoadWorkoutMapLists();
    }, []);

    const Parentvaluetomodal = (data, index) => {
        //console.log("index: " + index);
        var temp_user = [...WorkoutMapList];
        temp_user.splice(index, 1);
        setPriWorkoutList([]);
        setPriWorkoutList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + CustLists);
        // console.log("Delete")
    }


    const MemWorkoutDetailsByID = async (goalwcmapid) => {
        var list = {};
        list["mem_wc_map_id"] = goalwcmapid;
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setMemWorkoutAdd(response.data.member_workout_details);
            }
        }).catch(error => {
            console.log(error);
            //toast.error(""+error);
        })
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                <CForm onSubmit={(e) => OnSubmitMemWorkout(e)}>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px" }}>
                                <CCardBody>
                                    <h4>Primary Goal Workout</h4>
                                    <hr className="bgcolor" style={{ height: "2px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CFormGroup>
                                                <CLabel>Select Member</CLabel><span className="red">*</span>
                                                <Select value={MemberList.filter(function (option) {
                                                    return option.value === mem_wc_map_member_id;
                                                })}
                                                    options={MemberList}
                                                    onChange={(e) => onChangeMemdropdown(e, "mem_wc_map_member_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Primary Goal</CLabel><span className="red">*</span>
                                                <Select value={PrimaryDropdowns.filter(function (option) {
                                                    return option.value === mem_wc_map_primary_goal_id;
                                                })}
                                                    options={PrimaryDropdowns}
                                                    onChange={(e) => onChangePridropdown(e, "mem_wc_map_primary_goal_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Workout</CLabel><span className="red">*</span>
                                                <Select value={WorkoutSetupList.filter(function (option) {
                                                    return option.value === mem_wc_map_wc_id;
                                                })}
                                                    options={WorkoutSetupList}
                                                    onChange={(e) => onChangeWOdropdown(e, "mem_wc_map_wc_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <CFormGroup>
                                                <CLabel>Select Week</CLabel><span className="red">*</span>
                                                <CSelect custom name='mem_wc_map_week_name'
                                                    onChange={(e) => OnInputChange(e)}
                                                >
                                                    <option>Select Week</option>
                                                    <option selected={mem_wc_map_week_name === "SUN"} value="SUN">Sunday</option>
                                                    <option selected={mem_wc_map_week_name === "MON"} value="MON">Monday</option>
                                                    <option selected={mem_wc_map_week_name === "TUE"} value="TUE">Tuesday</option>
                                                    <option selected={mem_wc_map_week_name === "WED"} value="WED">Wednesday</option>
                                                    <option selected={mem_wc_map_week_name === "THU"} value="THU">Thursday</option>
                                                    <option selected={mem_wc_map_week_name === "FRI"} value="FRI">Friday</option>
                                                    <option selected={mem_wc_map_week_name === "SAT"} value="SAT">Saturday</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2" className='mt-4'>
                                            <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit"
                                                    onClick={(e) => OnSubmitMemWorkout(e)}
                                                    disabled={disablebuttonmw} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn_mw" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px" }}>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9">
                                            <h5>Primary Goal Workout List</h5>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="">
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
                                    <hr className="bgcolor" style={{ height: "1px", padding: "0px", margin: "0px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <div className=" my-table table-responsive width100 mt-1">
                                                <table className="table table-bordered-less table-sm width100">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Member</th>
                                                            <th>Primary Goal Name</th>
                                                            <th>Week</th>
                                                            <th>Workout Name</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {WorkoutMapList.map((List, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{List.member_name}</td>
                                                                <td>{List.primary_goal_name}</td>
                                                                <td>{List.mem_wc_map_week_name}</td>
                                                                <td>{List.wo_name}</td>
                                                                <td>
                                                                    <CButton className="btn btn-sm" onClick={() => MemWorkoutDetailsByID(List.mem_wc_map_id)}>
                                                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                    </CButton>
                                                                </td>
                                                                <td>
                                                                    <DeleteModal delete_guid={List.mem_wc_map_id}
                                                                        name={List.primary_goal_name}
                                                                        index={index}
                                                                        apiname={"MemberWorkoutDelete"}
                                                                        guidinput={"mem_wc_map_id"}
                                                                        changeDependency={Parentvaluetomodal}
                                                                    />
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
                </CForm>
            </div>
        </>
    )
}
export default MemPriGoalWorkOut;