import React from "react"
import styled, { css } from "styled-components"
import BackgroundImage from "gatsby-background-image"
import link from "../images/link.svg"

import useWindowSize from "../hooks/useWindowSize"

const BottomBar = styled.div`
  height: 96px;
  @media screen and (max-width: 1100px) {
    height: 80px;
  }
  padding-left: 64px;
  padding-right: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 930px) {
    justify-content: center;
  }
  @media screen and (max-width: 660px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 540px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media screen and (max-width: 500px) {
    height: 64px;
  }

  background-color: white;

  font-weight: bold;
  font-size: 24px;
  color: #008c99;

  p {
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  h2 {
  }
  transition: opacity ${p => (!p.showDetails ? "0.4s" : "0.5s")};
  opacity: ${p => (!p.showDetails ? 0 : 1)};

  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
`

const DateContainer = styled.div`
  height: 31.2px;
  @media screen and (max-width: 1100px) {
    height: 26px;
  }

  @media screen and (max-width: 930px) {
    display: none;
  }
  overflow-y: hidden;
`
const Date = styled.p`
  transition: transform 0.2s ease-in-out;
  font-family: "Tiempos Text", serif;
  text-align: right;
  @media screen and (max-width: 1100px) {
    font-size: 20px;
  }
`

const TagContainer = styled.div`
  height: 31.2px;
  @media screen and (max-width: 1100px) {
    height: 26px;
  }
  @media screen and (max-width: 730px) {
    height: 23.2px;
  }

  @media screen and (max-width: 660px) {
    height: 20.8px;
  }

  @media screen and (max-width: 500px) {
    height: 18.4px;
  }
  @media screen and (max-width: 395px) {
    height: 36.8px;
    position: relative;
  }
  overflow: hidden;
`
const Tag = styled.h2`
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transform: translateY(${p => p.currTagIndex * -31.2}px);
  @media screen and (max-width: 1100px) {
    font-size: 20px;
    transform: translateY(${p => p.currTagIndex * -26}px);
  }
  text-align: left;
  @media screen and (max-width: 930px) {
    text-align: center;
  }

  @media screen and (max-width: 730px) {
    font-size: 18px;
    transform: translateY(${p => p.currTagIndex * -23.2}px);
  }

  @media screen and (max-width: 660px) {
    font-size: 16px;
    transform: translateY(${p => p.currTagIndex * -20.8}px);
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
    transform: translateY(${p => p.currTagIndex * -18.4}px);
  }

  @media screen and (max-width: 449px) {
    font-size: 12px;
    transform: translateY(${p => p.currTagIndex * -15.6}px);
  }

  @media screen and (max-width: 395px) {
    margin-bottom: 18.4px;
    height: 31.2px;
    transform: translateY(${p => p.currTagIndex * -49.6}px);
  }

  font-family: "Tiempos Text", serif;
  font-weight: 600;
`

const DescriptionContainer = styled.section`
  position: relative;
`

const DescriptionTextContainer = styled.div`
  text-shadow: ${p => p.theme["text-shadow"]};
  padding-top: 10%;
  padding-bottom: 10%;
  p {
    color: ${props => props.theme["text-color"]};
    font-size: 24px;
    max-width: 800px;
    text-align: center;
    line-height: 200%;

    widows: none;

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
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
    margin-right: 4px;
    color: ${p => p.theme["text-color"]};
    text-decoration: none;
    position: relative;
    padding: 4px 8px;
    &:before {
      content: url(${link});
      margin-right: 8px;
    }
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

const FloatingDateContainer = styled.div`
  @media screen and (min-width: 931px) {
    display: none;
  }
  transition: opacity 0.4s;
  opacity: ${p => (!p.showDetails ? 0 : 1)};
  transform: translateX(-50%);
  padding: 4px 8px;
  position: fixed;
  left: 50%;
  top: 48px;
  overflow: hidden;
  z-index: 20;
  background-color: #008c99;
`

const FloatingDate = styled.p`
  color: ${p => p.theme["text-color"]};
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
`

export default ({ data, html, dateIndex, tag, bg, mbg, tagHashMap }) => {
  const [showAnimation, setShowAnimation] = React.useState(false)
  const [showDetails, setShowDetails] = React.useState(false)
  const description_wrapper = React.useRef(null)

  React.useEffect(() => {
    const item = description_wrapper && description_wrapper.current
    const options = {
      threshold: [0.4, 0.5, 0.6, 0.7],
      root: null,
      rootMargin: "-10px",
    }
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
          setShowAnimation(true)
          setShowDetails(true)
        } else {
          setShowDetails(false)
        }
      })
    }
    // window check
    const observer = new IntersectionObserver(callback, options)
    observer.observe(item)

    return () => observer.unobserve(item)
  }, [dateIndex, tag])

  return (
    <DescriptionContainer ref={description_wrapper}>
      <FloatingDateContainer showDetails={showDetails}>
        <FloatingDate>{data.date.text}</FloatingDate>
      </FloatingDateContainer>
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
      <BottomBar showDetails={showDetails}>
        <TagContainer>
          <Tag>{tagHashMap && tagHashMap[data.tag.slug]}</Tag>
        </TagContainer>
        <DateContainer>
          <Date>{data.date.text}</Date>
        </DateContainer>
      </BottomBar>
    </DescriptionContainer>
  )
}
