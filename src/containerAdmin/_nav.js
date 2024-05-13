import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex, cilCheckCircle, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin,
  cifBr, cilChatBubble, cifFr, cifIn, cilCommentBubble, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale,
} from '@coreui/icons'
import * as icon from '@coreui/icons';
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admindashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'danger',
      text: 'NEW',
    }
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Enquiries',
    icon: 'cil-envelope-letter',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: ' Add New Enquiry',
        to: '/enquiryadd',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Enquiry List',
        to: '/enquirylist',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Trials',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: ' Add New Trial',
        to: '/trailsadd',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Trial List',
        to: '/trailslist',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Members',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Member',
        to: '/addnewmember',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Members List',
        to: '/memberlist',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Member Import Excel',
      //   to: '/memberimportexcel',
      // },
    ]
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Customers',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Customer',
        to: '/addcustomer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Customers List',
        to: '/customerlist',
      },
    ]
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Members Attendance',
    icon: 'cilTask',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Mark Attendance',
        to: '/member-attendance',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Members Attendance Report',
        to: '/member-attendance-list',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users Attendance',
    icon: 'cilCheckCircle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Mark Attendance',
        to: '/user-attendance',
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'Users Attendance Report',
        to: '/user-attendance-list',
      }
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Packages',
    icon: 'cil-inbox',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Package',
        to: '/add-new-package',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Packages List',
        to: '/packagelist',
      },
    ]
  },

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Products',
  //   icon: 'cil-layers',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Add New Product',
  //       to: '/add-new-product',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Products List',
  //       to: '/product-list',
  //     },
  //   ]
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    icon: 'cil-list-rich',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Sales Report',
        to: '/sales-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Postpaid Bill Report',
        to: '/postpaid-bill-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Balance Payment List',
        to: '/balance-payment-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Renewal List',
        to: '/renewal-list',
      },
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Admin',
    icon: 'cil-user-follow',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users List',
        to: '/userlist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Staffs List',
        to: '/stafflist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Trainers List',
        to: '/trainerlist',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Branch',
        to: '/addnewbranch',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Branch List',
        to: '/branchlist',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Trainer',
      //   to: '/addtrainer',
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Staffs',
      //   to: '/addstaff',
      // },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Expenses',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Expense',
        to: '/expenses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Expense List',
        to: '/expenses-list',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Workout Setup',
    icon: 'cil-map',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Workout Setup',
        to: '/workoutsetup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Workout Setup List',
        to: '/workoutsetup-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Primary Goal Workout Mapping',
        to: '/prim-goal-workout-map',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Secondary Goal Workout Mapping',
        to: '/sec-goal-workout-map',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Category',
        to: '/addcategory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'General Settings',
        to: '/general-etting',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Mail Config',
        to: '/mail-configuration-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'WhatsApp Config',
        to: '/whatsapp-configuration-add',
      },
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
        name: 'Payment Types',
        to: '/payment-types',
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
      {
        _tag: 'CSidebarNavItem',
        name: 'Body Measurement Setup',
        to: '/body-measurement-setup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Terms And Conditions',
        to: '/terms-and-conditions',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Privacy Policy',
      //   to: '/privacy-policy',
      // },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Branch Inventory',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Supplier',
        to: '/supplier',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Supplier List',
        to: '/supplier-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Branch Inventory',
        to: '/branch-inventory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Branch Inventory List',
        to: '/branch-inventory-list',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Roles',
    icon: 'cil-check',
    _children: [
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Add New Role Feature Name',
      //   to: '/role-feature-name',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add New Role ',
        to: '/new-role',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Role List ',
        to: '/role-list',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Marketing',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Bulk WhatsApp',
        to: '/bulkwhatsapp',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Bulk Emails',
        to: '/bulkemails',
      },
    ]
  },


  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Mail Configuration Settings',
  //   icon: 'cil-envelope-letter',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Mail Configuration Settings List',
  //       to: '/mail-configuration-list',
  //     },
  //   ]
  // },

  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'WhatsApp Configuration',
  //   icon: 'cil-check-circle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'WhatsApp Configuration Add',
  //       to: '/whatsapp-configuration-add',
  //     },
  //   ]
  // },
]
export default _nav
