import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

jest.mock("./Loader.module.scss", () => ({
  spinner: "spinner",
}));

describe("Loader", () => {
  it("renders a div with the spinner class", () => {
    render(<Loader />);
    const loaderDiv = screen.getByLabelText("loading");
    expect(loaderDiv).toBeInTheDocument();
    expect(loaderDiv).toHaveClass("spinner");
  });
});
