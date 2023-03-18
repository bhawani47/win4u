import React , {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router';
import Header from './Header'
import Amount from '../images/Amount2.png';
import profileIcon from '../images/profileIcon.png';
import  Email from '../images/Email.png';
import  Refer from '../images/Refer.png';
import  flag from '../images/indian-flage.png';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';


const Recharge = () => {

  const [loading, setLoading] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [formData, setFormData] = useState({
    name:'',
    mobile:'',
    upi:'',
    email:''
  });
  const [rename,setRename] = useState('');
  const [remobile,setRemobile] = useState('');
  const [reupi, setReupi] = useState('');
  const [remail, setRemail] = useState('');
  const modelBackRef = useRef();
  const modelRef = useRef();
  const toastRef = useRef();
  const [wallet, setWallet] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  document.body.style.background = "#f1f1f1";

  const setAmount = (amount)=>{
    setRechargeAmount(amount);
  }

  const handleRecharge = ()=>{
     if(rechargeAmount<100){
       toastRef.current.classList.remove('hide-submenu');
       toastRef.current.classList.add('show-submenu');
      setTimeout(()=>{
       toastRef.current.classList.add('hide-submenu');
       toastRef.current.classList.remove('show-submenu');
      },2000);

     }else{
      modelBackRef.current.classList.remove('hide-submenu');
      modelBackRef.current.classList.add('show-submenu');
      modelRef.current.classList.remove('hide-submenu');
      modelRef.current.classList.add('show-submenu');
     }

  }

  const closeModal = ()=>{
    modelBackRef.current.classList.remove('show-submenu');
    modelBackRef.current.classList.add('hide-submenu');
    modelRef.current.classList.remove('show-submenu');
    modelRef.current.classList.add('hide-submenu');
    setFormData({
    name:rename,
    mobile:remobile,
    upi:reupi,
    email:remail
    })
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

  const recharge = ()=>{

    if(formData.name.trim().length===0){
      toastMessage('Please enter name !');
      return;
    }

   if(!validateEmail(formData.email)){
    toastMessage('Please enter valid email !');
     return;
   }
    if(formData.mobile.toString().trim().length!==10){
      toastMessage('Please enter valid mobile number !');
      return;
    }

   
    fetch('https://winbackend.onrender.com/api/recharge',{
      method:'post',
      body:JSON.stringify({name:formData.name, mobile:formData.mobile, upi:formData.upi, email:formData.email,rechargeAmount:rechargeAmount}),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      if(finalData.message === 'SERVER_ERROR'){
       closeModal();
       toastMessage('Server error please try later !');
      }else{
        window.open(`http://localhost:3002/${finalData.rechargeId}`,'_blank');
        closeModal();
      }
      
    })
  }

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const resetData = ()=>{
    setFormData({
      name:'',
      mobile:'',
      upi:'',
      email:''
    })
  }

  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }else{
        setWallet(data.wallet);
      }
    });

    fetch('https://winbackend.onrender.com/api/getkyc',{
      method:'get',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{

       if(typeof (finalData.name)   === 'undefined'){
        setFormData({
          name:'',
          mobile:'',
          upi:'',
          email:''
        });
        setRename('');
        setRemobile('');
        setReupi('');
        setRemail('');
       }else{
        setFormData(finalData);
        setRename(finalData.name);
        setRemobile(finalData.mobile);
        setReupi(finalData.upi);
        setRemail(finalData.email);
       }
       setLoading('some');
      });

   },[]);

  return (
    <>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div ref={toastRef} className="loading-box flex flex-col justify-center hide-submenu recharge-error">
      <div className="text-white text-center mr-[10px] text-[12px] mt-[20px]">Minimum Amount Must be 100 </div>
    </div>

    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
      <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>



    <div ref={modelBackRef} id="modal-background" className="modal-background hide-submenu"></div>
    <div ref={modelRef} className="modal-wrapper z-10 hide-submenu">
      <div className="text-white bg-[#2a67fe] text-[16px] flex relative items-center min-h-[64px] justify-center font-bold rounded-t-[5px]">Depositor Information</div>
      <div className="flex flex-col relative p-3 grow max-h-[400px] kyc-height bg-white rounded-b-[5px]">
        <div className="mb-[16px] w-[100%] flex flex-row flex-1 relative left text-[#333] text-[14px] p-[5px] gap-[10px] rounded-[3px] py-[8px] recharge-single-input">
          <div><img className="h-[20px] w-[23px]" src={profileIcon} alt="profile" /></div>
          <div><input name="name" value={formData.name} onChange={handleChange} className="input-amount" type="text" placeholder="Please input name" autoComplete="off"/></div>
        </div>

        <div className="mb-[16px] w-[100%] flex flex-row flex-1 relative left text-[#333] text-[14px] p-[5px] gap-[10px] rounded-[3px] py-[8px] recharge-single-input">
          <div><img className="h-[20px] w-[23px]" src={Email} alt="email" /></div>
          <div><input name="email" value={formData.email} onChange={handleChange} className="input-amount" type="text" placeholder="Please input email" autoComplete="off"/></div>
        </div>

        <div className="mb-[16px] w-[100%] flex flex-row flex-1 relative left text-[#333] text-[14px] p-[5px] gap-[10px] rounded-[3px] py-[8px] recharge-single-input">
          <div><img className="h-[20px] w-[23px]" src={Refer} alt="upi" /></div>
          <div><input name="upi" value={formData.upi} onChange={handleChange} className="input-amount" type="text" placeholder="Please input UPI" autoComplete="off" /></div>
        </div>

        <div className="mb-[8px] w-[100%] flex flex-row flex-1 relative left text-[#333] text-[14px] p-[5px] gap-[10px] rounded-[3px] py-[8px] recharge-single-input">
          <div className="flex flex-row"><div><img className="h-[20px] w-[23px]" src={flag} alt="indian-flag" /></div><div>+91</div></div>
          <div><input name="mobile" value={formData.mobile} onChange={handleChange} className="input-amount" type="text" placeholder="Mobile Number" autoComplete="off"/></div>
        </div>
      <div onClick={resetData} className="text-[14px] text-right underline mb-[8px]">Reset Data</div>
      <hr/>
  <div className="flex flex-row justify-around p-[10px]">
   <div onClick={closeModal} className="text-[10px] text-[#000]">Close</div>
   <div className="w-[1px] line-bg"></div>
   <div onClick={recharge} className="text-[10px] text-[#2a67fe] ">Confirm</div>
  </div>
        </div>
    </div>

    <Header title="Recharge" back="/account" iconPath="/recharge_record" icon="menu" />
    <div className="flex px-[20px] py-[10px] gap-[12px] bg-white mt-[5px]">
        <div className="text-[15px] mt-[5px] text-[#777]">Balance : </div>
        <div className="text-[20px]"> ₹ <span> {parseFloat(wallet).toFixed(2)}</span></div>
    </div>

    <div className="flex flex-col mt-[20px] pt-[15px] bg-white items-center">
      <div className="">Bank or UPI</div>
      <div className="h-[3px] w-[100%] bg-[#c7984a] mt-[15px]"></div>
    </div>

    <div className="flex flex-row gap-[5px] py-[15px] bg-white pl-[20px]">
      <div className="w-[20px] h-[20px]"> <img src={Amount} alt="INR"/></div>
      <div> <input type="number" className="input-amount" placeholder="Please input amount" value={rechargeAmount} onChange={(e)=>setRechargeAmount(e.target.value)} autoComplete="off" /></div>
    </div>
   <div className="flex py-0 px-[10px] flex-wrap pb-[12px] gap-[3px] justify-center bg-white">
      <div onClick={()=>setAmount(300)} className="quick-amount-button">300</div>
      <div onClick={()=>setAmount(500)} className="quick-amount-button">500</div>
      <div onClick={()=>setAmount(1000)} className="quick-amount-button">1000</div>
      <div onClick={()=>setAmount(2000)} className="quick-amount-button">2000</div>
      <div onClick={()=>setAmount(5000)} className="quick-amount-button">5000</div>
      <div onClick={()=>setAmount(10000)} className="quick-amount-button">10000</div>
      <div onClick={()=>setAmount(50000)} className="quick-amount-button">50000</div>
      <div onClick={()=>setAmount(100000)} className="quick-amount-button">100000</div>
   </div>
   <div className="text-[15px] text-[#999] bg-white p-[20px] pt-[10px]">1 Tips:Please contact 777.ingame@gmail.com if you have any questions about the order or payment failure</div>
     
   <div onClick={handleRecharge} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[20px] mt-[20px]">
   <div className="text-[18px]">Recharge</div>
   </div>

    </>
  )
}

export default Recharge