import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function ProHeaderLoggedIn() {
  return (
    <>
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <img className="logo" src="white-logo.png"></img>
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <a href="/" className="text-white">
              {" "}
              برنامه اساتید دانشگاه قم{" "}
            </a>
          </h4>
          <div className="flex-row my-3 my-md-0">
            {/* <a href="#" className="text-white mr-2 header-search-icon">
              <i className="fas fa-search"></i>
            </a>
            <span className="mr-2 header-chat-icon text-white">
              <i className="fas fa-comment"></i>
              <span className="chat-count-badge text-white"> </span>
            </span> */}
            <a href="#" className="mr-2">
              <img className="small-header-avatar" src="profile.jpg" />
            </a>
            <Link className="btn btn-sm btn-success mr-2" to={"/profileTeacher"}>
              امیرجلالی بیدگلی
            </Link>
            <Link className="btn btn-sm btn-success mr-2" to={"/profileStudent"}>
              سمیه اقبالیون
            </Link>
            <button className="btn btn-sm btn-secondary">خروج از حساب</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default ProHeaderLoggedIn
