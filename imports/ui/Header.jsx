import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <nav class="header u-unselectable header-animated">
      <div class="header-brand">
        <div class="nav-item no-hover">
          <a>
            <h6 class="title">IndiQA</h6>
          </a>
        </div>
        <div class="nav-item nav-btn" id="header-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="header-nav" id="header-menu">
        <div class="nav-right">
          <NavLink to="/" exact={true} className="nav-item" activeClassName="active">
            <span>Main</span>
          </NavLink>
          <NavLink to="/presenter" className="nav-item" activeClassName="active">
            <span><i className="fa-wrapper fas fa-desktop"></i>&nbsp;Presenter View</span>
          </NavLink>
          <NavLink to="/admin" className="nav-item" activeClassName="active">
            <span>Admin</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
