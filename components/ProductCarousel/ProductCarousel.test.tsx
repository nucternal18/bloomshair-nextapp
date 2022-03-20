import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import ProductCarousel from "./ProductCarousel";
const products = [
  {
    _id: "1",
    image: "./bloomslogo512x512.png",
    name: "product1",
    price: 1.0,
    brand: "blooms",
    category: "flower",
    countInStock: 10,
    description: "this is product1",
  },
];
describe("ProductCarousel", () => {
  it("Should render", () => {
    render(<ProductCarousel products={products} />);
    const view = screen.getByLabelText("product-carousel");
    expect(view).toBeInTheDocument();
  });
});
