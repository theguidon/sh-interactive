import React from "react"
import styled, { css } from "styled-components"
import { RichText } from "prismic-reactjs"

const DescriptionLoading = styled.div`
  /* transform: translateY(-100%); */
  transition: transform 0.4s;
`

const DescriptionContainer = styled.div``

const DescriptionScreen = styled.div`
/* 
  ${props =>
    props.lock &&
    css`
      overflow: hidden;
    `} */
    background-color: #0B0614;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`

/* ${tw`max-w-lg text-center text-text-color leading-loose`} */

const DescriptionText = styled.p``
/* ${tw`relative z-20`} */

const DescriptionTextContainer = styled.div`
  text-shadow: 4px 4px 25px rgba(0, 0, 0, 0.25);
  color: #f6f8ff;
`

export default ({ modifyBottomBar, html }) => {
  console.log(html)
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
          modifyBottomBar(1, 1)
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
