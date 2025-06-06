import React from "react"
import { css } from "@emotion/react"
import Navigation from "./nav"

const Header = () => (
  <header
    css={css`
      background-color: #222222;
      padding: 1rem;
    `}
  >
    <div
      css={css`
        max-width: 1200px;
        margin: 0 auto;

        @media (min-width: 768px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}
    >
      <h1
        css={css`
          color: #ffffff;
          text-align: center;
        `}
      >
        Hotel Gatsby
      </h1>

      <Navigation />
    </div>
  </header>
)

export default Header
