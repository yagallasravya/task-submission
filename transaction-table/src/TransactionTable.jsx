import React, { useState, useEffect } from "react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetching data from a mock API which i created by giving sample json data
        const response = await fetch(
          "https://mocki.io/v1/7aced883-0107-4435-b760-401ab27af4db"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
            setTransactions(data.transactions);
            setLoading(false);
          }, 1500);
      } catch (err) {
        setError(err.message);
        setLoading(false);

      } 
    };

    fetchTransactions();
  }, []);

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };
  // if we want particular time zone then we can use "en-us " or "en-gb" etc in place of undefined.

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Transaction Table</h1>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Date
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Description
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{formatDate(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td style={{ color: transaction.amount >= 0 ? "green" : "red" }}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(transaction.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TransactionTable;
