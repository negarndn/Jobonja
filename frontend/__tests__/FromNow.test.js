import FromNow from "../utils/FromNow";

describe("FromNow", () => {
  it("returns the correct result for elapsed time less than a minute", () => {
    // Arrange
    const createdAt = new Date().getTime() - 30 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("٣٠ ثانیه پیش");
  });

  it("returns the correct result for elapsed time less than an hour", () => {
    // Arrange
    const createdAt = new Date().getTime() - 45 * 60 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("٤٥ دقیقه پیش");
  });

  it("returns the correct result for elapsed time less than a day", () => {
    // Arrange
    const createdAt = new Date().getTime() - 12 * 60 * 60 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("١٢ ساعت پیش");
  });

  it("returns the correct result for elapsed time less than a month", () => {
    // Arrange
    const createdAt = new Date().getTime() - 15 * 24 * 60 * 60 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("١٥ روز پیش");
  });

  it("returns the correct result for elapsed time less than a year", () => {
    // Arrange
    const createdAt = new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("٦ ماه پیش");
  });

  it("returns the correct result for elapsed time more than a year", () => {
    // Arrange
    const createdAt = new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000;

    // Act
    const result = FromNow(createdAt);

    // Assert
    expect(result).toEqual("٢ سال پیش");
  });

  it("throws an error for invalid input", () => {
    // Arrange
    const createdAt = "invalid input";

    // Act and Assert
    expect(() => FromNow(createdAt)).toThrowError("Invalid Date");
  });
});
