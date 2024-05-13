import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import CategoryModal from '../../Modals/CategoryModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const AddNewProducts = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [CategoryDropdowns, setCategoryDropdowns] = useState([]);
    const [TaxGroupDropdowns, setTaxGroupDropdowns] = useState([]);
    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [ProductAddInput, setProductAddInput] = useState({
        product_id: "",
        product_type: "",
        product_category_id: "",
        product_name: "",
        product_tax_group_id: "",
        product_description: "",
        product_cover_image: "",
        product_tag_tittle: "",
        product_sale_price: "",
        product_mrp: "",
        product_stocks: "",
        loggedin_user_id: "",
        product_feature_list: []
    });

    const {
        product_id,
        product_type,
        product_category_id,
        product_name,
        product_tax_group_id,
        product_description,
        product_cover_image,
        product_tag_tittle,
        product_sale_price,
        product_mrp,
        product_stocks,
        loggedin_user_id,
        product_feature_list
    } = ProductAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setProductAddInput({ ...ProductAddInput, [e.target.name]: e.target.value });
    }

    const [ProductFeatureList, setProductFeatureList] = useState([]);

    const OnInventoryChange = (e, index) => {
        console.log(e.target.value);
        console.log(e.target.name, index);//output:rcpn_dc_date 0 //name and index of row 
        var temp_Inventory_List = [...ProductFeatureList];


        temp_Inventory_List[index][e.target.name] = e.target.value;
        setProductFeatureList([]);
        setProductFeatureList(temp_Inventory_List);
    }

    const AddDocumentsRow = () => {
        var tablearray = [];
        setProductFeatureList([...ProductFeatureList, {
            ["feature_heading"]: "",
            ["feature_description"]: "",
        }
        ]);
    }

    const RemoveGeneralRow = (index) => {
        let values = [...ProductFeatureList];
        values.splice(index, 1);
        setProductFeatureList(values);
    }

    //Upload Logo
    const [image_warnings, setImageWarnings] = useState({
        image_warning: ""
    });

    const [PictureDis, setPictureDis] = useState(false);

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
                console.log("Package image");
                //console.log(image);  
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage = async (product_cover_image, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = product_cover_image;
        list["image_for"] = "PRODUCT";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setProductAddInput({ ...ProductAddInput, ["product_cover_image"]: response.data.image_name });
            }
            else {
                setImageWarnings({ ["image_warning"]: response.data.msg });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Remove images
    const Removeimagefront = (productcoverimage) => {
        // alert(propertycoverimage);
        setProductAddInput({ ...ProductAddInput, [productcoverimage]: "" });
        setPictureDis(false);
    }

    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_CATEGORY", "dropdown_filter": "" },
                { "dropdown_type": "DD_TAX_GROUPS", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CATEGORY") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCategoryDropdowns(ddlist);
                    }

                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_TAX_GROUPS") {
                        let ddlist = [];
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setTaxGroupDropdowns(ddlist);
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

    const onChangeCategorydropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setProductAddInput({ ...ProductAddInput, ["product_category_id"]: e.value });
    };

    const onChangeTaxdropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);

        setProductAddInput({ ...ProductAddInput, ["product_tax_group_id"]: e.value });
    };

    useEffect(() => {
        GetDropDown();
        LoadProductDetails();
    }, []);

    const OnSubmitProducts = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (product_id === "") {
            await axios.post(process.env.REACT_APP_API + "ProductAdd", {
                "product_type": "PRODUCT",
                "product_category_id": product_category_id,
                "product_name": product_name,
                "product_tax_group_id": product_tax_group_id,
                "product_description": product_description,
                "product_cover_image": product_cover_image,
                "product_tag_tittle": product_tag_tittle,
                "product_sale_price": product_sale_price,
                "product_mrp": product_mrp,
                "product_stocks": product_stocks,
                "loggedin_user_id": cookies.user_id,
                "product_feature_list": ProductFeatureList
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/product-list`);
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
            await axios.post(process.env.REACT_APP_API + "ProductUpdate", {
                "product_id": product_id,
                "product_type": product_type,
                "product_category_id": product_category_id,
                "product_name": product_name,
                "product_tax_group_id": product_tax_group_id,
                "product_description": product_description,
                "product_cover_image": product_cover_image,
                "product_tag_tittle": product_tag_tittle,
                "product_sale_price": product_sale_price,
                "product_mrp": product_mrp,
                "product_stocks": product_stocks,
                "loggedin_user_id": cookies.user_id,
                "product_feature_list": ProductFeatureList
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    history.push(`/product-list`);
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

    const LoadProductDetails = async () => {
        var list = {};
        if (props.location.pfid != null) {
            list["product_id"] = props.location.pfid.pfid;
            await axios.post(process.env.REACT_APP_API + "ProductDetailsByID", list, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    var UserDetails = [], BirthDate, Time;
                    if (response.data.product_details !== null) {
                        setPictureDis(true);
                        setProductAddInput({
                            "product_id": response.data.product_details.product_id,
                            "product_type": response.data.product_details.product_type,
                            "product_category_id": response.data.product_details.product_category_id,
                            "product_name": response.data.product_details.product_name,
                            "product_tax_group_id": response.data.product_details.product_tax_group_id,
                            "product_description": response.data.product_details.product_description,
                            "product_cover_image": response.data.product_details.product_cover_image,
                            "product_tag_tittle": response.data.product_details.product_tag_tittle,
                            "product_sale_price": response.data.product_details.product_sale_price,
                            "product_mrp": response.data.product_details.product_mrp,
                            "product_stocks": response.data.product_details.product_stocks
                        });
                    }
                    else {
                        setProductAddInput({});
                    }

                    if (response.data.product_feature_list !== null) {
                        setProductFeatureList(response.data.product_feature_list);
                    }
                    else {
                        setProductFeatureList([]);
                    }
                }
            }).catch(
                error => {
                    console.log(error);
                    alert(error.message);
                })
        }
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ADD_NEW_PRODUCT) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        {props.location.pfid != null ? <h4>Update Product</h4>
                                            :
                                            <h4>Add New Product</h4>
                                        }
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <CForm onSubmit={(e) => OnSubmitProducts(e)}>
                                            <CRow>
                                                {/* <CCol xs="12" sm="3" ms="3" lg="3">
                            <CFormGroup>
                                <CLabel>Package Type</CLabel><span className="red">*</span>
                                <CSelect name='product_type' onChange={(e) => OnInputChange(e)} custom>
                                    <option>Select Type</option>
                                    <option selected={product_type === "PACKAGE"} value="PACKAGE">PACKAGE</option>
                                    <option selected={product_type === "PROGRAM"} value="PROGRAM">PROGRAM</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol> */}

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Select Category</CLabel><span className="red">*</span> <span><CategoryModal /></span>
                                                        <Select value={CategoryDropdowns.filter(function (option) {
                                                            return option.value === product_category_id;
                                                        })}
                                                            options={CategoryDropdowns}
                                                            onChange={(e) => onChangeCategorydropdown(e, "product_category_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Product Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Product Name' required="required"
                                                            name='product_name'
                                                            value={product_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Select Tax</CLabel><span className="red">*</span>
                                                        <Select value={TaxGroupDropdowns.filter(function (option) {
                                                            return option.value === product_tax_group_id;
                                                        })}
                                                            options={TaxGroupDropdowns}
                                                            onChange={(e) => onChangeTaxdropdown(e, "product_tax_group_id")} >
                                                        </Select>
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Product Tag Title</CLabel>
                                                        <CInput type='text' placeholder='Enter Product Tag Title'
                                                            name='product_tag_tittle'
                                                            value={product_tag_tittle}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Product Stocks</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Product Stocks' required="required"
                                                            name='product_stocks'
                                                            value={product_stocks}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Product Sale Price</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Product Sale Price' required="required"
                                                            name='product_sale_price'
                                                            value={product_sale_price}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" ms="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Product MRP</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Product MRP' required="required"
                                                            name='product_mrp'
                                                            value={product_mrp}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                    <CFormGroup>
                                                        {/* <CLabel className="red">Photo Size :"width: "100%", height: "150px"</CLabel> */}
                                                        <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                                            Upload Cover Image
                                                            <CInput type="file" className="hide-file"
                                                                name="product_cover_image"
                                                                onChange={(e) => onChangePicture(e)}
                                                            ></CInput>
                                                        </div>
                                                        {PictureDis ? <div>
                                                            <br></br>
                                                            <div className=" table-responsive my-table mt-5">
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PRODUCT/" + product_cover_image}
                                                                    style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
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

                                                <CCol xs="12" sm="6" ms="6" lg="6">
                                                    <CFormGroup>
                                                        <CLabel>Product Description</CLabel><span className="red">*</span>
                                                        <CTextarea rows={3} type='text' placeholder='Enter Product Description'
                                                            name='product_description'
                                                            value={product_description}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <h5 align="center">Product Feature</h5>
                                            <CRow>
                                                <CCol>
                                                    <div className="table-responsive ">
                                                        <table className="table">

                                                            <thead>
                                                                <tr>
                                                                    <th>Feature Heading</th>
                                                                    <th>Feature Description</th>
                                                                    <th>Remove</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>


                                                                {ProductFeatureList.map((FeatureList, index) => (

                                                                    <tr key={index}>
                                                                        <td style={{ width: "600px" }}>
                                                                            <CInput type="text" placeholder="Feature Heading" required="required"
                                                                                name="feature_heading"
                                                                                value={FeatureList.feature_heading}
                                                                                onChange={(e) => OnInventoryChange(e, index)}
                                                                            />
                                                                        </td>

                                                                        <td style={{ width: "600px" }}>
                                                                            <CInput type="text" placeholder="Feature Description" required="required"
                                                                                name="feature_description"
                                                                                value={FeatureList.feature_description}
                                                                                onChange={(e) => OnInventoryChange(e, index)}
                                                                            />
                                                                        </td>

                                                                        <td><CButton
                                                                            onClick={() => RemoveGeneralRow(index)}
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
                                            <CRow>

                                                <CCol xs="12" sm="6" md="6" lg="5"></CCol>
                                                <CCol xs="12" sm="1" md="1" lg="1" className="mb-3">
                                                    <CButton className="bgcolor white " style={{ borderRadius: "50px", backgroundColor: "#3b3f4b" }}
                                                        onClick={() => AddDocumentsRow()}
                                                    >
                                                        +</CButton>
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
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default AddNewProducts;