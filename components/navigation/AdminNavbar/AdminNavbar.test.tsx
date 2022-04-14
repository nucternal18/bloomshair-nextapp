import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AdminNavbar from "./AdminNavbar";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/admin",
      pathname: "",
      query: "",
      asPath: "/admin",
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
      route: "/admin",
      pathname: "",
      query: "",
      asPath: "/admin",
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
    render(<AdminNavbar />);
    const view = screen.getByLabelText("admin-dashboard-navigation");
    await waitFor(() => {
      expect(view).toBeInTheDocument();
    });
  });
});
