function eArabic(x) {
  return !isNaN(Number(x)) && (x || x == 0)
    ? Number(x).toLocaleString("ar-EG")
    : x;
}

export default eArabic;
