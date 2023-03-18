import React, {useState, useEffect,useRef} from 'react'
import Header from './Header'
import Lock from '../images/Lock.png'
import flag from '../images/indian-flage.png';
import Verification from '../images/Verification.png';
import Refer from '../images/Refer.png';
import Open from '../images/openeye.png';
import Close from '../images/closeeye.png';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const Signup = () => {

  const [loading, setLoading] = useState('');
  const [formData,setFormData] = useState({
      mobile:'',
      loginPassword:'',
      withdrawPassword:'',
      inviteCode:'',
      otp:''
  });
  const [errorMessage, setErrorMessage] = useState('Please enter valid details');
  const [eyeIcon1, setEyeIcon1] = useState(Open);
  const [eyeIcon2, setEyeIcon2] = useState(Open);
  const [disableSubmit,setDisableSubmit] = useState(false);
  let otpRefBtn = useRef();
  const toastRef = useRef();
  let [numberRef,loginPassRef,withdraPassRef,inviteCodeRef,otpRef] = [useRef(),useRef(),useRef(),useRef(),useRef()];
  let [numberErrorRef,loginErrorPassRef,withdraErrorPassRef,inviteCodeErrorRef,otpErrorRef] = [useRef(),useRef(),useRef(),useRef(),useRef()];
  const navigate = useNavigate();
  let counter;
  
    document.body.style.background = "#f1f1f1";
    const ShowHidePass = (e)=>{
        let elem = e.target.parentElement.previousSibling;
        if(elem.type==="password"){
            if(elem.id==="password1"){
                setEyeIcon1(Close);
            }else{
                setEyeIcon2(Close)
            } 
            elem.type="text";
        }else{
            elem.type="password";
            if(elem.id==="password1"){
                setEyeIcon1(Open);
            }else{
                setEyeIcon2(Open)
            }
        }

    }

    const hanldeChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
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
        if(formData.withdrawPassword.trim().length<6){
        setErrorMessage('Minimum length of password must be 6 characters !');
            withdraPassRef.current.classList.add('input-error');
            withdraErrorPassRef.current.classList.remove('invisible');
            withdraErrorPassRef.current.classList.add('visible');
            return;
        }

        let sec = 60;

        if(e.target.innerHTML === 'OTP'){
        document.getElementById('otpSend').disabled = true;
        counter =  setInterval(()=>{
        if(sec>0){
            sec--;
            if(!otpRefBtn.current){
                clearInterval(counter);
                return;
            }
            otpRefBtn.current.innerHTML = "Wait "+sec;
        }else{
            if(!otpRefBtn.current){
                clearInterval(counter);
                return;
            }
            otpRefBtn.current.innerHTML = "Resend OTP";
            document.getElementById('otpSend').disabled = false;
            clearInterval(counter);
            sec=60;
        }
        },1000);

        }else{
        document.getElementById('otpSend').disabled = true;
        counter =  setInterval(()=>{
            if(sec>0){
                sec--;
                if(!otpRefBtn.current){
                    clearInterval(counter);
                    return;
                }
                otpRefBtn.current.innerHTML = "Wait "+sec;
            }else{
                if(!otpRefBtn.current){
                    clearInterval(counter);
                    return;
                }
            otpRefBtn.current.innerHTML = "Resend OTP";
            document.getElementById('otpSend').disabled = false;
            clearInterval(counter);
            sec=60;
            }
        },1000);
        }
       
        fetch('https://winbackend.onrender.com/api/sendotp',{
            method:'post',
            body:JSON.stringify({mobile:formData.mobile}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((data)=>{
            return data.json();
        }).then((finalData)=>{

            if(finalData.message === 'OTP_SENT'){
                toastMessage("OTP sent successfully ");
                return;
            }
            if(finalData.message === 'TIME_ERROR'){
                toastMessage("Please wait 1 Minute");
                clearInterval(counter);
                otpRefBtn.current.innerHTML = "OTP";
                document.getElementById('otpSend').disabled = false;
                return;
            }
            if(finalData.message === 'USER_EXIST'){
                toastMessage("User is already registered please login ");
                clearInterval(counter);
                otpRefBtn.current.innerHTML = "OTP";
                document.getElementById('otpSend').disabled = false;
                return;
            }
        });  
    }

    const handleSubmit = (e)=>{
        if(!disableSubmit){
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
            if(formData.withdrawPassword.trim().length<6){
               setErrorMessage('Minimum length of password must be 6 characters !');
                withdraPassRef.current.classList.add('input-error');
                withdraErrorPassRef.current.classList.remove('invisible');
                withdraErrorPassRef.current.classList.add('visible');
                return;
            }
            if(formData.otp.trim().length!==6){
                setErrorMessage('Please enter valid otp !');
                otpRef.current.classList.add('input-error');
                otpErrorRef.current.classList.remove('invisible');
                otpErrorRef.current.classList.add('visible');
                return;
            }

            setDisableSubmit(true);    
            fetch('https://winbackend.onrender.com/api/register',{
                method:"post",
                body:JSON.stringify(formData),
                headers:{
                    'Content-type':'application/json'
                }
            }).then((data)=>data.json()).then((finalData)=>{
                if (finalData.message === 'USER_EXIST') {
                    toastMessage('User already registered please login ');
                    setDisableSubmit(false);
                    return;
                }
                if (finalData.message === 'OTP_EXPIRED') {
                    toastMessage('OTP has been expired please resend');
                    setDisableSubmit(false);
                    return;
                }
                if(finalData.message==="VERIFIED"){
                    localStorage.setItem('token',finalData.token);
                    localStorage.setItem('refercode',finalData.ReferCode);
                    navigateToHome();
                    return;
                }
                if (finalData.message === "INVALID_OTP") {
                    //toast here
                    toastMessage('Invalid OTP ');
                    setDisableSubmit(false);
                    return;
                }
            });
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



    const RemoveError = (inputEle,messageEle)=>{
        inputEle.classList.remove('input-error');
        messageEle.classList.add('invisible');
    }

    
   const navigateToLogin = ()=>{
    clearInterval(counter);
    navigate('/login')
   }

    
    const navigateToHome = ()=>{
        clearInterval(counter);
        navigate('/home');
    }
    const navigateToForgot = ()=>{
        clearInterval(counter);
        navigate('/forgot')
    }
     
    useEffect(()=>{
        if(typeof document.URL.split('?')[1]==='undefined'){
            setFormData({...formData, inviteCode:''});
         }else{
            if(typeof (document.URL.split('?')[1]).split('=')[1]==='undefined'){
            setFormData({...formData, inviteCode:''});
            }else{
            setFormData({...formData, inviteCode:(document.URL.split('?')[1]).split('=')[1]});
            } 
         }
         
         AuthUser().then((data)=>{
            if(data.message){
             navigate('/home');
            }
            setLoading('some');
          });


    },[]);


  return (
    <> 
    <Header back="/login" title="Register"/>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    
    <div id="toaster" ref={toastRef} className="loading-box flex flex-col justify-center hide-submenu recharge-error">
      <div className="text-white text-center mr-[10px] text-[12px] mt-[20px]">Minimum Amount Must be 100 </div>
    </div>

    <div ref={numberRef} className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="flex flex-row">
    <div className="w-[20px] h-[20px] mt-[3px]"><img src={flag} alt="INR"/></div>
    <div>+91</div>
    </div>
        <input onFocus={()=>RemoveError(numberRef.current,numberErrorRef.current)} value={formData.mobile} onChange={hanldeChange} className="input-amount" name="mobile" placeholder="Mobile Number" type="number" autoComplete="off" />
    </div>
    <div ref={numberErrorRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    <div ref={loginPassRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
   <div className="w-[25px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input id="password1" onFocus={()=>RemoveError(loginPassRef.current,loginErrorPassRef.current)} value={formData.loginPassword} onChange={hanldeChange} name="loginPassword" className="input-amount" placeholder="Login Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img className="invert-[.50]" onClick={ShowHidePass} src={eyeIcon1} alt="show"/>
    </div>
    </div>

    <div ref={loginErrorPassRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    <div ref={withdraPassRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[25px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input  id="password2" onFocus={()=>RemoveError(withdraPassRef.current,withdraErrorPassRef.current)} value={formData.withdrawPassword} onChange={hanldeChange} name="withdrawPassword" className="input-amount" placeholder="Withdraw Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img className="invert-[.50]" onClick={ShowHidePass} src={eyeIcon2} alt="show"/>
    </div>
    </div>

    <div ref={withdraErrorPassRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    <div ref={inviteCodeRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[20px] h-[20px] "> <img src={Refer} alt="INR"/></div>
        <input onFocus={()=>RemoveError(inviteCodeRef.current,inviteCodeErrorRef.current)} value={formData.inviteCode} onChange={hanldeChange} className="input-amount" name="inviteCode" placeholder="Invite Code" type="text" autoComplete="off" />
    </div>

    <div ref={inviteCodeErrorRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    <div ref={otpRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[30px] h-[20px] "> <img src={Verification} alt="INR"/></div>
        <input onFocus={()=>RemoveError(otpRef.current,otpErrorRef.current)} value={formData.otp} onChange={hanldeChange} className="input-amount" name="otp" placeholder="Verification Code" type="number" autoComplete="off" />
        <button ref={otpRefBtn} id="otpSend" onClick={SendOtp} className="bg-[#e8f0fe] h-[38px] w-[100px] flex flex-row justify-center items-center rounded-[5px] text-[14px]">OTP</button>
    </div>

    <div ref={otpErrorRef} className="text-[8px] px-[20px] text-red-500 invisible" >{errorMessage}</div>

    <div onClick={handleSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px]">
    <div className="text-[14px] font-bold">Register </div>
   </div>

   <div className="flex flex-row justify-around mt-[20px] ">
     <div onClick={navigateToLogin} className="copy-button bg-white font-bold">
       <div style={{borderBottom:"1px solid red"}} className="">Login</div>
       </div>

    <div onClick={navigateToForgot} className="copy-button bg-white font-bold">
     <div>Forgot Password</div>
     </div>
    </div>

    </>
  )
}

export default Signup