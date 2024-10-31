import React, { useEffect } from "react"

function StuEdit() {
  return (
    <>
      <form className="form-width-edit form-edit-center direction">
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
      </form>
    </>
  )
}

export default StuEdit
