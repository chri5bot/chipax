import reduceYears from './reduceYears';

function validateBirthdate(date) {
  if (!date) return false;

  const ninetyYearsAgo = reduceYears(new Date(), 90);
  const eighteenYearsAgo = reduceYears(new Date(), 18);

  let parsedDate;

  if (!isNaN(parseFloat(date)) && isFinite(date)) {
    parsedDate = date;
  } else {
    parsedDate = Date.parse(date);
  }

  if (parsedDate >= ninetyYearsAgo && parsedDate < eighteenYearsAgo) {
    return true;
  }

  return false;
}

export default validateBirthdate;
