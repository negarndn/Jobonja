import React from "react";
import {
  render as rtlRender,
  waitFor,
  fireEvent,
  act,
  screen,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import { toast } from "react-toastify";
import router from "next/router";

import UploadResume from "../components/user/UploadResume";
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
    asPath: "/",
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

describe("UploadResume", () => {
  const access_token = "mockAccessToken";
  beforeEach(() => {
    mockValues = {
      loading: false,
      user: null,
      uploaded: false,
      error: null,
      clearErrors: jest.fn(),
      uploadResume: jest.fn(),
      setUploaded: jest.fn(),
      downloadResume: jest.fn(),
    };
  });

  test("should call uploadResume with the correct arguments", async () => {
    // Arrange
    const resume = new File(["resume"], "resume.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("resume", resume);

    const { getByTestId } = render(
      <UploadResume access_token={access_token} />
    );

    const uploadButton = getByTestId("upload-button");
    const fileInput = getByTestId("file-input");

    // Act
    fireEvent.change(fileInput, { target: { files: [resume] } });
    fireEvent.submit(uploadButton);

    // Assert
    await waitFor(() =>
      expect(mockValues.uploadResume).toHaveBeenCalledWith(
        formData,
        access_token
      )
    );
  });

  test("should call downloadResume with the correct argument", () => {
    // Arrange
    const resume = new File(["resume"], "resume.pdf", {
      type: "application/pdf",
    });

    render(<UploadResume access_token={access_token} />);

    // Act
    act(() => {
      mockValues.user = { resume };
      render(<UploadResume access_token={access_token} />);
    });

    const downloadButton = screen.getByTestId("download-button");
    fireEvent.click(downloadButton);

    // Assert
    expect(mockValues.downloadResume).toHaveBeenCalledWith(access_token);
  });

  test("should display success toast when uploaded prop is true", () => {
    // Arrange
    render(<UploadResume access_token={access_token} />);

    // Act
    act(() => {
      mockValues.uploaded = true;
      render(<UploadResume access_token={access_token} />);
    });

    // Assert
    expect(toast.success).toHaveBeenCalledWith(
      "رزومه شما با موفقیت بارگذاری شد."
    );
    expect(mockValues.setUploaded).toHaveBeenCalledWith(false);
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(router.useRouter().push).toHaveBeenCalledWith(
      router.useRouter().asPath
    );
  });

  test("should display an error toast message when there is an error", () => {
    // Arrange
    const error = "An error occurred.";
    render(<UploadResume access_token={access_token} />);

    // Act
    act(() => {
      mockValues.error = error;
      render(<UploadResume access_token={access_token} />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
    expect(mockValues.clearErrors).toHaveBeenCalledTimes(1);
  });

  test("should display loading state while uploading resume", async () => {
    // Arrange
    const { getByText } = render(<UploadResume access_token={access_token} />);

    // Act
    act(() => {
      mockValues.loading = true;
      render(<UploadResume access_token={access_token} />);
    });

    // Assert
    expect(getByText("در حال بارگذاری...")).toBeInTheDocument();
  });
});
