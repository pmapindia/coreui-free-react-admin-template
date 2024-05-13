import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { post } from 'axios';
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';

const MemKycUpdateModal = ({ show, mem_id }, props) => {
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
    const [disablebutton5, setDisableButton5] = useState(false);

    const [disablebutton6, setDisableButton6] = useState(false);

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [KYCDetailsIn, setKYCDetailsIn] = useState({
        kyc_member_id: props.member_id,
        member_kyc_list: []
    });

    const {
        kyc_member_id,
        member_kyc_list
    } = KYCDetailsIn;

    const [KYCDetails, setKYCDetails] = useState([
        {
            kyc_name: "",
            kyc_number: "",
            kyc_filename: ""
        }
    ]);

    const OnInputKYCChange = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);
        var temp_Inventory_List = [...KYCDetails];

        temp_Inventory_List[index][e.target.name] = e.target.value;
        setKYCDetails(temp_Inventory_List);

    }

    const AddKYCRow = () => {
        var tablearray = [];
        setKYCDetails([...KYCDetails, {
            ["kyc_name"]: "",
            ["kyc_number"]: "",
            ["kyc_filename"]: ""
        }
        ]);
        setDisDoc(false)
    }
    const RemoveKYCRow = (index) => {
        let values = [...KYCDetails];
        values.splice(index, 1);
        setKYCDetails(values);
    }

    //Upload KYC Document
    const [files, setFiles] = useState({
        file: "",
    });

    const setFile = (e, index) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
    }

    const [DisDoc, setDisDoc] = useState(false);
    const SubmitDocument = async (e, index) => {
        e.preventDefault();
        setDisableButton5(true);
        document.getElementById("img_gif_loading_btn5").style.display = "block";
        var documentarray = [];
        var filefor = "CUSTOMER"
        const url = (process.env.REACT_APP_API + `UploadFile?file_for=${filefor}`);

        const formData = new FormData();
        formData.append('body', files.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'unique_code': cookies.unique_code
            },
        };


        return post(url, formData, config).then(response => {
            console.log(response);
            console.log(response.data.file_name);

            console.log(documentarray);
            if (response.data.is_success) {

                toast.success("Successfully Uploaded");
                for (let m = 0; m < KYCDetails.length; m++) {

                    let values = [...KYCDetails];

                    values[m]["kyc_filename"] = response.data.file_name;
                    setKYCDetails(values);
                    setDisDoc(true);
                }
                //setKYCDetails([...KYCDetails, { ["kyc_filename"]: response.data.file_name }]);
                setDisableButton5(false);
                document.getElementById("img_gif_loading_btn5").style.display = "none";
            }
            else {
                toast.error(response.data.msg);
                setDisableButton5(false);
                document.getElementById("img_gif_loading_btn5").style.display = "none";
            }
        });

    }

    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    useEffect(() => {
        if (show11 === true) {
            LoadMemKycDetails();
        }
    }, [show11]);


    const LoadMemKycDetails = async () => {
        var list = {};
        list["member_id"] = mem_id;
        await axios.post(process.env.REACT_APP_API + "MemberkycListByMemberID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setKYCDetailsIn({
                    "kyc_member_id": response.data.member_id
                })

                if (response.data.member_kyc_list !== null) {
                    setKYCDetails(response.data.member_kyc_list);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const OnSubmitKYCDetailsUpdate = async (e) => {
        e.preventDefault();
        setDisableButton5(true);
        document.getElementById("img_gif_loading_btn5").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberKycUpdate", {
            "kyc_member_id": kyc_member_id,
            "member_kyc_list": KYCDetails
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton5(false);
                document.getElementById("img_gif_loading_btn5").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton5(false);
                document.getElementById("img_gif_loading_btn5").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton5(false);
                document.getElementById("img_gif_loading_btn5").style.display = "none";
            })
    }


    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="xl"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Update KYC Details</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <CForm onSubmit={(e) => OnSubmitKYCDetailsUpdate(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="12" ms="12" lg="12">
                                                    {KYCDetails.map((kyc, index) => (
                                                        <CRow key={index}>
                                                            <CCol xs="12" sm="2" md="2" lg="2">
                                                                <CFormGroup>
                                                                    <CLabel>KYC Name</CLabel>
                                                                    <CInput type='text' placeholder='Enter KYC Name'
                                                                        name='kyc_name'
                                                                        value={kyc.kyc_name}
                                                                        onChange={(e) => OnInputKYCChange(e, index)}
                                                                    />
                                                                </CFormGroup>
                                                            </CCol>

                                                            <CCol xs="12" sm="2" md="2" lg="2">
                                                                <CFormGroup>
                                                                    <CLabel>KYC Number</CLabel>
                                                                    <CInput type='text' placeholder='Enter KYC Number'
                                                                        name='kyc_number'
                                                                        value={kyc.kyc_number}
                                                                        onChange={(e) => OnInputKYCChange(e, index)}
                                                                    />
                                                                </CFormGroup>
                                                            </CCol>

                                                            <CCol xs="12" sm="3" md="3" lg="3">
                                                                <CFormGroup>
                                                                    <CLabel>  Select Document</CLabel>
                                                                    <CInput type="file" name='kyc_filename'
                                                                        onChange={(e) => setFile(e, index)} />
                                                                </CFormGroup>
                                                            </CCol>

                                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                                <div className="bgcolor mt-3" style={{ borderRadius: "5px", width: "80%", padding: "0px", margin: "0px" }}>
                                                                    <CButton type="submit" onClick={(e) => SubmitDocument(e, index)} disabled={disablebutton5} style={{ color: "white", fontWeight: "", fontSize: "" }} >Upload Document</CButton>
                                                                    <img id="img_gif_loading_btn5" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                                </div>

                                                            </CCol>

                                                            {DisDoc ?
                                                                <CCol xs="12" sm="1" md="1" lg="1" className="mt-4">
                                                                    <span className='mt-4'><img src={process.env.PUBLIC_URL + '/avatars/image_tick.png'} style={{ width: "30px", paddingRight: "2px" }} /></span>
                                                                </CCol>
                                                                : null
                                                            }
                                                            <CCol xs="12" sm="1" md="1" lg="1" className="mt-1">
                                                                <CButton
                                                                    onClick={() => RemoveKYCRow(index)}
                                                                    className="btn mt-3">
                                                                    <i className="fa fa-close" aria-hidden="true"></i>
                                                                </CButton>
                                                            </CCol>
                                                        </CRow>
                                                    ))}
                                                </CCol>
                                                <CCol xs="12" sm="5" ms="5" lg="5"></CCol>
                                                <CCol xs="12" sm="2" ms="2" lg="2">
                                                    <CButton className="bgcolor white " style={{ borderRadius: "50px" }}
                                                        onClick={() => AddKYCRow()}
                                                    >
                                                        +</CButton>
                                                </CCol>
                                                <CCol xs="12" sm="5" ms="5" lg="5"></CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4"></CCol>
                                                <CCol xs="12" sm="4" md="4" lg="4">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton6} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn6" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default MemKycUpdateModal;