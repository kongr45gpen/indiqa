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
          <h6 class="font-alt">Administrator login form</h6>

          <div class="form-section">
            <label>Username</label>
            <div class="input-control">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="input-contains-icon"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <span class="icon">
                <i class="far fa-wrapper fa-user small"></i>
              </span>
            </div>
          </div>

          <div class="form-section">
            <label>Password</label>
            <div class="input-control">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input-contains-icon"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="icon">
                <i class="far fa-wrapper fa-user small"></i>
              </span>
            </div>
          </div>

          <div class="form-section u-text-right">
            <button type="submit" className="w-100p">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
