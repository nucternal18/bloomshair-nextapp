/* eslint-disable jest/no-commented-out-tests */
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import About from "../../pages/about";
import AdminLayout from ".";
import Sidebar from "../../components/navigation/Sidebar/Sidebar";

jest.mock("../../../pages/about");

const MockedAboutPage = jest.mocked(About);
const mockedSidebar = jest.mocked(Sidebar);

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

describe("AdminLayout", () => {
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
  it("Should render", () => {
    render(<AdminLayout title="Admin">{MockedAboutPage}</AdminLayout>);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  // it("renders mockedAboutPage", () => {
  //   render(<AdminLayout title="Admin">{MockedAboutPage}</AdminLayout>);

  //   expect(screen.getAllByText("About Blooms Hair")).toBeInTheDocument();
  // });

  // it("renders Sidebar", () => {
  //   render(<AdminLayout title="Admin">{MockedAboutPage}</AdminLayout>);

  //   expect(screen.getByText('Sidebar')).toBeInTheDocument();
  // });
});
