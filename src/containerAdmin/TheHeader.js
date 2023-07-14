import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import logos from '../assets/logo.png'

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
} from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }
  const [cookies, setCookies, removeCookie] = useCookies(['admin']);

  let history = useHistory();
  const Logout = () => {
    
    removeCookie("user_id");
    removeCookie("user_name");
    removeCookie("user_type");
    removeCookie("unique_code");
    removeCookie("user_mobile_no");
    removeCookie("user_email");
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
      <CHeaderBrand className="mx-auto d-lg-none" >
        <CIcon name="logo" src={logos} height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav style={{ float: "right", paddingLeft: "70%" }}>
        <CHeaderNavItem className="px-3 pt-1">
          <CLabel>{cookies.user_name}</CLabel>
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav style={{ float: "right" }}>
        <CHeaderNavItem className="px-3">
          <i className=" fa fa-sign-out" aria-hidden="true"
          ></i>
          <CHeaderNavLink onClick={() => Logout()} style={{ float: "right" }}>Logout</CHeaderNavLink>
        </CHeaderNavItem>

      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
