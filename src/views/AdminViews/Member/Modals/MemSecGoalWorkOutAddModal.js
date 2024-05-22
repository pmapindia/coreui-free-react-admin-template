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

const MemSecGoalWorkOutAddtModal = (props) => {

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
        GetDropDown();
    }

    const [MemWorkoutAdd, setMemWorkoutAdd] = useState({
        mem_wc_map_member_id: "",
        mem_wc_map_primary_goal_id: "",
        mem_wc_map_secondary_goal_id: "",
        mem_wc_map_week_name: "",
        mem_wc_map_wc_id: ""
    });

    const {
        mem_wc_map_member_id,
        mem_wc_map_primary_goal_id,
        mem_wc_map_secondary_goal_id,
        mem_wc_map_week_name,
        mem_wc_map_wc_id
    } = MemWorkoutAdd;

    const [WorkoutSetupList, setWorkoutSetupList] = useState([]);
    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                // { "dropdown_type": "DD_MEMBER_PRIMARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_WORKOUT_SETUP", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    //console.log("dd_list" + dd_list);

                    // if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_PRIMARY_GOALS_SETUP") {
                    //     let ddlist = [];
                    //     for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                    //         ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                    //     }
                    //     setPrimaryDropdowns(ddlist);
                    // }

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

    const onChangeWOdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemWorkoutAdd({ ...MemWorkoutAdd, ["mem_wc_map_wc_id"]: e.value });
    }

    const [disablebuttonmw, setDisableButtonMW] = useState(false);

    const OnSubmitMemWorkout = async (e) => {
        e.preventDefault();
        setDisableButtonMW(true);
        document.getElementById("img_gif_loading_btn_mw").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutAdd", {
            "mem_wc_map_member_id": props.mem_id,
            "mem_wc_map_primary_goal_id": 0,
            "mem_wc_map_secondary_goal_id": props.sg_id,
            "mem_wc_map_week_name": props.week_name,
            "mem_wc_map_wc_id": mem_wc_map_wc_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                window.location.reload(true);
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

    return (
        <CRow>
            <CCol>
                <button class='btn btn-sm btn-outline-info width100' onClick={(e) => handleShow(e)}><i class="fa fa-plus-circle"></i>&nbsp;Add New</button>
                {/* <CButton className=' btn btn-sm bgblue white width100' style={{ fontSize: "13px" }} onClick={(e) => handleShow(e)}>
                    Add New Package
                </CButton> */}
                {/* <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", borderRadius: "10px", textAlign: "center", marginLeft: "3px", paddingTop: "1px", border: "1px solid gray", }} onClick={(e) => handleShow(e)}>
                    <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px", paddingTop: "0px" }}>{props.week_name}</div>

                    {props.workout_count}
                </div> */}
                {/* <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }} onClick={(e) => handleShow(e)} >{props.week_name}</div> */}
                <CModal
                    style={{}}

                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Add New Workout</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>
                        <CRow>
                            <CCol xs="12" sm="6" md="6" lg="6">
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
                            <CCol xs="12" sm="6" md="6" lg="6" className='mt-4'>
                                <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit"
                                        onClick={(e) => OnSubmitMemWorkout(e)}
                                        disabled={disablebuttonmw} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Add</CButton>
                                    <img id="img_gif_loading_btn_mw" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                </div>
                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default MemSecGoalWorkOutAddtModal;