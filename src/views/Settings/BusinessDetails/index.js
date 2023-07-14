import React ,{ useState }from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
  
    CCardHeader,
    CCol,
   
    CForm,
    CFormGroup,
   
    CInput,
    CInputFile,
   
    CLabel,
    CSelect,
   
    CRow,
    
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  
const BusinessDetails=(props)=>{
  let history = useHistory();
  //here we are assigning initial value using usestate
    const [user, setUser] = useState({
      sub_cat_category_guid: "",
      sub_cat_name: "",
     
    });
    const { sub_cat_category_guid, sub_cat_name} = user;
   const onInputChange = e => {
    console.log(e.target.value);
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  //creating function to send the data
    const onSubmit = async e => {
      alert("a");
      e.preventDefault();
      const result=await axios.post("https://localhost:44323/api/uploadsubcategories", user);
      console.log(result);
      // history.push("/");
    };
   
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onChangePicture = e => {
      if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        setPicture(e.target.files[0]);
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
         
          
        });
        reader.readAsDataURL(e.target.files[0]);

      }
    };


    return(
        <>
<div>Business Details</div>
 <CRow>
 <CCol xs="12" sm="2">
     </CCol>
 <CCol xs="12" sm="8">
   <CCard>
     <CCardHeader>
       Business Details
       
      
     </CCardHeader>
     <CCardBody>
      
     <CForm onSubmit={e => onSubmit(e)}>
       <CRow>
         <CCol xs="12">
         <CFormGroup>
                  <CLabel  htmlFor="file-input">Upload Logo</CLabel>
                 
                    <CInputFile id="file-input" 
                    //  name="sub_cat_category_guid"
                    //  value={sub_cat_category_guid}
                    //   onChange={e => onInputChange(e)}
                     onChange={onChangePicture}/>
                
                </CFormGroup>
                <CFormGroup>
                <img className="playerProfilePic_home_tile" src={imgData} style={{width:"200px",height:"200px"}}/>

                </CFormGroup>
         {/* <CFormGroup>

             <CLabel htmlFor="name">Category Image</CLabel>
             <CInput id="name" placeholder="Enter subcategory name" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup> */}
         </CCol>
       
       </CRow>
       <CRow>
 <CCol xs="12" sm="6">
 <CFormGroup>
             <CLabel htmlFor="name">Organization Name</CLabel>
             <CInput id="name" placeholder="Enter organization name" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
     </CCol>
     <CCol xs="12" sm="6">
     <CFormGroup>
             <CLabel htmlFor="name">GSTIN</CLabel>
             <CInput id="name" placeholder="Enter GSTIN" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
     </CCol>
     </CRow>
     <CRow>
 <CCol xs="12" sm="6">
 <CFormGroup>
             <CLabel htmlFor="name">CIN</CLabel>
             <CInput id="name" placeholder="Enter CIN" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
     </CCol>
     <CCol xs="12" sm="6">
     <CFormGroup>
             <CLabel htmlFor="name">Address</CLabel>
             <CInput id="name" placeholder="Enter address" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
     </CCol>
     </CRow>
     <CRow>
 <CCol xs="12" sm="6">
 <CFormGroup>
             <CLabel htmlFor="name">Pincode</CLabel>
             <CInput id="name" placeholder="Enter pincode" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
     </CCol>
     <CCol xs="12" sm="6">
     <CFormGroup>
             <CLabel htmlFor="category">State</CLabel>
             <CSelect custom  id="category"  name="category"
           >
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68060">karnataka</option>
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68061">kerala</option>
               <option value="823afbe4-08b9-48a7-83c0-a5c238a68062">3</option>
               
               
             </CSelect>
           </CFormGroup>
     </CCol>
     </CRow>
       <CRow>
         <CCol xs="12" sm="6">
           <CFormGroup>
             <CLabel htmlFor="name">City</CLabel>
             <CInput id="name" placeholder="Enter city name" 
             name="sub_cat_name"
             value={sub_cat_name}
             onChange={e => onInputChange(e)} required />
           </CFormGroup>
         </CCol>
       </CRow>
       <CButton type="submit" color="primary" className="mt-3" style={{width:"500px",marginLeft:"70px",marginRight:"70px"}} >Submit</CButton>
       </CForm>
     </CCardBody>
   </CCard>
 </CCol>
 </CRow>
 </>

    )
}
export default BusinessDetails