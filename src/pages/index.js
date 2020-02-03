import React from "react"
import styled, { css } from "styled-components"

import DescriptionBox from "../components/DescriptionBox"
import Hero from "../components/Hero"
import Layout from "../components/Layout"

import descriptions from "../data/descriptions.js"

const DescriptionSection = styled.section`
  position: relative;
`

const LoadingBox = styled(motion.div)`
  position: absolute;
  /* ${tw`bg-loader-green z-10`}; */
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  transform-origin: left top;
`

const BottomBar = styled.div`
  height: 96px;
  padding-left: 64px;
  padding-right: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* overflow: hidden; */
  background-color: white;

  font-weight: bold;
  font-size: 24px;
  color: #008c99;

  p {
    letter-spacing: 0.05em;
    /* transform: translateY(-200%); */
  }

  h2 {
    /* transform: translateY(-200%); */
  }
  transition: transform 0.4s;
  transform: ${p => (!p.showBar ? "translateY(100%)" : "translateY(0%)")};

  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
  /* ${tw`shadow-lg`} */
`

const DateContainer = styled.div`
  /* transform: translateY(${100}px); */
  height: 36px;
  overflow: hidden;
`
const Date = styled.p`
  transition: transform 0.2s ease-in-out;

  transform: translateY(${p => p.currDateWeight * -36}px);
  text-align: right;
`

const TagContainer = styled.div`
  height: 36px;
  overflow: hidden;
`
const Tag = styled.h2`
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transform: translateY(${p => p.currTagWeight * -36}px);
  text-align: left;
`

function getDocHeight() {
  var D = typeof document !== "undefined" && document
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  )
}

export default () => {
  const description_wrapper = React.useRef(null)
  const [showBar, setShowBar] = React.useState(false)
  const [currDateWeight, setCurrDateWeight] = React.useState(0)
  const [currTagWeight, setCurrTagWeight] = React.useState(0)

  const modifyBottomBar = function(capturedCurrTagWeight) {
    return function(newDateWeight, newTagWeight) {
      if (newDateWeight !== "") {
        setCurrDateWeight(newDateWeight)
      }

      if (newTagWeight !== "") {
        console.log(descriptions[newTagWeight].category)
        console.log(descriptions[capturedCurrTagWeight].category)
        if (
          descriptions[newTagWeight].tag !==
          descriptions[capturedCurrTagWeight].tag
        ) {
          setCurrTagWeight(newTagWeight)
        }
      }
    }
  }

  React.useEffect(() => {
    const item = description_wrapper && description_wrapper.current
    const options = {
      threshold: [0.01, 0.5, 0.6, 0.7, 0.8, 1],
      root: null,
      rootMargin: "-150px",
    }
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowBar(true)
        } else {
          setShowBar(false)
        }
      })
    }
    // window check
    const observer = new IntersectionObserver(callback, options)

    observer.observe(item)

    return () => observer.unobserve(item)
  }, [])
  return (
    <Layout>
      <Hero />
      <DescriptionSection ref={description_wrapper}>
        {/* {descriptions.map((el, i, a) => {
          return (
            <DescriptionBox
              text={el.text}
              tag={el.tag}
              date={el.date}
              category={el.category}
              weight={i}
              key={i}
              modifyBottomBar={modifyBottomBar(currTagWeight)}
            />
          )
        })} */}
        <BottomBar showBar={showBar}>
          <TagContainer>
            {/* {descriptions.map((el, i) => {
              return (
                <Tag key={i} currTagWeight={currTagWeight}>
                  {el.tag}
                </Tag>
              )
            })} */}
          </TagContainer>
          {/* <DateContainer></DateContainer> */}
        </BottomBar>
      </DescriptionSection>
    </Layout>
  )
}
