import React from "react"
import { graphql } from "gatsby"
import styled, { css } from "styled-components"
import slugify from "@sindresorhus/slugify"
import DescriptionBox from "../components/DescriptionBox"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import Footer from "../components/Footer"
import ContactUs from "../components/ContactUs"

const DescriptionSection = styled.section`
  position: relative;
`

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
  transition: transform 0.4s;
  transform: ${p => (!p.showBar ? "translateY(100%)" : "translateY(0%)")};

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
  transform: translateY(${p => p.currDateIndex * -31.2}px);
  text-align: right;
  @media screen and (max-width: 1100px) {
    font-size: 20px;
    transform: translateY(${p => p.currDateIndex * -26}px);
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
    ${p =>
      (p.currTagIndex === 0 || p.currTagIndex === 3) &&
      css`
        top: 50%;
        transform: translateY(-50%);
      `}
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

const FloatingDateContainer = styled.div`
  @media screen and (min-width: 931px) {
    display: none;
  }
  transition: transform 0.4s;
  transform: ${p =>
    !p.showBar ? "translate(-50%,-250%)" : "translate(-50%,0%)"};

  position: fixed;
  left: 50%;
  top: 48px;
  height: 30px;
  overflow: hidden;
  z-index: 1000;
  background-color: #008c99;
`

const FloatingDate = styled.p`
  transition: transform 0.2s ease-in-out;
  color: ${p => p.theme["text-color"]};
  margin: 0;
  padding: 0;
  text-align: center;
  transform: translateY(${p => p.currDateIndex * -30}px);
  font-weight: 700;
  font-size: 18px;
`

export default ({ data }) => {
  let { events, tags } = data

  const description_wrapper = React.useRef(null)
  const [showBar, setShowBar] = React.useState(false)
  const [currDateIndex, setCurrDateIndex] = React.useState(0)
  const [currTagIndex, setCurrTagIndex] = React.useState(0)

  const modifyBottomBar = function(newDateIndex, newTagIndex) {
    if (newDateIndex !== "") {
      setCurrDateIndex(newDateIndex)
    }

    if (newTagIndex !== "") {
      const tagNum = tags.edges.findIndex(el => {
        return slugify(el.node.data.name.text) === newTagIndex
      })

      setCurrTagIndex(tagNum)
    }
  }

  React.useEffect(() => {
    const item = description_wrapper && description_wrapper.current
    const options = {
      threshold: [0.01, 0.5, 0.6, 0.7, 0.8, 1],
      root: null,
      rootMargin: "-10px",
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
  }, [description_wrapper])

  return (
    <Layout>
      <Hero />
      <DescriptionSection ref={description_wrapper}>
        <FloatingDateContainer showBar={showBar}>
          {events.edges.map(el => {
            return (
              <FloatingDate key={el.node.id} currDateIndex={currDateIndex}>
                {el.node.data.date.text}
              </FloatingDate>
            )
          })}
        </FloatingDateContainer>
        {events.edges.map((el, i) => {
          return (
            <DescriptionBox
              key={el.node.id}
              html={el.node.data.description.html}
              tag={el.node.data.tag.slug}
              bg={el.node.data.background_image?.localFile?.childImageSharp}
              mbg={
                el.node.data.mobile_background_image?.localFile?.childImageSharp
              }
              dateIndex={i}
              modifyBottomBar={modifyBottomBar}
            ></DescriptionBox>
          )
        })}
        <BottomBar showBar={showBar}>
          <TagContainer currTagIndex={currTagIndex}>
            {tags.edges.map((el, i) => {
              return (
                <Tag key={el.node.id} currTagIndex={currTagIndex}>
                  {el.node.data.name.text}
                </Tag>
              )
            })}
          </TagContainer>
          <DateContainer>
            {events.edges.map(el => {
              return (
                <Date key={el.node.id} currDateIndex={currDateIndex}>
                  {el.node.data.date.text}
                </Date>
              )
            })}
          </DateContainer>
        </BottomBar>
      </DescriptionSection>
      <ContactUs />
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query EventQuery {
    events: allPrismicEvent(sort: { order: ASC, fields: data___order }) {
      edges {
        node {
          data {
            date {
              text
            }
            description {
              html
            }
            mobile_background_image {
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            background_image {
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            tag {
              slug
            }
          }
          id
        }
      }
    }
    tags: allPrismicTags {
      edges {
        node {
          id
          data {
            name {
              text
            }
          }
        }
      }
    }
  }
`
