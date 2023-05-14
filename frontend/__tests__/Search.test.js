import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Search component", () => {
  it("should render the component", () => {
    const { getByPlaceholderText } = render(<Search />);
    expect(getByPlaceholderText("جستجو کنید...")).toBeInTheDocument();
  });

  it("should update keyword state when input is changed", () => {
    const { getByPlaceholderText } = render(<Search />);
    const input = getByPlaceholderText("جستجو کنید...");

    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
  });

  it("should call useRouter.push with correct search query when submitHandler is called with a keyword", () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));
    const { getByPlaceholderText, getByRole } = render(<Search />);
    const input = getByPlaceholderText("جستجو کنید...");
    const submitButton = getByRole("button");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);
    expect(push).toHaveBeenCalledWith("/?keyword=test");
  });

  it("should call useRouter.push with '/' when submitHandler is called with no keyword", () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));
    const { getByRole } = render(<Search />);
    const submitButton = getByRole("button");
    fireEvent.click(submitButton);
    expect(push).toHaveBeenCalledWith("/");
  });
});
