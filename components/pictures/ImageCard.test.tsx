import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ImageCard from "./ImageCard";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }: { src: string; alt: string }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

describe("ImageCard", () => {
  it("Should render", async () => {
    render(
      <ImageCard image="/bloomslogo512x512.png" setSelectedImg={jest.fn()} />
    );
    const ariaLabel = screen.getByLabelText("image-card");
    expect(ariaLabel).toBeInTheDocument();
  });

  it("render image", async () => {
    render(
      <ImageCard image="/bloomslogo512x512.png" setSelectedImg={jest.fn()} />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  it("should call setSelectedImg once on click", async () => {
    const setSelectedImg = jest.fn();
    render(
      <ImageCard
        image="/bloomslogo512x512.png"
        setSelectedImg={setSelectedImg}
      />
    );
    const imageCard = screen.getByLabelText("image-card");
    fireEvent.click(imageCard);
    expect(setSelectedImg).toHaveBeenCalledTimes(1);
  });
});
