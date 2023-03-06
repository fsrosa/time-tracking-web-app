const addPlusSignToPositiveStringNumber = (strNumber: string): string => {
  const number = Number(strNumber);
  if (!isNaN(number) && number >= 0) {
    return `+${strNumber}`;
  } else {
    return strNumber;
  }
}

export default addPlusSignToPositiveStringNumber