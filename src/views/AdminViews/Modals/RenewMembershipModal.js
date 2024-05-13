import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CTextarea,
    CModalHeader,
    CModalTitle,
    CInput,
    CForm,
    CSelect,
    CRow,
    CLabel,
    CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import RenewMembershipValidation from './RenewMembershipValidation';


const MembershipRenewalModal = (props) => {

    const [primary, setPrimary] = useState(false);
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [errors, setErrors] = useState({});

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };
    const [disablebutton2, setDisableButton2] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();

    const [RenewalInput, setRenewalInput] = useState({
        member_id: "",
        product_type: "",
        member_product_id: "",
        member_product_start_date: "",
        member_product_end_date: "",
        sale_date: "",
        member_remarks: "",
        packagepaidamount,
        payment_types: [],
        package_discount_percentage: "",
        package_discount_amount: "",
        package_payable_amount: "",
        package_amount: "",
        package_paid_amount: "",
        package_balance_amount: "",
        package_balance_payable_date: "",
        is_send_invoice_via_whats_app: true,
        is_send_invoice_via_email: true,
        loggedin_user_id: ""
    });

    const {
        member_id,
        product_type,
        member_product_id,
        member_product_start_date,
        member_product_end_date,
        member_remarks,
        packagepaidamount,
        sale_date,
        payment_types,
        package_discount_percentage,
        package_discount_amount,
        package_payable_amount,
        package_amount,
        package_paid_amount,
        package_balance_amount,
        package_balance_payable_date,
        is_send_invoice_via_whats_app,
        is_send_invoice_via_email,
        loggedin_user_id
    } = RenewalInput;


    const OnInputChange = (e) => {
        console.log(e.target.value);
        setRenewalInput({ ...RenewalInput, [e.target.name]: e.target.value });
    }
    const OnchangeBalace = (e) => {
        var balance = 0;
        balance = package_payable_amount - package_paid_amount;
        setRenewalInput({ ...RenewalInput, ["package_balance_amount"]: balance });
    }
    const [ProductDropdowns, setProductDropdowns] = useState([]);

    const ProductPackageList = async () => {
        await axios.post(process.env.REACT_APP_API + "ProductPackageList", {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.product_package_list.length !== null) {
                    let ddlist = [];
                    for (let d = 0; d < response.data.product_package_list.length; d++) {
                        var dd_list = response.data.product_package_list[d];
                        console.log("dd_list" + dd_list);
                        ddlist.push({ "value": dd_list.product_id, "label": dd_list.product_name, "price": dd_list.product_sale_price, "type": dd_list.product_type, "days": dd_list.product_number_of_days });
                    }
                    setProductDropdowns(ddlist);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }


    const onChangeProductdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        var Days;
        if (e.days) {
            const d = new Date();
            //console.log(d.toLocaleDateString());
            const month = d.getDate();
            d.setDate(d.getDate() + e.days);
            while (d.getDate() === month) {
                d.setDate(d.getDate() - 1);
            }
            console.log(e.days)
            var Days = d.toISOString().slice(0, 10)
            console.log(e.days + Days);
            setRenewalInput({ ...RenewalInput, ["member_product_end_date"]: Days, })
        }

        setRenewalInput({ ...RenewalInput, ["member_product_id"]: e.value, ["package_amount"]: e.price, ["product_type"]: e.type, ["package_payable_amount"]: e.price, ["member_product_end_date"]: Days });
    };
    // const onChangeProductdropdown = (e) => {
    //     console.warn(e.value);//here i will get the specific selected value
    //     console.warn(e.label);
    //     var Days;
    //     if (e.days) {
    //         const d = new Date();
    //         //console.log(d.toLocaleDateString());
    //         const month = d.getDate();
    //         d.setDate(d.getDate() + e.days);
    //         while (d.getDate() === month) {
    //             d.setDate(d.getDate() - 1);
    //         }
    //         console.log(e.days)
    //         var Days = d.toISOString().slice(0, 10)
    //         console.log(e.days + Days);
    //         setRenewalInput({ ...RenewalInput, ["member_product_end_date"]: Days, })
    //     }
    //     setRenewalInput({ ...RenewalInput, ["member_product_id"]: e.value, ["package_amount"]: e.price, ["product_type"]: e.type });
    // };

    //Checkbox for is_postpaid
    const OnCheckChangeWhasApp = (e) => {
        console.log(e.target.checked);
        setRenewalInput({ ...RenewalInput, ["is_send_invoice_via_whats_app"]: e.target.checked });

    }

    //Checkbox for is_postpaid
    const OnCheckChangeEmail = (e) => {
        console.log(e.target.checked);
        setRenewalInput({ ...RenewalInput, ["is_send_invoice_via_email"]: e.target.checked });

    }

    const [PaymentTypes, setPaymentTypes] = useState([]);

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_PAYMENT_TYPES_SETUP", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_PAYMENT_TYPES_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "payment_type_id": dd_list.each_drop_down_list[sd].dd_id, "sale_payment_name": dd_list.each_drop_down_list[sd].dd_name, "sale_payment_amount": "", "sale_payment_reference": "" })
                            // setPaymentTypes([...PaymentTypes, {
                            //     "payment_type_id": dd_list.each_drop_down_list[sd].dd_id,
                            //     "sale_payment_name": dd_list.each_drop_down_list[sd].dd_name
                            // }])
                        }
                        setPaymentTypes(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    // useEffect(() => {
    //     if (Show === true) {
    //         GetDropDown();
    //     }
    // }, [Show]);
    useEffect(() => {
        GetDropDown();
        ProductPackageList();
    }, []);

    var subtotal = 0;

    const OnChangePayment = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);
        var temp_Inventory_List = [...PaymentTypes];

        temp_Inventory_List[index][e.target.name] = e.target.value;
        //setProblemImmediateListAdd([]); 
        setPaymentTypes(temp_Inventory_List);

        //var subtotal = 0;
        var values = [...PaymentTypes];
        for (let j = 0; j < values.length; j++) {
            if (values[j].sale_payment_amount != "") {
                subtotal += parseFloat(values[j].sale_payment_amount);
            }
        }
        setRenewalInput({
            ...RenewalInput,
            ["packagepaidamount"]: subtotal.toFixed(2),
        });
    }

    useEffect(() => {
        if (RenewalInput.member_product_start_date === "") {
            var todaysdate = new Date();
            var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
            setRenewalInput({ ...RenewalInput, ["member_product_start_date"]: todays_date, ["sale_date"]: todays_date });
            //console.log(todays_date);
        }
    }, [RenewalInput.member_product_start_date === ""]);

    const OnSubmitRenewalMember = async (e) => {
        e.preventDefault();
        setDisableButton2(true);
        document.getElementById("img_gif_loading_btn2").style.display = "block";
        setErrors(RenewMembershipValidation(RenewalInput));
        var errorcount = Object.keys(RenewMembershipValidation(RenewalInput)).length;
        if (errorcount === 0) {
            if (package_paid_amount <= package_payable_amount) {
                if (packagepaidamount != parseFloat(package_paid_amount).toFixed(2)) {
                    toast.warn("Amount doesn't matched with payments");
                    setDisableButton2(false);
                    document.getElementById("img_gif_loading_btn2").style.display = "none";
                }
                else {
                    await axios.post(process.env.REACT_APP_API + "MemberRenewMembership", {
                        "member_id": props.memid,
                        "sale_date": sale_date,
                        "member_product_id": member_product_id,
                        "member_product_start_date": member_product_start_date,
                        "member_product_end_date": member_product_end_date,
                        "member_remarks": member_remarks,
                        "payment_types": PaymentTypes,
                        "package_amount": package_amount,
                        "package_discount_percentage": package_discount_percentage,
                        "package_discount_amount": package_discount_amount,
                        "package_payable_amount": package_payable_amount,
                        "package_paid_amount": package_paid_amount,
                        "package_balance_amount": package_balance_amount,
                        "package_balance_payable_date": package_balance_payable_date,
                        "is_send_invoice_via_whats_app": is_send_invoice_via_whats_app,
                        "is_send_invoice_via_email": is_send_invoice_via_email,
                        "loggedin_user_id": cookies.user_id
                    }, config).then(response => {
                        console.log(response);
                        if (response.data.is_success) {
                            toast.success(response.data.msg);
                            setWarnings({ ["warning"]: "" });
                            setDisableButton2(false);
                            document.getElementById("img_gif_loading_btn2").style.display = "none";
                            window.location.reload(true);
                        }
                        else {
                            setWarnings({ ["warning"]: response.data.msg });
                            setDisableButton2(false);
                            document.getElementById("img_gif_loading_btn2").style.display = "none";
                        }
                    }).catch(
                        error => {
                            console.log(error);
                            alert(error.message);
                            setDisableButton2(false);
                            document.getElementById("img_gif_loading_btn2").style.display = "none";
                        })
                }

            }
            else {
                toast.warn("Paid Amount must be Less or equal Payable amount");
                setDisableButton2(false);
                document.getElementById("img_gif_loading_btn2").style.display = "none";
            }

        }
        else {
            setDisableButton2(false);
            document.getElementById("img_gif_loading_btn2").style.display = "none";
        }
    }

    const [Show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow(true);
    }

    const OnchangeDiscount = (e) => {
        var Discount = 0, DiscountAmount = 0, PayableAmount = 0;
        Discount = package_discount_percentage / 100;

        console.log(Discount)
        DiscountAmount = (package_amount * Discount)

        PayableAmount = (package_amount - DiscountAmount)

        setRenewalInput({ ...RenewalInput, ["package_discount_amount"]: DiscountAmount, ["package_payable_amount"]: PayableAmount });
    }


    const OnchangePercentage = (e) => {
        var Discount = 0, DiscountAmount = 0, PayableAmount = 0, Balance = 0;

        Discount = ((package_discount_amount / package_amount) * 100).toFixed(2);
        PayableAmount = (package_amount - package_discount_amount)

        if (package_discount_amount === "") {
            Balance = (package_balance_amount - package_discount_amount);
        }


        console.log("Discount Percetage: " + Discount);
        console.log("Payable Amount: " + PayableAmount);
        console.log("Balance Amount: " + Balance);

        setRenewalInput({ ...RenewalInput, ["package_discount_percentage"]: Discount, ["package_payable_amount"]: PayableAmount, ["package_balance_amount"]: Balance });
    }
    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm bgblue white width100' style={{ fontSize: "13px" }} onClick={(e) => handleShow(e)}>
                    Renew/Update
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="lg"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Renew Membership</h4></CModalTitle>
                        <CButton className="btn  white" onClick={() => setPrimary(!primary)}>
                            <h5><i className=" fa fa-close" aria-hidden="true"
                            ></i></h5>
                        </CButton>
                    </CModalHeader>
                    <CModalBody >
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Package</CLabel><span className="red">*</span>
                                                    <Select value={ProductDropdowns.filter(function (option) {
                                                        return option.value === member_product_id;
                                                    })}
                                                        options={ProductDropdowns}
                                                        onChange={(e) => onChangeProductdropdown(e, "member_product_id")}
                                                    >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Type</CLabel><span className="red">*</span>
                                                    <CInput type='text' disabled
                                                        placeholder='Type'
                                                        name='product_type'
                                                        value={product_type}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Package Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text'
                                                        placeholder='Enter Package Amount'
                                                        pattern="^\d*(\.\d{0,2})?$"
                                                        name='package_amount'
                                                        value={package_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Discount In Percentage(%)</CLabel><span className="red">*</span>
                                                    <CInput type='text'
                                                        placeholder='Discount In Percentage'
                                                        pattern="^\d+(\.\d{2})?$"
                                                        name='package_discount_percentage'
                                                        value={package_discount_percentage}
                                                        onChange={(e) => OnInputChange(e)}
                                                        onKeyUp={(e) => OnchangeDiscount(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Discount in Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text'
                                                        placeholder='Enter Discount in Amount'
                                                        pattern="^\d+(\.\d{2})?$"
                                                        name='package_discount_amount'
                                                        value={package_discount_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                        onKeyUp={(e) => OnchangePercentage(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Payable Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' disabled
                                                        placeholder='Enter Payable Amount'
                                                        pattern="^\d+(\.\d{2})?$"
                                                        name='package_payable_amount'
                                                        value={package_payable_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Paid Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' placeholder='Paid Amount'
                                                        name='package_paid_amount'
                                                        //pattern="^\d*(\.\d{0,2})?$"
                                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                                        value={package_paid_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                        onKeyUp={(e) => OnchangeBalace(e)}
                                                    />
                                                </CFormGroup>
                                                {errors.package_paid_amount && <p className="red">{errors.package_paid_amount}</p>}
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Start Date</CLabel><span className="red">*</span>
                                                    <CInput type='date'
                                                        placeholder='Enter Start Date'
                                                        name='member_product_start_date'
                                                        value={member_product_start_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>End Date</CLabel><span className="red">*</span>
                                                    <CInput type='date'
                                                        placeholder='Enter End Date'
                                                        name='member_product_end_date'
                                                        value={member_product_end_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Balance Amount</CLabel>
                                                    <CInput type='text' placeholder='Enter Balance Amount'
                                                        //pattern="^\d*(\.\d{0,2})?$"
                                                        pattern="^[0-9]*[.,]?[0-9]*$" disabled
                                                        name='package_balance_amount'
                                                        value={package_balance_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                                {/* {errors.package_balance_amount && <p className="red">{errors.package_balance_amount}</p>} */}
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Balance Payable Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Balance Payable Date'
                                                        name='package_balance_payable_date'
                                                        value={package_balance_payable_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" ms="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Sale Date</CLabel><span className="red">*</span>
                                                    <CInput type='date'
                                                        placeholder='Enter Sale Date'
                                                        name='sale_date'
                                                        value={sale_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h5>Payment Details</h5>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <div className=''>
                                                    <table className='my-table-border'>
                                                        <tbody>
                                                            {PaymentTypes.map((Type, index) => (
                                                                <tr key={index}>
                                                                    <td>{Type.sale_payment_name}</td>
                                                                    <td>
                                                                        <CInput type='text' placeholder='Payment Amount'
                                                                            name='sale_payment_amount'
                                                                            pattern="^\d*(\.\d{0,2})?$"
                                                                            value={Type.sale_payment_amount}
                                                                            onChange={(e) => OnChangePayment(e, index)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <CInput type='text' placeholder='Payment Reference'
                                                                            name='sale_payment_reference'
                                                                            value={Type.sale_payment_reference}
                                                                            onChange={(e) => OnChangePayment(e, index)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CRow>

                                        <CRow>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CLabel>Total Paying</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Total Paying' disabled
                                                    name='packagepaidamount'
                                                    pattern="^\d*(\.\d{0,2})?$"
                                                    value={packagepaidamount}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs="12" sm="12" md="12" lg="12" className="pt-1">
                                                <CFormGroup>
                                                    <CLabel>Remarks</CLabel>
                                                    <CTextarea type='text' placeholder='Remarks...'
                                                        name="member_remarks" value={member_remarks}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" md="6" lg="6" className="pt-1">
                                                <CRow>
                                                    <CCol sm="6" md="6" lg="7" className="pt-3" >
                                                        <CFormGroup>
                                                            <CLabel>Send Invoice via WhatsApp</CLabel>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol className="pt-3">
                                                        <CFormGroup>
                                                            <CInput style={{ width: "20%" }} placeholder="Send Invoice via WhatsApp"
                                                                type="checkbox"
                                                                name="is_send_invoice_via_whats_app"
                                                                checked={is_send_invoice_via_whats_app === true}
                                                                onChange={(e) => OnCheckChangeWhasApp(e)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                            </CCol>

                                            <CCol xs="12" sm="6" md="6" lg="6" className="pt-1">
                                                <CRow>
                                                    <CCol sm="6" md="6" lg="7" className="pt-3" >
                                                        <CFormGroup>
                                                            <CLabel>Send Invoice via Email</CLabel>
                                                        </CFormGroup>
                                                    </CCol>
                                                    <CCol className="pt-3">
                                                        <CFormGroup>
                                                            <CInput style={{ width: "20%" }} placeholder="Send Invoice via Email"
                                                                type="checkbox"
                                                                name="is_send_invoice_via_email"
                                                                checked={is_send_invoice_via_email === true}
                                                                onChange={(e) => OnCheckChangeEmail(e)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>
                                                </CRow>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>

                            <CCol xs="12" sm="4" md="4" lg="4"></CCol>
                            <CCol xs="12" sm="4" md="4" lg="4">
                                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnSubmitRenewalMember(e)} disabled={disablebutton2} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                    <img id="img_gif_loading_btn2" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default MembershipRenewalModal;