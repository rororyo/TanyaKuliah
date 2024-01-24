import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <h2>Our features:</h2>
<ul>
    <li><Link to="/college-buddy">College Buddy</Link></li>
    <li><Link to="/group-chat">Group Chat</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
</ul>
    </div>
  )
}

export default Home