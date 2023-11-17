import React from "react";
import { render } from "@testing-library/react";
import { MockButton } from "./mockButton.js";

describe("MockButton", () => {
  it("should render the component with the correct props", () => {
    const { container } = render(<MockButton />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
