import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { NavLink } from "react-router-dom";

const Footer = (props) => {
  
  return (
    <>
      <div className="container">
      <div className="bottom-menu">
<NavLink to="/home">
      <div className={props.cl1}>
      <HomeRoundedIcon/>
      <div className="text-[14px]">Home</div>
      </div>
</NavLink>
<NavLink to="/search">
      <div className={props.cl2}>
      <SearchRoundedIcon/>
      <div className="text-[14px]">Search</div>
      </div>
      </NavLink>
      <NavLink to="/game">
      <div className={props.cl3}>
      <SportsEsportsRoundedIcon/>
      <div className="text-[14px]">Win</div>
      </div>
      </NavLink>
      <NavLink to="/account">
      <div className={props.cl4}>
      <PersonRoundedIcon/>
      <div className="text-[14px]">My</div>
      </div>
      </NavLink>
      </div>
      </div>
    </>
  );
};

Footer.defaultProps = {
    cl1:"flex flex-col items-center",
    cl2:"flex flex-col items-center",
    cl3:"flex flex-col items-center",
    cl4:"flex flex-col items-center"
}

export default Footer;