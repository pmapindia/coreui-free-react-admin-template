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

const MailSuccessModal = (props) => {

  let history = useHistory();

  const [primary, setPrimary] = useState(false);
  console.log("success msg" + props.msg);

  var randomnumber = Math.floor(Math.random() * 100);//returns random number from 1 to 100
  const modaldata = randomnumber.toString();
  return (
    <CRow>
      <CCol>
        <CModal
          //to open the modal without button just give show={true} then it will open the modal
          show={!primary}
          onClose={() => setPrimary(!primary)}
          color="blue"
          size="md">
          <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>
            <CModalTitle className=" white mt-2"><h3>Success</h3></CModalTitle>
            <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
              <h5><i className=" fa fa-close" aria-hidden="true"
              ></i></h5>
            </CButton>
          </CModalHeader>
          <CModalBody>
            <h3 className="text-center mb-4" style={{ color: 'green' }}>{props.msg}</h3>
            <CRow>
            <CCol xs="12" sm="4" lg="4" md="4"></CCol>
              <CCol xs="12" sm="4" lg="4" md="4">
                <Link to={`/memberlist`}
                  className="btn bgcolor white width100" style={{ paddingLeft: "2px" }}>
                  Okay
                </Link>
              </CCol>

              <CCol xs="12" sm="5" lg="5" md="5"></CCol>

              {/* <CCol xs="12" sm="5" lg="5" md="5">
                <CButton className="btn bgcolor white mr-1 mb-2 width100" onClick={() => setPrimary(!primary)}>
                  No
                </CButton>
              </CCol> */}

              {/* <CCol xs="12" sm="4" lg="4" md="4">
                <CButton className="btn bgcyan white mr-1 mb-2 width100" onClick={() => setPrimary(!primary)}>
                  No
                </CButton>
              </CCol> */}
            </CRow>

          </CModalBody>
          <CModalFooter>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}
export default MailSuccessModal
