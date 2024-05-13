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
  CModalFooter,
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
import UpdateStausValidation from './UpdateStausValidation';


const PostpaidBillUpdateStatusModal = (props) => {

  const [primary, setPrimary] = useState(false);
  const [warnings, setWarnings] = useState({
    warning: ""
  });

  const [errors, setErrors] = useState({});

  const [DisInput, setDisInput] = useState(true);

  const [cookies, setCookies, removeCookie] = useCookies(['admin']);
  const config = {
    headers: {
      unique_code: cookies.unique_code,
    }
  };
  const [disablebutton1, setDisableButton1] = useState(false);
  var randomnumber1 = Math.floor(Math.random() * 100);//returns random number from 1 to 100
  const modaldata1 = randomnumber1.toString();

  const [UpdateInput, setUpdateInput] = useState({
    bill_id: props.billid,
    total_bill_amount: props.billamount,
    bill_paid_amount: "",
    bill_balance_amount: "",
    bill_balance_payable_date: "",
    loggedin_user_id: "",
    is_closing_without_payment: false,
    payment_types: [],
    packagepaidamount: ""
  });

  const {
    bill_id,
    total_bill_amount,
    bill_paid_amount,
    bill_balance_amount,
    bill_balance_payable_date,
    loggedin_user_id,
    is_closing_without_payment,
    packagepaidamount
  } = UpdateInput;

  const OnInputChange = (e) => {
    console.log(e.target.value);
    setUpdateInput({ ...UpdateInput, [e.target.name]: e.target.value });
  }

  const OnchangeBalace = (e) => {
    var balance = 0;
    balance = total_bill_amount - bill_paid_amount;
    setUpdateInput({ ...UpdateInput, ["bill_balance_amount"]: balance });
  }

  //Checkbox for is_postpaid
  const OnCheckChangeEmail = (e) => {
    console.log(e.target.checked);
    setUpdateInput({ ...UpdateInput, ["is_closing_without_payment"]: e.target.checked });

    if (e.target.checked === true) {
      setDisInput(false);
    }
    else {
      setDisInput(true)
    }
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
    // if (Show === true) {
      GetDropDown();
    // }
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
    setUpdateInput({
      ...UpdateInput,
      ["packagepaidamount"]: subtotal.toFixed(2),
    });
  }

  const OnSubmitBillPayment = async (e) => {
    e.preventDefault();
    setDisableButton1(true);
    document.getElementById("img_gif_loading_btn1").style.display = "block";
    setErrors(UpdateStausValidation(UpdateInput));
    var errorcount = Object.keys(UpdateStausValidation(UpdateInput)).length;
    if (errorcount === 0) {
      await axios.post(process.env.REACT_APP_API + "PostpaidBillUpdateStatusAndGenerateInvoice", {
        "bill_id": bill_id,
        "total_bill_amount": total_bill_amount,
        "bill_paid_amount": bill_paid_amount,
        "bill_balance_amount": bill_balance_amount,
        "bill_balance_payable_date": bill_balance_payable_date,
        "loggedin_user_id": cookies.user_id,
        "is_closing_without_payment": is_closing_without_payment,
        "payment_types": PaymentTypes
      }, config).then(response => {
        console.log(response);
        if (response.data.is_success) {
          toast.success(response.data.msg);
          setWarnings({ ["warning"]: "" });
          setDisableButton1(false);
          document.getElementById("img_gif_loading_btn1").style.display = "none";
          window.location.reload(true);
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
    else {
      setDisableButton1(false);
      document.getElementById("img_gif_loading_btn1").style.display = "none";
    }
  }

  const [Show, setShow] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setPrimary(!primary)
    setShow(true);
  }

  return (
    <CRow>
      <CCol>
        <CButton className='white btn btn-flat' style={{ width: "70px", fontSize: "13px", height: "33px", backgroundColor: "red", }} onClick={(e) => handleShow(e)}>
          Close
        </CButton>

        <CModal
          show={primary}
          onClose={() => setPrimary(!primary)}
          color="blue"
          size="md"
        >
          {/* <CModalHeader closeButton> */}
          <CModalHeader style={{ backgroundColor: "#3b3f4b", borderColor: "#3b3f4b" }}>

            <CModalTitle className=" white mt-2"><h4>Bill Payment</h4></CModalTitle>
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
                      <CCol xs="12" sm="8" md="8" lg="8" className="">
                        <CRow>
                          <CCol className="pt-1">
                            <CFormGroup>
                              <CInput placeholder="Closing without Payment"
                                type="checkbox"
                                name="is_closing_without_payment"
                                checked={is_closing_without_payment === true}
                                onChange={(e) => OnCheckChangeEmail(e)}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol className="pt-1" >
                            <CFormGroup>
                              <CLabel style={{ float: "left" }}>Close bill without payment</CLabel>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCol>

                      {DisInput ?
                        <CCol xs="12" sm="6" ms="6" lg="6">
                          <CFormGroup>
                            <CLabel>Bill ID</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Bill ID' disabled
                              name='bill_id'
                              value={bill_id}
                              onChange={(e) => OnInputChange(e)}
                            />
                          </CFormGroup>
                        </CCol>
                        : null}

                      {DisInput ?
                        <CCol xs="12" sm="6" ms="6" lg="6">
                          <CFormGroup>
                            <CLabel>Total Bill Amount</CLabel><span className="red">*</span>
                            <CInput type='text' placeholder='Total Bill Amount' disabled
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              name='total_bill_amount'
                              value={total_bill_amount}
                              onChange={(e) => OnInputChange(e)}
                            />
                          </CFormGroup>
                        </CCol>
                        : null}
                      {DisInput ?
                        <CCol xs="12" sm="6" ms="6" lg="6">
                          <CFormGroup>
                            <CLabel>Bill Paid Amount</CLabel><span className="red">*</span>
                            <CInput type='number' placeholder='Bill Paid Amount' inputmode="numeric"
                              name='bill_paid_amount'
                              pattern="[0-9]*"
                              value={bill_paid_amount}
                              onChange={(e) => OnInputChange(e)}
                              onKeyUp={(e) => OnchangeBalace(e)}
                            />
                          </CFormGroup>
                          {errors.bill_paid_amount && <p className="red">{errors.bill_paid_amount}</p>}
                        </CCol>
                        : null}
                      {DisInput ?
                        <CCol xs="12" sm="6" ms="6" lg="6">
                          <CFormGroup>
                            <CLabel>Bill Balance Amount</CLabel>
                            <CInput type='text' placeholder='Bill Balance Amount'
                              pattern="^[0-9]*[.,]?[0-9]*$" disabled
                              name='bill_balance_amount'
                              value={bill_balance_amount}
                              onChange={(e) => OnInputChange(e)}
                            />
                          </CFormGroup>
                        </CCol>
                        : null}
                      {DisInput ?
                        <CCol xs="12" sm="6" ms="6" lg="6">
                          <CFormGroup>
                            <CLabel>Balance Payable Date</CLabel>
                            <CInput type='date' placeholder='Balance Payable Date'
                              name='bill_balance_payable_date'
                              value={bill_balance_payable_date}
                              onChange={(e) => OnInputChange(e)}
                            />
                          </CFormGroup>
                        </CCol>
                        : null}
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
                          <table className='my-table-border-less'>
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

              <CCol xs="12" sm="2" md="2" lg="2"></CCol>
              <CCol xs="12" sm="8" md="8" lg="8">
                <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                  <CButton type="submit" onClick={(e) => OnSubmitBillPayment(e)} disabled={disablebutton1} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                  <img id="img_gif_loading_btn1" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
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
export default PostpaidBillUpdateStatusModal;