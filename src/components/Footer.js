import React from "react"
import styled from "styled-components"
import Logo from "../images/90thLogo_Long_White.svg"

const FooterStyles = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 4% 6.6%;
  background-color: #0b0614;
  color: #f6f7f9;
  font-family: "Tiempos Text", serif;

  > p {
    margin-bottom: 16px;
  }

  > img {
    max-width: 350px;
    margin-bottom: 24px;
  }
`

export default function Footer(props) {
  return (
    <FooterStyles>
      <img src={Logo} alt="" />
      <p>Sexual harassment in Ateneo: A timeline</p>
      <p>Written by Frans G. Regala</p>
      <p>Interactive by Anton Benitez and Tomas Falgui III</p>
      <p>Photos by Jim Dasal, Aldo Santiago, and Alexis Wang</p>
      <p>Illustrations by Fidess Bisnar, Alvin Dy, and Denev Ng</p>
    </FooterStyles>
  )
}
