function reduceYears(date, years) {
  return date.setFullYear(date.getFullYear() - years);
}

export default reduceYears;
