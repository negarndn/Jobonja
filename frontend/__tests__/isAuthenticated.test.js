import axios from "axios";
import { isAuthenticatedUser } from "../utils/isAuthenticated";

jest.mock("axios");

describe("isAuthenticatedUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return true if the API response status is 200", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    const isAuthenticated = await isAuthenticatedUser("fake_access_token");

    expect(isAuthenticated).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: "fake_access_token" }
    );
  });

  test("should return false if the API response status is not 200", async () => {
    axios.post.mockResolvedValueOnce({ status: 401 });

    const isAuthenticated = await isAuthenticatedUser("invalid_token");

    expect(isAuthenticated).toBe(false);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: "invalid_token" }
    );
  });

  test("should return false if an error occurs during the API call", async () => {
    axios.post.mockRejectedValueOnce(new Error("Something went wrong"));

    const isAuthenticated = await isAuthenticatedUser("fake_access_token");

    expect(isAuthenticated).toBe(false);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API_URL}/api/token/verify/`,
      { token: "fake_access_token" }
    );
  });
});
