import React from "react"
import { graphql } from "gatsby"
import styled, { css } from "styled-components"

import DescriptionBox from "../components/DescriptionBox"
import Hero from "../components/Hero"
import Layout from "../components/Layout"

const DescriptionSection = styled.section`
  position: relative;
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
  overflow-y: hidden;
`
const Date = styled.p`
  transition: transform 0.2s ease-in-out;
  font-family: "Tiempos Text", serif;
  transform: translateY(${p => p.currDateIndex * -31.2}px);
  text-align: right;
`

const TagContainer = styled.div`
  height: 31.2px;
  overflow: hidden;
`
const Tag = styled.h2`
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  transform: translateY(${p => p.currTagIndex * -31.2}px);
  text-align: left;
  font-family: "Tiempos Text", serif;
  font-weight: 600;
`

export default ({ data }) => {
  let { events, tags } = data
  events = events.edges.sort(function(a, b) {
    const key1 =
      typeof window !== "undefined" && new window.Date(a.node.data.date.text)
    const key2 =
      typeof window !== "undefined" && new window.Date(b.node.data.date.text)

    if (key1 < key2) {
      return -1
    } else if (key1 == key2) {
      return 0
    } else {
      return 1
    }
  })
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
        return el.node.data.name.text === newTagIndex
      })

      setCurrTagIndex(tagNum)
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
        {events.map((el, i) => {
          return (
            <DescriptionBox
              key={el.node.id}
              html={el.node.data.description.html}
              tag={el.node.data.tag.document[0].data.name.text}
              dateIndex={i}
              modifyBottomBar={modifyBottomBar}
            ></DescriptionBox>
          )
        })}
        <BottomBar showBar={showBar}>
          <TagContainer>
            {tags.edges.map(el => {
              return (
                <Tag key={el.node.id} currTagIndex={currTagIndex}>
                  {el.node.data.name.text}
                </Tag>
              )
            })}
          </TagContainer>
          <DateContainer>
            {events.map(el => {
              return (
                <Date key={el.node.id} currDateIndex={currDateIndex}>
                  {el.node.data.date.text}
                </Date>
              )
            })}
          </DateContainer>
        </BottomBar>
      </DescriptionSection>
    </Layout>
  )
}

export const query = graphql`
  query EventQuery {
    events: allPrismicEvent {
      edges {
        node {
          data {
            date {
              text
            }
            description {
              html
            }
            tag {
              document {
                ... on PrismicTags {
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
          id
        }
      }
    }
    tags: allPrismicTags {
      edges {
        node {
          data {
            name {
              text
            }
          }
          id
        }
      }
    }
  }
`
