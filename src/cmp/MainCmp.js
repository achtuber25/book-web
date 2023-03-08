import Logo1 from "../images/vA.png"
import Logo2 from "../images/vanayaLogo.png"
import { useState, useEffect } from 'react';

import React from 'react';

import { obj } from './config'

//#38b6ff8a
import { NavLink, Outlet } from "react-router-dom";
import './nav.css'
import BottomBarMain from "./BottomBarMain";

const navStyle = {
  backgroundColor: "white",
  width: "100%",
  position: 'sticky',
  top: '0px',
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
}
const navbrand = {
  height: "70px",
}

const MainCmp = () => {
  const [Logo, setLogo] = useState({});

  let isSafe = JSON.parse(localStorage.getItem('isSaftey'))
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isSaftey')) === true) {
      setLogo({
        width: 120,
        height: 110,
        margin: "-23px",
        logo: Logo1,
      })

    }
    else {
      setLogo({
        width: 70,
        height: 55,
        margin: "0px",
        logo: Logo2,
      })
    }
  }, [])
  function removeItem() {
    localStorage.removeItem("email")
    window.location.reload(false)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg justify-content-center" style={navStyle}>
        <div className="container-fluid"  >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "1px solid #38b6ff", color: "#38b6ff8a" }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <a className="navbar-brand" style={navbrand} >
            <img
              src={Logo.logo}
              width={Logo.width}
              height={Logo.height}
              className="d-inline-block align-top"
              alt=""
              style={{ marginTop: Logo.margin, color: "red", }}
            />
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: "#000000ed" }} to="/Settings" >Settings</NavLink>
              </li>{

                isSafe !== true && <li className="nav-item">
                  <a className="nav-link" style={{ color: "#000000ed" }} href="https://vanaya.netlify.app/" >
                    Love version💙
                  </a>
                </li>
              }
              {
                localStorage.getItem("email") && <li>
                  <a className="nav-link" style={{ color: "rgb(222 96 155)" }} onClick={removeItem} >
                    Logout
                  </a>
                </li>
              }
            </ul>

          </div>
        </div>
      </nav >
      <Outlet />

      <BottomBarMain />

    </div >
  );
}

export default MainCmp;