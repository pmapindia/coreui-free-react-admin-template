import { useHistory } from 'react-router';
import { post } from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea } from '@coreui/react';
import '../../../../scss/_custom.scss';

const DietchartSetupList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [search_text1, setSearchText] = useState({
        search_text: ""
    });
    const { search_text } = search_text1;

    useEffect(() => {
        console.log("search_text: " + search_text)
        if (search_text) {
            const delayDebounceFn = setTimeout(() => {
                console.log("search_text:- " + search_text)
                LoadDietchartSetupLists();
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
        setDietchartSetupList([]);
    }

    const [DietchartSetupList, setDietchartSetupList] = useState([]);

    const LoadDietchartSetupLists = async () => {
        setDietchartSetupList([])
        var list = {};
        list["search_text"] = search_text;
        await axios.post(process.env.REACT_APP_API + "DietChartSetupList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.diet_chart_list !== null) {
                    setDietchartSetupList(response.data.diet_chart_list)
                }
                else {
                    setDietchartSetupList([])
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);

            })
    }

    useEffect(() => {
        LoadDietchartSetupLists();
    }, []);

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...DietchartSetupList];
        temp_user.splice(index, 1);
        setDietchartSetupList([]);
        setDietchartSetupList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + CustLists);
        // console.log("Delete")
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Dietchart Setup List</h4>
                                {/* <CRow className='overflow-hidden'>
                                    <CCol xs="12" sm="9" md="9" lg="9">
                                        <h4>Dietchart Setup List</h4>
                                    </CCol>
                                    <CCol xs="12" sm="3" md="3" lg="3" className="">
                                        <CFormGroup>
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
                                        </CFormGroup>
                                    </CCol>
                                </CRow> */}
                                <hr className="bgcolor" style={{ height: "1px", paddingTop: "0px", margin: "0px" }} />
                                <CRow className='overflow-hidden'>
                                    <CCol xs="12" sm="3" md="3" lg="3" className="mt-2">
                                        <CFormGroup>
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
                                        </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className=" my-table table-responsive width100 mt-1">
                                            <table className="table table-bordered-less table-sm width100">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Primary Goal</th>
                                                        <th>Secondary Goal</th>
                                                        <th>Heading Name</th>
                                                        <th>Description</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {DietchartSetupList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.primary_goal_name}</td>
                                                            <td>{List.secondary_goal_name}</td>
                                                            <td>{List.dc_heading_name}</td>
                                                            <td>{List.dc_description}</td>
                                                            <td>
                                                                <Link to={{
                                                                    pathname: '/dietchartsetup',
                                                                    pfid: {
                                                                        pfid: List.dc_id
                                                                    }
                                                                }} className="btn btn-sm" style={{ paddingLeft: "2px" }}>
                                                                    <i className="fa fa-pencil" aria-hidden="true">
                                                                    </i>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.dc_id}
                                                                    name={List.dc_heading_name}
                                                                    index={index}
                                                                    apiname={"DietChartSetupDelete"}
                                                                    guidinput={"dc_id"}
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
export default DietchartSetupList;