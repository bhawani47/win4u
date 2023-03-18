import React, { useState, useRef, useEffect} from 'react'
import Header from './Header';
import copy from 'copy-to-clipboard';
import AuthUser from './AuthUser.js';
import { useNavigate } from 'react-router';
import Loading from '../images/loading.png';

const Promotion = () => {
 
  const [loading, setLoading] = useState('');
  const [bonus,setBonus] = useState(0);
  const [code, setCode] = useState('');
  const [link, setLink] = useState('');
  const [promoData,setPromoData] = useState('');
  const [people,setPeople]= useState(0);
  const [contribution, setContribution] = useState(0);
  const toastRef =  useRef();
  const navigate = useNavigate();
  const refcode = localStorage.getItem('refercode')

  const token = localStorage.getItem('token');
  document.body.style.background = "#f1f1f1";
  const changeLevel = (id)=>{
     document.getElementById("level1").classList.remove('border-bottom-line');
     document.getElementById("level2").classList.remove('border-bottom-line');
     document.getElementById(id).classList.add('border-bottom-line');
     if(id==='level2'){
       setPeople(promoData.people2);
       setContribution(promoData.wallet2);
     }else{
      setPeople(promoData.people1);
      setContribution(promoData.wallet1);
     }
  }

  const copyLink = async (type)=>{
    switch (type) {
      case 'code':
      
      if ('clipboard' in navigator){
        await navigator.clipboard.writeText(refcode);
      }else{
        copy(refcode);
      }
      toastRef.current.classList.add('flex');
      toastRef.current.classList.remove('hide-submenu');
      setTimeout(()=>{
        toastRef.current.classList.add('hide-submenu');
        toastRef.current.classList.remove('flex');
      },1000);
      break;
      case 'link':
        if ('clipboard' in navigator){
          await navigator.clipboard.writeText(`https://${window.location.hostname}/?code=${refcode}`);
        }else{
          copy(`https://${window.location.hostname}/?code=${refcode}`);
        }

      toastRef.current.classList.add('flex');
      toastRef.current.classList.remove('hide-submenu');
      setTimeout(()=>{
        toastRef.current.classList.add('hide-submenu');
        toastRef.current.classList.remove('flex');
      },1000);

      break;
    
      default:
        break;
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

  const applyBonus = ()=>{

    if(bonus>10){
      console.log("applying bonus !");
      fetch('https://winbackend.onrender.com/api/applybonus',{
        method:'post',
        body:JSON.stringify({}),
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      }).then((data)=>data.json()).then((finalData)=>{
        console.log(finalData);
        if(finalData.message === 'success'){
          setBonus(0);
          toastMessage('Applied Successfully');
        }else{
          toastMessage('Some server error');
        }
      });


    }else{
      toastMessage('Minimum balance must be 10');
    }

  }


  useEffect(()=>{
   AuthUser().then((data)=>{
     if(!data.message){
      navigate('/login');
      setCode(refcode);
     }else{
      setPromoData(data);
      setBonus(data.bonus);
      setPeople(data.people1);
      setContribution(data.wallet1);
      setLoading('some');
     }
     
   });
  },[])

  return (
    <>
   {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div ref={toastRef} className="loading-box flex flex-col justify-center hide-submenu">
      <div className="text-white text-center mr-[10px]">Copy </div>
      <div className="text-white text-center">Success ! </div>
    </div>

    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
          <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>

    <Header title="Promotion" back="/account" menu="/record"/>
    
    <div className="bg-white pb-[20px]">
    <div className="flex mb-[10px] px-[20px] py-[15px] gap-[12px]">
        <div className="text-[15px] mt-[5px] text-[#777]">Bonus : </div>
        <div className="text-[20px]"> ₹ <span> {parseFloat(bonus).toFixed(2)}</span></div>
    </div>
   <div className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[20px]">
   <div onClick={applyBonus} className="text-[14px] font-light">Apply all to Balance</div>
   </div>
   </div>

   <div className="flex flex-col mt-[20px] bg-white">
    <div className="flex flex-row justify-around py-[20px]">
        <div onClick={()=>changeLevel('level1')}>Level 1</div>
        <div onClick={()=>changeLevel('level2')}>Level 2</div>
    </div>
    <div className="flex flex-row">
     <div id="level1" className="border-bottom-line w-[50%] h-[2px] "></div>
     <div id="level2" className="w-[50%] h-[2px] "></div>
    </div>
    <div className="flex flex-row justify-around py-[20px]">
        <div className="text-[#bfc2c5] text-[14px] flex flex-col items-center">
        <div>Total People</div>
        <div className="text-[#333] text-[16px]">{people}</div>
        </div>
        <div className="text-[#bfc2c5] text-[14px]">
        <div className="text-[#bfc2c5] text-[14px] flex flex-col items-center">
        <div>Contribution</div>
        <div className="text-[#333] text-[16px]">{parseFloat(contribution).toFixed(2)}</div>
        </div>
        </div>
    </div>
    
    <div className="text-[#bfc2c5] text-[14px] px-[20px]">My Promotion Code</div>
    <div className="px-[20px] mt-[5px]">{refcode}</div>
    <hr className="mt-[10px] ml-[15px] mr-[20px]"/>
    <div className="text-[#bfc2c5] text-[14px] px-[20px] mt-[10px]">My Promotion Link</div>
    <div className="px-[20px] mt-[10px]">{`https://${window.location.hostname}/?code=${refcode}`}</div>
    <hr className="mt-[10px] ml-[15px] mr-[20px]"/>
    <div className="flex flex-row justify-around mt-[20px] ">
     <div onClick={()=>copyLink('code')} className="copy-button bg-white font-bold">Copy Code</div>
     <div onClick={()=>copyLink('link')} className="copy-button bg-white font-bold">Copy Link</div>
    </div>
   </div>

    </>
  )
}

export default Promotion