import React from "react"
import ReactDOM from "react-dom/client"

function Main() {
  return (
    <>
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <img className="logo" src="white-logo.png"></img>
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <a href="/" className="text-white">
              {" "}
              برنامه اساتید دانشگاه قم{" "}
            </a>
          </h4>
          <form className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="username" className="form-control form-control-sm input-dark" type="text" placeholder="نام کاربری" autocomplete="off" />
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input name="password" className="form-control form-control-sm input-dark" type="password" placeholder="رمز عبور" />
              </div>
              <div className="col-md-auto">
                <button className="btn btn-success btn-sm">ورود دانشجو</button>
              </div>
            </div>
          </form>
        </div>
      </header>

      <div className="container py-md-5">
        <div className="row align-items-center">
          <div className="col-lg-7 py-3 py-md-5">
            <h1 className="display-3">برنامه ریزی هوشمند؟</h1>
            <p className="lead text-muted">سایت برنامه هفتگی اساتید به شما امکان می‌دهد تا به‌راحتی به زمان‌بندی کلاس‌ها و برنامه‌های آموزشی اساتید دسترسی پیدا کنید و با اطلاعات به‌روز، برنامه‌ریزی بهتری داشته باشید</p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
            <form>
              <div className="form-group">
                <label for="username-register" className="text-muted mb-1">
                  <small>نام کاربری</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" placeholder="یک نام کاربری انتخاب کنید" autocomplete="off" />
              </div>
              <div className="form-group">
                <label for="email-register" className="text-muted mb-1">
                  <small>ایمیل</small>
                </label>
                <input id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autocomplete="off" />
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
            </form>
          </div>
        </div>
      </div>

      <footer className="border-top text-center small text-muted py-3">
        <p>
          <a href="/" className="mx-1">
            خانه
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/about-us">
            درباره ما
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/terms">
            قوانین
          </a>
        </p>
        <p className="m-0">
          Copyright &copy; 2020{" "}
          <a href="/" className="text-muted">
            ComplexApp
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
