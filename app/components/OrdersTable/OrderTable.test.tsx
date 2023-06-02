import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import OrdersTable from ".";
import { OrderProps } from "@lib/types";

const orders: Partial<OrderProps>[] = [
  {
    id: "5f4b8f8f9c9d4400005d8f5c",
    createdAt: new Date("2020-06-20T13:00:00.000Z"),
    totalPrice: 0,
    isPaid: false,
    isDelivered: false,
    deliveredAt: new Date("2020-06-20T13:00:00.000Z"),
    paidAt: new Date("2020-06-20T13:00:00.000Z"),
  },
];

describe("OrderTable", () => {
  it("Should render", () => {
    render(<OrdersTable tableData={orders as OrderProps[]} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
