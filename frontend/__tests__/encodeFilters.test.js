import encodeFilters from "../utils/encodeFilters";

describe("encodeFilters function", () => {
  test("should encode 'Bachelors' filter correctly", () => {
    const result = encodeFilters("Bachelors");
    expect(result).toEqual("کارشناسی");
  });

  test("should encode 'Masters' filter correctly", () => {
    const result = encodeFilters("Masters");
    expect(result).toEqual("کارشناسی ارشد");
  });

  test("should encode 'Phd' filter correctly", () => {
    const result = encodeFilters("Phd");
    expect(result).toEqual("دکتری");
  });

  test("should encode 'Permanent' filter correctly", () => {
    const result = encodeFilters("Permanent");
    expect(result).toEqual("تمام‌وقت");
  });

  test("should encode 'Temporary' filter correctly", () => {
    const result = encodeFilters("Temporary");
    expect(result).toEqual("پاره‌وقت");
  });

  test("should encode 'Internship' filter correctly", () => {
    const result = encodeFilters("Internship");
    expect(result).toEqual("کارآموزی");
  });

  test("should encode 'No Experience' filter correctly", () => {
    const result = encodeFilters("No Experience");
    expect(result).toEqual("بدون محدودیت سابقه کار");
  });

  test("should encode '1 Year' filter correctly", () => {
    const result = encodeFilters("1 Year");
    expect(result).toEqual("حداقل یک سال");
  });

  test("should encode '2 Years' filter correctly", () => {
    const result = encodeFilters("2 Years");
    expect(result).toEqual("حداقل دو سال");
  });

  test("should encode '3 Years Above' filter correctly", () => {
    const result = encodeFilters("3 Years Above");
    expect(result).toEqual("بیش از سه سال");
  });

  test("should encode 'Business' filter correctly", () => {
    const result = encodeFilters("Business");
    expect(result).toEqual("فروش و بازایابی");
  });

  test("should encode 'IT' filter correctly", () => {
    const result = encodeFilters("IT");
    expect(result).toEqual("وب، برنامه‌نویسی و نرم‌افزار");
  });

  test("should encode 'Banking' filter correctly", () => {
    const result = encodeFilters("Banking");
    expect(result).toEqual("مالی و حسابداری");
  });

  test("should encode 'Education' filter correctly", () => {
    const result = encodeFilters("Education");
    expect(result).toEqual("کارشناسی");
  });

  test("should encode 'Telecommunication' filter correctly", () => {
    const result = encodeFilters("Telecommunication");
    expect(result).toEqual("روابط عمومی");
  });

  test("should encode 'Others' filter correctly", () => {
    const result = encodeFilters("Others");
    expect(result).toEqual("متفرقه");
  });

  test("should return empty string when given an unknown filter", () => {
    const result = encodeFilters("Unknown");
    expect(result).toEqual("");
  });
});
