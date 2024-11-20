import React, { useEffect, useContext } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import StateContext from "../StateContext"
import LoadingDotsIcon from "./LoadingDotsIcon"

import ProEdit from "./ProEdit"
import ProChat from "./ProChat"
import ProProgram from "./ProProgram"

function ProProfile() {
  const appState = useContext(StateContext)

  return (
    <>
      <div class="container py-md-5">
        <h3>
          <img className="avatar-small" src="profile.jpg"></img>
          امیرجلالی بیدگلی
        </h3>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <NavLink to="" end className="nav-item nav-link">
            حساب کاربری
          </NavLink>
          <NavLink to="messages" className="nav-item nav-link">
            پیام ها
          </NavLink>
          <NavLink to="program" className="nav-item nav-link">
            افزودن برنامه
          </NavLink>
        </div>

        <Routes>
          <Route path="" element={<ProEdit />} />
          <Route path="messages" element={<ProChat />} />
          <Route path="program" element={appState.isLoading ? <LoadingDotsIcon /> : <ProProgram />} />
        </Routes>
      </div>
    </>
  )
}

export default ProProfile
