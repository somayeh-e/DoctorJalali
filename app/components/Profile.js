import React, { useContext, useEffect, useState } from "react"
import { NavLink, Route, Routes, useParams } from "react-router-dom"
import Axios from "axios"
import StuEdit from "./StuEdit"
import StuChat from "./StuChat"
import ProProgram from "./ProProgram"
import Page from "./Page"
import StateContext from "../StateContext"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "../images/profile.jpg"
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token })
        // console.log(response.data)
        setProfileData(response.data)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
  }, [])

  return (
    <Page title="پروفایل">
      <h3>
        <img className="avatar-small" src={profileData.profileAvatar}></img>
        {profileData.profileUsername}
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
        <Route path="" element={<StuEdit />} />
        <Route path="messages" element={<StuChat />} />
        {/* <Route path="program" element={<ProProgram />} /> */}
      </Routes>
    </Page>
  )
}

export default Profile
