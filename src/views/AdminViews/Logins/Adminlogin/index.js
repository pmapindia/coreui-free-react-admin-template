import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Object } from 'core-js';
import AdminLoginValidation from './AdminLoginValidation';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import 'font-awesome/css/font-awesome.min.css';
import '../../../../scss/_custom.scss';

const AdminLogin = () => {
  const [userdetails, setUserDetails] = useState({});


  let d = new Date();
  d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));//expires in one month
  //d.setTime(d.getTime()+(1*24*60*60*1000));//expires in one day

  //d.setTime(d.getTime()+(1*60*1000));//expires in one minute
  let history = useHistory();
  const [cookies, setCookies, removeCookie] = useCookies(['admin']);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({
    warning: ""
  });
  const [adminlogin, setAdminLogin] = useState({
    user_unique_code: "",
    user_username: "",
    user_password: ""
  });
  const { user_unique_code, user_username, user_password } = adminlogin;
  const OnInputChange = (e) => {
    console.log(e.target.value);
    setAdminLogin({ ...adminlogin, [e.target.name]: e.target.value });
  }

  setCookies('unique_code', adminlogin.user_unique_code, { path: '/', expires: d });

  const config = {
    headers: {
      user_unique_code: adminlogin.user_unique_code,
    }
  };

  const [disablebutton, setDisableButton] = useState(false);
  const setlogincredentialtocookie = async () => {
    setWarnings({ ["warning"]: '' });
    setDisableButton(true);
    document.getElementById("img_gif_loading_btn").style.display = "block";
    setErrors(AdminLoginValidation(adminlogin));
    var errorcount = Object.keys(AdminLoginValidation(adminlogin)).length;
    if (errorcount === 0) {
      //alert(errorcount);
      // e.preventDefault();
      await axios.post(process.env.REACT_APP_API + "UserLogin", adminlogin,config).then(response => {
        console.log(response);
        if (response.data.is_success) {
          setUserDetails(response.data.user);
          // setCookies('user',response.data.user);
          setCookies('user_id', response.data.user.user_user_id, { path: '/', expires: d });
          setCookies('user_name', response.data.user.user_user_name, { path: '/', expires: d });
          setCookies('user_mobile_no', response.data.user.user_mobile_number, { path: '/', expires: d });
          setCookies('user_type', response.data.user.user_type, { path: '/', expires: d });
          setCookies('user_email', response.data.user.user_email, { path: '/', expires: d });
          setWarnings({ ["warning"]: "" });
          toast.success(response.data.msg);
          history.push(`/admindashboard`);
          //window.location.reload(true);
        }
        else {
          toast.error(response.data.msg);
          // history.push("/");
          setWarnings({ ["warning"]: response.data.msg });
          setDisableButton(false);
          document.getElementById("img_gif_loading_btn").style.display = "none";
        }

      }).catch(error => {
        console.log(error);
      })
    }
    else {
      setDisableButton(false);
      document.getElementById("img_gif_loading_btn").style.display = "none";
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    {/* <img className="playerProfilePic_home_tile " src={process.env.PUBLIC_URL + 'avatars/logo.jpg'} style={{ width: "50%", height: "100px", marginTop: "5px",verticalAlign:"center" }} /> */}
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <p className="text-muted" style={{ textAlign: "center" }}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Unique Code" name="user_unique_code"
                        value={user_unique_code} required="required"
                        onChange={(e) => OnInputChange(e)} />
                    </CInputGroup>
                    {errors.user_unique_code && <p className="red">{errors.user_unique_code}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" name="user_username"
                        value={user_username} required="required"
                        onChange={(e) => OnInputChange(e)} />
                    </CInputGroup>

                    {errors.user_username && <p className="red">{errors.user_username}</p>}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" name="user_password"
                        value={user_password} required="required"
                        onChange={(e) => OnInputChange(e)} />

                    </CInputGroup>
                    {errors.user_password && <p className="red">{errors.user_password}</p>}
                    <CRow>
                      <CCol xs="12">
                        <div className="bggreen mb-3" style={{ borderRadius: "5px" }}>
                          <CButton onClick={() => setlogincredentialtocookie()} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                          <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                        </div>
                        {warnings.warning && <p className="red" style={{ textAlign: "center" }}>{warnings.warning}</p>}
                        {/* <CButton color="success" onClick={() => setlogincredentialtocookie()} style={{ width: "100%" }} className="px-4">Login</CButton> */}
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AdminLogin
