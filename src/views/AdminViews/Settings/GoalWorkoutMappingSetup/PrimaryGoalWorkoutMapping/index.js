import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea, CSelect } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { post } from 'axios';
import DeleteModal from '../../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../../Modals/NotificationAltertModal';
const PrimaryGoalWorkoutMapping = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [SetupMapping, setSetupMapping] = useState({
        goal_wc_map_id: "",
        goal_wc_map_primary_goal_id: "",
        goal_wc_map_secondary_goal_id: "",
        goal_wc_map_week_name: "",
        goal_wc_map_wc_id: ""
    });

    const {
        goal_wc_map_id,
        goal_wc_map_primary_goal_id,
        goal_wc_map_secondary_goal_id,
        goal_wc_map_week_name,
        goal_wc_map_wc_id
    } = SetupMapping;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setSetupMapping({ ...SetupMapping, [e.target.name]: e.target.value });
    }

    const [PrimaryDropdowns, setPrimaryDropdowns] = useState([]);
    const [WorkoutSetupList, setWorkoutSetupList] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_MEMBER_PRIMARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_WORKOUT_SETUP", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);

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

                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const onChangePridropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setSetupMapping({ ...SetupMapping, ["goal_wc_map_primary_goal_id"]: e.value, ["goal_wc_map_secondary_goal_id"]: 0 });
    }

    const onChangeWOdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setSetupMapping({ ...SetupMapping, ["goal_wc_map_wc_id"]: e.value });
    }

    const OnSubmitMapping = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "GoalWorkoutMappingSetupAdd", {
            "goal_wc_map_primary_goal_id": goal_wc_map_primary_goal_id,
            "goal_wc_map_secondary_goal_id": goal_wc_map_secondary_goal_id,
            "goal_wc_map_week_name": goal_wc_map_week_name,
            "goal_wc_map_wc_id": goal_wc_map_wc_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
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
        setWorkoutMapList([]);
    }

    const [WorkoutMapList, setWorkoutMapList] = useState([])

    const LoadWorkoutMapLists = async () => {
        setWorkoutSetupList([])
        var list = {};
        list["search_text"] = search_text;
        await axios.post(process.env.REACT_APP_API + "GoalWorkoutMappingSetupListForPrimaryGoal", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.primary_goal_workout_mapping_list !== null) {
                    setWorkoutMapList(response.data.primary_goal_workout_mapping_list)
                }
                else {
                    setWorkoutMapList([])
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
        setWorkoutMapList([]);
        setWorkoutMapList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + CustLists);
        // console.log("Delete")
    }


    const MappingSetupDetailsByID = async (goalwcmapid) => {
        var list = {};
        list["goal_wc_map_id"] = goalwcmapid;
        await axios.post(process.env.REACT_APP_API + "GoalWorkoutMappingSetupDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setSetupMapping(response.data.goal_workout_mapping_details);
            }
        }).catch(error => {
            console.log(error);
            //toast.error(""+error);
        })
    }


    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>

                <CRow>
                    <CCol xs="12" sm="12" ms="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h5>Primary Goal Workout Mapping</h5>
                                <hr className="bgcolor" style={{ height: "1px" }} />
                                <CRow>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <CFormGroup>
                                            <CLabel>Select Primary Goal</CLabel><span className="red">*</span>
                                            <Select value={PrimaryDropdowns.filter(function (option) {
                                                return option.value === goal_wc_map_primary_goal_id;
                                            })}
                                                options={PrimaryDropdowns}
                                                onChange={(e) => onChangePridropdown(e, "goal_wc_map_primary_goal_id")} >
                                            </Select>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <CFormGroup>
                                            <CLabel>Select Week</CLabel><span className="red">*</span>
                                            <CSelect custom name='goal_wc_map_week_name'
                                                onChange={(e) => OnInputChange(e)}>
                                                <option>Select Week</option>
                                                <option selected={goal_wc_map_week_name === "SUN"} value="SUN">Sunday</option>
                                                <option selected={goal_wc_map_week_name === "MON"} value="MON">Monday</option>
                                                <option selected={goal_wc_map_week_name === "TUE"} value="TUE">Tuesday</option>
                                                <option selected={goal_wc_map_week_name === "WED"} value="WED">Wednesday</option>
                                                <option selected={goal_wc_map_week_name === "THU"} value="THU">Thursday</option>
                                                <option selected={goal_wc_map_week_name === "FRI"} value="FRI">Friday</option>
                                                <option selected={goal_wc_map_week_name === "SAT"} value="SAT">Saturday</option>
                                            </CSelect>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <CFormGroup>
                                            <CLabel>Select Workout</CLabel><span className="red">*</span>
                                            <Select value={WorkoutSetupList.filter(function (option) {
                                                return option.value === goal_wc_map_wc_id;
                                            })}
                                                options={WorkoutSetupList}
                                                onChange={(e) => onChangeWOdropdown(e, "goal_wc_map_wc_id")} >
                                            </Select>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3" className='mt-4'>
                                        <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                            <CButton type="submit"
                                                onClick={(e) => OnSubmitMapping(e)}
                                                disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                            <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                        </div>
                                        {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" sm="12" ms="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <CRow className='overflow-hidden'>
                                    <CCol xs="12" sm="9" md="9" lg="9">
                                        <h5>Primary Goal Workout Mapping List</h5>
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
                                <hr className="bgcolor" style={{ height: "1px",padding:"0px",margin:"0px" }} />
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className=" my-table table-responsive width100 mt-1">
                                            <table className="table table-bordered-less table-sm width100">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
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
                                                            <td>{List.primary_goal_name}</td>
                                                            <td>{List.goal_wc_map_week_name}</td>
                                                            <td>{List.wo_name}</td>
                                                            <td>
                                                                <CButton className="btn btn-sm" onClick={() => MappingSetupDetailsByID(List.goal_wc_map_id)}>
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                </CButton>
                                                            </td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.goal_wc_map_id}
                                                                    name={List.primary_goal_name}
                                                                    index={index}
                                                                    apiname={"GoalWorkoutMappingSetupDelete"}
                                                                    guidinput={"goal_wc_map_id"}
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
            </div>
        </>
    )
}
export default PrimaryGoalWorkoutMapping;