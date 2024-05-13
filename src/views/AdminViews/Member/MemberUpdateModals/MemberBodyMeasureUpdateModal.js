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

const MemberBodyMeasurementModal = (props) => {
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton8, setDisableButton8] = useState(false);

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();
    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    return (
        <CRow>
            <CCol>
                {/* <CButton className="btn btn-md white width100"
                    style={{ backgroundColor: "#F44336" }}
                    onClick={() => setPrimary(!primary)}
                >Freeze/Pause
                </CButton> */}
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}
                >
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

                        <CModalTitle className=" white mt-2"><h4>Update Body Measurement</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default MemberBodyMeasurementModal;