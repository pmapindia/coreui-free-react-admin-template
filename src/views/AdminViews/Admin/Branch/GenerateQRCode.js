import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect, useRef } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { GetColorName } from 'hex-color-to-color-name';
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { QRCodeCanvas } from "qrcode.react";

const GenerateQRCode = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var branchid = searchParams.get("branchid");
    var Branch_Name = searchParams.get("branchname");
    var Organization_Name = searchParams.get("orgname");

    const [url, setUrl] = useState(branchid);
    const [title, setTitle] = useState(branchid);

    const qrRef = useRef();

    const downloadQRCode = () => {
        //e.preventDefault();
        const qrCodeURL = document.getElementById('qrCode')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL();
        let anchor = document.createElement("a");
        anchor.href = qrCodeURL;
        anchor.download = "QR_Code.png";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        //setUrl("");
    };

    const qrCodeEncoder = (e) => {
        setUrl(e.target.value);
    };

    const qrcode = (<QRCodeCanvas
        id="qrCode"
        title={title}
        value={url}
        size={300}
        bgColor={"#FFFFFF"}
        fgColor={"#000000"}
        level={"H"}
    />
    );

    return (
        <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
            <CRow>
                <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                <CCol xs="12" sm="6" md="6" lg="6" align="center">
                    <CCard style={{ borderRadius: "20px" }}>
                        <CCardBody>

                            <div className="qrcode__container">
                                <div>
                                    <CLabel><h3>{Organization_Name}</h3></CLabel>
                                </div>
                                <div ref={qrRef}>{qrcode}</div>
                                <div className="input__group">
                                    <form onSubmit={downloadQRCode} hidden>
                                        <label>Enter URL</label>
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={qrCodeEncoder}
                                            placeholder="https://hackernoon.com"
                                        />

                                    </form>
                                </div>
                                <div className='mt-3'>
                                    <CLabel><h3>{Branch_Name}</h3></CLabel>
                                </div>
                                <CButton type="submit" onClick={downloadQRCode} disabled={!url} className="btn bgcolor1 white mt-3">
                                    Download QR code
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </div>
    )
}
export default GenerateQRCode;