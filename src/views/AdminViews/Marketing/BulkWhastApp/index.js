import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard } from '@coreui/react';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import { CCardBody } from '@coreui/react-pro';
import Select from 'react-select';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const BulkWhatsApp = () => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [disablebutton, setDisableButton] = useState(false);

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

    let history = useHistory();

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setWhatsAppInput({ ...WhatsAppInput, [e.target.name]: e.target.value });
    }

    //Upload Document

    const onChangeFile = (e) => {
        setWhatsAppInput({ ...WhatsAppInput, ["media"]: e.target.files[0] });
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

    const OnSubmitMedia = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "WHATSAPP_MARKETING"
        const url = (process.env.REACT_APP_API + `UploadFile?file_for=${filefor}`);

        const formData = new FormData();
        formData.append('body', WhatsAppInput.media);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'unique_code': cookies.unique_code
            },
        };
        return post(url, formData, config).then(response => {
            var adc = WhatsAppInput.media;
            //11alert(adc+","+response.data.file_name);
            console.log(response);
            console.log(response.data.file_name);

            if (response.data.is_success) {
                setWhatsAppInput({ ...WhatsAppInput, ["media"]: response.data.file_name });
                toast.success(response.data.msg);
            }
            else {
                toast.error(response.data.msg);
            }

        });
    }

    const config = {
        headers: {
            'unique_code': cookies.unique_code
        },
    };
    const OnSubmitWhatsappBulk = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "SendWhatsAppBroardCastSMS", {
            "branch_id": branch_id,
            "number": number,
            "msg": msg,
            "media": media
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
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_WHATSAPP_BULK) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px", borderColor: "", borderWidth: "2px" }}>
                                    <CCardBody>
                                        <h3>Bulk WhatsApp</h3>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitWhatsappBulk(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="6" md="6" lg="6">
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
                                                <CCol xs="12" sm="6" md="6" lg="6"></CCol>


                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Enter Mobile No (Seperated by comma)</CLabel><span className="red">*</span>
                                                        <CTextarea type='text' rows={5} placeholder='Enter Mobile No (Seperated by comma)'
                                                            name='number' value={number} onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow className='mt-3'>
                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Message</CLabel><span className="red">*</span>
                                                        <CTextarea type='text' rows={5} placeholder='Enter Message'
                                                            name='msg' value={msg} onChange={(e) => OnInputChange(e)}
                                                        ></CTextarea>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow className='mt-3'>
                                                {/* <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Instance Id</CLabel><span className="red">*</span>
                                            <CInput type='text' rows={5} placeholder='Instance Id' defaultValue='64992904f393f'
                                                name='instance_id' value={instance_id} onChange={(e) => OnInputChange(e)}
                                            />
                                        </CCol> */}

                                                <CCol xs="12" sm="3" md="3" lg="3" >
                                                    <CFormGroup>
                                                        <CLabel>Upload File</CLabel><span className="red">*</span>
                                                        <CInput type="file"
                                                            name="media"
                                                            onChange={(e) => onChangeFile(e)}
                                                        ></CInput>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
                                                    <CFormGroup>
                                                        <CButton type="submit" onClick={(e) => OnSubmitMedia(e)} className="mt-4 bgcolor white" style={{ width: "100%" }}>Upload Documents</CButton>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow className='mt-3'>

                                                <CCol xs="12" sm="6" md="6" lg="6">
                                                    <div className="bggreen mb-3" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Bulk WhatsApp Now</CButton>
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
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default BulkWhatsApp;