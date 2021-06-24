module.exports = {
  siteMetadata: {
    title: `Studio of Chelsea Cardinal`,
    description: `LChelsea Cardinal is a graphic designer, illustrator and fashion designer. She grew up on the canadian prairies, attended the Alberta College of Art + Design, moved to New York in 2005, worked at GQ Magazine for many years and is now freelancing. Chelsea Cardinal is a graphic designer, illustrator and fashion designer. She grew up on the canadian prairies, attended the Alberta College of Art + Design, moved to New York in 2005, worked at GQ Magazine for many years and is now freelancing.`,
    siteUrl: `https://elegant-austin-8bf305.netlify.app`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`autoprefixer`)({ grid: "autoplace" }),
          require(`postcss-import`),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          "gatsby-remark-normalize-paths",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1626,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/site`,
        name: `about`,
      },
    },
    `gatsby-plugin-image`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
