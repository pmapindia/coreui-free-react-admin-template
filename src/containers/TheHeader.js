import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router';
//import logos from '../assets/alcoats_logo.png';
// import logos from '../assets/logo.png'

import {
  CHeader,
  CToggler,
  CLabel,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import 'font-awesome/css/font-awesome.min.css';


// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  const[cookies,setCookies,removeCookie]=useCookies(['admin']);

  let history=useHistory();
const Logout=()=>{
  //alert(cookies.user_guid);
  removeCookie("user_guid");
  removeCookie("user_type");
 removeCookie("user_employee_name");
 removeCookie("user_username");
 removeCookie("user_mobile_number");
//  removeCookie("user_password");
 removeCookie("user_department");
 //alert(cookies.user_guid);
 removeCookie("user_dashboard_id");


 history.push('/adminlogin');
  window.location.reload(true);

}
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" src={''} height="48" alt="Logo"/>
      </CHeaderBrand>
      {/* <div className="px-5">

      </div> */}
      {/* <div className="px-5">

      </div> <div className="px-5">
      </div> <div className="px-5">

      </div> <div className="px-5">
<h1></h1>
      </div>
      <div className="px-5">
<h1></h1>
      </div> <div style={{paddingLeft:"450px",paddingRight:"5px"}}>
        <CRow className="pt-3">
          <CCol xs="2" sm="1" md="1" lg="1"className="p-0">
          <i className=" fa fa-sign-out" aria-hidden="true"
                ></i> 
          </CCol>
          <CCol className="pl-2">
         
            <h4 >Logout</h4>
          </CCol>
        </CRow>
   
      </div> */}


<CHeaderNav style={{float:"right",paddingLeft:"70%"}}>
         <CHeaderNavItem className="px-3 pt-1">
       <CLabel>{cookies.user_username}</CLabel>
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav style={{float:"right"}}>
        <CHeaderNavItem className="px-3">
        <i   className=" fa fa-sign-out" aria-hidden="true"
                ></i> 
          <CHeaderNavLink onClick={()=>Logout()} style={{float:"right"}}>Logout</CHeaderNavLink>
        </CHeaderNavItem>

      </CHeaderNav> 
      {/* <CHeaderNav style={{float:"right"}}>
        <CHeaderNavItem className="px-3" >
        <i   className=" fa fa-sign-out" aria-hidden="true"
                ></i> 
          <CHeaderNavLink to="/dashboard" style={{float:"right"}}>Logout</CHeaderNavLink>
        </CHeaderNavItem>
        <h1 style={{float:"right",marginLeft:"200px"}}>hell</h1>

      </CHeaderNav> */}

     {/* <CHeaderNav className="px-3" style={{float:"right"}}>
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav>  */}

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader>
  )
}

export default TheHeader
