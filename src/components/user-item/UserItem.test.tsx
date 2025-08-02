import { render, screen, fireEvent } from "@testing-library/react";
import UserItem from "./UserItem";

describe("UserItem", () => {
  const defaultProps = {
    login: "testuser",
    avatarUrl: "https://example.com/avatar.png",
    onSelect: jest.fn(),
  };

  it("renders the user's login and avatar", () => {
    render(<UserItem {...defaultProps} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
    const img = screen.getByAltText("testuser avatar") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://example.com/avatar.png");
  });

  it("calls onSelect with login when clicked", () => {
    render(<UserItem {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /user-testuser/i }));
    expect(defaultProps.onSelect).toHaveBeenCalledWith("testuser");
  });

  it("applies selected style when selected is true", () => {
    const { container } = render(<UserItem {...defaultProps} selected />);
    const button = container.querySelector("button");
    expect(button?.className).toMatch(/selected/);
  });

  it("does not apply selected style when selected is false", () => {
    const { container } = render(
      <UserItem {...defaultProps} selected={false} />
    );
    const button = container.querySelector("button");
    expect(button?.className).not.toMatch(/selected/);
  });
});
