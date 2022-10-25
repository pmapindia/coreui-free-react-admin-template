import React, { useEffect, useState } from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie';
import Select from 'react-select';
import axios from "axios";
import {CButton,CCardCCardBody,CCardHeader,CCol,CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CInput,CForm,CSelect,
  CRow,CLabel,CFormGroup} from '@coreui/react'
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';
const ProjectsList = () => {
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h1 className='fontweight' style={{color:"black"}}>project List</h1>
    <div className='mt-8'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight bgblue' style={{color:"black", fontSize:"18px"}} >
                <td>Sl No</td>
                <td>Project Name</td>
                <td align='center'>Price</td>
                <td align='center'>Rate/Sqft</td>
                <td align='center'>Location</td>
                <td align='center'>Details</td>
            </tr>
                
            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>1</td>
                <td>Sping Medows</td>
                <td align='center'>35 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 3200.00</td>
                <td align='center'>Siddhartha Layout</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>2</td>
                <td>Vinayaka Enclave</td>
                <td align='center'>38 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 3500.00</td>
                <td align='center'>KHB Layout</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>3</td>
                <td>Yash Serenity</td>
                <td align='center'>25 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 3000.00</td>
                <td align='center'>Ilwala - KR Nagar Road</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>4</td>
                <td>Brigade Horizon</td>
                <td align='center'>45 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 4200.00</td>
                <td align='center'>Mysore - Malavalli Road</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 bgclr fontweight" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>5</td>
                <td>Sky Blue Orchids</td>
                <td align='center'>42 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 4000.00</td>
                <td align='center'>Mysore - Bengaluru Road</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue bgclr white width100 fontweight" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>6</td>
                <td>Skyline Srusti</td>
                <td align='center'>48 Lakhs</td>
                <td align='center'><i class="fa fa-inr" aria-hidden="true"></i> 3600.00</td>
                <td align='center'>Mysore - Ooty Road</td>
                <td align='center'>
                <Link to={`/agent-details`}
                className="btn bgblue bgclr white width100 fontweight" style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                    Details
                </Link>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</div>
</>
)
}
export default ProjectsList;