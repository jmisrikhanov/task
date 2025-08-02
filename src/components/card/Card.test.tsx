import Card from "./Card";
import { render, screen } from "@testing-library/react";

describe("Card", () => {
  it("renders correctly", () => {
    const { container } = render(<Card>User Detail</Card>);
    expect(container.firstChild).toHaveClass("card");

    render(<Card><h1>User Detail</h1></Card>);
    expect(true).toBeTruthy()
    
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument();
  });
});
