import React, { useState, useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function CreateProgram() {
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  const days = ["شنبه", "یکشنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه"]
  const defaultTasks = ["حضور در جلسات", "عدم حضور", "راهنمایی پایان نامه", "فعالیت اجرایی", "سایر"]

  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [state, setState] = useState({
    day: "شنبه",
    startTime: "8:00",
    endTime: "8:00",
    defaultTask: "",
    otherTask: "", // اضافه کردن فیلد برای ذخیره مقدار تایپ شده
    duration: 0
  })

  function isOverlapping(newEntry) {
    const newStartIndex = times.indexOf(newEntry.startTime)
    const newEndIndex = newStartIndex + newEntry.duration

    return appState.schedules.some(entry => {
      if (entry.day !== newEntry.day) return false
      const startIndex = times.indexOf(entry.startTime)
      const endIndex = startIndex + entry.duration
      return (newStartIndex >= startIndex && newStartIndex < endIndex) || (newEndIndex > startIndex && newEndIndex <= endIndex) || (newStartIndex <= startIndex && newEndIndex >= endIndex)
    })
  }

  function handleSubmitSave(e) {
    e.preventDefault()
    appDispatch({ type: "closeCreateProgram" })
    const newSchedule = {
      day: state.day,
      startTime: state.startTime,
      endTime: state.endTime,
      defaultTask: state.defaultTask === "سایر" ? state.otherTask : state.defaultTask,
      duration: times.indexOf(state.endTime) - times.indexOf(state.startTime)
    }
    if (isOverlapping(newSchedule)) {
      alert("این کار با کارهای موجود تداخل دارد.")
      return
    }
    appDispatch({ type: "addSchedule", value: newSchedule })
    console.log(newSchedule)
  }

  return (
    <>
      <div className="search-overlay-bottom">
        <div className="modal-content">
          <div className="header">
            <span onClick={() => appDispatch({ type: "closeCreateProgram" })}>
              <i className="fas fa-times-circle"></i>
            </span>
            <h3>{state.defaultTask}</h3>
          </div>
          <form onSubmit={handleSubmitSave} className="modal-form">
            <div className="form-row-radio">
              <div className="form-group combo">
                <label htmlFor="day">روز : </label>{" "}
                <select onChange={e => setState({ ...state, day: e.target.value })} id="day" required>
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group combo">
                <label htmlFor="startTime">از ساعت :</label>{" "}
                <select onChange={e => setState({ ...state, startTime: e.target.value })} id="startTime" required>
                  {times.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group combo">
                <label htmlFor="endTime">تا ساعت :</label>{" "}
                <select onChange={e => setState({ ...state, endTime: e.target.value })} id="endTime" required>
                  {times.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="radio-group">
                {defaultTasks.map((defaultTask, index) => (
                  <label key={index} htmlFor={index}>
                    <input onChange={e => setState({ ...state, defaultTask: e.target.value })} type="radio" name="radio" id={index} value={defaultTask} /> {defaultTask}
                  </label>
                ))}
                <div className={state.defaultTask === "سایر" ? "otherInput" : "remove-otherInput"}>{state.defaultTask === "سایر" && <input onChange={e => setState({ ...state, otherTask: e.target.value })} type="text" placeholder="مقدار دلخواه" value={state.otherTask} />}</div>
              </div>
            </div>

            <div className="btn-radio">
              <button className="remove" type="button">
                حذف
              </button>
              <button className="save" type="submit">
                ذخیره
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateProgram
