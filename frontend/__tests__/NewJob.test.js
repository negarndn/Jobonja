import React from "react";
import {
  render as rtlRender,
  fireEvent,
  act,
  screen,
} from "@testing-library/react";
import { toast } from "react-toastify";
import JobContext from "../context/JobContext";
import NewJob from "../components/job/NewJob";
import router from "next/router";

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

let mockValues;

const MockJobProvider = ({ children }) => {
  return (
    <JobContext.Provider value={mockValues}>{children}</JobContext.Provider>
  );
};

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: MockJobProvider, ...options });
};

// Re-export everything
export * from "@testing-library/react";

// Override the render method
export { render };

describe("NewJob component", () => {
  beforeEach(() => {
    mockValues = {
      loading: false,
      error: null,
      created: null,
      updated: null,
      deleted: null,
      applied: false,
      newJob: jest.fn(),
      updateJob: jest.fn(),
      deleteJob: jest.fn(),
      applyToJob: jest.fn(),
      setUpdated: jest.fn(),
      checkJobApplied: jest.fn(),
      setCreated: jest.fn(),
      setDeleted: jest.fn(),
      clearErrors: jest.fn(),
    };
  });

  it("should render without errors", () => {
    render(<NewJob access_token="mockAccessToken" />);
  });

  test("should display an error toast if there is an error", () => {
    // Arrange
    const error = "An error occurred.";
    render(<NewJob access_token="mockAccessToken" />);
    jest.spyOn(toast, "error");

    // Act
    act(() => {
      mockValues.error = error;
      render(<NewJob access_token="mockAccessToken" />);
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should submit the form with the correct data", () => {
    // Arrange
    const data = {
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
    render(<NewJob access_token="mockAccessToken" />);
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
    const inputJobType = screen.getByTestId("jobType-select"); // Get jobType select element by test ID
    const inputEducation = screen.getByTestId("education-select"); // Get education select element by test ID
    const inputIndustry = screen.getByTestId("industry-select"); // Get industry select element by test ID
    const inputExperience = screen.getByTestId("experience-select"); // Get experience select element by test ID
    const inputSalary = screen.getByPlaceholderText(
      "میزان دستمزد را وارد کنید"
    );
    const inputPositions = screen.getByPlaceholderText(
      "تعدا موقعیت باز را وارد کنید"
    );
    const inputCompany = screen.getByPlaceholderText("نام شرکت را وارد کنید");
    const form = screen.getByText("ثبت آگهی");

    // Act
    act(() => {
      fireEvent.change(inputTitle, { target: { value: data.title } });
      fireEvent.change(inputDescription, {
        target: { value: data.description },
      });
      fireEvent.change(inputEmail, { target: { value: data.email } });
      fireEvent.change(inputAddress, { target: { value: data.address } });
      fireEvent.change(inputJobType, { target: { value: data.jobType } }); // Select jobType option
      fireEvent.change(inputEducation, { target: { value: data.education } }); // Select education option
      fireEvent.change(inputIndustry, { target: { value: data.industry } }); // Select industry option
      fireEvent.change(inputExperience, { target: { value: data.experience } }); // Select experience option
      fireEvent.change(inputSalary, { target: { value: data.salary } });
      fireEvent.change(inputPositions, { target: { value: data.positions } });
      fireEvent.change(inputCompany, { target: { value: data.company } });
      fireEvent.submit(form);
    });

    // Assert
    expect(mockValues.newJob).toHaveBeenCalledWith(data, "mockAccessToken");
  });

  test("should redirect to /employeer/jobs after successful creation", () => {
    // Arrange
    render(<NewJob access_token="mockAccessToken" />);

    // Act
    act(() => {
      mockValues.created = true;
      render(<NewJob access_token="mockAccessToken" />);
    });

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith("/employeer/jobs");
  });
});
