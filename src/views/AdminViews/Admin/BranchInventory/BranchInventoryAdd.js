import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { post } from 'axios';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const AddNewBranchInventory = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [UserDropdowns, setUserDropdowns] = useState([]);
    const [SupplierDropdowns, setSupplierDropdowns] = useState([]);

    let history = useHistory();

    const [InventoryInput, setInventoryInput] = useState({
        inventory_id: "",
        inventory_branch_id: "",
        inventory_purchase_date: "",
        inventory_invoice_number: "",
        inventory_item_name: "",
        inventory_quantity: "",
        inventory_total_tax_amount: "",
        inventory_total_price: "",
        inventory_warranty_or_service: "",
        inventory_supplier_id: "",
        inventory_person_responsibility: "",
        inventory_maintenance_cycle: "",
        inventory_invoice_filename: "",
        inventory_remarks: ""
    });

    const {
        inventory_id,
        inventory_branch_id,
        inventory_purchase_date,
        inventory_invoice_number,
        inventory_item_name,
        inventory_quantity,
        inventory_total_tax_amount,
        inventory_total_price,
        inventory_warranty_or_service,
        inventory_supplier_id,
        inventory_person_responsibility,
        inventory_maintenance_cycle,
        inventory_invoice_filename,
        inventory_remarks
    } = InventoryInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setInventoryInput({ ...InventoryInput, [e.target.name]: e.target.value });
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_USER", "dropdown_filter": "" },
                { "dropdown_type": "DD_SUPPLIER", "dropdown_filter": "" },
                
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_USER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setUserDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_SUPPLIER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setSupplierDropdowns(ddlist);
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

        setInventoryInput({ ...InventoryInput, ["inventory_branch_id"]: e.value });
    };

    const onChangesupdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setInventoryInput({ ...InventoryInput, ["inventory_supplier_id"]: e.value });
    };

    const onChangeUserdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setInventoryInput({ ...InventoryInput, ["inventory_person_responsibility"]: e.value });
    };
    

    useEffect(() => {
        GetDropDown();
    }, []);

    //Upload Invoice Document
    const [files, setFiles] = useState({
        file: "",
    });

    const setFile = (e) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
    }

    const [disablebutton3, setDisableButton3] = useState(false);

    const SubmitDocument = async (e) => {
        e.preventDefault();
        setDisableButton3(true);
        document.getElementById("img_gif_loading_btn3").style.display = "block";
        var documentarray = [];
        var filefor = "INVENTORY_INVOICE_FILE"
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

                setInventoryInput({ ...InventoryInput, ["inventory_invoice_filename"]: response.data.file_name });
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            }
            else {
                toast.error(response.data.msg);
                setDisableButton3(false);
                document.getElementById("img_gif_loading_btn3").style.display = "none";
            }
        });

    }

    const OnSubmitInventory = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (inventory_id === "") {
            await axios.post(process.env.REACT_APP_API + "BranchInventoryAdd", {
                "inventory_branch_id": inventory_branch_id,
                "inventory_purchase_date": inventory_purchase_date,
                "inventory_invoice_number": inventory_invoice_number,
                "inventory_item_name": inventory_item_name,
                "inventory_quantity": inventory_quantity,
                "inventory_total_tax_amount": inventory_total_tax_amount,
                "inventory_total_price": inventory_total_price,
                "inventory_warranty_or_service": inventory_warranty_or_service,
                "inventory_supplier_id": inventory_supplier_id,
                "inventory_person_responsibility": inventory_person_responsibility,
                "inventory_maintenance_cycle": inventory_maintenance_cycle,
                "inventory_invoice_filename": inventory_invoice_filename,
                "inventory_remarks": inventory_remarks,
                "inventory_created_by": cookies.user_id
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/branch-inventory-list`);
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
        else {
            await axios.post(process.env.REACT_APP_API + "BranchInventoryUpdate", {
                "inventory_id": inventory_id,
                "inventory_branch_id": inventory_branch_id,
                "inventory_purchase_date": inventory_purchase_date,
                "inventory_invoice_number": inventory_invoice_number,
                "inventory_item_name": inventory_item_name,
                "inventory_quantity": inventory_quantity,
                "inventory_total_tax_amount": inventory_total_tax_amount,
                "inventory_total_price": inventory_total_price,
                "inventory_warranty_or_service": inventory_warranty_or_service,
                "inventory_supplier_id": inventory_supplier_id,
                "inventory_person_responsibility": inventory_person_responsibility,
                "inventory_maintenance_cycle": inventory_maintenance_cycle,
                "inventory_invoice_filename": inventory_invoice_filename,
                "inventory_remarks": inventory_remarks
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/branch-inventory-list`);
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
    }

    const LoadInventoryDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["inventory_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "BranchInventoryDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    var InventoryDetails = [], CreatedDate, PurchaseDate;
                    if (response.data.branch_inventory_details !== null) {

                        if (response.data.branch_inventory_details.inventory_purchase_date !== null) {
                            var date = response.data.branch_inventory_details.inventory_purchase_date
                            PurchaseDate = date.substring(0, 10);
                        }
                        else {
                            PurchaseDate = response.data.branch_inventory_details.inventory_purchase_date;
                        }

                        setInventoryInput({
                            "inventory_id": response.data.branch_inventory_details.inventory_id,
                            "inventory_branch_id": response.data.branch_inventory_details.inventory_branch_id,
                            "inventory_purchase_date": PurchaseDate,
                            "inventory_invoice_number": response.data.branch_inventory_details.inventory_invoice_number,
                            "inventory_item_name": response.data.branch_inventory_details.inventory_item_name,
                            "inventory_quantity": response.data.branch_inventory_details.inventory_quantity,
                            "inventory_total_tax_amount": response.data.branch_inventory_details.inventory_total_tax_amount,
                            "inventory_total_price": response.data.branch_inventory_details.inventory_total_price,
                            "inventory_warranty_or_service": response.data.branch_inventory_details.inventory_warranty_or_service,
                            "inventory_supplier_id": response.data.branch_inventory_details.inventory_supplier_id,
                            "inventory_person_responsibility": response.data.branch_inventory_details.inventory_person_responsibility,
                            "inventory_maintenance_cycle": response.data.branch_inventory_details.inventory_maintenance_cycle,
                            "inventory_invoice_filename": response.data.branch_inventory_details.inventory_invoice_filename,
                            "inventory_remarks": response.data.branch_inventory_details.inventory_remarks
                        });
                    }
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    useEffect(() => {
        LoadInventoryDetails();
    }, []);

    return (
        <>
        {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_BRANCH_INVENTORY) ?
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                {props.location.pfid != null ? <h4>Update Branch Inventory</h4>
                                    :
                                    <h4> Add New Branch Inventory</h4>
                                }
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitInventory(e)}>
                                    <CRow>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Branch</CLabel><span className="red">*</span>
                                                <Select value={BranchDropdowns.filter(function (option) {
                                                    return option.value === inventory_branch_id;
                                                })}
                                                    options={BranchDropdowns}
                                                    onChange={(e) => onChangedropdown(e, "inventory_branch_id")}>
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Purchase Date</CLabel><span className="red">*</span>
                                                <CInput type='date' placeholder='Enter Purchase Date' required="required"
                                                    name='inventory_purchase_date'
                                                    value={inventory_purchase_date}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Invoice No</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Invoice No' required="required"
                                                    name='inventory_invoice_number'
                                                    value={inventory_invoice_number}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Item Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Item Name' required="required"
                                                    name='inventory_item_name'
                                                    value={inventory_item_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Item Quantity</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Item Quantity' required="required"
                                                    name='inventory_quantity'
                                                    value={inventory_quantity}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Total Tax Amount</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Tax Amount' required="required"
                                                    name='inventory_total_tax_amount'
                                                    value={inventory_total_tax_amount}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Price</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Price' required="required"
                                                    name='inventory_total_price'
                                                    value={inventory_total_price}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Warranty/Service</CLabel><span className="red">*</span>
                                                <CSelect name='inventory_warranty_or_service' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select</option>
                                                    <option selected={inventory_warranty_or_service === "1 Year"} value="1 Year">1 Year</option>
                                                    <option selected={inventory_warranty_or_service === "2 Years"} value="2 Years">2 Years</option>
                                                    <option selected={inventory_warranty_or_service === "3 Years"} value="3 Years">3 Years</option>
                                                    <option selected={inventory_warranty_or_service === "4 Years"} value="4 Years">4 Years</option>
                                                    <option selected={inventory_warranty_or_service === "5 Years"} value="5 Years">5 Years</option>
                                                    <option selected={inventory_warranty_or_service === "6 Years"} value="6 Years">6 Years</option>
                                                    <option selected={inventory_warranty_or_service === "7 Years"} value="7 Years">7 Years</option>
                                                    <option selected={inventory_warranty_or_service === "8 Years"} value="8 Years">8 Years</option>
                                                    <option selected={inventory_warranty_or_service === "9 Years"} value="9 Years">9 Years</option>
                                                    <option selected={inventory_warranty_or_service === "10 Years"} value="10 Years">10 Years</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Maintenance Cycle</CLabel><span className="red">*</span>
                                                <CSelect name='inventory_maintenance_cycle' onChange={(e) => OnInputChange(e)} custom>
                                                    <option>Select Maintenance Cycle</option>
                                                    <option selected={inventory_maintenance_cycle === "1 Month"} value="1 Month">1 Month</option>
                                                    <option selected={inventory_maintenance_cycle === "2 Months"} value="2 Months">2 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "3 Months"} value="3 Months">3 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "4 Months"} value="4 Months">4 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "5 Months"} value="5 Months">5 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "6 Months"} value="6 Months">6 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "7 Months"} value="7 Months">7 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "8 Months"} value="8 Months">8 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "9 Months"} value="9 Months">9 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "10 Months"} value="10 Months">10 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "11 Months"} value="11 Months">11 Months</option>
                                                    <option selected={inventory_maintenance_cycle === "1 Year"} value="1 Year">1 Year</option>
                                                    <option selected={inventory_maintenance_cycle === "2 Years"} value="2 Years">2 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "3 Years"} value="3 Years">3 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "4 Years"} value="4 Years">4 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "5 Years"} value="5 Years">5 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "6 Years"} value="6 Years">6 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "7 Years"} value="7 Years">7 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "8 Years"} value="8 Years">8 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "9 Years"} value="9 Years">9 Years</option>
                                                    <option selected={inventory_maintenance_cycle === "10 Years"} value="10 Years">10 Years</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Supplier</CLabel><span className="red">*</span>
                                                <Select value={SupplierDropdowns.filter(function (option) {
                                                    return option.value === inventory_supplier_id;
                                                })}
                                                    options={SupplierDropdowns}
                                                    onChange={(e) => onChangesupdropdown(e, "inventory_supplier_id")}>
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select responsible Person</CLabel><span className="red">*</span>
                                                <Select value={UserDropdowns.filter(function (option) {
                                                    return option.value === inventory_person_responsibility;
                                                })}
                                                    options={UserDropdowns}
                                                    onChange={(e) => onChangeUserdropdown(e, "inventory_person_responsibility")}>
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Invoice Filename </CLabel>
                                                <CInput type="file" name='file'
                                                    onChange={(e) => setFile(e)} />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                            <div className="bgcolor1 mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" onClick={(e) => SubmitDocument(e)} disabled={disablebutton3} style={{ width: "100%", color: "white", fontWeight: "", fontSize: "" }} >Upload Invoice</CButton>
                                                <img id="img_gif_loading_btn3" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                        </CCol>

                                        <CCol xs="12" sm="9" md="9" lg="9">
                                            <CFormGroup>
                                                <CLabel>Remarks</CLabel>
                                                <CTextarea type='date' rows={3} placeholder='Enter Remarks'
                                                    name='inventory_remarks'
                                                    value={inventory_remarks}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div >
            :
            <Notification />
    }
        </>
    )
}
export default AddNewBranchInventory;