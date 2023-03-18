import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductCard = (props) => {
  const center =  props.center;
  return (
    <>
    <NavLink to={`/product/${props.productId}/${center}`}>
    <div className="rounded-lg shadow-lg bg-white max-w-sm min-h-[300px]">
    <div href="" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-[1rem] p-[10px]" src={props.img} alt={props.text} />
    </div>
    <div className="p-[1rem]">
      <h5 className="text-gray-900 text-[14px] font-medium mb-2">{props.title}</h5>
      <p className="text-gray-700 text-base mb-4 active-menu">
      ₹ {props.price}
      </p>
    </div>
  </div>
  </NavLink>
  </>
  )
}

export default ProductCard