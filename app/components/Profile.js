import React, { useContext, useEffect, useState } from "react"
import { NavLink, Route, Routes, useParams } from "react-router-dom"
import Axios from "axios"
import StuEdit from "./StuEdit"
import ProChat from "./ProChat"
import ProProgram from "./ProProgram"
import Page from "./Page"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Chatroom from "./Chatroom"

function Profile() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  console.log(appState.isProfessor)
  const [profileData, setProfileData] = useState({
    profileUsername: appState.user.username,
    profileAvatar: "../images/profile.jpg"
  })

  return (
    <Page title="پروفایل" wide={true}>
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
        {appState.isProfessor ? (
          <NavLink to="program" className="nav-item nav-link" onClick={() => appDispatch({ type: "hideChatroom" })}>
            افزودن برنامه
          </NavLink>
        ) : (
          ""
        )}
      </div>

      <Routes>
        <Route path="" element={<StuEdit />} />
        <Route path="messages" element={appState.isShowChatroom ? <Chatroom /> : <ProChat />} />
        <Route path="program" element={<ProProgram />} />
      </Routes>
    </Page>
  )
}

export default Profile
