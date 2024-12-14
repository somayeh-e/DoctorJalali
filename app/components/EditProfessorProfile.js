import React, { useContext, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Page from "./Page"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function EditProfessorProfile() {
  const groups = ["آمار", "اخلاق", "اقتصاد اسلامي", "تربيت  بدني", "حسابداري", "حقوق  جزا و جرم  شناسي", "حقوق  خصوصي", "حقوق بين الملل", "حقوق عمومي", "حقوق مالكيت فكري", "رياضي", "زبان  و ادبيات  انگليسي", "زبان  و ادبيات  عربي", "زبان  و ادبيات  فارسي", "زيست شناسي", "شيعه شناسي", "شيمي", "علم اطلاعات و دانش شناسي", "علوم  تربيتي", "علوم قرآن و حديث", "علوم كامپيوتر", "فقه  و مباني  حقوق  اسلامي", "فلسفه  و كلام  اسلامي", "فيزيك", "مديريت بازرگاني", "مديريت صنعتي", "معارف", "معماري", "مهندسي  صنايع", "مهندسي برق", "مهندسي شيمي", "مهندسي عمران", "مهندسي كامپيوتر", "مهندسي مكانيك"]
  const ranks = ["استاد تمام", "دانشيار", "استادیار", "مربی"]
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const originalState = {
    image: {
      value: "",
      hasErrors: false,
      message: ""
    },
    name: {
      value: "",
      hasErrors: false,
      message: ""
    },
    username: {
      value: "",
      hasErrors: false,
      message: ""
    },
    group: {
      value: "",
      hasErrors: false,
      message: ""
    },
    rank: {
      value: "",
      hasErrors: false,
      message: ""
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    tel: {
      value: "",
      hasErrors: false,
      message: ""
    },
    email: {
      value: "",
      hasErrors: false,
      message: ""
    },
    sendCount: 0,
    isSaving: false,
    NotFound: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "imageChange":
        draft.image.value = action.value
        draft.image.hasErrors = false
        return
      case "nameChange":
        draft.name.value = action.value
        draft.name.hasErrors = false
        return
      case "usernameChange":
        draft.username.value = action.value
        draft.username.hasErrors = false
        return
      case "groupChange":
        draft.group.value = action.value
        draft.group.hasErrors = false
        return
      case "rankChange":
        draft.rank.value = action.value
        draft.rank.hasErrors = false
        return
      case "passwordChange":
        draft.password.value = action.value
        draft.password.hasErrors = false
        return
      case "telChange":
        draft.tel.value = action.value
        draft.tel.hasErrors = false
        return
      case "emailChange":
        draft.email.value = action.value
        draft.email.hasErrors = false
        return
      case "submitRequest":
        if (!draft.image.hasErrors && !draft.name.hasErrors && !draft.username.hasErrors && !draft.password.hasErrors && !draft.tel.hasErrors && !draft.email.hasErrors) {
          draft.sendCount++
        }
        return
      case "saveRequestStarted":
        draft.isSaving = true
        return
      case "saveRequestFinished":
        draft.isSaving = false
        return
      case "imageRules":
        if (!action.value.trim()) {
          draft.image.hasErrors = true
          draft.image.message = "تصویر را انتخاب کنید."
        }
        return
      case "nameRules":
        if (!action.value.trim()) {
          draft.name.hasErrors = true
          draft.name.message = "نام را وارد کنید."
        }
        return
      case "usernameRules":
        if (!action.value.trim()) {
          draft.username.hasErrors = true
          draft.username.message = "نام کاربری را وارد کنید."
        }
        return
      case "passwordRules":
        if (!action.value.trim()) {
          draft.password.hasErrors = true
          draft.password.message = "رمز عبور را وارد کنید."
        }
        return
      case "telRules":
        if (!action.value.trim()) {
          draft.tel.hasErrors = true
          draft.tel.message = "شماره تلفن را وارد کنید."
        }
        return
      case "emailRules":
        if (!action.value.trim()) {
          draft.email.hasErrors = true
          draft.email.message = "ایمیل را وارد کنید."
        }
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  function submitHandler(e) {
    e.preventDefault()
    dispatch({ type: "imageRules", value: state.image.value })
    dispatch({ type: "nameRules", value: state.name.value })
    dispatch({ type: "usernameRules", value: state.name.value })
    dispatch({ type: "passwordRules", value: state.password.value })
    dispatch({ type: "telRules", value: state.name.value })
    dispatch({ type: "emailRules", value: state.name.value })
    dispatch({ type: "submitRequest" })
  }

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      async function editProfile() {
        try {
          const response = await Axios.put("/professor/update", { newName: state.name.value, newUsername: state.username.value, newPassword: state.password.value, newEmail: state.email.value, newRank: state.rank.value, newGroup: state.group.value, newPhoneOffice: state.tel.value, newImage: state.image.value, token: appState.user.token })
          dispatch({ type: "saveRequestFinished" })
          appDispatch({ type: "flashMessage", value: ".پروفایل ویرایش شد" })
        } catch (e) {
          console.log("There was a problem.")
        }
      }
      editProfile()
      return () => {
        ourRequest.cancel
      }
    }
  }, [state.sendCount])

  return (
    <>
      <Page title="ویرایش پروفایل">
        <form onSubmit={submitHandler} className="col-lg-7 offset-lg-2 direction">
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="image" className="text-muted mb-1">
                <small>عکس پروفایل</small>
              </label>
              <input onBlur={e => dispatch({ type: "imageRules", value: e.target.value })} onChange={e => dispatch({ type: "imageChange", value: e.target.value })} id="image" name="image" className="form-control" type="file" autoComplete="off" />
              {state.image.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.image.message}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="name" className="text-muted mb-1">
                <small>نام و نام خانوادگی</small>
              </label>
              <input onBlur={e => dispatch({ type: "nameRules", value: e.target.value })} onChange={e => dispatch({ type: "nameChange", value: e.target.value })} id="name" name="name" className="form-control" type="text" autoComplete="off" />
              {state.name.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.name.message}</div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="username" className="text-muted mb-1">
                <small>نام کاربری</small>
              </label>
              <input onBlur={e => dispatch({ type: "usernameRules", value: e.target.value })} onChange={e => dispatch({ type: "usernameChange", value: e.target.value })} id="username" name="username" className="form-control" type="text" autoComplete="off" />
              {state.username.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.username.message}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="group" className="text-muted mb-1">
                <small>گروه</small>
              </label>
              <select onChange={e => dispatch({ type: "groupChange", value: e.target.value })} id="group" className="form-control">
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
              <select onChange={e => dispatch({ type: "rankChange", value: e.target.value })} id="rank" className="form-control">
                {ranks.map((rank, index) => (
                  <option key={index} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="password" className="text-muted mb-1">
                <small>رمز عبور</small>
              </label>
              <input onBlur={e => dispatch({ type: "passwordRules", value: e.target.value })} onChange={e => dispatch({ type: "passwordChange", value: e.target.value })} id="password" name="password" className="form-control" type="password" />
              {state.password.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="tel" className="text-muted mb-1">
                <small>شماره تلفن </small>
              </label>
              <input onBlur={e => dispatch({ type: "telRules", value: e.target.value })} onChange={e => dispatch({ type: "telChange", value: e.target.value })} id="tel" name="tel" className="form-control" type="text" />
              {state.tel.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.tel.message}</div>}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="email" className="text-muted mb-1">
                <small>ایمیل</small>
              </label>
              <input onBlur={e => dispatch({ type: "emailRules", value: e.target.value })} onChange={e => dispatch({ type: "emailChange", value: e.target.value })} id="email" name="email" className="form-control" type="email" />
              {state.email.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>}
            </div>
          </div>

          <button disabled={state.isSaving} type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            ثبت نام
          </button>
        </form>
      </Page>
    </>
  )
}

export default EditProfessorProfile
