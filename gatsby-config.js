/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  pathPrefix: `/2020/07/admu-sexual-harassment`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Mukta:400,700"],
        },
        custom: {
          families: ["Tiempos Text"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        height: 8,
        color: "#008C99",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "shinteractive",
        accessToken:
          "MC5YamhmQUJBQUFDTUFrTVhQ.77-9Y--_vXvvv73vv70877-977-9Hu-_ve-_vQliGBLvv73vv71V77-977-977-977-977-9aO-_ve-_ve-_vUwFIe-_vQ",
        schemas: {
          event: require("./src/schema/eventSchema.json"),
          tags: require("./src/schema/tagSchema.json"),
        },
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true
        },
      },
    },
  ],
}
