import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Components/Header';
import Lock from '../images/Lock.png';
import Open from '../images/openeye.png';
import Close from '../images/closeeye.png';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const ResetPass = () => {
 
  const [loading, setLoading] = useState('');
  const [formData, setFormData] = useState({
    oldPass:'',
    newPass:'',
    repeatnewpass:''
  })
  const [eye,setEye] = useState({
    eye1:[Open,'open'],
    eye2:[Open,'open'],
    eye3:[Open,'open']
  });
  const navigate = useNavigate();

  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');
  const toastMessage = (message)=>{
    document.getElementById('toaster').firstChild.innerHTML = message;
    document.getElementById('toaster').classList.remove('hide-submenu');
    document.getElementById('toaster').classList.add('show-submenu');
    setTimeout(()=>{
      document.getElementById('toaster').classList.remove('show-submenu');
      document.getElementById('toaster').classList.add('hide-submenu');
    },2000)
    }
   const handleChange = (e)=>{
   setFormData({...formData, [e.target.name]:e.target.value});
    }


  const hanldeSubmit = ()=>{

    if(formData.oldPass.trim().length<6){
      toastMessage("please enter valid old password ");
      return;
    }
    if(formData.newPass.trim().length<6 || formData.repeatnewpass.trim().length<6){
      toastMessage("password length must be 6 characters atleast ");
      return;
    }
    if(formData.newPass.trim() !== formData.repeatnewpass.trim()){
      toastMessage("New Password does not matched !");
      return;
    }
  
  fetch('https://winbackend.onrender.com/api/resetpass',{
    method:'post',
    body:JSON.stringify({oldPass:formData.oldPass,newPass:formData.newPass}),
    headers:{
      'Content-Type':'application/json',
      "Authorization":`Bearer ${token}`
    }
  }).then((data)=>data.json()).then((finalData)=>{
    if(finalData.message === 'FAILED'){
      toastMessage('Invalid login password');
      return;
    }

    if (finalData.message === 'success') {
      toastMessage('Password Reset Successfully ');
      setFormData({
          oldPass:'',
          newPass:'',
          repeatnewpass:''
        });
      return;
    }
  })


  }

  const ShowHidePass = (e)=>{
    let status = '';
    let obj = e.target.id;
   if (eye[obj][1]==='open') {
    status = 'close';
    setEye({...eye,[e.target.id]:[Close,status]});
    e.target.parentElement.previousSibling.type="text";
    }else{
    status = 'open';
    setEye({...eye,[e.target.id]:[Open,status]});
    e.target.parentElement.previousSibling.type="password";
   }
  }

  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }
    setLoading('some');
    });
   },[])


  return (
    <>
    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
   <Header back="/account" title="Reset Password" />
   <div className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[20px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input name="oldPass" value={formData.oldPass} onChange={handleChange} className="input-amount" placeholder="Enter Old Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img id="eye1" className="invert-[.50]" onClick={ShowHidePass} src={eye.eye1[0]} alt="show"/>
    </div>
    </div>
    <div className="flex flex-row mt-[15px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[20px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input name="newPass" value={formData.newPass} onChange={handleChange} className="input-amount" placeholder="Enter Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img id="eye2" className="invert-[.50]" onClick={ShowHidePass} src={eye.eye2[0]} alt="show1"/>
    </div>
    </div> 
    <div className="flex flex-row mt-[15px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[20px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input name="repeatnewpass" value={formData.repeatnewpass} onChange={handleChange} className="input-amount" placeholder="Confirm Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img id="eye3" className="invert-[.50]" onClick={ShowHidePass} src={eye.eye3[0]} alt="show2"/>
    </div>
    </div>
    <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[20px]">
    <div className="text-[14px] font-bold">Submit</div>
   </div>
    </>
  )
}

export default ResetPass