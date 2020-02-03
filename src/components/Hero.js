import React from "react"
import GLogo from "../images/gdn.svg"

import styled from "styled-components"

const Hero = styled.section`
  /* ${tw`h-screen bg-black`} */
  color: #F6F7F9;
`

export default () => (
  <Hero>
    <img src={GLogo} />
    <h1>Sexual harassment in Ateneo: A timeline</h1>
  </Hero>
)
