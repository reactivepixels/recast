import React from "react";
import { render } from "@testing-library/react";
import { MockButton } from "./mockButton.js";

describe("MockButton", () => {
  it("should render the component with the correct props", () => {
    const { container } = render(<MockButton />);

    expect(container.innerHTML).toEqual('<button class="bg-primary"></button>');
  });

  it("should render the component with the correct props", () => {
    const { container } = render(<MockButton intent="default" />);

    expect(container.innerHTML).toEqual(
      '<button class="bg-primary bg-primary text-primary-foreground hover:bg-primary/90"></button>',
    );
  });
});
