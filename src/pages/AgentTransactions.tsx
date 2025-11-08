// import { useAgentTransactionsQuery } from "@/redux/features/auth/auth_api";
// import React from "react";

import { useGetAgentTransactionsQuery } from "@/redux/features/auth/auth_api";

const AgentTransactions = () => {
  const { data: transactions, isLoading, isError } = useGetAgentTransactionsQuery();

  if (isLoading) return <p>Loading transactions...</p>;
  if (isError) return <p>Failed to load transactions.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Transactions Handled by You
      </h1>

      {transactions?.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Receiver</th>
                <th className="px-4 py-2 border">Method</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx) => (
                <tr key={tx._id} className="text-center border-b border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2">{tx.amount}</td>
                  <td className="px-4 py-2">{tx.user?.name || tx.user?.email}</td>
                  <td className="px-4 py-2">{tx.receiver?.name || tx.receiver?.email || "-"}</td>
                  <td className="px-4 py-2">{tx.method || "-"}</td>
                  <td className="px-4 py-2">{tx.status}</td>
                  <td className="px-4 py-2">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentTransactions;
