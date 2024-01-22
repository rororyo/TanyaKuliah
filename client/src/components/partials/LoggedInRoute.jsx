import React from 'react'
import { Navigate } from 'react-router-dom'

const LoggedInRoute = ({children}) => {
  function getToken() {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");
  
    if (!token || !expirationTime) {
      return null;
    }
  
    if (new Date().getTime() > parseInt(expirationTime, 10)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      return null;
    }
  
    return token;
  }
  const validToken=getToken()
  if(!validToken){
    return <Navigate to="/login" />
  }
  return (
    <>{children}</>
  )
}

export default LoggedInRoute