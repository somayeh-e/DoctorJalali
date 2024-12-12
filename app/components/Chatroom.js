import React, { useEffect, useContext, useRef } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import Page from "./Page"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom"

function Chatroom() {
  const socket = useRef(null)
  const chatField = useRef(null)
  const chatLog = useRef(null)

  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const location = useLocation()
  const { studentId, professorId, senderName, imageProfessor, imageStudent, isStudent } = location.state
  const [state, setState] = useImmer({
    fieldValue: "",
    messages: []
  })

  useEffect(() => {
    if (appState.isShowChatroom) {
      chatField.current.focus()
    }
  }, [appState.isShowChatroom])

  useEffect(() => {
    socket.current = io("http://localhost:3005")

    socket.current.emit("joinPrivateChat", {
      studentId: studentId,
      professorId: professorId,
      isStudent: isStudent
    })

    socket.current.on("receiveMessage", message => {
      setState(draft => {
        draft.messages.push(message)
      })
    })

    socket.current.on("previousMessages", messages => {
      setState(draft => {
        draft.messages = messages
      })
    })

    return () => socket.current.disconnect()
  }, [])

  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight
  }, [state.messages])

  function handleFieldChange(e) {
    const value = e.target.value
    setState(draft => {
      draft.fieldValue = value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (state.fieldValue.trim()) {
      console.log(studentId, professorId, isStudent)

      const messageData = {
        senderId: isStudent === true ? studentId : professorId,
        user: isStudent === true ? "student" : "professor",
        content: state.fieldValue,
        time: new Date().toLocaleTimeString()
      }

      socket.current.emit("sendMessage", messageData)
      // console.log(state.messages)
      console.log(messageData)

      setState(draft => {
        // draft.messages.push(messageData)
        draft.fieldValue = ""
      })
    }
  }

  return (
    <>
      <Page title="چت">
        <div id="chat-wrapper" className="shadow border-top border-left border-right chat-border">
          <div className="chat-title-bar bg-primary chat-border chat-bg-color">
            ارسال به : {senderName}
            <span onClick={() => appDispatch({ type: "hideChatroom" })} className="chat-title-bar bg-primary chat-bg-color">
              <i className="fa fa-reply"></i>
              بازگشت
            </span>
          </div>
          <div id="chat" className="chat-log chat-height" ref={chatLog}>
            {state.messages.map((message, index) => {
              if (message.senderId == appState.user.id) {
                return (
                  <div className="chat-self">
                    <div className="chat-message">
                      <div className="chat-message-inner chat-inner-bg-color">
                        {message.content}
                        <p className="time">{message.time}</p>
                      </div>
                    </div>
                    <img className="chat-avatar avatar-tiny" src={imageStudent}></img>
                  </div>
                )
              }

              return (
                <div key={index} className="chat-other">
                  <span>
                    <img className="avatar-tiny" src={imageProfessor}></img>
                  </span>
                  <div className="chat-message">
                    <div className="chat-message-inner">
                      <span>
                        <strong>{senderName} : </strong>
                      </span>
                      {message.content}
                      <p className="time">{message.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} id="chatForm" className="chat-form border-top">
            <input value={state.fieldValue} onChange={handleFieldChange} ref={chatField} type="text" className="chat-field" id="chatField" placeholder="پیام خود را وارد کنید..." autocomplete="off" />
          </form>
        </div>
      </Page>
    </>
  )
}

export default Chatroom
