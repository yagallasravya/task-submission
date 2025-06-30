import React from "react";

const BalanceWidget = ({ accounts, warningThreshold = 1000 }) => {
  // Calculate total balance and number of accounts with error and null handling
  const totalBalance = Array.isArray(accounts)
    ? accounts.reduce((sum, account) => sum + (account?.balance || 0), 0)
    : 0;
  const totalAccounts = accounts.length;

  // Format balance as currency
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalBalance);

  // Check if balance is below threshold
  const isLowBalance = totalBalance < warningThreshold;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <h3>Account Summary</h3>
      <p>
        <strong>Accounts:</strong> {totalAccounts}
      </p>
      <p>
        <strong>Total Balance:</strong> {formattedBalance}
      </p>
      {isLowBalance && (
        <p style={{ color: "red" }}>
          Warning: Total balance is below ${warningThreshold.toLocaleString()}
        </p>
      )}
    </div>
  );
};

// Example usage:
const AccountBalance = () => {
  const accounts = [
    { name: "Chequing", balance: 1250.5 },
    { name: "Savings", balance: 8900.75 },
    { name: "Investment A", balance: 5000.0 },
  ];
  const lowBalanceAccounts = [
    { name: "Petty Cash", balance: 50.0 },
    { name: "Emergency Fund", balance: 900.0 },
  ];
  const emptyAccounts = [];

  return (
    <div>
      <h1>My Account Balance</h1>
      <BalanceWidget accounts={accounts} warningThreshold={1000} />
      <BalanceWidget accounts={lowBalanceAccounts} warningThreshold={1000} />
      <BalanceWidget accounts={emptyAccounts} warningThreshold={1000} />
    </div>
  );
};

export default AccountBalance;
