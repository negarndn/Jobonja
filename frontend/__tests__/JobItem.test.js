import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import JobItem from "../components/job/JobItem";

describe("JobItem", () => {
  const job = {
    id: 1,
    company: "Example Company",
    title: "Example Job",
    description: "This is an example job description",
    industry: "Banking",
    jobType: "Internship",
    salary: 50000,
    createAt: moment().subtract(1, "day"),
  };

  it("should render job item with correct data", () => {
    // Arrange & Act
    const { getByText } = render(<JobItem job={job} />);

    // Assert
    expect(getByText("Example Company")).toBeInTheDocument();
    expect(getByText("Example Job")).toBeInTheDocument();
    expect(
      getByText("This is an example job description...")
    ).toBeInTheDocument();
    expect(getByText("مالی و حسابداری")).toBeInTheDocument();
    expect(getByText("کارآموزی")).toBeInTheDocument();
    expect(getByText("٥٠٬٠٠٠")).toBeInTheDocument();
    expect(getByText("١ روز پیش")).toBeInTheDocument();
  });

  it("should truncate job description if longer than 200 characters", () => {
    // Arrange & Act
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus sapien non odio tristique, eget laoreet sapien tincidunt. Phasellus a tristique justo. Nullam consectetur tristique est, eu porttitor neque varius non. Suspendisse sollicitudin libero eu arcu pharetra, nec egestas lorem lacinia. Sed semper massa ac risus vehicula interdum. In eu odio metus. Fusce vel enim mollis, pharetra erat et, convallis urna.";
    const jobWithLongDescription = { ...job, description: longDescription };

    const { getByText } = render(<JobItem job={jobWithLongDescription} />);

    // Assert
    expect(
      getByText(`${longDescription.substring(0, 200)}...`)
    ).toBeInTheDocument();
  });
});
