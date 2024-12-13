import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [username, setUsername] = useState()
  const [stuNumber, setStuNumber] = useState()
  const [password, setPassword] = useState()

  async function handleLoginStudent() {
    try {
      const response = await Axios.post("/s/login", { stuNumber, password })
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "با موفقیت وارد شدید" })
        navigate("/professors")
      } else {
        console.log("Incorrect stuNumber / password.")
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  async function handleLoginProfessor() {
    try {
      appDispatch({ type: "isProfessor" })

      const response = await Axios.post("/professor/login", { username, password })

      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })
        document.cookie = `access_token=${response.data.token}`
        appDispatch({ type: "flashMessage", value: "با موفقیت وارد شدید." })
        navigate(`/profile/${appState.user.id}`)
      } else {
        console.log("Incorrect username / password.")
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item-login text-center">
              {" "}
              <a className="nav-link active btl" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                دانشجو
              </a>{" "}
            </li>
            <li className="nav-item-login text-center">
              {" "}
              <a className="nav-link btr" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                استاد
              </a>{" "}
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div className="form px-4">
                {" "}
                <input onChange={e => setStuNumber(e.target.value)} type="text" name="" className="form-control" placeholder="شماره دانشجویی" />
                <input onChange={e => setPassword(e.target.value)} type="text" name="" className="form-control" placeholder="رمز ورود" />
                <button onClick={handleLoginStudent} className="btn btn-dark btn-block">
                  ورود
                </button>{" "}
              </div>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div className="form px-4">
                {" "}
                <input onChange={e => setUsername(e.target.value)} type="text" name="" className="form-control" placeholder="نام کاربری" />
                <input onChange={e => setPassword(e.target.value)} type="text" name="" className="form-control" placeholder="رمز ورود" />
                <button onClick={handleLoginProfessor} className="btn btn-dark btn-block">
                  ورود
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
