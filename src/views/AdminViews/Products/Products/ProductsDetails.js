import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const ProductDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var productid = searchParams.get("prodid");

    const [ProductDetails, setProductDetails] = useState({});
    const [ProductFeatureList, setProductFeatureList] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadProductDetails = async () => {
        var list = {};
        list["product_id"] = productid;

        await axios.post(process.env.REACT_APP_API + "ProductDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var PackageDetails = [], CreatedAT, UpdatedAT;
                if (response.data.product_details !== null) {
                    if (response.data.product_details.product_created_at !== null) {
                        var date = response.data.product_details.product_created_at
                        CreatedAT = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        CreatedAT = response.data.product_details.product_created_at;
                    }

                    if (response.data.product_details.product_updated_at !== null) {
                        var date = response.data.product_details.product_updated_at
                        UpdatedAT = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        UpdatedAT = response.data.product_details.product_updated_at;
                    }
                    setProductDetails({
                        "product_id": response.data.product_details.product_id,
                        "product_type": response.data.product_details.product_type,
                        "product_category_id": response.data.product_details.product_category_id,
                        "category_name": response.data.product_details.category_name,
                        "product_name": response.data.product_details.product_name,
                        "product_tax_group_id": response.data.product_details.product_tax_group_id,
                        "tax_group_name": response.data.product_details.tax_group_name,
                        "product_description": response.data.product_details.product_description,
                        "product_cover_image": response.data.product_details.product_cover_image,
                        "product_tag_tittle": response.data.product_details.product_tag_tittle,
                        "product_sale_price": response.data.product_details.product_sale_price,
                        "product_mrp": response.data.product_details.product_mrp,
                        "product_stocks": response.data.product_details.product_stocks,
                        "product_created_by": response.data.product_details.product_created_by,
                        "product_created_user_name": response.data.product_details.product_created_user_name,
                        "product_created_at": CreatedAT,
                        "product_updated_by": response.data.product_details.product_updated_by,
                        "product_updated_user_name": response.data.product_details.product_updated_user_name,
                        "product_updated_at": UpdatedAT
                    });
                }
                else {
                    setProductDetails({});
                }

                if (response.data.product_feature_list !== null) {
                    setProductFeatureList(response.data.product_feature_list);
                }
                else {
                    setProductFeatureList([]);
                }
            }
            else {
                toast.error(response.data.msg);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadProductDetails();
    }, []);
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Product Details</h4>
                                <hr className="bgcolor1" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>PRODUCT DETAILS</th>
                                        </tr>
                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white", fontSize: "12px" }}>
                                            <td>PRODUCT NAME</td>
                                            <td>PRODUCT TYPE</td>
                                            <td>PRODUCT CATEGORY</td>
                                            <td>TAX NAME</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{ProductDetails.product_name}</td>
                                            <td>{ProductDetails.product_type}</td>
                                            <td>{ProductDetails.category_name}</td>
                                            <td>{ProductDetails.tax_group_name}</td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white", fontSize: "12px" }}>
                                            <td>PRODUCT TAG TITLE</td>
                                            <td>NO OF STOCKS</td>
                                            <td>SALE PRICE</td>
                                            <td>MRP</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{ProductDetails.product_tag_tittle}</td>
                                            <td>{ProductDetails.product_stocks}</td>
                                            <td>{ProductDetails.product_sale_price}</td>
                                            <td>{ProductDetails.product_mrp}</td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white", fontSize: "12px" }}>
                                            <td colSpan={3}>DESCRIPTION</td>
                                            <td>COVER IMAGE</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={3}>{ProductDetails.product_description}</td>
                                            <td><img className="playerProfilePic_home_tile "
                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PRODUCT/" + ProductDetails.product_cover_image}
                                                style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                            />
                                            </td>
                                        </tr>

                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white", fontSize: "12px" }}>
                                            <td>CREATED BY</td>
                                            <td>CREATED AT</td>
                                            <td>UPDATED BY</td>
                                            <td>UPDATED AT</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{ProductDetails.product_created_user_name}</td>
                                            <td>{ProductDetails.product_created_at}</td>
                                            <td>{ProductDetails.product_updated_user_name}</td>
                                            <td>{ProductDetails.product_updated_at}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table table-bordered mt-3">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "15px" }}>PRODUCT FEATURE LIST</th>
                                        </tr>
                                        <tr className='' style={{backgroundColor: "#38acec", fontWeight: "bold", textAlign: "center", color: "white", fontSize: "12px" }}>
                                            <td colSpan={2}>FEATURE HEADING</td>
                                            <td colSpan={2}>FEATURE DESCRIPTION</td>
                                        </tr>

                                        {ProductFeatureList.map((FeatureList, index) => (
                                            <tr style={{ textAlign: "center", color: "black" }} key={index}>
                                                <td colSpan={2}>{FeatureList.feature_heading}</td>
                                                <td colSpan={2}>{FeatureList.feature_description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )

}
export default ProductDetails;
