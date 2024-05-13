import { CForm, CInput, CLabel, CButton, CCol, CRow, CFormGroup, CSelect, CTextarea } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';

const CustHealthInfo = (props) => {

    const [DisG, setDisG] = useState(false);
    const [DisH, setDisH] = useState(false);
    const [DisPI, setDisPI] = useState(false);

    const OnClickGoal = () => {
        setDisG(true);
    }

    const OnClickHealth = () => {
        setDisH(true);
    }

    const OnClickPInfo = () => {
        setDisPI(true);
    }
    return (
        <>
            <CForm>
                <CRow>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        <CButton className="bgcyan width100 white mt-2" onClick={() => OnClickGoal()} style={{ textAlign: "left" }}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> &nbsp;Goals</CButton>
                    </CCol>
                    <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        {DisG ? <div className='mt-2'>
                            <CRow>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Primary Goal</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Goal</option>
                                    </CSelect>
                                    <CLabel>+ Add New Goal</CLabel>
                                </CCol>
                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Secondary Goal</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Secondary Goal' />
                                </CCol>
                            </CRow>
                        </div> : null}
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        <CButton className="bgcyan width100 white mt-2" onClick={() => OnClickHealth()} style={{ textAlign: "left" }}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> &nbsp;Health</CButton>
                    </CCol>
                    <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        {DisH ? <div className='mt-2'>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <CLabel>Heart Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <CLabel>Obesity:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Diabetes:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Blood Pressure:- &nbsp;</CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Joint or Bone Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Respiratory Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Harmonal Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Gastric Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <CLabel>Gynic Problem:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <CLabel>Surgery:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Allergy:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Medication:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "20px", marginLeft: "50px" }} type='radio' />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <CLabel>Special Notes:- </CLabel>
                                                </td>
                                                <td>
                                                    <CInput style={{ width: "100%", marginLeft: "50px" }} type='text' placeholder='Special Notes' />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CCol>
                            </CRow>

                        </div> : null}
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        <CButton className="bgcyan width100 white mt-2" onClick={() => OnClickPInfo()} style={{ textAlign: "left" }}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> &nbsp;Personal Information</CButton>
                    </CCol>
                    <CCol xs="12" sm="6" md="6" lg="6"></CCol>
                    <CCol xs="12" sm="6" md="6" lg="6">
                        {DisPI ? <div className='mt-2'>
                            <CRow>
                                <CCol xs="12" sm="12" md="12" lg="12">
                                    <CLabel>Occupation</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Occupation'
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Level of Physical Activity</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Activity</option>
                                        <option>10%</option>
                                        <option>20%</option>
                                        <option>30%</option>
                                        <option>40%</option>
                                        <option>50%</option>
                                        <option>60%</option>
                                        <option>70%</option>
                                        <option>80%</option>
                                        <option>90%</option>
                                        <option>100%</option>
                                    </CSelect>
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Stress In Job</CLabel><span className="red">*</span>
                                    <CSelect custom
                                    >
                                        <option>Select Stress</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </CSelect>
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Average Hour of sleep</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Average Hour of sleep'
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Quality of Sleep</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Quality of Sleep'
                                    />
                                </CCol>

                                <CCol xs="12" sm="6" md="6" lg="6">
                                    <CLabel>Time of Sleep</CLabel><span className="red">*</span>
                                    <CInput type='text' placeholder='Enter Time of Sleep'
                                    />
                                </CCol>
                            </CRow>
                        </div> : null}
                    </CCol>
                </CRow>
                <hr className="bgcyan" style={{ height: "1px" }} />
                <CRow>
                    <CCol xs="12" sm="8" md="8" lg="8"></CCol>
                    <CCol xs="12" sm="4" md="4" lg="4">
                        <div className="bgcyan mb-3" style={{ borderRadius: "5px" }}>
                            <CButton type="submit" style={{ width: "100%", color: "white", fontWeight: "50%", fontSize: "15px" }} >Save</CButton>
                            <img id="img_gif_loading_btn" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "10px", display: "none" }} />
                        </div>

                    </CCol>
                </CRow>
            </CForm >
        </>
    )
}
export default CustHealthInfo;