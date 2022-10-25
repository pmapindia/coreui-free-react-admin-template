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

const BannerImageAdd = () => {

    const[cookies,setCookies,removeCookie]=useCookies(['admin']);

    const[disablebutton1,setDisableButton1]=useState(false);
    const[disablebutton2,setDisableButton2]=useState(false);
    const[disablebutton3,setDisableButton3]=useState(false);
    const[disablebutton4,setDisableButton4]=useState(false);
    const[disablebutton5,setDisableButton5]=useState(false);
    const[disablebutton6,setDisableButton6]=useState(false);
    const[disablebutton7,setDisableButton7]=useState(false);
    const[disablebutton8,setDisableButton8]=useState(false);

    const[errors,setErrors]=useState({});
    const[warnings,setWarnings]=useState({
    warnings:""
    });
// ------------------------------------------------------------Banner Image 1---------------------------------------------------------
    
    const[BannerImage1,setBannerImage1]=useState({
        banner_image_name_1: "",
        banner_image_tittle_1: ""
    });

    const{
        banner_image_name_1,
        banner_image_tittle_1
    }=BannerImage1;

    const OnInputChangeBN1=(e)=>{
        console.log(e.target.value);
        setBannerImage1({...BannerImage1,[e.target.name]:e.target.value});
    }

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [PictureDis, setPictureDis] = useState(null);
    var image="";
    const[imgdivc,setImgDivC]=useState(false);

    const onChangePictureBN1 = (e) => {
        if (e.target.files[0]) {
        setPicture(e.target.files[0]);
        var b1=e.target.files[0].name;
           
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image=a;  
            var image_name=e.target.name;
            UploadImage(image,image_name);
            console.log("Property Cover Image Name:" +image_name); 
           });
           reader.readAsDataURL(e.target.files[0]);
         }
    };

    const UploadImage=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
         
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
          console.log(response);
          setPictureDis(true);
          console.log("imagename");
          var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
          console.log(response.data.image_name);
          if(image_name==="banner_image_name_1"){
    
            setBannerImage1({ ...BannerImage1, 
            ["banner_image_name_1"]: response.data.image_name,
             
            });
            setImgDivC(true);
            setImgData(img11);
        }
        }).catch(error=>{
          console.log(error);
        })
    }

    const Removeimage1=(banner_image)=>{
        // alert(propertycoverimage);
        setBannerImage1({...BannerImage1,[banner_image]:""});
        setPictureDis(false);
    }

    const OnSubmitBN1=async(e)=>{
        e.preventDefault();
        setDisableButton1(true); 
        document.getElementById("img_gif_loading_btn1").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage1InformationAddAndUpdate",{
                "banner_image_name_1": banner_image_name_1,
                "banner_image_tittle_1": banner_image_tittle_1
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton1(false);
                    document.getElementById("img_gif_loading_btn1").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton1(false);
                    document.getElementById("img_gif_loading_btn1").style.display="none";
                    }
                }).catch(
                  error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton1(false);
                    document.getElementById("img_gif_loading_btn1").style.display="none";
                });
    }

// -----------------------------------------------------------Banner Image 2----------------------------------------------------------

    const[BannerImage2,setBannerImage2]=useState({
        banner_image_name_2: "",
        banner_image_tittle_2: ""
    });

    const{
        banner_image_name_2,
        banner_image_tittle_2
    }=BannerImage2;

    const OnInputChangeBN2=(e)=>{
        console.log(e.target.value);
        setBannerImage2({...BannerImage2,[e.target.name]:e.target.value});
    }

    const [picture2, setPicture2] = useState(null);
    const [imgData2, setImgData2] = useState(null);
    const [PictureDis2, setPictureDis2] = useState(null);
    var image2="";
    const[imgdivc2,setImgDivC2]=useState(false);

    const onChangePictureBN2 = (e) => {
        if (e.target.files[0]) {
        setPicture2(e.target.files[0]);
        var b1=e.target.files[0].name;
           
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image2=a;  
            var image_name2=e.target.name;
            UploadImage2(image2,image_name2);
            console.log("Property Cover Image Name:" +image_name2); 
           });
           reader.readAsDataURL(e.target.files[0]);
         }
    };

    const UploadImage2=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
         
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
          console.log(response);
          setPictureDis2(true);
          console.log("imagename");
          var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
          console.log(response.data.image_name);
          if(image_name==="banner_image_name_2"){
    
            setBannerImage2({ ...BannerImage2, 
            ["banner_image_name_2"]: response.data.image_name,
             
            });
            setImgDivC2(true);
            setImgData2(img11);
        }
        }).catch(error=>{
          console.log(error);
        })
    }

    const Removeimage2=(banner_image2)=>{
        // alert(propertycoverimage);
        setBannerImage2({...BannerImage2,[banner_image2]:""});
        setPictureDis2(false);
    }

    const OnSubmitBN2=async(e)=>{
        e.preventDefault();
        setDisableButton2(true); 
        document.getElementById("img_gif_loading_btn2").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage2InformationAddAndUpdate",{
                "banner_image_name_2": banner_image_name_2,
                "banner_image_tittle_2": banner_image_tittle_2
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton2(false);
                    document.getElementById("img_gif_loading_btn2").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton2(false);
                    document.getElementById("img_gif_loading_btn2").style.display="none";
                    }
                }).catch(
                  error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton2(false);
                    document.getElementById("img_gif_loading_btn2").style.display="none";
                });

    }

// -----------------------------------------------------------Banner Image 3----------------------------------------------------------
    
    const[BannerImage3,setBannerImage3]=useState({
        banner_image_name_3: "",
        banner_image_tittle_3: ""
    });

    const{
        banner_image_name_3,
        banner_image_tittle_3
    }=BannerImage3;

    const OnInputChangeBN3=(e)=>{
        console.log(e.target.value);
        setBannerImage3({...BannerImage3,[e.target.name]:e.target.value});
    }

    const [picture3, setPicture3] = useState(null);
    const [imgData3, setImgData3] = useState(null);
    const [PictureDis3, setPictureDis3] = useState(null);
    var image3="";
    const[imgdivc3,setImgDivC3]=useState(false);

    const onChangePictureBN3 = (e) => {
        if (e.target.files[0]) {
        setPicture3(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image3=a;  
            var image_name3=e.target.name;
            UploadImage3(image3,image_name3);
            console.log("Property Cover Image Name:" +image_name3); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage3=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis3(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_3"){

            setBannerImage3({ ...BannerImage3, 
            ["banner_image_name_3"]: response.data.image_name,
            
            });
            setImgDivC3(true);
            setImgData3(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage3=(banner_image3)=>{
        // alert(propertycoverimage);
        setBannerImage3({...BannerImage3,[banner_image3]:""});
        setPictureDis3(false);
    }

    const OnSubmitBN3=async(e)=>{
        e.preventDefault();
        setDisableButton3(true); 
        document.getElementById("img_gif_loading_btn3").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage3InformationAddAndUpdate",{
                "banner_image_name_3": banner_image_name_3,
                "banner_image_tittle_3": banner_image_tittle_3
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton3(false);
                    document.getElementById("img_gif_loading_btn3").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton3(false);
                    document.getElementById("img_gif_loading_btn3").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton3(false);
                    document.getElementById("img_gif_loading_btn3").style.display="none";
                });
    }

// -----------------------------------------------------------Banner Image 4----------------------------------------------------------
    const[BannerImage4,setBannerImage4]=useState({
        banner_image_name_4: "",
        banner_image_tittle_4: ""
    });

    const{
        banner_image_name_4,
        banner_image_tittle_4
    }=BannerImage4;

    const OnInputChangeBN4=(e)=>{
        console.log(e.target.value);
        setBannerImage4({...BannerImage4,[e.target.name]:e.target.value});
    }

    const [picture4, setPicture4] = useState(null);
    const [imgData4, setImgData4] = useState(null);
    const [PictureDis4, setPictureDis4] = useState(null);
    var image4="";
    const[imgdivc4,setImgDivC4]=useState(false);

    const onChangePictureBN4 = (e) => {
        if (e.target.files[0]) {
        setPicture4(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image4=a;  
            var image_name4=e.target.name;
            UploadImage4(image4,image_name4);
            console.log("Property Cover Image Name:" +image_name4); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage4=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis4(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_4"){

            setBannerImage4({ ...BannerImage4, 
            ["banner_image_name_4"]: response.data.image_name,
            
            });
            setImgDivC4(true);
            setImgData4(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage4=(banner_image4)=>{
        // alert(propertycoverimage);
        setBannerImage4({...BannerImage4,[banner_image4]:""});
        setPictureDis4(false);
    }

    const OnSubmitBN4=async(e)=>{
        e.preventDefault();
        setDisableButton4(true); 
        document.getElementById("img_gif_loading_btn4").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage4InformationAddAndUpdate",{
                "banner_image_name_4": banner_image_name_4,
                "banner_image_tittle_4": banner_image_tittle_4
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton4(false);
                    document.getElementById("img_gif_loading_btn4").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton4(false);
                    document.getElementById("img_gif_loading_btn4").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton4(false);
                    document.getElementById("img_gif_loading_btn4").style.display="none";
                });
    }
// -----------------------------------------------------------Banner Image 5----------------------------------------------------------

    const[BannerImage5,setBannerImage5]=useState({
        banner_image_name_5: "",
        banner_image_tittle_5: ""
    });

    const{
        banner_image_name_5,
        banner_image_tittle_5
    }=BannerImage5;

    const OnInputChangeBN5=(e)=>{
        console.log(e.target.value);
        setBannerImage5({...BannerImage5,[e.target.name]:e.target.value});
    }

    const [picture5, setPicture5] = useState(null);
    const [imgData5, setImgData5] = useState(null);
    const [PictureDis5, setPictureDis5] = useState(null);
    var image5="";
    const[imgdivc5,setImgDivC5]=useState(false);

    const onChangePictureBN5 = (e) => {
        if (e.target.files[0]) {
        setPicture5(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image5=a;  
            var image_name5=e.target.name;
            UploadImage5(image5,image_name5);
            console.log("Property Cover Image Name:" +image_name5); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage5=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis5(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_5"){

            setBannerImage5({ ...BannerImage5, 
            ["banner_image_name_5"]: response.data.image_name,
            
            });
            setImgDivC5(true);
            setImgData5(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage5=(banner_image5)=>{
        // alert(propertycoverimage);
        setBannerImage5({...BannerImage5,[banner_image5]:""});
        setPictureDis5(false);
    }

    const OnSubmitBN5=async(e)=>{
        e.preventDefault();
        setDisableButton5(true); 
        document.getElementById("img_gif_loading_btn5").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage5InformationAddAndUpdate",{
                "banner_image_name_5": banner_image_name_5,
                "banner_image_tittle_5": banner_image_tittle_5
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton5(false);
                    document.getElementById("img_gif_loading_btn5").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton5(false);
                    document.getElementById("img_gif_loading_btn5").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton5(false);
                    document.getElementById("img_gif_loading_btn5").style.display="none";
                });
    }

// -----------------------------------------------------------Banner Image 6----------------------------------------------------------
    const[BannerImage6,setBannerImage6]=useState({
        banner_image_name_6: "",
        banner_image_tittle_6: ""
    });

    const{
        banner_image_name_6,
        banner_image_tittle_6
    }=BannerImage6;

    const OnInputChangeBN6=(e)=>{
        console.log(e.target.value);
        setBannerImage6({...BannerImage6,[e.target.name]:e.target.value});
    }

    const [picture6, setPicture6] = useState(null);
    const [imgData6, setImgData6] = useState(null);
    const [PictureDis6, setPictureDis6] = useState(null);
    var image6="";
    const[imgdivc6,setImgDivC6]=useState(false);

    const onChangePictureBN6 = (e) => {
        if (e.target.files[0]) {
        setPicture6(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image6=a;  
            var image_name6=e.target.name;
            UploadImage6(image6,image_name6);
            console.log("Property Cover Image Name:" +image_name6); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage6=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis6(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_6"){

            setBannerImage6({ ...BannerImage6, 
            ["banner_image_name_6"]: response.data.image_name,
            
            });
            setImgDivC6(true);
            setImgData6(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage6=(banner_image6)=>{
        // alert(propertycoverimage);
        setBannerImage6({...BannerImage6,[banner_image6]:""});
        setPictureDis6(false);
    }

    const OnSubmitBN6=async(e)=>{
        e.preventDefault();
        setDisableButton6(true); 
        document.getElementById("img_gif_loading_btn6").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage6InformationAddAndUpdate",{
                "banner_image_name_6": banner_image_name_6,
                "banner_image_tittle_6": banner_image_tittle_6
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton6(false);
                    document.getElementById("img_gif_loading_btn6").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton6(false);
                    document.getElementById("img_gif_loading_btn6").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton6(false);
                    document.getElementById("img_gif_loading_btn6").style.display="none";
                });
    }

// -----------------------------------------------------------Banner Image 7----------------------------------------------------------
    const[BannerImage7,setBannerImage7]=useState({
        banner_image_name_7: "",
        banner_image_tittle_7: ""
    });

    const{
        banner_image_name_7,
        banner_image_tittle_7
    }=BannerImage7;

    const OnInputChangeBN7=(e)=>{
        console.log(e.target.value);
        setBannerImage7({...BannerImage7,[e.target.name]:e.target.value});
    }

    const [picture7, setPicture7] = useState(null);
    const [imgData7, setImgData7] = useState(null);
    const [PictureDis7, setPictureDis7] = useState(null);
    var image7="";
    const[imgdivc7,setImgDivC7]=useState(false);

    const onChangePictureBN7 = (e) => {
        if (e.target.files[0]) {
        setPicture7(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image7=a;  
            var image_name7=e.target.name;
            UploadImage7(image7,image_name7);
            console.log("Property Cover Image Name:" +image_name7); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage7=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis7(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_7"){

            setBannerImage7({ ...BannerImage7, 
            ["banner_image_name_7"]: response.data.image_name,
            
            });
            setImgDivC7(true);
            setImgData7(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage7=(banner_image7)=>{
        // alert(propertycoverimage);
        setBannerImage7({...BannerImage7,[banner_image7]:""});
        setPictureDis7(false);
    }

    const OnSubmitBN7=async(e)=>{
        e.preventDefault();
        setDisableButton7(true); 
        document.getElementById("img_gif_loading_btn7").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage7InformationAddAndUpdate",{
                "banner_image_name_7": banner_image_name_7,
                "banner_image_tittle_7": banner_image_tittle_7
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton7(false);
                    document.getElementById("img_gif_loading_btn7").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton7(false);
                    document.getElementById("img_gif_loading_btn7").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton7(false);
                    document.getElementById("img_gif_loading_btn7").style.display="none";
                });
    }

// -----------------------------------------------------------Banner Image 8----------------------------------------------------------
    const[BannerImage8,setBannerImage8]=useState({
        banner_image_name_8: "",
        banner_image_tittle_8: ""
    });

    const{
        banner_image_name_8,
        banner_image_tittle_8
    }=BannerImage8;

    const OnInputChangeBN8=(e)=>{
        console.log(e.target.value);
        setBannerImage8({...BannerImage8,[e.target.name]:e.target.value});
    }

    const [picture8, setPicture8] = useState(null);
    const [imgData8, setImgData8] = useState(null);
    const [PictureDis8, setPictureDis8] = useState(null);
    var image8="";
    const[imgdivc8,setImgDivC8]=useState(false);

    const onChangePictureBN8 = (e) => {
        if (e.target.files[0]) {
        setPicture8(e.target.files[0]);
        var b1=e.target.files[0].name;
        
        const reader = new FileReader();
        reader.addEventListener("load", () => {            
            var b=reader.result; 
            var a=reader.result.split(',')[1];
            image8=a;  
            var image_name8=e.target.name;
            UploadImage8(image8,image_name8);
            console.log("Property Cover Image Name:" +image_name8); 
        });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const UploadImage8=async(cover_image,image_name)=>{
        
        console.log(image_name);
        console.log("UPload image api");
        var list={};
        list["image_base64_string"]=cover_image;
        list["image_for"]="PROPERTY";
        
        await axios.post(process.env.REACT_APP_API+"UploadImage",list).then(response=>{
        console.log(response);
        setPictureDis8(true);
        console.log("imagename");
        var img11=process.env.REACT_APP_DOCUMENTS_PATH+response.data.image_name;
        console.log(response.data.image_name);
        if(image_name==="banner_image_name_8"){

            setBannerImage8({ ...BannerImage8, 
            ["banner_image_name_8"]: response.data.image_name,
            
            });
            setImgDivC8(true);
            setImgData8(img11);
        }
        }).catch(error=>{
        console.log(error);
        })
    }

    const Removeimage8=(banner_image8)=>{
        // alert(propertycoverimage);
        setBannerImage8({...BannerImage8,[banner_image8]:""});
        setPictureDis8(false);
    }

    const OnSubmitBN8=async(e)=>{
        e.preventDefault();
        setDisableButton8(true); 
        document.getElementById("img_gif_loading_btn8").style.display="block"; 
            await axios.post(process.env.REACT_APP_API+"BannerImage8InformationAddAndUpdate",{
                "banner_image_name_8": banner_image_name_8,
                "banner_image_tittle_8": banner_image_tittle_8
            }).then(response=>{
                console.log(response);
                if(response.data.is_success){
                    toast.success(response.data.msg);
                    setWarnings({["warning"]:""});
                    //history.push(`/project-list`);
                    setDisableButton8(false);
                    document.getElementById("img_gif_loading_btn8").style.display="none";
                }
                else{
                    
                    setWarnings({["warning"]:response.data.msg});
                    setDisableButton8(false);
                    document.getElementById("img_gif_loading_btn8").style.display="none";
                    }
                }).catch(
                error=>{
                    console.log(error);
                    alert(error.message);
                    setDisableButton8(false);
                    document.getElementById("img_gif_loading_btn8").style.display="none";
                });
    }

return(
<>
<div  style={{paddingRight:"30px",paddingLeft:"30px",paddingTop:"30px"}}>
<h3 className='fontweight' style={{color:"black"}}>Add Banner Image </h3>
<hr className="bgclr" style={{height:"3px"}}/>
<CForm>
{/* -----------------------------------------------------------Banner Image 1---------------------------------------------------------- */}
    <CRow className="mt-2">      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 1</u></h5>
            <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text'
            placeholder='Title'
            name='banner_image_tittle_1'
            value={banner_image_tittle_1}
            onChange={(e)=>OnInputChangeBN1(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_1"
                        onChange={(e)=>onChangePictureBN1(e)}
                    ></CInput>
                </div>       

                <br></br> 
                {PictureDis?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_1}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage1("banner_image_name_1")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit"
                onClick={(e)=>OnSubmitBN1(e)}
                disabled={disablebutton1}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn1" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 2---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 2</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput 
            type='text' 
            placeholder='Title'
            name='banner_image_tittle_2'
            value={banner_image_tittle_2}
            onChange={(e)=>OnInputChangeBN2(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_2"
                        onChange={(e)=>onChangePictureBN2(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis2?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_2}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage2("banner_image_name_2")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN2(e)}
                disabled={disablebutton2}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn2" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 3---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 3</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text'
            placeholder='Title'
            name='banner_image_tittle_3'
            value={banner_image_tittle_3}
            onChange={(e)=>OnInputChangeBN3(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_3"
                        onChange={(e)=>onChangePictureBN3(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis3?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_3}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage3("banner_image_name_3")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN3(e)}
                disabled={disablebutton3}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn3" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 4---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 4</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text' 
            placeholder='Title'
            name='banner_image_tittle_4'
            value={banner_image_tittle_4}
            onChange={(e)=>OnInputChangeBN4(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_4"
                        onChange={(e)=>onChangePictureBN4(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis4?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_4}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage4("banner_image_name_4")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN4(e)}
                disabled={disablebutton4}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn4" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 5---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 5</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Title'
            name='banner_image_tittle_5'
            value={banner_image_tittle_5}
            onChange={(e)=>OnInputChangeBN5(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_5"
                        onChange={(e)=>onChangePictureBN5(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis5?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_5}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage5("banner_image_name_5")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN5(e)}
                disabled={disablebutton5}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn5" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 6---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 6</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Title'
            name='banner_image_tittle_6'
            value={banner_image_tittle_6}
            onChange={(e)=>OnInputChangeBN6(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_6"
                        onChange={(e)=>onChangePictureBN6(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis6?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_6}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage6("banner_image_name_6")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN6(e)}
                disabled={disablebutton6}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn6" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 7---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 7</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Title'
            name='banner_image_tittle_7'
            value={banner_image_tittle_7}
            onChange={(e)=>OnInputChangeBN7(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_7"
                        onChange={(e)=>onChangePictureBN7(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis7?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_7}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>
                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage7("banner_image_name_7")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN7(e)}
                disabled={disablebutton7}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn7" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>

    <hr className="bgclr" style={{height:"3px"}}/>
{/* -----------------------------------------------------------Banner Image 8---------------------------------------------------------- */}
    <CRow>      
        <CCol xs="12" sm="3" md="3" lg="3">
        <h5 className='fontweight' style={{color:"black"}}><u>Banner Image: 8</u></h5>
        <CLabel className='fontweight' style={{color:"black", fontSize:"15px"}}>Title<span className="red">*</span></CLabel>
            <CInput type='text' placeholder='Title'
            name='banner_image_tittle_8'
            value={banner_image_tittle_8}
            onChange={(e)=>OnInputChangeBN8(e)}
            ></CInput>            
        </CCol>

        <CCol xs="12" sm="3" md="3" lg="3" >
            <CLabel className='fontweight mt-4' style={{color:"black", fontSize:"15px"}} >Upload Image</CLabel>
                <div className="div mt-2" style={{fontSize:"15px", fontWeight:""}}>
                    Upload Image
                    <CInput type="file" className="hide-file"
                        name="banner_image_name_8"
                        onChange={(e)=>onChangePictureBN8(e)}
                    ></CInput>
                </div>       
                <br></br> 
                {PictureDis8?<div>
                    <CFormGroup>
                        <img className="playerProfilePic_home_tile mt-2" 
                        src={process.env.REACT_APP_DOCUMENTS_PATH+banner_image_name_8}
                        //src={process.env.PUBLIC_URL+'/avatars/logsvp.webp'}
                        style={{width:"100%",height:"100px",marginTop:"5px", }}/>
                    </CFormGroup>

                    <CFormGroup>
                    <CButton  className="bgcyan white ml-1" 
                    onClick={()=>Removeimage8("banner_image_name_8")}
                    ><i className="fa fa-close"></i></CButton>
                    </CFormGroup>
                </div>:null}
        </CCol>
        
        <CCol xs="12" sm="3" md="3" lg="3" className="mt-5">
            <div className="mt-3  bgblue1" style={{borderRadius:"5px"}}>
                <CButton type="submit" 
                onClick={(e)=>OnSubmitBN8(e)}
                disabled={disablebutton8}
                style={{width:"100%",color:"white", fontWeight:"bold", fontSize:"15px"}} >Save</CButton>
                <img id="img_gif_loading_btn8" src={process.env.PUBLIC_URL+'/avatars/gif_loading.gif'} style={{width: "20px",marginTop:"-26px",float:"right",marginRight: "10px",display:"none"}}/>
            </div>
            {warnings.warning&&<p className="red">{warnings.warning}</p>}
        </CCol>
        
    </CRow>
    <hr className="bgclr" style={{height:"3px"}}/>
</CForm>
</div>
</>
)
}
export default BannerImageAdd;