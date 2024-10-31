import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function HomeGuest() {
  return (
    <>
      <div className="container py-md-5">
        <div className="row align-items-center">
          <div className="col-lg-7 py-3 py-md-5 direction">
            <h1 className="display-3">برنامه ریزی هوشمند؟</h1>
            <p className="lead text-muted">سایت برنامه هفتگی اساتید به شما امکان می‌دهد تا به‌راحتی به زمان‌بندی کلاس‌ها و برنامه‌های آموزشی اساتید دسترسی پیدا کنید و با اطلاعات به‌روز، برنامه‌ریزی بهتری داشته باشید</p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5 direction">
            <form>
              <div className="form-group">
                <label for="email-register" className="text-muted mb-1">
                  <small>عکس پروفایل</small>
                </label>
                <input id="email-register" name="email" className="form-control" type="file" autocomplete="off" />
              </div>

              <div className="form-group">
                <label for="username-register" className="text-muted mb-1">
                  <small>نام و نام خانوادگی</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" placeholder="یک نام کاربری انتخاب کنید" autocomplete="off" />
              </div>

              <div className="form-group">
                <label for="password-register" className="text-muted mb-1">
                  <small>رمز عبور</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="password" placeholder="یک رمز عبور ایجاد کنید" />
              </div>
              <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
                ثبت نام دانشجو
              </button>
              <Link className="teacher-submit" to={"/RegisterTeacher"}>
                اگر استاد هستید برای ثبت نام اینجا کلیک کنید
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeGuest
