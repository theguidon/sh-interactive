import React from "react"
import styled, { css } from "styled-components"
import tw from "tailwind.macro"

const DescriptionLoading = styled.div`
  /* transform: translateY(-100%); */
  transition: transform 0.4s;
`

const DescriptionContainer = styled.div`
  ${tw`relative`}
`
const DescriptionScreen = styled.div`
  ${tw`bg-primary h-screen flex flex-col items-center justify-center relative`}
/* 
  ${props =>
    props.lock &&
    css`
      overflow: hidden;
    `} */
`
const DescriptionText = styled.p`
  ${tw`max-w-lg text-center text-text-color leading-loose`}
  text-shadow: 4px 4px 25px rgba(0, 0, 0, 0.25);
`
const DescriptionTextContainer = styled.div`
  ${tw`relative z-20`}
`

export default ({ modifyBottomBar, text, tag, date, weight, currWeight }) => {
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
          modifyBottomBar(tag, date, weight)
          // console.log(weight)
          // console.log(currWeight)
          // create element based on weight
        } else {
          modifyBottomBar("", "", "")
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
        <DescriptionTextContainer>
          {typeof text == "object" ? (
            text.map((el, i) => <DescriptionText key={i}>{el}</DescriptionText>)
          ) : (
            <DescriptionText>{text}</DescriptionText>
          )}
        </DescriptionTextContainer>
      </DescriptionScreen>
    </DescriptionContainer>
  )
}
