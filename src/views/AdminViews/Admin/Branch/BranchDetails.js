import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { GetColorName } from 'hex-color-to-color-name';
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

const BranchDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var branchid = searchParams.get("branchid");

    const [BranchDetails, setBranchDetails] = useState({});

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadBranchDetails = async () => {
        var list = {};
        list["branch_id"] = branchid;

        await axios.post(process.env.REACT_APP_API + "BranchDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var colorName;
                var BranchDetails = [], CreateAt, UpdatedAt;
                if (response.data.branch_details !== null) {

                    if (response.data.branch_details.branch_created_at !== null) {
                        var date = response.data.branch_details.branch_created_at;
                        CreateAt = date.substring(0, 10);
                    }
                    else {
                        CreateAt = response.data.branch_details.branch_created_at;
                    }

                    if (response.data.branch_details.branch_updated_at !== null) {
                        var date = response.data.branch_details.branch_updated_at;
                        UpdatedAt = date.substring(0, 10);
                    }
                    else {
                        UpdatedAt = response.data.branch_details.branch_updated_at;
                    }

                    if (response.data.branch_details.branch_color_code !== null) {
                        colorName = GetColorName(response.data.branch_details.branch_color_code); //# returns 'Black'
                        console.log("Color Name:- " + colorName);
                    }
                    else {
                        colorName = response.data.branch_details.branch_color_code;
                    }
                    setBranchDetails({
                        "branch_id": response.data.branch_details.branch_id,
                        "branch_name": response.data.branch_details.branch_name,
                        "branch_organization_name": response.data.branch_details.branch_organization_name,
                        "branch_email_address": response.data.branch_details.branch_email_address,
                        "branch_gstn": response.data.branch_details.branch_gstn,
                        "branch_pan": response.data.branch_details.branch_pan,
                        "branch_address": response.data.branch_details.branch_address,
                        "branch_landline_number": response.data.branch_details.branch_landline_number,
                        "branch_mobile_number": response.data.branch_details.branch_mobile_number,
                        "branch_terms_and_conditions": response.data.branch_details.branch_terms_and_conditions,
                        "branch_logo": response.data.branch_details.branch_logo,
                        "branch_color_code": colorName,
                        "branch_website": response.data.branch_details.branch_website,
                        "branch_created_user_name": response.data.branch_details.branch_created_user_name,
                        "branch_created_at": CreateAt,
                        "branch_updated_by": response.data.branch_details.branch_updated_by,
                        "branch_updated_user_name": response.data.branch_details.branch_updated_user_name,
                        "branch_updated_at": UpdatedAt
                    });
                }
                else {
                    setBranchDetails({});
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
    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard>
                            <CCardBody>
                                <h4>Branch Details</h4>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th colSpan={16} className='bgcolor' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "17px" }}>BRANCH DETAILS</th>
                                        </tr>
                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>BRANCH NAME</td>
                                            <td>ORGANIZATION NAME</td>
                                            <td>GSTN</td>
                                            <td>PAN</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{BranchDetails.branch_name}</td>
                                            <td>{BranchDetails.branch_organization_name}</td>
                                            <td>{BranchDetails.branch_gstn}</td>
                                            <td>{BranchDetails.branch_pan}</td>
                                        </tr>

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>EMAIL ADDRESS</td>
                                            <td>PHONE NO</td>
                                            <td>LANDLINE NO</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{BranchDetails.branch_email_address}</td>
                                            <td>{BranchDetails.branch_mobile_number}</td>
                                            <td>{BranchDetails.branch_landline_number}</td>
                                        </tr>

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>WEBSITE ADDRESS</td>
                                            <td colSpan={2}>ADDRESS</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{BranchDetails.branch_website}</td>
                                            <td colSpan={2}>{BranchDetails.branch_address}</td>
                                        </tr>

                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td colSpan={2}>TERMS AND CONDITIONS</td>
                                            <td>BRANCH COLOR</td>
                                            <td>BRANCH LOGO</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td colSpan={2}>{parse("" + BranchDetails.branch_terms_and_conditions + "")}</td>
                                            <td>{BranchDetails.branch_color_code}</td>
                                            <td>
                                                {/* <div className=" table-responsive my-table"> */}
                                                <img className="playerProfilePic_home_tile "
                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/BRANCH/" + BranchDetails.branch_logo}
                                                    style={{ width: "50%", height: "70px", marginTop: "", float: "", paddingRight: "" }}
                                                />
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                                            <td>CREATED BY</td>
                                            <td>CREATED AT</td>
                                            <td>UPDATED BY</td>
                                            <td>UPDATED AT</td>
                                        </tr>

                                        <tr style={{ textAlign: "center", color: "black" }}>
                                            <td>{BranchDetails.branch_created_user_name}</td>
                                            <td>{BranchDetails.branch_created_at}</td>
                                            <td>{BranchDetails.branch_updated_user_name}</td>
                                            <td>{BranchDetails.branch_updated_at}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )

}
export default BranchDetails;
