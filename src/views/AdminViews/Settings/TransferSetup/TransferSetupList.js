import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TransferSetupList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [TransferSetupList, setTransferSetupList] = useState([]);
    const LoadTransferSetup = async () => {
        await axios.post(process.env.REACT_APP_API + "SettingsTransferSetupList", {
            "search_text": ""
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setTransferSetupList(response.data.transfer_setup_list);
            }
            else {
                setTransferSetupList([]);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadTransferSetup();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...TransferSetupList];
        temp_user.splice(index, 1);
        setTransferSetupList([]);
        setTransferSetupList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + PaymentTypeList);
        // console.log("Delete")
    }
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol xs="12" sm="10" md="10" lg="10">
                                        <h4>Transfer Setup List</h4>
                                    </CCol>
                                    {TransferSetupList.length > 0 ? null :
                                        <CCol xs="12" sm="2" md="2" lg="2">
                                            <Link to={`/trans-setup`} className="btn btn-sm bgcolor white width100">Add New Setup</Link>
                                        </CCol>
                                    }
                                </CRow>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Transfer Setup Amount</th>
                                                        <th>Created By</th>
                                                        <th>Created At</th>
                                                        <th>Updated By</th>
                                                        <th>Updated At</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {TransferSetupList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.transfer_setup_amount}</td>
                                                            <td>{List.created_name}</td>
                                                            <td>{List.transfer_setup_created_at !== null ? List.transfer_setup_created_at.substring(0, 10).split('-').reverse().join('-') : List.transfer_setup_created_at}</td>
                                                            <td>{List.updated_name}</td>
                                                            <td>{List.transfer_setup_updated_at !== null ? List.transfer_setup_updated_at.substring(0, 10).split('-').reverse().join('-') : List.transfer_setup_updated_at}</td>
                                                            <td>
                                                                <Link to={{
                                                                    pathname: '/trans-setup',
                                                                    pfid: {
                                                                        pfid: List.transfer_setup_id
                                                                    }
                                                                }} className="btn" style={{ paddingLeft: "2px" }}>
                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                    </i>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.transfer_setup_id}
                                                                    name={List.transfer_setup_amount}
                                                                    index={index}
                                                                    apiname={"SettingsTransferSetupDelete"}
                                                                    guidinput={"transfer_setup_id"}
                                                                    changeDependency={Parentvaluetomodal}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>

        </>
    )
}
export default TransferSetupList;