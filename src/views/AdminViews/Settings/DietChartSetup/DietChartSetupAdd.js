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

const DietChartSetupAdd = (props) => {

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

    const [DietChartSetup, setDietChartSetup] = useState({
        dc_id: "",
        dc_primary_goal_id: "",
        dc_secondary_goal_id: "",
        dc_heading_name: "",
        dc_description: ""
    });

    const {
        dc_id,
        dc_primary_goal_id,
        dc_secondary_goal_id,
        dc_heading_name,
        dc_description
    } = DietChartSetup;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setDietChartSetup({ ...DietChartSetup, [e.target.name]: e.target.value });
    }

    const [PrimaryDropdowns, setPrimaryDropdowns] = useState([]);
    const [SecondaryDropdowns, setSecondaryDropdowns] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_MEMBER_PRIMARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_MEMBER_SECONDARY_GOALS_SETUP", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_SECONDARY_GOALS_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name });
                        }
                        setSecondaryDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangePridropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setDietChartSetup({ ...DietChartSetup, ["dc_primary_goal_id"]: e.value });
    }

    const onChangeSecdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setDietChartSetup({ ...DietChartSetup, ["dc_secondary_goal_id"]: e.value });
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const OnSubmitDietchartSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (dc_id === "") {
            await axios.post(process.env.REACT_APP_API + "DietChartSetupAdd", {
                "dc_primary_goal_id": dc_primary_goal_id,
                "dc_secondary_goal_id": dc_secondary_goal_id,
                "dc_heading_name": dc_heading_name,
                "dc_description": dc_description
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/dietchartsetup-list`);
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
            await axios.post(process.env.REACT_APP_API + "DietChartSetupUpdate", {
                "dc_id": dc_id,
                "dc_primary_goal_id": dc_primary_goal_id,
                "dc_secondary_goal_id": dc_secondary_goal_id,
                "dc_heading_name": dc_heading_name,
                "dc_description": dc_description
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/dietchartsetup-list`);
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

    const DietchartSetupDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["dc_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "DietChartSetupDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    setDietChartSetup(response.data.diet_chart_details)
                }
                
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    useEffect(() => {
        DietchartSetupDetails();
    }, []);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                {props.location.pfid != null ? <h4>Update Diet Chart Setup</h4>
                                    :
                                    <h4> <h4>Add New Diet Chart Setup</h4></h4>
                                }
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitDietchartSetup(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Primary Goal</CLabel>
                                                <Select value={PrimaryDropdowns.filter(function (option) {
                                                    return option.value === dc_primary_goal_id;
                                                })}
                                                    options={PrimaryDropdowns}
                                                    onChange={(e) => onChangePridropdown(e, "dc_primary_goal_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Secondary Goal</CLabel>
                                                <Select value={SecondaryDropdowns.filter(function (option) {
                                                    return option.value === dc_secondary_goal_id;
                                                })}
                                                    options={SecondaryDropdowns}
                                                    onChange={(e) => onChangeSecdropdown(e, "dc_secondary_goal_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Heading Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Heading Name' required="required"
                                                    name='dc_heading_name'
                                                    value={dc_heading_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Description</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Heading Description' required="required"
                                                    name='dc_description'
                                                    value={dc_description}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="8" md="8" lg="9"></CCol>
                                        <CCol xs="12" sm="4" md="4" lg="3">
                                            <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
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
export default DietChartSetupAdd;