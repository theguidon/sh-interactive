import React from "react"
import { Helmet } from "react-helmet"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import link from "../images/link.svg"

import "../styles/reset.css"

const GlobalStyle = createGlobalStyle`
  html,body {
    font-size: 100%;
    font-family: 'Mukta', sans-serif;
  }

  a {
    display:inline-flex;
    align-items:center;
  }

  a:before {
    content: url(${link});
  }
`

const theme = {
  primary: "#0B0614",
  "text-color": "#F6F8FF",
  "loader-green": "#008C99",
  "text-shadow": "4px 4px 25px rgba(0, 0, 0, 0.25);",
}

export default props => (
  <ThemeProvider theme={theme}>
    <main>
      <GlobalStyle></GlobalStyle>
      <Helmet title="Sexual harassment in Ateneo: A timeline" />
      {props.children}
    </main>
  </ThemeProvider>
)
