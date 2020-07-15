import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GLogo from "../images/90thLogo_Long_White.svg"
import MouseImg from "../images/mouse.svg"
import ChevDown from "../images/chevron-down.svg"

import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"

/* ${tw`h-screen bg-black`} */

const Header = styled.h1`
  font-family: "Tiempos Text";
  font-size: 72px;
  font-weight: bold;
  width: 1000px;
  @media screen and (max-width: 1300px) {
    font-size: 60px;
    max-width: 900px;
  }
  @media screen and (max-width: 1110px) {
    font-size: 54px;
    max-width: 650px;
  }
  @media screen and (max-width: 950px) {
    font-size: 48px;
    max-width: 550px;
  }
  @media screen and (max-width: 850px) {
    text-align: center;
  }
  @media screen and (max-width: 715px) {
    font-size: 42px;
    max-width: 525px;
  }
  @media screen and (max-width: 620px) {
    font-size: 36px;
    max-width: 450px;
  }
  @media screen and (max-width: 535px) {
    font-size: 32px;
    max-width: 350px;
  }
  @media screen and (max-width: 460px) {
    font-size: 28px;
    max-width: 300px;
  }
  @media screen and (max-width: 400px) {
    font-size: 24px;
    max-width: 280px;
  }
`
const Logo = styled.img`
  max-width: 350px;
  margin-bottom: 16px;
  @media screen and (max-width: 950px) {
    max-width: 300px;
  }
  @media screen and (max-width: 850px) {
    max-width: 275px;
  }
  @media screen and (max-width: 775px) {
    max-width: 250px;
  }
  @media screen and (max-width: 715px) {
    max-width: 225px;
  }
  @media screen and (max-width: 535px) {
    max-width: 200px;
  }
  @media screen and (max-width: 460px) {
    max-width: 175px;
  }
  @media screen and (max-width: 400px) {
    max-width: 150px;
  }
`

const HeadlineWrapper = styled.div`
  grid-area: logo;
  display: flex;
  flex-direction: column;
  align-self: center;
  @media screen and (max-width: 850px) {
    align-items: center;
  }
`

const ScrollDownWrapper = styled.div`
  grid-area: mouse;
  align-items: center;
  justify-content: end;
  display: flex;
  flex-direction: column;
  width: min-content;
  height: min-content;

  align-self: end;
  justify-self: center;

  #mouseImg {
    margin-bottom: 8px;
    max-width: 24px;
  }
  #chevronDown {
    max-width: 36px;
    height: auto;
  }

  @media screen and (max-width: 950px) {
    #mouseImg {
      max-width: 18px;
    }
    #chevronDown {
      max-width: 32px;
    }
  }
  @media screen and (max-width: 850px) {
    #mouseImg {
      display: none;
    }
  }
`

function HeroSection({ className }) {
  const { bg } = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "HeroBGimg.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const backgroundFluidImageStack = [
    bg.childImageSharp.fluid,
    `linear-gradient(0deg,rgba(11, 6, 20, 0.8) 0%,rgba(11, 6, 20, 0.8) 100%)`,
  ].reverse()
  return (
    <BackgroundImage
      Tag="section"
      className={className}
      fluid={backgroundFluidImageStack}
    >
      <HeadlineWrapper>
        <Logo src={GLogo} />
        <Header>Sexual harassment in Ateneo: A timeline</Header>
      </HeadlineWrapper>
      <ScrollDownWrapper>
        <img alt="Mouse Icon" id="mouseImg" src={MouseImg} />
        <img alt="Arrow Down Icon" id="chevronDown" src={ChevDown} />
      </ScrollDownWrapper>
    </BackgroundImage>
  )
}

const Hero = styled(HeroSection)`
  display: grid;
  grid-template-rows: 20% auto 20%;
  grid-template-columns: auto;
  grid-template-areas:
    "empty"
    "logo"
    "mouse";
  padding: 64px 128px;
  box-sizing: border-box;
  color: #f6f7f9;
  background-size: cover;
  background-color: transparent;
  height: 100vh;
  width: 100%;

  @media screen and (max-width: 1110px) {
    padding: 64px 96px;
  }

  @media screen and (max-width: 850px) {
    padding: 64px 64px;
  }

  @media screen and (max-width: 775px) {
    padding: 48px;
  }

  @media screen and (max-width: 575px) {
    padding: 36px;
  }

  @media screen and (max-width: 420px) {
    padding: 24px;
  }
`

export default Hero
