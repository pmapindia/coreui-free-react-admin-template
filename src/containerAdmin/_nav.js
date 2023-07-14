import React from 'react'
import CIcon from '@coreui/icons-react'
<<<<<<< HEAD
const _nav = [
=======
const _nav =  [
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admindashboard',
<<<<<<< HEAD
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
=======
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
<<<<<<< HEAD
    _tag: 'CSidebarNavDropdown',
    name: 'User',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'User List',
        to: '/userlist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Enquiry Add',
        to: '/enquiryadd',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Enquiry List',
        to: '/enquirylist',
      },

      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Trail Add',
      //   to: '/trailsadd',
      // },

      {
        _tag: 'CSidebarNavItem',
        name: 'Customer Add',
        to: '/addcustomer',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Customer List',
        to: '/customerlist',
      },

      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Renewal Add',
      //   to: '/addrenewal',
      // },

      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Import Excel',
      //   to: '/importcust',
      // },

      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Add On',
      //   to: '/addon',
      // },
    ]
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Billing',
=======
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
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
<<<<<<< HEAD
  //       name: 'Bills & Reciepts',
  //       to: '/addreceiptentry',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tax',
  //       to: '/addtax',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tax Group',
  //       to: '/addtaxgroup',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Discount',
  //       to: '/adddiscount',
  //     },

  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Coupon',
  //       to: '/addcoupon',
  //     },
  //   ]
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Admin',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Branch Add',
        to: '/addnewbranch',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Branch List',
        to: '/branchlist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Trainer',
        to: '/addtrainer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Staffs',
        to: '/addstaff',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Member',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Member',
        to: '/addnewmember',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Member List',
        to: '/memberlist',
      },
    ]
  },

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Inventory',
=======
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
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
<<<<<<< HEAD
  //       name: 'Add Inventory',
  //       to: '/addinventory',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Inventory List',
  //       to: '',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Trash',
  //       to: '',
  //     },
  //   ]
  // },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Packages',
    icon: 'cil-puzzle',
    _children: [
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Cafeteria',
      //   to: '',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Packages',
        to: '/add-new-package',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Packages List',
        to: '/packagelist',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    icon: 'cil-puzzle',
    _children: [
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Cafeteria',
      //   to: '',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Products',
        to: '/add-new-product',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Products List',
        to: '/product-list',
      },
    ]
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Package',
=======
  //       name: 'Route Card List',
  //        to: '/reports/admin-route-card-list',
  //     },
     
      
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Switch Dashboard',
  //   // route: '/switchdashboard/pr-switch-dashboard',
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
<<<<<<< HEAD
  //       name: 'Create Package',
  //       to: '/add-new-package',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Package List',
  //       to: '/packagelist',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Create Add On',
  //       to: '/add-package-addon',
  //     },

  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Category List',
  //       to: '/add-package-category',
  //     },

  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Upgrade',
  //       to: '',
  //     },

  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Create Batch',
  //       to: '/create-batch',
  //     },
  //   ]
  // },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Enquiry Source',
        to: '/enquiry-source',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Enquiry Type',
        to: '/enquiry-type',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Batches',
        to: '/batches',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Payment Types',
        to: '/payment-types',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Tax Setup',
        to: '/tax-setup',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Tax Group Setup',
        to: '/tax-group-setup',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Terms And Conditions',
        to: '/terms-and-conditions',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Category',
        to: '/addcategory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Primary Goal',
        to: '/primary-goal',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Secondary Goal',
        to: '/secondary-goal',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Health Setup',
        to: '/health-setup',
      },
    ]
  },

=======
  //       name: 'Switch Dashboard',
  //      to: '/switchdashboard/admin-switch-dashboard',
  //     },
     
      
  //   ]
  // },
  
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689
]
export default _nav
