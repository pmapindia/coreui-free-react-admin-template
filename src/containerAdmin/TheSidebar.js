import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CHeaderNavItem,
  CHeaderNavLink,
  CLabel
} from '@coreui/react'
import {useCookies} from 'react-cookie';
import { useHistory } from 'react-router';
import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  let history=useHistory();
  const[cookies,setCookies,removeCookie]=useCookies(['admin']);

  const Logout=()=>{
    //alert(cookies.user_guid);
    removeCookie("user_guid");
    removeCookie("user_type");
   removeCookie("user_name");
   removeCookie("user_mobile_number");
   removeCookie("user_email");
   
   history.push('/adminlogin');
    window.location.reload(true);
  
  }

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full mt-3 mb-2"
          name="logo-negative"
          src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
          marginHeight={2}
          height={90}
          width={150}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={30}
        />
        
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
        
      </CSidebarNav>
      
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
      {/* <CHeaderNavItem > */}
      <hr className="white mt-3 mb-3" style={{ height: "0px",color:'white',width:"100%", borderStyle:"-moz-initial" }} />
         <CHeaderNavLink style={{float:"left",paddingRight:"30%",color:"red", fontSize:"18px", fontWeight:"bold"}}
         onClick={()=>Logout()} 
         className="mb-2"
         align="center">
          
            <i className=" fa fa-power-off" aria-hidden="true"></i> 
            &nbsp;
           Logout
           
           </CHeaderNavLink>
           
       {/* </CHeaderNavItem> */}
       
                
     
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
