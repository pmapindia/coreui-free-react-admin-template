import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';

const MemGoalsUpdateModal = ({show,mem_id},props) => {
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [PrimaryDropdowns, setPrimaryDropdowns] = useState([]);
    const [SecondaryDropdowns, setSecondaryDropdowns] = useState([]);
    const [disablebutton3, setDisableButton3] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [MemGoalsUpdate, setMemGoalsUpdate] = useState({
        member_id: props.member_id,
        member_primary_goal_id: "",
        member_secondary_goal_id: ""
    });

    const {
        member_id,
        member_primary_goal_id,
        member_secondary_goal_id
    } = MemGoalsUpdate;

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
        setMemGoalsUpdate({ ...MemGoalsUpdate, ["member_primary_goal_id"]: e.value });
    }

    const onChangeSecdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemGoalsUpdate({ ...MemGoalsUpdate, ["member_secondary_goal_id"]: e.value });
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    useEffect(() => {
        if (show11 === true) {
            LoadGoalDetails();
        }
    }, [show11]);

    const LoadGoalDetails = async () => {
        var list = {};
        list["member_id"] = mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberPrimaryAndSecondaryGoalsDetailsByMemberID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setMemGoalsUpdate({
                    "member_id": response.data.primary_secondary_goals_details.member_id,
                    "member_primary_goal_id": response.data.primary_secondary_goals_details.member_primary_goal_id,
                    "member_secondary_goal_id": response.data.primary_secondary_goals_details.member_secondary_goal_id
                })
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const OnSubmitMemGoalsUpdate = async (e) => {
        e.preventDefault();
        setDisableButton3(true);
        document.getElementById("img_gif_loading_btn3").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberPrimarySecondaryGoalsUpdate", {
            "member_id": member_id,
            "member_primary_goal_id": member_primary_goal_id,
            "member_secondary_goal_id": member_secondary_goal_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            })
    }
    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Update Goals</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CForm onSubmit={(e) => OnSubmitMemGoalsUpdate(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Primary Goal</CLabel>
                                                        <Select value={PrimaryDropdowns.filter(function (option) {
                                                            return option.value === member_primary_goal_id;
                                                        })}
                                                            options={PrimaryDropdowns}
                                                            onChange={(e) => onChangePridropdown(e, "member_primary_goal_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                    {/* <CLabel>+ Add New Goal</CLabel> */}

                                                </CCol>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Secondary Goal</CLabel>
                                                        <Select value={SecondaryDropdowns.filter(function (option) {
                                                            return option.value === member_secondary_goal_id;
                                                        })}
                                                            options={SecondaryDropdowns}
                                                            onChange={(e) => onChangeSecdropdown(e, "member_secondary_goal_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton3} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn3" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>

    )
}
export default MemGoalsUpdateModal