import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Select from 'react-select';
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CTextarea, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { post } from 'axios';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BroadcastEmailMsg from '../BroadcastMessage/BroadcastEmailMsg';
import BroadcastSms from '../BroadcastMessage/BroadcastSms';
import AppNotification from '../BroadcastMessage/AppNotification';


const SendMessageModal = (props) => {
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
    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [disablebutton, setDisableButton] = useState(false)

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [WhatsAppInput, setWhatsAppInput] = useState({
        branch_id: "",
        number: "",
        msg: "",
        media: ""
    });

    const {
        branch_id,
        number,
        msg,
        media
    } = WhatsAppInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setWhatsAppInput({ ...WhatsAppInput, [e.target.name]: e.target.value });
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
        setWhatsAppInput({ ...WhatsAppInput, ["branch_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
    }, []);

    //Upload User Document
    const [files, setFiles] = useState({
        file: "",
    });

    const setFile = (e) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
    }

    const SubmitDocument = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "WHATSAPP_MARKETING"
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

                setWhatsAppInput({ ...WhatsAppInput, ["media"]: response.data.file_name });

            }
            else {
                toast.error(response.data.msg);

            }
        });

    }


    const OnSubmitWhatsappBulk = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";

        await axios.post(process.env.REACT_APP_API + "SendWhatsAppBroardCastSMS", {
            "branch_id": branch_id,
            "number": number,
            "msg": msg,
            "media": media,
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
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
                <CButton className="btn btn-sm bgcolor white width100"
                    style={{ backgroundColor: "" }}
                    onClick={() => setPrimary(!primary)}
                >Broadcast Message
                </CButton>
                {/* <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton> */}

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="lg"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Broadcast Message</h4></CModalTitle>
                        <CButton className="btn white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <Tabs>
                            <TabList style={{ fontWeight: "bold" }}>
                                <Tab>WhatsApp</Tab>
                                <Tab>Email</Tab>
                                <Tab>SMS</Tab>
                                <Tab>App Notification</Tab>
                            </TabList>
                            <TabPanel>
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px" }}>
                                            <CCardBody>
                                                <CForm onSubmit={(e) => OnSubmitWhatsappBulk(e)}>
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
                                                                <CLabel>Message</CLabel><span className="red">*</span>
                                                                <CTextarea type='text' rows={3} placeholder='Enter Message'
                                                                    name='msg'
                                                                    value={msg}
                                                                    onChange={(e) => OnInputChange(e)}
                                                                ></CTextarea>
                                                            </CFormGroup>
                                                        </CCol>

                                                        <CCol xs="12" sm="7" md="7" lg="7" >
                                                            <CFormGroup>
                                                                <CLabel>Upload File</CLabel>
                                                                <CInput type="file"
                                                                    name="media"
                                                                    onChange={(e) => setFile(e)}
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
                                                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >WhatsApp Now</CButton>
                                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                            </div>
                                                            {warnings.warning && <p className="red">{warnings.warning}</p>}
                                                        </CCol>
                                                    </CRow>
                                                </CForm>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </TabPanel>

                            <TabPanel>
                                <BroadcastEmailMsg
                                    mem_mails={props.mem_mails}
                                    branch_id={props.branch_id}
                                />
                            </TabPanel>

                            <TabPanel>
                                <BroadcastSms />
                            </TabPanel>

                            <TabPanel>
                                <AppNotification />
                            </TabPanel>
                        </Tabs>
                    </CModalBody>
                </CModal>
            </CCol>
        </CRow>
    )
}
export default SendMessageModal;