import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { post } from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';
const WorkoutSetupDetails = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    var woid = searchParams.get("wo_id");

    const [WorkoutSetup, setWorkoutSetup] = useState({
        wo_id: "",
        wo_name: "",
        wo_description: "",
        wo_video_thumbnail_filename: "",
        wo_video_filename: "",
        wo_video_link: "",
        wo_total_sets: "",
        wo_rest_interval_in_seconds: "",
        wo_one_set_time_in_seconds: "",
        wo_calorie_burn_value: ""
    })

    const {
        wo_id,
        wo_name,
        wo_description,
        wo_video_thumbnail_filename,
        wo_video_filename,
        wo_video_link,
        wo_total_sets,
        wo_rest_interval_in_seconds,
        wo_one_set_time_in_seconds,
        wo_calorie_burn_value
    } = WorkoutSetup;

    const [PictureDis, setPictureDis] = useState(false);
    const [VideoDis, setVideoDis] = useState(false);
    const WorkoutSetupDetails = async () => {
        var list = {};
        list["wo_id"] = woid;
        await axios.post(process.env.REACT_APP_API + "WorkoutSetupDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setPictureDis(true);
                setVideoDis(true);
                setWorkoutSetup(response.data.workout_setup_details)
            }
            else {
                setPictureDis(false);
                setVideoDis(false);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        WorkoutSetupDetails();
    }, []);
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Workout Setup Details</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CRow>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "grey" }}>Name </h6>

                                    </CCol>
                                    <CCol xs="12" sm="8" md="8" lg="8">
                                        <h6 style={{ color: "grey" }}>Description</h6>

                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_name}
                                        </h6>
                                    </CCol>
                                    <CCol xs="12" sm="8" md="8" lg="8">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_description}
                                        </h6>
                                    </CCol>
                                </CRow>
                                <CRow className='mt-2'>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "grey" }}>Video Thumbnail</h6>
                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "grey" }}>Video</h6>
                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "grey" }}>Video Link</h6>
                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        {PictureDis ?
                                            <div className=" table-responsive my-table">
                                                <img className="playerProfilePic_home_tile "
                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + wo_video_thumbnail_filename}
                                                    style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                />
                                            </div>
                                            : null}
                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        {VideoDis ?
                                            <video width="235" height="170" controls >
                                                <source src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + wo_video_filename} type="video/mp4" />
                                            </video>
                                            : null}
                                    </CCol>
                                    <CCol xs="12" sm="4" md="4" lg="4">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_video_link}
                                        </h6>
                                    </CCol>
                                </CRow>
                                <CRow className='mt-2'>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "grey" }}>Total Set</h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "grey" }}>Rest Interval</h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "grey" }}>One Set Time</h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "grey" }}>Calorie Burn Value</h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_total_sets}
                                        </h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_rest_interval_in_seconds}(in Sec)
                                        </h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_one_set_time_in_seconds}(in Sec)
                                        </h6>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "black", }}>
                                            {WorkoutSetup.wo_calorie_burn_value}
                                        </h6>
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
export default WorkoutSetupDetails;