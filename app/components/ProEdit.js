import React, { useEffect } from "react"

function ProEdit() {
  const groups = ["آمار", "اخلاق", "اقتصاد اسلامي", "تربيت  بدني", "حسابداري", "حقوق  جزا و جرم  شناسي", "حقوق  خصوصي", "حقوق بين الملل", "حقوق عمومي", "حقوق مالكيت فكري", "رياضي", "زبان  و ادبيات  انگليسي", "زبان  و ادبيات  عربي", "زبان  و ادبيات  فارسي", "زيست شناسي", "شيعه شناسي", "شيمي", "علم اطلاعات و دانش شناسي", "علوم  تربيتي", "علوم قرآن و حديث", "علوم كامپيوتر", "فقه  و مباني  حقوق  اسلامي", "فلسفه  و كلام  اسلامي", "فيزيك", "مديريت بازرگاني", "مديريت صنعتي", "معارف", "معماري", "مهندسي  صنايع", "مهندسي برق", "مهندسي شيمي", "مهندسي عمران", "مهندسي كامپيوتر", "مهندسي مكانيك"]

  const ranks = ["استاد تمام", "دانشيار", "استادیار", "مربی"]

  return (
    <>
      {/* <div className="container py-md-5"> */}
      <div className="row align-items-center margin-teacher-register">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5 direction form-edit-center">
          <form>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>عکس پروفایل</small>
              </label>
              <input id="email-register" name="email" className="form-control" type="file" autocomplete="off" />
            </div>

            <div className="flex-input">
              <div className="form-group">
                <label for="username-register" className="text-muted mb-1">
                  <small>نام و نام خانوادگی</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" autocomplete="off" />
              </div>

              <div className="form-group input-position">
                <label for="username-register" className="text-muted mb-1">
                  <small>نام کاربری</small>
                </label>
                <input id="username-register" name="username" className="form-control" type="text" placeholder="یک نام کاربری انتخاب کنید" autocomplete="off" />
              </div>
            </div>

            <div className="flex-input">
              <div className="form-group option-width">
                <label for="group" className="text-muted mb-1">
                  <small>گروه</small>
                </label>
                <select id="group" className="form-control">
                  {groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group option-width">
                <label htmlFor="rank" className="text-muted mb-1">
                  <small>مرتبه علمی</small>
                </label>
                <select id="rank" className="form-control">
                  {ranks.map((rank, index) => (
                    <option key={index} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-input">
              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>رمز عبور</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="password" placeholder="یک رمز عبور ایجاد کنید" />
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>تایید رمز</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="password" />
              </div>
            </div>

            <div className="flex-input">
              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>شماره تلفن </small>
                </label>
                <input id="password-register" name="password" className="form-control" type="text" />
              </div>

              <div className="form-group">
                <label htmlFor="password-register" className="text-muted mb-1">
                  <small>ایمیل</small>
                </label>
                <input id="password-register" name="password" className="form-control" type="email" />
              </div>
            </div>

            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              ویرایش
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default ProEdit
