import React,{ useState,useEffect } from "react";
import { useNavigate } from 'react-router';
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Header from "./Header";
import cup from '../images/cup.png';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const BetRecord = () => {
  let t = new Date().getTime();

  const [loading, setLoading] = useState('');
  const [server, setServer] = useState('parity');
  const [userHistory, setUserHistrory] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [totalDoc,setTotalDoc] = useState(0);
  const [lastTime,setLastTime] = useState(t);
  const [firstBetTime, setFirstBetTime] = useState(0);
  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggelUpDown = (id) => {
    document.getElementById(id).firstChild.classList.toggle("hide-submenu");
    document.getElementById(id).lastChild.classList.toggle("show-submenu");
    document.querySelector(`[data-id=${id}]`).classList.toggle("hide-submenu");
  };

  const changeServer = (id)=>{
  
    document.getElementById("parity").classList.remove('active-server');
    document.getElementById("sapre").classList.remove('active-server');
    document.getElementById("bcone").classList.remove('active-server');
    document.getElementById("emerd").classList.remove('active-server');
    document.getElementById(id).classList.add('active-server');
  
  
    if(server !== id){
      setServer(id);
      getBetRecord(id,'next',1);
      setPageNo(1);
    }

  }

  const getBetRecord = (id,type='next',change)=>{
    let body = JSON.stringify({server:id,lastTime:lastTime,firstBetTime:firstBetTime,type:type});
    if(change === 1){
      let x = new Date().getTime();
      body = JSON.stringify({server:id,lastTime:x,firstBetTime:firstBetTime,type:type});
    }
    fetch('https://winbackend.onrender.com/api/getbetrecords',{
      method:'post',
      body:body,
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      let finalObj = {};
      let ObjKey = Object.keys(finalData.bet);
      let ObjVal = Object.values(finalData.bet).reverse();
      ObjKey.map((val,index)=>{
        finalObj[index] = ObjVal[val];
      });
      setTotalDoc(1);
      if(type==='next'){
          setUserHistrory(finalData.bet);
          let len = Object.values(finalData.bet).length - 1;
          setLastTime(Object.values(finalData.bet)[len]['time']);
          setFirstBetTime(Object.values(finalData.bet)[0]['time']);
      }else{
          setUserHistrory(finalObj);
          let len = Object.values(finalObj).length - 1;
          setLastTime(Object.values(finalObj)[len]['time']);
          setFirstBetTime(Object.values(finalObj)[0]['time']);
      }
      setTotalDoc(finalData.count);
      
    });
  }
  
  const nextPage = ()=>{
    if(pageNo !==Math.ceil(totalDoc/10)){
      setPageNo(pageNo+1);
      getBetRecord(server);
    }
  };

  const prevPage = ()=>{
    if(pageNo !==1){
      setPageNo(pageNo - 1);
      getBetRecord(server,'prev');
    }
  }
  
  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }
    });
    getBetRecord('parity');
    setLoading('some');
   },[])


  return (
    <>
      <Header back="/game" title="Bet Record" />
      {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
      <div className="flex justify-around text-[#8d95a0] bg-white mt-[10px] ">
      <div id="parity" onClick={()=>changeServer("parity")} className="active-server w-[25%] py-3"><button className="ml-[25%]">Parity</button></div>
      <div id="sapre" onClick={()=>changeServer("sapre")}  className="w-[25%] py-3"><button className="ml-[25%]">Sapre</button></div>
      <div id="bcone" onClick={()=>changeServer("bcone")}  className="w-[25%] py-3"><button className="ml-[25%]">Bcone</button></div>
      <div id="emerd" onClick={()=>changeServer("emerd")} className="w-[25%] py-3"><button className="ml-[25%]">Emerd</button></div>
      </div>

      <div className="flex flex-col mt-[10px] bg-white ">
        <div className="self-center flex flex-row"><img src={cup} className="h-[16px] mt-[3px]" alt="win" /> My {server.charAt(0).toUpperCase() + server.slice(1)} Record</div>
         <div className="bg-[#565eff] h-[2px] w-[100%] mt-1.5"></div>
      </div>

     
    


     {Object.values(userHistory).map((val,index)=>{
       return( <div key={val._id}>
        <div className="flex flex-row justify-start flex-start p-[10px] pl-[20px] bg-white">
          <div className="flex flex-row gap-[10px] text-[14px]">
            <div>{val.Period}</div>
            <div className={val.result}>
              {val.result} <span>{parseInt(val.total_amount)-(parseInt(val.total_amount)*0.02)}</span>
            </div>
          </div>
          <div id={'a'+val.time}
            className="ml-auto pr-[15px]"
            onClick={() => toggelUpDown('a'+val.time)} >
            <KeyboardArrowDownRoundedIcon />
            <KeyboardArrowUpRoundedIcon className="hide-submenu" />
          </div>
        </div>
  
        <div
          className="flex flex-col bg-white text-[13px] hide-submenu"
          data-id={'a'+val.time} >
          <div className="text-[#1dcc70] p-[20px]">Period Detail</div>
          <div className="flex flex-row p-[15px] justify-around">
            <div className="flex flex-col">
              <div>Period id</div>
              <div>Contract Money</div>
              <div>Contract Count</div>
              <div>Delivery</div>
              <div>Fee</div>
              <div>Result</div>
              <div>Select</div>
              <div>Status</div>
              <div>Amount</div>
              <div>Create time</div>
            </div>
  
            <div className="flex flex-col">
              <div>{val.Period}</div>
              <div>{val.total_amount}</div>
              <div>{val.no_of_orders}</div>
              <div>{parseInt(val.total_amount)-(parseInt(val.total_amount)*0.02)}</div>
              <div>{(parseInt(val.total_amount)*0.02)}</div>
              <div>{val.win_number}</div>
              <div>{val.value}</div>
              <div className={val.result}>{val.result}</div>
              <div className={val.result}>{val.betType === 'number' && val.result === 'win' ?(parseInt(val.total_amount)-(parseInt(val.total_amount)*0.02))*9 : parseInt(val.total_amount)-(parseInt(val.total_amount)*0.02)}</div>
              <div>{ (new Date(val.time).getDate())<10 ?`0${(new Date(val.time).getDate())}` :(new Date(val.time).getDate()) }-{(new Date(val.time).getMonth() + 1)<10 ?`0${(new Date(val.time).getMonth() + 1)}` :(new Date(val.time).getMonth() + 1) }-{new Date(val.time).getFullYear()} {new Date(val.time).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
        </div>);
     })}


      {/* 
      Period: "20230117332"
      betType: "color"
      contract_amount: 10
      no_of_orders: 1
      result: "Pending"
      time: 1673953503524
      total_amount: 10
      userId: "63c177168ec3ad47652ea37f"
      value: "Green"
      _id: "63c680df613b20f115451f21" 
      */}


      <div className="flex flex-row relative justify-center items-center mx-[15px] mt-[15px]">
        <div onClick={prevPage} className="pagination-btn disabled-pagination-btn">
          <ArrowBackIosNewRoundedIcon />
        </div>
        <div className="pagination-number-data">
          <span className="text-[#007aff]">{pageNo}</span>/{Math.ceil(totalDoc/10)}
        </div>
        <div onClick={nextPage} className="pagination-btn enabled-pagination-btn">
          <ArrowForwardIosRoundedIcon />
        </div>
      </div>
    </>
  );
};

export default BetRecord;
