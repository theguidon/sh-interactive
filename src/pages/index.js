import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import slugify from "@sindresorhus/slugify"
import DescriptionBox from "../components/DescriptionBox"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import Footer from "../components/Footer"
import ContactUs from "../components/ContactUs"

const DescriptionSection = styled.section`
  position: relative;
`

export default ({ data }) => {
  let { events, tags } = data

  const tagHashMap = React.useRef()
  const newHashMap = tags.edges.reduce((acc, curr) => {
    acc[slugify(curr.node.data.name.text)] = curr.node.data.name.text

    return acc
  }, {})

  tagHashMap.current = newHashMap

  const description_wrapper = React.useRef(null)

  return (
    <Layout>
      <Hero />
      <DescriptionSection ref={description_wrapper}>
        {events.edges.map((el, i) => {
          return (
            <DescriptionBox
              key={el.node.id}
              data={el.node.data}
              html={el.node.data.description.html}
              tag={el.node.data.tag}
              bg={el.node.data.background_image?.localFile?.childImageSharp}
              mbg={
                el.node.data.mobile_background_image?.localFile?.childImageSharp
              }
              dateIndex={i}
              tagHashMap={tagHashMap?.current}
            ></DescriptionBox>
          )
        })}
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
            order
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
              raw
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
