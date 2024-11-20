import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"

function ProProgram() {
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  const days = ["شنبه", "یکشنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه"]
  const termOptions = ["تابستان", "اول", "دوم"]

  const appDispatch = useContext(DispatchContext)

  return (
    <>
      <div class="container">
        <div class="container-row">
          <div class="top-buttons">
            <button onClick={() => appDispatch({ type: "openCreateProgram" })} class="add-button">
              ایجاد
            </button>
            {/* <button class="save-button">تایید نهایی</button> */}
            <button class="edit-button">ویرایش</button>
          </div>
          <div className="center-term">
            <div className="combo">
              <label for="term">ترم : </label>{" "}
              <select id="term">
                {termOptions.map(termOption => (
                  <option>{termOption}</option>
                ))}
              </select>
            </div>
            <div className="combo">
              <label for="academicYear">سال تحصیلی : </label>{" "}
              <select id="academicYear">
                <option>{1403}</option>
                <option>{1402}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="table-container">
          <table class="schedule-table table table-bordered direction">
            <thead>
              <tr>
                <th scope="col">روز</th>
                {times.map(time => (
                  <th scope="col">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr>
                  <th scope="row">{day}</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProProgram
