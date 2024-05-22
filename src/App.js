import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import './scss/style.scss';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//IF WE USE HASHROUTER THEN WILL GET # IN THE URL EX.3000/#/DASHBORAD
import { useCookies } from 'react-cookie';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//LAZY LOAD IMPROVES THE REACT BASED APPLICATION PERFORMANCE
//LAZY LOAD SPLITS THE BUNDLE.JS FILE BASED ON THE ROUTES HERE IT WILL CREATE A SEPARATE FILE FOR BOTH LOGIN AND REGISTER.
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
//pages
const AdminLogin = React.lazy(() => import('./views/AdminViews/Logins/Adminlogin'));

//Admin layout and views
const AppConstants = React.lazy(() => import('./views/AdminViews/AppConstants'));

const TheLayoutAdmin = React.lazy(() => import('./containerAdmin/TheLayoutAdmin'));
const AdminDashboard = React.lazy(() => import('./views/AdminViews/AdminDashboard'));

const MailConfigurationList = React.lazy(() => import('./views/AdminViews/MailConfigurationSettings/MailConfigurationSettingsList'));
const MailConfigurationAdd = React.lazy(() => import('./views/AdminViews/MailConfigurationSettings/MailConfigurationSettingsAdd'));
const MailConfigurationDetails = React.lazy(() => import('./views/AdminViews/MailConfigurationSettings/MailConfigurationSettingsDetails'));

const WhatsAppConfigurationAdd = React.lazy(() => import('./views/AdminViews/WhatsAppConfiguration/WhatsAppConfigurationAdd'));

const AddNewUser = React.lazy(() => import('./views/AdminViews/User/UserAdd'));
const UserList = React.lazy(() => import('./views/AdminViews/User/UserLIst'));
const UserDetails = React.lazy(() => import('./views/AdminViews/User/UserDetails'));

const EnquiryAdd = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryAdd'));
const EnquiryList = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryList'));
const EnquiryDetails = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryDetails'));
const EnquiryUpdate = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryUpdate'));

const TrailsAdd = React.lazy(() => import('./views/AdminViews/Trails/TrailsAdd'));
const TrailsList = React.lazy(() => import('./views/AdminViews/Trails/TrailsList'));
const TrailsDetails = React.lazy(() => import('./views/AdminViews/Trails/TrailsDetails'));

const AddNewCustomer = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd'));
const CustomerList = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd/CustomerList'));
const CustomerDetails = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd/CustDetails'));

const AddNewMember = React.lazy(() => import('./views/AdminViews/Member/MemberAdd'));
const MemberList = React.lazy(() => import('./views/AdminViews/Member/MemberList'));
const MemberDetails = React.lazy(() => import('./views/AdminViews/Member/MemberDetails'));
const MemberImportExcel = React.lazy(() => import('./views/AdminViews/Member/MemberImport'));

const PrimaryGoal = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/PrimaryGoal'));

const SecondaryGoal = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/SecondaryGoal'));

const HealthSetup = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/HealthInfo'));

const BodyMeasurementSetup = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/BodyMeasurementSetup'));

const ImportCustomer = React.lazy(() => import('./views/AdminViews/Customer/ImportCustomer/ImportCust'));

const AddOn = React.lazy(() => import('./views/AdminViews/AddOn/AddOn'));

const AddReceiptEntry = React.lazy(() => import('./views/AdminViews/Billings/ReceipytEntry/ReceipytEntryAdd'));

const AddTax = React.lazy(() => import('./views/AdminViews/Billings/Tax/TaxAdd'));

const AddTaxGroup = React.lazy(() => import('./views/AdminViews/Billings/TaxGroup/TaxGroupAdd'));

const AddDiscount = React.lazy(() => import('./views/AdminViews/Billings/Discount/DiscountAdd'));

const AddCoupon = React.lazy(() => import('./views/AdminViews/Billings/Coupon/CouponAdd'));

const AddAttendence = React.lazy(() => import('./views/AdminViews/Admin/Attendence/AttendenceAdd'));

const AddNewBranch = React.lazy(() => import('./views/AdminViews/Admin/Branch/AddNewBranch'));
const BranchUpdate = React.lazy(() => import('./views/AdminViews/Admin/Branch/BranchUpdate'));
const BranchList = React.lazy(() => import('./views/AdminViews/Admin/Branch/BranchList'));
const BranchDetails = React.lazy(() => import('./views/AdminViews/Admin/Branch/BranchDetails'));
const GenerateQRCode = React.lazy(() => import('./views/AdminViews/Admin/Branch/GenerateQRCode'));


const AddStaff = React.lazy(() => import('./views/AdminViews/Admin/Staffs/AddStaffs'));
const StaffList = React.lazy(() => import('./views/AdminViews/Admin/Staffs/StaffsList'));

const AddTrainer = React.lazy(() => import('./views/AdminViews/Admin/Trainers/TrainersAdd'));
const TrainerList = React.lazy(() => import('./views/AdminViews/Admin/Trainers/TrainersList'));

const AddCategory = React.lazy(() => import('./views/AdminViews/Products/Products/AddNewCategory'));

const AddNewProduct = React.lazy(() => import('./views/AdminViews/Products/Products/AddNewProduct'));
const ProductList = React.lazy(() => import('./views/AdminViews/Products/Products/ProductsList'));
const ProductDetails = React.lazy(() => import('./views/AdminViews/Products/Products/ProductsDetails'));

const AddNewPackage = React.lazy(() => import('./views/AdminViews/Package/CreatePackege'));
const PackageList = React.lazy(() => import('./views/AdminViews/Package/PackageList'));
const PackageDetails = React.lazy(() => import('./views/AdminViews/Package/PackageDetails'));


const SalesList = React.lazy(() => import('./views/AdminViews/Sales/SalesList'));
const SalesDetails = React.lazy(() => import('./views/AdminViews/Sales/SalesDetails'));

const BalancePaymentList = React.lazy(() => import('./views/AdminViews/Reports/BalancePaymentList'));
const PostpaidBillReport = React.lazy(() => import('./views/AdminViews/Reports/PostpaidBillReport'));
const RenewalList = React.lazy(() => import('./views/AdminViews/Reports/RenewalList'));


const EnquirySource = React.lazy(() => import('./views/AdminViews/Settings/EnquirySource/EnquirySourceAdd'));
const EnquiryType = React.lazy(() => import('./views/AdminViews/Settings/EnquiryType/EnquiryTypeAdd'));
const Batches = React.lazy(() => import('./views/AdminViews/Settings/Batches/BatchAdd'));

const TaxSetup = React.lazy(() => import('./views/AdminViews/Settings/TaxSetup'));
const TaxGroupSetup = React.lazy(() => import('./views/AdminViews/Settings/TaxGroupSetup'));
const TaxGroupSetupDetails = React.lazy(() => import('./views/AdminViews/Settings/TaxGroupSetup/TaxGoupSetupDetails'));

const PaymentTypes = React.lazy(() => import('./views/AdminViews/Settings/PaymentTypes/PaymentTypes'));

const TermsAndConditions = React.lazy(() => import('./views/AdminViews/Settings/TermsAndConditions'));


const GeneralSetting = React.lazy(() => import('./views/AdminViews/Settings/GenaralSetting'));
const StaffDetails = React.lazy(() => import('./views/AdminViews/Admin/Staffs/StaffsDetails'));
const TrainerDetails = React.lazy(() => import('./views/AdminViews/Admin/Trainers/TrainersDetails'));

const MemberAttendance = React.lazy(() => import('./views/AdminViews/MarkAttendance/MemberAttendance'));
const MemberAttendanceList = React.lazy(() => import('./views/AdminViews/MarkAttendance/MemberAttendance/MemberAttendanceList'));


const UserAttendance = React.lazy(() => import('./views/AdminViews/MarkAttendance/UserAttendance'));
const UserAttendanceList = React.lazy(() => import('./views/AdminViews/MarkAttendance/UserAttendance/UserAttendanceList'));

const BulkWhatsApp = React.lazy(() => import('./views/AdminViews/Marketing/BulkWhastApp'));
const BulkEmails = React.lazy(() => import('./views/AdminViews/Marketing/BulkEmails'));

const BranchInventoryAdd = React.lazy(() => import('./views/AdminViews/Admin/BranchInventory/BranchInventoryAdd'));
const BranchInventoryList = React.lazy(() => import('./views/AdminViews/Admin/BranchInventory/BranchInventoryList'));
const BranchInventoryDetails = React.lazy(() => import('./views/AdminViews/Admin/BranchInventory/BranchInventoryDetails'));

const SupplierAdd = React.lazy(() => import('./views/AdminViews/Admin/Suppliers/SupplierAdd'));
const SupplierList = React.lazy(() => import('./views/AdminViews/Admin/Suppliers/SupplierList'));

const RoleFeatureNameAdd = React.lazy(() => import('./views/AdminViews/Roles/RoleFeatureName/RoleFeatureNameAdd'));

const RoleAdd = React.lazy(() => import('./views/AdminViews/Roles/Role/RoleAdd'));
const RoleList = React.lazy(() => import('./views/AdminViews/Roles/Role/RoleList'));
const RoleDetails = React.lazy(() => import('./views/AdminViews/Roles/Role/RoleDetails'));

const ExpensesAdd = React.lazy(() => import('./views/AdminViews/Expenses/ExpensesAdd'));
const ExpensesList = React.lazy(() => import('./views/AdminViews/Expenses/ExpensesList'));
const ExpensesDetails = React.lazy(() => import('./views/AdminViews/Expenses/ExpensesDetails'));

const WorkoutSetupAdd = React.lazy(() => import('./views/AdminViews/Settings/WorkoutSetup/WorkoutSetupAdd'));
const WorkoutSetupList = React.lazy(() => import('./views/AdminViews/Settings/WorkoutSetup/WorkoutSetupList'));
const WorkoutSetupDetails = React.lazy(() => import('./views/AdminViews/Settings/WorkoutSetup/WorkoutSetupDetails'));

const PrimaryGoalWorkoutMapping = React.lazy(() => import('./views/AdminViews/Settings/GoalWorkoutMappingSetup/PrimaryGoalWorkoutMapping'));

const SecondaryGoalWorkoutMapping = React.lazy(() => import('./views/AdminViews/Settings/GoalWorkoutMappingSetup/SecondaryGoalWorkoutMapping'));

const DietChartSetupAdd = React.lazy(() => import('./views/AdminViews/Settings/DietChartSetup/DietChartSetupAdd'));
const DietChartSetupList = React.lazy(() => import('./views/AdminViews/Settings/DietChartSetup/DietChartSetupList'));

const MemPriGoalWorkOut = React.lazy(() => import('./views/AdminViews/Member/MemberGoalsWorkout/MemPriGoalWorkout'));
const MemSecGoalWorkOut = React.lazy(() => import('./views/AdminViews/Member/MemberGoalsWorkout/MemSecGoalWorkout'));

const TransferSetupList = React.lazy(() => import('./views/AdminViews/Settings/TransferSetup/TransferSetupList'));
const TransferSetup = React.lazy(() => import('./views/AdminViews/Settings/TransferSetup/TransferSetupAdd'));

const TestimonialsAdd = React.lazy(() => import('./views/AdminViews/Settings/Testimonials/TestimonialsAdd'));
const TestimonialsList = React.lazy(() => import('./views/AdminViews/Settings/Testimonials/TestimonialsList'));




const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <Layout><Component {...props}></Component></Layout>
    )}>
    </Route>
  );
}

const App = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['admin']);


  return (
    // <BrowserRouter>
    <HashRouter>
      <React.Suspense fallback={loading}>
        {/* {!cookies.user_type ? (<AdminLogin />) : ( */}
        <Switch>
          {/*Admin*/}
          <AppRoute exact path='/appconstants' name='Admin Dashboard' layout={TheLayoutAdmin} component={AppConstants} />
          <AppRoute exact path='/admindashboard' name='Admin Dashboard' layout={TheLayoutAdmin} component={AdminDashboard} />

          <AppRoute exact path='/mail-configuration-list' name='Mail Configuration List' layout={TheLayoutAdmin} component={MailConfigurationList} />
          <AppRoute exact path='/mail-configuration-add' name='Mail Configuration Add' layout={TheLayoutAdmin} component={MailConfigurationAdd} />
          <AppRoute exact path='/mail-configuration-details' name='Mail Configuration Details' layout={TheLayoutAdmin} component={MailConfigurationDetails} />

          <AppRoute exact path='/whatsapp-configuration-add' name='WhatsApp Configuration Add' layout={TheLayoutAdmin} component={WhatsAppConfigurationAdd} />

          <AppRoute exact path='/adduser' name='Add New User' layout={TheLayoutAdmin} component={AddNewUser} />
          <AppRoute exact path='/userlist' name='User List' layout={TheLayoutAdmin} component={UserList} />
          <AppRoute exact path='/userdetails' name='User Details' layout={TheLayoutAdmin} component={UserDetails} />

          <AppRoute exact path='/enquiryadd' name='Enquiry Add' layout={TheLayoutAdmin} component={EnquiryAdd} />
          <AppRoute exact path='/enquirylist' name='Enquiry List' layout={TheLayoutAdmin} component={EnquiryList} />
          <AppRoute exact path='/enquiry-details' name='Enquiry Details' layout={TheLayoutAdmin} component={EnquiryDetails} />
          <AppRoute exact path='/enquiryupdate' name='Enquiry Update' layout={TheLayoutAdmin} component={EnquiryUpdate} />


          <AppRoute exact path='/trailsadd' name='Trails Add' layout={TheLayoutAdmin} component={TrailsAdd} />
          <AppRoute exact path='/trailslist' name='Trails List' layout={TheLayoutAdmin} component={TrailsList} />
          <AppRoute exact path='/trailsdetails' name='Trails Details' layout={TheLayoutAdmin} component={TrailsDetails} />

          <AppRoute exact path='/addcustomer' name='Add New Customer' layout={TheLayoutAdmin} component={AddNewCustomer} />

          <AppRoute exact path='/customerlist' name='Customer List' layout={TheLayoutAdmin} component={CustomerList} />
          <AppRoute exact path='/customerdetails' name='Customer Details' layout={TheLayoutAdmin} component={CustomerDetails} />

          <AppRoute exact path='/addnewmember' name='Add New Member' layout={TheLayoutAdmin} component={AddNewMember} />
          <AppRoute exact path='/memberlist' name='Member List' layout={TheLayoutAdmin} component={MemberList} />
          <AppRoute exact path='/member-details' name='Member Details' layout={TheLayoutAdmin} component={MemberDetails} />
          <AppRoute exact path='/memberimportexcel' name='Member Import Excel' layout={TheLayoutAdmin} component={MemberImportExcel} />

          <AppRoute exact path='/primary-goal' name='Primary Goal' layout={TheLayoutAdmin} component={PrimaryGoal} />

          <AppRoute exact path='/secondary-goal' name='Secondary Goal' layout={TheLayoutAdmin} component={SecondaryGoal} />

          <AppRoute exact path='/health-setup' name='Health Setup' layout={TheLayoutAdmin} component={HealthSetup} />

          <AppRoute exact path='/body-measurement-setup' name='Body Measurement Setup' layout={TheLayoutAdmin} component={BodyMeasurementSetup} />

          <AppRoute exact path='/importcust' name='Import Customer' layout={TheLayoutAdmin} component={ImportCustomer} />

          <AppRoute exact path='/addon' name='Import Customer' layout={TheLayoutAdmin} component={AddOn} />

          <AppRoute exact path='/addreceiptentry' name='Add Receipt Entry' layout={TheLayoutAdmin} component={AddReceiptEntry} />

          <AppRoute exact path='/addtax' name='Add Tax' layout={TheLayoutAdmin} component={AddTax} />

          <AppRoute exact path='/addtaxgroup' name='Add Tax Group' layout={TheLayoutAdmin} component={AddTaxGroup} />

          <AppRoute exact path='/adddiscount' name='Add Discount' layout={TheLayoutAdmin} component={AddDiscount} />

          <AppRoute exact path='/addcoupon' name='Add Coupon' layout={TheLayoutAdmin} component={AddCoupon} />

          <AppRoute exact path='/addattendence' name='Add Attendence' layout={TheLayoutAdmin} component={AddAttendence} />

          <AppRoute exact path='/addnewbranch' name='Add Branch' layout={TheLayoutAdmin} component={AddNewBranch} />
          <AppRoute exact path='/branch-update' name='Branch Update' layout={TheLayoutAdmin} component={BranchUpdate} />
          <AppRoute exact path='/branchlist' name='Branch List' layout={TheLayoutAdmin} component={BranchList} />
          <AppRoute exact path='/branchdetails' name='Branch Details' layout={TheLayoutAdmin} component={BranchDetails} />
          <AppRoute exact path='/generate-qr-code' name='Generate QR Code' layout={TheLayoutAdmin} component={GenerateQRCode} />

          <AppRoute exact path='/addstaff' name='Add Staff' layout={TheLayoutAdmin} component={AddStaff} />
          <AppRoute exact path='/stafflist' name='Staff List' layout={TheLayoutAdmin} component={StaffList} />

          <AppRoute exact path='/addtrainer' name='Add Trainer' layout={TheLayoutAdmin} component={AddTrainer} />
          <AppRoute exact path='/trainerlist' name='Trainer List' layout={TheLayoutAdmin} component={TrainerList} />

          <AppRoute exact path='/addcategory' name='Add Category' layout={TheLayoutAdmin} component={AddCategory} />

          <AppRoute exact path='/add-new-product' name='Add Product' layout={TheLayoutAdmin} component={AddNewProduct} />
          <AppRoute exact path='/product-list' name='Product List' layout={TheLayoutAdmin} component={ProductList} />
          <AppRoute exact path='/product-details' name='Product Details' layout={TheLayoutAdmin} component={ProductDetails} />

          <AppRoute exact path='/add-new-package' name='Add New Package' layout={TheLayoutAdmin} component={AddNewPackage} />
          <AppRoute exact path='/packagelist' name='Package List' layout={TheLayoutAdmin} component={PackageList} />
          <AppRoute exact path='/package-details' name='Package Details' layout={TheLayoutAdmin} component={PackageDetails} />

          <AppRoute exact path='/sales-list' name='Sales List' layout={TheLayoutAdmin} component={SalesList} />
          <AppRoute exact path='/sales-details' name='Sales Details' layout={TheLayoutAdmin} component={SalesDetails} />

          <AppRoute exact path='/postpaid-bill-list' name='Postpaid Bill Report' layout={TheLayoutAdmin} component={PostpaidBillReport} />
          <AppRoute exact path='/balance-payment-list' name='Balance Payment List' layout={TheLayoutAdmin} component={BalancePaymentList} />
          <AppRoute exact path='/renewal-list' name='Renewal List' layout={TheLayoutAdmin} component={RenewalList} />

          {/* <AppRoute exact path='/add-package-category' name='Add Package Category' layout={TheLayoutAdmin} component={AddNewPackageCategory} /> */}

          <AppRoute exact path='/enquiry-source' name='Enquiry Source' layout={TheLayoutAdmin} component={EnquirySource} />
          <AppRoute exact path='/enquiry-type' name='Enquiry Type' layout={TheLayoutAdmin} component={EnquiryType} />
          <AppRoute exact path='/batches' name='Batches' layout={TheLayoutAdmin} component={Batches} />

          <AppRoute exact path='/tax-setup' name='TaxSetup' layout={TheLayoutAdmin} component={TaxSetup} />
          <AppRoute exact path='/tax-group-setup' name='Tax Group Setup' layout={TheLayoutAdmin} component={TaxGroupSetup} />
          <AppRoute exact path='/taxgroup-setupdetails' name='Tax Group Setup Details' layout={TheLayoutAdmin} component={TaxGroupSetupDetails} />

          <AppRoute exact path='/payment-types' name='Payment Types' layout={TheLayoutAdmin} component={PaymentTypes} />

          <AppRoute exact path='/terms-and-conditions' name='Terms And Conditions' layout={TheLayoutAdmin} component={TermsAndConditions} />

          <AppRoute exact path='/general-etting' name='General Setting' layout={TheLayoutAdmin} component={GeneralSetting} />
          <AppRoute exact path='/staff-details' name='Staff Details' layout={TheLayoutAdmin} component={StaffDetails} />
          <AppRoute exact path='/trainer-details' name='Trainer Details' layout={TheLayoutAdmin} component={TrainerDetails} />


          <AppRoute exact path='/member-attendance' name='Member Attendance' layout={TheLayoutAdmin} component={MemberAttendance} />
          <AppRoute exact path='/member-attendance-list' name='MemberAttendanceList' layout={TheLayoutAdmin} component={MemberAttendanceList} />

          <AppRoute exact path='/user-attendance' name='User Attendance' layout={TheLayoutAdmin} component={UserAttendance} />
          <AppRoute exact path='/user-attendance-list' name='UserAttendanceList' layout={TheLayoutAdmin} component={UserAttendanceList} />

          <AppRoute exact path='/bulkwhatsapp' name='Bulk WhatsApp' layout={TheLayoutAdmin} component={BulkWhatsApp} />
          <AppRoute exact path='/bulkemails' name='Bulk Emails' layout={TheLayoutAdmin} component={BulkEmails} />

          <AppRoute exact path='/branch-inventory' name='Branch Inventory Add' layout={TheLayoutAdmin} component={BranchInventoryAdd} />
          <AppRoute exact path='/branch-inventory-list' name='Branch Inventory List' layout={TheLayoutAdmin} component={BranchInventoryList} />
          <AppRoute exact path='/branch-inventory-details' name='Branch Inventory Details' layout={TheLayoutAdmin} component={BranchInventoryDetails} />

          <AppRoute exact path='/supplier' name='Supplier Add' layout={TheLayoutAdmin} component={SupplierAdd} />
          <AppRoute exact path='/supplier-list' name='Supplier List' layout={TheLayoutAdmin} component={SupplierList} />

          <AppRoute exact path='/role-feature-name' name='Role Feature Name Add' layout={TheLayoutAdmin} component={RoleFeatureNameAdd} />

          <AppRoute exact path='/new-role' name='Role Add' layout={TheLayoutAdmin} component={RoleAdd} />
          <AppRoute exact path='/role-list' name='Role List' layout={TheLayoutAdmin} component={RoleList} />
          <AppRoute exact path='/role-details' name='Role Details' layout={TheLayoutAdmin} component={RoleDetails} />

          <AppRoute exact path='/expenses' name='Expenses Add' layout={TheLayoutAdmin} component={ExpensesAdd} />
          <AppRoute exact path='/expenses-list' name='Expenses List' layout={TheLayoutAdmin} component={ExpensesList} />
          <AppRoute exact path='/expence-details' name='Expenses Details' layout={TheLayoutAdmin} component={ExpensesDetails} />

          <AppRoute exact path='/workoutsetup' name='WorkoutSetupAdd' layout={TheLayoutAdmin} component={WorkoutSetupAdd} />
          <AppRoute exact path='/workoutsetup-list' name='WorkoutSetupList' layout={TheLayoutAdmin} component={WorkoutSetupList} />
          <AppRoute exact path='/workoutsetup-details' name='WorkoutSetupDetails' layout={TheLayoutAdmin} component={WorkoutSetupDetails} />

          <AppRoute exact path='/prim-goal-workout-map' name='PrimaryGoalWorkoutMapping' layout={TheLayoutAdmin} component={PrimaryGoalWorkoutMapping} />

          <AppRoute exact path='/sec-goal-workout-map' name='SecondaryGoalWorkoutMapping' layout={TheLayoutAdmin} component={SecondaryGoalWorkoutMapping} />

          <AppRoute exact path='/dietchartsetup' name='DietChartSetupAdd' layout={TheLayoutAdmin} component={DietChartSetupAdd} />
          <AppRoute exact path='/dietchartsetup-list' name='DietChartSetupList' layout={TheLayoutAdmin} component={DietChartSetupList} />

          <AppRoute exact path='/mempriworkout' name='MemPriGoalWorkOut' layout={TheLayoutAdmin} component={MemPriGoalWorkOut} />
          <AppRoute exact path='/memsecworkout' name='MemSecGoalWorkOut' layout={TheLayoutAdmin} component={MemSecGoalWorkOut} />

          <AppRoute exact path='/trans-setup' name='TransferSetupList' layout={TheLayoutAdmin} component={TransferSetup} />
          <AppRoute exact path='/trans-setup-list' name='TransferSetupList' layout={TheLayoutAdmin} component={TransferSetupList} />

          <AppRoute exact path='/testim-setup' name='TestimonialsAdd' layout={TheLayoutAdmin} component={TestimonialsAdd} />
          <AppRoute exact path='/testim-list' name='TestimonialsList' layout={TheLayoutAdmin} component={TestimonialsList} />
          {/* PmapG */}
          <Route exact path="/adminlogin" name="Login Page" render={props => <AdminLogin {...props} />} />
          <Route exact path="/" name="Login Page" render={props => <AdminLogin {...props} />} />
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />

          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />

          <AppRoute exact path='/charts' name='Charts' layout={TheLayoutAdmin} component={Charts} />
        </Switch>
        {/* )} */}
      </React.Suspense>
      <ToastContainer
        draggable={false}
        transition={Zoom}//zoom out
        autoClose={2000}//closing after 8sec
        position="top-center"
      />
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}


export default App;
