import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
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
import classNames from 'classnames';
import EnquiryFollowUpModal from './EnquiryFollowUpModal';
import BalancePaymentUpdateModal from './BalancePaymentUpdateModal';


const Notification = (props) => {
    const [primary, setPrimary] = useState(false);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [alertlists, setAlertLists] = useState([]);


    const Alert = async (e) => {
        e.preventDefault();
        window.location.reload(true);
    }


    return (
        <CRow>


            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>

            </div>

            <CModal
                show={!primary}
                onClose={() => setPrimary(!primary)}
                //color="primary"
                size="md"
            >
                {/* <CModalHeader closeButton> */}
                <CModalHeader className="bgcolor">

                    <CModalTitle className="bgcolor white mt-2" ><h4 style={{ textAlign: "center", verticalAlign: "middle" }}>Alert</h4></CModalTitle>
                    <CButton className="btn btn-sm bgcolor white" onClick={() => setPrimary(!primary)}>
                        <h5><i className=" fa fa-close" aria-hidden="true"
                        ></i></h5>
                    </CButton>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <h3 style={{ color: "red", textAlign: "center" }}>Sorry, you are not authorized</h3>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="4" md="4" lg="4"></CCol>
                        {/* <CCol xs="12" sm="4" md="4" lg="4">
                            <CButton onClick={(e)=>Alert(e)} className="btn btn-sm bgcolor white width100 mt-3">
                                Okay
                            </CButton>
                        </CCol> */}
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <Link to={`/admindashboard`} className="btn btn-sm bgcolor white width100 mt-3">Okay</Link>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        </CRow>
    )
}

export default Notification