import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

// Mock useDebounce to immediately return the value for testing
jest.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

describe("Search", () => {
  it("renders input with default placeholder", () => {
    render(<Search onDebouncedChange={jest.fn()} />);
    const input = screen.getByLabelText("search-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search GitHub users…");
  });

  it("renders input with custom placeholder", () => {
    render(<Search onDebouncedChange={jest.fn()} placeholder="Custom..." />);
    expect(screen.getByPlaceholderText("Custom...")).toBeInTheDocument();
  });

  it("calls onDebouncedChange with trimmed value on input change", () => {
    const onDebouncedChange = jest.fn();
    render(<Search onDebouncedChange={onDebouncedChange} />);
    const input = screen.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "  test  " } });
    expect(onDebouncedChange).toHaveBeenCalledWith("test");
  });

  it("shows clear button when input has value", () => {
    render(<Search onDebouncedChange={jest.fn()} />);
    const input = screen.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(screen.getByLabelText("clear")).toBeInTheDocument();
  });

  it("hides clear button when input is empty", () => {
    render(<Search onDebouncedChange={jest.fn()} />);
    expect(screen.queryByLabelText("clear")).not.toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    render(<Search onDebouncedChange={jest.fn()} />);
    const input = screen.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: "abc" } });
    const clearBtn = screen.getByLabelText("clear");
    fireEvent.click(clearBtn);
    expect(input).toHaveValue("");
  });
});