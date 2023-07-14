import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CInput,
    CForm,
    CSelect,
    CRow,
    CLabel,
    CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';


const CategoryModal = (props) => {

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
    const [disablebutton, setDisableButton] = useState(false);

    const [CategoryAddInput, setCategoryAddInput] = useState({
        categories_name: ""
    });

    const {
        categories_name
    } = CategoryAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setCategoryAddInput({ ...CategoryAddInput, [e.target.name]: e.target.value });
    }

    const OnSubmitCategory = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "CategoryAdd", {
            "categories_name": categories_name
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                //window.location.reload(true);
                //history.push(`/customerlist`);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
    }

    return (
        <CRow>
            <CCol>
                <CLabel style={{ color: "green" }} onClick={() => setPrimary(!primary)}>
                    + Add New
                </CLabel>

                <CModal show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="sm">
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>
                        <CModalTitle className="bgcolor white"><h5>Add New Category</h5></CModalTitle>
                        <CButton className="btn bgcolor white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody>
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CFormGroup>
                                    <CLabel>Category Name</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Category Name'
                                        name='categories_name'
                                        value={categories_name}
                                        onChange={(e) => OnInputChange(e)}
                                    />
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <div className="bgcolor mb-3" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnSubmitCategory(e)} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                </div>
                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )

}
export default CategoryModal;