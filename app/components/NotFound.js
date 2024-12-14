import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "./Page"

function NotFound() {
  return (
    <Page title="یافت نشد!">
      <div className="text-center">
        <h2>.نتوانستیم صفحه را پیدا کنیم</h2>
        <p className="lead text-muted">
          .شما میتوانید به <Link to={"/"}>صفحه اصلی</Link> بروید تا شروع جدیدی داشته باشید
        </p>
      </div>
    </Page>
  )
}

export default NotFound
