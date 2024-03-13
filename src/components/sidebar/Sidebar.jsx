import React from 'react'
import { MdDeliveryDining } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import './Sidebar.css'
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <div className='sidebar-main w-[40vw] px-10 bg-light2'>
        <div className='logo'>
          ManagerJS
        </div>
        <Link to={"/"}><div className='links'><MdDashboard className='logo-sub'/>Dashboard</div></Link>
        <Link to={"/products"}><div className='links'><FaShoppingCart   className='logo-sub'/>Products</div></Link>
        <Link to={"/orders"}><div className='links'><MdDeliveryDining className='logo-sub'/>Orders</div></Link>
      
    </div>
  )
}

export default Sidebar