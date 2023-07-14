import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';

const AddNewCategory = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    let history = useHistory();

    const [disablebutton, setDisableButton] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [CategoryAddInput, setCategoryAddInput] = useState({
        categories_id: "",
        categories_name: ""
    });

    const {
        categories_id,
        categories_name
    } = CategoryAddInput;

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setCategoryAddInput({ ...CategoryAddInput, [e.target.name]: e.target.value });
    }

    const OnSubmitCategory = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        if (categories_id === "") {
            await axios.post(process.env.REACT_APP_API + "CategoryAdd", {
                "categories_name": categories_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //history.push(`/customerlist`);
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
        else {
            await axios.post(process.env.REACT_APP_API + "CategoryUpdate", {
                "categories_id": categories_id,
                "categories_name": categories_name
            }, config).then(response => {
                console.log(response);
                if (response.data.is_success) {
                    toast.success(response.data.msg);
                    setWarnings({ ["warning"]: "" });
                    window.location.reload(true);
                    //history.push(`/customerlist`);
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
    }

    // Category List

    const [CategoryList, setCategoryList] = useState([]);

    const LoadCategoryList = async () => {
        await axios.post(process.env.REACT_APP_API + "CategoryList", {
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                setCategoryList(response.data.categories_list);
            }
            else {
                setCategoryList([]);
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }
    useEffect(() => {
        LoadCategoryList();
    }, []);

    const CategoryDetailsByID = async (id) => {
        var list = {};
        list["category_id"] = id;
        await axios.post(process.env.REACT_APP_API + "CategoryDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                setCategoryAddInput({
                    ...CategoryAddInput,
                    "categories_id": response.data.category_details.category_id,
                    "categories_name": response.data.category_details.category_name
                });

            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    const Parentvaluetomodal = (data, index) => {

        console.log("index: " + index);
        var temp_user = [...CategoryList];
        temp_user.splice(index, 1);
        setCategoryList([]);
        setCategoryList(temp_user);
        console.log("temp_user: " + temp_user);
        console.log("all user: " + CategoryList);
        console.log("Delete")
    }
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Add New Category</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />

                                <CForm onSubmit={(e) => OnSubmitCategory(e)}>
                                    <CRow>
                                        <CCol xs="12" sm="4" md="4" lg="4">
                                            <CFormGroup>
                                                <CLabel>Category Name</CLabel><span className="red">*</span>
                                                <CInput type='text' placeholder='Enter Category Name' required="required"
                                                    name='categories_name'
                                                    value={categories_name}
                                                    onChange={(e) => OnInputChange(e)}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-2">
                                            <div className="bgcolor mt-3" style={{ borderRadius: "5px" }}>
                                                <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                </CForm>
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
                                                <th>Sl No</th>
                                                <th>Category Name</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CategoryList.map((List, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{List.category_name}</td>
                                                    <td>
                                                        <CButton className="btn" style={{ paddingLeft: "2px" }} onClick={() => CategoryDetailsByID(List.category_id)}>
                                                            <i className="fa fa-pencil" aria-hidden="true">
                                                            </i></CButton>
                                                    </td>
                                                    <td>
                                                        <DeleteModal delete_guid={List.category_id}
                                                            name={List.category_name}
                                                            index={index}
                                                            apiname={"CategoryDelete"}
                                                            guidinput={"category_id"}
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
            </div >
        </>
    )
}
export default AddNewCategory;
