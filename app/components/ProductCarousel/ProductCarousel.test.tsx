import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProductCarousel from "./ProductCarousel";
const products = [
  {
    id: "1",
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
