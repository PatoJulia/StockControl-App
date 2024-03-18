enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  ARG = "ARG",
}

namespace Currency {
  export function convert(
    amount: number,
    from: Currency,
    to: Currency
  ): number {
    const conversionRates: Record<Currency, number> = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.23,
      ARG: 1,
    };

    const convertedAmount =
      amount * (conversionRates[to] / conversionRates[from]);
    return Math.round(convertedAmount * 100) / 100; // Round to two decimal places
  }
}

export default Currency;
