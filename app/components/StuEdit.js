import React, { useEffect } from "react"

function StuEdit() {
  return (
    <>
      <div className="container py-md-5 ">
        <form class="col-lg-6 offset-lg-3 direction">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="email-register" className="text-muted mb-1">
                <small>عکس پروفایل</small>
              </label>
              <input id="email-register" name="email" className="form-control" type="file" autocomplete="off" />
            </div>

            <div className="form-group col-md-6">
              <label for="username-register" className="text-muted mb-1">
                <small>نام کاربری</small>
              </label>
              <input id="username-register" name="username" className="form-control" type="text" autocomplete="off" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>رمز عبور</small>
              </label>
              <input id="password-register" name="password" className="form-control" type="password" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>تایید رمز</small>
              </label>
              <input id="password-register" name="password" className="form-control" type="password" />
            </div>
          </div>

          <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            ویرایش
          </button>
        </form>
      </div>
    </>
  )
}

export default StuEdit
