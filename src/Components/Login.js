import React, {useState, useRef, useEffect} from 'react'
import Header from './Header'
import Lock from '../images/Lock.png'
import flag from '../images/indian-flage.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Open from '../images/openeye.png';
import Close from '../images/closeeye.png';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const Login = () => {

  const [loading, setLoading] = useState('');
  const [formData,setFormData] = useState({
      mobile:'',
      loginPassword:''
   });

  const [eyeIcon, setEyeIcon] = useState(Open);
  let [numberRef,loginPassRef] = [useRef(),useRef()];
  let [numberErrorRef,loginErrorPassRef] = [useRef(),useRef()];

  const [errorMessage, setErrorMessage] = useState('Please enter valid details');
  const navigate = useNavigate();
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


  const handleChange = (e)=>{
       setFormData({...formData,[e.target.name]:e.target.value});
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

  fetch('https://winbackend.onrender.com/api/login',{
    method:'post',
    body:JSON.stringify(formData),
    headers :{
      'Content-Type':'application/json'
    }
    }).then((data)=>data.json()).then((finalData)=>{
      if (finalData.message === 'INVALID_DATA') {
        toastMessage('Please enter valid Number or Password');
        return;
      }
      if(finalData.message === 'VERIFIED'){
        localStorage.setItem('token',finalData.token);
        localStorage.setItem('refercode',finalData.ReferCode);
        navigate('/home');
        return;
      }
    })
  


  }

  const RemoveError = (inputEle,messageEle)=>{
    inputEle.classList.remove('input-error');
    messageEle.classList.add('invisible');
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

   useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }else{
      navigate('/home');
      }
    setLoading('some');
    });
   },[])

  return (
    <> 
    <Header back="/login" title="Login"/>
    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div ref={numberRef} className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="flex flex-row">
    <div className="w-[20px] h-[20px] mt-[3px]"><img src={flag} alt="INR"/></div>
    <div>+91</div>
    </div>
        <input name="mobile" value={formData.mobile} onChange={handleChange} onFocus={()=>RemoveError(numberRef.current,numberErrorRef.current)} className="input-amount" placeholder="Mobile Number" type="number" autoComplete="off" />
    </div>
    <div ref={numberErrorRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>
    
    <div ref={loginPassRef} className="flex flex-row py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[25px] h-[20px] "> 
    <img src={Lock} alt="INR"/></div>
        <input id="password" name="loginPassword" value={formData.loginPassword} onChange={handleChange} onFocus={()=>RemoveError(loginPassRef.current,loginErrorPassRef.current)} className="input-amount" placeholder="Login Password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img className="invert-[.50]" onClick={ShowHidePass} src={eyeIcon} alt="show"/>
    </div>
    </div>
    
    <div ref={loginErrorPassRef} className="text-[8px] px-[20px] text-red-500 invisible">{errorMessage}</div>

    
    <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px]">
    <div className="text-[14px] font-bold">Login </div>
   </div>

   <div className="flex flex-row justify-around mt-[20px] ">
     <NavLink to="/" className="copy-button bg-white font-bold">
       <div style={{borderBottom:"1px solid red"}} className="">Register</div>
       </NavLink>

    <NavLink to="/forgot" className="copy-button bg-white font-bold">
     <div>Forgot Password</div>
     </NavLink>
    </div>


    </>
  )
}

export default Login