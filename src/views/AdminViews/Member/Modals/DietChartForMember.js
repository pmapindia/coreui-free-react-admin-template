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
import AddDietChartForMember from './AddDietChartForMember';
import EditDietChartForMember from './EditDietChartForMember';

const DietChartForMember = (props) => {

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
        LoadMemDietChartList();
    }

    const Parentvaluetomodal = (data) => {
        //setShow(false)
        LoadMemDietChartList();
    }

    const [DietChartList, setDietChartList] = useState([]);

    const LoadMemDietChartList = async () => {
        setDietChartList([])
        var list = {};
        list["diet_chart_member_id"] = props.mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberDietChartList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.member_diet_chart_list !== null) {
                    setDietChartList(response.data.member_diet_chart_list)
                }
                else {
                    setDietChartList([])
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);

            })
    }

    const [disablebuttonmdc, setDisableButtonmDC] = useState(false);

    const MemberDietChartDelete = async (taber_index, diet_chart_id) => {
        setDisableButtonmDC(true);
        document.getElementById("img_gif_loading_btn_mDC").style.display = "block";
        var list = {};
        list["diet_chart_id"] = diet_chart_id;
        await axios.post(process.env.REACT_APP_API + "MemberDietChartDelete", list, config).then(response => {
            console.log(response);
            // 
            if (response.data.is_success) {
                toast.success(response.data.msg);
                //console.log("taber_index: " + taber_index);
                var temp_taber = DietChartList;
                temp_taber.splice(taber_index, 1);
                setDietChartList([]);
                setDietChartList(temp_taber);
                //console.log("temp_users: " + temp_taber);
                setDisableButtonmDC(false);
                document.getElementById("img_gif_loading_btn_mDC").style.display = "none";

            }
            else {
                toast.error(response.data.msg);
                setDisableButtonmDC(false);
                document.getElementById("img_gif_loading_btn_mDC").style.display = "none";
            }
        }).catch(error => {
            console.log(error);
            setDisableButtonmDC(false);
            document.getElementById("img_gif_loading_btn_mDC").style.display = "none";
            //toast.error(""+error);
        })
    }


    return (
        <CRow>
            <CCol>
                <button class='btn btn-sm btn-outline-warning width100' onClick={(e) => handleShow(e)}>Diet Chart</button>
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
                    size="lg"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Diet Chart</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>
                        <CRow>
                            <CCol xs="12" sm="9" md="9" lg="9">

                            </CCol>
                            <CCol xs="12" sm="3" md="3" lg="3" className='mb-2'>
                                {/* <button class='btn btn-sm btn-outline-success width100'>Add New Diet Chart</button> */}
                                <AddDietChartForMember mem_id={props.mem_id} changeDependency={Parentvaluetomodal} />
                            </CCol>
                        </CRow>
                        <CRow>
                            {DietChartList.map((DietChartList, index) => (

                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{}}>
                                        <CCardBody style={{ backgroundColor: "#E3F2FD", margin: "0px", padding: "0px" }}>
                                            <CRow className="mt-2">
                                                <CCol xs="12" sm="8" md="8" lg="9">
                                                    <CLabel style={{ color: "black", margin: "0px", padding: "0px", fontWeight: "bold" }}>{DietChartList.diet_chart_heading_name}</CLabel><br />
                                                    <CLabel style={{ color: "gray" }}>{DietChartList.diet_chart_description}</CLabel>
                                                </CCol>
                                                <CCol xs="12" sm="2" md="2" lg="1">
                                                    {/* <button class='btn btn-sm btn-outline-primary'>Edit</button> */}
                                                    <EditDietChartForMember
                                                        mem_id={props.mem_id}
                                                        dc_id={DietChartList.diet_chart_id}
                                                        changeDependency={Parentvaluetomodal} />
                                                </CCol>
                                                <CCol xs="12" sm="2" md="2" lg="1">
                                                    {/* <button class='btn btn-sm btn-outline-danger' >Delete</button> */}
                                                    <div className="" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" className='btn btn-sm btn-outline-danger'
                                                            onClick={() => MemberDietChartDelete(index, DietChartList.diet_chart_id)}
                                                            disabled={disablebuttonmdc}
                                                            style={{ width: "", color: "", fontWeight: "50%", fontSize: "12px" }} >Delete</CButton>
                                                        <img id="img_gif_loading_btn_mDC" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "5px", display: "none" }} />
                                                    </div>
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
export default DietChartForMember;