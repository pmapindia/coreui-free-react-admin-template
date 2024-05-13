import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const BranchUpdate = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    var branchid = searchParams.get("branchid");
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({
        warning: ""
    });

    const [disablebutton, setDisableButton] = useState(false);

    const [BranchAddInput, setBranchAddInput] = useState({
        branch_id: branchid,
        branch_name: "",
        branch_organization_name: "",
        branch_email_address: "",
        branch_gstn: "",
        branch_pan: "",
        branch_address: "",
        branch_landline_number: "",
        branch_mobile_number: "",
        branch_terms_and_conditions: "",
        branch_logo: "",
        branch_color_code: "",
        branch_website: "",
        branch_created: ""
    });

    const {
        branch_id,
        branch_name,
        branch_organization_name,
        branch_email_address,
        branch_gstn,
        branch_pan,
        branch_address,
        branch_landline_number,
        branch_mobile_number,
        branch_terms_and_conditions,
        branch_logo,
        branch_color_code,
        branch_website,
        branch_created
    } = BranchAddInput;

    let history = useHistory();

    const OnInputChange = (e) => {
        console.log(e.target.value);
        setBranchAddInput({ ...BranchAddInput, [e.target.name]: e.target.value });
    }

    const onChangeInputChange = (e, editor) => {
        //console.log(editor.getData());
        const data = editor.getData();
        setBranchAddInput({ ...BranchAddInput, ["branch_terms_and_conditions"]: data });
    }

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    //Upload Logo
    const [image_warnings, setImageWarnings] = useState({
        image_warning: ""
    });

    const [PictureDis, setPictureDis] = useState(false);

    var image = "";
    const onChangePicture = (e) => {
        console.log("jkfjjfjfg");
        console.log(e.target.name);
        if (e.target.files[0]) {

            var b = e.target.files[0].name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                var b = reader.result;
                var a = reader.result.split(',')[1];
                image = a;
                var image_name = e.target.name;
                UploadImage(image, image_name);
                console.log("Product image");
                //console.log(image);  
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage = async (branch_logo, image_name) => {

        console.log(image_name);
        //alert(product_image);
        console.log("UPload image api");
        var list = {};
        list["image_base64_string"] = branch_logo;
        list["image_for"] = "BRANCH";
        await axios.post(process.env.REACT_APP_API + "UploadImage", list, config).then(response => {
            console.log(response);

            console.log("imagename");
            // var img11=process.env.REACT_APP_PART_NUMBER_DOCUMENTS_PATH+response.data.image_name;
            console.log(response.data.image_name);

            if (response.data.is_success) {
                setPictureDis(true);
                toast.success(response.data.msg);
                setBranchAddInput({ ...BranchAddInput, ["branch_logo"]: response.data.image_name });
            }
            else {
                setImageWarnings({ ["image_warning"]: response.data.msg });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    //Remove images
    const Removeimagefront = (branchlogo) => {
        // alert(propertycoverimage);
        setBranchAddInput({ ...BranchAddInput, [branchlogo]: "" });
        setPictureDis(false);
    }

    const LoadBranchDetails = async () => {
        var list = {};
        list["branch_id"] = branchid;
        await axios.post(process.env.REACT_APP_API + "BranchDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.branch_details !== null) {
                    setPictureDis(true);
                    setBranchAddInput({
                        ...BranchAddInput,
                        "branch_id": response.data.branch_details.branch_id,
                        "branch_name": response.data.branch_details.branch_name,
                        "branch_organization_name": response.data.branch_details.branch_organization_name,
                        "branch_email_address": response.data.branch_details.branch_email_address,
                        "branch_gstn": response.data.branch_details.branch_gstn,
                        "branch_pan": response.data.branch_details.branch_pan,
                        "branch_address": response.data.branch_details.branch_address,
                        "branch_landline_number": response.data.branch_details.branch_landline_number,
                        "branch_mobile_number": response.data.branch_details.branch_mobile_number,
                        //"branch_terms_and_conditions": response.data.branch_details.branch_terms_and_conditions,
                        "branch_logo": response.data.branch_details.branch_logo,
                        "branch_color_code": response.data.branch_details.branch_color_code,
                        "branch_website": response.data.branch_details.branch_website
                    })
                    if (response.data.branch_details.branch_terms_and_conditions != null && response.data.branch_details.branch_terms_and_conditions != "") {

                        setBranchAddInput({
                            ...BranchAddInput,
                            "branch_terms_and_conditions": response.data.branch_details.branch_terms_and_conditions,
                        });
                    }
                    else {
                        setBranchAddInput({
                            ...BranchAddInput,
                            "branch_id": response.data.branch_details.branch_id,
                            "branch_name": response.data.branch_details.branch_name,
                            "branch_organization_name": response.data.branch_details.branch_organization_name,
                            "branch_email_address": response.data.branch_details.branch_email_address,
                            "branch_gstn": response.data.branch_details.branch_gstn,
                            "branch_pan": response.data.branch_details.branch_pan,
                            "branch_address": response.data.branch_details.branch_address,
                            "branch_landline_number": response.data.branch_details.branch_landline_number,
                            "branch_mobile_number": response.data.branch_details.branch_mobile_number,
                            "branch_terms_and_conditions": "",
                            "branch_logo": response.data.branch_details.branch_logo,
                            "branch_color_code": response.data.branch_details.branch_color_code,
                            "branch_website": response.data.branch_details.branch_website
                        })
                    }
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadBranchDetails();
    }, []);

    const OnSubmitBranch = async (e) => {
        e.preventDefault();
        setDisableButton(true);
        document.getElementById("img_gif_loading_btn").style.display = "block";
        await axios.post(process.env.REACT_APP_API + "BranchUpdate", {
            "branch_id": branch_id,
            "branch_name": branch_name,
            "branch_organization_name": branch_organization_name,
            "branch_email_address": branch_email_address,
            "branch_gstn": branch_gstn,
            "branch_pan": branch_pan,
            "branch_address": branch_address,
            "branch_landline_number": branch_landline_number,
            "branch_mobile_number": branch_mobile_number,
            "branch_terms_and_conditions": branch_terms_and_conditions,
            "branch_logo": branch_logo,
            "branch_color_code": branch_color_code,
            "branch_website": branch_website,
            "branch_updated": cookies.user_id
        }, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                toast.success(response.data.msg);
                setWarnings({ ["warning"]: "" });
                history.push(`/branchlist`);
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
    return (
        <>
            {
                cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_BRANCH_EDIT) ?
                    <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px" }}>
                                    <CCardBody>
                                        <h4> Update Branch</h4>
                                        <hr className="bgcolor" style={{ height: "2px" }} />

                                        <CForm onSubmit={(e) => OnSubmitBranch(e)}>
                                            <CRow>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Branch Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Branch Name' required="required"
                                                            name='branch_name'
                                                            value={branch_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Organization Name</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Organization Name' required="required"
                                                            name='branch_organization_name'
                                                            value={branch_organization_name}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Email Address</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Email Address' required="required"
                                                            name='branch_email_address'
                                                            value={branch_email_address}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>GSTN</CLabel>
                                                        <CInput type='text' placeholder='Enter GSTN'
                                                            name='branch_gstn'
                                                            value={branch_gstn}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <CRow >
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>PAN</CLabel>
                                                        <CInput type='text' placeholder='Enter PAN'
                                                            name='branch_pan'
                                                            value={branch_pan}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Address</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Address' required="required"
                                                            name='branch_address'
                                                            value={branch_address}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Landline No</CLabel>
                                                        <CInput type='text' placeholder='Enter Landline No'
                                                            name='branch_landline_number'
                                                            value={branch_landline_number}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Mobile No</CLabel><span className="red">*</span>
                                                        <CInput type='text' placeholder='Enter Mobile No' maxLength={10} required="required"
                                                            name='branch_mobile_number'
                                                            value={branch_mobile_number}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow>

                                                <CCol xs="12" sm="3" md="3" lg="3" className="mt-3">
                                                    <CFormGroup>
                                                        {/* <CLabel className="red">Photo Size :"width: "100%", height: "150px"</CLabel> */}
                                                        <div className="div mt-3" style={{ fontSize: "15px", fontWeight: "" }}>
                                                            Upload Logo
                                                            <CInput type="file" className="hide-file"
                                                                name="branch_logo"
                                                                onChange={(e) => onChangePicture(e)}
                                                            ></CInput>
                                                        </div>
                                                        {PictureDis ? <div>
                                                            <br></br>
                                                            <div className=" table-responsive my-table mt-5">
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/BRANCH/" + branch_logo}
                                                                    style={{ width: "100%", height: "150px", marginTop: "", float: "", paddingRight: "" }}
                                                                />
                                                            </div>
                                                            <CFormGroup>
                                                                <CButton className="bgcolor white ml-1 mt-1"
                                                                    onClick={() => Removeimagefront("branch_logo")}
                                                                ><i className="fa fa-close"></i></CButton>
                                                            </CFormGroup>
                                                        </div> : null}
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Color Code</CLabel>
                                                        <CInput type='color' placeholder='Enter Color Code'
                                                            name='branch_color_code'
                                                            value={branch_color_code}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>

                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <CFormGroup>
                                                        <CLabel>Branch website</CLabel>
                                                        <CInput type='text' placeholder='Enter Branch website'
                                                            name='branch_website'
                                                            value={branch_website}
                                                            onChange={(e) => OnInputChange(e)}
                                                        />
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>

                                            <CRow>
                                                <CCol xs="12" sm="9" md="9" lg="9">
                                                    <CFormGroup>
                                                        <CLabel>Terms and Conditions</CLabel>
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            onChange={onChangeInputChange}
                                                            data={branch_terms_and_conditions}
                                                        />
                                                        {/* {errors.category_name&&<p style={{color:"red"}}>{errors.category_name}</p>} */}
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                            <hr className="bgcolor" style={{ height: "1px" }} />
                                            <CRow>
                                                <CCol xs="12" sm="9" md="9" lg="9"></CCol>
                                                <CCol xs="12" sm="3" md="3" lg="3">
                                                    <div className="bgcolor" style={{ borderRadius: "5px" }}>
                                                        <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                                                        <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                                                    </div>
                                                    {warnings.warning && <p style={{ color: "red" }}>{warnings.warning}</p>}
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
export default BranchUpdate;