import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import router from "next/router";

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("Search component", () => {
  it("should render the component", () => {
    // Arrange
    const { getByPlaceholderText } = render(<Search />);

    // Assert
    expect(getByPlaceholderText("جستجو کنید...")).toBeInTheDocument();
  });

  it("should update keyword state when input is changed", () => {
    // Arrange
    const { getByPlaceholderText } = render(<Search />);
    const input = getByPlaceholderText("جستجو کنید...");

    // Act
    fireEvent.change(input, { target: { value: "test" } });

    // Assert
    expect(input.value).toBe("test");
  });

  it("should call useRouter.push with correct search query when submitHandler is called with a keyword", () => {
    // Arrange
    const { getByPlaceholderText, getByRole } = render(<Search />);
    const input = getByPlaceholderText("جستجو کنید...");
    const submitButton = getByRole("button");

    // Act
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/?keyword=test");
  });

  it("should call useRouter.push with '/' when submitHandler is called with no keyword", () => {
    // Arrange
    const { getByRole } = render(<Search />);
    const submitButton = getByRole("button");

    // Act
    fireEvent.click(submitButton);

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/");
  });
});
