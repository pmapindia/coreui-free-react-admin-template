import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

import BalancePaymentUpdateModal from '../Modals/BalancePaymentUpdateModal';

const SalesDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var saleid = searchParams.get("saleid");

    const [SalesDetail, setSalesDetail] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [SalesDetails, setSalesDetails] = useState({});
    const [PackageDetails, setPackageDetails] = useState([]);
    const [ProductInfo, setProductInfo] = useState([]);
    const [PostpaidDetails, setPostpaidDetails] = useState([]);
    const [PaymentMode, setPaymentMode] = useState([]);
    const [TaxList, setTaxList] = useState([]);
    const [BalanceHistory, setBalanceHistory] = useState([]);

    const [DisPackage, setDisPackage] = useState(false);
    const [DisProd, setDisProd] = useState(false);
    const [DisPost, setDisPost] = useState(false);

    const LoadSalesDetails = async () => {
        var list = {};
        list["sale_id"] = saleid;
        //list["sale_id"] = 2;

        await axios.post(process.env.REACT_APP_API + "SalesDetailsByID", list, config).then(response => {
            console.log(response);
            var DOB, SaleDate, DiscountAmount = 0;
            if (response.data.is_success) {
                if (response.data.sale_details !== null) {
                    if (response.data.sale_details.customer_date_of_birth !== null) {
                        var date = response.data.sale_details.customer_date_of_birth
                        DOB = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        DOB = response.data.sale_details.customer_date_of_birth;
                    }

                    if (response.data.sale_details.sale_created_at !== null) {
                        var date = response.data.sale_details.sale_created_at;
                        SaleDate = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        SaleDate = response.data.sale_details.sale_created_at
                    }

                    if (response.data.sale_details.sale_discount_amount_product_level !== null && response.data.sale_details.sale_discount_amount_order_level) {
                        DiscountAmount = response.data.sale_details.sale_discount_amount_product_level + response.data.sale_details.sale_discount_amount_order_level
                    }
                    else if (response.data.sale_details.sale_discount_amount_product_level !== null) {
                        DiscountAmount = DiscountAmount + response.data.sale_details.sale_discount_amount_product_level;
                    }
                    else if (response.data.sale_details.sale_discount_amount_order_level !== null) {
                        DiscountAmount = DiscountAmount + response.data.sale_details.sale_discount_amount_order_level
                    }
                    else {
                        DiscountAmount = 0;
                    }
                    setSalesDetails({
                        "sale_id": response.data.sale_details.sale_id,
                        "sale_trans_id": response.data.sale_details.sale_trans_id,
                        "sale_member_id": response.data.sale_details.sale_member_id,
                        "sale_customer_id": response.data.sale_details.sale_customer_id,
                        "customer_first_name": response.data.sale_details.customer_first_name,
                        "customer_last_name": response.data.sale_details.customer_last_name,
                        "customer_mobile_number": response.data.sale_details.customer_mobile_number,
                        "customer_email_address": response.data.sale_details.customer_email_address,
                        "customer_address": response.data.sale_details.customer_address,
                        "customer_date_of_birth": DOB,
                        "customer_referral_code": response.data.sale_details.customer_referral_code,
                        "sale_total_amount": response.data.sale_details.sale_total_amount,
                        "sale_paid_amount": response.data.sale_details.sale_paid_amount,
                        "sale_balance_amount": response.data.sale_details.sale_balance_amount,
                        "sale_balance_payable_date": response.data.sale_details.sale_balance_payable_date,
                        "sale_created_at": SaleDate,
                        "sale_created_by": response.data.sale_details.sale_created_by,
                        "created_user_name": response.data.sale_details.created_user_name,
                        "sale_discount_percentage_order_level": response.data.sale_details.sale_discount_percentage_order_level,
                        "sale_discount_amount_order_level": response.data.sale_details.sale_discount_amount_order_level,
                        "sale_discount_amount_product_level": response.data.sale_details.sale_discount_amount_product_level,
                        "sale_discount_amount": DiscountAmount
                    });

                }


                if (response.data.sales_product_details !== null) {
                    for (let i = 0; i < response.data.sales_product_details.length; i++) {
                        if (response.data.sales_product_details[i].product_type === "PRODUCT") {
                            setDisProd(true);
                            setDisPackage(false);
                            setProductInfo(response.data.sales_product_details);
                        }
                        if (response.data.sales_product_details[i].product_type === "PACKAGE" || response.data.sales_product_details[i].product_type === "PROGRAM") {
                            setDisProd(false);
                            setDisPackage(true);
                            setPackageDetails(response.data.sales_product_details);
                        }
                    }

                }

                if (response.data.member_postpaid_details !== null) {
                    setDisPost(true);
                    setPostpaidDetails(response.data.member_postpaid_details);
                }
                if (response.data.member_postpaid_details.length == 0) {
                    setDisPost(false);
                    setPostpaidDetails([]);
                }

                setPaymentMode(response.data.sales_payment_types_details);
                setTaxList(response.data.sales_total_tax_details);
                setBalanceHistory(response.data.sales_payment_balance_history_details);
            }
        })
    }

    useEffect(() => {
        LoadSalesDetails();
    }, []);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Sales Details</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CRow>
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <table className="table table-bordered ">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={1} className='' style={{ backgroundColor: "#38acec", textAlign: "center", color: "white", fontSize: "12px" }}>Customer Details</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Name: </CLabel><CLabel style={{ color: "black" }}> &#160;{SalesDetails.customer_first_name} {SalesDetails.customer_last_name}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Mobile No: </CLabel><CLabel style={{ color: "black" }}>&#160;{SalesDetails.customer_mobile_number}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>E-mail: </CLabel><CLabel style={{ color: "black" }}>&#160;{SalesDetails.customer_email_address}</CLabel><br />
                                                        {/* <CLabel style={{ fontWeight: "bold", color: "black" }}>Gender: {SalesDetails.customer_first_name}</CLabel><br /> */}
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Date of Birth: </CLabel><CLabel style={{ color: "black" }}>&#160;{SalesDetails.customer_date_of_birth}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Address: </CLabel><CLabel style={{ color: "black" }}>&#160;{SalesDetails.customer_address}</CLabel><br />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CCol>


                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={1} className='' style={{ backgroundColor: "#38acec", textAlign: "center", color: "white", fontSize: "12px" }}>Invoice Details</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Invoice ID: </CLabel><CLabel style={{ color: "black" }}> &#160;{SalesDetails.sale_trans_id}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{SalesDetails.sale_created_at}</CLabel><br />
                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Sale By: </CLabel><CLabel style={{ color: "black" }}> &#160;{SalesDetails.created_user_name}</CLabel><br />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CCol>

                                    {DisProd ?
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={5} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Product Information</th>
                                                    </tr>
                                                    <tr align="center" className=' fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                        <td>#</td>
                                                        <td>Particulars</td>
                                                        <td>Qty</td>
                                                        <td>Unit Price</td>
                                                        <td>Total Amount</td>
                                                    </tr>
                                                    {ProductInfo.map((info, index) => (
                                                        <tr align="center" key={index} style={{ color: "black" }}>
                                                            <td>{index + 1}</td>
                                                            <td>{info.product_name}</td>
                                                            <td>{info.sale_product_quantity}</td>
                                                            <td>{info.sale_product_unit_price}</td>
                                                            <td>{info.sale_product_total_amount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCol>
                                        : null}


                                    {DisPackage ?
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={2} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Package Details</th>
                                                    </tr>
                                                    {PackageDetails.map((Details, index) => (
                                                        <tr>
                                                            <th colSpan={2} className='' style={{ backgroundColor: "#38acec", textAlign: "center", color: "white", fontSize: "12px" }}>Type: {Details.product_type}</th>
                                                        </tr>
                                                    ))}
                                                    {PackageDetails.map((Details, index) => (
                                                        <tr key={index} style={{ color: "black" }}>
                                                            <td>
                                                                <CRow>
                                                                    <CCol xs="12" sm="6" md="6" lg="6">
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Package Name: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.product_name}</CLabel><br />
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Package Amount: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.sale_product_total_amount}</CLabel><br />

                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Start Date: </CLabel>
                                                                        {Details.sale_product_start_date !== null ?
                                                                            <CLabel style={{ color: "black" }}> &#160; {Details.sale_product_start_date.substring(0, 10).split('-').reverse().join('-')}</CLabel>
                                                                            : null
                                                                        }
                                                                        <br />


                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>End Date: </CLabel>
                                                                        {Details.sale_product_end_date !== null ?
                                                                            <CLabel style={{ color: "black" }}> &#160; {Details.sale_product_end_date.substring(0, 10).split('-').reverse().join('-')}</CLabel>
                                                                            : null
                                                                        }

                                                                        <br />
                                                                    </CCol>

                                                                    <CCol xs="12" sm="6" md="6" lg="6">
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Batch Name: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.batch_name}</CLabel><br />
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>In Time: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.sale_product_in_time}</CLabel><br />
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Out Time: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.sale_product_out_time}</CLabel><br />
                                                                        <CLabel style={{ fontWeight: "bold", color: "black" }}>Description: </CLabel><CLabel style={{ color: "black" }}> &#160; {Details.product_description}</CLabel><br />
                                                                    </CCol>
                                                                </CRow>

                                                            </td>
                                                            {/* <td>

                                                        </td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCol>
                                        : null}


                                    {DisPost ?
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colSpan={2} className='' style={{ backgroundColor: "#38acec", textAlign: "center", color: "white", fontSize: "12px" }}>Postpaid Details</th>
                                                    </tr>
                                                    {PostpaidDetails.map((PostDetails, index) => (
                                                        <tr key={index} style={{ color: "black" }}>
                                                            <td>
                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Advance Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_advance_amount}</CLabel><br />
                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Start date: </CLabel>
                                                                {PostDetails.postpaid_start_date !== null ?
                                                                    <CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_start_date.substring(0, 10).split('-').reverse().join('-')}</CLabel>
                                                                    :
                                                                    null
                                                                }
                                                                <br />

                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Bill Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_bill_date}</CLabel>

                                                                <br />
                                                            </td>
                                                            <td>
                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Last Due Date after Bill Date: </CLabel>

                                                                <CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_last_due_date_after_bill_date}</CLabel>

                                                                <br />
                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Monthly Payable Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_payable_amount}</CLabel><br />
                                                                <CLabel style={{ fontWeight: "bold", color: "black" }}>Dues Allowed for Attendance: </CLabel> <CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_dues_allowed_for_attendance}</CLabel><br />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCol>
                                        : null}

                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={5} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Payment Modes</th>
                                                </tr>
                                                <tr className=' fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                    <td>#</td>
                                                    <td>Payment Type</td>
                                                    <td>Amount</td>
                                                    <td>Reference</td>
                                                </tr>
                                                {PaymentMode.map((Mode, index) => (
                                                    <tr key={index} style={{ color: "black" }}>
                                                        <td>{index + 1}</td>
                                                        <td>{Mode.sale_payment_payment_name}</td>
                                                        <td>{Mode.sale_payment_amount}</td>
                                                        <td>{Mode.sale_payment_referance}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="6" lg="6">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={5} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Totals</th>
                                                </tr>
                                                <tr align="center" style={{ color: "black" }}>
                                                    <td>Discount Amount</td>
                                                    <td style={{ textAlign:"right" }}>{SalesDetails.sale_discount_amount}</td>
                                                </tr>
                                                {TaxList.map((list, index) => (
                                                    <tr key={index} align="center" style={{ color: "black" }}>
                                                        {/* <td>{index + 1}</td> */}
                                                        <td>{list.st_tax_name}</td>
                                                        {/* <td>{list.st_tax_prercentage}</td> */}
                                                        <td style={{ textAlign:"right" }}>{list.st_tax_amount}</td>

                                                    </tr>
                                                ))}
                                                <tr align="center" style={{ color: "black" }}>
                                                    <td className=' fontweight' style={{ fontSize: "20px" }}>Total</td>
                                                    <td className=' fontweight' style={{ fontSize: "20px", textAlign:"right" }}>{SalesDetails.sale_total_amount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CCol>

                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th colSpan={9} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Payment Balance History</th>
                                                </tr>
                                                <tr align="center" className=' fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                    <td>Paid Date</td>
                                                    <td>Paid Amount</td>
                                                    <td>Balance Amount</td>
                                                    <td>Remarks</td>
                                                    <td>Received By</td>
                                                    <td>Receive</td>
                                                </tr>
                                                {BalanceHistory.map((history, index) => (
                                                    <tr key={index} style={{ color: "black", textAlign: "center", }}>
                                                        {history.history_paid_date !== null ?
                                                            <td>
                                                                {history.history_paid_date.substring(0, 10).split('-').reverse().join('-')}
                                                            </td>
                                                            :
                                                            <td>

                                                            </td>
                                                        }
                                                        <td>{history.history_paid_amount}</td>
                                                        <td>{history.history_balance_amount}</td>
                                                        <td>{history.history_remarks}</td>
                                                        <td>{history.user_user_name}</td>
                                                        {history.history_balance_amount > 0 ?
                                                            <td>
                                                                <BalancePaymentUpdateModal
                                                                    saleid={history.history_sale_id}
                                                                    balance_amount={history.history_balance_amount}
                                                                />
                                                            </td>
                                                            : <td></td>
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}
export default SalesDetails;
