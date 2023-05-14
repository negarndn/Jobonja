import eArabic from "../utils/eArabic";

describe("eArabic", () => {
  test("should return a number in Arabic format", () => {
    // Arrange
    const number = 12345;

    // Act
    const result = eArabic(number);

    // Assert
    expect(result).toBe("١٢٬٣٤٥");
  });

  test("should return Arabic formatted string for 0", () => {
    expect(eArabic(0)).toBe("٠");
  });

  // test("should return Arabic formatted string for negative number", () => {
  //   expect(eArabic(-123)).toBe("-١٢٣");
  // });

  test("should return Arabic formatted string for floating point number", () => {
    expect(eArabic(123.45)).toBe("١٢٣٫٤٥");
  });

  test("should return Arabic formatted string for number in form of string", () => {
    expect(eArabic("123")).toBe("١٢٣");
  });

  test("should return a string without any changes", () => {
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
