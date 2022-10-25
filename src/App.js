import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,HashRouter } from 'react-router-dom';
import './scss/style.scss';
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import ExportExcel from './ExportExcel';
// import ExportExcel from 'react-html-table-to-excel';

//IF WE USE HASHROUTER THEN WILL GET # IN THE URL EX.3000/#/DASHBORAD
import {useCookies} from 'react-cookie';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//LAZY LOAD IMPROVES THE REACT BASED APPLICATION PERFORMANCE
//LAZY LOAD SPLITS THE BUNDLE.JS FILE BASED ON THE ROUTES HERE IT WILL CREATE A SEPARATE FILE FOR BOTH LOGIN AND REGISTER.



// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

//Admin layout and views
const TheLayoutAdmin = React.lazy(() => import('./containerAdmin/TheLayoutAdmin'));
const AdminDashboard=React.lazy(() => import('./views/AdminViews/AdminDashboard'));
const AdminLogin=React.lazy(() => import('./views/GeneralViews/Logins/Adminlogin'));

const AddNewAgent=React.lazy(() => import('./views/AdminViews/Agent/AddAgent'));
const AgentList=React.lazy(() => import('./views/AdminViews/Agent/AgentList'));
const AgentDetails=React.lazy(() => import('./views/AdminViews/Agent/AgentDetails'));

const ProjectsAdd=React.lazy(() => import('./views/AdminViews/Projects/ProjectsAdd'));
const ProjectsList=React.lazy(() => import('./views/AdminViews/Projects/ProjectsList'));
const ProjectsDetails=React.lazy(() => import('./views/AdminViews/Projects/ProjectsDetails'));

const UsersAdd=React.lazy(() => import('./views/AdminViews/Users/UsersAdd'));
const UsersList=React.lazy(() => import('./views/AdminViews/Users/UsersList'));
const UsersDetails=React.lazy(() => import('./views/AdminViews/Users/UsersDetails'));

const BannerImageAdd=React.lazy(() => import('./views/AdminViews/BannerImage/BannerImageAdd'));

const PaymentAdd=React.lazy(() => import('./views/AdminViews/MakePayment/MakePaymentAdd'));
const PaymentList=React.lazy(() => import('./views/AdminViews/MakePayment/MakePaymentList'));
const PaymentDetails=React.lazy(() => import('./views/AdminViews/MakePayment/MakePaymentDetails'));


const AppRoute=({component:Component,layout:Layout,...rest})=>{
  return(
  <Route {...rest} render={props=>(
<Layout><Component {...props}></Component></Layout>
)}>
</Route>
  );
}

const App=()=>{
  const[cookies,setCookies,removeCookie]=useCookies(['admin']);


    return (
      // <BrowserRouter>
      <HashRouter>
          <React.Suspense fallback={loading}>
          {!cookies.user_type?(<AdminLogin/>):(
            <Switch>


{/*Admin*/}
<AppRoute  exact path='/admindashboard' name='Admin Dashboard' layout={TheLayoutAdmin} component={AdminDashboard}/>

<AppRoute  exact path='/add-new-agent' name='Add New Agent' layout={TheLayoutAdmin} component={AddNewAgent}/>
<AppRoute  exact path='/agent-list' name='Agent List' layout={TheLayoutAdmin} component={AgentList}/>
<AppRoute  exact path='/agent-details' name='Agent Details' layout={TheLayoutAdmin} component={AgentDetails}/>

<AppRoute  exact path='/add-new-project' name='Projects Add' layout={TheLayoutAdmin} component={ProjectsAdd}/>
<AppRoute  exact path='/project-list' name='Projects List' layout={TheLayoutAdmin} component={ProjectsList}/>
<AppRoute  exact path='/project-details' name='Projects Details' layout={TheLayoutAdmin} component={ProjectsDetails}/>

<AppRoute  exact path='/users-add' name='Users Add' layout={TheLayoutAdmin} component={UsersAdd}/>
<AppRoute  exact path='/users-list' name='Users List' layout={TheLayoutAdmin} component={UsersList}/>
<AppRoute  exact path='/users-details' name='Users Details' layout={TheLayoutAdmin} component={UsersDetails}/>

<AppRoute  exact path='/banner-image-add' name='Banner Image Add' layout={TheLayoutAdmin} component={BannerImageAdd}/>

<AppRoute  exact path='/make-payment-add' name='Payment Add' layout={TheLayoutAdmin} component={PaymentAdd}/>
<AppRoute  exact path='/make-payment-list' name='Payment List' layout={TheLayoutAdmin} component={PaymentList}/>
<AppRoute  exact path='/make-payment-details' name='Payment Details' layout={TheLayoutAdmin} component={PaymentDetails}/>

{/* { path:'/settings/all-users', name:'All Users', component:AllUsers},
{ path:'/settings/add-new-users', name:'Add New Users', component:AddNewUsers},
{path:'/settings/edit-users/:id', exact:true,name:'Edit User',component:EditUser */}


  {/* General */}
            <Route path="/" name="Login Page" render={props => <AdminLogin {...props}/>} />
            
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />





               {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}

              {/* {cookies.user_dashboard_id==="ADMIN_DASHBOARD"? */}
                             {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}

              {/* <Route path="/dashboard" name="Home" render={props => <TheLayout {...props}/>} /> */}
              {/* :null} */}
                {/* {cookies.user_dashboard_id==="OPERATORS_DASHBOARD"? */}
              {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
              {/* <AppRoute path= '/operatordashboard' name= 'OperatorDashboard' layout={TheLayoutOperator} component={OperatorDashboard} /> */}

              {/* :null} */}

            </Switch>
          )}
          </React.Suspense>
          {/* <ExportExcel/>   */}

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
