import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Footer from './Footer';
import AuthUser from './AuthUser.js';
import cup from '../images/cup.png';
import reload from '../images/reload.png';
import Loading from '../images/loading.png';

const Game = () => {
  
  const [loading, setLoading] = useState('');
  const [wallet,setWallet] = useState('');
  const [betColor, setBetColor] = useState('');
  const [colorClass, setColorClass] = useState('');
  const [contractAmount, setContractAmount] = useState(10);
  const [totalOrder, setTotalOrder] =  useState(1);
  const [totalSum, setTotalSum] =  useState(10);
  const [server, setServer] = useState('parity');
  const [serverHistory, setServerHisory] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [parityRecord,setParityRecord] = useState('');
  const [sapreRecord,setSapreRecord] = useState('');
  const [bconeRecord,setBconeRecord] = useState('');
  const [emerdRecord,setEmerdRecord] = useState('');

    let w = 'white-dot';
    let r = 'red-dot';
    let v = 'violet-dot';
    let g = 'green-dot';
    let rt = 'red-text';
    let gt = 'green-text';
    let colorClasses  = {
          '0':[v,r,rt],
          '1':[w,g,gt],
          '2':[w,r,rt],
          '3':[w,g,gt],
          '4':[w,r,rt],
          '5':[v,g,gt],
          '6':[w,r,rt],
          '7':[w,g,gt],
          '8':[w,r,rt],
          '9':[w,g,gt]
      };
    
  const navigate = useNavigate();
  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');

  const OpenBettingModal = (color)=>{
    document.getElementById("modal-background").classList.add("show-submenu");
    document.getElementById("main-modal").classList.add("show-submenu");
    if(color==="green"){
      setBetColor("Green");
      setColorClass("green-dot");
      document.getElementById('order1').classList.add('active-green-money');
    }else if(color==="violet"){
      setBetColor("Violet");
      setColorClass("violet-dot");
      document.getElementById('order1').classList.add('active-violet-money');
    }else if(color==="red"){
      setBetColor("Red");
      setColorClass("red-dot");
      document.getElementById('order1').classList.add('active-red-money');
    }else{
      setBetColor(color);
      setColorClass("blue-dot");
      document.getElementById('order1').classList.add('active-blue-money');
    }
  }

  function addMinutes(date, minutes) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);
    return dateCopy;
  }

  const changeOrder = (orderMoney)=>{
    let orderColor;
    if(colorClass==="green-dot"){
      orderColor = "active-green-money";
    }else if(colorClass==="violet-dot"){
      orderColor = "active-violet-money";
    }else if(colorClass==="red-dot"){
      orderColor = "active-red-money";
    }else{
      orderColor = 'active-blue-money';
    }

    document.getElementById('order1').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order2').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order3').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order4').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    
      if(orderMoney===10){
        document.getElementById('order1').classList.add(orderColor);
        setContractAmount(10);
        setTotalSum(10*totalOrder);
      }else if(orderMoney===100){
        document.getElementById('order2').classList.add(orderColor);
        setContractAmount(100);
        setTotalSum(100*totalOrder);
      }else if(orderMoney===1000){
        document.getElementById('order3').classList.add(orderColor);
        setContractAmount(1000);
        setTotalSum(1000*totalOrder);
      }else if(orderMoney===10000){
        document.getElementById('order4').classList.add(orderColor);
        setContractAmount(10000);
        setTotalSum(10000*totalOrder);
      }
  }

  const IncreaseNumber = ()=>{
    if(totalOrder<100){
      setTotalOrder(totalOrder+1);
      setTotalSum((totalOrder+1)*contractAmount);
      document.getElementById("plus-icon").classList.remove('number-disabled');
      document.getElementById("minus-icon").classList.remove('number-disabled');
      if(totalOrder===99){
        document.getElementById("plus-icon").classList.add('number-disabled');
      }
    }else{
      document.getElementById("plus-icon").classList.add('number-disabled');
      document.getElementById("minus-icon").classList.remove('number-disabled');
    }
  }

  const DecreaseNumber = ()=>{
    if(totalOrder>=2){
      setTotalOrder(totalOrder-1);
      setTotalSum((totalOrder-1)*contractAmount);
      document.getElementById("minus-icon").classList.remove('number-disabled');
      document.getElementById("plus-icon").classList.remove('number-disabled');
      if(totalOrder===2){
        document.getElementById("minus-icon").classList.add('number-disabled');
      }
    }else{
      document.getElementById("minus-icon").classList.add('number-disabled');
      document.getElementById("plus-icon").classList.remove('number-disabled');
    }
  }

  const closeModal = ()=>{
    // document.getElementById("main-modal").classList.add("close-animation");
    document.getElementById("modal-background").classList.remove("show-submenu");
    document.getElementById("main-modal").classList.remove("show-submenu");
    setContractAmount(10);
    setTotalOrder(1);
    setTotalSum(10);
    document.getElementById('order1').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order2').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order3').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    document.getElementById('order4').classList.remove('active-green-money','active-violet-money','active-red-money','active-blue-money');
    }

  const OpenRuleModal = ()=>{
    document.getElementById('rule-modal').classList.add('show-submenu');
    document.getElementById("modal-background").classList.add("show-submenu");
    }

  const closeRuleModal = ()=>{
    document.getElementById('rule-modal').classList.remove('show-submenu');
    document.getElementById("modal-background").classList.remove("show-submenu");
  }

  const changeServer = (id)=>{
    document.getElementById("parity").classList.remove('active-server');
    document.getElementById("sapre").classList.remove('active-server');
    document.getElementById("bcone").classList.remove('active-server');
    document.getElementById("emerd").classList.remove('active-server');
    document.getElementById(id).classList.add('active-server');
    setServer(id);
    switch (id) {
      case 'parity':
        setPageNo(1);
        setServerHisory(parityRecord);
        break;
      case 'sapre':
        setPageNo(1);
        setServerHisory(sapreRecord);
        break;
      case 'bcone':
        setPageNo(1);
        setServerHisory(bconeRecord);
          break;
      case 'emerd':
        setPageNo(1);
        setServerHisory(emerdRecord);
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

  const bet = ()=>{
    let currSec = getSec();
    let currMin = Math.abs(getMinutes()%3 - 2);
    if(currMin === 0 && (59 - currSec) <30){
      toastMessage('Timeout !');
      closeModal();
      return;
   }

   if(totalSum >wallet){
    toastMessage('Insufficient balance !');
    closeModal();
    return;
   }
   if(isNaN(betColor)){
    //it is color
    closeModal();

    fetch('https://winbackend.onrender.com/api/bet',{
      method:'post',
      body:JSON.stringify({server:server,betType:'color',value:betColor,no_of_orders:totalOrder,contract_amount:contractAmount}),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      if(finalData.message === 'success'){
        setWallet(finalData.remain);
        toastMessage('Bet success ');
        return;
      }
      if(finalData.message === 'TIMEOUT'){
        closeModal();
        toastMessage('Timeout !');
        return;
      }

      if(finalData.message === 'BALANCE_ERROR'){
        closeModal();
        toastMessage('Insufficient balance !');
        return;
      }
    });

   }else{
    //it is number so here we go
    closeModal();
    fetch('https://winbackend.onrender.com/api/bet',{
      method:'post',
      body:JSON.stringify({server:server,betType:'number',value:betColor,no_of_orders:totalOrder,contract_amount:contractAmount}),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      if(finalData.message === 'success'){
        setWallet(finalData.remain);
        toastMessage('Bet success ');
        return;
      }
      if(finalData.message === 'TIMEOUT'){
        toastMessage('Timeout !');
        return;
      }

      if(finalData.message === 'BALANCE_ERROR'){
        toastMessage('Insufficient balance !');
        return;
      }
    });
   }
  
  }

  const getPeriod = () => {
    const date = new Date();
    let diff = (new Date()).getTimezoneOffset();
    let sum = 330 + diff;
    const newDate = addMinutes(date, sum);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    let y = newDate.getFullYear();
    let m = months[newDate.getMonth()];
    let d = days[newDate.getDate()];
    const min = ((newDate.getHours()) * 60) + (newDate.getMinutes());
    let minBythree = Math.floor(min / 3) + 1;
    if (minBythree.toString().length === 1) {
      minBythree = `00${minBythree}`;
    } else if (minBythree.toString().length === 2) {
      minBythree = `0${minBythree}`
    }
    return `${y}${m}${d}${minBythree}`;
  }

  const getMinutes = () => {
    const date = new Date();
    let diff = (new Date()).getTimezoneOffset();
    let sum = 330 + diff;
    const newDate = addMinutes(date, sum);
    return newDate.getMinutes();
  }
  
  const getSec = () => {
    const date = new Date();
    let diff = (new Date()).getTimezoneOffset();
    let sum = 330 + diff;
    const newDate = addMinutes(date, sum);
    return newDate.getSeconds();
  }
  

  const hanldeOrder  = ()=>{
    console.log('changing a number of orders here ....');
  }
  
  const hanldeRefresh = (e)=>{
    e.target.classList.add('rotatingImg');
    setTimeout(()=>{
      e.target.classList.remove('rotatingImg');
    },800);
  }

  const prevRecords = ()=>{

  if(pageNo!==1){
     setPageNo(pageNo-1);
  }

  }

  const nextRecords = ()=>{
    if(pageNo<10){
      setPageNo(pageNo+1);
   }
  }

  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
      navigate('/login');
      }
      setWallet(data.wallet);
    });

    fetch('https://winbackend.onrender.com/api/gethistory',{
      method:'get',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      setLoading('some');
      setServerHisory(finalData.result.parityResult);
      setParityRecord(finalData.result.parityResult);
      setSapreRecord(finalData.result.sapreResult);
      setBconeRecord(finalData.result.bconeResult);
      setEmerdRecord(finalData.result.emerdResult);
    });
 
    let x,sec,min;
    let btn_arr = Array.from(document.getElementsByClassName('bet-btn'));
    let all_btn = Array.from(document.getElementsByClassName('enabled-btn'));

    setInterval(() => {
      let periodDiv = document.getElementById('period');
      let counter = document.getElementById('countDown');

      if(periodDiv !== null){
        sec = getSec();
        min = Math.abs(getMinutes()%3 - 2);
        if(min === 0 && (59 - sec) <30){
          btn_arr.forEach((ele)=>{
            ele.style.opacity = 0.6;
          });
          all_btn.forEach((ele)=>{
            ele.disabled = true;
          });
        }else{
          btn_arr.forEach((ele)=>{
            ele.style.opacity = 1;
          });
          all_btn.forEach((ele)=>{
            ele.disabled = false;
          });
        }
  
        if((59 - sec).toString().length === 1){
          counter.innerHTML = `0${min} : 0${59 - sec}`;
        }else{
          counter.innerHTML = `0${min} : ${59 - sec}`;
        }
        x = getPeriod();
        periodDiv.innerHTML = x;
        if(min === 0 && sec === 58){
         fetch('https://winbackend.onrender.com/api/gethistory',{
          method:'get',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        }).then((data)=>data.json()).then((finalData)=>{
          setServerHisory(finalData.result.parityResult);
          setParityRecord(finalData.result.parityResult);
          setSapreRecord(finalData.result.sapreResult);
          setBconeRecord(finalData.result.bconeResult);
          setEmerdRecord(finalData.result.emerdResult);
        });
        }
      }
    }, 1000);

  },[]);

  return (
    <>
    <div id="toaster" className="loading-box flex flex-col justify-center recharge-error hide-submenu">
        <div className="text-white text-center mr-[10px] text-[12px] mt-[25px]"></div>
    </div>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div id="rule-modal" className="rule-modal w-[90%] ml-[5%] setRuleModal">
      <div className="rule-modal-content">
      <div className="rule-modal-title bg-white">Rule of Guess</div>
      <div className="w-[100%] flex flex-col p-[12px] text-[10px] leading-[20px] overflow-auto">
     <p>3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues</p>
     <p className="mt-4">If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:</p>
      <p className="mt-4">1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196</p>
      <p className="mt-4">If the result shows 5, you will get (98*1.5) 147</p>
      <p className="mt-4">2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147</p>
      <p className="mt-4">3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441</p>
       <p className="mt-4">4.SELECT NUMBER:if the result is the same as the number you selected, you will get(98*9)882</p>
      </div>
     <div className="flex relative flex-1 items-center min-h-[60px] justify-center bg-white">
     <div onClick={closeRuleModal} className="close-btn-first close-btn-second rule-close-btn">CLOSE</div>
     </div>
      </div>      
    </div>
    <div id="modal-background" className="modal-background hide-submenu"></div>
    <div>
    <div id="main-modal" className="modal-wrapper z-10 hide-submenu">
    <div className={`modal-title color-white top-border-radius ${colorClass}`}>
    Join {betColor}
    </div>
    <div className="modal-content bg-white">
    <div className="content-wrapper">
    <div className="content-title">
      <span>Contract Money</span>
    </div>
    <div className="flex">
      <div id="order1" className="money-item" onClick={()=>changeOrder(10)}>10</div>
      <div id="order2" className="money-item" onClick={()=>changeOrder(100)}>100</div>
      <div id="order3" className="money-item" onClick={()=>changeOrder(1000)}>1000</div>
      <div id="order4" className="money-item" onClick={()=>changeOrder(10000)}>10000</div>
    </div>
    <div className="order-number">
      <div className="order-number-text">Number</div>
      <div className="order-number-box">
       <div className="numbox-minus numbox-cursor">
         <div id="minus-icon" className="number-box-text number-disabled"><RemoveRoundedIcon onClick={DecreaseNumber} className="mb-[6px]" /></div>
       </div>
       <div className="number-input number-box-value">
       <div className="uni-input-wrapper">
        <div className="number-input-placeholder input-placeholder"></div>
         <input name="num_of_orders" onChange={hanldeOrder} className="number-input-place" type="number" value={totalOrder}/>
       </div>
       </div>
       <div className="numbox-plus numbox-cursor">
         <div id="plus-icon" className="numbox-text-plus"><AddRoundedIcon onClick={IncreaseNumber} className="mb-[6px]" /></div>
       </div>
      </div>
    </div>
    <div className="order-total-money">
    Total contract money is <span className="money-green">{totalSum}</span>
    </div>
    <div className="agree">
      <div className="agree-checkbox">
        <div className="checkbox-wrapper">
          <div className="checkbox-input checked-input"></div>
          <div className="text-[20px] I-agree">I agree <span className="presale-rule">Presale Rule</span></div>
        </div>
      </div>
    </div>
    </div>
  </div>
<div className="modal-footer bg-white bottom-border-radius">
  <div className="modal-close-btn" onClick={closeModal}>CLOSE</div>
  <div onClick={bet} className="modal-confirm-btn">CONFIRM</div>
</div>
    </div>
    <div className='w-[90%] ml-[5%] bg-white rounded-[5px] game-menu'>
        <div className="mt-[20px] flex justify-items-start">
        <div className='p-5 pt-8 text-[16px]'>
        <h1 className="flex flex-row">Available balance: ₹ <span>{parseFloat(wallet).toFixed(2)}</span>
        <img onClick={hanldeRefresh} className="h-[25px] ml-[20px] mr-[20px]" src={reload} alt="reload" /></h1>          
        </div>
        </div>
        <div className="flex justify-around flex-wrap gap-2 pb-[36px] px-[10px]">
       <NavLink to="/recharge" ><div><button className="account-page-btn recharge-btn text-[14px] h-[40px] w-[96px]">Recharge</button></div></NavLink>
       <div><button onClick={OpenRuleModal} className="account-page-btn readrule-btn text-[14px] h-[40px] w-[86px]">Read Rules</button></div>
       <NavLink to="/bet_record"><div><button className="account-page-btn bet-record text-[14px] h-[40px] w-[93px]">Bet Record</button></div></NavLink>
        </div>
      </div>
      <div className="flex justify-around text-[#8d95a0] bg-white mt-[20px] ">
      <div id="parity" onClick={()=>changeServer("parity")} className="active-server w-[25%] py-3"><button className="ml-[25%]">Parity</button></div>
      <div id="sapre" onClick={()=>changeServer("sapre")}  className="w-[25%] py-3"><button className="ml-[25%]">Sapre</button></div>
      <div id="bcone" onClick={()=>changeServer("bcone")}  className="w-[25%] py-3"><button className="ml-[25%]">Bcone</button></div>
      <div id="emerd" onClick={()=>changeServer("emerd")} className="w-[25%] py-3"><button className="ml-[25%]">Emerd</button></div>
      </div>
      <div className="flex justify-between mt-4">
          <div className="text-[15px] ml-[6%] flex flex-row"><img src={cup} className="h-[15px] mt-[3px]" />Period</div>
          <div className="text-[15px] mr-[6%]">Count Down</div>
      </div>
      <div className="flex justify-between mt-4">
          <div id="period" className="text-[24px] ml-[6%]"> </div>
          <div id="countDown" className="text-[24px] mr-[6%]"> </div>
      </div>
      <div className="flex justify-evenly p-[19px]">
          <div className="bet-btn"><button onClick={()=>OpenBettingModal("green")} className="enabled-btn bg-[#39b54a] text-white h-[40px] w-[100px] rounded-[5px] text-[12px]">Join Green</button></div>
          <div className="bet-btn"><button onClick={()=>OpenBettingModal("violet")} className="enabled-btn bg-[#6739b6] text-white h-[40px] w-[100px] rounded-[5px] text-[12px]">Join Violet</button></div>
          <div className="bet-btn"><button onClick={()=>OpenBettingModal("red")} className="enabled-btn bg-[#ff4019] text-white h-[40px] w-[100px] rounded-[5px] text-[12px]">Join Red</button></div>
      </div>
      <div className="number-btn-wrapper">
      <div  className="bet-btn uni-button btn-num violet-red"><button className="enabled-btn" onClick={()=>OpenBettingModal(0)} >0</button></div>
      <div className="bet-btn uni-button btn-num green-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(1)} >1</button></div>
      <div className="bet-btn uni-button btn-num red-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(2)} >2</button></div>
      <div className="bet-btn uni-button btn-num green-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(3)} >3</button></div>
      <div className="bet-btn uni-button btn-num red-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(4)} >4</button></div>
      <div className="bet-btn uni-button btn-num violet-green"><button className="enabled-btn" onClick={()=>OpenBettingModal(5)} >5</button></div>
      <div className="bet-btn uni-button btn-num red-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(6)} >6</button></div>
      <div className="bet-btn uni-button btn-num green-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(7)} >7</button></div>
      <div className="bet-btn uni-button btn-num red-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(8)} >8</button></div>
      <div className="bet-btn uni-button btn-num green-number"><button className="enabled-btn" onClick={()=>OpenBettingModal(9)} >9</button></div>
      </div>
    <div className="flex flex-col mt-6 bg-white">
      <div className="self-center flex flex-row"><img src={cup} className="h-[16px] mt-[3px]" alt="win" />{server.charAt(0).toUpperCase() + server.slice(1)} Record</div>
      <div className="bg-[#565eff] h-[2px] w-[100%] mt-1.5"></div>
      <div>
      <div className="flex flex-row justify-around px-3 text-[14px]">
          <div className="py-3 leftBtn">Period</div>
          <div className="py-3 centerBtn">Price</div>
          <div className="py-3 centerBtn">Number</div>
          <div className="py-3 rightBtn">Result</div>
        </div>

{
  Object.values(serverHistory).slice((pageNo-1)*10, (pageNo*10)).map((val,index)=>{
    return (
      <div key={val._id}>
       <hr className="h-[2px]"/>
        <div className="flex flex-row justify-around record-item-wrapper px-3">
          <div className="py-3 leftBtn">{val.Period}</div>
          <div className="py-3 centerBtn">{val.price}</div>
          <div className={`py-3 centerBtn ${colorClasses[val.win_number][2]}`}>{val.win_number}</div>
          <div className="py-3 rightBtn flex gap-[6px] place-content-end">
            <div className={`color-wrapper ${colorClasses[val.win_number][0]}`}></div>
            <div className={`color-wrapper ${colorClasses[val.win_number][1]}`}></div>
          </div>
        </div>
      </div>);
  })
}
     <hr className="h-[2px]"/>
     <div className="flex flex-row relative justify-center items-center">
        <div className="pagination-btn disabled-pagination-btn" onClick={prevRecords}><ArrowBackIosNewRoundedIcon/></div>
        <div className="pagination-number-data"><span className="text-[#007aff]">{pageNo}</span>/10</div>
        <div className="pagination-btn enabled-pagination-btn" onClick={nextRecords}><ArrowForwardIosRoundedIcon/></div>
        </div>
      </div>
      </div>    
    <div className="mt-[80px]"></div>
    <Footer cl3="flex flex-col items-center active-menu" />
    </div>
    </>
  )
}

export default Game