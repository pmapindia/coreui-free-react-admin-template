
import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

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


const Memberecxelimportsuccessmodal = (props) => {
  const [primary, setPrimary] = useState(false);
  //const [primary, setPrimary] = useState(true);

 console.log("success msg"+props.msg);
 
var randomnumber=Math.floor(Math.random()*100);//returns random number from 1 to 100
const modaldata=randomnumber.toString(); 
const OnSubmitNo=()=>{

  setPrimary(!primary);
  props.changeDependency(modaldata);

// history.push('/accountsdashboard');
  
}
  return (
    <CRow>
      <CCol>
      

            {/* <CButton className="btn" onClick={() => setPrimary(!primary)}>
            <i className="fa fa-trash"></i>&nbsp;
            </CButton> */}
           
            <CModal 
            //to open the modal without button just give show={true} then it will open the modal
              show={!primary} 
              onClose={() => setPrimary(!primary)}
              color="blue"
               size="md"
            >
              {/* <CModalHeader closeButton> */}
              <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                <CModalTitle className="bgcyan white mt-2"><h3>Success</h3></CModalTitle>
                <CButton className="btn bgcyan white" onClick={() => setPrimary(!primary)}>
                 <h5><i className=" fa fa-close" aria-hidden="true"
                ></i></h5>
                </CButton>
              </CModalHeader>
              <CModalBody>
                  {/* <h4 className="text-center mt-3">Route Card Number</h4> */}
                
                  <h4 className="text-center mb-4">{props.msg}</h4>

                <CRow>
                                      
                    <CCol xs="12" sm="12" lg="12" md="12">
                    <CButton className="btn bgcyan white mr-1 mb-2 width100" onClick={()=>OnSubmitNo()}
                //   style={{alignItems:"center"}}
                >
                  Okay
                </CButton>
                    </CCol> 

                    {/* <CCol >
                <CButton className="btn bgcyan white mr-1 mb-2 width100" onClick={()=>OnSubmitYes()}
                //   style={{alignItems:"center"}}
                >
                  Yes
                </CButton> */}
                {/* </CCol> */}
                  </CRow>
                            
              </CModalBody>
              <CModalFooter>
                {/* <CCol>
                <CButton color="primary" onClick={()=>OnSubmit1()}
                  style={{alignItems:"center",width:"600px"}}
                >
                  Submit
                </CButton>
                </CCol> */}
              </CModalFooter>
            </CModal>

            
      </CCol>
    </CRow>
  )
}

export default Memberecxelimportsuccessmodal
