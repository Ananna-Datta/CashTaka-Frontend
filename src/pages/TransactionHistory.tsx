import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetTransactionsQuery } from "@/redux/features/auth/auth_api";

const TransactionHistory: React.FC = () => {
  const { data } = useGetTransactionsQuery({ page: 1, limit: 100 });
  const transactions = data?.data ?? [];

  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw" | "send">("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = filterType === "all" || tx.type === filterType;
    let dateMatch = true;
    if (startDate) dateMatch = dateMatch && new Date(tx.createdAt) >= new Date(startDate);
    if (endDate) dateMatch = dateMatch && new Date(tx.createdAt) <= new Date(endDate);
    return typeMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => setCurrentPage(1), [filterType, startDate, endDate]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 rounded-xl shadow-md 
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Transaction History
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
        >
          <option value="all">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="send">Send</option>
        </select>

        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {/* Table */}
      <table className="w-full text-center border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <th className="p-2 border border-gray-300 dark:border-gray-600">Type</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Amount</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Status</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Date</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">User</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((tx) => (
            <tr key={tx._id} className="border-t border-gray-300 dark:border-gray-700">
              <td className="p-2">{tx.type}</td>
              <td className="p-2">{tx.amount}</td>
              <td className="p-2">{tx.status}</td>
              <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
              <td className="p-2">{tx.user.name}</td>
            </tr>
          ))}
          {paginatedTransactions.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-gray-700 dark:text-gray-300">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "font-bold" : ""}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistory;
