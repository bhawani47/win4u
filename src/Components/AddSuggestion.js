import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import Header from './Header';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const AddSuggestion = () => {

    const [loading, setLoading] = useState('');
    const [type, setType] =  useState('Type');
    const [previousEle, setPreviousEle]= useState('');
    const [getType, setGetType] = useState('');
    const [formData, setFormData] = useState({
      contact:'',
      desc:''
    })
    const navigate = useNavigate();

    document.body.style.background = "#f1f1f1";
    const token = localStorage.getItem('token');
    const selectType = event=>{
    document.getElementById("type").classList.toggle("show-submenu");
    setGetType(event.target);
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

    const selectTypeDone = event =>{
    event.target.style.color="#007aff";
    setType(event.target.innerHTML.trim());
    document.getElementById("type").classList.toggle("show-submenu");
    setPreviousEle(event.target);
    getType.classList.add('black-placeholder');
    if(previousEle !== ''){
        previousEle.style.color="black";
    }
    }

    const hanldeChange = (e)=>{
      setFormData({...formData, [e.target.name]:e.target.value});
    }

    const hanldeSubmit = ()=>{

      if(type === 'Type'){
        toastMessage('Please select type');
        return;
      }
      if(formData.contact === ''){
        toastMessage('Please enter valid contact');
        return;
      }

      if(formData.desc === ''){
        toastMessage('Please write description');
        return;
      }

      fetch('https://winbackend.onrender.com/api/complaints',{
        method:'post',
        body:JSON.stringify({type:type,contact:formData.contact,desc:formData.desc}),
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      }).then((data)=>data.json()).then((finalData)=>{
        console.log(finalData);
        if(finalData.message ==='success'){
         setFormData({contact:'',desc:''});
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
     },[])
  return (
    <>
    <Header title="Add Complaints & Suggestion" back="/suggestion" />
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
     </div>
    <div onClick={selectType} className="flex flex-row mt-[30px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
        <input className="input-amount" placeholder={type} type="password" autoComplete="off" disabled />
    </div>

    <div className="flex flex-row mt-[15px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
        <input name="contact" value={formData.contact} onChange={hanldeChange} className="input-amount" placeholder="Contact number" type="number" autoComplete="off" />
    </div>

    <div className="flex flex-row mt-[15px] py-[10px] bg-white items-center mx-[15px] px-[20px] pl-[15px] rounded-[5px] gap-[15px] h-[46px]">
        <input name="desc" value={formData.desc} onChange={hanldeChange} className="input-amount" placeholder="Description" type="text" autoComplete="off" />
    </div> 
   
    <div onClick={hanldeSubmit} className="flex justify-center items-center h-[46px] rounded-[8px] font-bold btn-apply mx-[15px] mt-[20px]">
    <div className="text-[14px] font-bold">Submit</div>
   </div>





   <div id="type" className="hide-submenu">
   <div className="triangle-up addsuggestion-triangle"></div>
   <div className="picker-select addsuggestion">
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Suggestion  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Consult  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Account Problem  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Recharge Problem  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Withdraw Problem  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">  Parity Problem  </div>
     <div onClick={selectTypeDone}  className="picker-item text-[#555]">    Other   </div>
   </div>
   </div>

    </>
  )
}

export default AddSuggestion;