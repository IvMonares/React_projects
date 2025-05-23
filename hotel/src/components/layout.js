import React from "react"
import Helmet from "react-helmet"

import Header from "./header"
import { Global, css } from "@emotion/react"

const Layout = props => (
  <>
    <Global
      styles={css`
        html {
          font-size: 62.5%;
        }
        body {
          font-size: 1.8rem;
          line-height: 1.5;
          font-family: "PT Sans", sans-serif;
        }
        h1,
        h2,
        h3 {
          margin: 0;
          line-height: 1.5;
        }
        h1,
        h2 {
          font-family: "Roboto", serif;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}
    />
    <Helmet>
      <title>Hotel Gatsby</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto:400,700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Header></Header>
    {props.children}
  </>
)

export default Layout
