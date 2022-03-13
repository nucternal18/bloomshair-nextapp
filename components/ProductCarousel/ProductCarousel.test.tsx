import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import ProductCarousel from "./ProductCarousel";

describe("ProductCarousel", () => {
  it("Should render", () => {
    const view = render(<ProductCarousel />);
    expect(view).toBeInTheDocument();
  });
});
