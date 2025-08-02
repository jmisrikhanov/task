import { render, screen } from "@testing-library/react";
import SearchPage from "./SearchPage";

// Mock child components
jest.mock("../search/Search", () => (props: any) => (
  <button onClick={() => props.onDebouncedChange("test-query")}>Search</button>
));
jest.mock("../user-list/UserList", () => (props: any) => (
  <div>
    <button onClick={() => props.onSelect("user1")}>User1</button>
    <span data-testid="selected">{props.selected}</span>
    <span data-testid="query">{props.query}</span>
  </div>
));
jest.mock("../user-details/UserDetails", () => (props: any) => (
  <div data-testid="user-details">{props.login}</div>
));

describe("SearchPage", () => {
  it("renders Search, UserList, and UserDetails", () => {
    render(<SearchPage />);
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByTestId("user-details")).toBeInTheDocument();
  });

  it("UserDetails login is null initially", () => {
    render(<SearchPage />);
    expect(screen.getByTestId("user-details")).toBeEmptyDOMElement();
  });
});
