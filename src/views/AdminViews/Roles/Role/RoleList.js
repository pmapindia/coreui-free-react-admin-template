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
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const RoleList = () => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    // List API

    const [RoleList, setRoleList] = useState([]);
    const LoadRoleList = async () => {
        await axios.post(process.env.REACT_APP_API + "RoleList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setRoleList(response.data.role_list);
            }
            else {
                setRoleList(response.data.role_list);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadRoleList();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        var temp_user = [...RoleList];
        temp_user.splice(index, 1);
        setRoleList([]);
        setRoleList(temp_user);
    }

    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_LIST) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4>Role List</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Role Name</th>
                                                        {
                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_EDIT) ?
                                                                <th>Edit</th>
                                                                : null
                                                        }
                                                        {
                                                            cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_DELETE) ?
                                                                <th>Delete</th>
                                                                : null
                                                        }
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {RoleList.map((RoleList, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{RoleList.role_name}</td>
                                                            {
                                                                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_EDIT) ?
                                                                    <td>
                                                                        <Link to={{
                                                                            pathname: '/new-role',
                                                                            pfid: {
                                                                                pfid: RoleList.role_id
                                                                            }
                                                                        }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                            <i className="fa fa-pencil" aria-hidden="true">
                                                                            </i>
                                                                        </Link>
                                                                    </td>
                                                                    : null
                                                            }
                                                            {
                                                                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_ROLE_DELETE) ?
                                                                    <td>
                                                                        <DeleteModal delete_guid={RoleList.role_id}
                                                                            name={RoleList.role_name}
                                                                            index={index}
                                                                            apiname={"RoleDelete"}
                                                                            guidinput={"role_id"}
                                                                            changeDependency={Parentvaluetomodal}
                                                                        />
                                                                    </td>
                                                                    : null
                                                            }


                                                            <td>
                                                                <Link to={`/role-details?roleid=${RoleList.role_id}`}
                                                                    className="btn btn-sm bgcolor white" style={{ paddingLeft: "4px", textAlign: "center" }}>
                                                                    Details
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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
export default RoleList;