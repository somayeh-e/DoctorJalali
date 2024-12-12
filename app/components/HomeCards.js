import React, { useContext, useEffect, useState } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useNavigate } from "react-router-dom"

function HomeCards(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const navigateOne = useNavigate()
  const navigateTwo = useNavigate()

  function sendMessage(card) {
    // if (!appState.isProfessor) {
    //   appDispatch({ type: "flashMessage", value: "دانشجو محترم ابتدا وارد حساب کاربری خود شوید" })
    //   return
    // }
    appDispatch({ type: "showChatroom" })
    navigateOne(`/profile/${appState.user.id}/messages`, {
      state: {
        professorId: card._id,
        // studentId: student._id,
        studentId: appState.user.id,
        senderName: card.name,
        imageProfessor: card.image_profile,
        imageStudent: appState.user.image,
        isStudent: true
      }
    })
  }

  function showProgram(card) {
    navigateTwo("/professor-page", {
      state: {
        professorId: card._id,
        professorName: card.name
      }
    })
    appDispatch({ type: "closeCreateProgram" })
  }

  return (
    <>
      <div className="row direction home">
        {props.cards.map(card => {
          console.log(card)
          return (
            <>
              <div key={card._id} className="col-lg-4 col-md-6">
                <div className="professor-card">
                  <div className="professor-img">
                    <img src={`http://localhost:3005/${card.image_profile}`} />
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.rank}</p>
                  <p>{card.group}</p>
                  <button onClick={() => sendMessage(card)} className="btn btn-sm btn-success mr-2">
                    ارسال پیام
                  </button>
                  <button onClick={() => showProgram(card)} className="btn btn-sm btn-success mr-2">
                    نمایش برنامه
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default HomeCards
