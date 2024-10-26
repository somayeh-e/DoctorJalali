import React from "react"
import ReactDOM from "react-dom/client"

function Main() {
  return (
    <div>
      <h1>This is our app!!!</h1>
    </div>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
