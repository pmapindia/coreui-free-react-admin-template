import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody, } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import axios from 'axios';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { CButtonGroup, CCardFooter, CProgress, } from '@coreui/react-pro';
import { CTable, CTableRow,CAvatar, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from '@coreui/react-pro';
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import {
    cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin,
    cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/pmapg.png'

const MemberList = (props) => {
    const tableExample = [
        {
          avatar: { src: '', status: 'success' },
          user: {
            name: 'Yiorgos Avraamu',
            new: true,
            registered: 'Jan 1, 2021',
          },
          country: { name: 'USA', flag: cifUs },
          usage: {
            value: 50,
            period: 'Jun 11, 2021 - Jul 10, 2021',
            color: 'success',
          },
          payment: { name: 'Mastercard', icon: cibCcMastercard },
          activity: '10 sec ago',
        },
        // {
        //   avatar: { src: avatar2, status: 'danger' },
        //   user: {
        //     name: 'Avram Tarasios',
        //     new: false,
        //     registered: 'Jan 1, 2021',
        //   },
        //   country: { name: 'Brazil', flag: cifBr },
        //   usage: {
        //     value: 22,
        //     period: 'Jun 11, 2021 - Jul 10, 2021',
        //     color: 'info',
        //   },
        //   payment: { name: 'Visa', icon: cibCcVisa },
        //   activity: '5 minutes ago',
        // },
        // {
        //   avatar: { src: avatar3, status: 'warning' },
        //   user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
        //   country: { name: 'India', flag: cifIn },
        //   usage: {
        //     value: 74,
        //     period: 'Jun 11, 2021 - Jul 10, 2021',
        //     color: 'warning',
        //   },
        //   payment: { name: 'Stripe', icon: cibCcStripe },
        //   activity: '1 hour ago',
        // },
        // {
        //   avatar: { src: avatar4, status: 'secondary' },
        //   user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
        //   country: { name: 'France', flag: cifFr },
        //   usage: {
        //     value: 98,
        //     period: 'Jun 11, 2021 - Jul 10, 2021',
        //     color: 'danger',
        //   },
        //   payment: { name: 'PayPal', icon: cibCcPaypal },
        //   activity: 'Last month',
        // },
        // {
        //   avatar: { src: avatar5, status: 'success' },
        //   user: {
        //     name: 'Agapetus Tadeáš',
        //     new: true,
        //     registered: 'Jan 1, 2021',
        //   },
        //   country: { name: 'Spain', flag: cifEs },
        //   usage: {
        //     value: 22,
        //     period: 'Jun 11, 2021 - Jul 10, 2021',
        //     color: 'primary',
        //   },
        //   payment: { name: 'Google Wallet', icon: cibCcApplePay },
        //   activity: 'Last week',
        // },
        // {
        //   avatar: { src: avatar6, status: 'danger' },
        //   user: {
        //     name: 'Friderik Dávid',
        //     new: true,
        //     registered: 'Jan 1, 2021',
        //   },
        //   country: { name: 'Poland', flag: cifPl },
        //   usage: {
        //     value: 43,
        //     period: 'Jun 11, 2021 - Jul 10, 2021',
        //     color: 'success',
        //   },
        //   payment: { name: 'Amex', icon: cibCcAmex },
        //   activity: 'Last week',
        // },
      ]
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                <CRow>
                    <CCol xs="12" sm="12" ms="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <CTable align="middle" className="mb-0 border" hover responsive>
                                    <CTableHead color="light">
                                        <CTableRow>
                                            <CTableHeaderCell className="text-center">
                                            </CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">
                                                <i class="fa fa-user" aria-hidden="true"></i>
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>Member</CTableHeaderCell>
                                            <CTableHeaderCell >Package</CTableHeaderCell>
                                            <CTableHeaderCell>Expairy Date</CTableHeaderCell>
                                            <CTableHeaderCell >Last Login</CTableHeaderCell>
                                            <CTableHeaderCell>Details</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {tableExample.map((item, index) => (
                                            <CTableRow v-for="item in tableItems" key={index}>
                                                <CTableDataCell className="text-center">
                                                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div>{item.user.name}</div>
                                                    <div className="small text-medium-emphasis">
                                                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                                        {item.user.registered}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="clearfix">
                                                        <div className="float-start">
                                                            <strong>{item.usage.value}%</strong>
                                                        </div>
                                                        <div className="float-end">
                                                            <small className="text-medium-emphasis">{item.usage.period}</small>
                                                        </div>
                                                    </div>
                                                    <CProgress thin color={item.usage.color} value={item.usage.value} />
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CIcon size="xl" icon={item.payment.icon} />
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="small text-medium-emphasis">Last login</div>
                                                    <strong>{item.activity}</strong>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}
export default MemberList;