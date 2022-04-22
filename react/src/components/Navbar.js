import React, { useRef, useState, useEffect } from 'react'
import {Link} from "react-router-dom";


export default function Navbar(props) {
  return (
      <nav className="navbar">
        <ul>
          <li><Link to="/">Index</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
  )
}

