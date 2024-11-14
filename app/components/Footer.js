import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
      <footer className="border-top text-center small text-muted py-3">
        <p>
          <Link to="/" className="mx-1">
            خانه
          </Link>{" "}
          |{" "}
          <Link className="mx-1" to="/about-us">
            درباره ما
          </Link>{" "}
          |{" "}
          <Link className="mx-1" to="/terms">
            قوانین
          </Link>
        </p>
      </footer>
    </>
  )
}

export default Footer
