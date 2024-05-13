import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const BranchInventoryDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var inventoryid = searchParams.get("inventoryid");

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [InventoryDetails, setInventoryDetails] = useState({});

    const LoadInventoryDetails = async () => {
        var list = {};
        list["inventory_id"] = inventoryid;
        await axios.post(process.env.REACT_APP_API + "BranchInventoryDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var InventoryDetails = [], CreatedDate, PurchaseDate;
                if (response.data.branch_inventory_details !== null) {

                    if (response.data.branch_inventory_details.inventory_purchase_date !== null) {
                        var date = response.data.branch_inventory_details.inventory_purchase_date
                        PurchaseDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        PurchaseDate = response.data.branch_inventory_details.inventory_purchase_date;
                    }

                    if (response.data.branch_inventory_details.inventory_created_at !== null) {
                        var date = response.data.branch_inventory_details.inventory_created_at
                        CreatedDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        CreatedDate = response.data.branch_inventory_details.inventory_created_at;
                    }

                    setInventoryDetails({
                        "inventory_id": response.data.branch_inventory_details.inventory_id,
                        "inventory_branch_id": response.data.branch_inventory_details.inventory_branch_id,
                        "branch_id": response.data.branch_inventory_details.branch_id,
                        "branch_name": response.data.branch_inventory_details.branch_name,
                        "inventory_purchase_date": PurchaseDate,
                        "inventory_invoice_number": response.data.branch_inventory_details.inventory_invoice_number,
                        "inventory_item_name": response.data.branch_inventory_details.inventory_item_name,
                        "inventory_quantity": response.data.branch_inventory_details.inventory_quantity,
                        "inventory_total_tax_amount": response.data.branch_inventory_details.inventory_total_tax_amount,
                        "inventory_total_price": response.data.branch_inventory_details.inventory_total_price,
                        "inventory_warranty_or_service": response.data.branch_inventory_details.inventory_warranty_or_service,
                        "inventory_supplier_id": response.data.branch_inventory_details.inventory_supplier_id,
                        "supplier_name":response.data.branch_inventory_details.supplier_name,
                        "inventory_person_responsibility": response.data.branch_inventory_details.inventory_person_responsibility,
                        "person_responsibility_user_name": response.data.branch_inventory_details.person_responsibility_user_name,
                        "inventory_maintenance_cycle": response.data.branch_inventory_details.inventory_maintenance_cycle,
                        "inventory_invoice_filename": response.data.branch_inventory_details.inventory_invoice_filename,
                        "inventory_remarks": response.data.branch_inventory_details.inventory_remarks,
                        "inventory_status_text": response.data.branch_inventory_details.inventory_status_text,
                        "inventory_created_by": response.data.branch_inventory_details.inventory_created_by,
                        "created_user_name": response.data.branch_inventory_details.created_user_name,
                        "inventory_created_at": CreatedDate,
                        "user_name":response.data.branch_inventory_details.created_user_name
                    });
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadInventoryDetails();
    }, []);

    const documentopen = (documentnamne) => {
        console.log(documentnamne);
        var str = documentnamne.replace(/"/g, "");
        console.log(str);
        const url = process.env.REACT_APP_DOCUMENTPATH + cookies.unique_code + "/INVENTORY_INVOICE_FILE/" + str;
        console.log(url);
        window.open(url, '_blank');
    }

    return (
        <>
        {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_INVENTORY_DETAILS) ?
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h3>Branch Inventory Details</h3>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>BRANCH INVENTORY DETAILS</th>
                                        </tr>
                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>BRANCH</td>
                                            <td>PURCHASE DATE</td>
                                            <td>INVOICE NUMBER</td>
                                            <td>ITEM NAME</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{InventoryDetails.branch_name}</td>
                                            <td>{InventoryDetails.inventory_purchase_date}</td>
                                            <td>{InventoryDetails.inventory_invoice_number}</td>
                                            <td>{InventoryDetails.inventory_item_name}</td>
                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>QUANTITY</td>
                                            <td>TOTAL TAX AMOUNT</td>
                                            <td>TOTAL PRICE</td>
                                            <td>WARRANTY/SERVICE</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{InventoryDetails.inventory_quantity}</td>
                                            <td>{InventoryDetails.inventory_total_tax_amount}</td>
                                            <td>{InventoryDetails.inventory_total_price}</td>
                                            <td>{InventoryDetails.inventory_warranty_or_service}</td>
                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>MAINTENANCE CYCLE</td>
                                            <td>SUPPLIER</td>
                                            <td>RESPONSIBLE PERSON</td>
                                            <td>INVOICE FILENAME</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{InventoryDetails.inventory_maintenance_cycle}</td>
                                            <td >{InventoryDetails.supplier_name}</td>
                                            <td>{InventoryDetails.person_responsibility_user_name}</td>
                                            <td><CButton
                                                onClick={() => documentopen(InventoryDetails.inventory_invoice_filename)}
                                            >
                                                {InventoryDetails.inventory_invoice_filename}</CButton>
                                            </td>
                                        </tr>

                                        <tr className='' style={{ backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>REAMARKS</td>
                                            <td>STATUS</td>
                                            <td>CREATED AT</td>
                                            <td>CREATED BY</td>
                                            
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{InventoryDetails.inventory_remarks}</td>
                                            <td>{InventoryDetails.inventory_status_text}</td>
                                            <td>{InventoryDetails.inventory_created_at}</td>
                                            <td>{InventoryDetails.created_user_name}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
export default BranchInventoryDetails