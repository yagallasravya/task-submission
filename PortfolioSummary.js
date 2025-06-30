function getPortfolioBreakdown(portfolio) {
  // empty or invalid input
  if (!portfolio || !Array.isArray(portfolio) || portfolio.length === 0) {
    return {
      total: 0,
      breakdown: [],
    };
  }
  // Calculate total portfolio value
  const total = portfolio.reduce((sum, asset) => {
    const value =
      typeof asset.value === "number" && asset.value >= 0 ? asset.value : 0;
    return sum + value;
  }, 0);

  // Handle edge case: total is zero
  if (total === 0) {
    return {
      total: 0,
      breakdown: portfolio.map((asset) => ({
        asset: asset.asset || "Unknown",
        percent: 0,
      })),
    };
  }

  // Calculate percentage breakdown
  const breakdown = portfolio.map((asset) => {
    const value =
      typeof asset.value === "number" && asset.value >= 0 ? asset.value : 0;
    const percent = Math.round((value / total) * 100);

    return {
      asset: asset.asset || "Unknown",
      percent: percent,
    };
  });
  return {
    total: total,
    breakdown: breakdown,
  };
}

// static data:
const portfolio = [
  { asset: "Stocks", value: 50000 },
  { asset: "Bonds", value: 30000 },
  { asset: "Cash", value: 20000 },
];

console.log(getPortfolioBreakdown([])); // Edge case: empty array
console.log(getPortfolioBreakdown('')); // Edge case: empty string
console.log(getPortfolioBreakdown(null)); // Edge case: null input
console.log(getPortfolioBreakdown(portfolio));
console.log(getPortfolioBreakdown([{ asset: "Stocks", value: -1000 }])); // Edge case: negative value
