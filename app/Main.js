import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import RegisterTeacher from "./components/RegisterTeacher"
<<<<<<< HEAD
import ProHeaderLoggedIn from "./components/ProHeaderLoggedIn"
import ProProfile from "./components/ProProfile"
import StuProfile from "./components/StuProfile"
=======
import About from "./components/About"
import Terms from "./components/Terms"
>>>>>>> 1e2773c8e4164f2bb424b338e9432bbd45d1e8a5

function Main() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <ProHeaderLoggedIn />
        <Routes>
          <Route path="/" element={<HomeGuest />} />
<<<<<<< HEAD
          <Route path="/registerTeacher" element={<RegisterTeacher />} />
          <Route path="/profileTeacher/*" element={<ProProfile />} />
          <Route path="/profileStudent/*" element={<StuProfile />} />
=======
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
>>>>>>> 1e2773c8e4164f2bb424b338e9432bbd45d1e8a5
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
