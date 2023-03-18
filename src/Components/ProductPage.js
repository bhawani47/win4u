import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Jwl1 from '../images/jwl/jwl1.jpg';
import Jwl2 from '../images/jwl/jwl2.jpg';
import Jwl3 from '../images/jwl/jwl3.jpg';
import Jwl4 from '../images/jwl/jwl4.jpg';
import Jwl5 from '../images/jwl/jwl5.jpg';
import Jwl6 from '../images/jwl/jwl6.jpg';
import Jwl7 from '../images/jwl/jwl7.jpg';
import Jwl8 from '../images/jwl/jwl8.png';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import Loading from '../images/loading.png';

const ProductPage = (props) => {

    const [loading, setLoading] = useState('');
    const [product, setProduct] = useState({
        img:'',
        name:'',
        price:'' 
    });
    const [className1, setClassName1] = useState('flex flex-col items-center');
    const [className2, setClassName2] = useState('flex flex-col items-center');

    const allProducts = {
       1:{img:Jwl1, name:"22 karat  Gold Polki  with Red Stones", price:"168,000.00"},
       2:{img:Jwl2, name:"22 Karat Nath New Desgin", price:"44,000.00"},
       3:{img:Jwl3, name:"22 Karat Gold Bala Bangles", price:"129,000.00"},
       4:{img:Jwl4, name:"22 Karat  Rajsthani aad Neklace", price:"134,000.00"},
       5:{img:Jwl5, name:"22 Karat Gold Necklace Set", price:"184,000.00"},
       6:{img:Jwl6, name:"22k Gold Ring With Gems", price:"165,000.00"},
       7:{img:Jwl7, name:"22 karat  Gold Polki  with Red Stones", price:"39,550.00"},
       8:{img:Jwl8, name:"18k Earrings with Pink Stone", price:"48,950.00"}
    };
    
    const { productId,center } = useParams();
    
    useEffect(() => {

    setProduct(allProducts[productId]);
    if(center==="home"){
       setClassName1("flex flex-col items-center active-menu");
    }else{
       setClassName2("flex flex-col items-center active-menu");
    }
    setLoading('some');
    }, [])
    
    
  return (
    <>
    {loading=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div className="flex flex-row justify-start gap-5 home-header">
    <NavLink className="text-[24px] ml-[10%]" to={`/${center}`} >
    <div><ArrowBackRoundedIcon/></div>
    </NavLink>
    <div className="text-[20px]"> Product</div>
    </div>
    <div className="mx-[10%] mt-[80px] flex justify-center">
        <img src={product.img} alt={product.name}/>
    </div>
  <div className="mx-[10%] text-[16px] mt-3">
      <h1>{product.name}</h1>
      <h1 className="active-menu" >₹ {product.price}</h1>
  </div>
  <div>
    <button className="mx-[10%] sold-out-btn">Sold Out</button>
  </div>
   <Footer cl1={className1} cl2={className2} />
    </>
  )
}

export default ProductPage