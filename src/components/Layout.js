import React from "react"
import "../styles/index.css"
import { Helmet } from "react-helmet"

export default props => (
  <main>
    <Helmet title="Utin" />
    {props.children}
  </main>
)
