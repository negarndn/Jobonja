import encodeFilters from "../utils/encodeFilters";

describe("encodeFilters function", () => {
  test("should encode 'Bachelors' filter correctly", () => {
    // Arrange
    const filter = "Bachelors";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("کارشناسی");
  });

  test("should encode 'Masters' filter correctly", () => {
    // Arrange
    const filter = "Masters";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("کارشناسی ارشد");
  });

  test("should encode 'Phd' filter correctly", () => {
    // Arrange
    const filter = "Phd";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("دکتری");
  });

  test("should encode 'Permanent' filter correctly", () => {
    // Arrange
    const filter = "Permanent";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("تمام‌وقت");
  });

  test("should encode 'Temporary' filter correctly", () => {
    // Arrange
    const filter = "Temporary";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("پاره‌وقت");
  });

  test("should encode 'Internship' filter correctly", () => {
    // Arrange
    const filter = "Internship";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("کارآموزی");
  });

  test("should encode 'No Experience' filter correctly", () => {
    // Arrange
    const filter = "No Experience";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("بدون محدودیت سابقه کار");
  });

  test("should encode '1 Year' filter correctly", () => {
    // Arrange
    const filter = "1 Year";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("حداقل یک سال");
  });

  test("should encode '2 Years' filter correctly", () => {
    // Arrange
    const filter = "2 Years";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("حداقل دو سال");
  });

  test("should encode '3 Years Above' filter correctly", () => {
    // Arrange
    const filter = "3 Years Above";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("بیش از سه سال");
  });

  test("should encode 'Business' filter correctly", () => {
    // Arrange
    const filter = "Business";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("فروش و بازاریابی");
  });

  test("should encode 'IT' filter correctly", () => {
    // Arrange
    const filter = "IT";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("وب، برنامه‌نویسی و نرم‌افزار");
  });

  test("should encode 'Banking' filter correctly", () => {
    // Arrange
    const filter = "Banking";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("مالی و حسابداری");
  });

  test("should encode 'Education' filter correctly", () => {
    // Arrange
    const filter = "Education";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("آموزش");
  });

  test("should encode 'Telecommunication' filter correctly", () => {
    // Arrange
    const filter = "Telecommunication";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("روابط عمومی");
  });

  test("should encode 'Others' filter correctly", () => {
    // Arrange
    const filter = "Others";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("متفرقه");
  });

  test("should return empty string when given an unknown filter", () => {
    // Arrange
    const filter = "Unknown";

    // Act
    const result = encodeFilters(filter);

    // Assert
    expect(result).toEqual("");
  });
});
