import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Filters from "../components/layout/Filters";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Filters", () => {
  beforeEach(() => {
    const replaceMock = jest.fn();
    useRouter.mockReturnValue({
      query: {},
      replace: replaceMock,
    });

    render(<Filters />);
  });

  test("should render the component without any checkbox checked", () => {
    // Arrange & Act
    // No specific action needed in this test

    // Assert
    expect(screen.getByLabelText("تمام‌وقت")).not.toBeChecked();
    expect(screen.getByLabelText("پاره‌وقت")).not.toBeChecked();
    expect(screen.getByLabelText("کارآموزی")).not.toBeChecked();
    expect(screen.getByLabelText("کارشناسی")).not.toBeChecked();
    expect(screen.getByLabelText("کارشناسی ارشد")).not.toBeChecked();
    expect(screen.getByLabelText("دکتری")).not.toBeChecked();
    expect(screen.getByLabelText("بدون محدودیت سابقه کار")).not.toBeChecked();
    expect(screen.getByLabelText("حداقل یک سال")).not.toBeChecked();
    expect(screen.getByLabelText("حداقل دو سال")).not.toBeChecked();
    expect(screen.getByLabelText("بیش از سه سال")).not.toBeChecked();
    expect(screen.getByLabelText("از یک میلیون تومان")).not.toBeChecked();
    expect(screen.getByLabelText("از سه میلیون تومان")).not.toBeChecked();
    expect(screen.getByLabelText("از پنج میلیون تومان")).not.toBeChecked();
    expect(screen.getByLabelText("از هفت میلیون تومان")).not.toBeChecked();
    expect(screen.getByLabelText("از نه میلیون تومان")).not.toBeChecked();
  });

  test("should update query parameters and call router.replace on checkbox change", () => {
    // Arrange
    const checkbox = screen.getByLabelText("پاره‌وقت");

    // Act
    fireEvent.click(checkbox);

    // Assert
    expect(checkbox.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "jobType=Temporary",
    });
  });

  test("should remove query parameter and call router.replace when unchecking a checkbox", () => {
    // Arrange
    const checkbox = screen.getByLabelText("کارآموزی");

    // Act
    fireEvent.click(checkbox);

    // Assert
    expect(checkbox.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "jobType=Internship",
    });

    // Act
    fireEvent.click(checkbox);

    // Assert
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "",
    });
  });

  test("should correctly handle checkHandler function", () => {
    // Arrange
    const fullTimeCheckbox = screen.getByLabelText("تمام‌وقت");
    const partTimeCheckbox = screen.getByLabelText("پاره‌وقت");

    // Act
    fireEvent.click(fullTimeCheckbox);

    // Assert
    expect(fullTimeCheckbox).toBeChecked();
    expect(partTimeCheckbox).not.toBeChecked();

    // Act
    fireEvent.click(partTimeCheckbox);

    // Assert
    expect(fullTimeCheckbox).not.toBeChecked();
    expect(partTimeCheckbox).toBeChecked();
  });

  test("should update query parameters and call router.replace when checking and unchecking checkboxes", () => {
    // Arrange
    const fullTimeCheckbox = screen.getByLabelText("تمام‌وقت");
    const partTimeCheckbox = screen.getByLabelText("پاره‌وقت");

    // Act
    fireEvent.click(fullTimeCheckbox);

    // Assert
    expect(fullTimeCheckbox.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "jobType=Permanent",
    });

    // Act
    fireEvent.click(partTimeCheckbox);

    // Assert
    expect(fullTimeCheckbox.checked).toBe(false);
    expect(partTimeCheckbox.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "jobType=Temporary",
    });

    // Act
    fireEvent.click(partTimeCheckbox);

    // Assert
    expect(partTimeCheckbox.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "",
    });
  });

  test("should update query parameters and call router.replace when checking two different checkboxes", () => {
    // Arrange
    const fullTimeCheckbox = screen.getByLabelText("تمام‌وقت");
    const bachelorsCheckbox = screen.getByLabelText("کارشناسی");

    // Act
    fireEvent.click(fullTimeCheckbox);
    fireEvent.click(bachelorsCheckbox);

    // Assert
    expect(fullTimeCheckbox.checked).toBe(true);
    expect(bachelorsCheckbox.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "jobType=Permanent&education=Bachelors",
    });
  });

  test("should update query parameters and call router.replace for salary checkboxes while ensuring only one option is checked", () => {
    // Arrange
    const checkbox1 = screen.getByLabelText("از یک میلیون تومان");
    const checkbox2 = screen.getByLabelText("از سه میلیون تومان");
    const checkbox3 = screen.getByLabelText("از پنج میلیون تومان");
    const checkbox4 = screen.getByLabelText("از هفت میلیون تومان");
    const checkbox5 = screen.getByLabelText("از نه میلیون تومان");

    // Act
    fireEvent.click(checkbox1);

    // Assert
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
    expect(checkbox5.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "salary=1000000",
    });

    // Act
    fireEvent.click(checkbox2);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
    expect(checkbox5.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "salary=3000000",
    });

    // Act
    fireEvent.click(checkbox3);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
    expect(checkbox4.checked).toBe(false);
    expect(checkbox5.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "salary=5000000",
    });

    // Act
    fireEvent.click(checkbox4);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(true);
    expect(checkbox5.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "salary=7000000",
    });

    // Act
    fireEvent.click(checkbox5);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
    expect(checkbox5.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "salary=9000000",
    });
  });

  test("should update query parameters and call router.replace for education checkboxes while ensuring only one option is checked", () => {
    // Arrange
    const checkbox1 = screen.getByLabelText("کارشناسی");
    const checkbox2 = screen.getByLabelText("کارشناسی ارشد");
    const checkbox3 = screen.getByLabelText("دکتری");

    // Act
    fireEvent.click(checkbox1);

    // Assert
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "education=Bachelors",
    });

    // Act
    fireEvent.click(checkbox2);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "education=Masters",
    });

    // Act
    fireEvent.click(checkbox3);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "education=Phd",
    });
  });

  test("should update query parameters and call router.replace for experience checkboxes while ensuring only one option is checked", () => {
    // Arrange
    const checkbox1 = screen.getByLabelText("بدون محدودیت سابقه کار");
    const checkbox2 = screen.getByLabelText("حداقل یک سال");
    const checkbox3 = screen.getByLabelText("حداقل دو سال");
    const checkbox4 = screen.getByLabelText("بیش از سه سال");

    // Act
    fireEvent.click(checkbox1);

    // Assert
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "experience=No+Experience",
    });

    // Act
    fireEvent.click(checkbox2);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "experience=1+Years",
    });

    // Act
    fireEvent.click(checkbox3);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
    expect(checkbox4.checked).toBe(false);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "experience=2+Years",
    });

    // Act
    fireEvent.click(checkbox4);

    // Assert
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
    expect(checkbox4.checked).toBe(true);
    expect(useRouter().replace).toHaveBeenCalledWith({
      search: "experience=3+Years+above",
    });
  });
});
