import React, { useContext, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import { screen, fireEvent, render, act } from "@testing-library/react";

import JobContext, { JobProvider } from "../context/JobContext";

jest.mock("axios");

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("JobProvider", () => {
  describe("newJob method", () => {
    test("should set created to true when creating a new job is successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { newJob, created, error } = useContext(JobContext);

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
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="created">
              {created ? created.toString() : "null"}
            </div>
            <div data-testid="error">{error}</div>
            <button
              data-testid="newJob"
              onClick={() => newJob(data, accessToken)}
            ></button>
          </>
        );
      };

      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { success: true },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const newJobButton = getByTestId("newJob");
      const createdElement = getByTestId("created");
      const errorElement = getByTestId("error");

      // Assert
      expect(createdElement.textContent).toBe("null");

      // Act
      await act(async () => {
        fireEvent.click(newJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/new/`,
        {
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
        },
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(createdElement.textContent).toBe("true");
      expect(errorElement.textContent).toBe("");
    });

    test("should handle job creation errors and set the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { newJob, error } = useContext(JobContext);

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
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="newJob"
              onClick={() => newJob(data, accessToken)}
            ></button>
          </>
        );
      };

      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Job Creation failed",
          },
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const newJobButton = getByTestId("newJob");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(newJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/new/`,
        {
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
        },
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Job Creation failed");
    });
  });

  describe("updateJob method", () => {
    test("should update job and set updated state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { updateJob, updated, error } = useContext(JobContext);

        const jobId = 1;
        const data = {
          title: "Updated Job Title",
          description: "Updated Job Description",
          email: "updated@test.com",
          address: "Updated Job Address",
          jobType: "Permanent",
          education: "Bachelors",
          industry: "Business",
          experience: "1 Year",
          salary: "80000",
          positions: "3",
          company: "Updated Test Company",
        };
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="updated">
              {updated ? updated.toString() : "null"}
            </div>
            <div data-testid="error">{error}</div>
            <button
              data-testid="updateJob"
              onClick={() => updateJob(jobId, data, accessToken)}
            ></button>
          </>
        );
      };

      axios.put.mockResolvedValueOnce({
        status: 200,
        data: {
          jobId: 1,
          title: "Updated Job Title",
          description: "Updated Job Description",
          email: "updated@test.com",
          address: "Updated Job Address",
          jobType: "Permanent",
          education: "Bachelors",
          industry: "Business",
          experience: "1 Year",
          salary: "80000",
          positions: "3",
          company: "Updated Test Company",
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const updateJobButton = getByTestId("updateJob");
      const updatedElement = getByTestId("updated");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(updateJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/update/`,
        {
          title: "Updated Job Title",
          description: "Updated Job Description",
          email: "updated@test.com",
          address: "Updated Job Address",
          jobType: "Permanent",
          education: "Bachelors",
          industry: "Business",
          experience: "1 Year",
          salary: "80000",
          positions: "3",
          company: "Updated Test Company",
        },
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(updatedElement.textContent).toBe("true");
      expect(errorElement.textContent).toBe("");
    });

    test("should handle update errors and set the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { updateJob, error } = useContext(JobContext);

        const jobId = 1;
        const data = {
          title: "Updated Job Title",
          description: "Updated Job Description",
          email: "updated@test.com",
          address: "Updated Job Address",
          jobType: "Permanent",
          education: "Bachelors",
          industry: "Business",
          experience: "1 Year",
          salary: "80000",
          positions: "3",
          company: "Updated Test Company",
        };
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="updateJob"
              onClick={() => updateJob(jobId, data, accessToken)}
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
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const updateJobButton = getByTestId("updateJob");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(updateJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/update/`,
        {
          title: "Updated Job Title",
          description: "Updated Job Description",
          email: "updated@test.com",
          address: "Updated Job Address",
          jobType: "Permanent",
          education: "Bachelors",
          industry: "Business",
          experience: "1 Year",
          salary: "80000",
          positions: "3",
          company: "Updated Test Company",
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

  describe("deleteJob method", () => {
    test("should delete job and set deleted state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { deleteJob, deleted, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="deleted">
              {deleted ? deleted.toString() : "null"}
            </div>
            <div data-testid="error">{error}</div>
            <button
              data-testid="deleteJob"
              onClick={() => deleteJob(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.delete.mockResolvedValueOnce({
        status: 200,
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const deleteJobButton = getByTestId("deleteJob");
      const deletedElement = getByTestId("deleted");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(deleteJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/delete/`,
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(deletedElement.textContent).toBe("true");
      expect(errorElement.textContent).toBe("");
    });

    test("should handle delete errors and set the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { deleteJob, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="deleteJob"
              onClick={() => deleteJob(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.delete.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Delete failed",
          },
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const deleteJobButton = getByTestId("deleteJob");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(deleteJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/delete/`,
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Delete failed");
    });
  });

  describe("applyToJob method", () => {
    test("should apply to job and set applied state when successful", async () => {
      // Arrange
      const TestComponent = () => {
        const { applyToJob, applied, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="applied">{applied.toString()}</div>
            <div data-testid="error">{error ? error : ""}</div>
            <button
              data-testid="applyToJob"
              onClick={() => applyToJob(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.post.mockResolvedValueOnce({
        status: 200,
        data: {
          applied: true,
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const applyToJobButton = getByTestId("applyToJob");
      const appliedElement = getByTestId("applied");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(applyToJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(appliedElement.textContent).toBe("true");
      expect(errorElement.textContent).toBe("");
    });

    test("should handle apply errors and set the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { applyToJob, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="applyToJob"
              onClick={() => applyToJob(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Apply failed",
          },
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const applyToJobButton = getByTestId("applyToJob");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(applyToJobButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Apply failed");
    });
  });

  describe("checkJobApplied method", () => {
    test("should set applied state based on job application check result", async () => {
      // Arrange
      const TestComponent = () => {
        const { checkJobApplied, applied, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="applied">{applied.toString()}</div>
            <div data-testid="error">{error}</div>
            <button
              data-testid="checkJobApplied"
              onClick={() => checkJobApplied(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.get.mockResolvedValueOnce({
        status: 200,
        data: true,
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const checkJobAppliedButton = getByTestId("checkJobApplied");
      const appliedElement = getByTestId("applied");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(checkJobAppliedButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/check/`,
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(appliedElement.textContent).toBe("true");
      expect(errorElement.textContent).toBe("");
    });

    test("should handle check errors and set the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { checkJobApplied, error } = useContext(JobContext);

        const jobId = 1;
        const accessToken = "mockAccessToken";

        return (
          <>
            <div data-testid="error">{error}</div>
            <button
              data-testid="checkJobApplied"
              onClick={() => checkJobApplied(jobId, accessToken)}
            ></button>
          </>
        );
      };

      axios.get.mockRejectedValueOnce({
        response: {
          data: {
            detail: "Check failed",
          },
        },
      });

      const { getByTestId } = render(
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const checkJobAppliedButton = getByTestId("checkJobApplied");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(checkJobAppliedButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_URL}/api/jobs/1/check/`,
        {
          headers: {
            Authorization: `Bearer mockAccessToken`,
          },
        }
      );
      expect(errorElement.textContent).toBe("Check failed");
    });
  });

  describe("clearErrors method", () => {
    test("should clear the error state", async () => {
      // Arrange
      const TestComponent = () => {
        const { error, setError, clearErrors } = useContext(JobContext);

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
        <JobProvider>
          <TestComponent />
        </JobProvider>
      );

      const clearErrorsButton = getByTestId("clearErrors");
      const errorElement = getByTestId("error");

      // Act
      await act(async () => {
        fireEvent.click(clearErrorsButton);
        await Promise.resolve(); // Wait for state updates to be processed
      });

      // Assert
      expect(errorElement.textContent).toBe("");
    });
  });
});
