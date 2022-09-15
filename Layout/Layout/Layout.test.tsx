import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import About from "../../pages/about";
import Layout from "./Layout";

const children = jest.fn();
jest.mock("../../../pages/about", () => {
  return jest.fn(() => <div>About</div>);
});

// const MockedAboutPage = jest.mocked(About);

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

jest.mock("react-query", () => ({
  useQuery: () => ({ isLoading: false, error: {}, data: [] }),
}));

describe("Layout", () => {
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
    render(
      <Layout title="Home" description="Home page">
        {About}
      </Layout>
    );
    const main = screen.getByRole("main");
    await waitFor(() => {
      expect(main).toBeInTheDocument();
    });
  });
});
