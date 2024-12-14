import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { Tooltip as ReactToolTip } from "react-tooltip"
import { useNavigate } from "react-router-dom"

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const navigate = useNavigate()

  function handleLogout() {
    appDispatch({ type: "logout" })
    navigate("/")
  }

  return (
    <div class="flex-row my-3 my-md-0">
      <Link data-tooltip-id="profile" data-tooltip-content="پروفایل" to={`/profile/${appState.user.id}`} className="mr-2">
        <img className="small-header-avatar" src="../images/profile.jpg" />
      </Link>
      <ReactToolTip place="bottom" id="profile" className="custom-tooltip" />
      <Link to={`/profile/${appState.user.id}`} className="btn btn-sm btn-success mr-2">
        پروفایل
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary signout">
        خروج
      </button>
    </div>
  )
}

export default HeaderLoggedIn
