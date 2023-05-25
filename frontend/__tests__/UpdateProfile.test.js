import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import UpdateProfile from "../components/user/UpdateProfile";
import { render as rtlRender, act } from "@testing-library/react";
import { toast } from "react-toastify";
import router from "next/router";

import AuthContext from "../context/AuthContext";

let mockValues;

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockValues}>{children}</AuthContext.Provider>
  );
};

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: MockAuthProvider, ...options });
};

describe("UpdateProfile", () => {
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
      updateProfile: jest.fn(),
      uploadResume: jest.fn(),
    };
  });

  test("should render the component with initial values", () => {
    // Arrange
    render(<UpdateProfile access_token="mockAccessToken" />);

    // Act
    const firstNameInput = screen.getByPlaceholderText("نام");
    const lastNameInput = screen.getByPlaceholderText("نام خانوادگی");
    const emailInput = screen.getByPlaceholderText("آدرس ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    const submitButton = screen.getByText("ذخیره کردن تغییرات");

    // Assert
    expect(firstNameInput).toHaveValue("Sam");
    expect(lastNameInput).toHaveValue("Smith");
    expect(emailInput).toHaveValue("samsmith@example.com");
    expect(passwordInput).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  test("should update the input values on change", () => {
    // Arrange
    render(<UpdateProfile access_token="mockAccessToken" />);

    // Act
    const firstNameInput = screen.getByPlaceholderText("نام");
    const lastNameInput = screen.getByPlaceholderText("نام خانوادگی");
    const emailInput = screen.getByPlaceholderText("آدرس ایمیل");
    const passwordInput = screen.getByPlaceholderText("رمز عبور");

    fireEvent.change(firstNameInput, { target: { value: "Lana" } });
    fireEvent.change(lastNameInput, { target: { value: "DelRey" } });
    fireEvent.change(emailInput, {
      target: { value: "lanadelrey@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assert
    expect(firstNameInput).toHaveValue("Lana");
    expect(lastNameInput).toHaveValue("DelRey");
    expect(emailInput).toHaveValue("lanadelrey@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("should call updateProfile when the form is submitted", () => {
    // Arrange
    render(<UpdateProfile access_token="mockAccessToken" />);

    // Act
    const submitButton = screen.getByText("ذخیره کردن تغییرات");
    fireEvent.click(submitButton);

    // Assert
    expect(mockValues.updateProfile).toHaveBeenCalledWith(
      {
        firstName: "Sam",
        lastName: "Smith",
        email: "samsmith@example.com",
        password: "",
      },
      "mockAccessToken"
    );
  });

  test("should display an error toast message when there is an error", () => {
    // Arrange
    const error = "An error occurred.";
    render(<UpdateProfile access_token="mockAccessToken" />);

    // Act
    act(() => {
      mockValues.error = error;
      render(<UpdateProfile access_token="mockAccessToken" />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should redirect to /me when updated is true", () => {
    // Arrange
    render(<UpdateProfile access_token="mockAccessToken" />);

    // Act
    act(() => {
      mockValues.updated = true;
      render(<UpdateProfile access_token="mockAccessToken" />);
    });

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/me");
  });

  test("should display loading state while updating profile", async () => {
    // Arrange
    const { getByText } = render(
      <UpdateProfile access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.loading = true;
      render(<UpdateProfile access_token="mockAccessToken" />);
    });

    // Assert
    expect(getByText("درحال بروزرسانی...")).toBeInTheDocument();
  });
});
