import { render } from "@testing-library/react";
import { Layout } from "./Layout";

// Mock the CSS module
jest.mock("./Layout.module.scss", () => ({
  layout: "layout-mock-class",
}));

describe("Layout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("applies the layout class from styles", () => {
    const { container } = render(
      <Layout>
        <span>Content</span>
      </Layout>
    );
    expect(container.firstChild).toHaveClass("layout-mock-class");
  });

  it("renders multiple children", () => {
    const { getByText } = render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>
    );
    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const { container } = render(<Layout />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});