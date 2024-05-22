import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { post } from 'axios';
import DeleteModal from '../../Modals/DeleteModal';
import { Link } from 'react-router-dom';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const TestimonialsAdd = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [TestimonialsAdd, setTestimonialsAdd] = useState({
        testim_id: "",
        testim_category_id: "",
        testim_name: "",
        testim_thumbnail: "",
        testim_video_filename: "",
        testim_description: ""
    });

    const {
        testim_id,
        testim_category_id,
        testim_name,
        testim_thumbnail,
        testim_video_filename,
        testim_description
    } = TestimonialsAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTestimonialsAdd({ ...TestimonialsAdd, [e.target.name]: e.target.value });
    }

    const [CategoryDropdowns, setCategoryDropdowns] = useState([]);
    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_CATEGORY", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CATEGORY") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCategoryDropdowns(ddlist);
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

    const onChangeCategorydropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setTestimonialsAdd({ ...TestimonialsAdd, ["testim_category_id"]: e.value });
    };

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

    const UploadImage = async (testim_thumbnail, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = testim_thumbnail;
        list["image_for"] = "TESTIMONIALS";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setTestimonialsAdd({ ...TestimonialsAdd, ["testim_thumbnail"]: response.data.image_name });
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
        setTestimonialsAdd({ ...TestimonialsAdd, ["testim_thumbnail"]: "" });
        setPictureDis(false);
    }

    //Upload Document

    const onChangeFile = (e) => {
        setTestimonialsAdd({ ...TestimonialsAdd, ["testim_video_filename"]: e.target.files[0] });
    }

    const [VideoDis, setVideoDis] = useState(false);
    const OnSubmitMedia = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "TESTIMONIALS"
        const url = (process.env.REACT_APP_API + `UploadFile?file_for=${filefor}`);

        const formData = new FormData();
        formData.append('body', TestimonialsAdd.testim_video_filename);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'unique_code': cookies.unique_code
            },
        };
        return post(url, formData, config).then(response => {
            //var adc = WorkoutSetup.wo_video_filename;
            //11alert(adc+","+response.data.file_name);
            console.log(response);
            console.log(response.data.file_name);

            if (response.data.is_success) {
                setVideoDis(true);
                setTestimonialsAdd({ ...TestimonialsAdd, ["testim_video_filename"]: response.data.file_name });
                toast.success(response.data.msg);
            }
            else {
                setVideoDis(false);
                toast.error(response.data.msg);
            }

        });
    }

    const OnSubmitSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (testim_id === "") {
            await axios.post(process.env.REACT_APP_API + "TestimonialsAdd", {
                "testim_category_id": testim_category_id,
                "testim_name": testim_name,
                "testim_thumbnail": testim_thumbnail,
                "testim_video_filename": testim_video_filename,
                "testim_description": testim_description
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push('/testim-list');
                    //window.location.reload(true);
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
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        } else {
            await axios.post(process.env.REACT_APP_API + "TestimonialsUpdate", {
                "testim_id": testim_id,
                "testim_category_id": testim_category_id,
                "testim_name": testim_name,
                "testim_thumbnail": testim_thumbnail,
                "testim_video_filename": testim_video_filename,
                "testim_description": testim_description
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push('/testim-list');
                    //window.location.reload(true);
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
                    alert(error.message);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                })
        }

    }

    const TestimonialsDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["testim_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "TestimonialsDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    if (response.data.testimonial_details !== null) {
                        setPictureDis(true);
                        setVideoDis(true);
                        setTestimonialsAdd(response.data.testimonial_details);
                    }
                    else {
                        setPictureDis(false);
                        setVideoDis(false);
                    }
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    useEffect(() => {
        TestimonialsDetails();
    }, []);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Testimonials Setup</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitSetup(e)}>
                                    <CRow>

                                        <CCol xs="12" sm="3" ms="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Category</CLabel><span className="red">*</span>
                                                <Select value={CategoryDropdowns.filter(function (option) {
                                                    return option.value === testim_category_id;
                                                })}
                                                    options={CategoryDropdowns}
                                                    onChange={(e) => onChangeCategorydropdown(e, "testim_category_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Name' required="required"
                                                    name='testim_name'
                                                    value={testim_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="6" md="6" lg="6">
                                            <CFormGroup>
                                                <CLabel>Description</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Description' required="required"
                                                    name='testim_description'
                                                    value={testim_description}
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
                                                        name="testim_thumbnail"
                                                        onChange={(e) => onChangePicture(e)}
                                                    ></CInput>
                                                </div>
                                                {PictureDis ? <div>
                                                    <br></br>
                                                    <div className=" table-responsive my-table mt-5">
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/TESTIMONIALS/" + testim_thumbnail}
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
                                                            name="testim_video_filename"
                                                            onChange={(e) => onChangeFile(e)}
                                                        ></CInput>
                                                    </CFormGroup>
                                                    {VideoDis ?
                                                        <video width="300" height="200" controls >
                                                            <source src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/TESTIMONIALS/" + testim_video_filename} type="video/mp4" />
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

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} disabled={disablebutton}>Save</CButton>
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
export default TestimonialsAdd;