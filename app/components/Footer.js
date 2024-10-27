import React, { useEffect } from "react"

function Footer() {
  return (
    <>
      <footer className="border-top text-center small text-muted py-3">
        <p>
          <a href="/" className="mx-1">
            خانه
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/about-us">
            درباره ما
          </a>{" "}
          |{" "}
          <a className="mx-1" href="/terms">
            قوانین
          </a>
        </p>
        <p className="m-0">
          Copyright &copy; 2020{" "}
          <a href="/" className="text-muted">
            ComplexApp
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer
