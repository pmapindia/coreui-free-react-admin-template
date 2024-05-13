import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { post } from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';
const WorkoutSetupList = (props) => {

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

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadWorkoutSetupLists();
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
        setWorkoutSetupList([]);
    }

    const [WorkoutSetupList, setWorkoutSetupList] = useState([]);

    const LoadWorkoutSetupLists = async () => {
        setWorkoutSetupList([])
        var list = {};
        list["search_text"] = search_text;
        await axios.post(process.env.REACT_APP_API + "WorkoutSetupList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.workout_setup_list !== null) {
                    setWorkoutSetupList(response.data.workout_setup_list)
                }
                else {
                    setWorkoutSetupList([])
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);

            })
    }

    useEffect(() => {
        LoadWorkoutSetupLists();
    }, []);

    // const Parentvaluetomodal = (data, index) => {

    //     //console.log("index: " + index);
    //     var temp_user = [...WorkoutSetupList];
    //     temp_user.splice(index, 1);
    //     setWorkoutSetupList([]);
    //     setWorkoutSetupList(temp_user);
    //     // console.log("temp_user: " + temp_user);
    //     // console.log("all user: " + CustLists);
    //     // console.log("Delete")
    // }

    const WorkoutSetupDelete = async (taber_index, wo_id) => {
        var list = {};
        list["wo_id"] = wo_id;
        await axios.post(process.env.REACT_APP_API + "WorkoutSetupDelete", list, config).then(response => {
            console.log(response);
            // 
            if (response.data.is_success) {
                toast.success(response.data.msg);
                //console.log("taber_index: " + taber_index);
                var temp_taber = WorkoutSetupList;
                temp_taber.splice(taber_index, 1);
                setWorkoutSetupList([]);
                setWorkoutSetupList(temp_taber);
                //console.log("temp_users: " + temp_taber);

            }
            else {
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
            //toast.error(""+error);
        })
    }
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                {/* <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody> */}


                <CRow className='overflow-hidden'>
                    <CCol xs="12" sm="9" md="9" lg="9">
                        <h4>Workout Setup List</h4>
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
                <hr className="bgcolor" style={{ height: "1px",paddingTop:"0px",margin:"0px" }} />

                {WorkoutSetupList.map((List, index) => (
                    <CRow className='overflow-hidden mt-1'>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "10px" }}>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" sm="1" md="1" lg="1">
                                            <img className="playerProfilePic_home_tile "
                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + List.wo_video_thumbnail_filename}
                                                style={{ width: "70px", height: "50px", margin: "0px", padding: "0px" }}
                                            />
                                        </CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <h5 style={{ color: "black", fontSize: "11px" }}>
                                                {List.wo_name}
                                            </h5>
                                            <h6 style={{ color: "gray", fontSize: "11px" }}>
                                                {List.wo_description}
                                            </h6>
                                        </CCol>
                                        <CCol xs="12" sm="1" md="1" lg="1" style={{ textAlign: "center" }}>
                                            <h6 style={{ color: "grey", fontSize: "11px" }}>Burn</h6>
                                            <h6 style={{ color: "black", fontSize: "11px" }}>
                                                {List.wo_calorie_burn_value} Kcal
                                            </h6>
                                        </CCol>
                                        <CCol xs="12" sm="1" md="1" lg="1" style={{ textAlign: "center" }}>
                                            <h6 style={{ color: "grey", fontSize: "11px" }}>Total Set</h6>
                                            <h6 style={{ color: "black", fontSize: "11px" }}>
                                                {List.wo_total_sets}
                                            </h6>
                                        </CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2" style={{ textAlign: "center" }}>
                                            <h6 style={{ color: "grey", fontSize: "11px" }}>One Set Time</h6>
                                            <h6 style={{ color: "black", fontSize: "11px" }}>
                                                {List.wo_one_set_time_in_seconds} Sec
                                            </h6>
                                        </CCol>
                                        <CCol xs="12" sm="1" md="1" lg="1" style={{ textAlign: "center" }}>
                                            <h6 style={{ color: "grey", fontSize: "11px" }}>Interval</h6>
                                            <h6 style={{ color: "black", fontSize: "11px" }}>
                                                {List.wo_rest_interval_in_seconds} Sec
                                            </h6>
                                        </CCol>
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <Link to={`workoutsetup-details?wo_id=${List.wo_id}`}
                                                className="btn btn-sm" style={{ paddingLeft: "4px", textAlign: "center", backgroundColor: "#DCEDC8", color: "green", borderColor: "black" }}>
                                                Details
                                            </Link>

                                            <Link to={{
                                                pathname: '/workoutsetup',
                                                pfid: {
                                                    pfid: List.wo_id
                                                }
                                            }} className="btn btn-sm ml-1" style={{ paddingLeft: "2px", textAlign: "center", backgroundColor: "#BBDEFB", color: "blue", borderColor: "black" }}>
                                                {/* <i className="fa fa-pencil" aria-hidden="true">
                                                </i> */} Edit
                                            </Link>

                                            <button className="btn btn-sm ml-1"
                                                onClick={() => WorkoutSetupDelete(index, List.wo_id)}
                                                style={{ paddingLeft: "2px", textAlign: "center", backgroundColor: "#FFEBEE", color: "red", borderColor: "black" }}>
                                                Delete
                                            </button>

                                            {/* <DeleteModal delete_guid={List.wo_id}
                                                name={List.wo_name}
                                                index={index}
                                                apiname={"WorkoutSetupDelete"}
                                                guidinput={"wo_id"}
                                                changeDependency={Parentvaluetomodal}
                                            /> */}
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                ))}
                {/* <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className=" my-table table-responsive width100 mt-1">
                                            <table className="table table-bordered-less table-sm width100">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Total_Set</th>
                                                        <th>Rest_Interval</th>
                                                        <th>One_Set_Time</th>
                                                        <th>Calorie_Burn_Value</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {WorkoutSetupList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.wo_name}</td>
                                                            <td>{List.wo_description}</td>
                                                            <td>{List.wo_total_sets}</td>
                                                            <td>{List.wo_rest_interval_in_seconds}(in Sec)</td>
                                                            <td>{List.wo_one_set_time_in_seconds}(in Sec)</td>
                                                            <td>{List.wo_calorie_burn_value}</td>
                                                            <td>
                                                                <Link to={{
                                                                    pathname: '/workoutsetup',
                                                                    pfid: {
                                                                        pfid: List.wo_id
                                                                    }
                                                                }} className="btn btn-sm" style={{ paddingLeft: "2px" }}>
                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                    </i>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.wo_id}
                                                                    name={List.wo_name}
                                                                    index={index}
                                                                    apiname={"WorkoutSetupDelete"}
                                                                    guidinput={"wo_id"}
                                                                    changeDependency={Parentvaluetomodal}
                                                                />
                                                            </td>

                                                            <td>
                                                                <Link to={`workoutsetup-details?wo_id=${List.wo_id}`}
                                                                    className="btn btn-sm bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center", backgroundColor: "#3b3f4b" }}>
                                                                    Details
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CCol>
                                </CRow> */}
                {/* </CCardBody>
                        </CCard>
                    </CCol>
                </CRow> */}
            </div>
        </>
    )
}
export default WorkoutSetupList;