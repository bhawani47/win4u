import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router';
import Header from './Header'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AuthUser from './AuthUser.js';
import Loading from '../images/loading.png';

const Suggestion = () => {


  let t = new Date().getTime();
  const [loading, setLoading] = useState('');
  const [firstTime,setFirstTime] = useState('');
  const [lastTime,setLastTime] = useState(t);
  const [pageNo, setPageNo] = useState(1);
  const [sovledNo,setSolvedNo] = useState(1);
  const [pendingNo,setPendingNo] = useState(1);
  const [totalDoc,setTotalDoc] = useState(1);
  const [suggestionHistrory,setSuggestionHistrory]= useState([]);
  const [solved,setSolved] = useState([]);
  const [pending,setPending] = useState([]);
  
  const navigate = useNavigate();
  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');
  
  const changeLevel = (id)=>{
    document.getElementById("level1").classList.remove('border-bottom-line');
    document.getElementById("level2").classList.remove('border-bottom-line');
    document.getElementById(id).classList.add('border-bottom-line');

    if(id==='level1'){
       setSuggestionHistrory(solved);
       setTotalDoc(sovledNo);
    }else{
      setSuggestionHistrory(pending);
      setTotalDoc(pendingNo);
    }
    setPageNo(1);

    }

  const getSuggestionRecord = (type)=>{ 

    fetch('https://winbackend.onrender.com/api/getsuggestion',{
      method:'post',
      body:JSON.stringify({}),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
       let solvedArr = [];
       let pendingArr = [];

       Object.values(finalData.records).map((val,index)=>{
         if(val.solved){
          solvedArr.push(val);
         }else{
          pendingArr.push(val);
         }
       });

       setSolvedNo(finalData.count2);
       setPendingNo(finalData.count1)
       setTotalDoc(finalData.count2);
       setPending(pendingArr);
       setSolved(solvedArr);
       setSuggestionHistrory(solvedArr);

    });

  }

  const OpenRuleModal = (type,query,ans)=>{
    document.getElementById('rule-modal').classList.add('show-submenu');
    document.getElementById("modal-background").classList.add("show-submenu");
    document.getElementById('title').innerHTML = type;
    document.getElementById('query').innerHTML = query;
    document.getElementById('answer').innerHTML = ans;
    
    }

  const closeRuleModal = ()=>{
    document.getElementById('rule-modal').classList.remove('show-submenu');
    document.getElementById("modal-background").classList.remove("show-submenu");
  }

  const prevRecords = ()=>{
      if(pageNo !==1){
        setPageNo(pageNo - 1);
      }
  }

  const nextRecords = ()=>{
    if(pageNo !==Math.ceil(totalDoc/10)){
      setPageNo(pageNo+1);
    }
  }

 
 useEffect(()=>{
  AuthUser().then((data)=>{
    if(!data.message){
     navigate('/login');
    }
    setLoading('some');
  });

  getSuggestionRecord();

 },[]);

  return (
    <>
        <Header title="Complaints & Suggestion" back="/account" iconPath="/addsuggestion" icon="plus" />
       {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
        <div className="flex flex-row justify-around py-[20px] bg-white mt-[10px]">
        <div onClick={()=>changeLevel('level1')}>Completed</div>
        <div onClick={()=>changeLevel('level2')}>Wait</div>
    </div>
    <div className="flex flex-row">
     <div id="level1" className="border-bottom-line w-[50%] h-[2px] "></div>
     <div id="level2" className="w-[50%] h-[2px] "></div>
    </div>

    <div id="modal-background" className="modal-background hide-submenu"></div>
   <div id="rule-modal" className="rule-modal w-[90%] ml-[5%] setRuleModal">
      <div className="rule-modal-content">
      <div className="rule-modal-title bg-white" id="title"></div>
      <div className="w-[100%] flex flex-col p-[12px] text-[10px] leading-[20px] overflow-auto">
     <p id="query"> </p>
     <p className="mt-4" id="answer"> </p>
      </div>
     <div className="flex relative flex-1 items-center min-h-[60px] justify-center bg-white">
     <div onClick={closeRuleModal} className="close-btn-first close-btn-second rule-close-btn">CLOSE</div>
     </div>
      </div>      
   </div>



   {
    suggestionHistrory.slice((pageNo-1)*10, (pageNo*10)).map((val,index)=>{
        return (
          <div key={val._id} className="flex flex-row bg-white mt-[10px] p-[10px] mx-[15px] rounded-[5px] justify-between">
           <div className="flex flex-row">
             <div className="flex flex-col mt-[5px] ml-[20px]">
             <div className="text-black text-[14px]">{val.desc.substring(0,25)+'..'}</div>
             <div className="text-[#999] text-[12px]">{val.solution.substring(0,25)+'..'}</div>
           </div>
           </div>
           <div className="text-[#007aff] text-[12px] mt-[10px]" onClick={()=>OpenRuleModal(val.type,val.desc,val.solution)}>{val.type}</div>
           <div className="text-black text-[12px] mt-[10px]">{(new Date(val.time)).toLocaleString('en-GB').split(',').join(' ')}</div>
          </div>
          )
    })
   }

   <div className="flex flex-row relative justify-center items-center">
   <div className="pagination-btn disabled-pagination-btn" onClick={prevRecords}><ArrowBackIosNewRoundedIcon/></div>
   <div className="pagination-number-data">
    <span className="text-[#007aff]">{pageNo}</span>/{Math.ceil(totalDoc/10)}
   </div>
   <div className="pagination-btn enabled-pagination-btn" onClick={nextRecords}><ArrowForwardIosRoundedIcon/></div>
   </div>

    </>
  )
}

export default Suggestion