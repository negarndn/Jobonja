import React from "react";
import { render as rtlRender, act, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import Register from "../components/auth/Register";
import AuthContext from "../context/AuthContext";
import router from "next/router";

let mockValues;

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockValues}>{children}</AuthContext.Provider>
  );
};

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: MockAuthProvider, ...options });
};

describe("Register Component", () => {
  beforeEach(() => {
    mockValues = {
      loading: false,
      error: null,
      isAuthenticated: false,
      register: jest.fn(),
      clearErrors: jest.fn(),
    };
  });

  test("should render register form correctly", () => {
    // Arrange & Act
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Register />
    );

    // Assert
    expect(getByPlaceholderText("نام")).toBeInTheDocument();
    expect(getByPlaceholderText("نام خانوادگی")).toBeInTheDocument();
    expect(getByPlaceholderText("آدرس ایمیل")).toBeInTheDocument();
    expect(getByPlaceholderText("رمز عبور")).toBeInTheDocument();
    expect(getByText("ثبت‌نام")).toBeInTheDocument();
  });

  test("should display error toast when there is an error", async () => {
    // Arrange
    const error = "Registration failed";
    render(<Register />);

    // Act
    act(() => {
      mockValues.error = error;
      render(<Register />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should redirect to home page after successful registration", async () => {
    // Arrange
    render(<Register />);

    // Act
    act(() => {
      mockValues.isAuthenticated = true;
      render(<Register />);
    });

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/");
  });

  test("should call register function on form submission", async () => {
    // Arrange
    const { getByPlaceholderText, getByTestId } = render(<Register />);
    const firstNameInput = getByPlaceholderText("نام");
    const lastNameInput = getByPlaceholderText("نام خانوادگی");
    const emailInput = getByPlaceholderText("آدرس ایمیل");
    const passwordInput = getByPlaceholderText("رمز عبور");
    const submitButton = getByTestId("submit-button");

    // Act
    fireEvent.change(firstNameInput, { target: { value: "Sam" } });
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    fireEvent.change(emailInput, { target: { value: "samsmith@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Assert
    expect(mockValues.register).toHaveBeenCalledWith({
      firstName: "Sam",
      lastName: "Smith",
      email: "samsmith@test.com",
      password: "password123",
    });
  });

  test("should display loading state while registering", async () => {
    // Arrange
    const { getByTestId, rerender } = render(<Register />);

    // Act
    act(() => {
      mockValues.loading = true;
      rerender(<Register />);
    });

    // Assert
    expect(getByTestId("submit-button")).toHaveTextContent(
      "در حال بارگذاری اطلاعات..."
    );
  });
});
