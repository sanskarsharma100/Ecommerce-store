export const convertToINR = (number: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  })
    .format(number)
    .slice(0, -3);
};
