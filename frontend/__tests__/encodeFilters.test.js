import encodeFilters from "../utils/encodeFilters";

describe("encodeFilters", () => {
  it("should return the correct encoded filter for a given filter", () => {
    expect(encodeFilters("Bachelors")).toEqual("کارشناسی");
    expect(encodeFilters("Masters")).toEqual("کارشناسی ارشد");
    expect(encodeFilters("Phd")).toEqual("دکتری");
    expect(encodeFilters("Permanent")).toEqual("تمام‌وقت");
    expect(encodeFilters("Temporary")).toEqual("پاره‌وقت");
    expect(encodeFilters("Internship")).toEqual("کارآموزی");
    expect(encodeFilters("No Experience")).toEqual("بدون محدودیت سابقه کار");
    expect(encodeFilters("1 Year")).toEqual("حداقل یک سال");
    expect(encodeFilters("2 Years")).toEqual("حداقل دو سال");
    expect(encodeFilters("3 Years Above")).toEqual("بیش از سه سال");
    expect(encodeFilters("Business")).toEqual("فروش و بازایابی");
    expect(encodeFilters("IT")).toEqual("وب، برنامه‌نویسی و نرم‌افزار");
    expect(encodeFilters("Banking")).toEqual("مالی و حسابداری");
    expect(encodeFilters("Education")).toEqual("کارشناسی");
    expect(encodeFilters("Telecommunication")).toEqual("روابط عمومی");
    expect(encodeFilters("Others")).toEqual("متفرقه");
  });

  it("should return an empty string for an invalid filter", () => {
    expect(encodeFilters("Invalid Filter")).toEqual("");
  });
});
