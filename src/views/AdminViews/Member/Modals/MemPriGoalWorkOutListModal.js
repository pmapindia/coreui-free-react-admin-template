import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CTextarea,
    CModalHeader,
    CModalTitle,
    CInput,
    CForm,
    CSelect,
    CRow,
    CLabel,
    CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import MemPriGoalWorkOutAddtModal from './MemPriGoalWorkOutAddModal';

const MemPriGoalWorkOutListModal = (props) => {

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

    const [Show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow(true);
        WorkoutListByPrimaryGoalAndWeek(props.week_name);
    }

    const [WorkoutPGList, setWorkoutPGList] = useState([]);

    const WorkoutListByPrimaryGoalAndWeek = async (week_name) => {
        var list = {};
        list["member_id"] = props.mem_id;
        list["primary_goal_id"] = props.pg_id;
        list["week_name"] = props.week_name;
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutListByPrimaryGoalAndWeek", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.member_workout_primary_goal_list.length !== null) {
                    setWorkoutPGList(response.data.member_workout_primary_goal_list)
                }
                else {
                    setWorkoutPGList([]);
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
            })
    }

    // useEffect(() => {
    //     WorkoutListByPrimaryGoalAndWeek(props.week_name);
    // }, [props.week_name]);

    const [disablebuttondc, setDisableButtonDC] = useState(false);

    const WorkoutDelete = async (taber_index, wo_id) => {
        setDisableButtonDC(true);
        document.getElementById("img_gif_loading_btn_DC").style.display = "block";
        var list = {};
        list["mem_wc_map_id"] = wo_id;
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutDelete", list, config).then(response => {
            console.log(response);
            // 
            if (response.data.is_success) {
                toast.success(response.data.msg);
                //console.log("taber_index: " + taber_index);
                var temp_taber = WorkoutPGList;
                temp_taber.splice(taber_index, 1);
                setWorkoutPGList([]);
                setWorkoutPGList(temp_taber);
                //console.log("temp_users: " + temp_taber);
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";

            }
            else {
                toast.error(response.data.msg);
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            }
        }).catch(error => {
            console.log(error);
            setDisableButtonDC(false);
            document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            //toast.error(""+error);
        })
    }

    return (
        <CRow>
            <CCol>
                {/* <CButton className=' btn btn-sm bgblue white width100' style={{ fontSize: "13px" }} onClick={(e) => handleShow(e)}>
                    Add New Package
                </CButton> */}
                <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", borderRadius: "10px", textAlign: "center", marginLeft: "4px", paddingTop: "1px", border: "1px solid gray", }} onClick={(e) => handleShow(e)}>
                    <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px", paddingTop: "0px" }}>{props.week_name}</div>

                    {props.workout_count}
                </div>
                {/* <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }} onClick={(e) => handleShow(e)} >{props.week_name}</div> */}
                <CModal
                    style={{}}

                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="xl"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Workout List for Primary Goal</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>

                        <CRow className=''>
                            <CCol xs="10" sm="10" md="10" lg="10"></CCol>
                            <CCol xs="10" sm="2" md="2" lg="2"className='mb-2'>
                                <MemPriGoalWorkOutAddtModal
                                    mem_id={props.mem_id}
                                    pg_id={props.pg_id}
                                    //workout_count={WorkoutCountsOfSG.workout_count}
                                    week_name={props.week_name}
                                />
                                {/* <button class='btn btn-sm btn-outline-info width100'><i class="fa fa-plus-circle"></i>&nbsp;Add New</button> */}
                            </CCol>
                            {WorkoutPGList.map((List, index) => (
                                <CCol xs="12" sm="3" md="3" lg="3" key={index}>
                                    <CCard style={{ borderRadius: "5px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <img className="playerProfilePic_home_tile "
                                                        src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + List.wo_video_thumbnail_filename}
                                                        style={{ width: "100%", height: "100px", margin: "0px", padding: "0px" }}
                                                    />
                                                </CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12" align='center'>
                                                    <h4 style={{ margin: "0px", padding: "0px" }}>{List.wo_name}</h4>
                                                    <CLabel style={{ color: "blue" }}>(Burn: {List.wo_calorie_burn_value}Kcal)</CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <Link to={`workoutsetup-details?wo_id=${List.mem_wc_map_wc_id}`} class='btn btn-sm btn-outline-primary'>Details</Link>
                                                    <span style={{ float: "right" }}>
                                                        {/* <button class='btn btn-sm btn-outline-danger'>Delete</button> */}
                                                        <div className="" style={{ borderRadius: "5px" }}>
                                                            <CButton type="submit" className='btn btn-sm btn-outline-danger'
                                                                onClick={() => WorkoutDelete(index, List.mem_wc_map_id)}
                                                                disabled={disablebuttondc}
                                                                style={{ width: "100%", color: "", fontWeight: "50%", fontSize: "12px" }} >Delete</CButton>
                                                            <img id="img_gif_loading_btn_DC" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "5px", display: "none" }} />
                                                        </div>
                                                    </span>
                                                </CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12" align='center'>
                                                    <CLabel style={{ color: "gray" }}>{List.wo_description}</CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4" align='center'>
                                                    <CLabel style={{ color: "black", fontWeight: "bolder", fontSize: "12px", margin: "0px", padding: "0px" }}>{List.wo_total_sets}</CLabel><br />
                                                    <CLabel style={{ color: "black", fontSize: "12px", margin: "0px", padding: "0px" }}>Total Set</CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="5" md="5" lg="5" align='center'>
                                                    <CLabel style={{ color: "black", fontWeight: "bolder", fontSize: "12px", margin: "0px", padding: "0px" }}>{List.wo_one_set_time_in_seconds}s</CLabel><br />
                                                    <CLabel style={{ color: "black", fontSize: "10px", margin: "0px", padding: "0px" }}>One Set Time</CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3" align='center'>
                                                    <CLabel style={{ color: "black", fontWeight: "bolder", fontSize: "12px", margin: "0px", padding: "0px" }}>{List.wo_rest_interval_in_seconds}s</CLabel><br />
                                                    <CLabel style={{ color: "black", fontSize: "10px", margin: "0px", padding: "0px" }}>Interval</CLabel>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            ))}
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default MemPriGoalWorkOutListModal;