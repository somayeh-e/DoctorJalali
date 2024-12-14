import React, { useEffect, useContext, useState } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Axios from "axios"
import moment from "jalali-moment"
import { useNavigate } from "react-router-dom"

function ProChat() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const navigate = useNavigate()

  const [conversations, setConversations] = useState([])

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = appState.isProfessor ? await Axios.get(`/professor/conversations/${appState.user.id}`) : await Axios.get(`/s/conversations/${appState.user.id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error.messages)
      }
    }

    fetchConversations()
    console.log(conversations)
  }, [])

  function getTime(date) {
    moment.locale("fa", { useGregorianParser: true })
    const iranTime = moment(date).format().split("T")
    const dateShamsi = iranTime[0]
    const time = iranTime[1].split("+")[0]
    return [dateShamsi, time]
  }

  function handleClick(roomId, senderName, imageStudent, imageProfessor) {
    appDispatch({ type: "showChatroom" })
    const studentId = roomId.split("-")[0]
    const professorId = roomId.split("-")[1]
    navigate(`/profile/${appState.user.id}/messages`, {
      state: {
        studentId,
        professorId,
        senderName,
        imageStudent,
        isStudent: appState.isProfessor ? false : true
      }
    })
  }

  return (
    <>
      <div className="container chat-center">
        <table className="table table-bordered">
          <thead className="chat-inner-bg-color">
            <tr>
              <th>عملیات</th>
              <th>{appState.isProfessor ? "فرستنده" : "گیرنده"}</th>
              {appState.isProfessor ? <th>شماره دانشجویی</th> : ""}
              <th>تعداد گفتگو</th>
              <th>تاریخ و زمان ثبت</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map(conversation => (
              <tr key={conversation.roomId}>
                <td>
                  <button onClick={() => handleClick(conversation.roomId, appState.isProfessor ? conversation.studentId.name : conversation.professorId.name, conversation.studentId.image, conversation.professorId.image_profile)} className="show-button">
                    نمایش
                  </button>
                </td>
                {appState.isProfessor ? <td>{conversation.studentId.name}</td> : <td>{conversation.professorId.name}</td>}
                {/* {appState.isProfessor ? <td>{"سمیه اقبالیون"}</td> : <td>{conversation.professorId.name}</td>} */}

                {appState.isProfessor ? <td>{conversation.studentId.studentNumber}</td> : ""}
                {/* {appState.isProfessor ? <td>{"40113200005"}</td> : ""} */}

                <td>{conversation.messages.length}</td>
                <td>
                  {getTime(conversation.createdAt)[0]} / {getTime(conversation.createdAt)[1]}
                </td>
                <td
                  style={{
                    color: conversation.status ? "#28a745" : "red"
                  }}
                >
                  {conversation.status ? "پاسخ داده شده" : "پاسخ داده نشده"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProChat
