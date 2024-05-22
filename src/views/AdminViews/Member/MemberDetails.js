import { CForm, CInput, CLabel, CButton, CCol, CRow, CCard, CCardBody, CTextarea, CCardHeader } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import '../../../scss/_custom.scss';
import { Object } from 'core-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import PostpaidBillUpdateStatusModal from '../Modals/PostpaidBillUpdateStatusModal';
import EnquiryFollowUpModal from '../Modals/EnquiryFollowUpModal';
import BalancePaymentUpdateModal from '../Modals/BalancePaymentUpdateModal';
import MemBasicInfoUpdateModal from './MemberUpdateModals/MemBasicInfoUpdateModal';
import PersonalInfoUpdateModal from './MemberUpdateModals/PersonalInfoUpdateModal';
import MemGoalsUpdateModal from './MemberUpdateModals/MemGoalsUpdateModal';
import HealthInfoUpdateModal from './MemberUpdateModals/HealthInfoUpdateModal';
import MemKycUpdateModal from './MemberUpdateModals/MemKycUpdateModal';
import FreezePauseModal from './MemberUpdateModals/FreezePauseModal';
import MakeInactiveModal from './MemberUpdateModals/MakeInactiveModal';
import MakeActiveModal from './MemberUpdateModals/MakeActiveModal';
import TrailsUpdateStatusModal from '../Trails/TrailsUpdateStatusModal';
import BatchDetailsUpdateModal from '../Modals/BatchDetailsUpdateModal';
import MembershipRenewalModal from '../Modals/RenewMembershipModal';
import CancelSale from '../Modals/CancelSales';
import BodyMeasurementModal from './MemberUpdateModals/BodyMeasurementModal';
import MemberBodyMeasurementModal from './MemberUpdateModals/MemberBodyMeasureUpdateModal';
import AddNewPackegeModal from './Modals/AddNewPackegeModal';
import MemPriGoalWorkOutListModal from './Modals/MemPriGoalWorkOutListModal';
import MemSecGoalWorkOutListModal from './Modals/MemSecGoalWorkOutListModal';
import DietChartForMember from './Modals/DietChartForMember';

const MemberDetails = () => {
    const location = useLocation();

    const [cookies, setCookies, removeCookie] = useCookies(['admin']);

    const searchParams = new URLSearchParams(location.search);

    var memid = searchParams.get("memid");

    const [show, setShow] = useState(false);

    const [MemberDetails, setMemberDetails] = useState({});
    const [PostDetails, setPostDetails] = useState({});
    const [SalesDetails, setSalesDetails] = useState([]);
    const [EnquiriesList, setEnquiriesList] = useState([]);
    const [BalanceHistory, setBalanceHistory] = useState([]);
    const [PersonalInfo, setPersonalInfo] = useState({});
    const [HealthInfo, setHealthInfo] = useState([]);
    const [KYCDetails, setKYCDetails] = useState([]);
    const [BillList, setBillList] = useState([]);
    const [DueList, setDueList] = useState([]);
    const [BodyMeasurement, setBodyMeasurement] = useState([]);
    const [TrailList, setTrailList] = useState([]);

    const [Post, setPost] = useState(false);
    const [Pre, setPre] = useState(false);
    const [DisEnqyiry, setDisEnqyiry] = useState(false);
    const [DisTrails, setDisTrails] = useState(false);

    const config = {
        headers: {
            unique_code: cookies.unique_code,
        }
    };

    const LoadMemberDetails = async () => {
        var list = {};
        list["member_id"] = memid;

        await axios.post(process.env.REACT_APP_API + "MemberDetailsByID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var StartDate, StartDate1, EndDate, LoginDate, CreatedAt, UpdatedAt, DOB, HealthValue, HealthList = [], Trails = [];
                var newdate, time, Time, meridiemTime;
                if (response.data.member_details !== null) {
                    if (response.data.member_details.member_product_start_date !== null) {
                        var date = response.data.member_details.member_product_start_date
                        StartDate = date.substring(0, 10);
                        StartDate = StartDate.split('-').reverse().join('-')
                    }
                    else {
                        StartDate = "";
                    }

                    if (response.data.member_details.member_product_end_date !== null) {
                        var date = response.data.member_details.member_product_end_date;
                        EndDate = date.substring(0, 10);
                        EndDate = EndDate.split('-').reverse().join('-')
                    }
                    else {
                        EndDate = "";
                    }

                    if (response.data.member_details.member_last_login_date !== null) {
                        var date = response.data.member_details.member_last_login_date;
                        LoginDate = date.substring(0, 10);
                        LoginDate = LoginDate.split('-').reverse().join('-')
                        Time = date.substring(11, 17);

                        time = Time.split(':');// here the time is like "16:14"
                        meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';

                    }
                    else {
                        LoginDate = "";
                        meridiemTime = ""
                    }

                    if (response.data.member_details.member_created_at !== null) {
                        var date = response.data.member_details.member_created_at;
                        CreatedAt = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        CreatedAt = "";
                    }

                    if (response.data.member_details.member_updated_at !== null) {
                        var date = response.data.member_details.member_updated_at;
                        UpdatedAt = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        UpdatedAt = "";
                    }

                    if (response.data.member_details.customer_date_of_birth !== null) {
                        var date = response.data.member_details.customer_date_of_birth;
                        DOB = date.substring(0, 10);
                        DOB = DOB.split('-').reverse().join('-')
                    }
                    else {
                        DOB = "";
                    }

                    if (response.data.member_details.member_is_postpaid === true) {
                        setPost(true);
                        setPre(false)
                    }

                    if (response.data.member_details.member_is_postpaid === false) {
                        setPre(true)
                        setPost(false);
                    }
                    setMemberDetails({
                        "member_id": response.data.member_details.member_id,
                        "member_customer_id": response.data.member_details.member_customer_id,
                        "customer_first_name": response.data.member_details.customer_first_name,
                        "customer_last_name": response.data.member_details.customer_last_name,
                        "customer_name": response.data.member_details.customer_first_name + " " + response.data.member_details.customer_last_name,
                        "customer_mobile_number": response.data.member_details.customer_mobile_number,
                        "customer_email_address": response.data.member_details.customer_email_address,
                        "customer_address": response.data.member_details.customer_address,
                        "customer_gender": response.data.member_details.customer_gender,
                        "customer_photo": response.data.member_details.customer_photo,
                        "customer_date_of_birth": DOB,
                        "customer_referral_code": response.data.member_details.customer_referral_code,
                        "source_name": response.data.member_details.source_name,
                        "primary_goal_name": response.data.member_details.primary_goal_name,
                        "secondary_goal_name": response.data.member_details.secondary_goal_name,
                        "member_reward_points": response.data.member_details.member_reward_points,
                        "member_branch_id": response.data.member_details.member_branch_id,
                        "branch_name": response.data.member_details.branch_name,
                        "member_unique_id": response.data.member_details.member_unique_id,
                        "member_status_text": response.data.member_details.member_status_text,
                        "member_is_postpaid": response.data.member_details.member_is_postpaid,
                        "member_postpaid_id": response.data.member_details.member_postpaid_id,
                        "member_product_id": response.data.member_details.member_product_id,
                        "product_type": response.data.member_details.product_type,
                        "product_name": response.data.member_details.product_name,
                        "product_cover_image": response.data.member_details.product_cover_image,
                        "member_product_start_date": StartDate,
                        "member_product_end_date": EndDate,
                        "member_batch_id": response.data.member_details.member_batch_id,
                        "member_registration_fee": response.data.member_details.member_registration_fee,
                        "referred_first_name": response.data.member_details.referred_first_name,
                        "referred_second_name": response.data.member_details.referred_second_name,
                        "batch_name": response.data.member_details.batch_name,
                        "member_in_time": response.data.member_details.member_in_time,
                        "member_out_time": response.data.member_details.member_out_time,
                        "member_last_login_date": LoginDate + " " + meridiemTime,
                        "member_remarks": response.data.member_details.member_remarks,
                        "member_created_at": response.data.member_details.member_created_at,
                        "member_created_by": response.data.member_details.member_created_by,
                        "created_user_name": response.data.member_details.created_user_name,
                        "member_updated_at": response.data.member_details.member_updated_at,
                        "member_updated_by": response.data.member_details.member_updated_by,
                        "updated_user_name": response.data.member_details.updated_user_name,
                        "member_primary_goal_id": response.data.member_details.member_primary_goal_id,
                        "member_secondary_goal_id": response.data.member_details.member_secondary_goal_id
                    });

                    MemberWorkoutCountsOfWeeks(response.data.member_details.member_primary_goal_id, response.data.member_details.member_secondary_goal_id);
                }
                if (response.data.member_postpaid_details !== null) {
                    if (response.data.member_postpaid_details.postpaid_start_date !== null) {
                        var date = response.data.member_postpaid_details.postpaid_start_date;
                        StartDate1 = date.substring(0, 10).split('-').reverse().join('-');
                    }
                    else {
                        StartDate1 = "";
                    }

                    setPostDetails({
                        "postpaid_advance_amount": response.data.member_postpaid_details.postpaid_advance_amount,
                        "postpaid_start_date": StartDate1,
                        "postpaid_monthly_bill_date": response.data.member_postpaid_details.postpaid_monthly_bill_date,
                        "postpaid_last_due_date_after_bill_date": response.data.member_postpaid_details.postpaid_last_due_date_after_bill_date,
                        "postpaid_monthly_payable_amount": response.data.member_postpaid_details.postpaid_monthly_payable_amount,
                        "postpaid_dues_allowed_for_attendance": response.data.member_postpaid_details.postpaid_dues_allowed_for_attendance,
                        "postpaid_last_bill_date": response.data.member_postpaid_details.postpaid_last_bill_date,
                        "postpaid_next_bill_date": response.data.member_postpaid_details.postpaid_next_bill_date
                    })
                }

                var BillLists = [], fromdate, todate, gendate, duedate;
                if (response.data.postpaid_bill_list !== null) {

                    for (let k = 0; k < response.data.postpaid_bill_list.length; k++) {
                        if (response.data.postpaid_bill_list[k].bill_from_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_from_date;
                            fromdate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            fromdate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_to_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_to_date;
                            todate = date.substring(0, 10);
                            todate = todate.split('-').reverse().join('-')
                        }
                        else {
                            todate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_generated_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_generated_date;
                            gendate = date.substring(0, 10);
                            gendate = gendate.split('-').reverse().join('-')
                        }
                        else {
                            gendate = "";
                        }

                        if (response.data.postpaid_bill_list[k].bill_last_due_date !== null) {
                            var date = response.data.postpaid_bill_list[k].bill_last_due_date;
                            duedate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            duedate = "";
                        }

                        BillLists.push({
                            "bill_id": response.data.postpaid_bill_list[k].bill_id,
                            "bill_member_id": response.data.postpaid_bill_list[k].bill_member_id,
                            "bill_postpaid_id": response.data.postpaid_bill_list[k].bill_postpaid_id,
                            "bill_generated_date": gendate,
                            "bill_amount": response.data.postpaid_bill_list[k].bill_amount,
                            "bill_tax_group_id": response.data.postpaid_bill_list[k].bill_tax_group_id,
                            "tax_group_name": response.data.postpaid_bill_list[k].tax_group_name,
                            "bill_last_due_date": duedate,
                            "bill_from_date": fromdate,
                            "bill_to_date": todate,
                            "bill_filename": response.data.postpaid_bill_list[k].bill_filename,
                            "bill_status_text": response.data.postpaid_bill_list[k].bill_status_text,
                            "bill_created_at": response.data.postpaid_bill_list[k].bill_created_at
                        })
                    }
                    setBillList(BillLists);
                }

                if (response.data.enquiry_list !== null) {
                    setEnquiriesList(response.data.enquiry_list);
                    if (response.data.enquiry_list.length !== 0) {
                        setDisEnqyiry(true);
                    }
                    else {
                        setDisEnqyiry(false);
                    }
                }

                if (response.data.sales_details !== null) {
                    setSalesDetails(response.data.sales_details);
                }

                if (response.data.payment_balance !== null) {
                    setBalanceHistory(response.data.payment_balance);
                }

                if (response.data.due_list !== null) {
                    setDueList(response.data.due_list);
                }

                if (response.data.personal_information_details !== null) {
                    setPersonalInfo(response.data.personal_information_details);
                }

                if (response.data.health_details !== null) {
                    for (let i = 0; i < response.data.health_details.length; i++) {
                        if (response.data.health_details[i].mh_value === true) {
                            HealthValue = "Yes"
                        }
                        if (response.data.health_details[i].mh_value === false) {
                            HealthValue = "No"
                        }


                        HealthList.push({
                            "mh_id": response.data.health_details[i].mh_id,
                            "mh_member_id": response.data.health_details[i].mh_member_id,
                            "mh_health_id": response.data.health_details[i].mh_health_id,
                            "health_name": response.data.health_details[i].health_name,
                            "mh_value": HealthValue
                        })
                    };

                    setHealthInfo(HealthList);
                }

                if (response.data.kyc_list !== null) {
                    setKYCDetails(response.data.kyc_list);
                }


                var TrailSDate, TrailEDate, TrailSTime, TrailETime, Time, time;
                if (response.data.trial_list !== null) {

                    if (response.data.trial_list.length !== 0) {
                        setDisTrails(true);
                    }
                    else {
                        setDisTrails(false);
                    }
                    for (let x = 0; x < response.data.trial_list.length; x++) {

                        if (response.data.trial_list[x].trial_start_date !== null) {
                            var date = response.data.trial_list[x].trial_start_date;
                            TrailSDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            TrailSDate = response.data.trial_list[x].trial_start_date;
                        }

                        if (response.data.trial_list[x].trial_end_date !== null) {
                            var date = response.data.trial_list[x].trial_end_date;
                            TrailEDate = date.substring(0, 10).split('-').reverse().join('-');
                        }
                        else {
                            TrailEDate = response.data.trial_list[x].trial_end_date;
                        }


                        if (response.data.trial_list[x].trial_start_time !== null) {
                            var time = response.data.trial_list[x].trial_start_time;

                        }
                        else {
                            TrailSDate = response.data.trial_list[x].trial_start_time;
                        }

                        if (response.data.trial_list[x].trial_start_time !== null) {
                            Time = response.data.trial_list[x].trial_start_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            TrailSTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            TrailSTime = response.data.trial_list[x].trial_start_time;
                        }

                        if (response.data.trial_list[x].trial_end_time !== null) {
                            Time = response.data.trial_list[x].trial_end_time.substring(0, 5);

                            time = Time.split(':');// here the time is like "16:14"
                            TrailETime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
                        }
                        else {
                            TrailETime = response.data.trial_list[x].trial_end_time;
                        }
                        Trails.push({
                            "trial_id": response.data.trial_list[x].trial_id,
                            "branch_name": response.data.trial_list[x].branch_name,
                            "trial_customer_id": response.data.trial_list[x].trial_customer_id,
                            "customer_first_name": response.data.trial_list[x].customer_first_name,
                            "customer_mobile_number": response.data.trial_list[x].customer_mobile_number,
                            "customer_email_address": response.data.trial_list[x].customer_email_address,
                            "customer_address": response.data.trial_list[x].customer_address,
                            "customer_photo": response.data.trial_list[x].customer_photo,
                            "trainer_name": response.data.trial_list[x].trainer_name,
                            "product_name": response.data.trial_list[x].product_name,
                            "trial_start_date": TrailSDate,
                            "trial_start_time": TrailSTime,
                            "trial_end_date": TrailEDate,
                            "trial_end_time": TrailETime,
                            "trial_status_text": response.data.trial_list[x].trial_status_text
                        })
                    }
                    setTrailList(Trails);
                }


                if (response.data.body_measurement_list !== null) {
                    setBodyMeasurement(response.data.body_measurement_list);
                }
                else {
                    setBodyMeasurement([]);
                }

            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    const [WorkoutCountsOfPG, setWorkoutCountsOfPG] = useState([]);
    const [WorkoutCountsOfSG, setWorkoutCountsOfSG] = useState([])
    const MemberWorkoutCountsOfWeeks = async (primary_goal_id, secondary_goal_id) => {
        var list = {};
        list["member_id"] = memid;
        list["primary_goal_id"] = primary_goal_id;
        list["secondary_goal_id"] = secondary_goal_id;
        await axios.post(process.env.REACT_APP_API + "MemberWorkoutCountsOfWeeks", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                if (response.data.primary_goal_workout_list !== null) {
                    // for (let i = 0; i < response.data.primary_goal_workout_list.length; i++) {
                    //     if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "SUN") {
                    //         setWorkoutCountsOfPG({ "workout_count_sun": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "MON") {
                    //         setWorkoutCountsOfPG({ "workout_count_mon": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "TUE") {
                    //         setWorkoutCountsOfPG({ "workout_count_tue": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "WED") {
                    //         setWorkoutCountsOfPG({ "workout_count_wed": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "THU") {
                    //         setWorkoutCountsOfPG({ "workout_count_thu": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "FRI") {
                    //         setWorkoutCountsOfPG({ "workout_count_fri": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else if (response.data.primary_goal_workout_list[i].mem_wc_map_week_name === "SAT") {
                    //         setWorkoutCountsOfPG({ "workout_count_sat": response.data.primary_goal_workout_list[i].workout_count })
                    //     }
                    //     else {
                    //         setWorkoutCountsOfPG({
                    //             "workout_count_sat": 0,
                    //             "workout_count_mon": 0,
                    //             "workout_count_tue": 0,
                    //             "workout_count_wed": 0,
                    //             "workout_count_thu": 0,
                    //             "workout_count_fri": 0,
                    //             "workout_count_sat": 0
                    //         });
                    //     }
                    // }
                    setWorkoutCountsOfPG(response.data.primary_goal_workout_list);
                }

                if (response.data.secondary_goal_workout_list !== null) {

                    setWorkoutCountsOfSG(response.data.secondary_goal_workout_list);
                }
                else {
                    // setWorkoutCountsOfPG({
                    //     "workout_count_sat": 0,
                    //     "workout_count_mon": 0,
                    //     "workout_count_tue": 0,
                    //     "workout_count_wed": 0,
                    //     "workout_count_thu": 0,
                    //     "workout_count_fri": 0,
                    //     "workout_count_sat": 0
                    // });
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }


    const [SalesProductLists, setSalesProductLists] = useState([]);
    const SalesProductList = async () => {
        var list = {};
        list["member_id"] = memid;

        await axios.post(process.env.REACT_APP_API + "SalesProductListByMemberID", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var ProductList = [], StartDate, EndDate, Time, time;
                if (response.data.sales_product_list !== null) {
                    for (let i = 0; i < response.data.sales_product_list.length; i++) {
                        ProductList.push({
                            "sale_product_id": response.data.sales_product_list[i].sale_product_id,
                            "sale_product_product_id": response.data.sales_product_list[i].sale_product_product_id,
                            "sale_product_customer_id": response.data.sales_product_list[i].sale_product_customer_id,
                            "sale_product_member_id": response.data.sales_product_list[i].sale_product_member_id,
                            "sale_product_unit_price": response.data.sales_product_list[i].sale_product_unit_price,
                            "sale_product_quantity": response.data.sales_product_list[i].sale_product_quantity,
                            "sale_product_discount_percentage": response.data.sales_product_list[i].sale_product_discount_percentage,
                            "sale_product_discount_amount": response.data.sales_product_list[i].sale_product_discount_amount,
                            "sale_product_discount_amount_order_level": response.data.sales_product_list[i].sale_product_discount_amount_order_level,
                            "sale_product_total_amount": response.data.sales_product_list[i].sale_product_total_amount,
                            "sale_product_number_of_days": response.data.sales_product_list[i].sale_product_number_of_days,
                            "sale_product_start_date": response.data.sales_product_list[i].sale_product_start_date,
                            "sale_product_end_date": response.data.sales_product_list[i].sale_product_end_date,
                            "sale_product_batch_id": response.data.sales_product_list[i].sale_product_batch_id,
                            "batch_name": response.data.sales_product_list[i].batch_name,
                            "sale_product_in_time": response.data.sales_product_list[i].sale_product_in_time,
                            "sale_product_out_time": response.data.sales_product_list[i].sale_product_out_time,
                            "sale_product_note": response.data.sales_product_list[i].sale_product_note,
                            "sale_product_created_at": response.data.sales_product_list[i].sale_product_created_at,
                            "product_name": response.data.sales_product_list[i].product_name,
                            "product_type": response.data.sales_product_list[i].product_type,
                            "product_description": response.data.sales_product_list[i].product_description,
                            "product_cover_image": response.data.sales_product_list[i].product_cover_image
                        })
                    }
                    //setSalesProductLists(ProductList);
                    setSalesProductLists(response.data.sales_product_list);
                }
                else {
                    setSalesProductLists([]);
                }
            }
        }).catch(
            error => {
                console.log(error);
                alert(error.message);
            })
    }

    useEffect(() => {
        LoadMemberDetails();
        SalesProductList();
    }, []);

    const updatemodalvalue = () => {
        LoadMemberDetails();
    }


    const documentopen = (documentnamne) => {
        console.log(documentnamne);
        var str = documentnamne.replace(/"/g, "");
        console.log(str);
        const url = process.env.REACT_APP_DOCUMENTPATH + cookies.unique_code + "/CUSTOMER/" + str;
        console.log(url);
        window.open(url, '_blank');
    }
    const [disablebuttondc, setDisableButtonDC] = useState(false);
    const SaleDownloadPDF = async (sale_id, branch_id, member_id) => {
        //e.preventDefault();
        setDisableButtonDC(true);
        document.getElementById("img_gif_loading_btn_DC").style.display = "block";
        var list = {};
        list["branch_id"] = branch_id;
        list["member_id"] = member_id;
        list["sale_id"] = sale_id;
        await axios.post(process.env.REACT_APP_API + "SaleDownloadPDF", list, config).then(response => {
            console.log(response);
            if (response.data.is_success) {
                var str = response.data.filename.replace(/"/g, "");
                console.log(str);
                const url = process.env.REACT_APP_DOCUMENTPATH + cookies.unique_code + "/CUSTOMER_INVOICE/" + str;
                console.log(url);
                window.open(url, '_blank');
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            }
            else {
                toast.error(response.data.extra_info);
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            }
        }).catch(
            error => {
                console.log(error);
                //alert(error.message);
                setDisableButtonDC(false);
                document.getElementById("img_gif_loading_btn_DC").style.display = "none";
            })
    }

    return (
        <>
            <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
                <CRow>
                    <CCol xs="12" sm="12" ms="12" lg="12">
                        <CCard style={{ borderRadius: "20px" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol xs="12" sm="6" ms="6" lg="6">
                                        <h4>Member Details</h4>
                                    </CCol>

                                    <CCol xs="12" sm="2" ms="2" lg="2">
                                        <AddNewPackegeModal
                                            memid={memid}
                                        />
                                    </CCol>
                                    {MemberDetails.member_status_text !== "INACTIVE" ?
                                        <CCol xs="12" sm="2" ms="2" lg="2">
                                            <MakeInactiveModal
                                                //index={index}
                                                mem_id={MemberDetails.member_id}
                                                name={MemberDetails.customer_name}
                                            //changeDependency={Parentvaluetomodal}
                                            />
                                        </CCol>
                                        :
                                        <CCol xs="12" sm="2" ms="2" lg="2">
                                            <MakeActiveModal
                                                //index={index}
                                                mem_id={MemberDetails.member_id}
                                                name={MemberDetails.customer_name}
                                            //changeDependency={Parentvaluetomodal}
                                            />
                                        </CCol>
                                    }
                                    <CCol xs="12" sm="2" ms="2" lg="2">
                                        {/* <CButton className="btn btn-md white width100" style={{backgroundColor:"#F44336"}}>Freeze/Pause</CButton> */}

                                        <FreezePauseModal
                                            show={show}
                                            changeDependencyparent={updatemodalvalue}
                                            mem_id={MemberDetails.member_id}
                                        />
                                    </CCol>
                                </CRow>
                                <hr className="bgcolor" style={{ height: "2px" }} />
                                <CRow>
                                    <CCol xs="12" sm="12" ms="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "green", borderWidth: "2px" }}>
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="1" md="1" lg="1">
                                                        {MemberDetails.customer_photo !== "" ?
                                                            <img className="playerProfilePic_home_tile "
                                                                src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                //src={process.env.PUBLIC_URL + '/avatars/img.jpg'}
                                                                style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                            />
                                                            : MemberDetails.customer_photo === null ?

                                                                <img className="playerProfilePic_home_tile "
                                                                    //src={MemberDetails.customer_photo}
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                                :
                                                                <img className="playerProfilePic_home_tile "
                                                                    //src={MemberDetails.customer_photo}
                                                                    src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                                                    style={{ width: "100px", height: "100px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                                />
                                                        }
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="3" className="ml-4 mt-2">
                                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{MemberDetails.customer_first_name} {MemberDetails.customer_last_name}</h5>
                                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                                            src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                                            style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                        /> {MemberDetails.customer_mobile_number}</h6>
                                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                                            src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                                            style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                                        /> {MemberDetails.customer_email_address}</h6>
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="3" className="ml-4 mt-2">
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Member ID: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.member_unique_id}</CLabel><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Referral Code: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.customer_referral_code}</CLabel><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Address: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.customer_address}</CLabel><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Reward Points: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.member_reward_points}</CLabel><br />
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="4" className="ml-4">
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Date of Birth: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.customer_date_of_birth}</CLabel>
                                                        <span style={{ float: "right" }}>
                                                            {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                                            <MemBasicInfoUpdateModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                cust_id={MemberDetails.member_customer_id}
                                                            />
                                                        </span><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Gender: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.customer_gender}</CLabel><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Referred By: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.referred_first_name} {MemberDetails.referred_second_name}</CLabel><br />
                                                        <CLabel style={{ padding: "0px", margin: "0px" }}><h6 style={{ color: "grey" }}>Last Login: </h6></CLabel> <CLabel style={{ color: 'black', fontWeight: "bold" }}> {MemberDetails.member_last_login_date} </CLabel><br />
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "blue", borderWidth: "1px" }}>
                                            {/* <CCardHeader style={{ borderRadius: "20px", padding:"5px", margin:"5px" }}> */}

                                            {/* </CCardHeader> */}
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="10" md="10" lg="10">
                                                        <h5 style={{ padding: "0px", margin: "0px" }}>Personal Info</h5>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                            {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                                            <PersonalInfoUpdateModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                mem_id={MemberDetails.member_id}
                                                            />
                                                        </span>
                                                    </CCol>
                                                </CRow>
                                                <hr className="bgcolor" style={{ height: "1px" }} />

                                                <CRow>
                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                        <h6 style={{ color: "grey" }}>Occupation </h6>
                                                        <h6 style={{ color: "black", }}>
                                                            {PersonalInfo.info_occupation}
                                                        </h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                        <h6 style={{ color: "grey" }}>Stress in Job</h6>
                                                        <h6 style={{ color: "black", }}>
                                                            {PersonalInfo.info_stress_in_job}
                                                        </h6>
                                                    </CCol>

                                                    <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                        <h6 style={{ color: "grey" }}>Level of Physical Activity</h6>
                                                        <h6 style={{ color: "black" }}> {PersonalInfo.info_level_of_physical_activity}</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                        <h6 style={{ color: "grey" }}>Average Hour of sleep</h6>
                                                        <h6 style={{ color: "black" }}>{PersonalInfo.info_avg_hours_of_sleep}</h6>
                                                    </CCol>

                                                    <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                        <h6 style={{ color: "grey" }}>Quality of Sleep</h6>
                                                        <h6 style={{ color: "black" }}> {PersonalInfo.info_quality_of_sleep}</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="4" md="4" lg="4" className="mt-3">
                                                        <h6 style={{ color: "grey" }}>Time of Sleep</h6>
                                                        <h6 style={{ color: "black" }}>{PersonalInfo.info_time_of_sleep}</h6>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "orange", borderWidth: "1px" }}>
                                            {/* <CCardHeader style={{ borderRadius: "20px", padding:"5px", margin:"5px" }}> */}

                                            {/* </CCardHeader> */}
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="9" md="9" lg="9">
                                                        <h5 style={{ padding: "0px", margin: "0px" }}>Goals</h5>
                                                    </CCol>
                                                    {/* <CCol xs="12" sm="2" md="2" lg="2"></CCol> */}
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <DietChartForMember mem_id={MemberDetails.member_id}/>
                                                    </CCol>
                                                    <CCol xs="12" sm="1" md="1" lg="1">
                                                        <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                            {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                                            <MemGoalsUpdateModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                mem_id={MemberDetails.member_id}
                                                            />
                                                        </span>
                                                    </CCol>
                                                </CRow>
                                                <hr className="bgcolor" style={{ height: "1px" }} />

                                                <CRow>
                                                    <CCol xs="12" sm="6" md="6" lg="6">
                                                        <h6 style={{ color: "grey" }}>Primary Goal</h6>
                                                        <h6 style={{ color: "black", }}>
                                                            {MemberDetails.primary_goal_name}
                                                        </h6>
                                                        <CRow>
                                                            {/* <CCol> */}
                                                            {WorkoutCountsOfPG.map((WorkoutCountsOfPG, index) => (
                                                                <MemPriGoalWorkOutListModal
                                                                    mem_id={MemberDetails.member_id}
                                                                    pg_id={MemberDetails.member_primary_goal_id}
                                                                    workout_count={WorkoutCountsOfPG.workout_count}
                                                                    week_name={WorkoutCountsOfPG.mem_wc_map_week_name}
                                                                />
                                                                // <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", borderRadius: "10px", textAlign: "center", marginLeft: "3px", }}>
                                                                //     {/* <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>{WorkoutCountsOfPG.mem_wc_map_week_name}</div> */}
                                                                //     <MemPriGoalWorkOutListModal week_name={WorkoutCountsOfPG.mem_wc_map_week_name} />
                                                                //     {WorkoutCountsOfPG.workout_count}
                                                                // </div>
                                                            ))}

                                                            {/* <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>MON</div>
                                                                {WorkoutCountsOfPG.workout_count_mon}
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>TUE</div>
                                                                {WorkoutCountsOfPG.workout_count_tue}
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>WED</div>
                                                                {WorkoutCountsOfPG.workout_count_wed}
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>THU</div>
                                                                {WorkoutCountsOfPG.workout_count_thu}
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>FRI</div>
                                                                {WorkoutCountsOfPG.workout_count_fri}
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>SAT</div>
                                                                {WorkoutCountsOfPG.workout_count_sat}
                                                            </div> */}
                                                            {/* </CCol> */}
                                                        </CRow>
                                                    </CCol>
                                                    <CCol xs="12" sm="6" md="6" lg="6">
                                                        <h6 style={{ color: "grey" }}>Secondary Goal</h6>
                                                        <h6 style={{ color: "black", }}>
                                                            {MemberDetails.secondary_goal_name}
                                                        </h6>
                                                        <CRow>
                                                            {/* <CCol> */}
                                                            {WorkoutCountsOfSG.map((WorkoutCountsOfSG, index) => (
                                                                // <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", borderRadius: "10px", textAlign: "center", marginLeft: "3px", }}>
                                                                //     <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>{WorkoutCountsOfSG.mem_wc_map_week_name}</div>
                                                                //     {WorkoutCountsOfSG.workout_count}
                                                                // </div>
                                                                <MemSecGoalWorkOutListModal
                                                                    mem_id={MemberDetails.member_id}
                                                                    sg_id={MemberDetails.member_secondary_goal_id}
                                                                    workout_count={WorkoutCountsOfSG.workout_count}
                                                                    week_name={WorkoutCountsOfSG.mem_wc_map_week_name}
                                                                />
                                                            ))}

                                                            {/* <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>SUN</div>
                                                                10
                                                            </div>

                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>MON</div>
                                                                10
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>TUE</div>
                                                                10
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>WED</div>
                                                                10
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>THU</div>
                                                                10
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>FRI</div>
                                                                10
                                                            </div>
                                                            <div style={{ height: "45px", width: "40px", backgroundColor: "#EEEBF4", marginLeft: "3px", borderRadius: "10px", textAlign: "center" }}>
                                                                <div style={{ height: "15px", width: "25px", backgroundColor: "#3D1F9B", borderRadius: "3px", fontSize: "10px", color: "white", textAlign: "center", marginLeft: "8px", marginTop: "8px" }}>SAT</div>
                                                                10
                                                            </div> */}
                                                            {/* </CCol> */}
                                                        </CRow>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#E04C4C", borderWidth: "1px" }}>
                                            {/* <CCardHeader style={{ borderRadius: "20px", padding:"5px", margin:"5px" }}> */}

                                            {/* </CCardHeader> */}
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="10" md="10" lg="10">
                                                        <h5 style={{ padding: "0px", margin: "0px" }}>Body Measurement Info</h5>
                                                    </CCol>
                                                    {/* <CCol xs="12" sm="2" md="2" lg="2">
                                                        <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                            
                                                            <BodyMeasurementModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                mem_id={MemberDetails.member_id}
                                                            />
                                                        </span>
                                                    </CCol> */}
                                                </CRow>

                                                <hr className="bgcolor" style={{ height: "1px" }} />

                                                <CRow >
                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <h6 style={{ color: "grey" }}>Name</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <h6 style={{ color: "grey" }}>Value and Unit</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <h6 style={{ color: "grey" }}>Date</h6>
                                                    </CCol>
                                                    {/* <CCol xs="12" sm="2" md="2" lg="2">
                                                        <h6 style={{ color: "grey" }}>Edit</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <h6 style={{ color: "grey" }}>
                                                            
                                                            Delete
                                                            </h6>
                                                    </CCol> */}
                                                </CRow>
                                                <hr className="bgcolor" style={{ height: "1px" }} />
                                                {/* <CLabel style={{ padding: "0px", margin: "0px" }}>---------------------------------------------------------------------------------------------------------------------------</CLabel> */}
                                                {BodyMeasurement.map((BodyMeasurement, index) => (
                                                    <CRow key={index}>
                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <h6 style={{ color: "black" }}>{BodyMeasurement.body_measurement_name} </h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="2" md="2" lg="2">
                                                            <h6 style={{ color: "black" }}>{BodyMeasurement.bm_value} {BodyMeasurement.bm_unit}</h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="2" md="2" lg="2">
                                                            <h6 style={{ color: "black" }}>{BodyMeasurement.bm_date.substring(0, 10).split('-').reverse().join('-')}</h6>
                                                        </CCol>
                                                        {/* <CCol xs="12" sm="2" md="2" lg="2">
                                                            <MemberBodyMeasurementModal />
                                                        </CCol> */}

                                                    </CRow>
                                                ))}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#fc81ea", borderWidth: "1px" }}>
                                            {/* <CCardHeader style={{ borderRadius: "20px", padding:"5px", margin:"5px" }}> */}

                                            {/* </CCardHeader> */}
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="10" md="10" lg="10">
                                                        <h5 style={{ padding: "0px", margin: "0px" }}>Health Info</h5>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                            {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                                            <HealthInfoUpdateModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                mem_id={MemberDetails.member_id}
                                                            />
                                                        </span>
                                                    </CCol>
                                                </CRow>

                                                <hr className="bgcolor" style={{ height: "1px" }} />

                                                <CRow >
                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <h6 style={{ color: "grey" }}>Name</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <h6 style={{ color: "grey" }}>Yes/No</h6>
                                                    </CCol>
                                                </CRow>
                                                <CLabel style={{ padding: "0px", margin: "0px" }}>--------------------------------------------------------</CLabel>
                                                {HealthInfo.map((HealthList, index) => (
                                                    <CRow key={index}>
                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <h6 style={{ color: "black" }}>{HealthList.health_name} </h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="2" md="2" lg="2">
                                                            <h6 style={{ color: "black" }}>{HealthList.mh_value}</h6>
                                                        </CCol>
                                                    </CRow>
                                                ))}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#19d404", borderWidth: "1px" }}>
                                            {/* <CCardHeader style={{ borderRadius: "20px", padding:"5px", margin:"5px" }}> */}

                                            {/* </CCardHeader> */}
                                            <CCardBody>
                                                <CRow>
                                                    <CCol xs="12" sm="10" md="10" lg="10">
                                                        <h5 style={{ padding: "0px", margin: "0px" }}>KYC Details</h5>
                                                    </CCol>
                                                    <CCol xs="12" sm="2" md="2" lg="2">
                                                        <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                            {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                                            <MemKycUpdateModal
                                                                show={show}
                                                                changeDependencyparent={updatemodalvalue}
                                                                mem_id={MemberDetails.member_id}
                                                            />
                                                        </span>
                                                    </CCol>
                                                </CRow>
                                                <hr className="bgcolor" style={{ height: "1px" }} />

                                                <CRow style={{ fontWeight: "bold" }}>
                                                    <CCol xs="12" sm="3" md="3" lg="3" >
                                                        <h6 style={{ color: "grey" }}>KYC Name</h6>
                                                    </CCol>
                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <h6 style={{ color: "grey" }}>KYC Number</h6>
                                                    </CCol>

                                                    <CCol xs="12" sm="3" md="3" lg="3">
                                                        <h6 style={{ color: "grey" }}>KYC File Name</h6>
                                                    </CCol>
                                                </CRow>

                                                {KYCDetails.map((kyclist, index) => (
                                                    <CRow className="mt-2" key={index}>
                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <h6 style={{ color: "Black" }}>{kyclist.kyc_name}</h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <h6 style={{ color: "Black" }}>{kyclist.kyc_number}</h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <h6 style={{ color: "Black" }}>{kyclist.kyc_filename}</h6>
                                                        </CCol>

                                                        <CCol xs="12" sm="3" md="3" lg="3">
                                                            <CButton className="btn btn-sm bgcolor white" style={{ width: "50%" }}
                                                                onClick={() => documentopen(kyclist.kyc_filename)}
                                                            >
                                                                View</CButton>
                                                        </CCol>
                                                    </CRow>
                                                ))}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                {/* {Pre ?
                                    <CRow>
                                        {MemberDetails.product_type === "PACKAGE" || MemberDetails.product_type === "PROGRAM" ?
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <CCard style={{ borderRadius: "20px", borderColor: "#02f7cf", borderWidth: "1px" }}>
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol xs="12" sm="9" md="9" lg="9">
                                                                <h5 style={{ padding: "0px", margin: "0px" }}>Package Details</h5>
                                                            </CCol>
                                                            <CCol xs="12" sm="2" md="2" lg="2">
                                                                <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                                    
                                                                    <MembershipRenewalModal
                                                                        show={show}
                                                                        changeDependencyparent={updatemodalvalue}
                                                                        memid={memid}
                                                                    />
                                                                </span>
                                                            </CCol>
                                                            <CCol xs="12" sm="1" md="1" lg="1">
                                                                <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                                    
                                                                    <BatchDetailsUpdateModal
                                                                        show={show}
                                                                        changeDependencyparent={updatemodalvalue}
                                                                        mem_id={MemberDetails.member_id}
                                                                    />
                                                                </span>
                                                            </CCol>
                                                        </CRow>
                                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                                        <CRow>
                                                            <CCol xs="12" sm="4" md="4" lg="4">
                                                                <img className="playerProfilePic_home_tile "
                                                                    //src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PACKAGE/" + MemberDetails.product_cover_image}
                                                                    style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                                />
                                                            </CCol>
                                                            <CCol xs="12" sm="8" md="8" lg="8">
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Registration Fee: &#160;</h6> </CLabel><CLabel>₹ {MemberDetails.member_registration_fee}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Type: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_type}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Product Name: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_name}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Start Date: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_product_start_date}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold", color: "red" }}><h6 style={{ fontWeight: "bold" }}>End Date: &#160;</h6> </CLabel><CLabel style={{ color: "red" }}> {MemberDetails.member_product_end_date}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Batch: &#160;</h6> </CLabel><CLabel> {MemberDetails.batch_name}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>In Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_in_time}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Out Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_out_time}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Remarks: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_remarks}</CLabel><br />
                                                            </CCol>
                                                        </CRow>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            :
                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                <CCard style={{ borderRadius: "20px", borderColor: "#02f7cf", borderWidth: "1px" }}>
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol xs="12" sm="9" md="9" lg="9">
                                                                <h5 style={{ padding: "0px", margin: "0px" }}>Product Details</h5>
                                                            </CCol>
                                                            <CCol xs="12" sm="1" md="1" lg="1">
                                                                <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                                    \
                                                                    <MembershipRenewalModal
                                                                        //show={show}
                                                                        //changeDependencyparent={updatemodalvalue}
                                                                        memid={memid}
                                                                    />
                                                                </span>
                                                            </CCol>
                                                            <CCol xs="12" sm="1" md="1" lg="1">
                                                                <span style={{ float: "right", padding: "0px", margin: "0px" }}>
                                                                    
                                                                    <BatchDetailsUpdateModal
                                                                        show={show}
                                                                        changeDependencyparent={updatemodalvalue}
                                                                        mem_id={MemberDetails.member_id}
                                                                    />
                                                                </span>
                                                            </CCol>
                                                        </CRow>
                                                        <hr className="bgcolor" style={{ height: "1px" }} />
                                                        <CRow>
                                                            <CCol xs="12" sm="4" md="4" lg="4">

                                                                <img className="playerProfilePic_home_tile "
                                                                    //src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                    src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PRODUCT/" + MemberDetails.product_cover_image}
                                                                    style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                                />

                                                            </CCol>
                                                            <CCol xs="12" sm="8" md="8" lg="8">
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Registration Fee: &#160;</h6> </CLabel><CLabel>₹ {MemberDetails.member_registration_fee}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Type: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_type}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Product Name: &#160;</h6> </CLabel><CLabel> {MemberDetails.product_name}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Start Date: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_product_start_date}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold", color: "red" }}><h6 style={{ fontWeight: "bold" }}>End Date: &#160;</h6> </CLabel><CLabel style={{ color: "red" }}> {MemberDetails.member_product_end_date}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Batch: &#160;</h6> </CLabel><CLabel> {MemberDetails.batch_name}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>In Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_in_time}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Out Time: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_out_time}</CLabel><br />
                                                                <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Remarks: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_remarks}</CLabel><br />
                                                            </CCol>
                                                        </CRow>
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                        }
                                    </CRow>
                                    : null} */}


                                {Post ?
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "20px", borderColor: "#f06275", borderWidth: "1px" }}>
                                                <CCardBody>
                                                    <h5>Postpaid Details</h5>
                                                    <hr className="bgcolor" style={{ height: "1px" }} />
                                                    <CRow>
                                                        <CCol xs="12" sm="6" md="6" lg="6">
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Advance Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;&#160;{PostDetails.postpaid_advance_amount}</CLabel><br />
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Start date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_start_date}</CLabel><br />
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Bill Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_bill_date}</CLabel><br />

                                                        </CCol>
                                                        <CCol xs="12" sm="6" md="6" lg="6">
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Last Due Date after Bill Date: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_last_due_date_after_bill_date}</CLabel><br />
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Monthly Payable Amount: </CLabel><CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_monthly_payable_amount}</CLabel><br />
                                                            <CLabel style={{ fontWeight: "bold", color: "black" }}>Dues Allowed for Attendance: </CLabel> <CLabel style={{ color: "black" }}> &#160;{PostDetails.postpaid_dues_allowed_for_attendance}</CLabel><br />
                                                        </CCol>
                                                    </CRow>
                                                    <hr className="bgcolor" style={{ height: "1px" }} />

                                                    <CRow>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <table className="table table-bordered">
                                                                <tbody>
                                                                    <tr>
                                                                        <th colSpan={8} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Postpaid Bill List</th>
                                                                    </tr>
                                                                    <tr className=' white' style={{ backgroundColor: "#38acec" }}>
                                                                        <td>Date</td>
                                                                        <td>Amount</td>
                                                                        <td>Tax</td>
                                                                        <td>Last Due Date</td>
                                                                        <td>From Date and To date </td>
                                                                        <td>Status</td>
                                                                        <td>Close</td>
                                                                    </tr>
                                                                    {BillList.map((BillList, index) => (
                                                                        <tr key={index}>
                                                                            <td>{BillList.bill_generated_date}</td>
                                                                            <td>{BillList.bill_amount}</td>
                                                                            <td>{BillList.tax_group_name}</td>
                                                                            <td>{BillList.bill_last_due_date}</td>
                                                                            <td>{BillList.bill_from_date} to {BillList.bill_to_date}</td>
                                                                            <td>{BillList.bill_status_text}</td>
                                                                            <td >
                                                                                {BillList.bill_status_text === "PAID" ?
                                                                                    null
                                                                                    :
                                                                                    <PostpaidBillUpdateStatusModal
                                                                                        billid={BillList.bill_id}
                                                                                        billamount={BillList.bill_amount}
                                                                                    />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </CCol>
                                                    </CRow>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    : null
                                }

                                {SalesProductLists.length > 0 ?
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "20px", borderColor: "#8D6E63", borderWidth: "1px" }}>
                                                <CCardBody>
                                                    <CRow>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <h5 style={{ padding: "0px", margin: "0px" }}>Active Package Details</h5>
                                                        </CCol>
                                                    </CRow>
                                                    {/* <hr className="bgcolor" style={{ height: "1px" }} /> */}
                                                    {SalesProductLists.map((List, index) => (
                                                        <CRow>
                                                            <CCol xs="12" sm="12" md="12" lg="12">
                                                                <hr className="bgcolor" style={{ height: "1px" }} />
                                                                <CRow key={index} className="">
                                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                                        <img className="playerProfilePic_home_tile "
                                                                            //src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/CUSTOMER/" + MemberDetails.customer_photo}
                                                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/PACKAGE/" + List.product_cover_image}
                                                                            style={{ width: "100%", marginTop: "", float: "", paddingRight: "" }}
                                                                        />
                                                                    </CCol>
                                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                                        {/* <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Registration Fee: &#160;</h6> </CLabel><CLabel> {MemberDetails.member_registration_fee}</CLabel><br /> */}
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Type: &#160;</h6> </CLabel><CLabel> {List.product_type}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Product Name: &#160;</h6> </CLabel><CLabel> {List.product_name}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Product No of days: &#160;</h6> </CLabel><CLabel> {List.sale_product_number_of_days}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Start Date: &#160;</h6> </CLabel><CLabel> {List.sale_product_start_date !== null ? List.sale_product_start_date.substring(0, 10).split('-').reverse().join('-') : List.sale_product_start_date}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold", color: "red" }}><h6 style={{ fontWeight: "bold" }}>End Date: &#160;</h6> </CLabel><CLabel style={{ color: "red" }}> {List.sale_product_end_date !== null ? List.sale_product_end_date.substring(0, 10).split('-').reverse().join('-') : List.sale_product_end_date}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Batch: &#160;</h6> </CLabel><CLabel> {List.batch_name}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>In Time: &#160;</h6> </CLabel><CLabel> {List.sale_product_in_time}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Out Time: &#160;</h6> </CLabel><CLabel> {List.sale_product_out_time}</CLabel><br />

                                                                    </CCol>
                                                                    <CCol xs="12" sm="4" md="4" lg="4">
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Unit Price: &#160;</h6> </CLabel><CLabel>₹ {List.sale_product_unit_price}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Qty: &#160;</h6> </CLabel><CLabel> {List.sale_product_quantity}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Discount(In Percentage): &#160;</h6> </CLabel><CLabel> {List.sale_product_discount_percentage}%</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Discount(In Amount): &#160;</h6> </CLabel><CLabel>₹ {List.sale_product_discount_amount}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Discount Amount(In OL): &#160;</h6> </CLabel><CLabel>₹ {List.sale_product_discount_amount_order_level}</CLabel><br />
                                                                        <CLabel className='' style={{ padding: "0px", margin: "0px", fontWeight: "bold" }}><h6 style={{ fontWeight: "bold" }}>Total Amount: &#160;</h6> </CLabel><CLabel>₹ {List.sale_product_total_amount}</CLabel><br />
                                                                    </CCol>
                                                                </CRow>

                                                            </CCol>
                                                        </CRow>
                                                    ))}

                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    : null}

                                {DisEnqyiry ?
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "20px", borderColor: "#3256a8", borderWidth: "1px" }}>
                                                <CCardBody>
                                                    {/* <h5>Enquiry List</h5>
                                                    <hr className="bgcolor" style={{ height: "1px" }} /> */}

                                                    <CRow>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <table className="table table-bordered">
                                                                <tbody>
                                                                    <tr>
                                                                        <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Enquiry List</th>
                                                                    </tr>
                                                                    <tr className=' white fontweight' style={{ backgroundColor: "#38acec" }}>
                                                                        <td>Source</td>
                                                                        <td>Type</td>
                                                                        <td>Next FollowUp Date</td>
                                                                        <td>Joining Date</td>
                                                                        <td>Status Text</td>
                                                                        <td>Current Status</td>
                                                                        <td>Comments</td>
                                                                        <td>Follow Up</td>
                                                                    </tr>
                                                                    {EnquiriesList.map((EnquiryList, index) => (
                                                                        <tr key={index}>
                                                                            <td>{EnquiryList.source_name}</td>
                                                                            <td>{EnquiryList.enquiry_type_name}</td>
                                                                            {EnquiryList.enquiry_next_follow_up_date !== null ?
                                                                                <td>{EnquiryList.enquiry_next_follow_up_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                                : <td></td>
                                                                            }

                                                                            {EnquiryList.enquiry_joining_date !== null ?
                                                                                <td>{EnquiryList.enquiry_joining_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                                : <td></td>
                                                                            }
                                                                            <td>{EnquiryList.enquiry_status_text}</td>
                                                                            <td>{EnquiryList.enquiry_current_status}</td>
                                                                            <td>{EnquiryList.enquiry_comments}</td>
                                                                            <td >
                                                                                {EnquiryList.enquiry_current_status === "CONVERTED" ?
                                                                                    null
                                                                                    :
                                                                                    <EnquiryFollowUpModal
                                                                                        enquiry_id={EnquiryList.enquiry_id}
                                                                                    />
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </CCol>
                                                    </CRow>
                                                </CCardBody>
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    : null
                                }

                                {DisTrails ?
                                    <CRow>
                                        <CCol xs="12" sm="12" md="12" lg="12">
                                            <CCard style={{ borderRadius: "20px", borderColor: "#738055", borderWidth: "1px" }}>
                                                <CCardBody>
                                                    {/* <h5>Trail List</h5>
                                                    <hr className="bgcolor" style={{ height: "1px" }} /> */}

                                                    <CRow>
                                                        <CCol xs="12" sm="12" md="12" lg="12">
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th colSpan={16} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Trial List</th>
                                                                        </tr>
                                                                        <tr className=' white fontweight' style={{ backgroundColor: "#38acec" }}>
                                                                            <td>Branch</td>
                                                                            <td>Trainer Name</td>
                                                                            <td>Product Name</td>
                                                                            <td>Start Date</td>
                                                                            <td>Start Time</td>
                                                                            <td>End Date</td>
                                                                            <td>End Time</td>
                                                                            <td>Status Text</td>
                                                                            <td>Update Status</td>
                                                                        </tr>
                                                                        {TrailList.map((TrailList, index) => (
                                                                            <tr key={index}>
                                                                                <td>{TrailList.branch_name}</td>
                                                                                <td>{TrailList.trainer_name}</td>
                                                                                <td>{TrailList.product_name}</td>
                                                                                <td>{TrailList.trial_start_date}</td>
                                                                                <td>{TrailList.trial_start_time}</td>
                                                                                <td>{TrailList.trial_end_date}</td>
                                                                                <td>{TrailList.trial_end_time}</td>
                                                                                <td>{TrailList.trial_status_text}</td>
                                                                                <td>
                                                                                    <TrailsUpdateStatusModal
                                                                                        trial_id={TrailList.trial_id}
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
                                    : null
                                }


                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#a268f2", borderWidth: "1px" }}>
                                            <CCardBody>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <th colSpan={10} className='' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Sales Details</th>
                                                            </tr>
                                                            <tr align="center" className='fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                                <td>#</td>
                                                                <td>Trans Date</td>
                                                                <td>Trans ID</td>
                                                                <td>Total Amount</td>
                                                                <td>Paid Amount</td>
                                                                <td>Balance Amount</td>
                                                                <td>Payable Date</td>
                                                                <td>Details</td>
                                                                <td>Cancel</td>
                                                                <td>Download_Invoice</td>
                                                            </tr>

                                                            {SalesDetails.map((List, index) => (
                                                                <tr align="center" key={index}>
                                                                    <td>{index + 1}</td>
                                                                    {List.sale_created_at !== null ?
                                                                        <td>{List.sale_created_at.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                        : <td></td>
                                                                    }
                                                                    <td>{List.sale_trans_id}</td>
                                                                    <td>{List.sale_total_amount}</td>
                                                                    <td>{List.sale_paid_amount}</td>
                                                                    <td>{List.sale_balance_amount}</td>
                                                                    {List.sale_balance_payable_date !== null ?
                                                                        <td>
                                                                            {List.sale_balance_payable_date.substring(0, 10).split('-').reverse().join('-')}
                                                                        </td>
                                                                        : <td></td>
                                                                    }
                                                                    <td>
                                                                        <CButton className="btn btn-sm bgcolor white" to={`/sales-details?saleid=${List.sale_id}`}>View</CButton>
                                                                    </td>
                                                                    <td>
                                                                        <CancelSale
                                                                            sale_id={List.sale_id}
                                                                            trans_id={List.sale_trans_id}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {/* <CButton className="btn btn-sm bgcolor white" onClick={(e) => SaleDownloadPDF(List.sale_id, MemberDetails.member_branch_id, MemberDetails.member_id)} >Download Invoice</CButton> */}

                                                                        <div className="" style={{ borderRadius: "5px" }}>
                                                                            <CButton type="submit" className='btn btn-sm btn-outline-primary'
                                                                                onClick={(e) => SaleDownloadPDF(List.sale_id, MemberDetails.member_branch_id, MemberDetails.member_id)}
                                                                                disabled={disablebuttondc}
                                                                                style={{ width: "100%", color: "", fontWeight: "50%", fontSize: "12px" }} >
                                                                                {/* <i class="fa fa-file-pdf-o"></i> PDF */}
                                                                                Download Invoice
                                                                            </CButton>
                                                                            <img id="img_gif_loading_btn_DC" src={process.env.PUBLIC_URL + '/avatars/gif_loading.gif'} style={{ width: "20px", marginTop: "-26px", float: "right", marginRight: "5px", display: "none" }} />
                                                                        </div>
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

                                <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#00C43F", borderWidth: "1px" }}>
                                            <CCardBody>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th colSpan={7} className='bgcolor1' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Balance Payment</th>
                                                        </tr>
                                                        <tr align="center" className=' fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                            <td>Trans ID</td>
                                                            <td>Total Amount</td>
                                                            <td>Paid Amount</td>
                                                            <td>Balance Amount</td>
                                                            <td>Payable Date</td>
                                                            <td>Receive</td>
                                                        </tr>
                                                        {BalanceHistory.map((History, index) => (
                                                            <tr key={index}>
                                                                <td align='center'>{History.sale_trans_id}</td>
                                                                <td align='center'>{History.sale_total_amount}</td>
                                                                <td align='center'>{History.sale_paid_amount}</td>
                                                                <td align='center'>{History.sale_balance_amount}</td>
                                                                {History.sale_balance_payable_date !== null ?
                                                                    <td align='center'>
                                                                        {History.sale_balance_payable_date.substring(0, 10).split('-').reverse().join('-')}
                                                                    </td>
                                                                    : <td></td>
                                                                }
                                                                {History.sale_balance_amount > 0 ?
                                                                    <td align='center'>
                                                                        <BalancePaymentUpdateModal
                                                                            saleid={History.sale_id}
                                                                            balance_amount={History.sale_balance_amount}
                                                                        />
                                                                    </td>
                                                                    : <td></td>
                                                                }
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                {/* <CRow>
                                    <CCol xs="12" sm="12" md="12" lg="12">
                                        <CCard style={{ borderRadius: "20px", borderColor: "#E04C4C", borderWidth: "1px" }}>
                                            <CCardBody>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th colSpan={5} className='bgcolor1' style={{ backgroundColor: "#1385c5", textAlign: "center", color: "white", fontSize: "12px" }}>Due List</th>
                                                        </tr>
                                                        <tr className=' fontweight white' style={{ backgroundColor: "#38acec" }}>
                                                            <td align="center">Total Amount</td>
                                                            <td align="center">Paid Amount</td>
                                                            <td align="center">Balance Amount</td>
                                                            <td align="center">Balance Payable date</td>
                                                            <td>Close</td>
                                                        </tr>
                                                        {DueList.map((Due, index) => (
                                                            <tr key={index}>
                                                                <td align='center'>{Due.sale_total_amount}</td>
                                                                <td align='center'>{Due.sale_paid_amount}</td>
                                                                <td align='center'>{Due.sale_balance_amount}</td>
                                                                {Due.sale_balance_payable_date !== null ?
                                                                    <td align='center'>{Due.sale_balance_payable_date.substring(0, 10).split('-').reverse().join('-')}</td>
                                                                    :
                                                                    <td></td>
                                                                }
                                                                <td>
                                                                    <PostpaidBillUpdateStatusModal
                                                                        billid={Due.sale_id}
                                                                        billamount={Due.sale_balance_amount}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow> */}

                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}
export default MemberDetails;