import React from "react";
import {
  render as rtlRender,
  fireEvent,
  act,
  screen,
} from "@testing-library/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import JobContext from "../context/JobContext";
import UpdateJob from "../components/job/UpdateJob";

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

const MockJobProvider = ({ children }) => {
  return (
    <JobContext.Provider value={mockValues}>{children}</JobContext.Provider>
  );
};

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: MockJobProvider, ...options });
};

describe("UpdateJob component", () => {
  beforeEach(() => {
    mockValues = {
      loading: false,
      error: null,
      updated: null,
      updateJob: jest.fn(),
      setUpdated: jest.fn(),
      clearErrors: jest.fn(),
    };
  });

  test("should display an error toast if there is an error", () => {
    // Arrange
    const error = "An error occurred.";
    render(<UpdateJob job={{}} access_token="mockAccessToken" />);

    // Act
    act(() => {
      mockValues.error = error;
      render(<UpdateJob job={{}} access_token="mockAccessToken" />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should update the job with the correct data", () => {
    // Arrange
    const job = {
      id: 1,
      title: "Job Title",
      description: "Job Description",
      email: "test@example.com",
      address: "Job Address",
      jobType: "Internship",
      education: "Phd",
      industry: "IT",
      experience: "2 Years",
      salary: "50000",
      positions: "5",
      company: "Test Company",
    };
    render(<UpdateJob job={job} access_token="mockAccessToken" />);
    const inputTitle = screen.getByPlaceholderText(
      "عنوان آگهی شغلی را وارد کنید"
    );
    const inputDescription = screen.getByPlaceholderText(
      "توضیحات آگهی شغلی را وارد کنید"
    );
    const inputEmail = screen.getByPlaceholderText(
      "آدرس ایمیل خود را وارد کنید"
    );
    const inputAddress = screen.getByPlaceholderText("آدرس شرکت را وارد کنید");
    const inputJobType = screen.getByTestId("jobType-select");
    const inputEducation = screen.getByTestId("education-select");
    const inputIndustry = screen.getByTestId("industry-select");
    const inputExperience = screen.getByTestId("experience-select");
    const inputSalary = screen.getByPlaceholderText(
      "میزان دستمزد را وارد کنید"
    );
    const inputPositions = screen.getByPlaceholderText(
      "تعدا موقعیت باز را وارد کنید"
    );
    const inputCompany = screen.getByPlaceholderText("نام شرکت را وارد کنید");
    const form = screen.getByRole("button", { name: "بروزرسانی آگهی" });

    // Act
    act(() => {
      fireEvent.change(inputTitle, { target: { value: "New Job Title" } });
      fireEvent.change(inputDescription, {
        target: { value: "New Job Description" },
      });
      fireEvent.change(inputEmail, { target: { value: "new@test.com" } });
      fireEvent.change(inputAddress, { target: { value: "New Job Address" } });
      fireEvent.change(inputJobType, { target: { value: "Permanent" } });
      fireEvent.change(inputEducation, {
        target: { value: "Bachelors" },
      });
      fireEvent.change(inputIndustry, { target: { value: "Business" } });
      fireEvent.change(inputExperience, { target: { value: "1 Year" } });
      fireEvent.change(inputSalary, { target: { value: "80000" } });
      fireEvent.change(inputPositions, { target: { value: "3" } });
      fireEvent.change(inputCompany, { target: { value: "New Test Company" } });
      fireEvent.submit(form);
    });

    // Assert
    expect(mockValues.updateJob).toHaveBeenCalledWith(
      job.id,
      {
        title: "New Job Title",
        description: "New Job Description",
        email: "new@test.com",
        address: "New Job Address",
        jobType: "Permanent",
        education: "Bachelors",
        industry: "Business",
        experience: "1 Year",
        salary: "80000",
        positions: "3",
        company: "New Test Company",
      },
      "mockAccessToken"
    );
  });

  test("should redirect to /employeer/jobs after successful update", () => {
    // Arrange
    const job = {
      title: "Job Title",
      description: "Job Description",
      email: "test@example.com",
      address: "Job Address",
      jobType: "Internship",
      education: "Phd",
      industry: "IT",
      experience: "2 Years",
      salary: "50000",
      positions: "5",
      company: "Test Company",
    };
    render(<UpdateJob job={job} access_token="mockAccessToken" />);

    // Act
    act(() => {
      mockValues.updated = true;
      render(<UpdateJob job={job} access_token="mockAccessToken" />);
    });

    // Assert
    expect(useRouter().push).toHaveBeenCalledWith("/employeer/jobs");
  });

  test("should display loading state while updating job ad", () => {
    // Arrange
    const job = {
      id: 1,
      title: "Job Title",
      description: "Job Description",
      email: "test@example.com",
      address: "Job Address",
      jobType: "Internship",
      education: "Phd",
      industry: "IT",
      experience: "2 Years",
      salary: "50000",
      positions: "5",
      company: "Test Company",
    };
    const { getByText } = render(
      <UpdateJob job={job} access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.loading = true;
      render(<UpdateJob job={job} access_token="mockAccessToken" />);
    });

    // Assert
    expect(getByText("در حال بروزرسانی...")).toBeInTheDocument();
  });
});
