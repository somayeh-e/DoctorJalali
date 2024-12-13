import React, { useEffect, useContext, useState } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import Axios from "axios"
import CreateProgram from "./CreateProgram"
import Test from "./Test"

function ProProgram(props) {
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  const days = ["شنبه", "یکشنبه", "دو‌شنبه", "سه‌شنبه", "چهار‌شنبه", "پنج‌شنبه"]
  const termOptions = ["تابستان", "اول", "دوم"]
  const defaultTasks = ["حضور در جلسات", "عدم حضور", "راهنمایی پایان نامه", "فعالیت اجرایی", "سایر"]

  const [academicYear, setAcademicYear] = useState("1403")
  const [term, setTerm] = useState("تابستان")
  const [editedSchedule, setEditedSchedule] = useState(null)
  const [showSubmit, setShowSubmit] = useState(true)

  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  useEffect(() => {
    async function getLatestSchedule() {
      try {
        // const res = await Axios.get(`/schedule/latest/${appState.user.id}`)
        const res = await Axios.get("/schedule/latest/6691aaf27cbe05c1bf288d18")
        if (res.status === 200) {
          const data = res.data[0]
          console.log(data)
          const apiSchedules = data.days
          convertApiFormatToReact(apiSchedules)
          setTerm(data.term)
          console.log(data.term)
          setAcademicYear(data.academicYear)
          setShowSubmit(false)
        } else {
          appDispatch({ type: "flashMessage", value: "جدولی یافت نشد" })
        }
      } catch (err) {
        appDispatch({ type: "flashMessage", value: "مشکل در اتصال" })
      }
    }
    getLatestSchedule()
  }, [])

  const convertApiFormatToReact = apiData => {
    const schedulesApi = []
    apiData.forEach(daySchedule => {
      daySchedule.timeSlots.forEach(timeSlot => {
        schedulesApi.push({
          day: daySchedule.day,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          defaultTask: timeSlot.task,
          duration: timeSlot.duration - 1
        })
      })
    })
    appState.schedules = schedulesApi
    console.log(schedulesApi)
    appDispatch({ type: "addSchedule", value: appState.schedules })
  }

  const durationTotal = () => {
    let total = 0
    for (let schedule of appState.schedules) {
      total += schedule.duration
    }
    return total
  }

  const isScheduled = (day, time) => {
    return appState.schedules.some(schedule => schedule.day === day && schedule.startTime === time)
  }

  const getTime = (day, time) => {
    const entry = appState.schedules.find(schedule => schedule.day === day && schedule.startTime === time)
    return entry ? `${day} ${time} الی ${entry.endTime}` : ""
  }

  const getColSpan = (day, time) => {
    const entry = appState.schedules.find(entry => entry.day === day && entry.startTime === time)
    if (entry) {
      const startIndex = times.indexOf(entry.startTime)
      const endIndex = times.indexOf(entry.endTime)
      return endIndex - startIndex + 1
    }
    return 1
  }

  const isMergedCell = (day, time) => {
    return appState.schedules.some(entry => entry.day === day && times.indexOf(time) >= times.indexOf(entry.startTime) && times.indexOf(time) <= times.indexOf(entry.startTime) + entry.duration)
  }

  const getTask = (day, time) => {
    const entry = appState.schedules.find(schedule => schedule.day === day && schedule.startTime === time)
    return entry ? entry.task : ""
  }

  const convertToApiFormat = () => {
    const daysMap = {}
    appState.schedules.forEach(entry => {
      if (!daysMap[entry.day]) {
        daysMap[entry.day] = { day: entry.day, timeSlots: [] }
      }
      daysMap[entry.day].timeSlots.push({
        startTime: entry.startTime,
        endTime: calculateEndTime(entry.startTime, entry.duration),
        task: entry.task,
        duration: entry.duration
      })
    })
    return {
      days: Object.values(daysMap),
      academicYear,
      term,
      token: getCookie("access_token")
    }
  }

  const calculateEndTime = (startTime, duration) => {
    const timeIndex = times.indexOf(startTime)
    const endIndex = timeIndex + duration
    return times[endIndex] || startTime
  }

  async function handleSaveSchedule() {
    const infoSchedule = convertToApiFormat()
    console.log(infoSchedule)
    try {
      const response = await Axios.post("/professor/create-schedule", infoSchedule)
      if (response.status === 201) {
        appDispatch({ type: "flashMessage", value: "برنامه با موفقیت ارسال شد" })
      } else {
        appDispatch({ type: "flashMessage", value: response.data.message + "خطا در ارسال" })
      }
    } catch (err) {
      appDispatch({ type: "flashMessage", value: err.response.data.message + "خطا در ارسال به سرور" })
    }
  }

  function handleAcademicYear(e) {
    const value = e.target.value
    setAcademicYear(value)
    async function fetchDataToApi() {
      try {
        const idSchedule = await getIdSchedule(appState.user.id, term, value)
        if (idSchedule) {
          let res = await Axios.get(`/schedule/${idSchedule}`)
          let apiSchedules = res.data.days
          convertApiFormatToReact(apiSchedules)
          setShowSubmit(false)
        } else {
          if (show) {
            appDispatch({ type: "flashMessage", value: "جدولی یافت نشد " })
          } else {
            appDispatch({ type: "flashMessage", value: "جدولی یافت نشد " })
          }
          appState.schedules = []
          setShowSubmit(true)
        }
      } catch (err) {
        // console.log("error")
      }
    }
    fetchDataToApi()
  }

  function handleTerm(e) {
    const value = e.target.value
    setTerm(value)
    async function fetchDataToApi() {
      try {
        const idSchedule = await getIdSchedule(appState.user.id, value, academicYear)
        console.log(idSchedule)
        if (idSchedule) {
          let res = await Axios.get(`/schedule/${idSchedule}`)
          let apiSchedules = res.data.days
          convertApiFormatToReact(apiSchedules)
          setShowSubmit(false)
        }
      } catch (err) {
        // console.log("error")
      }
    }
    fetchDataToApi()
  }

  async function getIdSchedule(id, term, academicYear) {
    try {
      const res = await Axios.get(`/schedule/${id}/${term}/${academicYear}`)
      if (res.status == 200) {
        return res.data
      } else {
        throw new Error("not found id schedule")
      }
    } catch (err) {
      // console.log(err)
    }
  }

  function getSchedule(day, time) {
    const schedule = appState.schedules.find(entry => entry.day === day && entry.startTime === time)
    if (schedule) return schedule
    else return { day: day, startTime: time, duration: 1, task: defaultTasks[0] }
  }

  function openModal(schedule) {
    setEditedSchedule(schedule ? { ...schedule } : null)
    appDispatch({ type: "openCreateProgram" })
  }
  function closeModal() {
    // editedSchedule = null
    appDispatch({ type: "closeCreateProgram" })
  }

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

  function saveScheduleEntry(newEntry) {
    if (isOverlapping(newEntry)) {
      alert("این کار با کارهای موجود تداخل دارد.")
      return
    }

    if (editedSchedule && editedSchedule?.id) {
      const index = appState.schedules.findIndex(entry => entry.id === editedSchedule.id)
      if (index !== -1) {
        appState.schedules.splice(index, 1, newEntry)
      }
    } else {
      newEntry.id = Date.now() // Assign a unique id to the new entry
      appDispatch({ type: "addSchedule", value: newEntry })
    }

    appDispatch({ type: "closeCreateProgram" })
  }

  // function deleteScheduleEntry() {
  //   if (editedSchedule) {
  //     const index = appState.schedules.findIndex(entry => entry.day === editedSchedule.day && entry.startTime === editedSchedule.startTime)
  //     alert(index)
  //     if (index !== -1) {
  //       console.log(appState.schedules)
  //       appState.schedules.splice(index, 1)
  //       alert(appState.schedules)
  //     }
  //     appDispatch({ type: "closeCreateProgram" })
  //   }
  // }

  function deleteScheduleEntry() {
    if (editedSchedule) {
      const newSchedules = appState.schedules.filter(entry => !(entry.day === editedSchedule.day && entry.startTime === editedSchedule.startTime))
      console.log(newSchedules)
      appDispatch({ type: "updateSchedule", value: newSchedules })
      appDispatch({ type: "closeCreateProgram" })
    }
    console.log(appState.schedules)
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
    return null
  }

  return (
    <>
      <div className="container">
        <div className="container-row">
          {!props.show ? (
            <div className="top-buttons">
              <button onClick={() => appDispatch({ type: "openCreateProgram" })} className="add-button">
                {" "}
                ایجاد{" "}
              </button>
              {showSubmit ? (
                <button onClick={handleSaveSchedule} className="save-button">
                  {" "}
                  تایید نهایی{" "}
                </button>
              ) : (
                <button onClick={handleSaveSchedule} className="save-button">
                  {" "}
                  ویرایش{" "}
                </button>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="center-term">
            <div className="combo">
              <label htmlFor="term">ترم: </label>
              <select onChange={handleTerm} id="term">
                {termOptions.map((termOption, index) => (
                  <option key={index} value={termOptions.indexOf(termOption)}>
                    {termOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="combo">
              <label htmlFor="academicYear">سال تحصیلی: </label>
              <select onChange={handleAcademicYear} id="academicYear">
                <option value={1403}>1403</option>
                <option value={1402}>1402</option>
              </select>
            </div>
          </div>
          {!props.show ? (
            <div className="center-paragraph">
              <p>
                {" "}
                مجموع ساعت تعیین شده در هفته ساعت <span className="total-duration"> {durationTotal()} </span> است{" "}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="table-container">
          <table className="schedule-table table direction">
            <thead>
              <tr>
                <th>روز</th>
                {times.map((time, timeIndex) => (
                  <th key={timeIndex}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <th>{day}</th>
                  {times.map((time, index) => {
                    const isStartCell = isScheduled(day, time)
                    const colSpan = isStartCell ? getColSpan(day, time) : 1
                    const isMerged = isMergedCell(day, time)

                    if (isStartCell) {
                      return (
                        <td
                          key={index}
                          colSpan={colSpan}
                          onClick={!props.show ? () => openModal(getSchedule(day, time)) : null}
                          style={{
                            backgroundColor: isStartCell ? "#e0dfdf" : "transparent"
                          }}
                        >
                          {getTask(day, time)}
                          <p>{getTime(day, time)}</p>
                        </td>
                      )
                    } else if (!isMerged) {
                      return <td key={index} onClick={!props.show ? () => openModal(getSchedule(day, time)) : null}></td>
                    }

                    return null
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {appState.isCreateProgramOpen ? <CreateProgram defaultTasks={defaultTasks} days={days} times={times} editedSchedule={editedSchedule} close={closeModal} save={saveScheduleEntry} deleteTask={deleteScheduleEntry} /> : ""}
    </>
  )
}

export default ProProgram
