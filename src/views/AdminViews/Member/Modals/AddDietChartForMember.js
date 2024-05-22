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

const AddDietChartForMember = (props) => {

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
        //GetDropDown();
    }
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [MemDietChartAdd, setMemDietChartAdd] = useState({
        diet_chart_member_id: "",
        diet_chart_heading_name: "",
        diet_chart_description: ""
    });

    const {
        diet_chart_member_id,
        diet_chart_heading_name,
        diet_chart_description
    } = MemDietChartAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setMemDietChartAdd({ ...MemDietChartAdd, [e.target.name]: e.target.value });
    }
    const [disablebuttond, setDisableButtonD] = useState(false);

    const OnSubmitDietchart = async (e) => {
        e.preventDefault();
        setDisableButtonD(true);
        document.getElementById("img_gif_loading_btnd").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberDietChartAdd", {
            "diet_chart_member_id": props.mem_id,
            "diet_chart_heading_name": diet_chart_heading_name,
            "diet_chart_description": diet_chart_description
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButtonD(false);
                document.getElementById("img_gif_loading_btnd").style.display = "none";
                props.changeDependency(modaldata1);

                setPrimary(!primary);
                //history.push(`/workoutsetup-list`);
                // setDisableButton(false);
                // document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButtonD(false);
                document.getElementById("img_gif_loading_btnd").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
                setDisableButtonD(false);
                document.getElementById("img_gif_loading_btnd").style.display = "none";
            })
    }

    return (
        <CRow>
            <CCol>
                <button class='btn btn-sm btn-outline-success width100' onClick={(e) => handleShow(e)}>Add New Diet Chart</button>
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

                        <CModalTitle className=" white mt-2"><h4>Add Diet Chart</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={(e) => OnSubmitDietchart(e)}>
                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CFormGroup>
                                        <CLabel>Heading Name</CLabel><span className="red">*</span>
                                        <CInput type='text' placeholder='Heading Name' required
                                            name='diet_chart_heading_name'
                                            //pattern="^\d*(\.\d{0,2})?$"
                                            value={diet_chart_heading_name}
                                            onChange={(e) => OnInputChange(e)}
                                        />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CFormGroup>
                                        <CLabel>Description</CLabel><span className="red">*</span>
                                        <CTextarea type='text' placeholder='Description' required
                                            name='diet_chart_description'
                                            rows={3}
                                            //pattern="^\d*(\.\d{0,2})?$"
                                            value={diet_chart_description}
                                            onChange={(e) => OnInputChange(e)}
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <hr className="bgcolor" style={{ height: "1px" }} />
                            <CRow>
                                {/* <CCol xs="12" sm="9" md="9" lg="9"></CCol> */}
                                <CCol xs="12" sm="12" md="12" lg="12" className="">
                                    <div className="bgcolor mt-1" style={{ borderRadius: "5px" }}>
                                        <CButton type="submit" disabled={disablebuttond} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                        <img id="img_gif_loading_btnd" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                    </div>
                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                </CCol>
                            </CRow>
                        </CForm>

                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default AddDietChartForMember;