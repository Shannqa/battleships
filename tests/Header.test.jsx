import { render, screen } from "@testing-library/react";

import Header from "../src/components/Header.jsx";

it("true to be true", () => {
  expect(true).toBe(true);
});

describe("Header component", () => {
  it("render the header", () => {
    render(<Header />);
    expect(screen.getByRole("heading").textContent).toMatch(/Memory Game/i);

  })
})
