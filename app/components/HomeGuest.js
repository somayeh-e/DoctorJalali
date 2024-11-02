import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"
/*
  "https://schedule-professor.liara.run/professor/login"
   "https://schedule-professor.liara.run/professor/register"
   "https://schedule-professor.liara.run/s/login"
*/
function HomeGuest() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("https://schedule-professor.liara.run/s/login", { username, password })
      console.log("User was seccussfully created.")
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <>
      <Page wide={true} title="Welcome!">
        <div className="row align-items-center">
          <div className="col-lg-7 py-3 py-md-5 direction">
            <h1 className="display-3">برنامه ریزی هوشمند؟</h1>
            <p className="lead text-muted">سایت برنامه هفتگی اساتید به شما امکان می‌دهد تا به‌راحتی به زمان‌بندی کلاس‌ها و برنامه‌های آموزشی اساتید دسترسی پیدا کنید و با اطلاعات به‌روز، برنامه‌ریزی بهتری داشته باشید .</p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5 direction">
            <form className="login-form">
              <div className="form-group">
                <label for="username-register" className="text-muted mb-1">
                  <small>شماره دانشجویی</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" placeholder="شماره دانشجویی خود را وارد کنید" autocomplete="off" />
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>رمز عبور</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="password" placeholder="رمز عبور خود را وارد کنید" />
              </div>
              <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                ثبت نام دانشجو
              </button>
              <Link className="teacher-submit" to={"/register-teacher"}>
                <div>اگر استاد هستید برای ثبت نام اینجا کلیک کنید</div>
              </Link>
            </form>
          </div>
        </div>
      </Page>
    </>
  )
}

export default HomeGuest
