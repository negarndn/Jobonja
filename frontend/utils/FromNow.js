import eArabic from "./eArabic";

const FromNow = (createdAt) => {
  // Check if the input is a valid date string
  const isInvalidDateString = isNaN(Date.parse(createdAt));

  if (!(typeof createdAt == "number") && isInvalidDateString) {
    throw new Error("Invalid Date");
  }
  const elapsed = new Date().valueOf() - new Date(createdAt);

  const SECOND = 1000;
  const MINUTE = 1000 * 60;
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const MONTH = 1000 * 60 * 60 * 24 * 30;
  const YEAR = 1000 * 60 * 60 * 24 * 30 * 12;

  if (elapsed <= MINUTE)
    return `${eArabic(Math.round(elapsed / SECOND))} ثانیه پیش`;
  if (elapsed <= HOUR)
    return `${eArabic(Math.round(elapsed / MINUTE))} دقیقه پیش`;
  if (elapsed <= DAY) return `${eArabic(Math.round(elapsed / HOUR))} ساعت پیش`;
  if (elapsed <= MONTH) return `${eArabic(Math.round(elapsed / DAY))} روز پیش`;
  if (elapsed <= YEAR) return `${eArabic(Math.round(elapsed / MONTH))} ماه پیش`;
  return `${eArabic(Math.round(elapsed / YEAR))} سال پیش`;
};

export default FromNow;
