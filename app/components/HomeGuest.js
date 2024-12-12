import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"
import DispatchContext from "../DispatchContext"

function HomeGuest() {
  const [name, setName] = useState()
  const [studentNumber, setStudentNumber] = useState()
  const [password, setPassword] = useState()

  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("/s/register", { name, studentNumber, password })
      appDispatch({ type: "flashMessage", value: "با موفقیت ثبت نام شدید." })
      console.log("User was successfully created.")
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <>
      <Page wide={true} title="خوش آمدید">
        <div className="row align-items-center home">
          <div className="col-lg-7 py-3 py-md-5 direction login">
            <h1 className="display-3">برنامه ریزی هوشمند؟</h1>
            <p className="lead text-muted">سایت برنامه هفتگی اساتید به شما امکان می‌دهد تا به‌راحتی به زمان‌بندی کلاس‌ها و برنامه‌های آموزشی اساتید دسترسی پیدا کنید و با اطلاعات به‌روز، برنامه‌ریزی بهتری داشته باشید .</p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5 direction">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username-register" className="text-muted mb-1">
                  <small>نام کاربری</small>
                </label>
                <input onChange={e => setName(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder=" نام کاربری خود را وارد کنید" autoComplete="off" />
              </div>

              <div className="form-group">
                <label htmlFor="student-number-register" className="text-muted mb-1">
                  <small>شماره دانشجویی</small>
                </label>
                <input onChange={e => setStudentNumber(e.target.value)} id="student-number-register" name="username" className="form-control" type="text" placeholder="شماره دانشجویی خود را وارد کنید" autoComplete="off" />
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>رمز عبور</small>
                </label>
                <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="رمز عبور خود را وارد کنید" />
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
