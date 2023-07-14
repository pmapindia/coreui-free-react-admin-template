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

const TaxGroup = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [disablebutton, setDisableButton] = useState(false);
    const [allTaxGroup, setAllTaxGroup] = useState([]);

    let history = useHistory();
    const [search_text1, setSearchText] = useState({
        search_text: ""
    });

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };
    const { search_text } = search_text1;

    const OnTaxSearchChange = (e) => {
        console.log(e.target.value);
        setSearchText({ ...search_text1, [e.target.name]: e.target.value });
    }

    const LoadAllTaxGroup = async () => {
        var list = {};
        list["search_text"] = search_text;
        await axios.post(process.env.REACT_APP_API + "TaxGroupSetupList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var taxgrouplist = [];
                for (let i = 0; i < response.data.tax_group_setup_list.length; i++) {
                    if (response.data.tax_group_setup_list[i].tax_group_created_at !== null) {
                        var cdate = response.data.tax_group_setup_list[i].tax_group_created_at;
                        var cdatenew = cdate.substring(0, 10);
                    } else {
                        var cdatenew = response.data.tax_group_setup_list[i].tax_group_created_at;
                    }
                    taxgrouplist.push({
                        "tax_group_id": response.data.tax_group_setup_list[i].tax_group_id,
                        "tax_group_name": response.data.tax_group_setup_list[i].tax_group_name,
                        "tax_group_created_at": cdatenew
                    });
                }
                setAllTaxGroup(taxgrouplist);
            }
            else {
                setAllTaxGroup([]);
                // toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    const [TaxGroupAdd, setTaxAdd] = useState({
        tax_group_id: "",
        tax_group_name: "",
        tax_list: [],
        tax_created_user_guid: cookies.user_guid,
    });
    const {
        tax_group_id,
        tax_group_name,
        tax_created_user_guid,
    } = TaxGroupAdd;
    const [taxlistdropdowns, setTaxListDropdowns] = useState([]);
    const [taxlist, setTaxList] = useState([]);

    useEffect(() => {
        LoadAllTax();
    }, []);


    const LoadAllTax = async () => {
        var list = {};
        list["search_text"] = "";
        await axios.post(process.env.REACT_APP_API + "TaxSetupList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.tax_list !== null) {
                    setTaxList(response.data.tax_list);
                    let ddlist = [];
                    for (let sd = 0; sd < response.data.tax_list.length; sd++) {
                        ddlist.push({ "value": response.data.tax_list[sd].tax_id, "label": response.data.tax_list[sd].tax_name })
                    }
                    //  alert(ddlist);
                    console.log(ddlist);
                    setTaxListDropdowns(ddlist);
                }
            }
            else {
                setTaxListDropdowns([]);
                setTaxList([]);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    const [selectedtaxes, setSelectedTaxes] = useState([]);
    //searchable dropdown
    const onInputChangedrop = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        let values = [...taxlist];
        for (let i = 0; i < values.length; i++) {
            if (values[i].tax_id === e.value) {
                setSelectedTaxes([...selectedtaxes,
                {
                    ["tax_id"]: values[i].tax_id,
                    ["tax_name"]: values[i].tax_name,
                    ["tax_percentage"]: values[i].tax_percentage,
                }
                ]);
            }
        }
    };


    const RemoveSelectedTaxRow = (index) => {
        let values = [...selectedtaxes];
        values.splice(index, 1);
        setSelectedTaxes(values);
    }

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });
    const OnInputChange = (e) => {
        console.log(e.target.value);
        setTaxAdd({ ...TaxGroupAdd, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        LoadAllTaxGroup();
    }, []);

    const OnSubmitTaxGroupAdd = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        var arr = [];
        for (let i = 0; i < selectedtaxes.length; i++) {
            arr.push({ ["tax_id"]: selectedtaxes[i].tax_id });
        }
        if (tax_group_id === "") {
            await axios.post(process.env.REACT_APP_API + "TaxGroupSetupAdd", {
                "tax_group_name": tax_group_name,
                "tax_list": arr,
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    LoadAllTaxGroup();
                    setTaxAdd({ ...TaxGroupAdd, ["tax_group_name"]: "" });
                    setSelectedTaxes([]);

                }
                else {
                    toast.error(response.data.msg);
                    setWarnings({ ["warnings"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    //history.push('/tax/tax-name');
                }
            }).catch(error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
        }
        else {
            await axios.post(process.env.REACT_APP_API + "TaxGroupSetupUpdate", {
                "tax_group_id": tax_group_id,
                "tax_group_name": tax_group_name,
                "tax_list": arr,
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    LoadAllTaxGroup();
                    setTaxAdd({ ...TaxGroupAdd, ["tax_group_name"]: "" });
                    setSelectedTaxes([]);

                }
                else {
                    toast.error(response.data.msg);
                    setWarnings({ ["warnings"]: response.data.msg });
                    setDisableButton(false);
                    document.getElementById("img_gif_loading_btn").style.display = "none";
                    //history.push('/tax/tax-name');
                }
            }).catch(error => {
                console.log(error);
                alert(error.message);
                setDisableButton(false);
                document.getElementById("img_gif_loading_btn").style.display = "none";
            })
        }
    }

    const Parentvaluetomodal = (data, index) => {
        console.log("index: " + index);
        LoadAllTaxGroup();
        console.log("Delete")
    }

    const TaxGroupSetupDetailsByID = async (id) => {
        var list = {};
        list["tax_group_id"] = id;
        await axios.post(process.env.REACT_APP_API + "TaxGroupSetupDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setTaxAdd(response.data.tax_group_details);
                var selectedtax = [];
                for (let i = 0; i < response.data.tax_list.length; i++) {
                    selectedtax.push(
                        {
                            ["tax_id"]: response.data.tax_list[i].tax_group_tax_tax_id,
                            ["tax_name"]: response.data.tax_list[i].tax_name,
                            ["tax_percentage"]: response.data.tax_list[i].tax_percentage,
                        });
                }
                setSelectedTaxes(selectedtax);
            } else {
                toast.error(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Add New Tax Group</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CForm onSubmit={(e) => OnSubmitTaxGroupAdd(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                            <CFormGroup>
                                                <CLabel>Tax Group Name</CLabel><span className="red">*</span>
                                                <CInput type="text" placeholder="Tax Group Name"
                                                    name="tax_group_name"
                                                    value={tax_group_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />{errors.tax_group_name && <p style={{ color: "red" }}>{errors.tax_group_name}</p>}
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs="12" sm="5" md="5" lg="5">
                                            <CFormGroup>
                                                <CLabel>Select Tax</CLabel><span className="red">*</span>
                                                <Select
                                                    value={taxlistdropdowns.filter(function (option) {
                                                        return option.value === tax_group_id;
                                                    })}
                                                    options={taxlistdropdowns}
                                                    onChange={(e) => onInputChangedrop(e)}
                                                ></Select>
                                            </CFormGroup>
                                            <div className="table-responsive  my-table">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>SLNo</th>
                                                            <th >Tax Name</th>
                                                            <th>Tax Percentage</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedtaxes.map((selectedtaxe, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{selectedtaxe.tax_name}</td>
                                                                <td>{selectedtaxe.tax_percentage}</td>
                                                                <td><CButton className="btn" onClick={() => RemoveSelectedTaxRow(index)}>
                                                                    <i className="fa fa-trash" aria-hidden="true" >
                                                                    </i></CButton>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCol>
                                        <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
                                            <div className="mt-4  bgcolor" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white" }} onClick={(e) => OnSubmitTaxGroupAdd(e)} disabled={disablebutton}>Submit</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                            {/* <CButton type="submit" className="mt-4 bgcyan white width100">Save</CButton> */}
                                            {warnings.warning && <p className="red">{warnings.warning}</p>}
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
                            <h4>Tax Group List</h4>
                            <hr className="bgcolor" style={{ height: "1px" }} />
                            <CRow>
                                <CCol xs="12" sm="4" md="4" lg="4" className="mb-3">
                                    <div className="inner-addon right-addon">
                                        <i className="fa fa-search"></i>
                                        <CInput type="text"
                                            placeholder="Search"
                                            name="search_text"
                                            value={search_text}
                                            onChange={(e) => OnTaxSearchChange(e)}
                                            onKeyUp={() => LoadAllTaxGroup()}>
                                        </CInput>
                                    </div>
                                </CCol>
                            </CRow>
                            <div className="table-responsive  my-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SLNo</th>
                                            <th>Tax Group Name</th>
                                            <th>Created At</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTaxGroup.map((allTax1, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{allTax1.tax_group_name}</td>
                                                <td>{allTax1.tax_group_created_at}</td>
                                                <td><CButton className="btn" style={{ paddingLeft: "3px", alignSelf: "center" }} onClick={() => TaxGroupSetupDetailsByID(allTax1.tax_group_id)}>
                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                    </i></CButton>
                                                </td>

                                                <td >
                                                    <DeleteModal delete_guid={allTax1.tax_group_id}
                                                        name={allTax1.tax_group_name}
                                                        index={index}
                                                        apiname={"TaxGroupSetupDelete"}
                                                        guidinput={"tax_group_id"}
                                                        changeDependency={Parentvaluetomodal}
                                                    />
                                                </td>
                                                <td>
                                                    <Link to={`taxgroup-setupdetails?taxgroupid=${allTax1.tax_group_id}`}
                                                        className="btn bgcolor white width100" style={{ paddingLeft: "4px", textAlign: "center" }}>
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
        </div >
                    </>
                    );
}
export default TaxGroup;