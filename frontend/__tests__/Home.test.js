import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";
import router from "next/router";

jest.mock("../components/Search", () => {
  return () => <div data-testid="search-component" />;
});

jest.mock("../components/layout/Filters", () => {
  return () => <div data-testid="filters-component" />;
});

jest.mock("../components/job/JobItem", () => {
  return ({ job }) => (
    <div data-testid="job-item">
      <h4>{job.title}</h4>
      <p>{job.company}</p>
    </div>
  );
});

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      page: "1",
      keyword: "test",
    },
    push: jest.fn(),
  }),
}));

describe("Home component", () => {
  it("should render the component", () => {
    // Arrange
    const data = {
      jobs: [],
      count: 0,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);

    // Assert
    expect(screen.getByText("آخرین آگهی‌ها")).toBeInTheDocument();
    expect(screen.getByTestId("search-component")).toBeInTheDocument();
  });

  it("should render the job items", () => {
    // Arrange
    const data = {
      jobs: [
        { id: 1, title: "Job 1", company: "Company 1" },
        { id: 2, title: "Job 2", company: "Company 2" },
      ],
      count: 2,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);

    // Assert
    expect(screen.getByText("Job 1")).toBeInTheDocument();
    expect(screen.getByText("Company 1")).toBeInTheDocument();
    expect(screen.getByText("Job 2")).toBeInTheDocument();
    expect(screen.getByText("Company 2")).toBeInTheDocument();
  });

  it("Should render pagination when the number of results is more than `resPerPage`", () => {
    // Arrange
    const data = {
      jobs: [],
      count: 20,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);
    const pagination = screen.getByText("بعدی");

    // Assert
    expect(pagination).toBeInTheDocument();
  });

  it("should navigate to the next page when clicking on the pagination", () => {
    // Arrange
    const data = {
      jobs: [],
      count: 20,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);
    const nextPageButton = screen.getByText("بعدی");
    fireEvent.click(nextPageButton);

    // Assert
    expect(router.useRouter().push).toHaveBeenCalledWith({
      search: "page=2",
    });
  });

  it("should render NoResults component when no jobs found", () => {
    // Arrange
    const data = {
      jobs: [],
      count: 0,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);
    const noResultsImage = screen.getByAltText("no_results_found");
    const noResultsMessage = screen.getByText(
      "متاسفانه‌ برای فیلتر‌های اعمال شده نتیجه‌ای یافت نشد."
    );

    // Assert
    expect(noResultsImage).toBeInTheDocument();
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("should render the Filters component", () => {
    // Arrange
    const data = {
      jobs: [],
      count: 0,
      resPerPage: 10,
    };

    // Act
    render(<Home data={data} />);

    // Assert
    expect(screen.getByTestId("filters-component")).toBeInTheDocument();
  });
});
