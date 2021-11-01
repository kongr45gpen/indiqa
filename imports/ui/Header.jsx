import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export const Header = () => {
  const logout = () => Meteor.logout();

  return (
    <nav class="header u-relative u-unselectable header-animated">
      <div class="header-brand">
        <div class="nav-item no-hover">
          <a>
            <h6 className="title">IndiQA</h6>
          </a>
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
          <div className="nav-item text-center">
                <a href="#" title="Log out" onClick={logout}>
                    <span className="icon">
                    <i className="fa-wrapper fas fa-sign-out-alt"></i>
                    </span>
                </a>
            </div>
        </div>
      </div>
    </nav>
  )
}
