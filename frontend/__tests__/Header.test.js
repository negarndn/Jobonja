import React from "react";
import { render as rtlRender, fireEvent } from "@testing-library/react";
import AuthContext from "../context/AuthContext";
import Header from "../components/layout/Header";

const render = (ui, options) => {
  const { user, loading, logout } = options;

  return rtlRender(
    <AuthContext.Provider value={{ user, loading, logout }}>
      {ui}
    </AuthContext.Provider>
  );
};

describe("Header Component", () => {
  test("should render logo and buttons correctly", () => {
    // Arrange
    const { getByText, getByRole } = render(<Header />, {
      user: null,
      loading: false,
      logout: jest.fn(),
    });

    // Assert
    expect(getByRole("link", { name: "جاب اونجا" })).toBeInTheDocument();
    expect(getByText("درج آگهی استخدام")).toBeInTheDocument();
    expect(getByText("ورود")).toBeInTheDocument();
  });

  test("should render user dropdown when user is logged in", () => {
    // Arrange
    const user = {
      first_name: "Sam",
      last_name: "Smith",
    };
    const { getByText, getByRole } = render(<Header />, {
      user,
      loading: false,
      logout: jest.fn(),
    });

    // Assert
    expect(getByRole("link", { name: "جاب اونجا" })).toBeInTheDocument();
    expect(
      getByText(`${user.first_name} ${user.last_name}`)
    ).toBeInTheDocument();
    expect(getByText("آگهی‌های شغلی من")).toBeInTheDocument();
    expect(getByText("درخواست‌های من")).toBeInTheDocument();
    expect(getByText("تنظیمات حساب کاربری من")).toBeInTheDocument();
    expect(getByText("بارگذاری رزومه")).toBeInTheDocument();
    expect(getByText("خروج")).toBeInTheDocument();
  });

  test("should call logout function when logout link is clicked", () => {
    // Arrange
    const logout = jest.fn();
    const { getByText } = render(<Header />, {
      user: {
        first_name: "Sam",
        last_name: "Smith",
      },
      loading: false,
      logout,
    });
    const logoutLink = getByText("خروج");

    // Act
    fireEvent.click(logoutLink);

    // Assert
    expect(logout).toHaveBeenCalled();
  });

  test("should not render login button when user is logged in", () => {
    // Arrange
    const user = {
      first_name: "Sam",
      last_name: "Smith",
    };
    const { queryByText } = render(<Header />, {
      user,
      loading: false,
      logout: jest.fn(),
    });

    // Assert
    expect(queryByText("ورود")).toBeNull();
  });

  test("should render user's full name or default greeting", () => {
    // Arrange
    const user = {
      first_name: "Sam",
      last_name: "Smith",
    };
    const { getByText } = render(<Header />, {
      user,
      loading: false,
      logout: jest.fn(),
    });

    // Assert
    expect(
      getByText(`${user.first_name} ${user.last_name}`)
    ).toBeInTheDocument();
  });

  test("should render default greeting when user's full name is not available", () => {
    // Arrange
    const { getByText } = render(<Header />, {
      user: {
        first_name: null,
        last_name: null,
      },
      loading: false,
      logout: jest.fn(),
    });

    // Assert
    expect(getByText("خوش آمدید")).toBeInTheDocument();
  });
});
