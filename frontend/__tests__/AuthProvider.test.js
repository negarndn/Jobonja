import React, { useContext, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import { screen, fireEvent, render, act } from "@testing-library/react";

import AuthContext, { AuthProvider } from "../context/AuthContext";

jest.mock("axios");

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("AuthProvider", () => {
  describe("login method", () => {
    test("should set user and isAuthenticated when login is successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { login } = useContext(AuthContext);

        const username = "test@test.com";
        const password = "password123";

        return (
          <>
            <button
              data-testid="login"
              onClick={() => login({ username, password })}
            ></button>
          </>
        );
      };

      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = getByTestId("login");

      // Act
      await act(async () => {
        fireEvent.click(loginButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith("/api/auth/login", {
        username: "test@test.com",
        password: "password123",
      });
      expect(router.useRouter().push).toHaveBeenCalledWith("/");
    });

    test("should handle login error and set error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, login } = useContext(AuthContext);

        const username = "test@test.com";
        const password = "password123";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="login"
              onClick={() => login({ username, password })}
            ></button>
          </>
        );
      };

      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Login failed",
          },
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = getByTestId("login");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(loginButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith("/api/auth/login", {
        username: "test@test.com",
        password: "password123",
      });
      expect(errorElement.textContent).toBe("Login failed");
    });
  });

  describe("register method", () => {
    test("should redirect to login page after successful registration", async () => {
      // Arrange
      const TestComponent = () => {
        const { register } = useContext(AuthContext);

        const firstName = "John";
        const lastName = "Doe";
        const email = "test@test.com";
        const password = "password123";

        return (
          <>
            <button
              data-testid="register"
              onClick={() => register({ firstName, lastName, email, password })}
            ></button>
          </>
        );
      };

      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "Registration successful" },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = getByTestId("register");

      // Act
      await act(async () => {
        fireEvent.click(registerButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/register/`,
        {
          first_name: "John",
          last_name: "Doe",
          email: "test@test.com",
          password: "password123",
        }
      );
      expect(router.useRouter().push).toHaveBeenCalledWith("/login");
    });

    test("should handle registration error and set error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, register } = useContext(AuthContext);

        const firstName = "John";
        const lastName = "Doe";
        const email = "test@test.com";
        const password = "password123";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="register"
              onClick={() => register({ firstName, lastName, email, password })}
            ></button>
          </>
        );
      };

      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Registration failed",
          },
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = getByTestId("register");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(registerButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/register/`,
        {
          first_name: "John",
          last_name: "Doe",
          email: "test@test.com",
          password: "password123",
        }
      );
      expect(errorElement.textContent).toBe("Registration failed");
    });
  });

  describe("updateProfile method", () => {
    test("should update user profile and set updated state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { updateProfile, updated, user } = useContext(AuthContext);

        const firstName = "John";
        const lastName = "Doe";
        const email = "test@test.com";
        const password = "password123";
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="updated">
              {updated ? updated.toString() : "null"}
            </div>
            <div data-testid="user">{user ? user.firstName : ""}</div>
            <button
              data-testid="updateProfile"
              onClick={() =>
                updateProfile(
                  { firstName, lastName, email, password },
                  accessToken
                )
              }
            ></button>
          </>
        );
      };

      axios.put.mockResolvedValueOnce({
        status: 200,
        data: {
          user: 1,
          firstName: "John",
          lastName: "Doe",
          email: "test@test.com",
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const updateProfileButton = getByTestId("updateProfile");
      const userElement = getByTestId("user");

      // Act
      await act(async () => {
        fireEvent.click(updateProfileButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/me/update/`,
        {
          first_name: "John",
          last_name: "Doe",
          email: "test@test.com",
          password: "password123",
        },
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(userElement.textContent).toBe("John");
      expect(screen.getByTestId("updated").textContent).toBe("true");
    });

    test("should handle update error and set error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, updateProfile } = useContext(AuthContext);

        const firstName = "John";
        const lastName = "Doe";
        const email = "test@test.com";
        const password = "password123";
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="updateProfile"
              onClick={() =>
                updateProfile(
                  { firstName, lastName, email, password },
                  accessToken
                )
              }
            ></button>
          </>
        );
      };

      axios.put.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Update failed",
          },
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const updateProfileButton = getByTestId("updateProfile");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(updateProfileButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/me/update/`,
        {
          first_name: "John",
          last_name: "Doe",
          email: "test@test.com",
          password: "password123",
        },
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Update failed");
    });
  });

  describe("uploadResume method", () => {
    test("should upload resume and set uploaded state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { uploadResume, uploaded } = useContext(AuthContext);

        const formData = new FormData();
        formData.append("resume", "mockResumeFile");
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="uploaded">
              {uploaded ? uploaded.toString() : "null"}
            </div>
            <button
              data-testid="uploadResume"
              onClick={() => uploadResume(formData, accessToken)}
            ></button>
          </>
        );
      };

      axios.put.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const uploadResumeButton = getByTestId("uploadResume");

      // Act
      await act(async () => {
        fireEvent.click(uploadResumeButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/upload/resume/`,
        expect.any(FormData),
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(screen.getByTestId("uploaded").textContent).toBe("true");
    });

    test("should handle upload error and set error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, uploadResume } = useContext(AuthContext);

        const formData = new FormData();
        formData.append("resume", "mockResumeFile");
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error ? error : "null"}</div>
            <button
              data-testid="uploadResume"
              onClick={() => uploadResume(formData, accessToken)}
            ></button>
          </>
        );
      };

      axios.put.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Upload failed",
          },
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const uploadResumeButton = getByTestId("uploadResume");
      const errorElement = getByTestId("error");

      // Assert
      expect(errorElement.textContent).toBe("null");

      // Act
      await act(async () => {
        fireEvent.click(uploadResumeButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/upload/resume/`,
        expect.any(FormData),
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Upload failed");
    });
  });

  describe("logout method", () => {
    test("should logout user and reset isAuthenticated and user state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { isAuthenticated, user, logout } = useContext(AuthContext);

        return (
          <>
            <div data-testid="isAuthenticated">
              {isAuthenticated.toString()}
            </div>
            <div data-testid="user">{JSON.stringify(user)}</div>
            <button data-testid="logout" onClick={logout}></button>
          </>
        );
      };

      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const logoutButton = getByTestId("logout");

      // Act
      await act(async () => {
        fireEvent.click(logoutButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith("/api/auth/logout");
      expect(getByTestId("isAuthenticated").textContent).toBe("false");
      expect(getByTestId("user").textContent).toBe("null");
    });

    test("should handle logout error and set error state, isAuthenticated, and user state to false", async () => {
      // Arrange
      const TestComponent = () => {
        const { isAuthenticated, user, error, logout } =
          useContext(AuthContext);

        return (
          <>
            <div data-testid="isAuthenticated">
              {isAuthenticated.toString()}
            </div>
            <div data-testid="user">{JSON.stringify(user)}</div>
            <div data-testid="error">{error}</div>
            <button data-testid="logout" onClick={logout}></button>
          </>
        );
      };

      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Logout failed",
          },
        },
      });

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const logoutButton = getByTestId("logout");

      // Act
      await act(async () => {
        fireEvent.click(logoutButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith("/api/auth/logout");
      expect(getByTestId("isAuthenticated").textContent).toBe("false");
      expect(getByTestId("user").textContent).toBe("null");
      expect(getByTestId("error").textContent).toBe("Logout failed");
    });
  });

  describe("clearErrors method", () => {
    test("should clear error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, setError, clearErrors } = useContext(AuthContext);

        useEffect(() => {
          setError("An error occurred.");
        }, []);

        return (
          <>
            <div data-testid="error">{error}</div>
            <button data-testid="clearErrors" onClick={clearErrors}></button>
          </>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const clearErrorsButton = getByTestId("clearErrors");

      // Act
      await act(async () => {
        fireEvent.click(clearErrorsButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(getByTestId("error").textContent).toBe("");
    });
  });
});
