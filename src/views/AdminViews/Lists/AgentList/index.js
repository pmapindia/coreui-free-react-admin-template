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
const AgentList = () => {
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h1 className='fontweight' style={{color:"black"}}>New Agent List</h1>
    <div className='mt-8'>
    <table class="table rs-table-bordered " >
        <tbody>
            <tr className='fontweight bgblue' style={{color:"black", fontSize:"18px"}} >
                <td>Sl No</td>
                <td>Agent Name</td>
                <td>Mobile Number</td>
                <td>Address</td>
                <td>E - Mail</td>
                <td>Details</td>
            </tr>
                
            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>1</td>
                <td>Chandra Shekhar</td>
                <td>+91 - 9900775523</td>
                <td>#91, 2nd Cross, Siddhartha Layout, Mysuru-572100 </td>
                <td>Chandru123@gmail.com</td>
                <td>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>2</td>
                <td>Anitha</td>
                <td>+91 - 8800776520</td>
                <td>#25, 4th Cross, Alanahalli Layout, Mysuru-572107 </td>
                <td>anitasweetie@hotmail.com</td>
                <td >
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px",}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>3</td>
                <td>Harish Kumar</td>
                <td>+91 - 8870766623</td>
                <td>#60, 1st Cross, 1st Main, Vijay Nagar IVth Stage, Mysuru-572110 </td>
                <td>harish_kumar45@yahoo.com</td>
                <td>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 fontweight bgclr" style={{paddingLeft:"2px"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>4</td>
                <td>Manoj Kumar</td>
                <td>+91 - 9980775113</td>
                <td>#35, 4th Cross, Hebbal, Mysuru-572111</td>
                <td>manusweetboy@redif.com</td>
                <td>
                <Link to={`/agent-details`}
                className="btn bgblue white width100 bgclr fontweight" style={{paddingLeft:"2px"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>5</td>
                <td>Ananth Murthy</td>
                <td>+91 - 9880774023</td>
                <td>#91, 7th Cross, BEML Nagar, Mysuru-572123 </td>
                <td>ananth458@gmail.com</td>
                <td>
                <Link to={`/agent-details`}
                className="btn bgblue bgclr white width100 fontweight" style={{paddingLeft:"2px"}}>
                    Details
                </Link>
                </td>
            </tr>

            <tr className='fontweight' style={{color:"black", fontSize:"15px"}} >
                <td>6</td>
                <td>Hemanth Chandra</td>
                <td>+91 - 9440775520</td>
                <td>#91, 10th Cross, Vinay Margh, Siddhartha Layout, Mysuru-572115 </td>
                <td>hemanth10kumar@yahoo.com</td>
                <td>
                <Link to={`/agent-details`}
                className="btn bgblue bgclr white width100 fontweight" style={{paddingLeft:"2px"}}>
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
export default AgentList;