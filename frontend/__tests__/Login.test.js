import React from "react";
import { render as rtlRender, act, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import Login from "../components/auth/Login";
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

describe("Login Component", () => {
  beforeEach(() => {
    mockValues = {
      loading: false,
      user: {
        first_name: "Sam",
        last_name: "Smith",
        email: "samsmith@example.com",
      },
      error: null,
      isAuthenticated: false,
      updated: null,
      uploaded: null,
      setUpdated: jest.fn(),
      setUploaded: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      clearErrors: jest.fn(),
      updateProfile: jest.fn((profileData, accessToken) =>
        mockUpdateProfile(profileData, accessToken)
      ),
      uploadResume: jest.fn(),
    };
  });

  test("should render login form correctly", () => {
    // Arrange & Act
    const { getByPlaceholderText, getByText, getByTestId } = render(<Login />);
    const submitButton = getByTestId("submit-button");

    // Assert
    expect(
      getByPlaceholderText("آدرس ایمیل خود را وارد نمایید")
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText("رمز عبور خود را وارد نمایید")
    ).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(getByText("حساب کاربری ندارید؟")).toBeInTheDocument();
    expect(getByText("ثبت‌نام کنید")).toBeInTheDocument();
  });

  test("should display error toast when there is an error", async () => {
    // Arrange
    const error = "Invalid credentials";
    render(<Login />);

    // Act
    act(() => {
      mockValues.error = error;
      render(<Login />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should redirect to home page after successful login", async () => {
    // Arrange
    render(<Login />);

    // Act
    act(() => {
      mockValues.isAuthenticated = true;
      render(<Login />);
    });

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/");
  });

  test("should call login function on form submission", async () => {
    // Arrange
    const { getByPlaceholderText, getByTestId } = render(<Login />);
    const emailInput = getByPlaceholderText("آدرس ایمیل خود را وارد نمایید");
    const passwordInput = getByPlaceholderText("رمز عبور خود را وارد نمایید");
    const submitButton = getByTestId("submit-button");

    // Act
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Assert
    expect(mockValues.login).toHaveBeenCalledWith({
      username: "test@test.com",
      password: "password123",
    });
  });

  test("should display loading state while authenticating", async () => {
    // Arrange
    const { getByTestId, rerender } = render(<Login />);

    // Act
    act(() => {
      mockValues.loading = true;
      rerender(<Login />);
    });

    // Assert
    const submitButton = getByTestId("submit-button");
    expect(submitButton).toHaveTextContent("احراز هویت...");
  });
});
