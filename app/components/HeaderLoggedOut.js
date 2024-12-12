import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import { Link } from "react-router-dom"

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext)

  return (
    <form onSubmit={e => e.preventDefault()} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md-auto">
          <Link to={"/login"} className="btn btn-success btn-sm student-login">
            ورود
          </Link>
          <Link to={"/professors"} className="btn btn-success btn-sm teacher-login">
            مشاهده اساتید
          </Link>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
