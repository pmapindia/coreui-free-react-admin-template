import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { post } from 'axios';
//import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const WorkoutSetupAdd = (props) => {

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
    });

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

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setWorkoutSetup({ ...WorkoutSetup, [e.target.name]: e.target.value });
    }

    const [PictureDis, setPictureDis] = useState(false);

    var image = "";
    const onChangePicture = (e) => {
        console.log("jkfjjfjfg");
        console.log(e.target.name);
        if (e.target.files[0]) {

            var b = e.target.files[0].name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                var b = reader.result;
                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;
                UploadImage(image, image_name);
                console.log("Video image");
                //console.log(image);  
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage = async (wo_video_thumbnail_filename, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = wo_video_thumbnail_filename;
        list["image_for"] = "WORKOUTS";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setWorkoutSetup({ ...WorkoutSetup, ["wo_video_thumbnail_filename"]: response.data.image_name });
            }
            else {
                //setImageWarnings({ ["image_warning"]: response.data.msg });
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Remove images
    const Removeimagefront = (wo_video_thumbnail_filename) => {
        // alert(propertycoverimage);
        setWorkoutSetup({ ...WorkoutSetup, [wo_video_thumbnail_filename]: "" });
        setPictureDis(false);
    }

    //Upload Document

    const onChangeFile = (e) => {
        setWorkoutSetup({ ...WorkoutSetup, ["wo_video_filename"]: e.target.files[0] });
    }

    const [VideoDis, setVideoDis] = useState(false);
    const OnSubmitMedia = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "WORKOUTS"
        const url = (process.env.REACT_APP_API + `UploadFile?file_for=${filefor}`);

        const formData = new FormData();
        formData.append('body', WorkoutSetup.wo_video_filename);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'unique_code': cookies.unique_code
            },
        };
        return post(url, formData, config).then(response => {
            var adc = WorkoutSetup.wo_video_filename;
            //11alert(adc+","+response.data.file_name);
            console.log(response);
            console.log(response.data.file_name);

            if (response.data.is_success) {
                setVideoDis(true);
                setWorkoutSetup({ ...WorkoutSetup, ["wo_video_filename"]: response.data.file_name });
                toast.success(response.data.msg);
            }
            else {
                setVideoDis(false);
                toast.error(response.data.msg);
            }

        });
    }

    const OnSubmitWorkoutSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (wo_id === "") {
            await axios.post(process.env.REACT_APP_API + "WorkoutSetupAdd", {
                "wo_name": wo_name,
                "wo_description": wo_description,
                "wo_video_thumbnail_filename": wo_video_thumbnail_filename,
                "wo_video_filename": wo_video_filename,
                "wo_video_link": wo_video_link,
                "wo_total_sets": wo_total_sets,
                "wo_rest_interval_in_seconds": wo_rest_interval_in_seconds,
                "wo_one_set_time_in_seconds": wo_one_set_time_in_seconds,
                "wo_calorie_burn_value": wo_calorie_burn_value
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/workoutsetup-list`);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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
        else {
            await axios.post(process.env.REACT_APP_API + "WorkoutSetupUpdate", {
                "wo_id": wo_id,
                "wo_name": wo_name,
                "wo_description": wo_description,
                "wo_video_thumbnail_filename": wo_video_thumbnail_filename,
                "wo_video_filename": wo_video_filename,
                "wo_video_link": wo_video_link,
                "wo_total_sets": wo_total_sets,
                "wo_rest_interval_in_seconds": wo_rest_interval_in_seconds,
                "wo_one_set_time_in_seconds": wo_one_set_time_in_seconds,
                "wo_calorie_burn_value": wo_calorie_burn_value
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/workoutsetup-list`);
                    // setDisableButton(false);
                    // document.getElementById("img_gif_loading_btn").style.display = "none";
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

    }

    const WorkoutSetupDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["wo_id"] = props.location.pfid.pfid;
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
                                {props.location.pfid != null ? <h4>Update Workout Setup</h4>
                                    :
                                    <h4> <h4>Add New Workout Setup</h4></h4>
                                }
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitWorkoutSetup(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Name' required="required"
                                                    name='wo_name'
                                                    value={wo_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="9" md="3" lg="9">
                                            <CFormGroup>
                                                <CLabel>Description</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Description' required="required"
                                                    name='wo_description'
                                                    //rows={3}
                                                    value={wo_description}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Total Set</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Total Set' required="required"
                                                    name='wo_total_sets'
                                                    value={wo_total_sets}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Rest Interval(In Sec)</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Rest Interval(In Sec)' required="required"
                                                    name='wo_rest_interval_in_seconds'
                                                    value={wo_rest_interval_in_seconds}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>One Set Time(In Sec)</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter One Set Time(In Sec)' required="required"
                                                    name='wo_one_set_time_in_seconds'
                                                    value={wo_one_set_time_in_seconds}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Calorie Burn Value</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Calorie Burn Value' required="required"
                                                    name='wo_calorie_burn_value'
                                                    value={wo_calorie_burn_value}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="">
                                            <CFormGroup>
                                                <CLabel className="">Thumbnail Size 1280 × 720 pixels</CLabel><span className="red">*</span>
                                                <div className="div" style={{ fontSize: "15px", fontWeight: "" }}>
                                                    Upload Video Thumbnail
                                                    <CInput type="file" className="hide-file"
                                                        name="wo_video_thumbnail_filename"
                                                        onChange={(e) => onChangePicture(e)}
                                                    ></CInput>
                                                </div>
                                                {PictureDis ? <div>
                                                    <br></br>
                                                    <div className=" table-responsive my-table mt-5">
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + wo_video_thumbnail_filename}
                                                            style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                        />
                                                    </div>
                                                    <CFormGroup>
                                                        <CButton className="bgcolor white ml-1 mt-1"
                                                            onClick={() => Removeimagefront("customer_photo")}
                                                        ><i className="fa fa-close"></i></CButton>
                                                    </CFormGroup>
                                                </div> : null}
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4" >
                                            <CRow>
                                                <CCol xs="12" sm="10" md="10" lg="10" >
                                                    <CFormGroup>
                                                        <CLabel>Upload Video</CLabel>
                                                        <CInput type="file"
                                                            name="wo_video_filename"
                                                            onChange={(e) => onChangeFile(e)}
                                                        ></CInput>
                                                    </CFormGroup>
                                                    {VideoDis ?
                                                        <video width="235" height="170" controls >
                                                            <source src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/WORKOUTS/" + wo_video_filename} type="video/mp4" />
                                                        </video>
                                                        : null}
                                                </CCol>
                                                <CCol xs="12" sm="2" md="2" lg="2" className="mt-1">
                                                    <CFormGroup>
                                                        <CButton type="submit"
                                                            onClick={(e) => OnSubmitMedia(e)}
                                                            className="mt-4 bgcolor white" style={{ width: "" }}>Upload</CButton>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol xs="12" sm="1" md="1" lg="1" >
                                        </CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4" >
                                            <CFormGroup>
                                                <CLabel>Youtube Video Link</CLabel>
                                                <CInput type='text' placeholder='Enter Video Link'
                                                    name='wo_video_link'
                                                    value={wo_video_link}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        

                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="">
                                            <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}
export default WorkoutSetupAdd;