import React, { useEffect, useState } from "react"
import Axios from "axios"

function HeaderLoggedOut() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleLoginStudent() {
    try {
      const response = await Axios.post("https://localhost:3005/s/login", { username, password })
      if (response.data) {
        console.log(response.data)
      } else {
        console.log("Incorrect username / password.")
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  async function handleLoginProfessor() {
    try {
      const response = await Axios.post("https://schedule-professor.liara.run/professor/login", { username, password })
      if (response.data) {
        console.log(response.data)
      } else {
        console.log("Incorrect username / password.")
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="نام کاربری" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="رمز عبور" />
        </div>
        <div className="col-md-auto">
          <button onClick={handleLoginStudent} className="btn btn-success btn-sm student-login">
            ورود دانشجو
          </button>
          <button onClick={handleLoginProfessor} className="btn btn-success btn-sm teacher-login">
            ورود استاد
          </button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
