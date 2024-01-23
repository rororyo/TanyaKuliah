import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const navigate=useNavigate()
  async function handleClick(){
    
    try{
      await axios.get("http://localhost:4000/logout",{withCredentials:true})
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
      navigate("/")
    }
catch(err){
  console.log(err)
}
  }
  return (
    <div>
      Dashboard
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default Dashboard