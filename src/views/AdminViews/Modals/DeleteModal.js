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


const DeleteModal = (props) => {
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
  const [disablebutton, setDisableButton] = useState(false);
  //console.log("Id in delete" + props.delete_guid);
  //console.log("Name :" + props.name);

  var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
  const modaldata1 = randomnumber1.toString();
  const OnSubmitYes = async () => {

    setDisableButton(true);
    document.getElementById("img_gif_loading_btn").style.display = "block";
    var list = {};
    list[props.guidinput] = props.delete_guid;
    list["logged_in_user_guid"] = props.loggedinguid;
    //list["logged_in_user_guid"]="534fd416-54d2-459d-912a-11d9fdc46ea5";



    await axios.post(process.env.REACT_APP_API + props.apiname, list, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setWarnings({ ["warning"]: "" });

        setDisableButton(false);
        document.getElementById("img_gif_loading_btn").style.display = "none";

        toast.success(response.data.msg);
        props.changeDependency(modaldata1, props.index);

        setPrimary(!primary);


      }
      else {
        setWarnings({ ["warning"]: response.data.msg });

        setDisableButton(false);
        document.getElementById("img_gif_loading_btn").style.display = "none";
      }
    }).catch(error => {
      console.log(error);
      alert(error.message);
      setDisableButton(false);
      document.getElementById("img_gif_loading_btn").style.display = "none";
    })
  }

  var randomnumber2 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
  const modaldata2 = randomnumber2.toString();

  const OnSubmitNo = () => {
    setWarnings({ ["warning"]: "" });
    setPrimary(!primary);
  }

  return (
    <CRow>
      <CCol>


        <CButton className="btn btn-sm" onClick={() => setPrimary(!primary)}>
          <i className="fa fa-trash"></i>&nbsp;
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
            <CButton className="btn bgcolor white" onClick={() => setPrimary(!primary)}>
              <h5><i className=" fa fa-close" aria-hidden="true"
              ></i></h5>
            </CButton>
          </CModalHeader>
          <CModalBody >
            <h4 className="text-center mb-5">Are You Sure Want to Delete {props.name}?</h4>
            <CRow>

              <CCol xs="12" sm="6" lg="6" md="6">
                <CButton className="btn bgcolor white mr-1 mb-2 width100" onClick={() => OnSubmitNo()}
                //   style={{alignItems:"center"}}
                >
                  Cancel
                </CButton>
              </CCol>

              <CCol >


                <div className="  bgcolor" style={{ borderRadius: "5px" }}>
                  <CButton type="submit" style={{ width: "100%", color: "white" }} disabled={disablebutton} onClick={() => OnSubmitYes()}>Yes</CButton>
                  <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                </div>

                {warnings.warning && <p className="red">{warnings.warning}</p>}

              </CCol>
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

export default DeleteModal
