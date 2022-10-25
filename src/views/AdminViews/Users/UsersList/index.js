import React, { useEffect, useState } from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie';
import Select from 'react-select';
import axios from "axios";
import {CButton,CCardCCardBody,CCardHeader,CCol,CModal,CModalBody,CModalFooter,CModalHeader,CModalTitle,CInput,CForm,CSelect,
  CRow,CLabel,CFormGroup} from '@coreui/react'
import { toast } from 'react-toastify';
import '../../../../scss/_custom.scss';

const UsersLists = () => {

    const[search_text1,setSearchText]=useState({
        search_text:""
    });
    const{search_text}=search_text1;

    const[currentsize,setCurrentSize]=useState(0);
    const[listcount,setListCount]=useState(0);

    const[AllUsers,setAllUsers]=useState([]);

    const OnChangeTextSearch=(e)=>{
        console.log(e.target.value);
        setSearchText({search_text1,[e.target.name]:e.target.value});
        setCurrentSize(0);
        setListCount(0);
        setAllUsers([]);
        
    }

    useEffect(()=>{
        LoadAllUsers();
    },[]);

    const LoadAllUsers=async()=>{
        var list={};
        list["search_text"]=search_text;

        await axios.post(process.env.REACT_APP_API+"UserList",list).then(response=>{
            console.log(response);
            var ULists=[];
            var CreateAtNew="",UpdateAtNew="";

            for(let i=0;i<response.data.user_list.length;i++){
                if(response.data.user_list[i].user_created_at!=null){
                    var CDate=response.data.user_list[i].user_created_at;
                    CreateAtNew=CDate.substring(0,10);
                }
                else{
                    CreateAtNew=response.data.user_list[i].user_created_at;
                }

                if(response.data.user_list[i].user_updated_at!=null){
                    var UpDate=response.data.user_list[i].user_updated_at;
                    UpdateAtNew=UpDate.substring(0,10);
                }
                else{
                    UpdateAtNew=response.data.user_list[i].user_updated_at;
                }

                ULists.push({
                    "user_guid":response.data.user_list[i].user_guid,
                    "user_name": response.data.user_list[i].user_name,
                    "user_mobile_number":response.data.user_list[i].user_mobile_number,
                    "user_email":response.data.user_list[i].user_email,
                    "user_password":response.data.user_list[i].user_password,
                    "user_type": response.data.user_list[i].user_type,
                    "user_created_at":CreateAtNew,
                    "user_updated_at":UpdateAtNew
                });
            }
            setAllUsers(ULists);
        }).catch(error=>{
            console.log(error);
        });
    }

    const  UserDelete=async (user_index,user_guid)=>{
        var list={};
        
        list["user_guid"]=user_guid;
        await axios.post(process.env.REACT_APP_API+"UserDelete",list).then(response=>{
          console.log(response);
          if(response.data.is_success){
          toast.success(response.data.msg);
          var temp_agent=AllUsers;
          temp_agent.splice(user_index,1);
          setAllUsers([]);
          setAllUsers(temp_agent);
          }
          else{
            alert(response.data.msg);
        }
        }).catch(error=>{
          console.log(error);
          toast.error(""+error);
        })
      }
return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
    <h2 className='fontweight' style={{color:"black"}}>Users List</h2>

        <CRow>
            <CCol xs="12" sm="3" md="3" lg="3" className="mt-4 pt-1">
                <div class="inner-addon right-addon">
                   <i class="fa fa-search"></i>                     
                    <CInput type="text"
                        placeholder="Search"
                        name="search_text"
                        value={search_text}
                        onChange={(e)=>OnChangeTextSearch(e)}
                        onKeyUp={()=>LoadAllUsers()}
                        >
                    </CInput>
                </div>
            </CCol>

            <CCol xs="12" sm="6" md="6" lg="6"></CCol>
            <CCol xs="12" sm="3" md="3" lg="3" className="mt-1">
                <Link to='/users-add' className="btn  white mr-1 mt-4 width100" style={{backgroundColor:"blue", fontWeight:"bold",fontSize:"15px"}}>Add User</Link>
            </CCol>
        </CRow>
        <hr className="bgclr" style={{height:"3px"}}/>
        <div className='mt-8'>
            <table class="table rs-table-bordered " >
                <tbody>
                    <tr className='fontweight bgblue' style={{color:"black", fontSize:"15px", textAlign:"center"}} >
                        <td>Sl No</td>
                        <td>User Name</td>
                        <td>Mobile Number</td>
                        <td>E - Mail</td>
                        <td>User Type</td>
                        <td>Create At</td>
                        <td>Update At</td>
                        <td>Edit</td>
                        <td>Details</td>
                        <td>Delete</td>
                    </tr>

                    {AllUsers.map((alluser,index)=>(
                        <tr className='fontweight' style={{color:"black", fontSize:"13px", textAlign:"center"}} key={index}>
                            <td>{index+1}</td>
                            <td>{alluser.user_name}</td>
                            <td>{alluser.user_mobile_number}</td>
                            <td>{alluser.user_email}</td>
                            <td>{alluser.user_type}</td>
                            <td>{alluser.user_created_at}</td>
                            <td>{alluser.user_updated_at}</td>
                            <td>
                            <Link to={{pathname:'/users-add',
                                pfid:{
                                        pfid:alluser.user_guid
                                }
                                }} className="btn" style={{paddingLeft:"2px"}}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Link>
                            </td>
                            <td>
                            <Link to={`/users-details?user_guid=${alluser.user_guid}`}
                            className="btn bgblue white width100 fontweight bgclr " style={{paddingLeft:"2px",backgroundColor:"blue"}}>
                            Details
                            </Link>
                            </td>
                            <td>
                                <CButton  className="btn" onClick={()=> UserDelete(index,alluser.user_guid)}>
                                <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"20px",color:"red"}}></i>
                                </CButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
</div>
</>
)
}
export default UsersLists;
