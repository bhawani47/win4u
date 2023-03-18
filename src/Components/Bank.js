import React,{ useState,useEffect } from 'react'
import Header from './Header';
import bank from '../images/bank.png';
import edit from '../images/edit.png';
import Flag from '../images/indian-flage.png';
import { NavLink,useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';


const Bank = () => {

  const [loading, setLoading] = useState('');
  const [bankName,setBankName] = useState(false);
  const [upi,setUpi] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  document.body.style.background = "#f1f1f1";
  

  useEffect(()=>{
   AuthUser().then((data)=>{
     if(!data.message){
      navigate('/login');
     }
     fetch('https://winbackend.onrender.com/api/getbankcard',{
     method:'get',
     headers:{
       'Content-Type':'application/json',
       'Authorization':`Bearer ${token}`
     }
   }).then((data)=>data.json()).then((finalData)=>{
     if (finalData.upi && finalData.bankName) {
        setBankName(finalData.bankName);
        setUpi(finalData.upi);
        setLoading('some');
        return;
     }
     if(finalData.upi){
        setUpi(finalData.upi);
     }
     if(finalData.bankName){
        setBankName(finalData.bankName);
     }
     setLoading('some');
   });
   });
  },[]);


 
  return (
    <>
    
    <Header back="/account" title="Bank Card" icon="plus" iconPath="/addbank" />
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    
    {upi ? 
    <NavLink to="/editupi"><div className="flex mx-[15px] mt-[15px] bg-white h-[44px]">
     <div className="ml-[11px] mt-[11px]">
     <img className="h-[20px] w-[20px] " src={bank}  alt="bankimg"/></div>
     <div className="text-[12px] mt-[12px] ml-[14px]">{upi}</div>
     <div className="mt-[11px] ml-auto mr-[11px]"><img className="h-[20px]" src={edit} alt="edit icon" /></div>
    </div>
    </NavLink>
    : <span></span>}

    {
      bankName?
     <NavLink to="/editbank"><div className="flex mx-[15px] mt-[15px] bg-white h-[44px]">
     <div className="ml-[11px] mt-[11px]"><img className="h-[20px] w-[20px] " src={bank}  alt="bankimg"/></div>
     <div className="text-[12px] mt-[12px] ml-[14px]">{bankName}</div>
     <div className="mt-[11px] ml-auto mr-[11px]"><img className="h-[20px]" src={edit} alt="edit icon" /></div>
     </div>   
     </NavLink>
      :
     <span></span>
    }

    
   </>
  )
}

const AddBank = ()=>{
  
  const [loading, setLoading] = useState('');
  const [bankData, setBankData] = useState({
    ifsc:'',
    customerName:'',
    mobile:'',
    email:'',
    bankName:'',
    bankAccount:''
  });


  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  document.body.style.background = "#f1f1f1";

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
 
  const hanldeChange = (e)=>{
   setBankData({...bankData,[e.target.name]:e.target.value});
  }

  const hanldeSubmit = ()=>{
    if(bankData.ifsc.trim().length!==11){
      toastMessage('Please enter valid IFSC Code');
      return;
    }
    if (bankData.customerName.trim().length<2) {
      toastMessage('Please enter valid name');
      return;
    }
    if (bankData.mobile.trim().length!==10) {
      toastMessage('Please enter valid mobile ');
      return;
    }
    if (bankData.mobile.trim().length!==10) {
      toastMessage('Please enter valid mobile ');
      return;
    }
    if(!validateEmail(bankData.email)) {
      toastMessage('Please enter valid email');
      return;
    }
    if (bankData.bankAccount.trim().length<9) {
      toastMessage('Please enter valid bank account ');
      return;
    }
    fetch('https://winbackend.onrender.com/api/addbank',{
      method:'post',
      body:JSON.stringify(bankData),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      if(finalData.message === 'BANK_EXIST'){
        toastMessage("Can not add multiple bank card");
        return;
      }
      if(finalData.message === 'success'){
        navigate('/bank');
        return;
      }
    });


  }

  useEffect(()=>{
   AuthUser().then((data)=>{
     if(!data.message){
      navigate('/login');
     }
     setLoading('some');
   });
  },[]);

    return (
        <>
        <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
        </div>
       {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
        <Header back="/bank" title="Add Bank" />
        <div className="bg-white mt-[3px]">
        <div className="flex flex-row justify-around py-[15px]">
        <NavLink to="/addbank" ><div>Bank Cash out</div></NavLink>
        <NavLink to="/addupi" ><div>UPI Cash out</div></NavLink>
        </div>
        <div className="flex flex-row">
        <div className="border-bottom-line w-[50%] h-[4px] "></div>
        <div className=" w-[50%] h-[2px] "></div>
        </div>
        </div>

        <div className="flex flex-row mt-[25px] py-[10px] bg-white items-center pt-[15px] pl-[15px] h-[60px] bank-input-border">
         <input name="ifsc" onChange={hanldeChange} value={bankData.ifsc} className="bank-input uppercase" placeholder="IFSC Code" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="customerName" onChange={hanldeChange} value={bankData.customerName} className="bank-input" placeholder="Actual Name" type="text" autoComplete="off" />
        </div>
 
        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
        <div className="flex pr-2"> <img className="w-[20px] h-[20px] mt-[2px]" src={Flag} alt="INR"/> +91</div>
         <input name="mobile" onChange={hanldeChange} value={bankData.mobile} className="bank-input" placeholder="Mobile Number" type="number" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="email" onChange={hanldeChange} value={bankData.email} className="bank-input" placeholder="Email" type="text" autoComplete="off" />
        </div>


        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="bankName" onChange={hanldeChange} value={bankData.bankName} className="bank-input" placeholder="Bank Name" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="bankAccount" onChange={hanldeChange} value={bankData.bankAccount} className="bank-input" placeholder="Bank Account" type="number" autoComplete="off" />
        </div>

        <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[25px]">
         <div className="text-[14px] font-bold">Continue</div>
         </div>

        </>
      )
}

const AddUpi = ()=>{
  
     const [loading, setLoading] = useState('');
     const [upiData, setUpiData] = useState({
      customerName:'',
      mobile:'',
      upi:'',
      email:''
      });

     document.body.style.background = "#f1f1f1";
     const navigate = useNavigate();
     const token = localStorage.getItem('token');
     

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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


   
    const hanldeChange = (e)=>{
      setUpiData({...upiData,[e.target.name]:e.target.value});
    }


    const hanldeSubmit = ()=>{
      if (upiData.upi.trim().length<3) {
        toastMessage('Please enter validn upi');
        return;
      }
      if (upiData.customerName.trim().length<2) {
        toastMessage('Please enter valid name');
        return;
      }
      if (upiData.mobile.toString().trim().length!==10) {
        toastMessage('Please enter valid mobile ');
        return;
      }
      if(!validateEmail(upiData.email)) {
        toastMessage('Please enter valid email');
        return;
      }


      fetch('https://winbackend.onrender.com/api/addupi',{
      method:'post',
      body:JSON.stringify(upiData),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      if(finalData.message === 'UPI_EXIST'){
        toastMessage("Can not add multiple UPI card");
        return;
      }
      if(finalData.message === 'success'){
        navigate('/bank');
        return;
      }
    });
      

    }

    useEffect(()=>{
      AuthUser().then((data)=>{
        if(!data.message){
         navigate('/login');
        }
       setLoading('some');
      });
     },[]);



    return (
        <>
        <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
          <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
        </div>
       {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
        <Header back="/bank" title="Add Upi" />
        <div className="bg-white mt-[3px]">
        <div className="flex flex-row justify-around py-[15px]">
        <NavLink to="/addbank" ><div>Bank Cash out</div></NavLink>
        <NavLink to="/addupi" ><div>UPI Cash out</div></NavLink>
        </div>
        <div className="flex flex-row">
        <div className="w-[50%] h-[4px]"></div>
        <div className="border-bottom-line w-[50%] h-[2px]"></div>
        </div>
        </div>

        <div className="flex flex-row mt-[25px] py-[10px] bg-white items-center pt-[15px] pl-[15px] h-[60px] bank-input-border">
         <input name="upi" value={upiData.upi}  onChange={hanldeChange} className="bank-input" placeholder="UPI Account" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="customerName" value={upiData.customerName}  onChange={hanldeChange} className="bank-input" placeholder="Actual Name" type="text" autoComplete="off" />
        </div>
 
        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
        <div className="flex pr-2"> <img className="w-[20px] h-[20px] mt-[2px]" src={Flag} alt="INR"/> +91</div>
         <input name="mobile" value={upiData.mobile}  onChange={hanldeChange} className="bank-input" placeholder="Mobile Number" type="number" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="email" value={upiData.email}  onChange={hanldeChange} className="bank-input" placeholder="Email" type="text" autoComplete="off" />
        </div>

        <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[25px]">
         <div className="text-[14px] font-bold">Continue</div>
        </div>
        </>
      )
}

const EditBank = ()=>{
      
      const [loading, setLoading] = useState('');
      const [bankData, setBankData] = useState({
        ifsc:'',
        customerName:'',
        mobile:'',
        email:'',
        bankName:'',
        bankAccount:''
      });

      const token = localStorage.getItem('token');
      const navigate = useNavigate();

      function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }


      const hanldeChange = (e)=>{
        setBankData({...bankData,[e.target.name]:e.target.value});
       }
     
       const hanldeSubmit = ()=>{
         if(bankData.ifsc.trim().length!==11){
           toastMessage('Please enter valid IFSC Code');
           return;
         }
         if (bankData.customerName.trim().length<2) {
           toastMessage('Please enter valid name');
           return;
         }
         if (bankData.mobile.toString().trim().length!==10) {
           toastMessage('Please enter valid mobile ');
           return;
         }
         if(!validateEmail(bankData.email)) {
           toastMessage('Please enter valid email');
           return;
         }
         if (bankData.bankAccount.trim().length<9) {
           toastMessage('Please enter valid bank account ');
           return;
         }
        
        fetch('https://winbackend.onrender.com/api/updatebank',{
          method:'post',
          body:JSON.stringify(bankData),
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        }).then((data)=>data.json()).then((finalData)=>{

          if(finalData.message === 'success'){
            navigate('/bank');
            return;
          }
        });

     
       }

    document.body.style.background = "#f1f1f1";
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
     }
   });
   fetch('https://winbackend.onrender.com/api/getbank',{
    method:'post',
    body:JSON.stringify({type:'bank'}),
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }
  }).then((data)=>data.json()).then((finalData)=>{
    setBankData(finalData);
    setLoading('some');
  });
  },[]);
  

    return (
        <>


        <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
          <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
        </div>
       {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
        <Header back="/bank" title="Edit Bank Card" />
        <div className="flex flex-row mt-[25px] py-[10px] bg-white items-center pt-[15px] pl-[15px] h-[60px] bank-input-border">
         <input name="ifsc" onChange={hanldeChange} value={bankData.ifsc} className="bank-input uppercase" placeholder="IFSC Code" type="text" autoComplete="off" />
        </div>

         <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="customerName" onChange={hanldeChange} value={bankData.customerName} className="bank-input" placeholder="Actual Name" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
        <div className="flex pr-2"> <img className="w-[20px] h-[20px] mt-[2px]" src={Flag} alt="INR"/> +91</div>
         <input name="mobile" onChange={hanldeChange} value={bankData.mobile} className="bank-input" placeholder="Mobile Number" type="number" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="email" onChange={hanldeChange} value={bankData.email} className="bank-input" placeholder="Email" type="text" autoComplete="off" />
        </div>


        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="bankName" onChange={hanldeChange} value={bankData.bankName} className="bank-input" placeholder="Bank Name" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="bankAccount" onChange={hanldeChange} value={bankData.bankAccount} className="bank-input" placeholder="Bank Account" type="number" autoComplete="off" />
        </div> 

        <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[25px]">
         <div className="text-[14px] font-bold">Continue</div>
         </div>

        </>
      )
}

const EditUpi = ()=>{

    const [loading, setLoading] = useState('');
    const [upiData, setUpiData] = useState({
      customerName:'',
      mobile:'',
      upi:'',
      email:''
    });

    document.body.style.background = "#f1f1f1";

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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

    const hanldeChange = (e)=>{
      setUpiData({...upiData,[e.target.name]:e.target.value});
    }

    const hanldeSubmit = ()=>{
        if (upiData.upi.trim().length<3) {
          toastMessage('Please enter validn upi');
          return;
        }
        if (upiData.customerName.trim().length<2) {
          toastMessage('Please enter valid name');
          return;
        }
        if (upiData.mobile.toString().trim().length!==10) {
          toastMessage('Please enter valid mobile ');
          return;
        }
        if(!validateEmail(upiData.email)) {
          toastMessage('Please enter valid email');
          return;
        }

        fetch('https://winbackend.onrender.com/api/updateupi',{
          method:'post',
          body:JSON.stringify(upiData),
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        }).then((data)=>data.json()).then((finalData)=>{

          if(finalData.message === 'success'){
            navigate('/bank');
            return;
          }
        });
        
    }

      useEffect(()=>{
        AuthUser().then((data)=>{
          if(!data.message){
           navigate('/login');
          }
        });
        fetch('https://winbackend.onrender.com/api/getbank',{
         method:'post',
         body:JSON.stringify({type:'upi'}),
         headers:{
           'Content-Type':'application/json',
           'Authorization':`Bearer ${token}`
         }
       }).then((data)=>data.json()).then((finalData)=>{
        setUpiData(finalData);
        setLoading('some');
       });
       },[]);


    return (
        <>
        <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
          <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
        </div>
        {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
        <Header back="/bank" title="Edit Upi" />
        <div className="flex flex-row mt-[25px] py-[10px] bg-white items-center pt-[15px] pl-[15px] h-[60px] bank-input-border">
         <input name="upi" value={upiData.upi}  onChange={hanldeChange} className="bank-input" placeholder="UPI Account" type="text" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="customerName" value={upiData.customerName}  onChange={hanldeChange} className="bank-input" placeholder="Actual Name" type="text" autoComplete="off" />
        </div>
 
        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
        <div className="flex pr-2"> <img className="w-[20px] h-[20px] mt-[2px]" src={Flag} alt="INR"/> +91</div>
         <input name="mobile" value={upiData.mobile}  onChange={hanldeChange} className="bank-input" placeholder="Mobile Number" type="number" autoComplete="off" />
        </div>

        <div className="flex flex-row py-[10px] bg-white items-center  pl-[15px] h-[60px] bank-input-border">
         <input name="email" value={upiData.email}  onChange={hanldeChange} className="bank-input" placeholder="Email" type="text" autoComplete="off" />
        </div>

        <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[25px]">
         <div className="text-[14px] font-bold">Continue</div>
        </div>
        </>
      )
}

export {Bank, AddBank, AddUpi,EditBank,EditUpi};