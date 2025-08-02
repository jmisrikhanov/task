import { render, screen, act } from "@testing-library/react";
import UserList from "./UserList";

// Mock the API hook
const mockUseSearchUsersQuery = jest.fn();

// Mock the githubApi module to return the custom mock
jest.mock("../../services/githubApi", () => ({
  useSearchUsersQuery: (...args: any[]) => mockUseSearchUsersQuery(...args),
}));

// Mock the SCSS module
jest.mock("./UserList.module.scss", () => ({
  list: "list",
  placeholder: "placeholder",
  error: "error",
}));

// Controlled mock for IntersectionObserver
let observeCallback: (entries: IntersectionObserverEntry[]) => void;

beforeAll(() => {
  (globalThis as any).IntersectionObserver = class {
    constructor(cb: typeof observeCallback) {
      observeCallback = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

beforeEach(() => {
  mockUseSearchUsersQuery.mockReset();

  // Fallback return value for unhandled calls
  mockUseSearchUsersQuery.mockReturnValue({
    data: {
      items: [],
    },
    isFetching: false,
    isError: false,
    error: null,
  });
});

describe("UserList", () => {
  it("fetches next page when last user is intersecting", async () => {
    // First call (initial page)
    mockUseSearchUsersQuery
      .mockImplementationOnce(() => ({
        data: {
          items: [
            {
              id: 1,
              login: "testuser1",
              avatar_url: "https://example.com/avatar1.jpg",
            },
          ],
        },
        isFetching: false,
        isError: false,
        error: null,
      }))
      // Second call (after scroll)
      .mockImplementationOnce(() => ({
        data: {
          items: [
            {
              id: 2,
              login: "testuser2",
              avatar_url: "https://example.com/avatar2.jpg",
            },
          ],
        },
        isFetching: false,
        isError: false,
        error: null,
      }));

    render(<UserList query="john" onSelect={() => {}} />);

    // First user should be in the DOM
    expect(screen.getByText("testuser1")).toBeInTheDocument();

    // Simulate scroll intersection using `act`
    await act(async () => {
      observeCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    // Second user should be rendered after scroll
    expect(screen.getByText("testuser2")).toBeInTheDocument();
  });
});
