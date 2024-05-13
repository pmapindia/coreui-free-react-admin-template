import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteModal from 'src/views/AdminViews/Modals/DeleteModal'
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const SupplierList = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const [loading, setLoading] = useState(false);

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    const [loadmorebtndisabled, setLoadMoreBtnDisabled] = useState(false);
    const [loadallbtndisabled, setLoadAllBtnDisabled] = useState(false);

    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [SupplierLists, setSupplierLists] = useState([]);

    const [ListInput, setListInput] = useState({
        search_text: "",
        list_limit: "",
        current_size: ""
    });

    const { search_text, list_limit, current_size } = ListInput;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadSupplierList();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setListInput({ ...ListInput, [e.target.name]: "" });
        } else {
            setListInput({ ...ListInput, [e.target.name]: e.target.value });

        }
        setSupplierLists([]);
    }

    const LoadSupplierList = async () => {
        if (currentsize != 0 && (currentsize >= list_count)) {
            setLoadAllBtnDisabled(true);
            setLoadMoreBtnDisabled(true);
            setLoading(false);
            return
        }

        var list = {};
        list["search_text"] = search_text;
        list["list_limit"] = 500;
        list["current_size"] = 0;

        await axios.post(process.env.REACT_APP_API + "SupplierList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.supplier_list !== null) {
                    setLoading(true);
                    setSupplierLists(response.data.supplier_list);
                }
                else {
                    setLoading(false);
                    setWarnings({ ["warning"]: response.data.msg });
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadSupplierList();
    }, []);

    const Parentvaluetomodal = (data, index) => {
        var temp_user = [...SupplierLists];
        temp_user.splice(index, 1);
        setSupplierLists([]);
        setSupplierLists(temp_user);
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SUPPLIER_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Supplier List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />

                                        <CRow>
                                            <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1">
                                                <CFormGroup>
                                                    <div class="inner-addon right-addon" style={{ borderRadius: "20px" }}>
                                                        <i class="fa fa-search"></i>
                                                        <CInput type="text" style={{ borderRadius: "20px" }}
                                                            placeholder="Search Here..."
                                                            name="search_text"
                                                            value={search_text}
                                                            onChange={(e) => OnInputChangeSearch(e)}
                                                        >
                                                        </CInput>
                                                    </div>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>

                                        {loading ?
                                            <CRow>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <div className=" my-table table-responsive width100 mt-1">
                                                        <table className="table table-bordered-less width100">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>SUPPLIER_NAME</th>
                                                                    <th>SUPPLIER_MOBILE_NO</th>
                                                                    <th>SUPPLIER_EMAIL_ADDRESS</th>
                                                                    <th>SUPPLIER_ADDRESS</th>
                                                                    <th>SUPPLIER_GSTN</th>
                                                                    <th>SUPPLIER_CODE</th>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SUPPLIER_EDIT) ?
                                                                            <th>EDIT</th>
                                                                            : null
                                                                    }
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SUPPLIER_DELETE) ?
                                                                            <th>DELETE</th>
                                                                            : null
                                                                    }

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {SupplierLists.map((SupplierList, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{SupplierList.supplier_name}</td>
                                                                        <td>{SupplierList.supplier_mobile_no}</td>
                                                                        <td>{SupplierList.supplier_email_address}</td>
                                                                        <td>{SupplierList.supplier_address}</td>
                                                                        <td>{SupplierList.supplier_gstn}</td>
                                                                        <td>{SupplierList.supplier_code}</td>
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SUPPLIER_EDIT) ?
                                                                                <td>
                                                                                    <Link to={{
                                                                                        pathname: '/supplier',
                                                                                        pfid: {
                                                                                            pfid: SupplierList.supplier_id
                                                                                        }
                                                                                    }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                                        </i>
                                                                                    </Link>
                                                                                </td>
                                                                                : null
                                                                        }
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_SUPPLIER_DELETE) ?
                                                                                <td>
                                                                                    <DeleteModal delete_guid={SupplierList.supplier_id}
                                                                                        name={SupplierList.supplier_name}
                                                                                        index={index}
                                                                                        apiname={"SupplierDelete"}
                                                                                        guidinput={"supplier_id"}
                                                                                        changeDependency={Parentvaluetomodal}
                                                                                    />
                                                                                </td>
                                                                                : null
                                                                        }
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                            : null
                                        }
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
export default SupplierList