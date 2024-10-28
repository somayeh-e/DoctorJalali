import React from "react"
import ReactDOM from "react-dom/client"
import { Routes, Route } from "react-router-dom"

// My components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"

function Main() {
  return (
    <>
      <Header />
      {/* <Routes>
        <Route path="/" element={<HomeGuest />} />
      </Routes> */}
      <HomeGuest />
      <Footer />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
