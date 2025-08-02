import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";

// Mock styles import
jest.mock("./UserDetails.module.scss", () => ({
  placeholder: "placeholder",
  error: "error",
  card: "card",
  header: "header",
  avatar: "avatar",
  name: "name",
  link: "link",
  bio: "bio",
  meta: "meta",
  badge: "badge",
}));

// Mock Loader component
jest.mock("../loader/Loader", () => () => <div data-testid="loader" />);

// Mock useGetUserQuery
const mockUseGetUserQuery = jest.fn();
jest.mock("../../services/githubApi", () => ({
  useGetUserQuery: (...args: any[]) => mockUseGetUserQuery(...args),
}));

describe("UserDetails", () => {
  // Always return a default object to avoid destructuring undefined
  beforeAll(() => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
      error: undefined,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders placeholder when no login is provided", () => {
    render(<UserDetails />);
    expect(
      screen.getByText(/select a user to view details/i)
    ).toBeInTheDocument();
  });

  it("renders loader when fetching", () => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
      error: undefined,
    });
    render(<UserDetails login="octocat" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders error message with status if error object has status", () => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: true,
      error: { status: 404 },
    });
    render(<UserDetails login="octocat" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to load user (404)."
    );
  });

  it("renders generic error message if error object does not have status", () => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: true,
      error: "Some error",
    });
    render(<UserDetails login="octocat" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong."
    );
  });

  it("returns null if no data and not fetching or error", () => {
    mockUseGetUserQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
      error: undefined,
    });
    const { container } = render(<UserDetails login="octocat" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders user details when data is present", () => {
    const userData = {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      login: "octocat",
      name: "The Octocat",
      html_url: "https://github.com/octocat",
      bio: "GitHub's mascot",
      public_repos: 8,
    };
    mockUseGetUserQuery.mockReturnValue({
      data: userData,
      isFetching: false,
      isError: false,
      error: undefined,
    });
    render(<UserDetails login="octocat" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", userData.avatar_url);
    expect(screen.getByText(userData.name)).toBeInTheDocument();
    expect(screen.getByText(`@${userData.login}`)).toHaveAttribute(
      "href",
      userData.html_url
    );
    expect(screen.getByText(userData.bio)).toBeInTheDocument();
    expect(screen.getByText(/Repos: 8/)).toBeInTheDocument();
  });

  it("renders login as name if name is null", () => {
    const userData = {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      login: "octocat",
      name: null,
      html_url: "https://github.com/octocat",
      bio: null,
      public_repos: 8,
    };
    mockUseGetUserQuery.mockReturnValue({
      data: userData,
      isFetching: false,
      isError: false,
      error: undefined,
    });
    render(<UserDetails login="octocat" />);
    expect(screen.getByText(userData.login)).toBeInTheDocument();
  });

  it("does not render bio if bio is null", () => {
    const userData = {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      login: "octocat",
      name: "The Octocat",
      html_url: "https://github.com/octocat",
      bio: null,
      public_repos: 8,
    };
    mockUseGetUserQuery.mockReturnValue({
      data: userData,
      isFetching: false,
      isError: false,
      error: undefined,
    });
    render(<UserDetails login="octocat" />);
    // Check that no element with the bio class is rendered
    expect(document.querySelector(".bio")).not.toBeInTheDocument();
  });
});
