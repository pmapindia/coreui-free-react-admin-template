import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const BranchList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [BranchLists, setBranchLists] = useState([]);

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;


    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadBranchList();
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
        setBranchLists([]);
    }

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadBranchList = async () => {
        var list = {};
        // list["search_text"] = search_text;
        // list["list_limit"] = 50;
        // list["current_size"] = 0;
        await axios.post(process.env.REACT_APP_API + "BranchList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                //toast.success(response.data.msg);
                var BranchList = [], CreatedAt, UpdatedAt;
                if (response.data.branch_list !== null) {
                    for (let i = 0; i < response.data.branch_list.length; i++) {
                        if (response.data.branch_list[i].branch_created_at !== null) {
                            var Date = response.data.branch_list[i].branch_created_at;
                            CreatedAt = Date.substring(0, 10);
                        }
                        else {
                            CreatedAt = response.data.branch_list[i].branch_created_at;
                        }

                        if (response.data.branch_list[i].branch_updated_at !== null) {
                            var Date = response.data.branch_list[i].branch_updated_at;
                            UpdatedAt = Date.substring(0, 10);
                        }
                        else {
                            UpdatedAt = response.data.branch_list[i].branch_updated_at;
                        }

                        BranchList.push({
                            "branch_id": response.data.branch_list[i].branch_id,
                            "branch_name": response.data.branch_list[i].branch_name,
                            "branch_organization_name": response.data.branch_list[i].branch_organization_name,
                            "branch_email_address": response.data.branch_list[i].branch_email_address,
                            "branch_gstn": response.data.branch_list[i].branch_gstn,
                            "branch_pan": response.data.branch_list[i].branch_pan,
                            "branch_address": response.data.branch_list[i].branch_address,
                            "branch_landline_number": response.data.branch_list[i].branch_landline_number,
                            "branch_mobile_number": response.data.branch_list[i].branch_mobile_number,
                            "branch_terms_and_conditions": response.data.branch_list[i].branch_terms_and_conditions,
                            "branch_logo": response.data.branch_list[i].branch_logo,
                            "branch_color_code": response.data.branch_list[i].branch_color_code,
                            "branch_website": response.data.branch_list[i].branch_website,
                            "branch_created_user_name": response.data.branch_list[i].branch_created_user_name,
                            "branch_created_at": CreatedAt,
                            "branch_updated_by": response.data.branch_list[i].branch_updated_by,
                            "branch_updated_user_name": response.data.branch_list[i].branch_updated_user_name,
                            "branch_updated_at": UpdatedAt
                        });
                    }
                    setBranchLists(BranchList);
                }
                else {
                    //toast.error(response.data.msg);
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
        LoadBranchList();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...BranchLists];
        temp_user.splice(index, 1);
        setBranchLists([]);
        setBranchLists(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + BranchLists);
        // console.log("Delete")
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Branch List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />

                                        <CForm>
                                            <CRow>
                                                <CCol xs="12" sm="4" md="4" lg="4" className="mt-2 pt-1">
                                                    <div class="inner-addon right-addon">
                                                        <i class="fa fa-search"></i>
                                                        <CInput type="text" style={{ borderRadius: "20px" }}
                                                            placeholder="Search Here..."
                                                            name="search_text"
                                                            value={search_text}
                                                            onChange={(e) => OnInputChangeSearch(e)}
                                                        >
                                                        </CInput>
                                                    </div>
                                                </CCol>
                                                <CCol xs="12" sm="5" md="5" lg="5"></CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-2 pt-1">
                                                    {/* <Link to={`/adduser`}
                                className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                Add New User
                            </Link> */}
                                                </CCol>
                                                <CCol xs="12" sm="12" md="12" lg="12">
                                                    <div className=" my-table table-responsive width100 mt-4">
                                                        <table className="table table-bordered-less width100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sl_No</th>
                                                                    <th>Branch_Name</th>
                                                                    <th>Organization_Name</th>
                                                                    {/* <th>GSTN</th>
                                                            <th>PAN</th> */}
                                                                    <th>Email_Id</th>
                                                                    {/* <th>Landline</th> */}
                                                                    <th>Mobile_No</th>
                                                                    {/* <th>Created_By</th>
                                                            <th>Created_At</th>
                                                            <th>Updated_By</th>
                                                            <th>Updated_At</th> */}
                                                                    <th>Edit</th>
                                                                    {
                                                                        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_DELETE) ?
                                                                            <th>Delete</th>
                                                                            : null
                                                                    }
                                                                    <th>Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {BranchLists.map((List, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{List.branch_name}</td>
                                                                        <td>{List.branch_organization_name}</td>
                                                                        {/* <td>{List.branch_gstn}</td>
                                                                <td>{List.branch_pan}</td> */}
                                                                        <td>{List.branch_email_address}</td>
                                                                        {/* <td>{List.branch_landline_number}</td> */}
                                                                        <td>{List.branch_mobile_number}</td>
                                                                        {/* <td>{List.branch_created_user_name}</td>
                                                                <td>{List.branch_created_at}</td>
                                                                <td>{List.branch_updated_user_name}</td>
                                                                <td>{List.branch_updated_at}</td> */}
                                                                        <td>
                                                                            <Link to={`/branch-update?branchid=${List.branch_id}`} className="btn" style={{ paddingLeft: "2px" }}>
                                                                                <i className="fa fa-pencil" aria-hidden="true">
                                                                                </i>
                                                                            </Link>
                                                                        </td>
                                                                        {
                                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_DELETE) ?
                                                                                <DeleteModal delete_guid={List.branch_id}
                                                                                    name={List.branch_name}
                                                                                    index={index}
                                                                                    apiname={"BranchDelete"}
                                                                                    guidinput={"branch_id"}
                                                                                    changeDependency={Parentvaluetomodal}
                                                                                />
                                                                                : null
                                                                        }
                                                                        <td>

                                                                        </td>

                                                                        <td>
                                                                            <Link to={`branchdetails?branchid=${List.branch_id}`}
                                                                                className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center", backgroundColor: "#3b3f4b" }}>
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
export default BranchList;