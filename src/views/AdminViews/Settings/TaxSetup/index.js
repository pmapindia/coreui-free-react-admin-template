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
import { Link } from 'react-router-dom';

const TaxSetup = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [BranchDropdowns, setBranchDropdowns] = useState([]);

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [TaxSetupAdd, setTaxSetupAdd] = useState({
        tax_id: "",
        tax_name: "",
        tax_percentage: ""
    });

    const {
        tax_id,
        tax_name,
        tax_percentage
    } = TaxSetupAdd;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTaxSetupAdd({ ...TaxSetupAdd, [e.target.name]: e.target.value });
    }

    const OnSubmitTaxSetup = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "TaxSetupAdd", {
            "tax_name": tax_name,
            "tax_percentage": tax_percentage
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                window.location.reload(true);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
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

    const [TaxSetupList, setTaxSetupList] = useState([]);

    const LoadTaxSetupList = async () => {
        await axios.post(process.env.REACT_APP_API + "TaxSetupList", {
            "search_text": ""
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var list = [], CreateAt;
                if (response.data.tax_list !== null) {
                    for (let i = 0; i < response.data.tax_list.length; i++) {
                        if (response.data.tax_list[i].tax_created_at == null) {
                            var date = response.data.tax_list[i].tax_created_at;
                            CreateAt = date.substring(0, 10);
                        }
                        else {
                            CreateAt = response.data.tax_list[i].tax_created_at;
                        }
                        list.push({
                            "tax_id": response.data.tax_list[i].tax_id,
                            "tax_name": response.data.tax_list[i].tax_name,
                            "tax_percentage": response.data.tax_list[i].tax_percentage,
                            "tax_created_at": CreateAt
                        })
                    }
                    //setTaxSetupList(list);
                    setTaxSetupList(response.data.tax_list);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadTaxSetupList();
    }, []);


    const TaxSetupDetailsByID = async (id) => {
        var list = {};
        list["tax_id"] = id;
        await axios.post(process.env.REACT_APP_API + "TaxSetupDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                setTaxSetupAdd(response.data.tax_details);

            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const Parentvaluetomodal = (data, index) => {

        console.log("index: " + index);
        var temp_user = [...TaxSetupList];
        temp_user.splice(index, 1);
        setTaxSetupList([]);
        setTaxSetupList(temp_user);
        console.log("temp_user: " + temp_user);
        console.log("all user: " + TaxSetupList);
        console.log("Delete")
    }


    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Add New Tax Setup</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitTaxSetup(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Tax Name</CLabel><span className="red">*</span>
                                                <CInput type='text' rows={3} placeholder='Enter Tax Name' required="required"
                                                    name='tax_name'
                                                    value={tax_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Tax Percentage</CLabel><span className="red">*</span>
                                                <CInput type='text' rows={3} placeholder='Enter Tax Percentage' required="required"
                                                    name='tax_percentage'
                                                    value={tax_percentage}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
                                        </CCol>
                                    </CRow>
                                </CForm>
                                <hr className="bgcolor" style={{ height: "1px" }} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <div className="table-responsive  my-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>SL_No</th>
                                                <th>Tax Name</th>
                                                <th>Tax Percentage</th>
                                                <th>Created At</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TaxSetupList.map((List, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{List.tax_name}</td>
                                                    <td>{List.tax_percentage}</td>
                                                    <td>{List.tax_created_at.substring(0, 10)}</td>
                                                    <td>
                                                        <CButton className="btn" style={{ paddingLeft: "2px" }} onClick={() => TaxSetupDetailsByID(List.tax_id)}>
                                                            <i className="fa fa-pencil" aria-hidden="true">
                                                            </i></CButton>
                                                    </td>
                                                    <td>
                                                        <DeleteModal delete_guid={List.tax_id}
                                                            name={List.tax_name}
                                                            index={index}
                                                            apiname={"TaxSetupDelete"}
                                                            guidinput={"tax_id"}
                                                            changeDependency={Parentvaluetomodal}
                                                        />
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
        </>
    )
}
export default TaxSetup;
