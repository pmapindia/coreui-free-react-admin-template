import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import './scss/style.scss';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//IF WE USE HASHROUTER THEN WILL GET # IN THE URL EX.3000/#/DASHBORAD
import { useCookies } from 'react-cookie';
import AddNewCategory from './views/AdminViews/Products/Products/AddNewCategory';


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
//Alcoats pages
const AdminLogin = React.lazy(() => import('./views/AdminViews/Logins/Adminlogin'));

//Admin layout and views
const TheLayoutAdmin = React.lazy(() => import('./containerAdmin/TheLayoutAdmin'));
const AdminDashboard = React.lazy(() => import('./views/AdminViews/AdminDashboard'));

const AddNewUser = React.lazy(() => import('./views/AdminViews/User/UserAdd'));
const UserList = React.lazy(() => import('./views/AdminViews/User/UserLIst'));
const UserDetails = React.lazy(() => import('./views/AdminViews/User/UserDetails'));

const EnquiryAdd = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryAdd'));
const EnquiryList = React.lazy(() => import('./views/AdminViews/Enquiry/EnquiryList'));

const TrailsAdd = React.lazy(() => import('./views/AdminViews/Trails/TrailsAdd'));

const AddNewCustomer = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd'));
const CustomerList = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd/CustomerList'));
const CustomerDetails = React.lazy(() => import('./views/AdminViews/Customer/CustomerAdd/CustDetails'));

const AddNewMember = React.lazy(() => import('./views/AdminViews/Member/MemberAdd'));
const MemberList = React.lazy(() => import('./views/AdminViews/Member/MemberList'));

const PrimaryGoal = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/PrimaryGoal'));

const SecondaryGoal = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/SecondaryGoal'));

const HealthSetup = React.lazy(() => import('./views/AdminViews/Member/MemberSetup/HealthInfo'));

const AddNewRenewal = React.lazy(() => import('./views/AdminViews/Renewal'));

const ImportCustomer = React.lazy(() => import('./views/AdminViews/Customer/ImportCustomer/ImportCust'));

const AddOn = React.lazy(() => import('./views/AdminViews/AddOn/AddOn'));

const AddReceiptEntry = React.lazy(() => import('./views/AdminViews/Billings/ReceipytEntry/ReceipytEntryAdd'));

const AddTax = React.lazy(() => import('./views/AdminViews/Billings/Tax/TaxAdd'));

const AddTaxGroup = React.lazy(() => import('./views/AdminViews/Billings/TaxGroup/TaxGroupAdd'));

const AddDiscount = React.lazy(() => import('./views/AdminViews/Billings/Discount/DiscountAdd'));

const AddCoupon = React.lazy(() => import('./views/AdminViews/Billings/Coupon/CouponAdd'));

const AddAttendence = React.lazy(() => import('./views/AdminViews/Admin/Attendence/AttendenceAdd'));

const AddNewBranch = React.lazy(() => import('./views/AdminViews/Admin/Branch/AddNewBranch'));
const BranchList = React.lazy(() => import('./views/AdminViews/Admin/Branch/BranchList'));
const BranchDetails = React.lazy(() => import('./views/AdminViews/Admin/Branch/BranchDetails'));

const AddStaff = React.lazy(() => import('./views/AdminViews/Admin/Staffs/AddStaffs'));
const AddTrainer = React.lazy(() => import('./views/AdminViews/Admin/Trainers/TrainersAdd'));

const AddInventory = React.lazy(() => import('./views/AdminViews/Inventory/InventoryAdd'));

const AddCategory = React.lazy(() => import('./views/AdminViews/Products/Products/AddNewCategory'));

const AddNewProduct = React.lazy(() => import('./views/AdminViews/Products/Products/AddNewProduct'));
const ProductList = React.lazy(() => import('./views/AdminViews/Products/Products/ProductsList'));
const ProductDetails = React.lazy(() => import('./views/AdminViews/Products/Products/ProductsDetails'));

const AddNewPackage = React.lazy(() => import('./views/AdminViews/Package/CreatePackege'));
const PackageList = React.lazy(() => import('./views/AdminViews/Package/PackageList'));
const PackageDetails = React.lazy(() => import('./views/AdminViews/Package/PackageDetails'));


const AddNewPackageAddOn = React.lazy(() => import('./views/AdminViews/Package/CreateAddOn'));

const AddNewPackageCategory = React.lazy(() => import('./views/AdminViews/Package/PackageCategoryAdd'));

const CreateBatch = React.lazy(() => import('./views/AdminViews/Package/CreateBatch'));

const EnquirySource = React.lazy(() => import('./views/AdminViews/Settings/EnquirySource/EnquirySourceAdd'));
const EnquiryType = React.lazy(() => import('./views/AdminViews/Settings/EnquiryType/EnquiryTypeAdd'));
const Batches = React.lazy(() => import('./views/AdminViews/Settings/Batches/BatchAdd'));

const TaxSetup = React.lazy(() => import('./views/AdminViews/Settings/TaxSetup'));
const TaxGroupSetup = React.lazy(() => import('./views/AdminViews/Settings/TaxGroupSetup'));
const TaxGroupSetupDetails = React.lazy(() => import('./views/AdminViews/Settings/TaxGroupSetup/TaxGoupSetupDetails'));

const PaymentTypes = React.lazy(() => import('./views/AdminViews/Settings/PaymentTypes/PaymentTypes'));

const TermsAndConditions = React.lazy(() => import('./views/AdminViews/Settings/TermsAndConditions'));
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
          <AppRoute exact path='/admindashboard' name='Admin Dashboard' layout={TheLayoutAdmin} component={AdminDashboard} />

          <AppRoute exact path='/adduser' name='Add New User' layout={TheLayoutAdmin} component={AddNewUser} />
          <AppRoute exact path='/userlist' name='User List' layout={TheLayoutAdmin} component={UserList} />
          <AppRoute exact path='/userdetails' name='User Details' layout={TheLayoutAdmin} component={UserDetails} />

          <AppRoute exact path='/enquiryadd' name='Enquiry Add' layout={TheLayoutAdmin} component={EnquiryAdd} />
          <AppRoute exact path='/enquirylist' name='Enquiry List' layout={TheLayoutAdmin} component={EnquiryList} />

          <AppRoute exact path='/trailsadd' name='Trails Add' layout={TheLayoutAdmin} component={TrailsAdd} />

          <AppRoute exact path='/addcustomer' name='Add New Customer' layout={TheLayoutAdmin} component={AddNewCustomer} />
          <AppRoute exact path='/customerlist' name='Customer List' layout={TheLayoutAdmin} component={CustomerList} />
          <AppRoute exact path='/customerdetails' name='Customer Details' layout={TheLayoutAdmin} component={CustomerDetails} />

          <AppRoute exact path='/addnewmember' name='Add New Member' layout={TheLayoutAdmin} component={AddNewMember} />
          <AppRoute exact path='/memberlist' name='Member List' layout={TheLayoutAdmin} component={MemberList} />

          <AppRoute exact path='/primary-goal' name='Primary Goal' layout={TheLayoutAdmin} component={PrimaryGoal} />

          <AppRoute exact path='/secondary-goal' name='Secondary Goal' layout={TheLayoutAdmin} component={SecondaryGoal} />

          <AppRoute exact path='/health-setup' name='Health Setup' layout={TheLayoutAdmin} component={HealthSetup} />
          
          <AppRoute exact path='/addrenewal' name='Add New Customer' layout={TheLayoutAdmin} component={AddNewRenewal} />

          <AppRoute exact path='/importcust' name='Import Customer' layout={TheLayoutAdmin} component={ImportCustomer} />

          <AppRoute exact path='/addon' name='Import Customer' layout={TheLayoutAdmin} component={AddOn} />

          <AppRoute exact path='/addreceiptentry' name='Add Receipt Entry' layout={TheLayoutAdmin} component={AddReceiptEntry} />

          <AppRoute exact path='/addtax' name='Add Tax' layout={TheLayoutAdmin} component={AddTax} />

          <AppRoute exact path='/addtaxgroup' name='Add Tax Group' layout={TheLayoutAdmin} component={AddTaxGroup} />

          <AppRoute exact path='/adddiscount' name='Add Discount' layout={TheLayoutAdmin} component={AddDiscount} />

          <AppRoute exact path='/addcoupon' name='Add Coupon' layout={TheLayoutAdmin} component={AddCoupon} />

          <AppRoute exact path='/addattendence' name='Add Attendence' layout={TheLayoutAdmin} component={AddAttendence} />
          
          <AppRoute exact path='/addnewbranch' name='Add Branch' layout={TheLayoutAdmin} component={AddNewBranch} />
          <AppRoute exact path='/branchlist' name='Branch List' layout={TheLayoutAdmin} component={BranchList} />
          <AppRoute exact path='/branchdetails' name='Branch Details' layout={TheLayoutAdmin} component={BranchDetails} />

          <AppRoute exact path='/addstaff' name='Add Staff' layout={TheLayoutAdmin} component={AddStaff} />

          <AppRoute exact path='/addtrainer' name='Add Trainer' layout={TheLayoutAdmin} component={AddTrainer} />

          <AppRoute exact path='/addinventory' name='Add Inventory' layout={TheLayoutAdmin} component={AddInventory} />

          <AppRoute exact path='/addcategory' name='Add Category' layout={TheLayoutAdmin} component={AddCategory} />

          <AppRoute exact path='/add-new-product' name='Add Product' layout={TheLayoutAdmin} component={AddNewProduct} />
          <AppRoute exact path='/product-list' name='Product List' layout={TheLayoutAdmin} component={ProductList} />
          <AppRoute exact path='/product-details' name='Product Details' layout={TheLayoutAdmin} component={ProductDetails} />
          
          <AppRoute exact path='/add-new-package' name='Add New Package' layout={TheLayoutAdmin} component={AddNewPackage} />
          <AppRoute exact path='/packagelist' name='Package List' layout={TheLayoutAdmin} component={PackageList} />
          <AppRoute exact path='/package-details' name='Package Details' layout={TheLayoutAdmin} component={PackageDetails} />

          <AppRoute exact path='/add-package-addon' name='Add Package Add On' layout={TheLayoutAdmin} component={AddNewPackageAddOn} />
          <AppRoute exact path='/add-package-category' name='Add Package Category' layout={TheLayoutAdmin} component={AddNewPackageCategory} />

          <AppRoute exact path='/create-batch' name='Add Product' layout={TheLayoutAdmin} component={CreateBatch} />

          <AppRoute exact path='/enquiry-source' name='Enquiry Source' layout={TheLayoutAdmin} component={EnquirySource} />
          <AppRoute exact path='/enquiry-type' name='Enquiry Type' layout={TheLayoutAdmin} component={EnquiryType} />
          <AppRoute exact path='/batches' name='Batches' layout={TheLayoutAdmin} component={Batches} />

          <AppRoute exact path='/tax-setup' name='TaxSetup' layout={TheLayoutAdmin} component={TaxSetup} />
          <AppRoute exact path='/tax-group-setup' name='Tax Group Setup' layout={TheLayoutAdmin} component={TaxGroupSetup} />
          <AppRoute exact path='/taxgroup-setupdetails' name='Tax Group Setup Details' layout={TheLayoutAdmin} component={TaxGroupSetupDetails} />

          <AppRoute exact path='/payment-types' name='Payment Types' layout={TheLayoutAdmin} component={PaymentTypes} />

          <AppRoute exact path='/terms-and-conditions' name='Terms And Conditions' layout={TheLayoutAdmin} component={TermsAndConditions} />

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
