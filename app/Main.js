import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
import HeaderLoggedIn from "./components/HeaderLoggedIn"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      avatar: localStorage.getItem("avatar")
    }
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
              <Route path="/profile/:username/*" element={<Profile />} />
              <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
              <Route path="/register-teacher" element={<RegisterTeacher />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/terms" element={<Terms />} />
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
