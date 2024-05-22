import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CCard, CCardBody, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { post } from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Modals/DeleteModal';
import * as AppConstants from 'src/views/AdminViews/AppConstants';
import Notification from '../../Modals/NotificationAltertModal';

const TestimonialsList = (props) => {

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const [Input, setInput] = useState({
        testim_category_id
    });

    const {
        testim_category_id
    } = Input;

    const [CategoryDropdowns, setCategoryDropdowns] = useState([]);
    const GetDropDown = async () => {
        await axios.post(process.env.REACT_APP_API + "GetDropDown", {
            dropdown_list: [
                { "dropdown_type": "DD_CATEGORY", "dropdown_filter": "" },
            ]
        }, config).then(response => {
            console.log(response);
            if (response.data.drop_down_list != null) {
                for (let d = 0; d < response.data.drop_down_list.length; d++) {
                    var dd_list = response.data.drop_down_list[d];
                    console.log("dd_list" + dd_list);
                    if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_CATEGORY") {
                        let ddlist = [];
                        ddlist.push({ "value": 0, "label": "ALL" })
                        for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
                            ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
                        }
                        setCategoryDropdowns(ddlist);
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        GetDropDown();
    }, []);

    const onChangeCategorydropdown = (e) => {
        console.warn(e.value);//here i will get the specific selected value
        console.warn(e.label);
        setInput({ ...Input, ["testim_category_id"]: e.value });
    };

    const [TestimonialsList, setTestimonialsList] = useState([]);

    const LoadTestimonialsList = async () => {
        setTestimonialsList([])
        var list = {};
        list["testim_category_id"] = testim_category_id;
        await axios.post(process.env.REACT_APP_API + "TestimonialsList", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.testimonial_list !== null) {
                    setTestimonialsList(response.data.testimonial_list)
                }
                else {
                    setTestimonialsList([])
                }
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);

            })
    }

    useEffect(() => {
        LoadTestimonialsList();
    }, [testim_category_id]);

    const Parentvaluetomodal = (data, index) => {

        //console.log("index: " + index);
        var temp_user = [...TestimonialsList];
        temp_user.splice(index, 1);
        setTestimonialsList([]);
        setTestimonialsList(temp_user);
        // console.log("temp_user: " + temp_user);
        // console.log("all user: " + CustLists);
        // console.log("Delete")
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow className=''>
                    <CCol xs="12" sm="12" md="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <h4>Testimonials List</h4>
                                <hr className="bgcolor" style={{ height: "1px", paddingTop: "0px", margin: "0px" }} />
                                <CRow>
                                    <CCol xs="12" sm="3" ms="3" lg="3">
                                        <CFormGroup>
                                            <CLabel>Select Category</CLabel><span className="red">*</span>
                                            <Select
                                                options={CategoryDropdowns}
                                                onChange={(e) => onChangeCategorydropdown(e)} >
                                            </Select>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <div className="table-responsive  my-table">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Category</th>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Thumbnail</th>
                                                        <th>Video</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {TestimonialsList.map((List, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{List.category_name}</td>
                                                            <td>{List.testim_name}</td>
                                                            <td>{List.testim_description}</td>
                                                            <td>
                                                                <img className="playerProfilePic_home_tile "
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/TESTIMONIALS/" + List.testim_thumbnail}
                                                                    style={{ width: "50px", height: "50px", marginTop: "", float: "", paddingRight: "" }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <video width="150" height="100" controls >
                                                                    <source src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/TESTIMONIALS/" + List.testim_video_filename} type="video/mp4" />
                                                                </video>
                                                            </td>
                                                            <td>
                                                                <Link to={{
                                                                    pathname: '/testim-setup',
                                                                    pfid: {
                                                                        pfid: List.testim_id
                                                                    }
                                                                }} className="btn btn-sm ">
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <DeleteModal delete_guid={List.testim_id}
                                                                    name={List.category_name}
                                                                    index={index}
                                                                    apiname={"TestimonialsDelete"}
                                                                    guidinput={"testim_id"}
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
export default TestimonialsList