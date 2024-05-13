import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
const CancelSale = (props) => {

    const [Show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow(true);
    }
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [disablebutton60, setDisableButton60] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();


    const OnClickConfirm = async (e) => {
        e.preventDefault();
        setDisableButton60(true);
        document.getElementById("img_gif_loading_btn60").style.display = "block";

        await axios.post(process.env.REACT_APP_API + "SaleCancel", {
            "sale_id": props.sale_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton60(false);
                document.getElementById("img_gif_loading_btn60").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton60(false);
                document.getElementById("img_gif_loading_btn60").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton60(false);
                document.getElementById("img_gif_loading_btn60").style.display = "none";
            })
    }

    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm white' style={{ fontSize: "13px", alignItems: "", backgroundColor: "red" }}
                    onClick={(e) => handleShow(e)}>
                    {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                    Cancel
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Cancel Sale</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>
                        <h5 style={{ color: "red" }}>Are you sure want cancel Trans Id - {props.trans_id}</h5>
                        <CRow className='mt-4'>
                            <CCol xs="12" sm="4" md="4" lg="4"></CCol>

                            <CCol xs="12" sm="4" md="4" lg="4">
                                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnClickConfirm(e)} disabled={disablebutton60} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Confirm</CButton>
                                    <img id="img_gif_loading_btn60" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                </div>
                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                {/* <CButton onClick={(e) => OnClickConfirm(e)} className='btn btn-sm bgcolor white width100'>Confirm</CButton> */}
                            </CCol>

                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default CancelSale;