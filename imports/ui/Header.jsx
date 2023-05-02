import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export const Header = () => {
  const logout = () => Meteor.logout()

  return (
    <nav className="header u-relative u-unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <a>
            <h6 className="title">IndiQA</h6>
          </a>
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-right">
          <NavLink
            to="/"
            exact={true}
            className="nav-item"
            activeClassName="active"
          >
            <span>Main</span>
          </NavLink>
          <NavLink
            to="/presenter"
            className="nav-item"
            activeClassName="active"
          >
            <span>
              <i className="fa-wrapper fas fa-desktop"></i>&nbsp;Presenter View
            </span>
          </NavLink>
          <NavLink to="/streaming" className="nav-item" activeClassName="active">
            <span>Streaming</span>
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
