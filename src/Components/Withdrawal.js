import React,{useState, useRef,useEffect} from 'react'
import { useNavigate } from 'react-router';
import Header from './Header'
import Amount from '../images/Amount2.png'
import select from '../images/select.png'
import Lock from '../images/Lock.png';
import Open from '../images/openeye.png';
import Close from '../images/closeeye.png';
import AuthUser from './AuthUser.js';
import { NavLink } from 'react-router-dom';
import Loading from '../images/loading.png';

const Withdrawal = () => {

  const [loading, setLoading] = useState('');
  const [formData, setFormData] = useState({
    password:'',
    amount:''
    });
  const [balance,setBalance] = useState('');
  const [eyeIcon, setEyeIcon] = useState(Open);
  const [bankDetail, setBankDetail] = useState('Select Account');
  const [upi,setUpi] = useState(0);
  const [bankAccount, setBankAccount] = useState(0);
  const methodRef = useRef();
  const chooseRef =  useRef();
  const methodAccountRef = useRef();
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [isDisabled,setIsDisabled] = useState(true);

  const navigate = useNavigate();
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

    const ShowHidePass = ()=>{
      if(document.getElementById("password").type==="password"){
          document.getElementById("password").type="text";
          setEyeIcon(Close);
      }else{
       document.getElementById("password").type="password";
       setEyeIcon(Open);
      }
     }

  document.body.style.background = "#f1f1f1";

  const openMethods = ()=>{
    methodRef.current.classList.remove('hide-submenu');  
    methodRef.current.classList.add('show-submenu');
    methodAccountRef.current.classList.add('hide-submenu');  
    methodAccountRef.current.classList.remove('show-submenu');  
  }

  const methodSelected = (method)=>{
    chooseRef.current.innerHTML = method;  
    methodRef.current.classList.add('hide-submenu');  
    methodRef.current.classList.remove('show-submenu'); 
    if (method==="Bank") {
      setBankDetail(bankAccount);
      setWithdrawMethod('BANK');
    }else{
      setBankDetail(upi);
      setWithdrawMethod('UPI');
    }
  }

  const selectAccount = ()=>{
    methodAccountRef.current.classList.remove('hide-submenu');  
    methodAccountRef.current.classList.add('show-submenu'); 
    methodRef.current.classList.add('hide-submenu');  
    methodRef.current.classList.remove('show-submenu'); 
  }

  const selectAccountDone = ()=>{
    methodAccountRef.current.classList.add('hide-submenu');  
    methodAccountRef.current.classList.remove('show-submenu'); 
    methodRef.current.classList.add('hide-submenu');  
    methodRef.current.classList.remove('show-submenu');
  }
  
  const hanldeChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  
  const hanldeChangeAm = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
   let note = document.getElementById('fee-not');
   if(e.target.value<230){
     note.innerHTML = 'Amount no longer withdrawal scope';
   }else{
     if(e.target.value<1000){
       note.innerHTML = `fee ${30}, bank ${parseInt(e.target.value) - 30}`;
     }else if(e.target.value<=50000){
       note.innerHTML = `fee ${Math.floor(parseInt(e.target.value)*3/100)}, bank ${Math.floor(parseInt(e.target.value)) - Math.floor((parseInt(e.target.value)*3/100))}`;
     }else{
      note.innerHTML = `Amount no longer withdrawal scope`;
     }
   }
  }

  const hanldeSubmit = ()=>{
    if(isDisabled){
    if(formData.amount<230){
      toastMessage('Minimum Amount must be 230 ');
      return;
    }

    if (balance<formData.amount) {
      toastMessage('Balance not available !');
      return;
    }
     
    if(bankDetail==="Select Account"){
      toastMessage('Please select account !');
      return;
    }

    if (formData.password.trim().length<6) {
      toastMessage('Please enter valid password !');
      return;
    }

    setIsDisabled(false);
    fetch('https://winbackend.onrender.com/api/withdraw',{
      method:'post',
      body:JSON.stringify({type:withdrawMethod,withdrawAmount:formData.amount,password:formData.password}),
      headers:{
        'Content-Type':'application/json',
        "Authorization":`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      console.log(finalData);
      if(finalData.message === 'success'){
        setBalance(parseInt(balance) - parseInt(formData.amount));
        toastMessage('Withdraw successfull');
        setIsDisabled(true);
      }
    });
  }
  }

  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }else{
        setBalance(data.wallet);
        setLoading('some');
      }
    });

   fetch('https://winbackend.onrender.com/api/getbankcard',{
       method:'get',
       headers:{
         'Content-Type':'application/json',
         "Authorization":`Bearer ${token}`
       }
   }).then((data)=>data.json()).then((finalData)=>{
     setUpi(finalData.upi);
     setBankAccount(finalData.bankAccount);
     setLoading('some');
   });

   },[]);

  return (
    
    <>
    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>
      {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
      <Header title="Withdrawal" back="/account" iconPath="/withdraw_record" icon="menu" />
    <div className="flex px-[20px] py-[10px] gap-[12px] bg-white mt-[5px]">
        <div className="text-[15px] mt-[5px] text-[#777]">Balance : </div>
        <div className="text-[20px]"> ₹ <span>{parseFloat(balance).toFixed(2)}</span></div>
    </div>

    <div className="flex flex-row mt-[20px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] withdrawal-input-shadow">
    <div className="w-[20px] h-[20px] "> <img src={Amount} alt="INR"/></div>
      <div className="flex flex-col"> 
        <input name="amount" value={formData.amount} onChange={hanldeChangeAm} className="input-amount" type="number" placeholder="Please input amount" autoComplete="off" />
        <div id="fee-not" className="text-[10px] text-[#999]"> Amount no longer withdrawal scope</div>
      </div>
    </div>


   <div className="flex flex-row mt-[20px] py-[10px] pl-[20px] text-[16px]">
     <div className="text-[16px] mt-[5px]">Choose to pay：</div>
     <div ref={chooseRef} onClick={openMethods} className="select-btn text-[#777]">Choose to pay</div>
    <NavLink to="/addbank"><div className="h-[30px] w-[30px] mt-[3px] ml-[10px]"><img src={select} alt="add bank"/></div></NavLink>
   </div>



<div ref={methodRef} className="payout-method hide-submenu">
   <div className="triangle-up"></div>
   <div className="picker-select">
     {bankAccount ? <div onClick={()=>methodSelected('Bank')} className="picker-item text-[#555]"> Bank Cash out </div> : <span></span> }
     {upi ? <div onClick={()=>methodSelected('UPI ')} className="picker-item text-[#555]"> UPI Cash out </div>: <span></span>}
     
   </div>
</div>

   <div className="flex flex-row mt-[10px] py-[10px] pl-[20px] text-[16px]">
     <div className="text-[16px] mt-[5px]">Select Account：</div>
     <div onClick={selectAccount} className="select-btn text-[#777]">{bankDetail.length<=10?bankDetail : bankDetail.substring(0,10)+'..'}</div>
   </div>


   <div ref={methodAccountRef} className="payout-method hide-submenu">
   <div className="triangle-up"></div>
   <div className="picker-select">
     <div onClick={selectAccountDone} className="picker-item text-[#555]"> {bankDetail}</div>
   </div>
    </div>
   <div className="flex flex-row mt-[8px] py-[10px] pl-[20px] text-[16px]">
     <div className="text-[16px] mt-[5px]">Enter Your Login Password </div>
   </div>
   <div className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
    <div className="w-[20px] h-[20px] "> <img src={Lock} alt="INR"/></div>
        <input id="password" name="password" onChange={hanldeChange} className="input-amount" value={formData.password} placeholder="Please input your login password" type="password" autoComplete="off" />
    <div className="w-[20px] h-[20px]" > 
        <img className="invert-[.50]" onClick={ShowHidePass} src={eyeIcon} alt="show"/>
    </div>
    </div>
    <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[20px]">
    <div className="text-[14px] font-bold">Withdraw</div>
   </div>

    </>
  )
}

export default Withdrawal;