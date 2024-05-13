import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
    CInput, CForm, CSelect, CRow, CLabel, CFormGroup, CLink
} from '@coreui/react'
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const MakeInactiveModal = (props) => {
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

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [disablebutton, setDisableButton] = useState(false);

    const OnSubmitYes = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberInactive", {
            "member_id": props.mem_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                toast.success(response.data.msg);
                // props.changeDependency(modaldata1, props.index);
                // setPrimary(!primary);
                window.location.reload(true);
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

    const OnSubmitNo = () => {
        setWarnings({ ["warning"]: "" });
        setPrimary(!primary);
    }

    return (
        <CRow>
            <CCol>


                <CButton className="btn btn-sm white width100" style={{ backgroundColor: "red" }}
                    onClick={() => setPrimary(!primary)}>
                    Make Inactive
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h3>Alert</h3></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <h4 className="text-center mb-5">Are You Sure Want to Inactive this - {props.name}?</h4>
                        {warnings.warning && <p className="red">{warnings.warning}</p>}
                        <CRow>

                            <CCol xs="12" sm="6" lg="6" md="6">
                                <CButton className="btn bgcolor white mr-1 mb-2 width100" onClick={() => OnSubmitNo()}
                                >
                                    No
                                </CButton>
                            </CCol>

                            <CCol xs="12" sm="6" lg="6" md="6">
                                <div className="  bgcolor" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" style={{ width: "100%", color: "white" }} disabled={disablebutton} onClick={(e) => OnSubmitYes(e)}>Yes</CButton>
                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                </div>
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default MakeInactiveModal;