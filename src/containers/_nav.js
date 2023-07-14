import React from 'react'
import CIcon from '@coreui/icons-react'
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Process',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Process',
        to: '/production/add-new-process',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Process List',
        to: '/production/process-list',
      },
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Process Category',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Process Category',
        to: '/process-category',
      },
     
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Testing Process',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Testing Process',
        to: '/add-new-testing-process',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Testing Process List',
        to: '/testing-process-list',
      },
     
      
    ]
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Setup Testing Process',
  //   route: '/production',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Add New Testing Process',
  //       to: '/add-new-testing-process',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Testing Process List',
  //       to: '/testing-process-list',
  //     },
     
      
  //   ]
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Process Steps',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Process Step',
        to: '/add-new-process-step',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Process Step List',
        to: '/process-step-list',
      },
    

      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Control Plan',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Control Plan',
        to: '/control-plan-list/add-new-control-plan',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Control Plan List',
        to: '/control-plan-list',
      },
    

      
    ]
  },

  

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Paints Control Plan',
    route: '/paint',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Paint Setup',
        to: '/paint/paint-setup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Paint Setup List',
        to: '/paint/paint-setup-list',
      },
   ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup Process Flow',
    route: '/production',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Process Flow',
        to: '/process-flow-list/add-new-process-flow',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Process Flow List',
        to: '/process-flow-list',
      },
      
    

      
    ]
  },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Production',
//     route: '/production',
//     icon: 'cil-puzzle',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Process List',
//         to: '/production/process-list',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Add New Process',
//         to: '/production/add-new-process',
//       },

//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Process Category',
//         to: '/process-category',
//       },


//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Process Step List',
//         to: '/process-step-list',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Add New Process Step',
//         to: '/add-new-process-step',
//       },





//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Testing Process List',
//         to: '/testing-process-list',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Add New Testing Process',
//         to: '/add-new-testing-process',
//       },
// {
//   _tag: 'CSidebarNavItem',
//   name: 'Process Flow List',
//   to: '/process-flow-list',
// },
// {
//   _tag: 'CSidebarNavItem',
//   name: 'Add New Process Flow',
//   to: '/process-flow-list/add-new-process-flow',
// },
// {
//   _tag: 'CSidebarNavItem',
//   name: 'Create Route Card',
//   to: '/create-route-card',
// },

//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Add New Control Plan',
//         to: '/control-plan-list/add-new-control-plan',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Control Plan List',
//         to: '/control-plan-list',
//       },

//     ]
//   },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Customers',
    route: '/customers',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Customer',
        to: '/customers/add-new-customer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Customer List',
        to: '/customers/customer-list',
      },
    ]},
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Quotation',
      route: '/customers',
      icon: 'cil-puzzle',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Add New Quotation',
          to: '/customers/add-new-quotation',
        },
         {
        _tag: 'CSidebarNavItem',
        name: 'Quotation List',
        to: '/customers/quotation-list',
      },
     
    ]
  },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Setup Part Number',
      route: '/customers',
      icon: 'cil-puzzle',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Add Customer Part Number',
          to: '/add-new-customer-part-number',
        },
      
{
          _tag: 'CSidebarNavItem',
          name: 'Customer Part Number List',
          to: '/customer-part-number-list',
        },
       
    ]
  },

//Hani
{
  _tag: 'CSidebarNavDropdown',
  name: 'Calibration',
  route: '/calibration',
 icon: 'cil-puzzle',
 _children: [
   {
     _tag: 'CSidebarNavItem',
     name: 'Create New Calibration',
     to: '/calibration/create-new-calibration',
   },
   {
     _tag:'CSidebarNavItem',
     name:'Calibration List',
     to:'/calibration/calibration-list',
   },
   {
     _tag:'CSidebarNavItem',
     name:'Calibration Instrument Details',
     to:'/calibration/calibration-instrument-details',
   },
  
   // {
   //   _tag:'CSidebarNavItem',
   //   name:'Upcoming Calibration Due List',
   //   to:'/calibration/upcoming-calibration-due-list',
   // },
   
 ]
},
{
 _tag: 'CSidebarNavDropdown',
 name: 'Machine',
 route: '/machine',
 icon: 'cil-puzzle',
 _children: [
   {
     _tag: 'CSidebarNavItem',
     name: 'Add New Machine',
     to: '/machine/add-new-machine',
   },
   {
     _tag: 'CSidebarNavItem',
     name: 'Machine List',
     to: '/machine/machine-list',
   },
  //  {
  //    _tag: 'CSidebarNavItem',
  //    name: 'Update Machine',
  //    to: '/machine/update-machine',
  //  },
   
 ]
},

{
  _tag: 'CSidebarNavDropdown',
  name: 'Instrument',
  route: '/instrument',
  icon: 'cil-puzzle',
  _children: [
  
    {
      _tag: 'CSidebarNavItem',
      name: 'Instrument Add',
      to: '/instrument/instrument-add',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Instrument List',
      to: '/instrument/instrument-list',
    },
    
  ]
 },







{
_tag: 'CSidebarNavDropdown',
name: 'Item',
route: '/item',
icon: 'cil-puzzle',
_children: [
{
 _tag: 'CSidebarNavItem',
 name: 'Create New Item',
 to: '/item/create-new-item',
},
{
_tag: 'CSidebarNavItem',
name: 'Item List',
to: '/item/item-list',
},
// {
// _tag: 'CSidebarNavItem',
// name: 'Update Item',
// to: '/item/update-item',
// },
{
  _tag: 'CSidebarNavItem',
  name: 'Tax Group',
  to: '/tax/tax-group',
},
{
  _tag:'CSidebarNavItem',
  name:'Taxes',
  to:'/tax/tax-name',
},




],
},








  {
    _tag: 'CSidebarNavDropdown',
    name: 'Branches/Units',
    route: '/branches',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Branch List',
        to: '/branches/branch-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Branch',
        to: '/branches/add-new-branch',
      },
    ]
  },
 
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Suppliers',
    route: '/suppliers',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Suppliers',
        to: '/suppliers/add-new-suppliers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Suppliers List',
        to: '/suppliers/suppliers-list',
      },
     
      
    ]
  },



  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Stocks',
  //   route: '/settings1',
  //   icon: 'cil-puzzle',
  //   _children: [
     
  //   ]
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Items',
    route: '/items',
      icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Categories',
        to: '/items/categories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Units Of Measurement',
        to: '/items/units-of-measurement',
      }, 

      {
        _tag: 'CSidebarNavItem',
        name: 'CheckList Parameter',
        to: '/checklist/checklist-parameter',
      }, {
        _tag: 'CSidebarNavItem',
        name: 'Contract CheckList',
        to: '/checklist/contract-checklist',
      },
      
    ]
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Calibration',
  //   route: '/settings1',
  //   icon: 'cil-puzzle',
  //   _children: [
     
      
  //   ]
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    route: '/settings',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'General Settings',
        to: '/settings/general-settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Basic Settings',
        to: '/basic-settings',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'All Users',
      //   to: '/settings/all-users',
      // },
      
    ]
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Switch Dashboard',
    route: '/switchdashboard/switch-dashboard',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Switch Dashboard',
        to: '/switchdashboard/switch-dashboard',
      },
     
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Route Card',
    route: '/reports/route-card-list',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Route Card List',
        to: '/reports/route-card-list',
      },

     
      
    ]
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Create Purchase Indent',
    route: '',
    icon: 'cil-puzzle',
    _children: [
   ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Contract Review CheckList',
    route: '',
    icon: 'cil-puzzle',
    _children: [
   ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'COC List',
        // to: '/basic-settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'FAI List',
        // to: '/basic-settings',
      },
   ]
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Training List as Faculty',
    route: '',
    icon: 'cil-puzzle',
    _children: [
   ]
  },

  // {
  //   _tag:'CSidebarNavDropdown',
  //   name:'Login',
  //   route:'/hanilogin',
  //  icon:'cil-puzzle',
  //  _children:[
  //    {
  //      _tag:'CSidebarNavItem',
  //      name:'Hani Login',
  //      to:'/hanilogin/hani-login'
  //    }
  //  ]
  // },

]


export default _nav
