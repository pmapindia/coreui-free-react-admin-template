import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';

const CustomerList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    const [currentsize, setCurrentSize] = useState(0);
    const [list_count, setListCount] = useState(0);

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                //LoadEnquiryLists();
                // Send Axios request here
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search_text])

    const OnInputChangeSearch = (e) => {
        console.log("target");
        console.warn(e.target.value);
        if (e.target.value === "") {
            setSearchText({ ...search_text1, [e.target.name]: "" });
        } else {
            setSearchText({ ...search_text1, [e.target.name]: e.target.value });

        }
        setCustLists([]);
    }
    const [loading, setLoading] = useState(false);
    const [CustLists, setCustLists] = useState([]);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadCustomerLists = async () => {

        var list = {};
        list["search_text"] = search_text;
        list["list_limit"] = 50;
        list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "CustomerList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setLoading(true);
                var CustList = [], CreatedAt, UpdatedAt, BirthDate;
                if (response.data.customer_list !== null) {

                    for (let i = 0; i < response.data.customer_list.length; i++) {

                        if (response.data.customer_list[i].customer_date_of_birth !== null) {
                            var Date = response.data.customer_list[i].customer_date_of_birth;
                            BirthDate = Date.substring(0, 10);
                        }
                        else {
                            BirthDate = response.data.customer_list[i].customer_date_of_birth;
                        }

                        if (response.data.customer_list[i].customer_created_at !== null) {
                            var Date = response.data.customer_list[i].customer_created_at;
                            CreatedAt = Date.substring(0, 10);
                        }
                        else {
                            CreatedAt = response.data.customer_list[i].customer_created_at;
                        }

                        if (response.data.customer_list[i].customer_updated_at !== null) {
                            var Date = response.data.customer_list[i].customer_updated_at;
                            UpdatedAt = Date.substring(0, 10);
                        }
                        else {
                            UpdatedAt = response.data.customer_list[i].customer_updated_at;
                        }

                        CustList.push({
                            "customer_id": response.data.customer_list[i].customer_id,
                            "customer_branch_id": response.data.customer_list[i].customer_branch_id,
                            "branch_name": response.data.customer_list[i].branch_name,
                            "customer_first_name": response.data.customer_list[i].customer_first_name,
                            "customer_last_name": response.data.customer_list[i].customer_last_name,
                            "customer_mobile_number": response.data.customer_list[i].customer_mobile_number,
                            "customer_password": response.data.customer_list[i].customer_password,
                            "customer_alternative_mobile": response.data.customer_list[i].customer_alternative_mobile,
                            "customer_email_address": response.data.customer_list[i].customer_email_address,
                            "customer_address": response.data.customer_list[i].customer_address,
                            "customer_gender": response.data.customer_list[i].customer_gender,
                            "customer_photo": response.data.customer_list[i].customer_photo,
                            "customer_date_of_birth": BirthDate,
                            "customer_referral_code": response.data.customer_list[i].customer_referral_code,
                            "customer_referred_by": response.data.customer_list[i].customer_referred_by,
                            "customer_source_id": response.data.customer_list[i].customer_source_id,
                            "source_name": response.data.customer_list[i].source_name,
                            "customer_created_by": response.data.customer_list[i].customer_created_by,
                            "customer_created_user_name": response.data.customer_list[i].customer_created_user_name,
                            "customer_created_at": CreatedAt,
                            "customer_updated_by": response.data.customer_list[i].customer_updated_by,
                            "customer_updated_user_name": response.data.customer_list[i].customer_updated_user_name,
                            "customer_updated_at": UpdatedAt
                        });
                    }
                    setCustLists(CustList);

                    if (response.data.customer_list != null) {
                        var _enquiry_current_size = currentsize + response.data.customer_list.length;
                        console.log("currentsize" + _enquiry_current_size);
                        setCurrentSize(_enquiry_current_size);
                        var finalList = CustLists.concat(CustList);
                        console.log("finalcustomerlist" + finalList);

                        setCustLists(finalList);
                        // var _list_count = response.data.total_list_count;
                        // console.log(_rc_list_count);
                        // setListCount(_rc_list_count);
                    }
                }
                else {
                    setLoading(false);
                    toast.error(response.data.msg);
                }
            }
            else {
                toast.error(response.data.msg);
                setLoading(false);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);

            })
    }

    useEffect(() => {
        LoadCustomerLists();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        console.log("index: " + index);
        var temp_user = [...CustLists];
        temp_user.splice(index, 1);
        setCustLists([]);
        setCustLists(temp_user);
        console.log("temp_user: " + temp_user);
        console.log("all user: " + CustLists);
        console.log("Delete")
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "20px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Customer List</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CRow>
                                    <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                        <CFormGroup>
                                            <div class="inner-addon right-addon">
                                                <i class="fa fa-search"></i>
                                                <CInput type="text"
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
                                                            <th>Sl_No</th>
                                                            <th>Branch</th>
                                                            <th>First_Name</th>
                                                            <th>Last_Name</th>
                                                            <th>Mobile_No</th>
                                                            <th>Referral_Code</th>
                                                            <th>Referral_By</th>
                                                            <th>Source</th>
                                                            <th>Created_By</th>
                                                            <th>Created_At</th>
                                                            <th>Updated_By</th>
                                                            <th>Updated_At</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {CustLists.map((List, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{List.branch_name}</td>
                                                                <td>{List.customer_first_name}</td>
                                                                <td>{List.customer_last_name}</td>
                                                                <td>{List.customer_mobile_number}</td>
                                                                <td>{List.customer_referral_code}</td>
                                                                <td></td>
                                                                <td>{List.source_name}</td>
                                                                <td>{List.customer_created_user_name}</td>
                                                                <td>{List.customer_created_at}</td>
                                                                <td>{List.customer_updated_user_name}</td>
                                                                <td>{List.customer_updated_at}</td>
                                                                <td>
                                                                    <Link to={{
                                                                        pathname: '/addcustomer',
                                                                        pfid: {
                                                                            pfid: List.customer_id
                                                                        }
                                                                    }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                        <i className="fa fa-pencil" aria-hidden="true">
                                                                        </i>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <DeleteModal delete_guid={List.customer_id}
                                                                        name={List.customer_first_name}
                                                                        index={index}
                                                                        apiname={"CustomerDelete"}
                                                                        guidinput={"customer_id"}
                                                                        changeDependency={Parentvaluetomodal}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <Link to={`customerdetails?custid=${List.customer_id}`}
                                                                        className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                        Details
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    : null}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}
export default CustomerList;