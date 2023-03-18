import React,{useEffect, useState,useRef} from 'react'
import { useNavigate } from 'react-router';
import Header from './Header'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Profile from '../images/profile.png';
import AuthUser from './AuthUser';
import Loading from '../images/loading.png';

const Report = () => {

    const [loading, setLoading] = useState('');
    const [level1,setLevel1] =  useState('');
    const [level2,setLevel2] =  useState('');

    const [totalDoc1, setTotalDoc1] = useState(0);
    const [totalDoc2, setTotalDoc2] = useState(0);

    const [pageNo1,setPageNo1] = useState(1);
    const [pageNo2,setPageNo2] = useState(1);

    const perPage = 10;
    const token = localStorage.getItem('token');
    const RefCode = localStorage.getItem('refercode');
    document.body.style.background = "#f1f1f1";
    const navigate = useNavigate();
    const div1 = useRef();
    const div2 = useRef();
    const changeLevel = (id)=>{
        document.getElementById("level1").classList.remove('border-bottom-line');
        document.getElementById("level2").classList.remove('border-bottom-line');
        document.getElementById(id).classList.add('border-bottom-line');
        
        if(id==='level1'){
            div1.current.classList.remove('hide-submenu');
            div2.current.classList.remove('show-submenu');
            div1.current.classList.add('show-submenu');
            div2.current.classList.add('hide-submenu');
        }else{
            div1.current.classList.remove('show-submenu');
            div2.current.classList.remove('hide-submenu');
            div1.current.classList.add('hide-submenu');
            div2.current.classList.add('show-submenu');
        }
       
     }

    const decreasePageNo1 = ()=>{
        if(pageNo1 !== 1){
            setPageNo1(pageNo1 - 1);
        }
    }

    const decreasePageNo2 = ()=>{
        if(pageNo2 !== 1){
            setPageNo1(pageNo2 - 1);
        }
    }

    const increasePageNo1 = ()=>{
        if(pageNo1 !== Math.ceil(totalDoc1/perPage)){
            setPageNo1(pageNo1 + 1);
        }
    }

    const increasePageNo2 = ()=>{
        if(pageNo2 !== Math.ceil(totalDoc2/perPage)){
            setPageNo1(pageNo2 + 1);
        }
    }

    useEffect(()=>{
        AuthUser().then((data)=>{
            if(!data.message){
             navigate('/login');
            }
          });

        fetch('https://winbackend.onrender.com/api/getreport',{
            method:'post',
            body:JSON.stringify({referCode:RefCode}),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then((data)=>data.json()).then((finalData)=>{
            setTotalDoc1(Object.keys(finalData).length);
            setLevel1(finalData);
        }).then(()=>{

            fetch('https://winbackend.onrender.com/api/getreport2',{
            method:'post',
            body:JSON.stringify({referCode:RefCode}),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then((data)=>data.json()).then((finalData)=>{
            setTotalDoc2(Object.keys(finalData).length);
            setLevel2(finalData);
            setLoading('some');
        });

        });
     },[]);


    
  return (
    <>

    <Header title="Report" back="/account" />
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div className="flex flex-row justify-around bg-white mt-[10px]">
        <div className='p-[10px]' onClick={()=>changeLevel('level1')}>Level 1</div>
        <div className='p-[10px]' onClick={()=>changeLevel('level2')}>Level 2</div>
    </div>
    <div className="flex flex-row">
     <div id="level1" className="border-bottom-line w-[50%] h-[2px] "></div>
     <div id="level2" className="w-[50%] h-[2px] "></div>
    </div>

  <div ref={div1}>
    {
    Object.values(level1).map((val,index)=>{
        if(pageNo1 === Math.ceil((index+1)/perPage)){
            return(
                <div key={val._id} className="flex flex-row bg-white mt-[10px] p-[10px] mx-[15px] rounded-[5px] justify-between">
                <div className="flex flex-row">
                  <div>
                   <img className="h-[40px]" src={Profile} alt="add money" /></div>
                  <div className="flex flex-col mt-[5px] ml-[20px]">
                  <div className="text-[#39b54a] text-[14px]">{val.mobile}</div>
                  <div className="text-[#999] text-[14px]">ID: {val.ReferCode}</div>
                </div>
                </div>
                <div className="text-[#007aff] text-[12px] mt-[10px]">{(new Date(val.time)).toLocaleString('en-GB').split(',').join(' ')}</div>
               </div>
        )
        }
     })
     }
    <div className="flex flex-row relative justify-center items-center mx-[15px] mt-[15px]">
    <div onClick={decreasePageNo1} className="pagination-btn disabled-pagination-btn"><ArrowBackIosNewRoundedIcon/></div>
    <div className="pagination-number-data"><span className="text-[#007aff]">{pageNo1}</span>/{Math.ceil(totalDoc1/perPage)}</div>
    <div onClick={increasePageNo1} className="pagination-btn enabled-pagination-btn"><ArrowForwardIosRoundedIcon/></div>
    </div>

    </div>

    <div ref={div2} className="hide-submenu">
    {
    Object.values(level2).map((val,index)=>{
        if(pageNo2 === Math.ceil((index+1)/perPage)){
            return(
                <div key={val._id} className="flex flex-row bg-white mt-[10px] p-[10px] mx-[15px] rounded-[5px] justify-between">
                <div className="flex flex-row">
                  <div>
                   <img className="h-[40px]" src={Profile} alt="add money" /></div>
                  <div className="flex flex-col mt-[5px] ml-[20px]">
                  <div className="text-[#39b54a] text-[14px]">{val.mobile}</div>
                  <div className="text-[#999] text-[14px]">ID: {val.ReferCode}</div>
                </div>
                </div>
                <div className="text-[#007aff] text-[12px] mt-[10px]">{(new Date(val.time)).toLocaleString('en-GB').split(',').join(' ')}</div>
               </div>
        )
        }
     })
     }
    <div className="flex flex-row relative justify-center items-center mx-[15px] mt-[15px]">
    <div onClick={decreasePageNo2} className="pagination-btn disabled-pagination-btn"><ArrowBackIosNewRoundedIcon/></div>
    <div className="pagination-number-data"><span className="text-[#007aff]">{pageNo2}</span>/{Math.ceil(totalDoc2/perPage)}</div>
    <div onClick={increasePageNo2} className="pagination-btn enabled-pagination-btn"><ArrowForwardIosRoundedIcon/></div>
    </div>
    </div>

    

    </>
  )
}

export default Report;