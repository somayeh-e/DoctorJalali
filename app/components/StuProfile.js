import React, { useEffect } from "react"
import { NavLink, Route, Routes } from "react-router-dom"

import StuEdit from "./StuEdit"
import StuChat from "./StuChat"

function StuProfile() {
  return (
    <>
      <div class="container py-md-5">
        <h3>
          <img className="avatar-small" src="profile.jpg"></img>
          سمیه اقبالیون
        </h3>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <NavLink to="" end className="nav-item nav-link">
            حساب کاربری
          </NavLink>
          <NavLink to="messages" className="nav-item nav-link">
            پیام ها
          </NavLink>
        </div>

        <Routes>
          <Route path="" element={<StuEdit />} />
          <Route path="messages" element={<StuChat />} />
        </Routes>
      </div>
    </>
  )
}

export default StuProfile
