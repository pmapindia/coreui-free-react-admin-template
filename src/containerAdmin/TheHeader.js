import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router';
import logos from '../assets/logsvp.webp'

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
  
  return (
    <CHeader withSubheader className='fill' style={{color:"white", }}>
      {/* <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      /> */}
      
      <CHeaderBrand className="mx-auto d-lg-none" to="/" >
        <CIcon name="logo" src={logos} height="80px" alt="Logo"/>
      </CHeaderBrand>
      

<CHeaderNav>
<CHeaderNavItem style={{float:"left",paddingLeft:"0%"}}>
<CToggler 
        inHeader
        className="ml-3 d-md-down-inline"
        
        
        onClick={toggleSidebar}
      />
</CHeaderNavItem>
      
         <CHeaderNavItem style={{float:"right",paddingLeft:"730%"}}>
          
         
         <CLabel style={{fontSize:"15px", fontWeight:"bold"}}>
          {/* <i class="fa fa-user-circle-o"  aria-hidden="true" /> */}
          {cookies.user_name}</CLabel>
         

        </CHeaderNavItem>
      </CHeaderNav>
      

     
    </CHeader>
  )
}

export default TheHeader
