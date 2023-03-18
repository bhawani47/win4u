import React from 'react'

const AuthUser = async() => {
   const token = localStorage.getItem('token');
   const refcode = localStorage.getItem('refercode');
   let isValid = await fetch("https://winbackend.onrender.com/api/authuser",{
    method:"post",
    body:JSON.stringify({refcode:refcode}),
    headers:{
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`
    }
  });
  isValid = await isValid.json();
  return isValid;
}

export default AuthUser;