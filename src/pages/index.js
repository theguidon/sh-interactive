import React from "react"
import styled, { css } from "styled-components"
import tw from "tailwind.macro"
import {
  useViewportScroll,
  motion,
  useTransform,
  useSpring,
} from "framer-motion"
import { Transition } from "react-transition-group"

import DescriptionBox from "../components/DescriptionBox"
import Hero from "../components/Hero"
import Layout from "../components/Layout"

import descriptions from "../data/descriptions.js"

const DescriptionSection = styled.section`
  position: relative;
`

const LoadingBox = styled(motion.div)`
  position: absolute;
  ${tw`bg-loader-green z-10`};
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
    transition: transform 0.2s ease-in-out;
  }

  h2 {
    /* transform: translateY(-200%); */
    transition: transform 0.2s ease-in-out;
  }
  transition: transform 0.4s;
  transform: ${p => (!p.showBar ? "translateY(100%)" : "translateY(0%)")};

  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
  ${tw`shadow-lg`}
`

const DateContainer = styled.div`
  /* transform: translateY(${100}px); */
  height: 36px;
  overflow: hidden;
`
const Date = styled.p`
  transform: translateY(${p => p.currDateWeight * -36}px);
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
  const [currTag, setCurrTag] = React.useState("Complaints emerge")
  const [currDate, setCurrDate] = React.useState("September 2016")
  const [nextTag, setNextTag] = React.useState("Complaints emerge")
  const [nextDate, setNextDate] = React.useState("September 2016")

  // const [progress, setProgress] = React.useState(0)
  // const [change, setChange] = React.useState(true)
  // const { scrollYProgress } = useViewportScroll()
  // const yRange = useTransform(scrollYProgress, v => {
  //   const val = v
  //   if (val < 0) {
  //     return 0
  //   }
  //   return v
  // })

  const modifyBottomBar = function(newTag, newDate, newDateWeight) {
    if (newTag !== "") {
      setNextTag(newTag)
    }
    if (newDate !== "") {
      setNextDate(newDate)
    }
    if (newDateWeight !== "") {
      setCurrDateWeight(newDateWeight)
    }
  }

  React.useEffect(() => {
    if (currDate === nextDate) {
      return
    }
    // transform pababa
    // then change opacity and bring back to 0 but speed
    // then turn on opacity and bring down
  }, [nextDate])
  // React.useEffect(() => {
  //   const top =
  //     description_wrapper.current &&
  //     typeof window !== "undefined" &&
  //     window.pageYOffset +
  //       description_wrapper.current.getBoundingClientRect().top

  //   const height =
  //     description_wrapper.current &&
  //     description_wrapper.current.getBoundingClientRect().height
  //   typeof window !== "undefined" &&
  //     window.addEventListener("scroll", function(e) {
  //       const a = window.scrollY - top
  //       if (a < 0) {
  //         return
  //       }
  //       // setProgress(a / height + 0.02)
  //     })
  // }, [])

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
          console.log(entry)
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
        {/* <LoadingBox style={{ scaleY: yRange }} /> */}
        {descriptions.map((el, i, a) => {
          return (
            <DescriptionBox
              text={el.text}
              tag={el.tag}
              date={el.date}
              weight={i}
              currTag={currTag}
              currDate={currDate}
              currWeight={currDateWeight}
              key={i}
              modifyBottomBar={modifyBottomBar}
            />
          )
        })}
        <BottomBar showBar={showBar}>
          <h2>{currTag}</h2>
          <DateContainer>
            {descriptions.map((el, i) => {
              return (
                <Date key={i} currDateWeight={currDateWeight}>
                  {el.date}
                </Date>
              )
            })}
          </DateContainer>
        </BottomBar>
      </DescriptionSection>
      <div className="h-screen"></div>
    </Layout>
  )
}
