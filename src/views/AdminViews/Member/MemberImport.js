import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea } from '@coreui/react';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../../scss/_custom.scss';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

import Memberecxelimportsuccessmodal from './Memberecxelimportsuccessmodal';
const MemberImport = (props) => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);


    // const[documentnames,setDocumentnames]=useState({
    //   document_name:""
    // });

    const [warnings, setWarnings] = useState({
        warning: ""
    });
    const [errorlist, setErrorList] = useState([]);
    // const{
    //   document_name
    // }=documentnames;
    const [files, setFiles] = useState({
        file: "",
    });
    const [msg, setMsg] = useState({
        excelimportmessage: ""
    });
    const Parentvaluetomodal = (data) => {
        window.location.reload();
        setMsg({ ...msg, ["excelimportmessage"]: "" });
    }
    const emptyfileinputvalue = React.useRef();

    const [disablebutton, setDisableButton] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        var documentarray = [];
        const url = (process.env.REACT_APP_API + "MemberExcelSheetImport");
        const formData = new FormData();
        formData.append('body', files.file);
        console.log(files.file);
        console.log(formData);
        const config = {
            headers: {
                unique_code: cookies.unique_code,
                'content-type': 'multipart/form-data',
            },
        };

        return post(url, formData, config).then(response => {
            console.log(response);
            console.log(response.data.file_name);

            console.log(documentarray);

            if (response.data.is_success) {
                toast.success(response.data.msg);
                setMsg({ ...msg, ["excelimportmessage"]: response.data.msg });
                setWarnings({ ["warning"]: "" });
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
            else {
                toast.error(response.data.msg);
                setWarnings({ ["warning"]: response.data.msg });
                setErrorList(response.data.error_message_list);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
                // setDisableButton(false);
                // document.getElementById("img_gif_loading_btn").style.display = "none";
                // if (error.message == "Request failed with status code 401") {
                //     history.push('/adminlogin');
                // }
            })

    }
    const setFile = (e) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
        //setDocuments({...documents,[e.target.name]:e.target.value});
    }


    const OpenMultiDoc = (e) => {
        const url = process.env.REACT_APP_API_PART_MULTI + '?file_for=PART_NUMBER_DOCUMENT';
        console.log(url);
        window.open(url, '_blank');
    }

    const OpenMultiFiles = (e) => {
        const url = process.env.REACT_APP_API_PART_MULTI + '?file_for=PART_NUMBER_COVER_PHOTO';
        console.log(url);
        window.open(url, '_blank');
    }
    //var Doc = process.env.BASE_URL + '/Home/UploadMultipleFiles?file_for=PART_NUMBER_DOCUMENT'
    //var File = process.env.BASE_URL + "/Home/UploadMultipleFiles?file_for=PART_NUMBER_COVER_PHOTO"
    return (
        <>
            {loading ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :

                <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px" }}>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9">
                                            <h3>Import Member Excel Sheet</h3>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CRow>
                                                {/* <CForm
                                                    action={Doc}>
                                                    <CRow className="ml-1">
                                                        <CCol xs="12" sm="1" md="1" lg="1">
                                                            <CInput type="hidden"
                                                                className="cinput"
                                                            ></CInput>
                                                        </CCol>

                                                        
                                                        <CCol xs="12" sm="11" md="11" lg="11" className="ml-0 pl-0 mr-0 pr-0" >

                                                            <button
                                                                type="submit"
                                                                class="btn btn-sm btn-outline-success "
                                                                style={{ width: ' ' }}

                                                            >
                                                                <i class="fa fa-file-excel-o"></i>Export </button>

                                                        </CCol>





                                                    </CRow>



                                                </CForm> */}
                                                {/* <CButton className="btn btn-sm btn-outline-danger" style={{ paddingLeft: "2px" }} onClick={() => OpenMultiDoc()}>
                                                    Upload Multi Docs
                                                </CButton>

                                                <CButton className="btn btn-sm btn-outline-success ml-2" style={{ paddingLeft: "2px" }} onClick={() => OpenMultiFiles()}>
                                                    Upload Multi Images
                                                </CButton>*/}
                                                {/* <Link to={process.env.REACT_APP_API_PART_MULTI + "?file_for=PART_NUMBER_DOCUMENT"} className="btn btn-sm btn-outline-danger" style={{ paddingLeft: "2px" }}>
                                                    Upload Multi Docs
                                                </Link> */}

                                                {/* <Link to={process.env.REACT_APP_API_PART_MULTI + "?file_for=PART_NUMBER_COVER_PHOTO"} className="btn btn-sm btn-outline-success ml-2  " style={{ paddingLeft: "2px" }}>
                                                    Upload Multi Images
                                                </Link> */}
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "2px" }} />
                                    <CForm>
                                        {msg.excelimportmessage != "" ? <Memberecxelimportsuccessmodal msg={msg.excelimportmessage}
                                            changeDependency={Parentvaluetomodal}
                                        /> : null}
                                        <CRow className="mb-3">
                                            <CCol xs="12" sm="12" md="6" lg="6">
                                                <a href={process.env.REACT_APP_MEMBER_SAMPLE_EXCEL_FILE}
                                                    download target="_self"
                                                    style={{ fontSize: "20px", color: "#rgb(60, 74, 105)" }}>
                                                    <i className="fa fa-file-excel-o "
                                                    // style={{fontSize:"30px"}}
                                                    ></i>&nbsp;
                                                    Download Sample</a>
                                            </CCol>
                                            <CCol>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs="12" sm="7" md="7" lg="7">
                                                <CLabel style={{ fontWeight: "unset" }}>Upload Excel Sheet</CLabel>
                                                <CInput type="file" onChange={(e) => setFile(e)} ref={emptyfileinputvalue} />
                                            </CCol>
                                            <CCol xs="12" sm="7" md="7" lg="7">
                                                <div className="bgcolor mt-4" style={{ borderRadius: "5px" }}>
                                                    <CButton type="submit" onClick={(e) => submit(e)} disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Upload</CButton>
                                                    <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                </div>
                                                {/* <CButton type="submit" onClick={(e) => submit(e)} className="mt-4 bgcyan white" style={{ width: "100%" }}>Upload</CButton> */}
                                                {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-3">
                                            <CCol xs="12" sm="7" md="7" lg="7">
                                                {errorlist.length !== 0 ?
                                                    <div className="table-responsive  my-table">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Line Number</th>
                                                                    <th>Error Message</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {errorlist.map((errorlists, index) => (

                                                                    <tr key={index}>

                                                                        <td>{errorlists.serial_no}</td>
                                                                        <td>{errorlists.error_message}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    : null}

                                            </CCol>
                                        </CRow>

                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            }
        </>
    )
}

export default MemberImport