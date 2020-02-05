/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Mukta"],
        },
        custom: {
          families: ["Tiempos Text"],
          urls: ["/fonts/fonts.css"],
        },
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
        },
        shouldNormalizeImage: ({ node, key, value }) => {
          return true
        },
      },
    },
  ],
}
