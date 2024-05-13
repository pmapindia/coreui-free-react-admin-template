import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const ProductList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };


    const [ProductListInput, setProductListInput] = useState({
        product_type: "PRODUCT"
    });

    const { product_type } = ProductListInput;

    const [ProductLists, setProductLists] = useState([]);

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setProductListInput({ ...ProductListInput, [e.target.name]: e.target.value });
        setProductLists([]);//PASSING EMPTY ARRAY
    }

    const [Loading, setLoading] = useState(false);

    const LoadAllProducts = async () => {

        var list = {};
        list["product_type"] = product_type;

        await axios.post(process.env.REACT_APP_API + "ProductList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                if (response.data.product_list !== null) {
                    setProductLists(response.data.product_list)
                }
                else {
                    setProductLists([]);
                }
            }
            else {
                setLoading(false);
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
            alert(error.message);
        })
    }

    useEffect(() => {
        LoadAllProducts();
    }, []);

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PRODUCT_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <h4>Product List</h4>
                        <hr className="bgcolor" style={{ height: "2px" }} />
                        <CForm>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CCard style={{ borderRadius: "20px" }}>
                                        {/* <CCardHeader style={{ borderRadius: "20px" }}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Select Product Type</CLabel><span className="red">*</span>
                                            <CSelect style={{ borderRadius: "20px" }} custom name="product_type" onChange={(e) => OnInputChange(e)}>
                                                <option>Select Type</option>
                                                {ProductDropdowns.map((dropdown, index) => (
                                                    <option selected={product_type === dropdown.dd_id}
                                                        key={index + 1}
                                                        value={dropdown.dd_id}>{dropdown.dd_name}</option>
                                                ))}
                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                </CCardHeader> */}
                                        <CCardBody>
                                            {Loading ?
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>SL No</th>
                                                            <th>Product Name</th>
                                                            <th>Product Type</th>
                                                            <th>Product Category</th>
                                                            <th>Tax Name</th>
                                                            <th>Title</th>
                                                            <th>Sale Price</th>
                                                            <th>MRP</th>
                                                            {
                                                                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PRODUCT_EDIT) ?
                                                                    <th>Edit</th>
                                                                    : null
                                                            }
                                                            {
                                                                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PRODUCT_DETAILS) ?
                                                                    <th>Details</th>
                                                                    : null
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ProductLists.map((List, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{List.product_name}</td>
                                                                <td>{List.product_type}</td>
                                                                <td>{List.category_name}</td>
                                                                <td>{List.tax_group_name}</td>
                                                                <td>{List.product_tag_tittle}</td>
                                                                <td>{List.product_sale_price}</td>
                                                                <td>{List.product_mrp}</td>
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PRODUCT_EDIT) ?
                                                                        <td>
                                                                            <Link to={{
                                                                                pathname: '/add-new-product',
                                                                                pfid: {
                                                                                    pfid: List.product_id
                                                                                }
                                                                            }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                <i className="fa fa-pencil" aria-hidden="true">
                                                                                </i>
                                                                            </Link>
                                                                        </td>
                                                                        : null
                                                                }
                                                                {
                                                                    cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_PRODUCT_DETAILS) ?
                                                                        <td>
                                                                            <Link to={`/product-details?prodid=${List.product_id}`}
                                                                                className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center", backgroundColor: "#3b3f4b" }}>
                                                                                Details
                                                                            </Link>
                                                                        </td>
                                                                        : null
                                                                }


                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                : null}
                                        </CCardBody>
                                    </CCard>

                                </CCol>
                            </CRow>
                        </CForm>
                    </div>
                    :
                    <Notification />
            }
        </>
    )
}
export default ProductList;