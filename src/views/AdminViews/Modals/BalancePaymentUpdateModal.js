import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CInput,
    CForm, CSelect, CRow, CLabel, CFormGroup
} from '@coreui/react'
import { toast } from 'react-toastify';

const BalancePaymentUpdateModal = (props) => {

    const [Show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setPrimary(!primary)
        setShow(true);
    }
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

    const [disablebutton4, setDisableButton4] = useState(false);
    var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
    const modaldata1 = randomnumber1.toString();
    //console.log("Rem Bal " + props.balance_amount)

    const [BalanceUpdateInput, setBalanceUpdateInput] = useState({
        sale_id: props.saleid,
        rem_balance_amount: props.balance_amount,
        paid_amount: props.balance_amount,
        paying_amount: "",
        package_paid_amount: "",
        balance_amount: "",
        balance_payable_date: "",
        loggedin_user_id: "",
        payment_types: []
    });

    const {
        sale_id,
        rem_balance_amount,
        paying_amount,
        paid_amount,
        package_paid_amount,
        balance_amount,
        balance_payable_date,
        loggedin_user_id,
        payment_types
    } = BalanceUpdateInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setBalanceUpdateInput({ ...BalanceUpdateInput, [e.target.name]: e.target.value });
    }

    const OnchangeBalace = (e) => {
        var balance = 0;
        balance = paid_amount - paying_amount;
        setBalanceUpdateInput({ ...BalanceUpdateInput, ["balance_amount"]: balance });
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

    useEffect(() => {
        if (Show === true) {
            GetDropDown();
        }
    }, [Show]);

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
        setBalanceUpdateInput({
            ...BalanceUpdateInput,
            ["package_paid_amount"]: subtotal.toFixed(2),
        });
    }

    const OnSubmitBalanceUpdate = async (e) => {
        e.preventDefault();
        setDisableButton4(true);
        document.getElementById("img_gif_loading_btn4").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "SalesUpdateForBalancePaymnet", {
            "sale_id": sale_id,
            "paying_amount": paying_amount,
            "balance_amount": balance_amount,
            "balance_payable_date": balance_payable_date,
            "loggedin_user_id": cookies.user_id,
            "payment_types": PaymentTypes
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
                window.location.reload(true);
            }
            else {
                setWarnings({ ["warning"]: response.data.msg });
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
                setDisableButton4(false);
                document.getElementById("img_gif_loading_btn4").style.display = "none";
            })
    }
    return (
        <CRow>
            <CCol>
                <CButton className=' btn btn-sm white' style={{ width: "70%", fontSize: "13px", alignItems: "center", backgroundColor: "#299617" }} onClick={(e) => handleShow(e)}>
                    Receive
                </CButton>

                <CModal
                    show={primary}
                    onClose={() => setPrimary(!primary)}
                    color="blue"
                    size="md"
                >
                    {/* <CModalHeader closeButton> */}
                    <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

                        <CModalTitle className=" white mt-2"><h4>Balance Payment</h4></CModalTitle>
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
                                        <CRow>
                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Remaining Balance Amount</CLabel>
                                                    <CInput type='text' placeholder='Remaining Balance Amount' disabled
                                                        name='paid_amount'
                                                        value={paid_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Paying Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' placeholder='Paying Amount'
                                                        pattern="^[0-9]*[.,]?[0-9]*$"
                                                        name='paying_amount'
                                                        value={paying_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                        onKeyUp={(e) => OnchangeBalace(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Balance Amount</CLabel>
                                                    <CInput type='text' placeholder='Balance Amount'
                                                        pattern="^[0-9]*[.,]?[0-9]*$" disabled
                                                        name='balance_amount'
                                                        value={balance_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="6" ms="6" lg="6">
                                                <CFormGroup>
                                                    <CLabel>Payable Date</CLabel>
                                                    <CInput type='date' placeholder='Payable Date'
                                                        name='balance_payable_date'
                                                        value={balance_payable_date}
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
                                                    name='package_paid_amount'
                                                    pattern="^\d*(\.\d{0,2})?$"
                                                    value={package_paid_amount}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>

                            <CCol xs="12" sm="2" md="2" lg="2"></CCol>
                            <CCol xs="12" sm="8" md="8" lg="8">
                                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                    <CButton type="submit" onClick={(e) => OnSubmitBalanceUpdate(e)} disabled={disablebutton4} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                    <img id="img_gif_loading_btn4" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default BalancePaymentUpdateModal;