import React,{ useEffect,useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import AssistantRoundedIcon from '@mui/icons-material/AssistantRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import RedeemRoundedIcon from '@mui/icons-material/RedeemRounded';
import Footer from './Footer'
import Profile from '../images/profile.png';
import telegram from '../images/telegram.jpg';
import Loading from '../images/loading.png';
import AuthUser from './AuthUser.js';


const Account = () => {

  const [loading, setLoading] = useState('');
  const [mobile, setMobile] = useState('');
  const [id, setId] = useState('');
  const [wallet, setWallet] = useState('');

  document.body.style.background = "#f1f1f1";
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  function showSubMenu(targetId){
    document.getElementById(targetId).classList.toggle("show-submenu");
    document.querySelector(`[data-plus=${targetId}]`).classList.toggle("hide-submenu");
    document.querySelector(`[data-plus=${targetId}]`).classList.toggle("show-submenu");
    document.querySelector(`[data-minus=${targetId}]`).classList.toggle("show-submenu");
  };
  const logout = ()=>{
     localStorage.removeItem('token');
     localStorage.removeItem('refercode');
     AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }
    });
   }

  useEffect(()=>{
    AuthUser().then((data)=>{
      if(!data.message){
       navigate('/login');
      }
    });
    fetch('https://winbackend.onrender.com/api/getprofile',{
      method:'get',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>data.json()).then((finalData)=>{
      setMobile(finalData.mobile);
      setId(finalData.id);
      setWallet(finalData.wallet);
      setLoading('some');
    });
   },[]);

  return (
    <>
     {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div>
      <div className='w-[90%] ml-[5%] bg-white rounded-[5px]'>
        <div className="mt-[20px] flex justify-items-start">
        <div className='p-5 pr-0'>
          <img style={{filter:"invert(50%)"}}  className="h-[40px]" src={Profile} alt="profile" /> 
        </div>
        <div className='p-5 text-[14px]'>
        <h1 className="mb-[6px]">User: <span className="text-[12px] ">Member +91{mobile}</span></h1>
        <h1 className="mb-[6px]">ID: <span className="text-[12px]">{id}</span></h1>
        <h1 className="mb-[6px]">Mobile: <span className="text-[12px]">+91</span><span className="text-[12px]">{mobile}</span></h1>
        <h1 className="">Available balance: <span className="text-[12px]">₹</span> <span className="text-[12px]">{parseFloat(wallet).toFixed(2)}</span> </h1>          
        </div>
        </div>
        <div className="flex justify-around pb-[18px] text-[14px]">
        <NavLink to="/recharge" ><div><button className="account-page-btn recharge-btn w-[89px]">Recharge</button></div></NavLink>
        <NavLink to="/withdrawal" ><div><button className="account-page-btn withdrawal-btn">Withdrawal</button></div></NavLink>
        </div>
      </div>

      <div className='w-[90%] ml-[5%] bg-white rounded-[5px] mt-[20px] mb-[100px] text-[#1a202c] text-[14px]'>
    <NavLink to="/promotion"> <div className="px-[15px] py-3"><RedeemRoundedIcon className="bg-[rgb(67, 50, 218)]"/> &nbsp; Promotion</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div onClick={()=>showSubMenu("wallet")} className="px-[15px] py-3"><AccountBalanceWalletRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; Wallet 
        <div className="plus-icon">
          <div className="show-submenu" data-plus="wallet">
          <AddCircleOutlineRoundedIcon />
          </div>
        <div className="hide-submenu" data-minus="wallet">
          <RemoveCircleOutlineRoundedIcon/>
          </div>
        </div>
        </div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        
        <div id="wallet" className="ml-[30px] hide-submenu">
        <NavLink to="/recharge"><div className="ml-[15px] py-[12px]">Recharge</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <NavLink to="/withdrawal"><div className="ml-[15px] py-[12px]">Withdrawal</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <NavLink to="/transaction"><div className="ml-[15px] py-[12px]">Transaction</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        </div>

        <NavLink to="/bank"> <div className="px-[15px] py-3"><AccountBalanceRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; Bank Card</div> </NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <NavLink to="/report"> <div className="px-[15px] py-3"><AssessmentRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; Report</div> </NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div onClick={()=>showSubMenu("security")} className="px-[15px] py-3"><GppGoodRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; Account Security 
        
        <div className="plus-icon" >
          <div className="show-submenu" data-plus="security">
          <AddCircleOutlineRoundedIcon />
          </div>
        <div className="hide-submenu" data-minus="security">
          <RemoveCircleOutlineRoundedIcon/>
          </div>
        </div>
        
        </div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div id="security" className="ml-[30px] hidden">
        <NavLink to="/reset" ><div className="ml-[15px] py-[12px]">Reset Password</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        </div>

        <div onClick={()=>showSubMenu("download")} className="px-[15px] py-3"><DownloadRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; App Download 
        <div className="plus-icon">
          <div className="show-submenu" data-plus="download">
          <AddCircleOutlineRoundedIcon />
          </div>
        <div className="hide-submenu" data-minus="download">
          <RemoveCircleOutlineRoundedIcon/>
          </div>
        </div>
        </div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div id="download" className="ml-[30px] hidden">
        <div className="ml-[15px] py-[12px]">Android Download</div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        </div>

        <NavLink to="/suggestion"><div className="px-[15px] py-3"><AssistantRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; Complaints & Suggestions</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div onClick={()=>showSubMenu("about")} className="px-[15px] py-3"><ArticleRoundedIcon className="bg-[rgb(67, 50, 218)]" /> &nbsp; About 
        <div className="plus-icon">
          <div className="show-submenu" data-plus="about">
          <AddCircleOutlineRoundedIcon />
          </div>
        <div className="hide-submenu" data-minus="about">
          <RemoveCircleOutlineRoundedIcon/>
          </div>
        </div>
        </div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <div id="about" className="ml-[30px] hidden">
        <NavLink to="/privacy"><div className="ml-[15px] py-[12px]">Privacy Policy</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <NavLink to="/agree"><div className="ml-[15px] py-[12px]">Risk Disclosure Agreement</div></NavLink>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        </div>

        <div className="p-[15px] flex"><img className="h-[20px] w-[20px]" src={telegram} alt="telegram"/> &nbsp; Join Official Channel</div>
        <hr className="h-[2px] ml-[15px] mr-[15px]"/>
        <button onClick={logout} className="w-[80%] logout-btn ml-[10%] text-bold">LOGOUT</button>
      </div>

    <Footer cl4="flex flex-col items-center active-menu" />
    </div>
    </>
  )
}

export default Account