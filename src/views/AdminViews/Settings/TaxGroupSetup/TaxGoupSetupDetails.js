import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import DeleteModal from '../../Modals/DeleteModal';
import { Link, useLocation } from 'react-router-dom';

const TaxGoupSetupDetails = (props) => {
    const [cookies, setCookies, removeCookie] = useCookies(['admin']);
    const location = useLocation();

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const searchParams = new URLSearchParams(location.search);

    var taxgroupid = searchParams.get("taxgroupid");

    const [TaxGroupSetupDetails, setTaxGroupSetupDetails] = useState({});

    const [TaxList, setTaxList] = useState([]);

    const TaxGroupSetupDetailsByID = async (id) => {
        var list = {};
        list["tax_group_id"] = taxgroupid;
        await axios.post(process.env.REACT_APP_API + "TaxGroupSetupDetailsByID", list, config).then(response => {
            console.log(response);

            if (response.data.is_success) {
                if (response.data.tax_group_details !== null) {
                    var CreatedAt;
                    if (response.data.tax_group_details.tax_group_created_at !== null) {
                        var date=response.data.tax_group_details.tax_group_created_at;
                        CreatedAt=date.substring(0,10);
                    }
                    else{
                        CreatedAt=response.data.tax_group_details.tax_group_created_at;
                    }
                    setTaxGroupSetupDetails({
                        "tax_group_id": response.data.tax_group_details.tax_group_id,
                        "tax_group_name": response.data.tax_group_details.tax_group_name,
                        "tax_group_created_at": CreatedAt
                    });
                }
                //setTaxGroupSetupDetails(response.data.tax_group_details);
                setTaxList(response.data.tax_list)
            } else {
                toast.error(response.data.msg);
            }

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        TaxGroupSetupDetailsByID();
    }, []);

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>

                <h3>Tax Group Setup Details</h3>

                <hr className="bgcolor" style={{ height: "2px" }} />
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th colSpan={4} className='bgcolor' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "17px" }}>TAX GROUP DETAILS</th>
                        </tr>
                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                            <td colSpan={2}>TAX GROUP NAME</td>
                            <td colSpan={2}>CREATED AT</td>
                        </tr>

                        <tr style={{ textAlign: "center", color: "black" }}>
                            <td colSpan={2}>{TaxGroupSetupDetails.tax_group_name}</td>
                            <td colSpan={2}>{TaxGroupSetupDetails.tax_group_created_at}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table table-bordered mt-3">
                    <tbody>
                        <tr>
                            <th colSpan={4} className='bgcolor' style={{ backgroundColor: "", textAlign: "center", color: "white", fontSize: "17px" }}>TAX LIST</th>
                        </tr>
                        <tr className='bgcolor1' style={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
                            <td>SL No</td>
                            <td>TAX NAME</td>
                            <td>TAX PERCENTAGE</td>
                            <td>CREATED AT</td>
                        </tr>
                        {TaxList.map((List, index) => (
                            <tr style={{ textAlign: "center", color: "black" }} key={index}>
                                <td>{index + 1}</td>
                                <td>{List.tax_name}</td>
                                <td>{List.tax_percentage}</td>
                                <td>{List.tax_group_tax_created_at.substring(0, 10)}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}
export default TaxGoupSetupDetails;
