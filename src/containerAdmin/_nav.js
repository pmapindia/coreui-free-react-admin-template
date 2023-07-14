import React from 'react'
import CIcon from '@coreui/icons-react'
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admindashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
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
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
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
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
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
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
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

]
export default _nav
