import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Navbar from ".";

jest.mock("react-query", () => ({
  useQuery: () => ({ isLoading: false, error: {}, data: [] }),
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "/",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Navbar", () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "/",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  it("Should render", async () => {
    render(<Navbar />);
    const view = screen.getByLabelText("main-navigation");
    await waitFor(() => {
      expect(view).toBeInTheDocument();
    });
  });
});
