import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';

const PackageDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var packageid = searchParams.get("packageid");

    const [PackageDetails, setPackageDetails] = useState({});
    const [PackageFeatureList, setPackageFeatureList] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadPackageDetails = async () => {
        var list = {};
        list["product_id"] = packageid;

        await axios.post(process.env.REACT_APP_API + "PackageDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var PackageDetails = [], CreatedAT, UpdatedAT;
                if (response.data.package_details !== null) {
                    if (response.data.package_details.product_created_at !== null) {
                        var date = response.data.package_details.product_created_at
                        CreatedAT = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        CreatedAT = response.data.package_details.product_created_at;
                    }

                    if (response.data.package_details.product_updated_at !== null) {
                        var date = response.data.package_details.product_updated_at
                        UpdatedAT = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        UpdatedAT = response.data.package_details.product_updated_at;
                    }
                    setPackageDetails({
                        "product_id": response.data.package_details.product_id,
                        "product_type": response.data.package_details.product_type,
                        "product_category_id": response.data.package_details.product_category_id,
                        "category_name": response.data.package_details.category_name,
                        "product_name": response.data.package_details.product_name,
                        "product_tax_group_id": response.data.package_details.product_tax_group_id,
                        "tax_group_name": response.data.package_details.tax_group_name,
                        "product_description": response.data.package_details.product_description,
                        "product_cover_image": response.data.package_details.product_cover_image,
                        "product_tag_tittle": response.data.package_details.product_tag_tittle,
                        "product_sale_price": response.data.package_details.product_sale_price,
                        "product_mrp": response.data.package_details.product_mrp,
                        "product_number_of_days": response.data.package_details.product_number_of_days,
                        "product_created_by": response.data.package_details.product_created_by,
                        "product_created_user_name": response.data.package_details.product_created_user_name,
                        "product_created_at": CreatedAT,
                        "product_updated_by": response.data.package_details.product_updated_by,
                        "product_updated_user_name": response.data.package_details.product_updated_user_name,
                        "product_updated_at": UpdatedAT
                    });
                }
                else {
                    setPackageDetails({});
                }

                if (response.data.product_feature_list !== null) {
                    setPackageFeatureList(response.data.product_feature_list);
                }
                else {
                    setPackageFeatureList([]);
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
        LoadPackageDetails();
    }, []);
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Package Details</h4>
                                <hr className="bgcolor1" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>PACKAGE DETAILS</th>
                                        </tr>
                                        <tr className='' style={{ fontWeight: "bold", textAlign: "center", color: "white",backgroundColor: "#38acec" }}>
                                            <td>PACKAGE NAME</td>
                                            <td>PACKAGE TYPE</td>
                                            <td>PACKAGE CATEGORY</td>
                                            <td>TAX NAME</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{PackageDetails.product_name}</td>
                                            <td>{PackageDetails.product_type}</td>
                                            <td>{PackageDetails.category_name}</td>
                                            <td>{PackageDetails.tax_group_name}</td>
                                        </tr>

                                        <tr className='' style={{ fontWeight: "bold", textAlign: "center", color: "white",backgroundColor: "#38acec" }}>
                                            <td>PACKAGE TAG TITLE</td>
                                            <td>NO OF DAYS</td>
                                            <td>SALE PRICE</td>
                                            <td>MRP</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{PackageDetails.product_tag_tittle}</td>
                                            <td>{PackageDetails.product_number_of_days}</td>
                                            <td>{PackageDetails.product_sale_price}</td>
                                            <td>{PackageDetails.product_mrp}</td>
                                        </tr>

                                        <tr className='' style={{ fontWeight: "bold", textAlign: "center", color: "white",backgroundColor: "#38acec" }}>
                                            <td colSpan={3}>DESCRIPTION</td>
                                            <td>COVER IMAGE</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={3}>{PackageDetails.product_description}</td>
                                            <td><img className="playerProfilePic_home_tile "
                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PACKAGE/" + PackageDetails.product_cover_image}
                                                style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                            />
                                            </td>
                                        </tr>

                                        <tr className='' style={{ fontWeight: "bold", textAlign: "center", color: "white",backgroundColor: "#38acec" }}>
                                            <td>CREATED BY</td>
                                            <td>CREATED AT</td>
                                            <td>UPDATED BY</td>
                                            <td>UPDATED AT</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{PackageDetails.product_created_user_name}</td>
                                            <td>{PackageDetails.product_created_at}</td>
                                            <td>{PackageDetails.product_updated_user_name}</td>
                                            <td>{PackageDetails.product_updated_at}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table table-bordered mt-3">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "17px" }}>PACKAGE FEATURE LIST</th>
                                        </tr>
                                        <tr className='' style={{ fontWeight: "bold", textAlign: "center", color: "white",backgroundColor: "#38acec" }}>
                                            <td colSpan={2}>FEATURE HEADING</td>
                                            <td colSpan={2}>FEATURE DESCRIPTION</td>
                                        </tr>

                                        {PackageFeatureList.map((FeatureList, index) => (
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
export default PackageDetails;
