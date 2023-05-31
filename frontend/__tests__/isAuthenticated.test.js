import axios from "axios";
import { isAuthenticatedUser } from "../utils/isAuthenticated";

jest.mock("axios");

describe("isAuthenticatedUser", () => {
  test("should return true if the API response status is 200", async () => {
    // Arrange
    axios.post.mockResolvedValueOnce({ status: 200 });
    const accessToken = "fake_access_token";

    // Act
    const isAuthenticated = await isAuthenticatedUser(accessToken);

    // Assert
    expect(isAuthenticated).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: accessToken }
    );
  });

  test("should return false if the API response status is not 200", async () => {
    // Arrange
    axios.post.mockResolvedValueOnce({ status: 401 });
    const accessToken = "invalid_token";

    // Act
    const isAuthenticated = await isAuthenticatedUser(accessToken);

    // Assert
    expect(isAuthenticated).toBe(false);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: accessToken }
    );
  });

  test("should return false if an error occurs during the API call", async () => {
    // Arrange
    axios.post.mockRejectedValueOnce(new Error("Something went wrong"));
    const accessToken = "fake_access_token";

    // Act
    const isAuthenticated = await isAuthenticatedUser(accessToken);

    // Assert
    expect(isAuthenticated).toBe(false);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: accessToken }
    );
  });
});
