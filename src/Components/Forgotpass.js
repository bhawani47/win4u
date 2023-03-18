import React, { useState, useRef, useEffect } from 'react'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Header from './Header';
import Lock from '../images/Lock.png'
import flag from '../images/indian-flage.png';
import Verification from '../images/Verification.png';
import Open from '../images/openeye.png';
import Close from '../images/closeeye.png';
import { useNavigate } from 'react-router';
import AuthUser from './AuthUser.js';


const Forgotpass = () => {
    
    const [formData,setFormData] = useState({
        mobile:'',
        loginPassword:'',
        otp:''
    });
    const [errorMessage, setErrorMessage] = useState('Please enter valid details');
    let [numberRef,loginPassRef,otpRef] = [useRef(),useRef(),useRef(),useRef(),useRef()];
    let [numberErrorRef,loginErrorPassRef,otpErrorRef] = [useRef(),useRef(),useRef(),useRef(),useRef()];
    let otpRefBtn = useRef();
    const navigate = useNavigate();
    let counter;

    const [eyeIcon, setEyeIcon] = useState(Open);
    document.body.style.background = "#f1f1f1";

   const ShowHidePass = ()=>{
       if(document.getElementById("password").type==="password"){
           document.getElementById("password").type="text";
           setEyeIcon(Close);
       }else{
        document.getElementById("password").type="password";
        setEyeIcon(Open);
       }
   }

   const toastMessage = (message)=>{
    document.getElementById('toaster').firstChild.innerHTML = message;
    document.getElementById('toaster').classList.remove('hide-submenu');
    document.getElementById('toaster').classList.add('show-submenu');
    setTimeout(()=>{
      document.getElementById('toaster').classList.remove('show-submenu');
      document.getElementById('toaster').classList.add('hide-submenu');
    },2000)
  }

    const hanldeSubmit = ()=>{
        if(formData.mobile.trim().length!==10){
            setErrorMessage('Please enter valid number !');
            numberRef.current.classList.add('input-error');
            numberErrorRef.current.classList.remove('invisible');
            numberErrorRef.current.classList.add('visible');
            return;
        }
        if(formData.loginPassword.trim().length<6){
            setErrorMessage('Minimum length of password must be 6 characters !');
            loginPassRef.current.classList.add('input-error');
            loginErrorPassRef.current.classList.remove('invisible');
            loginErrorPassRef.current.classList.add('visible');
            return;
        }
        if(formData.otp.trim().length!==6){
            setErrorMessage('Please enter valid otp !');
             otpRef.current.classList.add('input-error');
             otpErrorRef.current.classList.remove('invisible');
             otpErrorRef.current.classList.add('visible');
             return;
         }
     fetch('https://winbackend.onrender.com/api/submitforgot',{
         method:'post',
         body:JSON.stringify(formData),
         headers:{
             'Content-Type':'application/json'
         }
     }).then((data)=>data.json()).then((finalData)=>{
        if(finalData.message === 'OTP_EXPIRED'){
            toastMessage('OTP has been expired ');
            return;
        }
        if(finalData.message === 'INVALID_OTP'){
            toastMessage('Invalid OTP');
            return;
        }
        if(finalData.message === 'OTP_NOT_AVAILABLE'){
            toastMessage('Please send OTP');
            return;
        }
        navigate('/login');
     })

    }

    const RemoveError = (inputEle,messageEle)=>{
        inputEle.classList.remove('input-error');
        messageEle.classList.add('invisible');
    }

    const SendOtp = (e)=>{
        //checks user inputs 
        if(formData.mobile.trim().length!==10){
            setErrorMessage('Please enter valid number !');
            numberRef.current.classList.add('input-error');
            numberErrorRef.current.classList.remove('invisible');
            numberErrorRef.current.classList.add('visible');
            return;
        }
        if(formData.loginPassword.trim().length<6){
            setErrorMessage('Minimum length of password must be 6 characters !');
            loginPassRef.current.classList.add('input-error');
            loginErrorPassRef.current.classList.remove('invisible');
            loginErrorPassRef.current.classList.add('visible');
            return;
        }
    
        let sec = 60;
    
        if(e.target.innerHTML === 'OTP'){
        document.getElementById('otpSend').disabled = true;
        //calling api here only !
        counter =  setInterval(()=>{
           if(sec>0){
               sec--;
               otpRefBtn.current.innerHTML = "Wait "+sec;
           }else{
               otpRefBtn.current.innerHTML = "Resend OTP";
            document.getElementById('otpSend').disabled = false;
            clearInterval(counter);
            sec=60;
           }
        },1000);
    
        }else{
          //resend otp
        document.getElementById('otpSend').disabled = true;
        //calling api here on this line 
          counter =  setInterval(()=>{
            if(sec>0){
                sec--;
            otpRefBtn.current.innerHTML = "Wait "+sec;
            }else{
             otpRefBtn.current.innerHTML = "Resend OTP";
             document.getElementById('otpSend').disabled = false;
             clearInterval(counter);
             sec=60;
            }
         },1000);
        }

        fetch('https://winbackend.onrender.com/api/forgotsend',{
             method:'post',
             body:JSON.stringify({mobile:formData.mobile}),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then((data)=>data.json()).then((finalData)=>{
             if(finalData.message === 'OTP_SENT'){
                toastMessage('OTP sent successfully ');
                 return;
             }
             if(finalData.message === 'TIME_ERROR'){
                toastMessage('Please wait 1 minute');
                clearInterval(counter);
                otpRefBtn.current.innerHTML = "OTP";
                document.getElementById('otpSend').disabled = false;
                return;
              }
            if(finalData.message === 'INVALID_DATA'){
                toastMessage('User not registered');
                clearInterval(counter);
                otpRefBtn.current.innerHTML = "OTP";
                document.getElementById('otpSend').disabled = false;
                return;
              }
         });
    }
    

    const handleChange = (e)=>{
     setFormData({...formData,[e.target.name]:e.target.value});
    }


    const navigateToLogin = ()=>{
        clearInterval(counter);
        navigate('/login');
    }
    
    const navigateToSignup = ()=>{
        clearInterval(counter);
        navigate('/');
    }

    useEffect(()=>{
        AuthUser().then((data)=>{
          if(data.message){
           navigate('/home');
          }
        });
       },[])
    
  return (
    <>
    <div className="header">
    <div id="toaster" className="loading-box flex flex-col justify-center hide-submenu recharge-error">
      <div className="text-white text-center mr-[10px] text-[12px] mt-[20px]"></div>
    </div>
    <div onClick={navigateToLogin}><div className="pl-[10px]"><ArrowBackIosNewRoundedIcon/></div></div>
    <div className="text-[18px]">Forgot Password</div>
    <div className="pr-[10px]"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>



    <div ref={numberRef} className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="flex flex-row">
    <div className="w-[20px] h-[20px] mt-[3px]"><img src={flag} alt="INR"/></div>
    <div>+91</div>
    </div>
        <input  name='mobile' value={formData.mobile} onFocus={()=>RemoveError(numberRef.current,numberErrorRef.current)} onChange={handleChange} className="input-amount" placeholder="Mobile Number" type="number" autoComplete="off" />
    </div>

    <div ref={numberErrorRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>
    

    <div ref={loginPassRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[25px] h-[20px]" > 
    <img src={Lock} alt="INR"/>
    </div>
        <input id="password" onFocus={()=>RemoveError(loginPassRef.current,loginErrorPassRef.current)} name='loginPassword' value={formData.loginPassword} onChange={handleChange} className="input-amount" placeholder="New Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img className="invert-[.50]" onClick={ShowHidePass} src={eyeIcon} alt="show"/>
    </div>
    </div>

    <div ref={loginErrorPassRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    <div ref={otpRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[30px] h-[20px] "> <img src={Verification} alt="INR"/></div>
        <input name='otp' onFocus={()=>RemoveError(otpRef.current,otpErrorRef.current)} className="input-amount" value={formData.otp} onChange={handleChange} placeholder="Verification Code" type="number" autoComplete="off" />
    <button ref={otpRefBtn} id="otpSend" onClick={SendOtp} className="bg-[#e8f0fe] h-[38px] w-[100px] flex flex-row justify-center items-center rounded-[5px] text-[14px]">OTP</button>
    </div>

    <div ref={otpErrorRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>
    
    
    <div  onClick={hanldeSubmit}  className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px]">
    <div className="text-[14px] font-bold">Submit</div>
   </div>

   <div className="flex flex-row justify-around mt-[20px] ">
     <div onClick={navigateToLogin} className="copy-button bg-white font-bold">
       <div style={{borderBottom:"1px solid red"}} className="">Login</div>
       </div>

    <div onClick={navigateToSignup} className="copy-button bg-white font-bold">
     <div>Register</div>
     </div>
    </div>


    </>
  )
}

export default Forgotpass