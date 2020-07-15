import React from "react"
import styled, { css } from "styled-components"
import BackgroundImage from "gatsby-background-image"

import useWindowSize from "../hooks/useWindowSize"

const DescriptionContainer = styled.section``

const DescriptionTextContainer = styled.div`
  text-shadow: ${p => p.theme["text-shadow"]};
  p {
    color: ${props => props.theme["text-color"]};
    font-size: 24px;
    max-width: 800px;
    text-align: center;
    line-height: 200%;

    @media screen and (max-width: 950px) {
      font-size: 20px;
      max-width: 600px;
    }

    @media screen and (max-width: 730px) {
      font-size: 20px;
      max-width: 550px;
    }

    @media screen and (max-width: 640px) {
      font-size: 16px;
      max-width: 500px;
    }
    @media screen and (max-width: 660px) {
      max-width: 450px;
    }

    @media screen and (max-width: 540px) {
      max-width: 420px; /* blazeit */
    }

    @media screen and (max-width: 475px) {
      max-width: 350px;
    }

    @media screen and (max-width: 390px) {
      max-width: 300px; /* blazeit */
    }

    @media screen and (max-width: 340px) {
      max-width: 250px; /* blazeit */
    }
  }

  p:not(:last-child) {
    margin-bottom: 64px;

    @media screen and (max-width: 640px) {
      margin-bottom: 32px;
    }
  }

  a {
    color: ${p => p.theme["text-color"]};
    text-decoration: none;
    background: linear-gradient(
      to left,
      #0b0614 50%,
      ${p => p.theme["loader-green"]} 50%
    );
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.3s ease-in;

    ${p =>
      p.showAnimation &&
      css`
      /* color: ${p.theme["loader-green"]}; */
      background-position:left bottom;

    `};
  }
`

const ArtDirectedBackground = ({ className, bg, mbg, html, showAnimation }) => {
  const size = useWindowSize()

  let sources
  let desktop
  let mobile
  if (!!bg && !!mbg) {
    desktop = [
      bg.fluid,
      `linear-gradient(0deg,rgba(11, 6, 20, 0.9) 0%,rgba(11, 6, 20, 0.9) 100%)`,
    ].reverse()
    mobile = [
      mbg.fluid,
      `linear-gradient(0deg,rgba(11, 6, 20, 0.9) 0%,rgba(11, 6, 20, 0.9) 100%)`,
    ].reverse()
  } else if (!!bg && !mbg) {
    sources = [
      bg.fluid,
      `linear-gradient(0deg,rgba(11, 6, 20, 0.9) 0%,rgba(11, 6, 20, 0.9) 100%)`,
    ].reverse()
  }

  return (
    <BackgroundImage
      Tag={`div`}
      className={className}
      fluid={!!bg && !!mbg ? (size.width > 1024 ? desktop : mobile) : sources}
    >
      <DescriptionTextContainer
        dangerouslySetInnerHTML={{ __html: html }}
        showAnimation={showAnimation}
      />
    </BackgroundImage>
  )
}

const DescriptionScreen = styled(ArtDirectedBackground)`
  background-color: #0b0614;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SubScreen = styled.div`
  background-color: #0b0614;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default ({ modifyBottomBar, html, dateIndex, tag, bg, mbg }) => {
  const [showAnimation, setShowAnimation] = React.useState(false)
  const description_wrapper = React.useRef(null)

  React.useEffect(() => {
    const item = description_wrapper && description_wrapper.current
    const options = {
      threshold: 0.7,
      root: null,
      rootMargin: "-10px",
    }
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.7) {
          modifyBottomBar(dateIndex, tag)
          setShowAnimation(true)
        } else {
          modifyBottomBar("", "")
        }
      })
    }
    // window check
    const observer = new IntersectionObserver(callback, options)

    observer.observe(item)

    return () => observer.unobserve(item)
  }, [dateIndex, modifyBottomBar, tag])

  return (
    <DescriptionContainer ref={description_wrapper}>
      {!!bg || !!mbg ? (
        <DescriptionScreen
          html={html}
          bg={bg}
          mbg={mbg}
          showAnimation={showAnimation}
        />
      ) : (
        <SubScreen>
          <DescriptionTextContainer
            dangerouslySetInnerHTML={{ __html: html }}
            showAnimation={showAnimation}
          />
        </SubScreen>
      )}
    </DescriptionContainer>
  )
}
