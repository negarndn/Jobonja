import eArabic from "../utils/eArabic";

describe("eArabic", () => {
  test("should return a number in Arabic format when given a number", () => {
    // Arrange
    const number = 12345;

    // Act
    const result = eArabic(number);

    // Assert
    expect(result).toBe("١٢٬٣٤٥");
  });

  test("should return Arabic formatted string for 0", () => {
    // Arrange
    const number = 0;

    // Act
    const result = eArabic(number);

    // Assert
    expect(result).toBe("٠");
  });

  // test("should return Arabic formatted string for negative number", () => {
  //   // Arrange
  //   const number = -123;

  //   // Act
  //   const result = eArabic(number);

  //   // Assert
  //   expect(result).toBe("-١٢٣");
  // });

  test("should return Arabic formatted string for floating point number", () => {
    // Arrange
    const number = 123.45;

    // Act
    const result = eArabic(number);

    // Assert
    expect(result).toBe("١٢٣٫٤٥");
  });

  test("should return Arabic formatted string for number in the form of a string", () => {
    // Arrange
    const number = "123";

    // Act
    const result = eArabic(number);

    // Assert
    expect(result).toBe("١٢٣");
  });

  test("should return the same input string without any changes", () => {
    // Arrange
    const string = "Hello World";

    // Act
    const result = eArabic(string);

    // Assert
    expect(result).toBe(string);
  });

  test("should return the same input for null or undefined input", () => {
    // Arrange
    const nullInput = null;
    const undefinedInput = undefined;

    // Act
    const nullResult = eArabic(nullInput);
    const undefinedResult = eArabic(undefinedInput);

    // Assert
    expect(nullResult).toBe(nullInput);
    expect(undefinedResult).toBe(undefinedInput);
  });

  test("should return the same input for NaN input", () => {
    // Arrange
    const nanInput = NaN;

    // Act
    const result = eArabic(nanInput);

    // Assert
    expect(result).toBe(nanInput);
  });
});
