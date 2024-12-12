import React, { useEffect, useState } from "react"
import ProProgram from "./ProProgram"
import { useLocation } from "react-router-dom"

function ProfessorPage() {
  const location = useLocation()
  const { professorId, professorName } = location.state
  const [show, setShow] = useState(true)

  return (
    <>
      <div className="container py-md-5">
        <h3 className="direction  nav-tabs professor-page">برنامه استاد {professorName}</h3>
        {<ProProgram show={show} id={professorId} />}
      </div>
    </>
  )
}

export default ProfessorPage
