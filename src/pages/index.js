import React from "react"
import styled, { css } from "styled-components"
import tw from "tailwind.macro"
import { useViewportScroll, motion } from "framer-motion"

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
  background-color: white;

  font-weight: bold;
  font-size: 24px;
  color: #008c99;

  p {
    letter-spacing: 0.05em;
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
  const [tag, setTag] = React.useState("")
  const [date, setDate] = React.useState("")
  const [progress, setProgress] = React.useState(0)
  const { scrollYProgress } = useViewportScroll()

  const modifyBottomBar = function(showBar, tag, date) {
    setShowBar(showBar)
    if (tag !== "") {
      setTag(tag)
    }
    if (date !== "") {
      setDate(date)
    }
  }

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
  return (
    <Layout>
      <Hero />
      <DescriptionSection showBar={showBar} ref={description_wrapper}>
        <LoadingBox style={{ scaleY: scrollYProgress.current }} />
        {descriptions.map((el, i, a) => {
          return (
            <DescriptionBox
              text={el.text}
              tag={el.tag}
              date={el.date}
              key={i}
              modifyBottomBar={modifyBottomBar}
            />
          )
        })}
        <BottomBar showBar={showBar}>
          <h2>{tag}</h2>
          <p>{date}</p>
        </BottomBar>
      </DescriptionSection>
      <div className="h-screen"></div>
    </Layout>
  )
}
