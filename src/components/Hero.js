import React from "react"
import GLogo from "../images/gdn.svg"

import styled from "styled-components"

/* ${tw`h-screen bg-black`} */

const Hero = styled.section`
  color: #f6f7f9;
  background-color: #000;
  height: 100vh;
`

export default () => (
  <Hero>
    <img src={GLogo} />
    <h1>Sexual harassment in Ateneo: A timeline</h1>
  </Hero>
)
