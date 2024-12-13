import React, { useState, useEffect } from "react"

function CreateProgram({ editedSchedule, days, times, defaultTasks, save, close, deleteTask }) {
  const [day, setDay] = useState(editedSchedule ? editedSchedule.day : "شنبه")
  const [startTime, setStartTime] = useState(editedSchedule ? editedSchedule.startTime : "8:00")
  const [endTime, setEndTime] = useState(editedSchedule ? editedSchedule.endTime : "9:00")
  const [task, setTask] = useState(editedSchedule ? editedSchedule.task : defaultTasks[0])
  const [customTask, setCustomTask] = useState("")

  const availableEndTimes = () => {
    const startIndex = times.indexOf(startTime)
    return times.slice(startIndex + 1)
  }

  useEffect(() => {
    if (times.indexOf(endTime) <= times.indexOf(startTime)) {
      setEndTime(availableEndTimes()[0] || "")
    }
  }, [startTime])

  const handleSave = e => {
    e.preventDefault()
    let duration = times.indexOf(endTime) - times.indexOf(startTime)

    save({
      day,
      startTime,
      endTime,
      task: customTask === "" ? task : customTask,
      duration
    })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="header">
          <span onClick={close}>
            <i className="fas fa-times-circle"></i>
          </span>
          <h3>{task}</h3>
        </div>
        <form onSubmit={handleSave} className="modal-form">
          <div className="form-row-radio">
            <div className="form-group combo">
              <label htmlFor="day">روز:</label>
              <select id="day" value={day} onChange={e => setDay(e.target.value)} required>
                {days.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group combo">
              <label htmlFor="startTime">از ساعت:</label>
              <select id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} required>
                {times.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group combo">
              <label htmlFor="endTime">تا ساعت:</label>
              <select id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} required>
                {availableEndTimes().map(time => (
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
                  <input type="radio" name="radio" id={index} value={defaultTask} onChange={e => setTask(e.target.value)} /> {defaultTask}
                </label>
              ))}
              <div className={task === "سایر" ? "otherInput" : "remove-otherInput"}>{task === "سایر" && <input onChange={e => setCustomTask(e.target.value)} type="text" placeholder="مقدار دلخواه" value={customTask} />}</div>
            </div>
          </div>

          <div className="btn-radio">
            <button
              className="remove"
              type="button"
              onClick={e => {
                e.preventDefault()
                deleteTask()
              }}
            >
              حذف
            </button>

            <button className="save" type="submit">
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProgram
