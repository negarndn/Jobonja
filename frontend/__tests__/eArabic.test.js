import eArabic from "../utils/eArabic";

describe("eArabic", () => {
  it("should return the Arabic locale string for a given number", () => {
    expect(eArabic(123)).toEqual("١٢٣");
    expect(eArabic(123456.789)).toEqual("١٢٣٬٤٥٦٫٧٨٩");
    expect(eArabic(0)).toEqual("٠");
    // expect(eArabic(-9)).toEqual("-٩");
  });

  it("should return the Arabic locale string for a given number even if it is in string format", () => {
    expect(eArabic("123")).toEqual("١٢٣");
  });

  it("should return the original input if it is null, undefined, or string", () => {
    expect(eArabic("Some invalid input")).toBe("Some invalid input");
    expect(eArabic(null)).toBe(null);
    expect(eArabic(NaN)).toBe(NaN);
    expect(eArabic(undefined)).toBe(undefined);
  });
});
