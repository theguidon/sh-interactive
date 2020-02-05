import React from "react"
import styled, { css } from "styled-components"
import { RichText } from "prismic-reactjs"

const DescriptionContainer = styled.div``

const DescriptionScreen = styled.div`
  background-color: #0b0614;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DescriptionTextContainer = styled.div`
  text-shadow: ${p => p.theme["text-shadow"]};
  p {
    color: ${props => props.theme["text-color"]};
    font-size: 24px;
    max-width: 800px;
    text-align: center;
    line-height: 200%;
  
  }

  p:not(:last-child) {
    margin-bottom: 64px;
  }

  a {
    color: ${p => p.theme["text-color"]};
    text-decoration: none;
    position: relative;
    /* display: inline-block; */
    z-index: 50;

    &::after {
      content: "";
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 0;
      right: 0;
      background-color: ${p => p.theme["loader-green"]};
      z-index: 1;
    }

    transition: all ease-in 0.2s;

    /* &:hover {
      background-color: ${p => p.theme["text-color"]};
      color: ${p => p.theme["loader-green"]};
    } */
  }
`

export default ({ modifyBottomBar, html, dateIndex, tag }) => {
  const [lock, setLock] = React.useState(false)
  const description_wrapper = React.useRef(null)

  React.useEffect(() => {
    const item = description_wrapper && description_wrapper.current
    const options = {
      threshold: 0.7,
      root: null,
      rootMargin: "10px",
    }
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.7) {
          setLock(true)
          modifyBottomBar(dateIndex, tag)
        } else {
          modifyBottomBar("", "")
        }
      })
    }
    // window check
    const observer = new IntersectionObserver(callback, options)

    observer.observe(item)

    return () => observer.unobserve(item)
  }, [])

  return (
    <DescriptionContainer ref={description_wrapper}>
      <DescriptionScreen lock={lock}>
        <DescriptionTextContainer
          dangerouslySetInnerHTML={{ __html: html }}
        ></DescriptionTextContainer>
      </DescriptionScreen>
    </DescriptionContainer>
  )
}
