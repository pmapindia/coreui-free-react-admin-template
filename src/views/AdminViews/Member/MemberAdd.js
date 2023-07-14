import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCallout, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import axios from 'axios';
import { post } from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import SourceModal from '../Modals/SourceModal';

const AddNewMember = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [PaymentDropdowns, setPaymentDropdowns] = useState([]);
    const [TaxGroupDropdowns, setTaxGroupDropdowns] = useState([]);
    const [BatchDropdowns, setBatchDropdowns] = useState([]);
    const [ProductDropdowns, setProductDropdowns] = useState([]);
    const [PrimaryDropdowns, setPrimaryDropdowns] = useState([]);
    const [SecondaryDropdowns, setSecondaryDropdowns] = useState([]);
    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [BranchDropdowns, setBranchDropdowns] = useState([]);
    const [CustomerDropdowns, setCustomerDropdowns] = useState([]);
    const [SourceDropdowns, setSourceDropdowns] = useState([]);
    const [PaymentTypes, setPaymentTypes] = useState([]);
    const [MemberHealth, setMemberHealth] = useState([]);
    const [MemberHealthList, setMemberHealthList] = useState([]);
    const [KYCDetails, setKYCDetails] = useState([
        {
            kyc_name: "",
            kyc_number: "",
            kyc_filename: ""
        }
    ]);

    const [CustDetails, setCustDetails] = useState({});

    const [PictureDis, setPictureDis] = useState(false);

    const [SearchText, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = SearchText;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadCustDetails();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...SearchText, [e.target.name]: "" });
        } else {
            setSearchText({ ...SearchText, [e.target.name]: e.target.value });
        }
    }

    const LoadCustDetails = async () => {
        var list = {};
        list["customer_mobile_number"] = search_text;

        await axios.post(process.env.REACT_APP_API + "GetCustomerDetailsByMobileNumber", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var CustomerDetails = [], BirthDate, Time;
                if (response.data.customer_details !== null) {
                    setPictureDis(true);
                    if (response.data.customer_details.customer_date_of_birth !== null) {
                        var date = response.data.customer_details.customer_date_of_birth
                        BirthDate = date.substring(0, 10);
                    }
                    else {
                        BirthDate = response.data.customer_details.customer_date_of_birth;
                    }

                    setMemberAddInput({
                        "customer_branch_id": response.data.customer_details.customer_branch_id,
                        "customer_first_name": response.data.customer_details.customer_first_name,
                        "customer_last_name": response.data.customer_details.customer_last_name,
                        "customer_mobile_number": response.data.customer_details.customer_mobile_number,
                        "customer_alternative_mobile": response.data.customer_details.customer_alternative_mobile,
                        "customer_email_address": response.data.customer_details.customer_email_address,
                        "customer_address": response.data.customer_details.customer_address,
                        "customer_gender": response.data.customer_details.customer_gender,
                        "customer_date_of_birth": BirthDate,
                        "customer_referred_by": response.data.customer_details.customer_referred_by,
                        "customer_source_id": response.data.customer_details.customer_source_id,
                        "customer_photo": response.data.customer_details.customer_photo,
                    });
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const [MemberAddInput, setMemberAddInput] = useState({
        customer_branch_id: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_mobile_number: "",
        customer_alternative_mobile: "",
        customer_email_address: "",
        customer_address: "",
        customer_gender: "",
        customer_date_of_birth: "",
        customer_referred_by: "",
        customer_source_id: "",
        loggedin_user_id: cookies.user_id,
        customer_photo: "",
        is_prepaid: "",
        is_postpaid: "",
        product_id: "",
        member_product_id: "",
        member_product_start_date: "",
        member_product_end_date: "",
        member_batch_id: "",
        member_in_time: "",
        member_out_time: "",
        member_remarks: "",
        member_primary_goal_id: "",
        member_secondary_goal_id: "",
        package_amount: "",
        package_paid_amount: "",
        package_balance_amount: "",
        package_balance_payable_date: "",
        postpaid_advance_amount: "",
        postpaid_tax_group_id: "",
        postpaid_start_date: "",
        postpaid_monthly_bill_date: "",
        postpaid_last_due_date_after_bill_date: "",
        postpaid_monthly_payable_amount: "",
        postpaid_dues_allowed_for_attendance: "",
        member_health_list: [],
        payment_types: [],
        info_level_of_physical_activity: "",
        info_stress_in_job: "",
        info_occupation: "",
        info_avg_hours_of_sleep: "",
        info_quality_of_sleep: "",
        info_time_of_sleep: "",
        member_kyc_list: [],
        is_send_invoice_via_whats_app: false,
        is_send_invoice_via_email: false
    });

    const {
        customer_branch_id,
        customer_first_name,
        customer_last_name,
        customer_mobile_number,
        customer_alternative_mobile,
        customer_email_address,
        customer_address,
        customer_gender,
        customer_date_of_birth,
        customer_referred_by,
        customer_source_id,
        loggedin_user_id,
        customer_photo,
        is_prepaid,
        is_postpaid,
        product_id,
        member_product_id,
        member_product_start_date,
        member_product_end_date,
        member_batch_id,
        member_in_time,
        member_out_time,
        member_remarks,
        member_primary_goal_id,
        member_secondary_goal_id,
        package_amount,
        package_paid_amount,
        package_balance_amount,
        package_balance_payable_date,
        postpaid_advance_amount,
        postpaid_tax_group_id,
        postpaid_start_date,
        postpaid_monthly_bill_date,
        postpaid_last_due_date_after_bill_date,
        postpaid_monthly_payable_amount,
        postpaid_dues_allowed_for_attendance,
        member_health_list,
        payment_types,
        info_level_of_physical_activity,
        info_stress_in_job,
        info_occupation,
        info_avg_hours_of_sleep,
        info_quality_of_sleep,
        info_time_of_sleep,
        member_kyc_list,
        is_send_invoice_via_whats_app,
        is_send_invoice_via_email
    } = MemberAddInput;

    const [DisPre, setDisPre] = useState(false);

    //Checkbox for is_postpaid
    const OnCheckPrepaidChange = (e) => {
        console.log(e.target.checked);
        setMemberAddInput({ ...MemberAddInput, ["is_prepaid"]: e.target.checked });

        if (e.target.checked === true) {
            setDisPre(true);
        }
        else {
            setDisPre(false);
        }
    }

    const [DisPost, setDisPost] = useState(false);

    //Checkbox for is_postpaid
    const OnCheckPostChange = (e) => {
        console.log(e.target.checked);
        setMemberAddInput({ ...MemberAddInput, ["is_postpaid"]: e.target.checked });

        if (e.target.checked === true) {
            setDisPost(true);
        }
        else {
            setDisPost(false);
        }
    }

    //Checkbox for is_postpaid
    const OnCheckChangeWhasApp = (e) => {
        console.log(e.target.checked);
        setMemberAddInput({ ...MemberAddInput, ["is_send_invoice_via_whats_app"]: e.target.checked });

    }

    //Checkbox for is_postpaid
    const OnCheckChangeEmail = (e) => {
        console.log(e.target.checked);
        setMemberAddInput({ ...MemberAddInput, ["is_send_invoice_via_email"]: e.target.checked });

    }

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setMemberAddInput({ ...MemberAddInput, [e.target.name]: e.target.value });

        if (e.target.value === "yes") {
            setDisPost(true);
            setDisPre(false);
            setMemberAddInput({ ...MemberAddInput, ["is_post"]: true });
        }
        if (e.target.value === "no") {
            setDisPre(true);
            setDisPost(false);
            setMemberAddInput({ ...MemberAddInput, ["is_post"]: false });
        }
    }

    //Upload Logo
    const [image_warnings, setImageWarnings] = useState({
        image_warning: ""
    });

    var image = "";
    const onChangePicture = (e) => {
        console.log("jkfjjfjfg");
        console.log(e.target.name);
        if (e.target.files[0]) {

            var b = e.target.files[0].name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                var b = reader.result;
                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;
                UploadImage(image, image_name);
                console.log("Customer image");
                //console.log(image);  
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage = async (customer_photo, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = customer_photo;
        list["image_for"] = "CUSTOMER";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setMemberAddInput({ ...MemberAddInput, ["customer_photo"]: response.data.image_name });
            }
            else {
                setImageWarnings({ ["image_warning"]: response.data.msg });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Remove images
    const Removeimagefront = (customerphoto) => {
        // alert(propertycoverimage);
        setMemberAddInput({ ...MemberAddInput, [customerphoto]: "" });
        setPictureDis(false);
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" },
                { "dropdown_type": "DD_ENQUIRY_SOURCES", "dropdown_filter": "" },
                { "dropdown_type": "DD_CUSTOMER", "dropdown_filter": "" },
                { "dropdown_type": "DD_TAX_GROUPS", "dropdown_filter": "" },
                { "dropdown_type": "DD_BATCHES", "dropdown_filter": "" },
                //{ "dropdown_type": "DD_PRODUCT_PACKAGE", "dropdown_filter": "" },
                { "dropdown_type": "DD_PAYMENT_TYPES_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_MEMBER_PRIMARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_MEMBER_SECONDARY_GOALS_SETUP", "dropdown_filter": "" },
                { "dropdown_type": "DD_MEMBER_HEALTH_SETUP", "dropdown_filter": "" },
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

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_ENQUIRY_SOURCES") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setSourceDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CUSTOMER") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCustomerDropdowns(ddlist);
                    }
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_TAX_GROUPS") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setTaxGroupDropdowns(ddlist);
                    }

                    // if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_PRODUCT_PACKAGE") {
                    //     let ddlist = [];
                    //     for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                    //         ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                    //     }
                    //     setProductDropdowns(ddlist);
                    // }
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BATCHES") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setBatchDropdowns(ddlist);
                    }

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
                        setPaymentDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_HEALTH_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "mh_health_id": dd_list.each_drop_down_list[sd].dd_id, "mh_health_name": dd_list.each_drop_down_list[sd].dd_name, "mh_value": "" })
                            // setPaymentTypes([...PaymentTypes, {
                            //     "payment_type_id": dd_list.each_drop_down_list[sd].dd_id,
                            //     "sale_payment_name": dd_list.each_drop_down_list[sd].dd_name
                            // }])
                        }
                        setMemberHealthList(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_PRIMARY_GOALS_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setPrimaryDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_MEMBER_SECONDARY_GOALS_SETUP") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name });
                        }
                        setSecondaryDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const OnChangePayment = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);
        var temp_Inventory_List = [...PaymentTypes];

        temp_Inventory_List[index][e.target.name] = e.target.value;
        //setProblemImmediateListAdd([]); 
        setPaymentTypes(temp_Inventory_List);

        var subtotal = 0;
        var values = [...PaymentTypes];
        for (let j = 0; j < values.length; j++) {
            if (values[j].sale_payment_amount != "") {
                subtotal += parseFloat(values[j].sale_payment_amount);
            }
        }
        setMemberAddInput({
            ...MemberAddInput,
            ["package_paid_amount"]: subtotal.toFixed(2),
        });

    }

    const OnParameterInputChange = (e, index, pid) => {
        console.log(index, e.target.name, e.target.checked, e.target.id,);

        for (let k = 0; k < MemberHealthList.length; k++) {
            if (MemberHealthList[k].mh_health_id === pid) {
                if (e.target.id === "yes") {
                    let values = [...MemberHealthList];

                    values[k]["mh_value"] = true;
                    setMemberHealthList(values);
                }

                if (e.target.id === "no") {
                    let values = [...MemberHealthList];

                    values[k]["mh_value"] = false;
                    setMemberHealthList(values);
                }
            }
        }


    }

    const OnInputKYCChange = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);
        var temp_Inventory_List = [...KYCDetails];

        temp_Inventory_List[index][e.target.name] = e.target.value;
        //setProblemImmediateListAdd([]); 
        setKYCDetails(temp_Inventory_List);

    }

    const AddKYCRow = () => {
        var tablearray = [];
        setKYCDetails([...KYCDetails, {
            ["kyc_name"]: "",
            ["kyc_number"]: "",
            ["kyc_filename"]: ""
        }
        ]);
    }
    const RemoveKYCRow = (index) => {
        let values = [...KYCDetails];
        values.splice(index, 1);
        setKYCDetails(values);
    }

    const onChangePridropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemberAddInput({ ...MemberAddInput, ["member_primary_goal_id"]: e.value });
    }

    const onChangeSecdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setMemberAddInput({ ...MemberAddInput, ["member_secondary_goal_id"]: e.value });
    }

    const onChangedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMemberAddInput({ ...MemberAddInput, ["customer_branch_id"]: e.value });
    };

    const onChangeCustdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMemberAddInput({ ...MemberAddInput, ["customer_referred_by"]: e.value });
    };

    const onChangeSourcedropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMemberAddInput({ ...MemberAddInput, ["customer_source_id"]: e.value });
    };

    const onChangeTaxdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMemberAddInput({ ...MemberAddInput, ["postpaid_tax_group_id"]: e.value });
    };

    const ProductPackageList = async () => {
        await axios.post(process.env.REACT_APP_API + "ProductPackageList", {}, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.product_list.length !== null) {
                    let ddlist = [];
                    for (let d = 0; d < response.data.product_list.length; d++) {
                        var dd_list = response.data.product_list[d];
                        console.log("dd_list" + dd_list);
                        ddlist.push({ "value": dd_list.product_id, "label": dd_list.product_name, "price": dd_list.product_sale_price, });
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

        setMemberAddInput({ ...MemberAddInput, ["member_product_id"]: e.value, ["package_amount"]: e.price });
    };

    const onChangeBatchdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setMemberAddInput({ ...MemberAddInput, ["member_batch_id"]: e.value });
    };

    // const onChangePaydropdown= (e) => {
    //     // alert(e);here i will get the object
    //     console.warn(e.value);//here i will get the specific selected value
    // }

    useEffect(() => {
        ProductPackageList();
        GetDropDown();
    }, []);

    // useEffect(() => {
    //     if (product_id !== "") {
    //         LoadProductDetails()
    //     }
    // }, [product_id]);

    const LoadProductDetails = async (product_id) => {
        var list = {};
        list["product_id"] = product_id;

        await axios.post(process.env.REACT_APP_API + "ProductDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setMemberAddInput({
                    "package_amount": response.data.product_details.product_mrp
                })
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    //Upload KYC Document
    const [files, setFiles] = useState({
        file: "",
    });

    const setFile = (e) => {
        setFiles({ ...files, ["file"]: e.target.files[0] });
    }
    const SubmitDocument = async (e) => {
        e.preventDefault();
        var documentarray = [];
        var filefor = "CUSTOMER"
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

                setKYCDetails([...KYCDetails, { ["kyc_filename"]: response.data.file_name }]);
            }
            else {
                toast.error(response.data.msg);
            }
        });

    }

    const OnSubmitMember = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "MemberAdd", {
            "customer_branch_id": customer_branch_id,
            "customer_first_name": customer_first_name,
            "customer_last_name": customer_last_name,
            "customer_mobile_number": customer_mobile_number,
            "customer_alternative_mobile": customer_alternative_mobile,
            "customer_email_address": customer_email_address,
            "customer_address": customer_address,
            "customer_gender": customer_gender,
            "customer_date_of_birth": customer_date_of_birth,
            "customer_referred_by": customer_referred_by,
            "customer_source_id": customer_source_id,
            "loggedin_user_id": loggedin_user_id,
            "customer_photo": customer_photo,
            "is_postpaid": is_postpaid,
            "member_product_id": member_product_id,
            "member_product_start_date": member_product_start_date,
            "member_product_end_date": member_product_end_date,
            "member_batch_id": member_batch_id,
            "member_in_time": member_in_time,
            "member_out_time": member_out_time,
            "member_remarks": member_remarks,
            "member_primary_goal_id": member_primary_goal_id,
            "member_secondary_goal_id": member_secondary_goal_id,
            "package_amount": package_amount,
            "package_paid_amount": package_paid_amount,
            "package_balance_amount": package_balance_amount,
            "package_balance_payable_date": package_balance_payable_date,
            "postpaid_advance_amount": postpaid_advance_amount,
            "postpaid_tax_group_id": postpaid_tax_group_id,
            "postpaid_start_date": postpaid_start_date,
            "postpaid_monthly_bill_date": postpaid_monthly_bill_date,
            "postpaid_last_due_date_after_bill_date": postpaid_last_due_date_after_bill_date,
            "postpaid_monthly_payable_amount": postpaid_monthly_payable_amount,
            "postpaid_dues_allowed_for_attendance": postpaid_dues_allowed_for_attendance,
            "member_health_list": MemberHealthList,
            "payment_types": PaymentTypes,
            "info_level_of_physical_activity": info_level_of_physical_activity,
            "info_stress_in_job": info_stress_in_job,
            "info_occupation": info_occupation,
            "info_avg_hours_of_sleep": info_avg_hours_of_sleep,
            "info_quality_of_sleep": info_quality_of_sleep,
            "info_time_of_sleep": info_time_of_sleep,
            "member_kyc_list": KYCDetails,
            "is_send_invoice_via_whats_app": is_send_invoice_via_whats_app,
            "is_send_invoice_via_email": is_send_invoice_via_email
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                // history.push(`/customerlist`);
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
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                {props.location.pfid != null ? <h4>Update Member</h4>
                    :
                    <h4>Add New Member</h4>
                }
                <hr className="bgcolor" style={{ height: "2px" }} />
                <CForm onSubmit={(e) => OnSubmitMember(e)}>
                    <CRow>
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <h5>Member Details</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer Mobile Number</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter Mobile Number'
                                                    name='search_text'
                                                    value={search_text}
                                                    onChange={(e) => OnInputChangeSearch(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        {/* {DisImg?
                                    <CCol xs="12" sm="5" md="5" lg="5" className="mt-4" style={{color:"black"}}>
                                        <CCard>
                                            <CCardBody  style={{borderRadius: "20%"}}>
                                                <h5 className='text-center'>Customer Information</h5>
                                                <div style={{ marginLeft: "99px", borderRadius: "50%" }} className='mb-2'>
                                                    <img className="playerProfilePic_home_tile "
                                                        src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + CustDetails.customer_photo}
                                                        style={{ width: "60%", height: "130px", marginTop: "", float: "", paddingRight: "" }}
                                                    />
                                                </div>
                                                <h6 className='text-center'>Branch: {CustDetails.branch_name}</h6>
                                                <h6 className='text-center'>Customer Name: {CustDetails.customer_first_name} {CustDetails.customer_last_name}</h6>
                                                {/* <h6 className='text-center'>Second Name: {CustDetails.customer_last_name}</h6>
                                                <h6 className='text-center'>Date of Birth: {CustDetails.customer_date_of_birth}</h6>
                                                <h6 className='text-center'>Gender: {CustDetails.customer_gender}</h6>
                                                <h6 className='text-center'><i class="fa fa-envelope-o bggreen" aria-hidden="true"></i> &nbsp; {CustDetails.customer_email_address}</h6>
                                                <h6 className='text-center'><i class="fa fa-phone bggreen" aria-hidden="true"></i> &nbsp; {CustDetails.customer_mobile_number}, {CustDetails.customer_alternative_mobile}</h6>
                                                <h6 className='text-center'>Address: {CustDetails.customer_address}</h6>
                                                <h6 className='text-center'>Referral Code: {CustDetails.customer_referral_code}</h6>
                                                <h6 className='text-center'>Referred By: {CustDetails.customer_referred_name}</h6>
                                                <h6 className='text-center'>Source: {CustDetails.source_name}</h6>
                                            </CCardBody>
                                        </CCard>
                                        <CCol xs="12" sm="8" md="8" lg="8">

                                        </CCol>
                                    </CCol>
                                    :null} */}

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer First Name</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter First Name'
                                                    name='customer_first_name'
                                                    value={customer_first_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Customer Last Name</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter Last Name'
                                                    name='customer_last_name'
                                                    value={customer_last_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Alternative Mobile Number</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter Alternative Mobile Number'
                                                    name='customer_alternative_mobile'
                                                    value={customer_alternative_mobile}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Branch</CLabel><span className="red">*</span>
                                                <Select value={BranchDropdowns.filter(function (option) {
                                                    return option.value === customer_branch_id;
                                                })}
                                                    options={BranchDropdowns}
                                                    onChange={(e) => onChangedropdown(e, "customer_branch_id")} required="required">
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Email Address</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter Email Address'
                                                    name='customer_email_address'
                                                    value={customer_email_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Date of Birth</CLabel><span className="red">*</span>
                                                <CInput type='date'
                                                    placeholder='Enter Date of Birth'
                                                    name='customer_date_of_birth'
                                                    value={customer_date_of_birth}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Gender</CLabel><span className="red">*</span>
                                                <CSelect custom>
                                                    <option>Select Gender</option>
                                                    <option selected={customer_gender === "Male"} value="Male">Male</option>
                                                    <option selected={customer_gender === "Female"} value="Female">Female</option>
                                                    <option selected={customer_gender === "Others"} value="Others">Others</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Address</CLabel><span className="red">*</span>
                                                <CInput type='text'
                                                    placeholder='Enter Address'
                                                    name='customer_address'
                                                    value={customer_address}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Referred By</CLabel><span className="red">*</span>
                                                <Select value={CustomerDropdowns.filter(function (option) {
                                                    return option.value === customer_referred_by;
                                                })}
                                                    options={CustomerDropdowns}
                                                    onChange={(e) => onChangeCustdropdown(e, "customer_referred_by")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Select Source</CLabel><span className="red">*</span><CLabel style={{ marginLeft: "50px" }}><SourceModal /></CLabel>
                                                <Select value={SourceDropdowns.filter(function (option) {
                                                    return option.value === customer_source_id;
                                                })}
                                                    options={SourceDropdowns}
                                                    onChange={(e) => onChangeSourcedropdown(e, "customer_source_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className=" mt-3">
                                            <CFormGroup>
                                                {/* <CLabel>Customer Photo</CLabel><span className="red">*</span> */}
                                                <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                                    Upload Customer Photo
                                                    <CInput type="file" className="hide-file"
                                                        name="customer_photo"
                                                        onChange={(e) => onChangePicture(e)}
                                                    ></CInput>
                                                </div>
                                                {PictureDis ? <div>
                                                    <br></br>
                                                    <div className=" table-responsive my-table mt-5">
                                                        <img className="playerProfilePic_home_tile "
                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + customer_photo}
                                                            style={{ width: "100%", height: "150px", marginTop: "", float: "", paddingRight: "" }}
                                                        />
                                                    </div>
                                                    <CFormGroup>
                                                        <CButton className="bgcolor white ml-1 mt-1"
                                                            onClick={() => Removeimagefront("customer_photo")}
                                                        ><i className="fa fa-close"></i></CButton>
                                                    </CFormGroup>
                                                </div> : null}
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4" className="pt-1">
                                            <CRow>
                                                <CCol className="pt-3" >
                                                    <CFormGroup>
                                                        <CLabel>PREPAID PACKAGE</CLabel><span className="red">*</span>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol className="pt-3">
                                                    <CFormGroup>
                                                        <CInput style={{ width: "20%" }} placeholder="Is Prepaid"
                                                            type="radio"
                                                            id="prepaid"
                                                            name="is_postpaid"
                                                            value="no"
                                                            //checked={is_postpaid === true}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4" className="pt-1">
                                            <CRow>
                                                <CCol className="pt-3" >
                                                    <CFormGroup>
                                                        <CLabel>POSTPAID PACKAGE</CLabel><span className="red">*</span>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol className="pt-3">
                                                    <CFormGroup>
                                                        <CInput style={{ width: "20%" }} placeholder="Is Postpaid"
                                                            type="radio"
                                                            id="postpaid"
                                                            name="is_postpaid"
                                                            value="yes"
                                                            //checked={is_postpaid === true}
                                                            onChange={(e) => OnInputChange(e)}
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

                    {DisPre ?
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard>
                                    <CCardBody>
                                        <h5>Package Details</h5>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Package</CLabel><span className="red">*</span>
                                                    <Select value={ProductDropdowns.filter(function (option) {
                                                        return option.value === member_product_id;
                                                    })}
                                                        options={ProductDropdowns}
                                                        onChange={(e) => onChangeProductdropdown(e, "member_product_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
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

                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CLabel>Paid Amount</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Total Amount' 
                                                    name='package_paid_amount'
                                                    pattern="^\d*(\.\d{0,2})?$"
                                                    value={package_paid_amount}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Balance Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' placeholder='Enter Balance Amount'
                                                        pattern="^\d*(\.\d{0,2})?$"
                                                        name='package_balance_amount'
                                                        value={package_balance_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Balance Payable Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Balance Payable Date'
                                                        name='package_balance_payable_date'
                                                        value={package_balance_payable_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
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

                                            <CCol xs="12" sm="3" md="3" lg="4">
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
                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Batch</CLabel><span className="red">*</span>
                                                    <Select value={BatchDropdowns.filter(function (option) {
                                                        return option.value === member_batch_id;
                                                    })}
                                                        options={BatchDropdowns}
                                                        onChange={(e) => onChangeBatchdropdown(e, "member_batch_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>In Time</CLabel><span className="red">*</span>
                                                    <CSelect customname='member_in_time' onChange={(e) => OnInputChange(e)}>
                                                        <option>Select Time</option>
                                                        <option selected={member_in_time === "06:00 am"} value="06:00 am">06:00 am</option>
                                                        <option selected={member_in_time === "06:15 am"} value="06:15 am">06:15 am</option>
                                                        <option selected={member_in_time === "06:30 am"} value="06:30 am">06:30 am</option>
                                                        <option selected={member_in_time === "06:00 45"} value="06:45 am">06:45 am</option>
                                                        <option selected={member_in_time === "07:00 am"} value="07:00 am">07:00 am</option>
                                                        <option selected={member_in_time === "07:15 am"} value="07:15 am">07:15 am</option>
                                                        <option selected={member_in_time === "07:30 am"} value="07:30 am">07:30 am</option>
                                                        <option selected={member_in_time === "07:00 45"} value="07:45 am">07:45 am</option>
                                                        <option selected={member_in_time === "08:00 am"} value="08:00 am">08:00 am</option>
                                                        <option selected={member_in_time === "08:00 15"} value="08:15 am">08:15 am</option>
                                                        <option selected={member_in_time === "08:30 am"} value="08:30 am">08:30 am</option>
                                                        <option selected={member_in_time === "08:45 am"} value="08:45 am">08:45 am</option>
                                                        <option selected={member_in_time === "09:00 am"} value="09:00 am">09:00 am</option>
                                                        <option selected={member_in_time === "09:00 15"} value="09:15 am">09:15 am</option>
                                                        <option selected={member_in_time === "09:30 am"} value="09:30 am">09:30 am</option>
                                                        <option selected={member_in_time === "09:45 am"} value="09:45 am">09:45 am</option>
                                                        <option selected={member_in_time === "10:00 am"} value="10:00 am">10:00 am</option>
                                                        <option selected={member_in_time === "10:15 am"} value="10:15 am">10:15 am</option>
                                                        <option selected={member_in_time === "10:30 am"} value="10:30 am">10:30 am</option>
                                                        <option selected={member_in_time === "10:45 am"} value="10:45 am">10:45 am</option>
                                                        <option selected={member_in_time === "11:00 am"} value="11:00 am">11:00 am</option>
                                                        <option selected={member_in_time === "11:15 am"} value="11:15 am">11:15 am</option>
                                                        <option selected={member_in_time === "11:30 am"} value="11:30 am">11:30 am</option>
                                                        <option selected={member_in_time === "11:45 am"} value="11:45 am">11:45 am</option>
                                                        <option selected={member_in_time === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                        <option selected={member_in_time === "12:15 pm"} value="12:15 pm">12:15 pm</option>
                                                        <option selected={member_in_time === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                        <option selected={member_in_time === "12:45 pm"} value="12:45 pm">12:45 pm</option>
                                                        <option selected={member_in_time === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                        <option selected={member_in_time === "01:15 pm"} value="01:15 pm">01:15 pm</option>
                                                        <option selected={member_in_time === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                        <option selected={member_in_time === "01:45 pm"} value="01:45 pm">01:45 pm</option>
                                                        <option selected={member_in_time === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                        <option selected={member_in_time === "02:15 pm"} value="02:15 pm">02:15 pm</option>
                                                        <option selected={member_in_time === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                        <option selected={member_in_time === "02:45 pm"} value="02:45 pm">02:45 pm</option>
                                                        <option selected={member_in_time === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                        <option selected={member_in_time === "03:15 pm"} value="03:15 pm">03:15 pm</option>
                                                        <option selected={member_in_time === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                        <option selected={member_in_time === "03:45 pm"} value="03:35 pm">03:45 pm</option>
                                                        <option selected={member_in_time === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                        <option selected={member_in_time === "04:15 pm"} value="04:15 pm">04:15 pm</option>
                                                        <option selected={member_in_time === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                        <option selected={member_in_time === "04:45 pm"} value="04:45 pm">04:45 pm</option>
                                                        <option selected={member_in_time === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                        <option selected={member_in_time === "05:14 pm"} value="05:14 pm">05:15 pm</option>
                                                        <option selected={member_in_time === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                        <option selected={member_in_time === "05:45 pm"} value="05:45 pm">05:45 pm</option>
                                                        <option selected={member_in_time === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                        <option selected={member_in_time === "06:15 pm"} value="06:15 pm">06:15 pm</option>
                                                        <option selected={member_in_time === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                        <option selected={member_in_time === "06:45 pm"} value="06:45 pm">06:45 pm</option>
                                                        <option selected={member_in_time === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                        <option selected={member_in_time === "07:15 pm"} value="07:15 pm">07:15 pm</option>
                                                        <option selected={member_in_time === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                        <option selected={member_in_time === "07:45 pm"} value="07:45 pm">07:45 pm</option>
                                                        <option selected={member_in_time === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                        <option selected={member_in_time === "08:15 pm"} value="08:15 pm">08:15 pm</option>
                                                        <option selected={member_in_time === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                        <option selected={member_in_time === "08:45 pm"} value="08:45 pm">08:45 pm</option>
                                                        <option selected={member_in_time === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                        <option selected={member_in_time === "09:15 pm"} value="09:15 pm">09:00 pm</option>
                                                        <option selected={member_in_time === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                        <option selected={member_in_time === "09:45 pm"} value="09:45 pm">09:45 pm</option>
                                                        <option selected={member_in_time === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="3" md="3" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Out Time</CLabel><span className="red">*</span>
                                                    <CSelect customname='member_out_time' onChange={(e) => OnInputChange(e)}>
                                                        <option>Select Time</option>
                                                        <option selected={member_out_time === "06:00 am"} value="06:00 am">06:00 am</option>
                                                        <option selected={member_out_time === "06:15 am"} value="06:15 am">06:15 am</option>
                                                        <option selected={member_out_time === "06:30 am"} value="06:30 am">06:30 am</option>
                                                        <option selected={member_out_time === "06:00 45"} value="06:45 am">06:45 am</option>
                                                        <option selected={member_out_time === "07:00 am"} value="07:00 am">07:00 am</option>
                                                        <option selected={member_out_time === "07:15 am"} value="07:15 am">07:15 am</option>
                                                        <option selected={member_out_time === "07:30 am"} value="07:30 am">07:30 am</option>
                                                        <option selected={member_out_time === "07:00 45"} value="07:45 am">07:45 am</option>
                                                        <option selected={member_out_time === "08:00 am"} value="08:00 am">08:00 am</option>
                                                        <option selected={member_out_time === "08:00 15"} value="08:15 am">08:15 am</option>
                                                        <option selected={member_out_time === "08:30 am"} value="08:30 am">08:30 am</option>
                                                        <option selected={member_out_time === "08:45 am"} value="08:45 am">08:45 am</option>
                                                        <option selected={member_out_time === "09:00 am"} value="09:00 am">09:00 am</option>
                                                        <option selected={member_out_time === "09:00 15"} value="09:15 am">09:15 am</option>
                                                        <option selected={member_out_time === "09:30 am"} value="09:30 am">09:30 am</option>
                                                        <option selected={member_out_time === "09:45 am"} value="09:45 am">09:45 am</option>
                                                        <option selected={member_out_time === "10:00 am"} value="10:00 am">10:00 am</option>
                                                        <option selected={member_out_time === "10:15 am"} value="10:15 am">10:15 am</option>
                                                        <option selected={member_out_time === "10:30 am"} value="10:30 am">10:30 am</option>
                                                        <option selected={member_out_time === "10:45 am"} value="10:45 am">10:45 am</option>
                                                        <option selected={member_out_time === "11:00 am"} value="11:00 am">11:00 am</option>
                                                        <option selected={member_out_time === "11:15 am"} value="11:15 am">11:15 am</option>
                                                        <option selected={member_out_time === "11:30 am"} value="11:30 am">11:30 am</option>
                                                        <option selected={member_out_time === "11:45 am"} value="11:45 am">11:45 am</option>
                                                        <option selected={member_out_time === "12:00 pm"} value="12:00 pm">12:00 pm</option>
                                                        <option selected={member_out_time === "12:15 pm"} value="12:15 pm">12:15 pm</option>
                                                        <option selected={member_out_time === "12:30 pm"} value="12:30 pm">12:30 pm</option>
                                                        <option selected={member_out_time === "12:45 pm"} value="12:45 pm">12:45 pm</option>
                                                        <option selected={member_out_time === "01:00 pm"} value="01:00 pm">01:00 pm</option>
                                                        <option selected={member_out_time === "01:15 pm"} value="01:15 pm">01:15 pm</option>
                                                        <option selected={member_out_time === "01:30 pm"} value="01:30 pm">01:30 pm</option>
                                                        <option selected={member_out_time === "01:45 pm"} value="01:45 pm">01:45 pm</option>
                                                        <option selected={member_out_time === "02:00 pm"} value="02:00 pm">02:00 pm</option>
                                                        <option selected={member_out_time === "02:15 pm"} value="02:15 pm">02:15 pm</option>
                                                        <option selected={member_out_time === "02:30 pm"} value="02:30 pm">02:30 pm</option>
                                                        <option selected={member_out_time === "02:45 pm"} value="02:45 pm">02:45 pm</option>
                                                        <option selected={member_out_time === "03:00 pm"} value="03:00 pm">03:00 pm</option>
                                                        <option selected={member_out_time === "03:15 pm"} value="03:15 pm">03:15 pm</option>
                                                        <option selected={member_out_time === "03:30 pm"} value="03:30 pm">03:30 pm</option>
                                                        <option selected={member_out_time === "03:45 pm"} value="03:35 pm">03:45 pm</option>
                                                        <option selected={member_out_time === "04:00 pm"} value="04:00 pm">04:00 pm</option>
                                                        <option selected={member_out_time === "04:15 pm"} value="04:15 pm">04:15 pm</option>
                                                        <option selected={member_out_time === "04:30 pm"} value="04:30 pm">04:30 pm</option>
                                                        <option selected={member_out_time === "04:45 pm"} value="04:45 pm">04:45 pm</option>
                                                        <option selected={member_out_time === "05:00 pm"} value="05:00 pm">05:00 pm</option>
                                                        <option selected={member_out_time === "05:14 pm"} value="05:14 pm">05:15 pm</option>
                                                        <option selected={member_out_time === "05:30 pm"} value="05:30 pm">05:30 pm</option>
                                                        <option selected={member_out_time === "05:45 pm"} value="05:45 pm">05:45 pm</option>
                                                        <option selected={member_out_time === "06:00 pm"} value="06:00 pm">06:00 pm</option>
                                                        <option selected={member_out_time === "06:15 pm"} value="06:15 pm">06:15 pm</option>
                                                        <option selected={member_out_time === "06:30 pm"} value="06:30 pm">06:30 pm</option>
                                                        <option selected={member_out_time === "06:45 pm"} value="06:45 pm">06:45 pm</option>
                                                        <option selected={member_out_time === "07:00 pm"} value="07:00 pm">07:00 pm</option>
                                                        <option selected={member_out_time === "07:15 pm"} value="07:15 pm">07:15 pm</option>
                                                        <option selected={member_out_time === "07:30 pm"} value="07:30 pm">07:30 pm</option>
                                                        <option selected={member_out_time === "07:45 pm"} value="07:45 pm">07:45 pm</option>
                                                        <option selected={member_out_time === "08:00 pm"} value="08:00 pm">08:00 pm</option>
                                                        <option selected={member_out_time === "08:15 pm"} value="08:15 pm">08:15 pm</option>
                                                        <option selected={member_out_time === "08:30 pm"} value="08:30 pm">08:30 pm</option>
                                                        <option selected={member_out_time === "08:45 pm"} value="08:45 pm">08:45 pm</option>
                                                        <option selected={member_out_time === "09:00 pm"} value="09:00 pm">09:00 pm</option>
                                                        <option selected={member_out_time === "09:15 pm"} value="09:15 pm">09:00 pm</option>
                                                        <option selected={member_out_time === "09:30 pm"} value="09:30 pm">09:30 pm</option>
                                                        <option selected={member_out_time === "09:45 pm"} value="09:45 pm">09:45 pm</option>
                                                        <option selected={member_out_time === "10:00 pm"} value="10:00 pm">10:00 pm</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        : null}

                    {DisPost ?
                        <CRow>
                            <CCol xs="12" sm="12" ms="12" lg="12">
                                <CCard>
                                    <CCardBody>
                                        <h5>Postpaid Details</h5>
                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                        <CRow>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Advance Paid Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' placeholder='Advance Paid Amount'
                                                        pattern="^\d*(\.\d{0,2})?$"
                                                        name='postpaid_advance_amount'
                                                        value={postpaid_advance_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Start Date</CLabel><span className="red">*</span>
                                                    <CInput type='date' placeholder='Start Date'
                                                        name='postpaid_start_date'
                                                        value={postpaid_start_date}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Monthly Bill Date </CLabel><span className="red">*</span>
                                                    <CSelect custom name='postpaid_monthly_bill_date'
                                                        onChange={(e) => OnInputChange(e)}>
                                                        <option>Select Date</option>
                                                        <option selected={postpaid_monthly_bill_date === "1"} value="1">1</option>
                                                        <option selected={postpaid_monthly_bill_date === "2"} value="2">2</option>
                                                        <option selected={postpaid_monthly_bill_date === "3"} value="3">3</option>
                                                        <option selected={postpaid_monthly_bill_date === "4"} value="4">4</option>
                                                        <option selected={postpaid_monthly_bill_date === "5"} value="5">5</option>
                                                        <option selected={postpaid_monthly_bill_date === "6"} value="6">6</option>
                                                        <option selected={postpaid_monthly_bill_date === "7"} value="7">7</option>
                                                        <option selected={postpaid_monthly_bill_date === "8"} value="8">8</option>
                                                        <option selected={postpaid_monthly_bill_date === "9"} value="9">9</option>
                                                        <option selected={postpaid_monthly_bill_date === "10"} value="10">10</option>
                                                        <option selected={postpaid_monthly_bill_date === "11"} value="11">11</option>
                                                        <option selected={postpaid_monthly_bill_date === "12"} value="12">12</option>
                                                        <option selected={postpaid_monthly_bill_date === "13"} value="13">13</option>
                                                        <option selected={postpaid_monthly_bill_date === "14"} value="14">14</option>
                                                        <option selected={postpaid_monthly_bill_date === "15"} value="15">15</option>
                                                        <option selected={postpaid_monthly_bill_date === "16"} value="16">16</option>
                                                        <option selected={postpaid_monthly_bill_date === "17"} value="17">17</option>
                                                        <option selected={postpaid_monthly_bill_date === "18"} value="18">18</option>
                                                        <option selected={postpaid_monthly_bill_date === "19"} value="19">19</option>
                                                        <option selected={postpaid_monthly_bill_date === "20"} value="20">20</option>
                                                        <option selected={postpaid_monthly_bill_date === "21"} value="21">21</option>
                                                        <option selected={postpaid_monthly_bill_date === "22"} value="22">22</option>
                                                        <option selected={postpaid_monthly_bill_date === "23"} value="23">23</option>
                                                        <option selected={postpaid_monthly_bill_date === "24"} value="24">24</option>
                                                        <option selected={postpaid_monthly_bill_date === "25"} value="25">25</option>
                                                        <option selected={postpaid_monthly_bill_date === "26"} value="26">26</option>
                                                        <option selected={postpaid_monthly_bill_date === "27"} value="27">27</option>
                                                        <option selected={postpaid_monthly_bill_date === "28"} value="28">28</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Due Date After Bill Date </CLabel><span className="red">*</span>
                                                    <CSelect custom name='postpaid_last_due_date_after_bill_date'
                                                        onChange={(e) => OnInputChange(e)}>
                                                        <option>Select Date</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "1"} value="1">1 Day</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "2"} value="2">2 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "3"} value="3">3 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "4"} value="4">4 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "5"} value="5">5 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "6"} value="6">6 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "7"} value="7">7 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "8"} value="8">8 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "9"} value="9">9 Days</option>
                                                        <option selected={postpaid_last_due_date_after_bill_date === "10"} value="10">10 Days</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Monthly Payable Amount</CLabel><span className="red">*</span>
                                                    <CInput type='text' placeholder='Monthly Payable Amount'
                                                        pattern="^\d*(\.\d{0,2})?$"
                                                        name='postpaid_monthly_payable_amount'
                                                        value={postpaid_monthly_payable_amount}
                                                        onChange={(e) => OnInputChange(e)}
                                                    />
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Select Tax</CLabel><span className="red">*</span>
                                                    <Select value={TaxGroupDropdowns.filter(function (option) {
                                                        return option.value === postpaid_tax_group_id;
                                                    })}
                                                        options={TaxGroupDropdowns}
                                                        onChange={(e) => onChangeTaxdropdown(e, "postpaid_tax_group_id")} >
                                                    </Select>
                                                </CFormGroup>
                                            </CCol>

                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                <CFormGroup>
                                                    <CLabel>Dont Allow Attendence After Due Date( If Not Paid) </CLabel>
                                                    <CSelect custom name='postpaid_dues_allowed_for_attendance'
                                                        onChange={(e) => OnInputChange(e)}>
                                                        <option >Select Date</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "1"} value="1">1 Month Due</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "2"} value="2">2 Months Due</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "3"} value="3">3 Months Due</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "4"} value="4">4 Months Due</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "5"} value="5">5 Months Due</option>
                                                        <option selected={postpaid_dues_allowed_for_attendance === "6"} value="6">6 Months Due</option>
                                                    </CSelect>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        : null}

                    <CRow>
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <h5>Payment Details</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>

                                    </CRow>
                                    <CRow>
                                        <CCol xs="12" sm="8" md="8" lg="8">
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
                                            <CLabel>Paid Amount</CLabel><span className="red">*</span>
                                            <CInput type='text' placeholder='Total Amount' disabled
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
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <h5>Member Goals Details</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Primary Goal</CLabel>
                                                <Select value={PrimaryDropdowns.filter(function (option) {
                                                    return option.value === member_primary_goal_id;
                                                })}
                                                    options={PrimaryDropdowns}
                                                    onChange={(e) => onChangePridropdown(e, "member_primary_goal_id")} >
                                                </Select>
                                            </CFormGroup>
                                            {/* <CLabel>+ Add New Goal</CLabel> */}

                                        </CCol>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Secondary Goal</CLabel>
                                                <Select value={SecondaryDropdowns.filter(function (option) {
                                                    return option.value === member_secondary_goal_id;
                                                })}
                                                    options={SecondaryDropdowns}
                                                    onChange={(e) => onChangeSecdropdown(e, "member_secondary_goal_id")} >
                                                </Select>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <h5>Member Health Details</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="6" md="6" lg="6">
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><CLabel>Name</CLabel></td>
                                                                <td ><CLabel style={{ width: "20px", marginLeft: "50px" }}>Yes</CLabel></td>
                                                                <td><CLabel style={{ width: "20px", marginLeft: "50px" }}>No</CLabel></td>
                                                            </tr>

                                                            {MemberHealthList.map((HealthList, index) => (
                                                                <tr>
                                                                    <td>
                                                                        <CLabel>{HealthList.mh_health_name}</CLabel>
                                                                    </td>
                                                                    <td>
                                                                        <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio'
                                                                            name={HealthList.mh_health_id}
                                                                            id="yes"
                                                                            checked={HealthList.mh_value === true ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, HealthList.mh_health_id)}
                                                                        />
                                                                    </td>

                                                                    <td>
                                                                        <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio'
                                                                            name={HealthList.mh_health_id}
                                                                            id="no"
                                                                            checked={HealthList.mh_value === false ? true : false}
                                                                            onChange={(e) => OnParameterInputChange(e, index, HealthList.mh_health_id)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    {/* <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <CLabel>Heart Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <CLabel>Obesity:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Diabetes:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Blood Pressure:- &nbsp;</CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Joint or Bone Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Respiratory Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Harmonal Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Gastric Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <CLabel>Gynic Problem:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <CLabel>Surgery:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Allergy:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Medication:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <CLabel>Special Notes:- </CLabel>
                                                                </td>
                                                                <td>
                                                                    <CInput style={{ width: "100%", marginLeft: "50px" }} type='text' placeholder='Special Notes' />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table> */}
                                                </CCol>
                                            </CRow>
                                        </CCol>

                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <h5>Member Personal Details</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />

                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Occupation</CLabel>
                                                <CInput type='text' placeholder='Enter Occupation'
                                                    name='info_occupation'
                                                    value={info_occupation}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Level of Physical Activity</CLabel>
                                                <CSelect custom name='info_level_of_physical_activity' onChange={(e) => OnInputChange(e)}
                                                >
                                                    <option>Select Activity</option>
                                                    <option selected={info_level_of_physical_activity === "10%"} value="10%">10%</option>
                                                    <option selected={info_level_of_physical_activity === "20%"} value="20%">20%</option>
                                                    <option selected={info_level_of_physical_activity === "30%"} value="30%">30%</option>
                                                    <option selected={info_level_of_physical_activity === "40%"} value="40%">40%</option>
                                                    <option selected={info_level_of_physical_activity === "50%"} value="50%">50%</option>
                                                    <option selected={info_level_of_physical_activity === "60%"} value="60%">60%</option>
                                                    <option selected={info_level_of_physical_activity === "70%"} value="70%">70%</option>
                                                    <option selected={info_level_of_physical_activity === "80%"} value="80%">80%</option>
                                                    <option selected={info_level_of_physical_activity === "90%"} value="90%">90%</option>
                                                    <option selected={info_level_of_physical_activity === "100%"} value="100%">100%</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Stress In Job</CLabel>
                                                <CSelect custom name='info_stress_in_job' onChange={(e) => OnInputChange(e)}
                                                >
                                                    <option>Select Stress</option>
                                                    <option selected={info_stress_in_job === "Low"} value="Low">Low</option>
                                                    <option selected={info_stress_in_job === "Medium"} value="Medium">Medium</option>
                                                    <option selected={info_stress_in_job === "High"} value="High">High</option>
                                                </CSelect>
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Average Hour of sleep</CLabel>
                                                <CInput type='text' placeholder='Enter Average Hour of sleep'
                                                    name='info_avg_hours_of_sleep'
                                                    value={info_avg_hours_of_sleep}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Quality of Sleep</CLabel>
                                                <CInput type='text' placeholder='Enter Quality of Sleep'
                                                    name='info_quality_of_sleep'
                                                    value={info_quality_of_sleep}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Time of Sleep</CLabel>
                                                <CInput type='text' placeholder='Enter Time of Sleep'
                                                    name='info_time_of_sleep'
                                                    value={info_time_of_sleep}
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
                            <CCard>
                                <CCardBody>
                                    <h5>Member KYC</h5>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                    <CRow>
                                        <CCol xs="12" sm="12" ms="12" lg="12">
                                            {KYCDetails.map((kyc, index) => (
                                                <CRow key={index}>
                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <CFormGroup>
                                                            <CLabel>KYC Name</CLabel>
                                                            <CInput type='text' placeholder='Enter KYC Name'
                                                                name='kyc_name'
                                                                value={kyc.kyc_name}
                                                                onChange={(e) => OnInputKYCChange(e, index)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <CFormGroup>
                                                            <CLabel>KYC Number</CLabel>
                                                            <CInput type='text' placeholder='Enter KYC Number'
                                                                name='kyc_number'
                                                                value={kyc.kyc_number}
                                                                onChange={(e) => OnInputKYCChange(e, index)}
                                                            />
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <CFormGroup>
                                                            {/* <CLabel>KYC Filename</CLabel>
                                                            <CInput type='text' placeholder='Enter KYC Filename'
                                                                name='kyc_filename'
                                                                value={kyc.kyc_filename}
                                                                onChange={(e) => OnInputKYCChange(e, index)}
                                                            /> */}
                                                            <CLabel>  Select Document</CLabel>
                                                            <CInput type="file" onChange={(e) => setFile(e)} />
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12" sm="2" md="2" lg="2" className="mt-3">
                                                        <CFormGroup>
                                                            {/* <div className="div mt-3" style={{ fontSize: "14px", fontWeight: "" }}>
                                                                Upload document
                                                                <CInput type="file" className="hide-file"
                                                                    name="kyc_filename"
                                                                    onChange={(e) => SubmitDocument(e)}
                                                                ></CInput>
                                                            </div> */}
                                                            <CButton type="submit" onClick={(e) => SubmitDocument(e)} className="mt-3 bgcolor white" style={{ width: "100%" }}>Upload Document</CButton>
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="12" sm="1" md="1" lg="1" className="mt-3">
                                                        <CButton
                                                            onClick={() => RemoveKYCRow(index)}
                                                            className="btn mt-3">
                                                            <i className="fa fa-close" aria-hidden="true"></i>
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                            ))}
                                        </CCol>
                                        <CCol xs="12" sm="5" ms="5" lg="5"></CCol>
                                        <CCol xs="12" sm="2" ms="2" lg="2">
                                            <CButton className="bgcolor white " style={{ borderRadius: "50px" }}
                                                onClick={() => AddKYCRow()}
                                            >
                                                +</CButton>
                                        </CCol>
                                        <CCol xs="12" sm="5" ms="5" lg="5"></CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xs="12" sm="12" ms="12" lg="12">
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CFormGroup>
                                                <CLabel>Remarks</CLabel>
                                                <CTextarea type='text' placeholder='Remarks...'
                                                    name="member_remarks" value={member_remarks}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="5" md="5" lg="6" className="pt-1">
                                            <CRow>
                                                <CCol className="pt-3" >
                                                    <CFormGroup>
                                                        <CLabel>Send Invoice via WhatsApp</CLabel><span className="red">*</span>
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

                                        <CCol xs="12" sm="5" md="5" lg="6" className="pt-1">
                                            <CRow>
                                                <CCol className="pt-3" >
                                                    <CFormGroup>
                                                        <CLabel>Send Invoice via Email</CLabel><span className="red">*</span>
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
                    <hr className="bgcolor" style={{ height: "1px" }} />
                    <CRow>
                        <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                        <CCol xs="12" sm="4" md="4" lg="4">
                            <div className="bgcolor mb-1" style={{ borderRadius: "5px" }}>
                                <CButton type="submit" disabled={disablebutton} style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Submit</CButton>
                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                            </div>
                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                        </CCol>
                    </CRow>
                </CForm>
            </div >
        </>
    )

}
export default AddNewMember;