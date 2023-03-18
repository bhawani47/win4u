import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Header from './Header'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const WithdrawalTransaction = () => {
 
  let t = new Date().getTime();
  const [loading, setLoading] = useState('');
  const [firstTime,setFirstTime] = useState('');
  const [lastTime,setLastTime] = useState(t);
  const [pageNo, setPageNo] = useState(1);
  const [totalDoc,setTotalDoc] = useState(0);
  const [withdrawHistrory,setWithdrawHistrory] = useState('');

  const navigate = useNavigate();
  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');

  const getWithdrawRecord = async (type='next')=>{

    fetch('https://winbackend.onrender.com/api/withdrawrecord',{
      method:'post',
      body:JSON.stringify({lastTime:lastTime,firstTime:firstTime,type:type}),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      let finalObj = {};
      let ObjKey = Object.keys(finalData.records);
      let ObjVal = Object.values(finalData.records).reverse();
      ObjKey.map((val,index)=>{
        finalObj[index] = ObjVal[val];
      });
      setTotalDoc(1);

      if(type==='next'){
          setWithdrawHistrory(finalData.records);
          let len = Object.values(finalData.records).length - 1;
          setLastTime(Object.values(finalData.records)[len]['time']);
          setFirstTime(Object.values(finalData.records)[0]['time']);
      }else{
          setWithdrawHistrory(finalObj);
          let len = Object.values(finalObj).length - 1;
          setLastTime(Object.values(finalObj)[len]['time']);
          setFirstTime(Object.values(finalObj)[0]['time']);
      }
      setTotalDoc(finalData.count);
    });
    }

  const nextRecords = ()=>{
    if(pageNo !==Math.ceil(totalDoc/10)){
      getWithdrawRecord('next').then(()=>{
        setPageNo(pageNo+1);
      });
    }
  }

  const prevRecords = ()=>{
    if(pageNo !==1){
      getWithdrawRecord('prev').then(()=>{
        setPageNo(pageNo - 1);
      });
    }
  }

  useEffect(()=>{
   AuthUser().then((data)=>{
     if(!data.message){
      navigate('/login');
     }
    setLoading('some');
   });

   getWithdrawRecord('next');
  },[])

  return (
    <>
    <Header back="/withdrawal" title=" Withdraw Record " />
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
   {Object.values(withdrawHistrory).map((val,index)=>{
  let class_name = val.paymentStatus === 0? 'Processing-text':val.paymentStatus === 1 ? 'Success-text' :'Failed-text';
  return(
  <div key={val._id} className="flex flex-row bg-white mt-[10px] p-[10px] mx-[15px] rounded-[5px] justify-between">
  <div className="flex flex-row">
    <div className="flex flex-col mt-[5px] ml-[20px]">
    <div className="text-black text-[14px]">Cash withdrawal</div>
    <div className="text-[#999] text-[12px]">{(new Date(val.time)).toLocaleString('en-GB').split(',').join('/')}</div>
  </div>
  </div>
  <div className={`${class_name} text-[12px] mt-[10px]`}>{val.paymentStatus === 0? 'Processing':val.paymentStatus === 1 ? 'Success' :'Failed'}</div>
  <div className="text-black text-[14px] mt-[10px]">₹ {val.withdrawAmount}</div>
  </div>
  )
})}

   <div className="flex flex-row relative justify-center items-center mx-[15px] mt-[15px]">
        <div className="pagination-btn disabled-pagination-btn" onClick={prevRecords}>
          <ArrowBackIosNewRoundedIcon />
        </div>
        <div className="pagination-number-data">
          <span className="text-[#007aff]">{pageNo}</span>/{Math.ceil(totalDoc/10)}
        </div>
        <div className="pagination-btn enabled-pagination-btn" onClick={nextRecords}>
          <ArrowForwardIosRoundedIcon />
        </div>
   </div>
    </>
  )
}

export default WithdrawalTransaction;