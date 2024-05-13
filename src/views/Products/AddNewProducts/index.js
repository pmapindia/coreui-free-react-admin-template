import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  
const AddNewProducts=(props)=>{
    return(
        <>
<div>Add New Products</div>
 <CRow>
 <CCol xs="12" sm="2">
     </CCol>
 <CCol xs="12" sm="8">
   <CCard>
     <CCardHeader>
       Add New Products
       
      
     </CCardHeader>
     <CCardBody>
     <Tabs>
    <TabList>
      <Tab>Data</Tab>
      <Tab>Pricing</Tab>
      <Tab>Specification</Tab>
      <Tab>Images</Tab>
    </TabList>

    <TabPanel>
      {/* <h2>Any content 1</h2> */}
      
     
      
       <CRow>
         <CCol xs="12" sm="6">
           <CFormGroup>
             <CLabel htmlFor="ccmonth">Select Category</CLabel>
             <CSelect custom name="ccmonth" id="ccmonth">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
              
             </CSelect>
           </CFormGroup>
         </CCol>
         <CCol xs="12" sm="6">
           <CFormGroup>
             <CLabel htmlFor="ccmonth">Select SubCategory</CLabel>
             <CSelect custom name="ccmonth" id="ccmonth">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
              
          </CSelect>
           </CFormGroup>
         </CCol>
       </CRow>
       <CRow>
         <CCol xs="12">
           <CFormGroup>
             <CLabel htmlFor="name">Product Name</CLabel>
             <CInput id="name" placeholder="Enter product name" required />
           </CFormGroup>
         </CCol>
       </CRow>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 3</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 4</h2>
    </TabPanel>
  </Tabs>
       
     </CCardBody>
   </CCard>
 </CCol>
 </CRow>
 </>

    )
}
export default AddNewProducts