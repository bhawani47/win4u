import React from 'react'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { NavLink } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';


const Header = (props) => {
   

  return (
    <>
    <div className="header sticky top-0">
    <NavLink to={props.back}><div className="pl-[10px]"><ArrowBackIosNewRoundedIcon/></div></NavLink>
    <div className="text-[18px]">{props.title}</div>
    { props.icon==="plus"?<NavLink to={props.iconPath}><div className="pr-[10px]"><AddRoundedIcon/></div></NavLink> : (props.icon==="menu" ? <NavLink to={props.iconPath}><div className="pr-[10px]"><MenuRoundedIcon/></div></NavLink>: <div className="pr-[10px]"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)}
    </div>
    </>
  )
}

export default Header