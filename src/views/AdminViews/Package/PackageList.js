import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const PackageList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [PackageDropdowns, setPackageDropdowns] = useState([]);

    const [PackageListInput, setPackageListInput] = useState({
        product_type: ""
    });

    const { product_type } = PackageListInput;

    const [PackageLists, setPackageLists] = useState([]);

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setPackageListInput({ ...PackageListInput, [e.target.name]: e.target.value });
        setPackageLists([]);//PASSING EMPTY ARRAY
    }

    const GetDropDropdowns = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_PRODUCT_PACKAGE", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_PRODUCT_PACKAGE") {
                        setPackageDropdowns(dd_list.each_drop_down_list);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDropdowns();
    }, []);


    const [Loading, setLoading] = useState(false);

    const LoadAllPackages = async () => {

        var list = {};
        list["product_type"] = product_type;

        await axios.post(process.env.REACT_APP_API + "PackageList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setLoading(true);
                if (response.data.package_list !== null) {
                    setPackageLists(response.data.package_list)
                }
                else {
                    setPackageLists([]);
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
        LoadAllPackages();
    }, [product_type]);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <h4>Package List</h4>
                <hr className="bgcolor" style={{ height: "2px" }} />
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">
                            <CCard style={{ borderRadius: "20px" }}>
                                <CCardHeader style={{ borderRadius: "20px" }}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CLabel>Select Package Type</CLabel><span className="red">*</span>
                                            <CSelect style={{ borderRadius: "20px" }} custom name="product_type" onChange={(e) => OnInputChange(e)}>
                                                <option>Select Type</option>
                                                <option selected={product_type === "PACKAGE"} value="PACKAGE">PACKAGE</option>
                                                <option selected={product_type === "PROGRAM"} value="PROGRAM">PROGRAM</option>

                                            </CSelect>
                                        </CCol>
                                    </CRow>
                                </CCardHeader>
                                {Loading ?
                                    <CCardBody>
                                        
                                        <table className="table table-bordered-less width100">
                                            <thead>
                                                <tr>
                                                    <th>SL No</th>
                                                    <th>Package Name</th>
                                                    <th>Package Type</th>
                                                    <th>Package Category</th>
                                                    <th>Tax Name</th>
                                                    <th>Title</th>
                                                    <th>Sale Price</th>
                                                    <th>MRP</th>
                                                    <th>Edit</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {PackageLists.map((List, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{List.product_name}</td>
                                                        <td>{List.product_type}</td>
                                                        <td>{List.category_name}</td>
                                                        <td>{List.tax_group_name}</td>
                                                        <td>{List.product_tag_tittle}</td>
                                                        <td>{List.product_sale_price}</td>
                                                        <td>{List.product_mrp}</td>
                                                        <td>
                                                            <Link to={{
                                                                pathname: '/add-new-package',
                                                                pfid: {
                                                                    pfid: List.product_id
                                                                }
                                                            }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                <i className="fa fa-pencil" aria-hidden="true">
                                                                </i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={`/package-details?packageid=${List.product_id}`}
                                                                className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                    </CCardBody>
                                    : null}
                            </CCard>
                        </CCol>
                    </CRow>
                </CForm>
            </div>
        </>
    )
}
export default PackageList;