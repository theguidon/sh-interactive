import React from "react"
import "../styles/reset.css"
import { Helmet } from "react-helmet"

export default props => (
  <main>
    <Helmet title="Utin" />
    {props.children}
  </main>
)
