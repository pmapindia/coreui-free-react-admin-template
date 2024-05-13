import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
 
    CCardHeader,
    CCol,
    CFormGroup,
    CLabel,
    CInput,
   CSelect,
    CRow,
   
  } from '@coreui/react'
const AllProducts=(props)=>{
    return(
        <>
<div>All Products</div>
   
   
     <CRow>
     <CCol xs="12" sm="1">
         </CCol>
     <CCol xs="12" sm="10">
       <CCard>
         <CCardHeader>
         All Products
           
          
         </CCardHeader>
         <CCardBody>
         <CRow>
         <CCol xs="12" sm="3">
           </CCol>
         <CCol xs="12" sm="9" style={{marginBottom:"5px",paddingRight:"0px !important"}}>
        
         <CButton type="submit" color="primary" className="mt-0 mr-1 mb-2" >Add New Product</CButton>
         <CButton type="submit" color="primary" className="mt-0 mr-1 mb-2" >Delete Product</CButton>
         <CButton type="submit" color="primary" className="mt-0 mr-1 mb-2" >Print</CButton>

         <CButton type="submit" color="primary" className="mt-0 mr-1 mb-2" >Import</CButton>
         <CButton type="submit" color="primary" className="mt-0 mr-1 mb-2" >Export</CButton>
         <CButton type="submit" color="primary" className="mt-0 mb-2" >PDF</CButton>

         </CCol> 
         </CRow>
         <CRow>
         <CCol xs="12" sm="3">
           </CCol>
         <CCol xs="12" sm="9" style={{marginBottom:"5px",paddingRight:"0px !important"}}>
         <CRow>
         <CCol xs="12" sm="4">
         <CFormGroup>
             <CLabel htmlFor="product_status">Product Status</CLabel>
             <CSelect custom  id="product_status"  name="product_status"
             >
               <option value="Active">Active</option>
               <option value="InActive">InActive</option>
               <option value="Blocked">Blocked</option>
               
             </CSelect>
           </CFormGroup>
           </CCol>
           <CCol xs="12" sm="4">
           <CFormGroup>
             <CLabel htmlFor="category">Category</CLabel>
             <CSelect custom  id="category"  name="category"
           >
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68060">Books</option>
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68061">2</option>
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68062">3</option>
               
               
             </CSelect>
           </CFormGroup>
           </CCol>
           <CCol xs="12" sm="4">
           <CFormGroup>
             <CLabel htmlFor="sub_cat_category_guid">Select Category</CLabel>
             <CSelect custom  id="sub_cat_category_guid"  name="sub_cat_category_guid"
            >
               <option value="Less Than 5">Less Than 5</option>
               <option value="Out Of Stock">Out Of Stock</option>
               <option value="5 Or More">5 Or More</option>
               
             </CSelect>
           </CFormGroup>
           </CCol>
           </CRow>

         </CCol> 
         </CRow>
         <table class="table table-striped">
      <thead>
        <tr>
          <th>SLNo</th>
          <th>DateTime</th>
          <th>Product Image</th>
          <th> Name</th>
          <th>Units in Stock</th>
          <th>Selling Price</th>
          <th>Discount%</th>


          <th>Edit</th>
          <th>Delete</th>
    
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>     <CButton type="submit" color="primary" className="mt-0" >Edit</CButton>
    </td>
          <td>     <CButton type="submit" color="primary" className="mt-0" >Delete</CButton>
    </td>
        </tr>
     
       
      </tbody>
    </table>
          
          
         </CCardBody>
       </CCard>
     </CCol>
     </CRow>
     </>
    )
}
export default AllProducts