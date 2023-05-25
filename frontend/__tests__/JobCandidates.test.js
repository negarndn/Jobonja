import React from "react";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import JobCandidates from "../components/job/JobCandidates";
import AuthContext from "../context/AuthContext";

let mockValues;

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockValues}>{children}</AuthContext.Provider>
  );
};

const render = (ui, options) => {
  return rtlRender(ui, { wrapper: MockAuthProvider, ...options });
};

describe("JobCandidates component", () => {
  mockValues = {
    downloadResume: jest.fn(),
  };

  test("should render the component with no data", () => {
    // Arrange
    const candidatesApplied = [];

    // Act
    render(
      <JobCandidates
        candidatesApplied={candidatesApplied}
        access_token="test-access-token"
      />
    );

    // Assert
    expect(screen.getByText("فهرست متقاضیان")).toBeInTheDocument();
  });

  test("should render the component with correct data when there is one candidate", () => {
    // Arrange
    const candidatesApplied = [
      {
        appliedAt: "2023-04-23T15:00:40.114549Z",
        job: {
          title: "Job 1",
        },
        user: 2,
      },
    ];

    render(
      <JobCandidates
        candidatesApplied={candidatesApplied}
        access_token="test-access-token"
      />
    );

    // Act
    const h4Element = screen.getByRole("heading", { level: 4 });

    // Assert
    expect(h4Element).toBeInTheDocument();
    expect(h4Element.textContent).toBe(
      "١ متقاضی برای این آگهی درخواست داده است."
    );
    expect(screen.getByText("Job 1")).toBeInTheDocument();
    expect(screen.getByText("۲۰۲۳/۴/۲۳")).toBeInTheDocument();
    expect(screen.getByText("٢")).toBeInTheDocument();
    expect(screen.getByText("دریافت رزومه")).toBeInTheDocument();
  });

  test("should render the component with correct heading when there is more than one candidate", () => {
    // Arrange
    const candidatesApplied = [
      {
        appliedAt: "2023-04-23T15:00:40.114549Z",
        job: {
          title: "Job 1",
        },
        user: 2,
      },
      {
        appliedAt: "2023-04-23T15:00:40.114549Z",
        job: {
          title: "Job 2",
        },
        user: 3,
      },
    ];

    render(
      <JobCandidates
        candidatesApplied={candidatesApplied}
        access_token="test-access-token"
      />
    );

    // Act
    const h4Element = screen.getByRole("heading", { level: 4 });

    // Assert
    expect(h4Element).toBeInTheDocument();
    expect(h4Element.textContent).toBe(
      "٢ متقاضی برای این آگهی درخواست داده‌اند."
    );
  });

  test("should call downloadResume when resume button is clicked", () => {
    // Arrange
    const candidatesApplied = [
      {
        appliedAt: "2023-04-23T15:00:40.114549Z",
        job: {
          title: "Job 1",
        },
        user: 2,
      },
    ];

    render(
      <JobCandidates
        candidatesApplied={candidatesApplied}
        access_token="test-access-token"
      />
    );

    // Act
    fireEvent.click(screen.getByText("دریافت رزومه"));

    // Assert
    expect(mockValues.downloadResume).toHaveBeenCalledTimes(1);
    expect(mockValues.downloadResume).toHaveBeenCalledWith("test-access-token");
  });
});
