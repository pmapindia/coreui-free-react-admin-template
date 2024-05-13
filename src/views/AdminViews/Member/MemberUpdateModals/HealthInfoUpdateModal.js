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

const HealthInfoUpdateModal = ({ show, mem_id }, props) => {
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
    const [disablebutton4, setDisableButton4] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [MemberHealthIn, setMemberHealthin] = useState({
        mh_member_id: props.member_id,
        member_health_list: []
    });

    const {
        mh_member_id,
        member_health_list
    } = MemberHealthIn;

    const [MemberHealthList, setMemberHealthList] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_MEMBER_HEALTH_SETUP", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_HEALTH_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "mh_health_id": dd_list.each_drop_down_list[sd].dd_id, "mh_health_name": dd_list.each_drop_down_list[sd].dd_name, "mh_value": "" })
                            // setPaymentTypes([...PaymentTypes, {
                            //     "payment_type_id": dd_list.each_drop_down_list[sd].dd_id,
                            //     "sale_payment_name": dd_list.each_drop_down_list[sd].dd_name
                            // }])
                        }
                        setMemberHealthList(ddlist);
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

    const OnParameterInputChange = (e, index, pid) => {
        console.log(index, e.target.name, e.target.checked, e.target.id,);

        for (let k = 0; k < MemberHealthList.length; k++) {
            if (MemberHealthList[k].mh_health_id === pid) {
                if (e.target.id === "yes") {
                    let values = [...MemberHealthList];

                    values[k]["mh_value"] = true;
                    setMemberHealthList(values);
                }

                if (e.target.id === "no") {
                    let values = [...MemberHealthList];

                    values[k]["mh_value"] = false;
                    setMemberHealthList(values);
                }
            }
        }
    }

    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    useEffect(() => {
        if (show11 === true) {
            LoadHealthInfoDetails();
        }
    }, [show11]);


    const LoadHealthInfoDetails = async () => {
        var list = {};
        list["member_id"] = mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberHealthListByMemberID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setMemberHealthin({
                    "mh_member_id": response.data.member_id
                });
                setMemberHealthList(response.data.member_health_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }



    const OnSubmitHealthInfoUpdate = async (e) => {
        e.preventDefault();
        setDisableButton4(true);
        document.getElementById("img_gif_loading_btn4").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberHealthUpdate", {
            "mh_member_id": mh_member_id,
            "member_health_list": MemberHealthList
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
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

                        <CModalTitle className=" white mt-2"><h4>Update Health Info</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CForm onSubmit={(e) => OnSubmitHealthInfoUpdate(e)}>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        <CCardBody>
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><CLabel>Name</CLabel></td>
                                                                <td ><CLabel style={{ width: "20px", marginLeft: "50px" }}>Yes</CLabel></td>
                                                                <td><CLabel style={{ width: "20px", marginLeft: "50px" }}>No</CLabel></td>
                                                            </tr>

                                                            {MemberHealthList.map((HealthList, index) => (
                                                                <tr>
                                                                    <td>
                                                                        <CLabel>{HealthList.mh_health_name}</CLabel>
                                                                    </td>
                                                                    <td>
                                                                        <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio'
                                                                            name={HealthList.mh_health_id}
                                                                            id="yes"
                                                                            checked={HealthList.mh_value === true ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, HealthList.mh_health_id)}
                                                                        />
                                                                    </td>

                                                                    <td>
                                                                        <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio'
                                                                            name={HealthList.mh_health_id}
                                                                            id="no"
                                                                            checked={HealthList.mh_value === false ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, HealthList.mh_health_id)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton4} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn4" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default HealthInfoUpdateModal;