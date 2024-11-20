import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import Axios from "axios"

function CreateProgram() {
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  const days = ["شنبه", "یکشنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه"]
  const defaultTasks = ["حضور در جلسات", "عدم حضور", "راهنمایی پایان نامه", "فعالیت اجرایی", "سایر"]
  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    appDispatch({ type: "closeCreateProgram" })
    appDispatch({ type: "isLoading" })
    try {
      await Axios.post("https://schedule-professor.liara.run/professor/create-schedule", { username, password })
      console.log("Program was successfully created.")
      appDispatch({ type: "notLoading" })
    } catch (e) {
      appDispatch({ type: "isLoading" })
      console.log("There was an error.")
    }
  }

  return (
    <>
      <div class="search-overlay-bottom">
        {/***/}
        <div className="modal-content">
          <div className="header">
            <span onClick={() => appDispatch({ type: "closeCreateProgram" })}>
              <i className="fas fa-times-circle"></i>
            </span>
            <h3>راهنمایی دانشجو</h3>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-row-radio">
              <div className="form-group combo">
                <label for="day">روز : </label>{" "}
                <select id="day" required>
                  {days.map(day => (
                    <option>{day}</option>
                  ))}
                </select>
              </div>

              <div className="form-group combo">
                <label for="startTime">از ساعت :</label>{" "}
                <select id="startTime" required>
                  {times.map(time => (
                    <option>{time}</option>
                  ))}
                </select>
              </div>

              <div className="form-group combo">
                <label for="endTime">تا ساعت :</label>{" "}
                <select id="endTime" required>
                  {times.map(time => (
                    <option>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="radio-group">
                {defaultTasks.map((defaultTask, index) => (
                  <label for={index}>
                    <input type="radio" name="radio" id={index} value={defaultTask} /> {defaultTask}
                  </label>
                ))}

                <div className="otherInput">
                  <input type="text  " placeholder="مقدار دلخواه" />
                </div>
              </div>
            </div>

            <div className="btn-radio">
              <button className="remove">حذف</button>
              <button className="save" type="submit">
                ذخیره
              </button>
            </div>
          </form>
        </div>
        {/***/}{" "}
      </div>
    </>
  )
}

export default CreateProgram
