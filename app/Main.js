import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import RegisterTeacher from "./components/RegisterTeacher"
import ProHeaderLoggedIn from "./components/ProHeaderLoggedIn"
import ProProfile from "./components/ProProfile"
import StuProfile from "./components/StuProfile"
import About from "./components/About"
import Terms from "./components/Terms"

function Main() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <ProHeaderLoggedIn />
        <Routes>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/profileTeacher/*" element={<ProProfile />} />
          <Route path="/profileStudent/*" element={<StuProfile />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
