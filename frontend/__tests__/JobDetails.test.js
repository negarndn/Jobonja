import React from "react";
import {
  render as rtlRender,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import moment from "moment";
import "moment/locale/fa";
import { toast } from "react-toastify";
import JobDetails from "../components/job/JobDetails";
import JobContext from "../context/JobContext";

let mockValues;

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

describe("JobDetails", () => {
  beforeEach(() => {
    mockValues = {
      applyToJob: jest.fn(),
      checkJobApplied: jest.fn(),
      applied: false,
      clearErrors: jest.fn(),
      error: null,
      loading: false,
    };
  });

  const job = {
    id: 1,
    title: "Job Title",
    company: "Company Name",
    address: "Job Address",
    lastDate: moment().subtract(-1, "day").toISOString(),
    description: "Job Description",
    jobType: "Permanent",
    industry: "IT",
    salary: 5000,
    education: "Bachelors",
    experience: "2 Years",
    email: "test@example.com",
    createAt: "2023-05-25",
  };

  test("should render job details correctly", () => {
    // Act
    const { getByText, queryByTestId } = render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );
    const warningMessage = queryByTestId("warning-message");

    // Assert
    expect(getByText("Job Title")).toBeInTheDocument();
    expect(getByText("Job Address")).toBeInTheDocument();
    expect(getByText("Job Description")).toBeInTheDocument();
    expect(getByText("تمام‌وقت")).toBeInTheDocument();
    expect(getByText("وب، برنامه‌نویسی و نرم‌افزار")).toBeInTheDocument();
    expect(getByText("٥٬٠٠٠ تومان")).toBeInTheDocument();
    expect(getByText("کارشناسی")).toBeInTheDocument();
    expect(getByText("حداقل دو سال")).toBeInTheDocument();
    expect(getByText("test@example.com")).toBeInTheDocument();
    expect(
      getByText(moment().subtract(-1, "day").locale("fa").format("YYYY/M/D"))
    ).toBeInTheDocument();
    expect(warningMessage).toBeNull();
  });

  test("should disable apply button when job is already applied", () => {
    // Arrange
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.applied = true;
      render(
        <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
      );
    });

    const applyButton = screen.getByText("درخواست داده شده");

    // Assert
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toBeDisabled();
  });

  test("should call applyToJob when apply button is clicked", () => {
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    const applyButton = screen.getByText("ارسال رزومه");
    fireEvent.click(applyButton);

    expect(mockValues.applyToJob).toHaveBeenCalledTimes(1);
    expect(mockValues.applyToJob).toHaveBeenCalledWith(1, "mockAccessToken");
  });

  test("should display correct candidate text based on the number of candidates", () => {
    // Act
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    // Assert
    expect(
      screen.getByText("تا کنون درخواستی برای این آگهی ثبت نشده است.")
    ).toBeInTheDocument();

    // Act
    render(
      <JobDetails job={job} candidates={1} access_token="mockAccessToken" />
    );

    // Assert
    expect(
      screen.getByText("نفر برای این آگهی درخواست داده است.")
    ).toBeInTheDocument();

    // Act
    render(
      <JobDetails job={job} candidates={5} access_token="mockAccessToken" />
    );

    // Assert
    expect(
      screen.getByText("نفر برای این آگهی درخواست داده‌اند.")
    ).toBeInTheDocument();
  });

  test("should display an error toast if there is an error", () => {
    // Arrange
    const error = "An error occurred.";
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.error = error;
      render(
        <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
      );
    });

    // Assert
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  test("should display warning message when last date has passed", () => {
    // Arrange
    job.lastDate = moment().subtract(1, "day").toISOString();

    // Act
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    const warningMessage = screen.getByTestId("warning-message");

    // Assert
    expect(warningMessage).toBeInTheDocument();
  });

  test("should display loading state", () => {
    // Arrange
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.loading = true;
      render(
        <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
      );
    });

    const loadingMessage = screen.getByText("در حال بارگذاری...");

    // Assert
    expect(loadingMessage).toBeInTheDocument();
  });

  test("should display 'ارسال رزومه' button when not applied", () => {
    // Arrange
    job.lastDate = moment().subtract(-1, "day").toISOString();

    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    // Act
    act(() => {
      mockValues.applied = false;
      render(
        <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
      );
    });

    const applyButton = screen.getAllByText("ارسال رزومه");

    // Assert
    expect(applyButton[0]).toBeInTheDocument();
    expect(applyButton[0]).not.toBeDisabled();
  });

  test("should call checkJobApplied when component is rendered", () => {
    // Act
    render(
      <JobDetails job={job} candidates={0} access_token="mockAccessToken" />
    );

    expect(mockValues.checkJobApplied).toHaveBeenCalledTimes(1);
    expect(mockValues.checkJobApplied).toHaveBeenCalledWith(
      job.id,
      "mockAccessToken"
    );
  });
});
