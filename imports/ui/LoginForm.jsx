import { Meteor } from "meteor/meteor"
import React, { useState } from "react"
import { toast } from "react-toastify"

export const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = (e) => {
    e.preventDefault()

    Meteor.loginWithPassword(username, password, (err) => {
      if (err !== undefined) {
        toast.error(err.message)
      } else {
        toast.success("Login successful!")
      }
    })
  }

  return (
    <div className="hero fullscreen u-center u-absolute">
      <div className="content ">
        <form onSubmit={submit} className="login-form">
          <h4>IndiQA</h4>
          <h6 className="font-alt">Administrator login form</h6>

          <div className="form-section">
            <label>Username</label>
            <div className="input-control">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="input-contains-icon"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon">
                <i className="far fa-wrapper fa-user small"></i>
              </span>
            </div>
          </div>

          <div className="form-section">
            <label>Password</label>
            <div className="input-control">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input-contains-icon"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon">
                <i className="far fa-wrapper fa-user small"></i>
              </span>
            </div>
          </div>

          <div className="form-section u-text-right">
            <button type="submit" className="w-100p">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
