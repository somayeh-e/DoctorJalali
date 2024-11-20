import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

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
import ProProfile from "./components/ProProfile"
import StuProfile from "./components/StuProfile"
// import Profile from "./components/Profile"
import HeaderLoggedIn from "./components/HeaderLoggedIn"
import CreateProgram from "./components/CreateProgram"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      avatar: localStorage.getItem("avatar")
    },
    isCreateProgramOpen: false,
    isLoading: false
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
      case "isLoading":
        draft.isLoading = true
        return
      case "notLoading":
        draft.isLoading = false
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.user.token)
      localStorage.setItem("username", state.user.username)
      localStorage.setItem("avatar", state.user.avatar)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("avatar")
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
              <Route path="/profileTeacher/*" element={<ProProfile />} />
              <Route path="/profileStudent/*" element={<StuProfile />} />
              <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
              <Route path="/register-teacher" element={<RegisterTeacher />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
            <CSSTransition timeout={330} in={state.isCreateProgramOpen} classNames="search-overlay" unmountOnExit>
              <div className="search-overlay">
                <CreateProgram />
              </div>
            </CSSTransition>
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
