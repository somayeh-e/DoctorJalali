import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// My components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import RegisterTeacher from "./components/RegisterTeacher"
import ProHeaderLoggedIn from "./components/ProHeaderLoggedIn"
import ProProfile from "./components/ProProfile"
import StuProfile from "./components/StuProfile"

function Main() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <ProHeaderLoggedIn />
        <Routes>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/registerTeacher" element={<RegisterTeacher />} />
          <Route path="/profileTeacher/*" element={<ProProfile />} />
          <Route path="/profileStudent/*" element={<StuProfile />} />
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
