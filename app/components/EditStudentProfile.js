import React, { useContext, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Page from "./Page"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function EditStudentProfile() {
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
    password: {
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
      case "passwordChange":
        draft.password.value = action.value
        draft.password.hasErrors = false
        return
      case "submitRequest":
        if (!draft.image.hasErrors && !draft.name.hasErrors && !draft.password.hasErrors) {
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
          draft.name.message = "نام کاربری را وارد کنید."
        }
        return
      case "passwordRules":
        if (!action.value.trim()) {
          draft.password.hasErrors = true
          draft.password.message = "رمز عبور را وارد کنید."
        }
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  function submitHandler(e) {
    e.preventDefault()
    dispatch({ type: "imageRules", value: state.image.value })
    dispatch({ type: "nameRules", value: state.name.value })
    dispatch({ type: "passwordRules", value: state.password.value })
    dispatch({ type: "submitRequest" })
  }

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      async function editProfile() {
        try {
          const response = await Axios.put("/s/update", { name: state.name.value, password: state.password.value, studentNumber: appState.user.studentNumber, image: state.image.value, token: appState.user.token })
          dispatch({ type: "saveRequestFinished" })
          appDispatch({ type: "flashMessage", value: ".پروفایل ویرایش شد" })
          alert("post updated")
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
        <form onSubmit={submitHandler} className="col-lg-6 offset-lg-3 direction">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="image" className="text-muted mb-1">
                <small>عکس پروفایل</small>
              </label>
              <input onBlur={e => dispatch({ type: "imageRules", value: e.target.value })} onChange={e => dispatch({ type: "imageChange", value: e.target.value })} id="image" name="image" className="form-control" type="file" autoComplete="off" />
              {state.image.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.image.message}</div>}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="name" className="text-muted mb-1">
                <small>نام کاربری</small>
              </label>
              <input onBlur={e => dispatch({ type: "nameRules", value: e.target.value })} onChange={e => dispatch({ type: "nameChange", value: e.target.value })} id="name" name="name" className="form-control" type="text" autoComplete="off" />
              {state.name.hasErrors && <div className="alert alert-danger small liveValidateMessage">{state.name.message}</div>}
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

          <button disabled={state.isSaving} type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            ویرایش
          </button>
        </form>
      </Page>
    </>
  )
}

export default EditStudentProfile
