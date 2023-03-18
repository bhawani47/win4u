import React,{useEffect,useState} from 'react'
import Footer from './Footer'
import Jwl1 from '../images/jwl/jwl1.jpg';
import Jwl2 from '../images/jwl/jwl2.jpg';
import Jwl3 from '../images/jwl/jwl3.jpg';
import Jwl4 from '../images/jwl/jwl4.jpg';
import Jwl5 from '../images/jwl/jwl5.jpg';
import Jwl6 from '../images/jwl/jwl6.jpg';
import Jwl7 from '../images/jwl/jwl7.jpg';
import Jwl8 from '../images/jwl/jwl8.png';
import ProductCard from './ProductCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AuthUser from './AuthUser.js';
import { useNavigate } from 'react-router';
import Loading from '../images/loading.png';

const Search = () => {

    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
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
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
   <div className="flex flex-row justify-around home-header header-shadow">
    <div className="text-[24px] ml-[10%]"><SearchRoundedIcon/></div>
    <input className="w-[80%] h-[35px] border-none outline-none" placeholder="Search here ..."/>
   </div>

    <div className='mb-[100px] mt-[60px] '>
    <div className="flex justify-center gap-[20px] m-2 mb-[20px]">
      <ProductCard center="search" productId="1" img={Jwl1} text="product 1" title="22 karat  Gold Polki  with Red Stones" price={"168,000.00"}   />
      <ProductCard center="search" productId="2" img={Jwl2} text="product 2" title="22 Karat Nath New Desgin" price={"44,000.00"}  />
    </div>
    <div className="flex justify-center gap-[20px] m-2 mb-[20px]">
      <ProductCard center="search" productId="3" img={Jwl3} text="product 4" title="22 Karat Gold Bala Bangles" price={"129,000.00"}  />
      <ProductCard center="search" productId="4" img={Jwl4} text="product 3" title="22 Karat  Rajsthani aad Neklace" price={"134,000.00"}  />
    </div>
    <div className="flex justify-center gap-[20px] m-2 mb-[20px]">
      <ProductCard center="search" productId="5" img={Jwl5} text="product 5" title="22 Karat Gold Necklace Set" price={"184,000.00"}  />
      <ProductCard center="search" productId="6" img={Jwl6} text="product 6" title="22k Gold Ring With Gems" price={"165,000.00"}  />
    </div>
    <div className="flex justify-center gap-[20px] m-2 mb-[20px]">
      <ProductCard center="search" productId="7" img={Jwl7} text="product 7" title="22 karat  Gold Polki  with Red Stones" price={"39,550.00"}  />
      <ProductCard center="search" productId="8" img={Jwl8} text="product 8" title="18k Earrings with Pink Stone" price={"48,950.00"}  />
    </div>
    
    </div>
     <Footer cl2="flex flex-col items-center active-menu" />
    </>
  )
}

export default Search;
