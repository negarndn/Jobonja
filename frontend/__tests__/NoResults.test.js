import React from "react";
import { render } from "@testing-library/react";

import NoResults from "../components/NoResults";

describe("NoResults component", () => {
  it("should render NoResults component", () => {
    // Arrange & Act
    const { getByAltText, getByText } = render(<NoResults />);
    const image = getByAltText("no_results_found");
    const message = getByText(
      "متاسفانه‌ برای فیلتر‌های اعمال شده نتیجه‌ای یافت نشد."
    );

    // Assert
    expect(image).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should render correct image source", () => {
    // Arrange & Act
    const { getByAltText } = render(<NoResults />);
    const image = getByAltText("no_results_found");

    // Assert
    expect(image.src).toContain("/images/no-results.svg");
  });
});
