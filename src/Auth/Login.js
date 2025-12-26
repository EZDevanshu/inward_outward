import { Link } from "react-router-dom";
import "../style/login.css"
import React from 'react'

function Login() {
    return (
      <>
        {/* Auth section */}
        <div className="auth-container">
          {/* Left side */}
          <div className="auth-login-left">
            <div className="auth-login-left-text">
              <h1>
                <big>Welcome Back ...!!</big>
              </h1>
            </div>
            <a href="/dashboard" className="dashboard-btn">
              Go to Dashboard
            </a>
          </div>

          {/* Right side */}
          <div className="auth-login-right">
            <div className="login-card">
              <div className="login-title">
                <h2>Login</h2>
              </div>

              <div className="login-input">
                <div className="input">
                  <input type="text" placeholder="username" />
                </div>

                <div className="input">
                  <input type="password" placeholder="Password" />
                </div>

                <div className="login-rememberme-froget-pass">
                  <label>
                    <input type="checkbox" className="login-remember" />
                    Remember_me
                  </label>

                  <a href="/forget" className="login-forget">
                    forget Password ?
                  </a>
                </div>

                <div className="login-button">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Login;