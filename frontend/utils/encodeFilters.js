function encodeFilters(filter) {
  switch (filter) {
    case "Bachelors":
      return "کارشناسی";
    case "Masters":
      return "کارشناسی ارشد";
    case "Phd":
      return "دکتری";
    case "Permanent":
      return "تمام‌وقت";
    case "Temporary":
      return "پاره‌وقت";
    case "Internship":
      return "کارآموزی";
    case "No Experience":
      return "بدون محدودیت سابقه کار";
    case "1 Year":
      return "حداقل یک سال";
    case "2 Years":
      return "حداقل دو سال";
    case "3 Years Above":
      return "بیش از سه سال";
    case "Business":
      return "فروش و بازایابی";
    case "IT":
      return "وب، برنامه‌نویسی و نرم‌افزار";
    case "Banking":
      return "مالی و حسابداری";
    case "Education":
      return "کارشناسی";
    case "Telecommunication":
      return "روابط عمومی";
    case "Others":
      return "متفرقه";
    default:
      return "";
  }
}

export default encodeFilters;
