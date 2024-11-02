import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import HeaderLoggedOut from "./HeaderLoggedOut"

function Header() {
  return (
    <>
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <img className="logo" src="white-logo.png"></img>
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              {" "}
              برنامه اساتید دانشگاه قم{" "}
            </Link>
          </h4>
          <form className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="username" className="form-control form-control-sm input-dark" type="text" placeholder="نام کاربری" autocomplete="off" />
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="password" className="form-control form-control-sm input-dark" type="password" placeholder="رمز عبور" />
              </div>
              <div className="col-md-auto">
                <button className="btn btn-success btn-sm">ورود دانشجو</button>
                <button className="btn btn-success btn-sm teacher-login">ورود استاد</button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </>
  )
}

export default Header
