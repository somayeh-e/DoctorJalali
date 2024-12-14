import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:3005"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import RegisterTeacher from "./components/RegisterTeacher"
import Home from "./components/Home"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import FlashMessages from "./components/FlashMessages"
import Profile from "./components/Profile"
import CreateProgram from "./components/CreateProgram"
import Login from "./components/Login"
import ProfessorPage from "./components/ProfessorPage"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
      studentNumber: localStorage.getItem("studentNumber"),
      image: localStorage.getItem("image")
    },
    isCreateProgramOpen: false,
    isShowChatroom: false,
    schedules: []
    // isProfessor: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "openCreateProgram":
        draft.isCreateProgramOpen = true
        return
      case "closeCreateProgram":
        draft.isCreateProgramOpen = false
        return
      case "showChatroom":
        draft.isShowChatroom = true
        return
      case "hideChatroom":
        draft.isShowChatroom = false
        return
      case "addSchedule":
        draft.schedules.push(action.value)
        return
      case "updateSchedule":
        draft.schedules = action.value
      case "isProfessor":
        draft.isProfessor = true
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.user.token)
      localStorage.setItem("username", state.user.username)
      localStorage.setItem("id", state.user.id)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("id")
    }
  }, [state.loggedIn])

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <FlashMessages messages={state.flashMessages} />
            <Header />
            <Routes>
              <Route path="/profile/:id/*" element={<Profile />} />
              <Route path="/" element={<HomeGuest />} />
              <Route path="/professors" element={<Home />} />
              <Route path="/register-teacher" element={<RegisterTeacher />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/professor-page" element={<ProfessorPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
