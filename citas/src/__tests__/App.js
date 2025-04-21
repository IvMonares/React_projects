import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Complete App Testing", () => {
    const wrapper = render(<App />);
    wrapper.debug();
    //expect( element ).toMatchSnapshot();
});
