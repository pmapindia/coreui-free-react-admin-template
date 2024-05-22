import React, { useState, useEffect, lazy } from 'react'
import {
  CWidgetDropdown, CInput, CSelect, CLabel, CFormGroup, CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import Chart from "react-apexcharts";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Cookies, useCookies } from 'react-cookie';
import 'font-awesome/css/font-awesome.min.css';
import '../../../scss/_custom.scss';
import { Link } from 'react-router-dom';
import PostpaidBillUpdateStatusModalModal from '../Modals/PostpaidBillUpdateStatusModal';
import MembershipRenewalModal from '../Modals/RenewMembershipModal';
import EnquiryFollowUpModal from '../Modals/EnquiryFollowUpModal';
import BalancePaymentUpdateModal from '../Modals/BalancePaymentUpdateModal';
import TrailsUpdateStatusModal from '../Trails/TrailsUpdateStatusModal';
import * as AppConstants from '../AppConstants';
import Notification from '../Modals/NotificationAltertModal';


const AdminDashboard = () => {

  const [cookies, setCookies, removeCookie] = useCookies(['admin']);

  const [DasboardCount, setDasboardCount] = useState({});
  const [DueCount, setDueCount] = useState({});

  const [EnquiryTrialConverted, setEnquiryTrialConverted] = useState({
    options: {},
    series: [],
  });


  const [sales, setSales] = useState({
    options: {},
    series: [],


  });
  const [EnquiryTrialConvertedinput, setEnquiryTrialConvertedinput] = useState({
    month: "",
    year: ""

  });

  const [salesinput, setSalesinput] = useState({
    year: ""
  });
  const {
    year
  } = salesinput;

  const [Selectedmonth, setSelectedMonth] = useState({
    smonth: "",

  });

  const config = {
    headers: {
      unique_code: cookies.unique_code,
    }
  };

  useEffect(() => {
    if (salesinput.year === "") {
      var currentyear = new Date();
      var current_year = currentyear.getFullYear();
      setSalesinput({ ...salesinput, "year": current_year });
      // setEnquiryTrialConvertedinput({ ...EnquiryTrialConvertedinput, ["year"]: todays_date});
      console.log("current_year: " + current_year);
    }
  }, [salesinput.year === ""]);

  const [Input, setInput] = useState({
    loggedin_user_id: "",
    branch_id: ""
  });

  const {
    loggedin_user_id,
    branch_id
  } = Input;

  const OnInputChangeB = (e) => {
    console.log(e.target.value);
    setInput({ ...Input, [e.target.name]: e.target.value })
  }

  const [BranchDropdowns, setBranchDropdowns] = useState([]);

  const GetDropDown = async () => {
    await axios.post(process.env.REACT_APP_API + "GetDropDown", {
      dropdown_list: [
        { "dropdown_type": "DD_BRANCH", "dropdown_filter": "" }
      ]
    }, config).then(response => {
      console.log(response);
      if (response.data.drop_down_list != null) {
        for (let d = 0; d < response.data.drop_down_list.length; d++) {
          var dd_list = response.data.drop_down_list[d];
          console.log("dd_list" + dd_list);
          // if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
          //   let ddlist = [];
          //   for (let sd = 0; sd < dd_list.each_drop_down_list.length; sd++) {
          //     //ddlist.push({ "value": dd_list.each_drop_down_list[sd].dd_id, "label": dd_list.each_drop_down_list[sd].dd_name })
          //   }
          //   setBranchDropdowns(ddlist);
          // }
          if (dd_list.each_drop_down_list != null && dd_list.dropdown_type === "DD_BRANCH") {
            setBranchDropdowns(dd_list.each_drop_down_list);
          }
        }
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const onChangedropdown = (e) => {
    console.warn(e.value);//here i will get the specific selected value
    console.warn(e.label);
    setInput({ ...Input, ["branch_id"]: e.value });
  };

  useEffect(() => {
    GetDropDown();
  }, []);

  useEffect(() => {
    DashboardAdmin();
    DashboardGraphEnquiryTrialConvertedApi();
    DashboardGraphSalesApi();
  }, [branch_id]);

  //---------------------------------Dashboard Admin-----------------------------------------------------
  const DashboardAdmin = async () => {
    await axios.post(process.env.REACT_APP_API + "DashboardAdmin", {
      "loggedin_user_id": cookies.user_id,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setDasboardCount({
          "total_members": response.data.total_members,
          "active_members": response.data.active_members,
          "today_sales_amount": response.data.today_sales_amount,
          "current_month_sales_amount": response.data.current_month_sales_amount,
          "today_total_bills": response.data.today_total_bills,
          "today_total_bill_amount": response.data.today_total_bill_amount,
          "total_bills_due": response.data.total_bills_due,
          "total_bills_due_amount": response.data.total_bills_due_amount,
          "today_renewals": response.data.today_renewals,
          "current_month_renewals": response.data.current_month_renewals,
          "total_non_renewals": response.data.total_non_renewals,
          "total_balance_to_be_cleared_today": response.data.total_balance_to_be_cleared_today,
          "total_todays_enquiry": response.data.total_todays_enquiry
        })
      }
      else {
        setDasboardCount({
          "total_members": response.data.total_members,
          "active_members": response.data.active_members,
          "today_sales_amount": response.data.today_sales_amount,
          "current_month_sales_amount": response.data.current_month_sales_amount,
          "today_total_bills": response.data.today_total_bills,
          "today_total_bill_amount": response.data.today_total_bill_amount,
          "total_bills_due": response.data.total_bills_due,
          "total_bills_due_amount": response.data.total_bills_due_amount,
          "today_renewals": response.data.today_renewals,
          "current_month_renewals": response.data.current_month_renewals,
          "total_non_renewals": response.data.total_non_renewals,
          "total_balance_to_be_cleared_today": response.data.total_balance_to_be_cleared_today,
          "total_todays_enquiry": response.data.total_todays_enquiry
        })
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
      })
  }

  var todaysdate = new Date();
  var todays_date = todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (todaysdate.getDate())).slice(-2);
  //console.log(todays_date);

  const d = new Date();
  //console.log(d.toLocaleDateString());
  const month = d.getDate();
  d.setDate(d.getDate() + 7);
  while (d.getDate() === month) {
    d.setDate(d.getDate() - 1);
  }
  //console.log("+7")
  var NextSeven = d.toISOString().slice(0, 10)
  //console.log(d.toISOString().slice(0, 10))

  var date = new Date();
  date.setDate(date.getDate() - 7);

  //console.log("-7: " + date);

  const d1 = new Date();
  //console.log(d1.toLocaleDateString());
  const month1 = d1.getDate();
  d.setDate(d1.getDate() - 7);
  while (d1.getDate() === month1) {
    d1.setDate(d.getDate() - 1);
  }
  //console.log("-7")
  var PreviosSeven = date.toISOString().slice(0, 10)
  //console.log(d1.toISOString().slice(0, 10))

  //console.log("PreviosSeven " + PreviosSeven);
  //console.log("NextSeven " + NextSeven);


  var date1 = new Date();
  date1.setFullYear(date1.getFullYear() - 1);

  var LastOneYear = date1.toISOString().slice(0, 10)
  //console.log("Last One Year" + LastOneYear)
  //-----------------------CronJobPostpaidBillGeneration-------------------------------------------------------------
  const CronBills = async () => {

    var unique_code = cookies.unique_code

    await axios.get(process.env.REACT_APP_API + `CronJobPostpaidBillGeneration?unique_code=${unique_code}`, {}, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        if (response.data._total_bill_generated !== 0) {
          // setDasboardCount({
          //   ...DasboardCount,
          //   ["today_bills"]: response.data._total_bill_generated
          // });
        }
        else {
          // setDasboardCount({
          //   ...DasboardCount,
          //   ["today_bills"]: response.data._total_bill_generated
          // });
        }
      }
      else {
        // setDasboardCount({
        //   ...DasboardCount,
        //   ["today_bills"]: response.data._total_bill_generated
        // });
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
      })
  }

  //-----------------------CronGetAttendanceData-------------------------------------------------------------
  const CronGetAttendanceData = async () => {

    var unique_code = cookies.unique_code

    await axios.get(process.env.REACT_APP_API + `CronJobGetAttendanceDataFromBiometric?unique_code=${unique_code}`, {}, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        if (response.data.total_attendance_inserted !== 0) {
          // setDasboardCount({
          //   ...DasboardCount,
          //   ["today_bills"]: response.data._total_bill_generated
          // });
        }
        else {
          // setDasboardCount({
          //   ...DasboardCount,
          //   ["today_bills"]: response.data._total_bill_generated
          // });
        }
      }
      else {
        // setDasboardCount({
        //   ...DasboardCount,
        //   ["today_bills"]: response.data._total_bill_generated
        // });
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
      })
  }

  //------------------------------------EnquiryTrialConverted----------------------------------------------------------------

  const DashboardGraphEnquiryTrialConvertedApi = async () => {

    var list = {};
    list["month"] = EnquiryTrialConvertedinput.month;
    list["year"] = EnquiryTrialConvertedinput.year;
    list["branch_id"] = branch_id;
    await axios.post(process.env.REACT_APP_API + "DashboardGraphEnquiryTrialConverted", list, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setEnquiryTrialConverted({
          series: [response.data.total_enquiries,
          response.data.total_trial_booked,
          response.data.total_trial_done,
          response.data.total_converted],

          options: {
            "colors": ["#D645A0", "#1F93F6", "#800000", "#479e4a"],

            chart: {
              width: 200,
              type: 'pie',
            },
            labels: ["Enquiries", "Trial Booked", "Trial Done", "Converted"],

            plotOptions: {
              pie: {
                dataLabels: {
                  offset: -5
                }
              }
            },
            dataLabels: {
              formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex]
              },
            },
            legend: {
              fontSize: "8px",
              position: 'bottom'
            }
          },
        }
        );
      }
    }).catch(error => {
      console.log(error);
      //alert(error.message);
    })
  }

  const DashboardGraphSalesApi = async () => {
    var list = {};
    list["year"] = salesinput.year;
    list["branch_id"] = branch_id;
    await axios.post(process.env.REACT_APP_API + "DashboardGraphSales", list, config).then(response => {
      console.log(response);


      if (response.data.is_success) {
        var amount = [];
        var monthname = [];

        for (let i = 0; i < response.data.graph_sales.length; i++) {
          var amount1 = response.data.graph_sales[i];

          if (response.data.graph_sales[i].sales_amount != null) {
            amount1 = response.data.graph_sales[i].sales_amount;

          } else {
            amount1 = 0;
          }
          amount.push(amount1);
          monthname.push(response.data.graph_sales[i].month_name);
        }

        setSales({
          "options": {



            colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
              '#f48024', '#69d2e7', '#ff4d4d', '#ffff99'
            ],
            dataLabels: {
              enabled: true,
              offsetY: -20,

              style: {
                colors: ['#27272B']
              },
            },
            "chart": {
              "id": "basic-bar",
              toolbar: { show: true, tools: { download: true, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: true }, }, zoom: { enabled: false }
            },
            "xaxis": {
              type: 'category',
              "categories": monthname,
              labels: {
                rotate: -90,
                style: {
                  // colors: ["#B2B3CB"],
                  fontSize: '9.45373px',
                  fontWeight: 500,
                  cssClass: 'apexcharts-xaxis-label',
                },
              },
            },

            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 4,
                barHeight: '70%',
                dataLabels: {
                  //  orientation: 'horizontal',
                  position: 'top'
                },
                columnWidth: '35%',
                distributed: true,
                rangeBarOverlap: true,
                rangeBarGroupRows: false,
              },
            },
            yaxis: [
              {
                labels: {
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                }
              }
            ]
          },

          "series": [
            {
              "name": "Month",
              "data": amount,
              // "data": [1,2,34,5,6,7,67,67,5,5,6,7,8,9,0,9,2,12,223,45,65,67,78,7,77,76,78,54,33,23,21,12,12,12],
            },
          ],
        });
      }
    }).catch(error => {
      console.log(error);
      //alert(error.message);
    })
  }

  const monthvalue = (value) => {
    setEnquiryTrialConvertedinput({ ...EnquiryTrialConvertedinput, ["month"]: value })
    setSelectedMonth({ ...Selectedmonth, ["smonth"]: value })
  }

  const OnInputChange = (e) => {
    setEnquiryTrialConvertedinput({ ...EnquiryTrialConvertedinput, ["year"]: e.target.value })
  }

  const OnInputChangeS = (e) => {
    setSalesinput({ ...salesinput, ["year"]: e.target.value })
  }

  //------------------------Member Renewal List---------------------------
  const [LoadingRenewal, setLoadingRenewal] = useState(false);

  const [RenewalList, setRenewalList] = useState([]);

  const MemberRenewalList = async () => {
    setRenewalList([]);
    setLoadingRenewal(true);
    await axios.post(process.env.REACT_APP_API + "MemberRenewalList", {
      "from_date": todays_date,
      "to_date": todays_date,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      var Lists = [], StartDate, EndDate, EndDate1, LastLoginDate;
      var time, Time, meridiemTime;
      if (response.data.is_success) {
        setLoadingRenewal(false);
        if (response.data.member_renewal_list !== null) {
          for (let x = 0; x < response.data.member_renewal_list.length; x++) {
            if (response.data.member_renewal_list[x].member_product_start_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_start_date
              StartDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.member_renewal_list[x].member_product_start_date
            }
            if (response.data.member_renewal_list[x].member_product_end_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_end_date
              EndDate = date.substring(0, 10).split('-').reverse().join('-');
              EndDate1 = date.substring(0, 10);
            }
            else {
              EndDate = response.data.member_renewal_list[x].member_product_end_date
              EndDate1 = "";
            }

            if (response.data.member_renewal_list[x].member_last_login_date !== null) {
              var date = response.data.member_renewal_list[x].member_last_login_date;
              LastLoginDate = date.substring(0, 10).split('-').reverse().join('-');
              Time = date.substring(11, 17);
              time = Time.split(':');// here the time is like "16:14"
              meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              LastLoginDate = "";
              meridiemTime = "";
            }

            var startDate = todays_date;
            var endDate = EndDate1

            var diffInMs = new Date(endDate) - new Date(startDate)
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            console.log("Remaining:" + diffInDays);

            // if(diffInDays<=0){
            //   diffInDays="0"
            // }

            Lists.push({
              "member_id": response.data.member_renewal_list[x].member_id,
              "member_customer_id": response.data.member_renewal_list[x].member_customer_id,
              "customer_name": response.data.member_renewal_list[x].customer_name,
              "customer_photo": response.data.member_renewal_list[x].customer_photo,
              "customer_mobile_number": response.data.member_renewal_list[x].customer_mobile_number,
              "customer_email_address": response.data.member_renewal_list[x].customer_email_address,
              "member_product_id": response.data.member_renewal_list[x].member_product_id,
              "product_name": response.data.member_renewal_list[x].product_name,
              "member_product_start_date": StartDate,
              "member_product_end_date": EndDate,
              "no_of_days_left": diffInDays,
              "member_batch_id": response.data.member_renewal_list[x].member_batch_id,
              "batch_name": response.data.member_renewal_list[x].batch_name,
              "member_in_time": response.data.member_renewal_list[x].member_in_time,
              "member_out_time": response.data.member_renewal_list[x].member_out_time,
              "member_last_login_date": LastLoginDate + " " + meridiemTime
            })
          }
        }
        setRenewalList(Lists)
      }
      else {
        setLoadingRenewal(false);
        setRenewalList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingRenewal(false);
      })
  }

  const MemberRenewalListNext = async () => {
    setRenewalList([]);
    setLoadingRenewal(true);
    await axios.post(process.env.REACT_APP_API + "MemberRenewalList", {
      "from_date": todays_date,
      "to_date": NextSeven,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      var Lists = [], StartDate, EndDate, EndDate1, LastLoginDate;
      var time, Time, meridiemTime;
      if (response.data.is_success) {
        setLoadingRenewal(false);
        if (response.data.member_renewal_list !== null) {
          for (let x = 0; x < response.data.member_renewal_list.length; x++) {
            if (response.data.member_renewal_list[x].member_product_start_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_start_date
              StartDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.member_renewal_list[x].member_product_start_date
            }
            if (response.data.member_renewal_list[x].member_product_end_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_end_date
              EndDate = date.substring(0, 10).split('-').reverse().join('-');
              EndDate1 = date.substring(0, 10);
            }
            else {
              EndDate = response.data.member_renewal_list[x].member_product_end_date
              EndDate1 = ""
            }

            if (response.data.member_renewal_list[x].member_last_login_date !== null) {
              var date = response.data.member_renewal_list[x].member_last_login_date;
              LastLoginDate = date.substring(0, 10).split('-').reverse().join('-');
              Time = date.substring(11, 17);
              time = Time.split(':');// here the time is like "16:14"
              meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              LastLoginDate = "";
              meridiemTime = "";
            }

            var startDate = todays_date;
            var endDate = EndDate1

            var diffInMs = new Date(endDate) - new Date(startDate)
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            console.log("Remaining:" + diffInDays);

            Lists.push({
              "member_id": response.data.member_renewal_list[x].member_id,
              "member_customer_id": response.data.member_renewal_list[x].member_customer_id,
              "customer_name": response.data.member_renewal_list[x].customer_name,
              "customer_photo": response.data.member_renewal_list[x].customer_photo,
              "customer_mobile_number": response.data.member_renewal_list[x].customer_mobile_number,
              "customer_email_address": response.data.member_renewal_list[x].customer_email_address,
              "member_product_id": response.data.member_renewal_list[x].member_product_id,
              "product_name": response.data.member_renewal_list[x].product_name,
              "member_product_start_date": StartDate,
              "member_product_end_date": EndDate,
              "no_of_days_left": diffInDays,
              "member_batch_id": response.data.member_renewal_list[x].member_batch_id,
              "batch_name": response.data.member_renewal_list[x].batch_name,
              "member_in_time": response.data.member_renewal_list[x].member_in_time,
              "member_out_time": response.data.member_renewal_list[x].member_out_time,
              "member_last_login_date": LastLoginDate + " " + meridiemTime
            })
          }
        }
        setRenewalList(Lists)
      }
      else {
        setLoadingRenewal(false);
        setRenewalList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingRenewal(false);
      })
  }

  const MemberRenewalListPrevious = async () => {
    setRenewalList([]);
    setLoadingRenewal(true);
    await axios.post(process.env.REACT_APP_API + "MemberRenewalList", {
      "from_date": PreviosSeven,
      "to_date": todays_date,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      var Lists = [], StartDate, EndDate, EndDate1, LastLoginDate;
      var time, Time, meridiemTime;
      if (response.data.is_success) {
        setLoadingRenewal(false);
        if (response.data.member_renewal_list !== null) {
          for (let x = 0; x < response.data.member_renewal_list.length; x++) {
            if (response.data.member_renewal_list[x].member_product_start_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_start_date
              StartDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.member_renewal_list[x].member_product_start_date
            }
            if (response.data.member_renewal_list[x].member_product_end_date !== null) {
              var date = response.data.member_renewal_list[x].member_product_end_date
              EndDate = date.substring(0, 10).split('-').reverse().join('-');
              EndDate1 = date.substring(0, 10);
            }
            else {
              EndDate = response.data.member_renewal_list[x].member_product_end_date
              EndDate1 = ""
            }

            if (response.data.member_renewal_list[x].member_last_login_date !== null) {
              var date = response.data.member_renewal_list[x].member_last_login_date;
              LastLoginDate = date.substring(0, 10).split('-').reverse().join('-');
              Time = date.substring(11, 17);
              time = Time.split(':');// here the time is like "16:14"
              meridiemTime = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              LastLoginDate = "";
              meridiemTime = "";
            }

            var startDate = todays_date;
            var endDate = EndDate1

            var diffInMs = new Date(endDate) - new Date(startDate)
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            console.log("Remaining:" + diffInDays);

            Lists.push({
              "member_id": response.data.member_renewal_list[x].member_id,
              "member_customer_id": response.data.member_renewal_list[x].member_customer_id,
              "customer_name": response.data.member_renewal_list[x].customer_name,
              "customer_photo": response.data.member_renewal_list[x].customer_photo,
              "customer_mobile_number": response.data.member_renewal_list[x].customer_mobile_number,
              "customer_email_address": response.data.member_renewal_list[x].customer_email_address,
              "member_product_id": response.data.member_renewal_list[x].member_product_id,
              "product_name": response.data.member_renewal_list[x].product_name,
              "member_product_start_date": StartDate,
              "member_product_end_date": EndDate,
              "no_of_days_left": diffInDays,
              "member_batch_id": response.data.member_renewal_list[x].member_batch_id,
              "batch_name": response.data.member_renewal_list[x].batch_name,
              "member_in_time": response.data.member_renewal_list[x].member_in_time,
              "member_out_time": response.data.member_renewal_list[x].member_out_time,
              "member_last_login_date": LastLoginDate + " " + meridiemTime
            })
          }
        }
        setRenewalList(Lists)
      }
      else {
        setLoadingRenewal(false);
        setRenewalList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingRenewal(false);
      })
  }

  // ------------------Postpaid Bills--------------------------------------------
  const [LoadingDue, setLoadingDue] = useState(false);
  const [DueBills, setDueBills] = useState([]);

  const PostpaidBills = async () => {
    setDueBills([]);
    setLoadingDue(true);
    await axios.post(process.env.REACT_APP_API + "PostPaidBillList", {
      "from_date": todays_date,
      "to_date": todays_date,
      "bill_member_id": 0,
      "bill_status_text": "DUE",
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      var BillList = [], BillDate, FromDate, ToDate, DueDate;
      if (response.data.is_success) {
        setLoadingDue(false);
        if (response.data.postpaid_bill_list !== null) {
          for (let i = 0; i < response.data.postpaid_bill_list.length; i++) {
            if (response.data.postpaid_bill_list[i].bill_generated_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_generated_date
              BillDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              BillDate = response.data.postpaid_bill_list[i].bill_generated_date
            }

            if (response.data.postpaid_bill_list[i].bill_from_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_from_date
              FromDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              FromDate = response.data.postpaid_bill_list[i].bill_from_date
            }

            if (response.data.postpaid_bill_list[i].bill_to_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_to_date
              ToDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              ToDate = response.data.postpaid_bill_list[i].bill_to_date
            }

            if (response.data.postpaid_bill_list[i].bill_last_due_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_last_due_date
              DueDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              DueDate = response.data.postpaid_bill_list[i].bill_last_due_date
            }

            BillList.push({
              "bill_id": response.data.postpaid_bill_list[i].bill_id,
              "bill_member_id": response.data.postpaid_bill_list[i].bill_member_id,
              "member_customer_id": response.data.postpaid_bill_list[i].member_customer_id,
              "member_name": response.data.postpaid_bill_list[i].member_name,
              "customer_mobile_number": response.data.postpaid_bill_list[i].customer_mobile_number,
              "customer_photo": response.data.postpaid_bill_list[i].customer_photo,
              "bill_postpaid_id": response.data.postpaid_bill_list[i].bill_postpaid_id,
              "bill_generated_date": BillDate,
              "bill_amount": response.data.postpaid_bill_list[i].bill_amount,
              "bill_tax_group_id": response.data.postpaid_bill_list[i].bill_tax_group_id,
              "bill_last_due_date": DueDate,
              "bill_from_date": FromDate,
              "bill_to_date": ToDate,
              "bill_filename": response.data.postpaid_bill_list[i].bill_filename,
              "bill_status_text": response.data.postpaid_bill_list[i].bill_status_text,
              "bill_created_at": response.data.postpaid_bill_list[i].bill_created_at
            })

          }
          setDueBills(BillList);
          //setDueBills(response.data.postpaid_bill_list.length);
        }
        else {

          setDueBills([]);
        }
      }
      else {
        setLoadingDue(false);
        toast.error(response.data.msg);
      }

    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingDue(false);
      })
  }

  const DuePostpaidBills = async () => {
    setDueBills([]);
    setLoadingDue(true);
    await axios.post(process.env.REACT_APP_API + "PostPaidBillList", {
      "from_date": LastOneYear,
      "to_date": todays_date,
      "bill_member_id": 0,
      "bill_status_text": "DUE",
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      var BillList = [], BillDate, FromDate, ToDate, DueDate;
      if (response.data.is_success) {
        setLoadingDue(false);
        if (response.data.postpaid_bill_list !== null) {
          for (let i = 0; i < response.data.postpaid_bill_list.length; i++) {
            if (response.data.postpaid_bill_list[i].bill_generated_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_generated_date
              BillDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              BillDate = response.data.postpaid_bill_list[i].bill_generated_date
            }

            if (response.data.postpaid_bill_list[i].bill_from_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_from_date
              FromDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              FromDate = response.data.postpaid_bill_list[i].bill_from_date
            }

            if (response.data.postpaid_bill_list[i].bill_to_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_to_date
              ToDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              ToDate = response.data.postpaid_bill_list[i].bill_to_date
            }

            if (response.data.postpaid_bill_list[i].bill_last_due_date !== null) {
              var date = response.data.postpaid_bill_list[i].bill_last_due_date
              DueDate = date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              DueDate = response.data.postpaid_bill_list[i].bill_last_due_date
            }

            BillList.push({
              "bill_id": response.data.postpaid_bill_list[i].bill_id,
              "bill_member_id": response.data.postpaid_bill_list[i].bill_member_id,
              "member_customer_id": response.data.postpaid_bill_list[i].member_customer_id,
              "member_name": response.data.postpaid_bill_list[i].member_name,
              "customer_mobile_number": response.data.postpaid_bill_list[i].customer_mobile_number,
              "customer_photo": response.data.postpaid_bill_list[i].customer_photo,
              "bill_postpaid_id": response.data.postpaid_bill_list[i].bill_postpaid_id,
              "bill_generated_date": BillDate,
              "bill_amount": response.data.postpaid_bill_list[i].bill_amount,
              "bill_tax_group_id": response.data.postpaid_bill_list[i].bill_tax_group_id,
              "bill_last_due_date": DueDate,
              "bill_from_date": FromDate,
              "bill_to_date": ToDate,
              "bill_filename": response.data.postpaid_bill_list[i].bill_filename,
              "bill_status_text": response.data.postpaid_bill_list[i].bill_status_text,
              "bill_created_at": response.data.postpaid_bill_list[i].bill_created_at
            })

          }
          setDueBills(BillList);
          //setDueBills(response.data.postpaid_bill_list.length);
        }
        else {
          setDueBills([]);
        }
      }
      else {
        setLoadingDue(false);
        toast.error(response.data.msg);
      }

    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingDue(false);
      })
  }

  //------------------------Sales List For Balance Payment---------------------------
  const [LoadingBalancePayment, setLoadingBalancePayment] = useState(false);
  const [BalancePaymentList, setBalancePaymentList] = useState([]);

  const BalancePaymentLists = async () => {
    setBalancePaymentList([]);
    setLoadingBalancePayment(true);
    await axios.post(process.env.REACT_APP_API + "SalesListForBalancePayment", {
      "from_date": todays_date,
      "to_date": todays_date,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingBalancePayment(false);
        setBalancePaymentList(response.data.sales_balance_list);
      }
      else {
        setLoadingBalancePayment(false);
        setBalancePaymentList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingBalancePayment(false);
      })
  }

  const BalancePaymentListsNext = async () => {
    setBalancePaymentList([]);
    setLoadingBalancePayment(true);
    await axios.post(process.env.REACT_APP_API + "SalesListForBalancePayment", {
      "from_date": todays_date,
      "to_date": NextSeven,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingBalancePayment(false);
        setBalancePaymentList(response.data.sales_balance_list);
      }
      else {
        setLoadingBalancePayment(false);
        setBalancePaymentList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingBalancePayment(false);
      })
  }

  const BalancePaymentListsPrevious = async () => {
    setBalancePaymentList([]);
    setLoadingBalancePayment(true);
    await axios.post(process.env.REACT_APP_API + "SalesListForBalancePayment", {
      "from_date": PreviosSeven,
      "to_date": todays_date,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingBalancePayment(false);
        setBalancePaymentList(response.data.sales_balance_list);
      }
      else {
        setLoadingBalancePayment(false);
        setBalancePaymentList([]);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingBalancePayment(false);
      })
  }

  //---------------------------------Enquiries List-----------------------------------------------------

  const [LoadingEnquiry, setLoadingEnquiry] = useState(false);

  const [EnquiryList, setEnquiryList] = useState([]);

  const EnquiriesList = async () => {
    setLoadingEnquiry(true);
    setEnquiryList([]);
    await axios.post(process.env.REACT_APP_API + "EnquiryList", {
      "from_date": null,
      "to_date": null,
      "follow_up_from_date": todays_date,
      "follow_up_to_date": todays_date,
      "enquiry_branch_id": 0,
      "enquiry_current_status": "",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        if (response.data.enquiries_list !== null) {
          setEnquiryList(response.data.enquiries_list)
          setLoadingEnquiry(false);
        }
        else {
          setEnquiryList([]);
          setLoadingEnquiry(false);
        }
      }
      else {
        setLoadingEnquiry(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingEnquiry(false);
      })
  }

  const EnquiriesListNext = async () => {
    setEnquiryList([]);
    setLoadingEnquiry(true);
    await axios.post(process.env.REACT_APP_API + "EnquiryList", {
      "from_date": null,
      "to_date": null,
      "follow_up_from_date": todays_date,
      "follow_up_to_date": NextSeven,
      "enquiry_branch_id": 0,
      "enquiry_current_status": "",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        if (response.data.enquiries_list !== null) {
          setEnquiryList(response.data.enquiries_list)
          setLoadingEnquiry(false);
        }
        else {
          setEnquiryList([]);
          setLoadingEnquiry(false);
        }
      }
      else {
        setLoadingEnquiry(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
      })
  }

  const EnquiriesListPrevious = async () => {
    setEnquiryList([]);
    setLoadingEnquiry(true);
    await axios.post(process.env.REACT_APP_API + "EnquiryList", {
      "from_date": null,
      "to_date": null,
      "follow_up_from_date": PreviosSeven,
      "follow_up_to_date": todays_date,
      "enquiry_branch_id": 0,
      "enquiry_current_status": "",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        if (response.data.enquiries_list !== null) {
          setEnquiryList(response.data.enquiries_list)
          setLoadingEnquiry(false);
        }
        else {
          setEnquiryList([]);
          setLoadingEnquiry(false);
        }
      }
      else {
        setLoadingEnquiry(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingEnquiry(false);
      })
  }

  //---------------------------------Trials List-----------------------------------------------------
  const [LoadingTrial, setLoadingTrials] = useState(false);
  const [TrialsList, setTrialsList] = useState([]);

  const TrialsLists = async () => {
    setTrialsList([]);
    setLoadingTrials(true);
    await axios.post(process.env.REACT_APP_API + "CustomerTrialsList", {
      "from_date": todays_date,
      "to_date": todays_date,
      "branch_id": 0,
      "trainer_id": 0,
      "created_user_id": 0,
      "customer_id": 0,
      "status_text": "TRIAL_BOOKED",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingTrials(false);
        var TrailList = [], StartDate, EndDate, Start_Time, End_Time, time, Time;
        if (response.data.list !== null) {

          for (let i = 0; i < response.data.list.length; i++) {

            if (response.data.list[i].trial_start_date !== null) {
              var Date = response.data.list[i].trial_start_date;
              StartDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.list[i].trial_start_date;
            }

            if (response.data.list[i].trial_end_date !== null) {
              var Date = response.data.list[i].trial_end_date;
              EndDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              EndDate = response.data.list[i].trial_end_date;
            }

            if (response.data.list[i].trial_start_time !== null) {
              Time = response.data.list[i].trial_start_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              Start_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              Start_Time = response.data.list[i].trial_start_time;
            }

            if (response.data.list[i].trial_end_time !== null) {
              Time = response.data.list[i].trial_end_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              End_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              End_Time = response.data.list[i].trial_end_time;
            }

            TrailList.push({
              "trial_id": response.data.list[i].trial_id,
              "branch_name": response.data.list[i].branch_name,
              "trial_customer_id": response.data.list[i].trial_customer_id,
              "customer_first_name": response.data.list[i].customer_first_name,
              "customer_mobile_number": response.data.list[i].customer_mobile_number,
              "customer_email_address": response.data.list[i].customer_email_address,
              "customer_address": response.data.list[i].customer_address,
              "customer_photo": response.data.list[i].customer_photo,
              "trainer_name": response.data.list[i].trainer_name,
              "product_name": response.data.list[i].product_name,
              "trial_start_date": StartDate,
              "trial_start_time": Start_Time,
              "trial_end_date": EndDate,
              "trial_end_time": End_Time,
              "trial_status_text": response.data.list[i].trial_status_text
            });
          }
          setTrialsList(TrailList);
        }
      }
      else {
        setLoadingTrials(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingTrials(false);
      })
  }

  const TrialsListsNext = async () => {
    setTrialsList([]);
    setLoadingTrials(true);
    await axios.post(process.env.REACT_APP_API + "CustomerTrialsList", {
      "from_date": todays_date,
      "to_date": NextSeven,
      "branch_id": 0,
      "trainer_id": 0,
      "created_user_id": 0,
      "customer_id": 0,
      "status_text": "TRIAL_BOOKED",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingTrials(false);
        var TrailList = [], StartDate, EndDate, Start_Time, End_Time, time, Time;
        if (response.data.list !== null) {

          for (let i = 0; i < response.data.list.length; i++) {

            if (response.data.list[i].trial_start_date !== null) {
              var Date = response.data.list[i].trial_start_date;
              StartDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.list[i].trial_start_date;
            }

            if (response.data.list[i].trial_end_date !== null) {
              var Date = response.data.list[i].trial_end_date;
              EndDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              EndDate = response.data.list[i].trial_end_date;
            }

            if (response.data.list[i].trial_start_time !== null) {
              Time = response.data.list[i].trial_start_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              Start_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              Start_Time = response.data.list[i].trial_start_time;
            }

            if (response.data.list[i].trial_end_time !== null) {
              Time = response.data.list[i].trial_end_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              End_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              End_Time = response.data.list[i].trial_end_time;
            }

            TrailList.push({
              "trial_id": response.data.list[i].trial_id,
              "branch_name": response.data.list[i].branch_name,
              "trial_customer_id": response.data.list[i].trial_customer_id,
              "customer_first_name": response.data.list[i].customer_first_name,
              "customer_mobile_number": response.data.list[i].customer_mobile_number,
              "customer_email_address": response.data.list[i].customer_email_address,
              "customer_address": response.data.list[i].customer_address,
              "customer_photo": response.data.list[i].customer_photo,
              "trainer_name": response.data.list[i].trainer_name,
              "product_name": response.data.list[i].product_name,
              "trial_start_date": StartDate,
              "trial_start_time": Start_Time,
              "trial_end_date": EndDate,
              "trial_end_time": End_Time,
              "trial_status_text": response.data.list[i].trial_status_text
            });
          }
          setTrialsList(TrailList);
        }
      }
      else {
        setLoadingTrials(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingTrials(false);
      })
  }

  const TrialsListsPrevious = async () => {
    setTrialsList([]);
    setLoadingTrials(true);
    await axios.post(process.env.REACT_APP_API + "CustomerTrialsList", {
      "from_date": PreviosSeven,
      "to_date": todays_date,
      "branch_id": 0,
      "trainer_id": 0,
      "created_user_id": 0,
      "customer_id": 0,
      "status_text": "TRIAL_BOOKED",
      "search_text": "",
      "list_limit": 50,
      "current_size": 0,
      "branch_id": branch_id
    }, config).then(response => {
      console.log(response);
      if (response.data.is_success) {
        setLoadingTrials(false);
        var TrailList = [], StartDate, EndDate, Start_Time, End_Time, time, Time;
        if (response.data.list !== null) {

          for (let i = 0; i < response.data.list.length; i++) {

            if (response.data.list[i].trial_start_date !== null) {
              var Date = response.data.list[i].trial_start_date;
              StartDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              StartDate = response.data.list[i].trial_start_date;
            }

            if (response.data.list[i].trial_end_date !== null) {
              var Date = response.data.list[i].trial_end_date;
              EndDate = Date.substring(0, 10).split('-').reverse().join('-');
            }
            else {
              EndDate = response.data.list[i].trial_end_date;
            }

            if (response.data.list[i].trial_start_time !== null) {
              Time = response.data.list[i].trial_start_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              Start_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              Start_Time = response.data.list[i].trial_start_time;
            }

            if (response.data.list[i].trial_end_time !== null) {
              Time = response.data.list[i].trial_end_time.substring(0, 5);

              time = Time.split(':');// here the time is like "16:14"
              End_Time = time[0] >= 12 && (time[0] - 12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            }
            else {
              End_Time = response.data.list[i].trial_end_time;
            }

            TrailList.push({
              "trial_id": response.data.list[i].trial_id,
              "branch_name": response.data.list[i].branch_name,
              "trial_customer_id": response.data.list[i].trial_customer_id,
              "customer_first_name": response.data.list[i].customer_first_name,
              "customer_mobile_number": response.data.list[i].customer_mobile_number,
              "customer_email_address": response.data.list[i].customer_email_address,
              "customer_address": response.data.list[i].customer_address,
              "customer_photo": response.data.list[i].customer_photo,
              "trainer_name": response.data.list[i].trainer_name,
              "product_name": response.data.list[i].product_name,
              "trial_start_date": StartDate,
              "trial_start_time": Start_Time,
              "trial_end_date": EndDate,
              "trial_end_time": End_Time,
              "trial_status_text": response.data.list[i].trial_status_text
            });
          }
          setTrialsList(TrailList);
        }
      }
      else {
        setLoadingTrials(false);
      }
    }).catch(
      error => {
        console.log(error);
        //alert(error.message);
        setLoadingTrials(false);
      })
  }


  //---------------------------------------------------
  useEffect(() => {


    const d = new Date("August 19, 1975 23:15:30");
    //console.log(d.toLocaleDateString());
    const month = d.getDate();
    d.setDate(d.getDate() + 7);
    while (d.getDate() === month) {
      d.setDate(d.getDate() - 1);
    }
    //console.log("+7")
    //console.log(d.toISOString().slice(0, 10))



    const d1 = new Date("August 1, 1975 23:15:30");
    //console.log(d1.toLocaleDateString());
    const month1 = d1.getDate();
    d1.setDate(d1.getDate() - 7);
    while (d1.getDate() === month1) {
      d1.setDate(d.getDate() - 1);
    }
    // console.log("-7")
    // console.log(d1.toISOString().slice(0, 10))
    const currMonth = new Date().getMonth();
    const currYear = new Date().getFullYear();
    setEnquiryTrialConvertedinput({ ...EnquiryTrialConvertedinput, ["month"]: currMonth + 1, ["year"]: currYear });
    setSalesinput({ ...salesinput, ["year"]: currYear })
    setSelectedMonth({ ...Selectedmonth, ["smonth"]: currMonth + 1 })
    // console.log("currMonth");
    // console.log(currMonth + 1);
    // console.log(currYear);
    DashboardAdmin();
    //CronBills();
    PostpaidBills();
    EnquiriesList();
    MemberRenewalList();
    BalancePaymentLists();
    //CronGetAttendanceData();
  }, []);


  useEffect(() => {
    if (EnquiryTrialConvertedinput.month != "" && EnquiryTrialConvertedinput.year != "") {
      DashboardGraphEnquiryTrialConvertedApi();
    }
  }, [EnquiryTrialConvertedinput]);


  useEffect(() => {
    if (salesinput.year != "") {
      DashboardGraphSalesApi();
    }
  }, [salesinput]);




  return (
    <>
      {
        cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_MEMBER_LIST) ?
          <div style={{ paddingRight: "30px", paddingLeft: "30px", paddingTop: "30px" }}>
            <CRow>
              <CCol xs="12" sm="12" md="12" lg="12">
                <CCard style={{ borderRadius: "20px" }}>
                  <CCardBody>
                    <CRow>
                      <CCol xs="12" sm="9" md="9" lg="9">
                        <h4></h4>
                        <h3>Dashboard</h3>
                      </CCol>
                      <CCol xs="12" sm="3" md="3" lg="3">
                        <CFormGroup>
                          {/* <CLabel>Select Branch</CLabel><span className="red">*</span> */}
                          {/* <Select value={BranchDropdowns.filter(function (option) {
                        return option.value === branch_id;
                      })}
                        options={BranchDropdowns}
                        onChange={(e) => onChangedropdown(e, "branch_id")} required="required">
                      </Select> */}
                          <CSelect custom name='branch_id' onChange={(e) => OnInputChangeB(e)}>
                            {/* <option>Select Branch</option> */}
                            {BranchDropdowns.map((branchdropdown, index) => (
                              <option
                                selected={branch_id === branchdropdown.dd_id}
                                key={index + 1}
                                value={branchdropdown.dd_id}
                              >
                                {branchdropdown.dd_name}
                              </option>
                            ))}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <hr className="bgcolor" style={{ height: "1px" }} />
                    <CRow>
                      <CRow className="ml-1 mr-1" >
                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_SALES) ?
                          <CCol xs="12" sm="12" md="6" lg="3">
                            <img src={process.env.PUBLIC_URL + '/avatars/dashboard_1.png'} style={{ width: "100%", marginRight: "5px" }} alt="" />
                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: "7%",
                              left: '43%',
                              fontSize: "12px",
                              fontWeight: "bold",
                              transform: 'translateX(-10%)'
                            }} >SALES</div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '40%',
                              left: '20%',
                              transform: 'translateX(-30%)'
                            }} >
                              <i style={{ color: "#BCDFFC", fontSize: "35px", float: "left" }} className=" fa fa-line-chart" aria-hidden="true"
                              ></i>
                              {/* <img  src={process.env.PUBLIC_URL+'/avatars/sales.jpg'} style={{width: "25px",height:"25px",marginRight: "5px"}} alt=""/> */}
                            </div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '35%',
                              left: '55%',
                              fontSize: "20px",
                              fontWeight: "bold",

                              transform: 'translateX(-30%)'
                            }} >#&nbsp;{DasboardCount.current_month_sales_amount}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#BCDFFC',
                              top: '50%',
                              left: '55%',
                              transform: 'translateX(-30%)'
                            }} >Today - {DasboardCount.today_sales_amount}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#BCDFFC',
                              bottom: '10%',
                              left: '45%',
                              transform: 'translateX(-30%)'
                            }} >
                              <Link to={'/sales-list'} class="btn- btn-sm white" style={{ textDecoration: "none" }}>
                                View Details
                              </Link></div>
                          </CCol>
                          : null}

                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_POSTPAID_BILLS) ?
                          <CCol xs="12" sm="12" md="6" lg="3">
                            <img src={process.env.PUBLIC_URL + '/avatars/dashboard_2.png'} style={{ width: "100%", marginRight: "5px" }} alt="" />
                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: "7%",
                              left: '40%',
                              fontSize: "12px",

                              fontWeight: "bold",

                              transform: 'translateX(-20%)'
                            }} >POSTPAID BILLS</div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '40%',
                              left: '20%',
                              transform: 'translateX(-30%)'
                            }} >
                              <i style={{ color: "#C9E7CA", fontSize: "35px", float: "left" }} className=" fa fa-tasks" aria-hidden="true"
                              ></i>

                            </div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '35%',
                              left: '50%',
                              fontWeight: "bold",
                              fontSize: "20px",
                              transform: 'translateX(-30%)'
                            }} >
                              {/* Bills - */}
                              #&nbsp;{DasboardCount.today_total_bills}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#C9E7CA',
                              top: '50%',
                              left: '55%',
                              transform: 'translateX(-30%)'
                            }} >Amount - {DasboardCount.today_total_bill_amount}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#BCDFFC',
                              bottom: '10%',
                              left: '45%',
                              transform: 'translateX(-30%)'
                            }} >
                              <Link to={'/postpaid-bill-list'} class="btn- btn-sm white" style={{ textDecoration: "none" }}>
                                View Details
                              </Link></div>
                          </CCol>
                          : null}


                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_RENEWALS) ?
                          <CCol xs="12" sm="12" md="6" lg="3">
                            <img src={process.env.PUBLIC_URL + '/avatars/dashboard_3.png'} style={{ width: "100%", marginRight: "5px" }} alt="" />
                            <div style={{
                              position: 'absolute',
                              textAlign: "center",
                              color: 'white',
                              top: "7%",
                              left: '38%',
                              fontSize: "12px",
                              fontWeight: "bold",
                              transform: 'translateX(-0%)'
                            }} >RENEWALS</div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '40%',
                              left: '20%',
                              transform: 'translateX(-30%)'
                            }} >
                              <i style={{ color: "#FCC6C2", fontSize: "35px", float: "left" }} className=" fa  fa-id-card" aria-hidden="true"
                              ></i>
                            </div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '35%',
                              left: '60%',
                              fontSize: "20px",
                              fontWeight: "bold",

                              transform: 'translateX(-30%)'
                            }} >
                              {/* Monthly -  */}
                              #&nbsp;{DasboardCount.current_month_renewals}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#FCC6C2',
                              top: '50%',
                              left: '55%',
                              transform: 'translateX(-30%)'
                            }} > Today- {DasboardCount.today_renewals}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#BCDFFC',
                              bottom: '10%',
                              left: '45%',
                              transform: 'translateX(-30%)'
                            }} >
                              <Link to={'/renewal-list'} class="btn- btn-sm white" style={{ textDecoration: "none" }}>
                                View Details
                              </Link>
                            </div>
                          </CCol>
                          : null}

                        {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_MEMBERS) ?
                          <CCol xs="12" sm="12" md="6" lg="3"
                            className="mt-" >
                            <img src={process.env.PUBLIC_URL + '/avatars/dashboard_4.png'} style={{ width: "100%", marginRight: "5px" }} alt="" />
                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: "7%",
                              left: '43%',
                              fontSize: "12px",
                              fontWeight: "bold",
                              transform: 'translateX(-20%)'
                            }} >MEMBERS</div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '40%',
                              left: '20%',
                              transform: 'translateX(-30%)'
                            }} > <i style={{ color: "#F3D5BB", fontSize: "35px", float: "left" }} className=" fa fa-users" aria-hidden="true"
                            ></i></div>

                            <div style={{
                              position: 'absolute',
                              color: 'white',
                              top: '35%',
                              left: '60%',
                              fontSize: "20px",
                              fontWeight: "bold",

                              transform: 'translateX(-30%)'
                            }} >
                              {/* Total - */}
                              #
                              &nbsp;{DasboardCount.total_members}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#F3D5BB',
                              top: '50%',
                              left: '55%',
                              transform: 'translateX(-30%)'
                            }} >Active - {DasboardCount.active_members}</div>

                            <div style={{
                              position: 'absolute',
                              color: '#BCDFFC',
                              bottom: '10%',
                              left: '45%',
                              transform: 'translateX(-30%)'
                            }} >
                              <Link to={'/memberlist'} class="btn- btn-sm white" style={{ textDecoration: "none" }}>
                                View Details
                              </Link></div>
                          </CCol>
                          : null}
                      </CRow>

                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>


            {/* /*---------------------------Graphs-------------------------------*/}
            <CRow className="mt-3 mb-3 ">
              {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_SALES_GRAPH) ?
                <CCol xs="12" sm="5" md="5" lg="5" >

                  <CCard style={{ borderRadius: "10px" }}>
                    <CCardBody>
                      <CCardHeader className="m-0 p-0 textaligncenter">
                        <h6 style={{ fontWeight: "bold" }}>SALES</h6>
                      </CCardHeader>

                      <CRow>
                        <CCol xs="12" sm="8" md="8" lg="8">
                        </CCol>

                        <CCol xs="12" sm="4" md="4" lg="4" className="mt-2">
                          <CFormGroup>
                            {/* <CLabel>Month</CLabel><span className="red">*</span> */}
                            <CSelect name='year'
                              onChange={(e) => OnInputChangeS(e)}
                              custom>
                              <option selected={salesinput.year === "2019"} value="2019">2019</option>
                              <option selected={salesinput.year === "2020"} value="2020">2020</option>
                              <option selected={salesinput.year === "2021"} value="2021">2021</option>
                              <option selected={salesinput.year === "2022"} value="2022">2022</option>
                              <option selected={salesinput.year === "2023"} value="2023">2023</option>
                              <option selected={salesinput.year === "2024"} value="2024">2024</option>
                              <option selected={salesinput.year === "2025"} value="2025">2025</option>
                              <option selected={salesinput.year === "2026"} value="2026">2026</option>
                              <option selected={salesinput.year === "2027"} value="2027">2027</option>
                              <option selected={salesinput.year === "2028"} value="2028">2028</option>
                              <option selected={salesinput.year === "2029"} value="2029">2029</option>
                              <option selected={salesinput.year === "2030"} value="2030">2030</option>

                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <Chart
                        options={sales.options}
                        series={sales.series}
                        type="bar"
                        height={180}
                      />

                    </CCardBody>
                  </CCard>

                </CCol>
                : null}


              {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_LEAD_GRAPH) ?
                <CCol xs="12" sm="4" md="4" lg="4">

                  <CCard style={{ borderRadius: "10px" }}>
                    <CCardBody>
                      <CCardHeader className="m-0 p-0 textaligncenter">
                        <h6 style={{ fontWeight: "bold" }}>LEADS</h6>
                      </CCardHeader>
                      <CRow className="mr-0 pl-3 mt-2" >
                        &#160;
                        &#160;
                        {Selectedmonth.smonth == 1 ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(1)}
                            >
                              Jan
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(1)}

                            >
                              Jan
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 2 ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(2)}
                            >
                              Feb
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(2)}

                            >
                              Feb
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 3 ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(3)}
                            >
                              Mar
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(3)}

                            >
                              Mar
                            </CLabel>
                          </div>
                        }
                        &#160;

                        {Selectedmonth.smonth == 4
                          ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(4)}
                            >
                              Apr
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(4)}

                            >
                              Apr
                            </CLabel>
                          </div>
                        }

                        &#160;
                        {Selectedmonth.smonth == 5

                          ? <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(5)}
                            >
                              May
                            </CLabel>
                          </div> : <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(5)}

                            >
                              May
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 6

                          ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(6)}
                            >
                              Jun
                            </CLabel>
                          </div>
                          :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(6)}

                            >
                              Jun
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 7
                          ?

                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(7)}
                            >
                              Jul
                            </CLabel>
                          </div>
                          :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(7)}

                            >
                              Jul
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 8
                          ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(8)}
                            >
                              Aug
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(8)}

                            >
                              Aug
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 9

                          ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(9)}
                            >
                              Sep
                            </CLabel>
                          </div>
                          :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(9)}

                            >
                              Sep
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 10
                          ?
                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(10)}
                            >
                              Oct
                            </CLabel>
                          </div>
                          :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(10)}
                            >
                              Oct
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 11
                          ?

                          <div className='mr-1'>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(11)}
                            >
                              Nov
                            </CLabel>
                          </div> :
                          <div className='mr-1'>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(11)}
                            >
                              Nov
                            </CLabel>
                          </div>
                        }
                        &#160;
                        {Selectedmonth.smonth == 12
                          ?

                          <div>
                            <CLabel style={{ color: "red", fontWeight: "bold", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(12)}
                            >
                              Dec
                            </CLabel>
                          </div>
                          :
                          <div>
                            <CLabel style={{ color: "grey", float: 'right', fontSize: "9px" }}
                              onClick={() => monthvalue(12)}
                            >
                              Dec
                            </CLabel>
                          </div>
                        }

                        <CCol xs="12" sm="6" md="6" lg="6">
                        </CCol>
                        <CCol xs="12" sm="6" md="6" lg="6">
                          <CFormGroup>
                            {/* <CLabel>Month</CLabel><span className="red">*</span> */}
                            <CSelect name='year'
                              onChange={(e) => OnInputChange(e)}
                              custom>
                              <option selected={EnquiryTrialConverted.year === "2019"} value="2019">2019</option>
                              <option selected={EnquiryTrialConverted.year === "2020"} value="2020">2020</option>
                              <option selected={EnquiryTrialConverted.year === "2021"} value="2021">2021</option>
                              <option selected={EnquiryTrialConverted.year === "2022"} value="2022">2022</option>
                              <option selected={EnquiryTrialConverted.year === "2023"} value="2023">2023</option>
                              <option selected={EnquiryTrialConverted.year === "2024"} value="2024">2024</option>
                              <option selected={EnquiryTrialConverted.year === "2025"} value="2025">2025</option>
                              <option selected={EnquiryTrialConverted.year === "2026"} value="2026">2026</option>
                              <option selected={EnquiryTrialConverted.year === "2027"} value="2027">2027</option>
                              <option selected={EnquiryTrialConverted.year === "2028"} value="2028">2028</option>
                              <option selected={EnquiryTrialConverted.year === "2029"} value="2029">2029</option>
                              <option selected={EnquiryTrialConverted.year === "2030"} value="2030">2030</option>

                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <Chart
                        // options={state.options}
                        // series={state.series}
                        options={EnquiryTrialConverted.options}
                        series={EnquiryTrialConverted.series}
                        type="pie"
                        height={200}
                      />
                    </CCardBody>
                  </CCard>

                </CCol>
                : null}

              {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_OTHRES) ?
                <CCol xs="12" sm="3" md="3" lg="3">
                  <CCard style={{ borderRadius: "10px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="12" md="12" lg="12">


                          {/* <CRow >
                  <CCol xs="12" sm="6" md="6" lg="6">
                    <CLabel><i class="fa fa-history" aria-hidden="true" ></i></CLabel> &#160; <CLabel>Bills Due</CLabel>
                  </CCol>

                  <CCol xs="12" sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                    <CLabel><i class="fa fa-inr" aria-hidden="true" ></i></CLabel> <CLabel>{DasboardCount.total_bills_due}</CLabel>
                  </CCol>
                </CRow>
                <hr style={{ padding: "0px", margin: "0px" }} />

                <CRow >
                  <CCol xs="12" sm="6" md="6" lg="6">
                    <CLabel><i class="fa fa-newspaper-o" aria-hidden="true" ></i></CLabel> &#160; <CLabel>Bills Due Amount</CLabel>
                  </CCol>

                  <CCol xs="12" sm="6" md="6" lg="6" style={{ textAlign: "left" }}>
                    <CLabel><i class="fa fa-inr" aria-hidden="true" ></i></CLabel> <CLabel>{DasboardCount.total_bills_due_amount}</CLabel>
                  </CCol>
                </CRow> */}
                          <div className="table-responsive  mb-2">
                            <table className="table">
                              <tbody>
                                <tr >
                                  <td>
                                    <i class="fa fa-history" aria-hidden="true" ></i>
                                  </td>
                                  <td>Bills Due </td>

                                  <td>
                                    {/* <i class="fa fa-inr" aria-hidden="true" ></i> */}
                                    {DasboardCount.total_bills_due}</td>
                                </tr>
                                <tr >
                                  <td>
                                    <i class="fa fa-newspaper-o" aria-hidden="true" ></i>
                                  </td>

                                  <td >Bills Due Amount</td>

                                  <td style={{ width: "70%" }}>
                                    <CLabel >
                                      <i class="fa fa-inr" aria-hidden="true" ></i>
                                      {DasboardCount.total_bills_due_amount}
                                    </CLabel>
                                  </td>
                                </tr>

                                <tr >

                                  <td>
                                    <i class="fa fa-address-card" aria-hidden="true" ></i>
                                  </td>
                                  <td>Non Renewals</td>

                                  <td>{DasboardCount.total_non_renewals}</td>
                                </tr>

                                <tr >
                                  <td>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true" ></i>
                                  </td>
                                  <td>Enquiry</td>
                                  <td>{DasboardCount.total_todays_enquiry}</td>
                                </tr>                 <tr >
                                  <td>
                                    <i class="fa fa-check-square-o" aria-hidden="true" ></i>
                                  </td>
                                  <td>Balance to be Cleared </td>
                                  <td style={{ width: "70%" }}>
                                    <CLabel>
                                      <i class="fa fa-inr" aria-hidden="true" ></i>
                                      {DasboardCount.total_balance_to_be_cleared_today}
                                    </CLabel>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
                : null}
            </CRow>


            {/* -----------------------Member Renewal List -----------------------*/}
            {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_RENEWALS_LIST) ?
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                  <CCard style={{ borderRadius: "20px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                          <h4 className=" mt-2">Renewals</h4>
                        </CCol>
                        <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => MemberRenewalListPrevious()} className=" width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Last 7 Days </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => MemberRenewalList()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Today's </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => MemberRenewalListNext()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Next 7 Days </CButton>
                        </CCol>
                      </CRow>
                      <hr className="bgcolor" style={{ height: "2px" }} />
                      {LoadingRenewal ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :
                        <div>
                          {RenewalList.map((Lists, index) => (
                            <CRow key={index}>
                              <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px", backgroundColor: "#FFF9DF" }}>
                                  <CCardBody>
                                    <CRow>
                                      {Lists.customer_photo !== "" ?
                                        <CCol xs="12" sm="1" md="1" lg="1" className='ml-1'>
                                          <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + Lists.customer_photo}
                                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                          />
                                        </CCol>
                                        :
                                        <CCol xs="12" sm="1" md="1" lg="1" className='ml-1'>

                                          <img className="playerProfilePic_home_tile"
                                            src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                          />
                                        </CCol>
                                      }

                                      <CCol xs="12" sm="3" md="3" lg="3" className='ml-5 mt-1'>
                                        {/* <CCol xs="12" sm="3" md="3" lg="3" className='ml-3'> */}
                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{Lists.customer_name}</h5>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_mobile_number}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_email_address}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="3">
                                        <h6 style={{ color: "red", fontWeight: "bold" }}>End Date: {Lists.member_product_end_date}</h6>
                                        <h6 style={{ color: "black", fontWeight: "" }}>Current Package: {Lists.product_name}</h6>
                                        <h6 style={{ color: "black", fontWeight: "" }}>Start Date: {Lists.member_product_start_date}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="2" md="2" lg="2">
                                        <h6 style={{ color: "red", fontWeight: "bold" }}>Batch: {Lists.batch_name}</h6>
                                        <h6 style={{ color: "black", fontWeight: "" }}><i class="fa fa-arrow-circle-down blue" aria-hidden="true"></i> In Time: {Lists.member_in_time}</h6>
                                        <h6 style={{ color: "black", fontWeight: "" }}><i class="fa fa-arrow-circle-up blue" aria-hidden="true"></i> Out Time: {Lists.member_out_time}</h6>
                                      </CCol>
                                      <CCol xs="12" sm="3" md="3" lg="2" style={{ textAlignLast: "" }}>
                                        {/* <CButton className='white' style={{ backgroundColor: "#1c71d6", width: "100%", textAlign: "center" }}>
                                Renew Now
                              </CButton> */}
                                        <MembershipRenewalModal
                                          memid={Lists.member_id}
                                        />
                                        {Lists.no_of_days_left <= 0 ?
                                          <h6 className='mt-1' style={{ color: "Red", fontWeight: "bold", textAlign: "center" }}>Left:
                                            0 Day </h6>
                                          : Lists.no_of_days_left === 1 ?
                                            <h6 className='mt-1' style={{ color: "Red", fontWeight: "bold", textAlign: "center" }}>Left:
                                              1 Day </h6>
                                            : <h6 className='mt-1' style={{ color: "Red", fontWeight: "bold", textAlign: "center" }}>Left:
                                              {Lists.no_of_days_left} Days </h6>
                                        }

                                        <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Last Login: {Lists.member_last_login_date}</h6>

                                      </CCol>
                                    </CRow>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            </CRow>
                          ))}
                        </div>
                      }
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : null}

            {/* -----------------------PostPaidDueList -----------------------*/}
            {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_DUEBILLS_LIST) ?
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                  <CCard style={{ borderRadius: "20px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                          <h4 className=" mt-2">Due Bills</h4>
                        </CCol>
                        <CCol xs="12" sm="5" md="5" lg="5"></CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => DuePostpaidBills()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Old Bills </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => PostpaidBills()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Today's Bill</CButton>
                        </CCol>
                      </CRow>
                      <hr className="bgcolor" style={{ height: "2px" }} />
                      {LoadingDue ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :
                        <div>
                          <CRow>
                            {DueBills.map((BillList, index) => (
                              <CCol xs="12" sm="6" md="6" lg="6">
                                <CCard style={{ borderRadius: "20px", backgroundColor: "#FEEAE9" }}>
                                  <CCardBody>
                                    <CRow>

                                      {BillList.customer_photo !== "" && BillList.customer_photo !== null ?
                                        <CCol xs="12" sm="3" md="3" lg="3" >
                                          <img className="playerProfilePic_home_tile "
                                            //src={process.env.PUBLIC_URL + '/avatars/img.jpg'}
                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + BillList.customer_photo}
                                            style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                          />
                                        </CCol>
                                        :
                                        <CCol xs="12" sm="3" md="3" lg="3">
                                          <img className="playerProfilePic_home_tile "
                                            src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                            //src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + BillList.customer_photo}
                                            style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                          />
                                        </CCol>}

                                      <CCol xs="12" sm="9" md="9" lg="9">
                                        <span style={{ float: "right", paddingTop: "", padding: "", margin: "0px", height: "15px" }}>
                                          {/* <CButton className='bgred white' style={{ width: "90px", fontSize: "15px" }} >Close</CButton> */}
                                          <PostpaidBillUpdateStatusModalModal
                                            billid={BillList.bill_id}
                                            billamount={BillList.bill_amount}
                                          />
                                        </span>
                                        <h6 style={{ color: "Black", fontWeight: "bold" }} className='mt-2'>Bill Date: {BillList.bill_generated_date}</h6>
                                        <h6 style={{ color: "Black", fontWeight: "bold" }}>Last Due Date: {BillList.bill_last_due_date}</h6>
                                        <h6 style={{ color: "Black", fontWeight: "bold" }}>Bill from: {BillList.bill_from_date} to {BillList.bill_to_date}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="4" md="4" lg="5" className='mt-3'>
                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{BillList.member_name}</h5>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                          style={{ width: "10px", height: "12px", borderRadius: "50%", marginBottom: "4px" }}
                                        /> {BillList.customer_mobile_number}</h6>
                                      </CCol>
                                      <CCol xs="12" sm="4" md="4" lg="3" className='mt-1'></CCol>
                                      <CCol xs="12" sm="4" md="4" lg="4" className='mt-1'>
                                        <h2 style={{ color: "Red", fontSize: "30px", textAlign: "center", margin: "0px", padding: "0px", fontFamily: "sans-serif" }}>₹{BillList.bill_amount}</h2>
                                        <h6 style={{ color: "#ff6633", fontWeight: "bold", fontSize: "12px", textAlign: "center", padding: "0px", margin: "0px", marginBottom: "4px" }}> Due amount</h6>

                                      </CCol>
                                    </CRow>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            ))}
                          </CRow>
                        </div>
                      }
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : null}

            {/* --------------------------SalesListForBalancePayment ---------------------------*/}
            {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_BALANCE_PAYMNET_LIST) ?
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                  <CCard style={{ borderRadius: "20px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                          <h4 className=" mt-2">Balance Payment</h4>
                        </CCol>
                        <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => BalancePaymentListsPrevious()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Last 7 Days </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => BalancePaymentLists()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black" }}>Today's </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton onClick={() => BalancePaymentListsNext()} className="width100 mt-1 btn btn-outline-info btn-sm" style={{ fontSize: "15px", color: "black", fontWeight: "normal" }}>Next 7 Days </CButton>
                        </CCol>
                      </CRow>
                      <hr className="bgcolor" style={{ height: "2px" }} />
                      {LoadingBalancePayment ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :
                        <div>
                          {BalancePaymentList.map((Lists, index) => (
                            <CRow key={index}>
                              <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px", backgroundColor: "#d0f0c0" }}>
                                  <CCardBody>
                                    <CRow>
                                      {Lists.customer_photo !== "" ?
                                        <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                          <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + Lists.customer_photo}
                                            style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                          />
                                        </CCol>
                                        : Lists.customer_photo === null ?
                                          <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                          : <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                      }

                                      <CCol xs="12" sm="3" md="3" lg="3" className='ml-4'>
                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{Lists.customer_first_name}</h5>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_mobile_number}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_email_address}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="4">
                                        <h6 style={{ color: "green", fontWeight: "bold" }}>Unique Code: {Lists.member_unique_id}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>Tans Id: {Lists.sale_trans_id}</h6>
                                        <h6 style={{ color: "Red", fontWeight: "", fontFamily: "sans-serif" }}>Balance Amount: &#8377;{Lists.sale_balance_amount}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="3" style={{ textAlignLast: "" }}>
                                        <span style={{ textAlign: "center" }}>
                                          <BalancePaymentUpdateModal
                                            saleid={Lists.sale_id}
                                            balance_amount={Lists.sale_balance_amount}
                                          />
                                        </span>
                                        {/* <h6 style={{ color: "black", fontWeight: "bold" }}>Paid Amount: {Lists.sale_paid_amount}</h6> */}
                                        {Lists.sale_balance_payable_date !== "" || Lists.sale_balance_payable_date !== null ?
                                          <h6 className='mt-2' style={{ color: "black", textAlign: "center" }}>Payable Date: {Lists.sale_balance_payable_date.substring(0, 10).split('-').reverse().join('-')}</h6>
                                          :
                                          <h6 className='mt-2' style={{ color: "black", textAlign: "center" }}>Payable Date: {Lists.sale_balance_payable_date}</h6>
                                        }
                                      </CCol>
                                    </CRow>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            </CRow>
                          ))}
                        </div>
                      }
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : null}

            {/* -----------------------EnquiriesList -----------------------*/}
            {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_ENQUIRIES_LIST) ?
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                  <CCard style={{ borderRadius: "20px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                          <h4 className=" mt-2">Enquiries</h4>
                        </CCol>
                        <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1 btn btn-outline-info btn-sm" onClick={() => EnquiriesListPrevious()} style={{ fontSize: "15px", color: "black" }}>Last 7 Days </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1 btn btn-outline-info btn-sm" onClick={() => EnquiriesList()} style={{ fontSize: "15px", color: "black" }}>Today's </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1  btn btn-outline-info btn-sm" onClick={() => EnquiriesListNext()} style={{ fontSize: "15px", color: "black" }}>Next 7 Days </CButton>
                        </CCol>
                      </CRow>
                      <hr className="bgcolor" style={{ height: "2px" }} />
                      {LoadingEnquiry ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :
                        <div>
                          {EnquiryList.map((Lists, index) => (
                            <CRow key={index}>
                              <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px", backgroundColor: "#f5f6f7" }}>
                                  <CCardBody>
                                    <CRow>
                                      {Lists.customer_photo !== "" ?
                                        <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                          <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + Lists.customer_photo}
                                            style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                          />
                                        </CCol>
                                        : Lists.customer_photo === null ?
                                          <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                          : <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                      }

                                      <CCol xs="12" sm="3" md="3" lg="3" className='ml-4'>
                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{Lists.customer_name}</h5>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_mobile_number}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_email_address}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="4">
                                        <h6 style={{ color: "red", fontWeight: "bold" }}>Type: {Lists.enquiry_type_name}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>Address: {Lists.customer_address}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>Source: {Lists.source_name}</h6>
                                        <h6 style={{ color: "black" }}>Comments:  {Lists.enquiry_comments}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="3" style={{ textAlignLast: "" }}>
                                        {/* <CButton className='white' style={{ backgroundColor: "#1c71d6", width: "100%", textAlign: "center" }}>
                                Follow Up
                              </CButton> */}
                                        <span style={{ textAlign: "" }} >
                                          <EnquiryFollowUpModal
                                            enquiry_id={Lists.enquiry_id}
                                          />
                                        </span>
                                        {Lists.enquiry_next_follow_up_date !== null ?
                                          <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Next Follow Up: {Lists.enquiry_next_follow_up_date.substring(0, 10).split('-').reverse().join('-')}</h6>
                                          :
                                          <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Next Follow Up: {Lists.enquiry_next_follow_up_date}</h6>
                                        }

                                        <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Status: {Lists.enquiry_current_status}</h6>
                                      </CCol>
                                    </CRow>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            </CRow>
                          ))}
                        </div>
                      }
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : null}

            {/* -----------------------TrialsList -----------------------*/}
            {cookies.allowed_features.includes(AppConstants.ALLOWED_FEATURE_DASHBOARD_TRIALS_LIST) ?
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12">
                  <CCard style={{ borderRadius: "20px" }}>
                    <CCardBody>
                      <CRow>
                        <CCol xs="12" sm="3" md="3" lg="3">
                          <h4 className=" mt-2">Trials</h4>
                        </CCol>
                        <CCol xs="12" sm="3" md="3" lg="3"></CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1 btn btn-outline-info btn-sm" onClick={() => TrialsListsPrevious()} style={{ fontSize: "15px", color: "black" }}>Last 7 Days </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1 btn btn-outline-info btn-sm" onClick={() => TrialsLists()} style={{ fontSize: "15px", color: "black" }}>Today's </CButton>
                        </CCol>
                        <CCol xs="12" sm="2" md="2" lg="2">
                          <CButton className="width100 mt-1  btn btn-outline-info btn-sm" onClick={() => TrialsListsNext()} style={{ fontSize: "15px", color: "black" }}>Next 7 Days </CButton>
                        </CCol>
                      </CRow>
                      <hr className="bgcolor" style={{ height: "2px" }} />
                      {LoadingTrial ? <img src={process.env.PUBLIC_URL + '/avatars/loader.gif'} className="loadingimage"></img> :
                        <div>
                          {TrialsList.map((Lists, index) => (
                            <CRow key={index}>
                              <CCol xs="12" sm="12" md="12" lg="12">
                                <CCard style={{ borderRadius: "20px", backgroundColor: "#dae8f5" }}>
                                  <CCardBody>
                                    <CRow>
                                      {Lists.customer_photo !== "" ?
                                        <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                          <img className="playerProfilePic_home_tile "
                                            src={process.env.REACT_APP_PHOTOPATH + cookies.unique_code + "/Customer/" + Lists.customer_photo}
                                            style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                          />
                                        </CCol>
                                        : Lists.customer_photo === null ?
                                          <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                          : <CCol xs="12" sm="2" md="2" lg="1" className='ml-1'>
                                            <img className="playerProfilePic_home_tile "
                                              src={process.env.PUBLIC_URL + '/avatars/default_image.jpg'}
                                              style={{ width: "80px", height: "80px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                            />
                                          </CCol>
                                      }

                                      <CCol xs="12" sm="3" md="3" lg="3" className='ml-4'>
                                        <h5 style={{ color: "black", fontWeight: "bold" }}>{Lists.customer_first_name}</h5>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/telephone.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_mobile_number}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}><img className="playerProfilePic_home_tile "
                                          src={process.env.PUBLIC_URL + '/avatars/mail.png'}
                                          style={{ width: "20px", height: "20px", borderRadius: "50%", borderWidth: "100px", borderColor: "green" }}
                                        /> {Lists.customer_email_address}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="4">
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>Start Date: {Lists.trial_start_date}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>Start Time: {Lists.trial_start_time}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>End Date: {Lists.trial_end_date}</h6>
                                        <h6 style={{ color: "black", fontWeight: "bold" }}>End Time:  {Lists.trial_end_time}</h6>
                                      </CCol>

                                      <CCol xs="12" sm="3" md="3" lg="3" style={{ textAlignLast: "" }}>
                                        {/* <CButton className='white' style={{ backgroundColor: "#1c71d6", width: "100%", textAlign: "center" }}>
                                Follow Up
                              </CButton> */}
                                        <span style={{ textAlign: "" }} >
                                          <TrailsUpdateStatusModal
                                            trial_id={Lists.trial_id}
                                          />
                                        </span>

                                        <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Status Text: {Lists.trial_status_text} </h6>
                                        <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Trainer: {Lists.trainer_name} </h6>
                                        <h6 className='mt-1' style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Package: {Lists.product_name} </h6>
                                      </CCol>
                                    </CRow>
                                  </CCardBody>
                                </CCard>
                              </CCol>
                            </CRow>
                          ))}
                        </div>
                      }
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : null}
          </div>
          :
          <Notification />
      }
    </>
  )
}


export default AdminDashboard;
