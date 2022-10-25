import React from 'react'
import CIcon from '@coreui/icons-react'
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admindashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
   name: 'Add Agent',
   to: '/add-new-agent',
   icon: "cil-puzzle",
 },
 {
  _tag: 'CSidebarNavItem',
 name: 'Agent List',
 to: 'agent-list',
 icon: 'cil-puzzle',
},

{
  _tag: 'CSidebarNavItem',
 name: 'Payment to Angent',
  to: '/make-payment-list',
 icon: 'cil-puzzle',
},

{
  _tag: 'CSidebarNavItem',
 name: 'Add Project',
 to: '/add-new-project',
 icon: 'cil-puzzle',
},

{
  _tag: 'CSidebarNavItem',
 name: 'Project List',
 to: '/project-list',
 icon: 'cil-puzzle',
},

{
  _tag: 'CSidebarNavDropdown',
  name: 'Settings',
  route: '/',
  icon: 'cil-puzzle',
  _children: [
   
    {
      _tag: 'CSidebarNavItem',
      name: 'Users List',
       to: '/users-list',
    },
   
    {
      _tag: 'CSidebarNavItem',
      name: 'Banner Images',
       to: '/banner-image-add',
    },
    
  ]
},

  //   // _children: [
  //   //   {
  //   //     _tag: 'CSidebarNavItem',
  //   //     name: 'Process List',
  //   //     to: '/production/process-list',
  //   //   },
  //   //   {
  //   //     _tag: 'CSidebarNavItem',
  //   //     name: 'Add New Process',
  //   //     to: '/production/add-new-process',
  //   //   },

     
  //   // ]
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Mail Configuration Settings',
  //   route: '/mail-configuration-settings',
  //   icon: 'cil-puzzle',
  //   _children: [
     
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Mail  Configuration Settings List',
  //        to: '/mail-configuration-settings/mail-configuration-settings-list',
  //     },
     
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Chart',
  //        to: '/graph',
  //     },
      
  //   ]
  // },

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Terms And Conditions',
  //   route: '/terms-and-conditions',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Terms And Conditions Add',
  //       to: '/terms-and-conditions/terms-and-conditions-add',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Terms And Conditions List',
  //   to: '/terms-and-conditions/terms-and-conditions-list',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Terms And Conditions Details Latest',
  //   to: '/terms-and-conditions/terms-and-conditions-details-latest',
  // },
  
  // ]
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Route Card',
  //   // route: '/reports/production-route-card-list',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Route Card List',
  //        to: '/reports/admin-route-card-list',
  //     },
     
      
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Switch Dashboard',
  //   // route: '/switchdashboard/pr-switch-dashboard',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Switch Dashboard',
  //      to: '/switchdashboard/admin-switch-dashboard',
  //     },
     
      
  //   ]
  // },
  
]
export default _nav
