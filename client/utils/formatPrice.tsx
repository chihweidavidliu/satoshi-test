import Dinero, { Currency } from "dinero.js";

export const formatPrice = (amount: number, currency?: Currency) => {
  return Dinero({ amount, currency: currency || "USD" }).toFormat("$0,0.00");
};
