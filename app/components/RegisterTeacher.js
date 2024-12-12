import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function RegisterTeacher() {
  const groups = ["آمار", "اخلاق", "اقتصاد اسلامي", "تربيت  بدني", "حسابداري", "حقوق  جزا و جرم  شناسي", "حقوق  خصوصي", "حقوق بين الملل", "حقوق عمومي", "حقوق مالكيت فكري", "رياضي", "زبان  و ادبيات  انگليسي", "زبان  و ادبيات  عربي", "زبان  و ادبيات  فارسي", "زيست شناسي", "شيعه شناسي", "شيمي", "علم اطلاعات و دانش شناسي", "علوم  تربيتي", "علوم قرآن و حديث", "علوم كامپيوتر", "فقه  و مباني  حقوق  اسلامي", "فلسفه  و كلام  اسلامي", "فيزيك", "مديريت بازرگاني", "مديريت صنعتي", "معارف", "معماري", "مهندسي  صنايع", "مهندسي برق", "مهندسي شيمي", "مهندسي عمران", "مهندسي كامپيوتر", "مهندسي مكانيك"]
  const ranks = ["استاد تمام", "دانشيار", "استادیار", "مربی"]

  const appDispatch = useContext(DispatchContext)

  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [email, setEmail] = useState()
  const [phone_office, setPhone_office] = useState()
  const [group, setGroup] = useState()
  const [rank, setRank] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (password == confirmPassword) {
        await Axios.post("/professor/register", { name, username, group, rank, password, email, phone_office })
        console.log("User was successfully created.")
        appDispatch({ type: "flashMessage", value: "ثبت نام موفقیت آمیز" })
        appDispatch({ type: "isProfessor" })
      } else {
        console.log("password != confirmPassword")
      }
    } catch (e) {
      console.log("There was an error.")
    }
  }

  return (
    <>
      <Page title="خوش آمدید">
        <form onSubmit={handleSubmit} class="col-lg-9 offset-lg-1 direction">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="username-register" className="text-muted mb-1">
                <small>نام و نام خانوادگی</small>
              </label>
              <input onChange={e => setName(e.target.value)} id="username-register" name="username" className="form-control" type="text" autocomplete="off" />
            </div>

            <div className="form-group col-md-6">
              <label for="username-register" className="text-muted mb-1">
                <small>نام کاربری</small>
              </label>
              <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" autocomplete="off" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="group" className="text-muted mb-1">
                <small>گروه</small>
              </label>
              <select onChange={e => setGroup(e.target.value)} id="group" className="form-control">
                {groups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="rank" className="text-muted mb-1">
                <small>مرتبه علمی</small>
              </label>
              <select onChange={e => setRank(e.target.value)} id="rank" className="form-control">
                {ranks.map((rank, index) => (
                  <option key={index} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>رمز عبور</small>
              </label>
              <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="password-confirm" className="text-muted mb-1">
                <small>تایید رمز</small>
              </label>
              <input onChange={e => setConfirmPassword(e.target.value)} id="password-confirm" name="password" className="form-control" type="password" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="tel-number" className="text-muted mb-1">
                <small>شماره تلفن </small>
              </label>
              <input onChange={e => setPhone_office(e.target.value)} id="tel-number" name="password" className="form-control" type="text" />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="email" className="text-muted mb-1">
                <small>ایمیل</small>
              </label>
              <input onChange={e => setEmail(e.target.value)} id="email" name="password" className="form-control" type="email" />
            </div>
          </div>

          <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            ثبت نام
          </button>
        </form>
      </Page>
    </>
  )
}

export default RegisterTeacher
