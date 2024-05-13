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

const BodyMeasurementModal = (props) => {
    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton7, setDisableButton7] = useState(false);

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();
    const [show11, setShow11] = useState(false);
    //const handleShow = () => ;
    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow11(true);
    }

    const [BodyMeasurementDropdowns, setBodyMeasurementDropdowns] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BODY_MEASUREMENTS", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BODY_MEASUREMENTS") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBodyMeasurementDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const [itemdetails, setItemDetails] = useState([]);
    const ItemOnChange = async (e) => {
        // alert(e);here i will get the object
        console.warn(e.value);//here i will get the specific selected value
        var list = {};

        if (e.value != null) {
            list["body_measurement_id"] = e.value;
            await axios.post(process.env.REACT_APP_API + "MemberBodyMeasurementSetupDetailsById", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    setItemDetails([...itemdetails, {
                        ["body_measurement_id"]: response.data.details.body_measurement_id,
                        ["body_measurement_name"]: response.data.details.body_measurement_name,
                    }]);
                }
            }).catch(error => {
                console.log(error);
                alert(error.message);
            })
        }
    }

    const OnItemsDetailsChange = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);
        var temp_item_details = [...itemdetails];
        temp_item_details[index][e.target.name] = e.target.value;
        setItemDetails([]);
        setItemDetails(temp_item_details);
    }

    const RemoveItemRow = (index) => {
        let values = [...itemdetails];
        values.splice(index, 1);
        setItemDetails(values);

    }
    return (
        <CRow>
            <CCol>
                {/* <CButton className="btn btn-md white width100"
                    style={{ backgroundColor: "#F44336" }}
                    onClick={() => setPrimary(!primary)}
                >Freeze/Pause
                </CButton> */}
                <CButton className=' btn btn-sm' style={{ fontSize: "13px", alignItems: "", backgroundColor: "" }}
                    onClick={(e) => handleShow(e)}
                >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="lg"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Update Body Measurement</h4></CModalTitle>
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
                                        <h5>Member Body Measurement Setup Details</h5>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Body Measurement Setup</CLabel>
                                                    <Select
                                                        options={BodyMeasurementDropdowns}
                                                        onChange={(e) => ItemOnChange(e)}
                                                    ></Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <div className="  mt-2">
                                                    <table className="table tabale-bordered-less">
                                                        <thead>
                                                            <tr>
                                                                <th>Measurement Name</th>
                                                                <th>Measurement Value</th>
                                                                <th>Unit</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {itemdetails.map((itemdetail, index) => (

                                                                <tr key={index}>
                                                                    <td style={{ width: "300px" }}>
                                                                        {itemdetail.body_measurement_name}
                                                                    </td>
                                                                    <td><CInput type="text"
                                                                        placeholder="Measurement Value"
                                                                        name="body_measurement_value"
                                                                        value={itemdetail.body_measurement_value}
                                                                        onChange={(e) => OnItemsDetailsChange(e, index)}
                                                                    />
                                                                    </td>

                                                                    <td>
                                                                        <CSelect name="body_measurement_unit"
                                                                            onChange={(e) => OnItemsDetailsChange(e, index)}
                                                                            custom>
                                                                            <option >Select Unit</option>
                                                                            <option value="inches">Inches</option>
                                                                            <option value="cm">CM</option>
                                                                            <option value="feet">Feet</option>
                                                                            <option value="kg">KG</option>
                                                                        </CSelect>
                                                                    </td>

                                                                    <td>
                                                                        <CButton
                                                                            onClick={() => RemoveItemRow(index)}
                                                                            className="btn">
                                                                            <i className="fa fa-trash" aria-hidden="true">
                                                                            </i></CButton>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <hr className="bgcolor" style={{ height: "1px" }} />
                        <CRow>
                            <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                            <CCol xs="12" sm="6" md="6" lg="6">
                                <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" disabled={disablebutton7} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                    <img id="img_gif_loading_btn7" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default BodyMeasurementModal;