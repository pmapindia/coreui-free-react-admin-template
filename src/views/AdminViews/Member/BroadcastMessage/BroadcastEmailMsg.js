import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { post } from 'axios';

const BroadcastEmailMsg = (props) => {

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [disablebutton1, setDisableButton1] = useState(false)

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [EmailInput, setEmailInput] = useState({
        branch_id: "",
        to_email_ids: "",
        subject: "",
        body: "",
        media: ""
    });

    const {
        branch_id,
        to_email_ids,
        subject,
        body,
        media
    } = EmailInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setEmailInput({ ...EmailInput, [e.target.name]: e.target.value });
    }

    const onChangeInputChange = (e, editor) => {
        console.log(editor.getData());
        const data = editor.getData();
        setEmailInput({ ...EmailInput, ["body"]: data });
    }

    //Upload User Document
    const [files, setFiles] = useState({
        file: "",
    });

    const onChangeFile = (e) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
    }

    const SubmitDocument = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "EMAIL_MARKETING"
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

                setEmailInput({ ...EmailInput, ["media"]: response.data.file_name });

            }
            else {
                toast.error(response.data.msg);

            }
        });

    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBranchDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setEmailInput({ ...EmailInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    console.log("Mem_emails's:" + props.mem_mails);

    const OnSubmitEmailBulk = async (e) => {
        e.preventDefault();
        setDisableButton1(true);
        document.getElementById("img_gif_loading_btn1").style.display = "block";

        var mails_seperated;
        console.log("Mem_emails's:" + props.mem_mails);
        if (props.mem_nos != "") {
            mails_seperated = props.mem_mails.toString();
            mails_seperated.replace("[", " ").replace("]", " ");
        }

        await axios.post(process.env.REACT_APP_API + "SendEmailBroardCast", {
            "branch_id": branch_id,
            "to_email_ids": mails_seperated,
            "subject": subject,
            "body": body,
            "media": media,
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton1(false);
                document.getElementById("img_gif_loading_btn1").style.display = "none";
            })
    }

    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                    <CCard style={{ borderRadius: "20px" }}>
                        <CCardBody>
                            <CForm onSubmit={(e) => OnSubmitEmailBulk(e)}>
                                <CRow className=''>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CFormGroup>
                                            <CLabel>Select Branch</CLabel><span className="red">*</span>
                                            <Select value={BranchDropdowns.filter(function (option) {
                                                return option.value === branch_id;
                                            })}
                                                options={BranchDropdowns}
                                                onChange={(e) => onChangedropdown(e, "branch_id")}>
                                            </Select>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CFormGroup>
                                            <CLabel>Subject</CLabel><span className="red">*</span>
                                            <CInput type='text' rows={3} placeholder='Enter Subject'
                                                name='subject'
                                                value={subject}
                                                onChange={(e) => OnInputChange(e)}
                                            ></CInput>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CFormGroup>
                                            <CLabel>Body</CLabel><span className="red">*</span>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onChange={onChangeInputChange}
                                                data={body}
                                            />
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="7" md="7" lg="7" >
                                        <CFormGroup>
                                            <CLabel>Upload File</CLabel>
                                            <CInput type="file"
                                                name="media"
                                                onChange={(e) => onChangeFile(e)}
                                            ></CInput>
                                        </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="5" md="5" lg="5" className="mt-1">
                                        <CFormGroup>
                                            <CButton type="submit" onClick={(e) => SubmitDocument(e)} className="mt-4 bgcolor white" style={{ width: "100%" }}>Upload Documents</CButton>
                                        </CFormGroup>
                                    </CCol>


                                </CRow>
                                <CRow className='mt-3'>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="bggreen mb-3" style={{ borderRadius: "5px" }}>
                                            <CButton type="submit" disabled={disablebutton1} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Email Now</CButton>
                                            <img id="img_gif_loading_btn1" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                        </div>
                                        {warnings.warning && <p className="red">{warnings.warning}</p>}
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default BroadcastEmailMsg