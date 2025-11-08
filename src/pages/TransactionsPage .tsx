/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useGetAllTransactionsQuery } from "@/redux/features/auth/auth_api";

interface Filters {
  page: number;
  limit: number;
  type: string;
  status: string;
  minAmount: string;
  maxAmount: string;
  search: string;
  startDate: string;
  endDate: string;
}

const TransactionsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    type: "",
    status: "",
    minAmount: "",
    maxAmount: "",
    search: "",
    startDate: "",
    endDate: "",
  });

  // Fetch all transactions (ignore filters for now)
  const { data, isLoading } = useGetAllTransactionsQuery({ page: 1, limit: 1000 });

  // Handle filter input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1, // reset page when filters change
    }));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Client-side filtering for all filters
  const filteredTransactions = useMemo(() => {
    const transactions = data?.data ?? [];
    return transactions.filter((tx: any) => {
      const txDate = new Date(tx.createdAt);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      return (
        (filters.search === "" ||
          tx.user?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          tx.user?.email?.toLowerCase().includes(filters.search.toLowerCase())) &&
        (filters.type === "" || tx.type === filters.type) &&
        (filters.status === "" || tx.status === filters.status) &&
        (filters.minAmount === "" || tx.amount >= Number(filters.minAmount)) &&
        (filters.maxAmount === "" || tx.amount <= Number(filters.maxAmount)) &&
        (!startDate || txDate >= startDate) &&
        (!endDate || txDate <= endDate)
      );
    });
  }, [
    data,
    filters.search,
    filters.type,
    filters.status,
    filters.minAmount,
    filters.maxAmount,
    filters.startDate,
    filters.endDate,
  ]);

  if (isLoading) return <p>Loading...</p>;

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / filters.limit);
  const paginatedTransactions = filteredTransactions.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit
  );

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          name="search"
          placeholder="Search by user/email"
          value={filters.search}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Type</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="send">Send</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          value={filters.minAmount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          value={filters.maxAmount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Transaction Table */}
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Receiver</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.length ? (
            paginatedTransactions.map((tx: any) => (
              <tr key={tx._id}>
                <td className="p-2 border">{tx.user?.name || tx.user?.email}</td>
                <td className="p-2 border">
                  {tx.receiver?.name || tx.receiver?.email || "-"}
                </td>
                <td className="p-2 border capitalize">{tx.type}</td>
                <td className="p-2 border">{tx.amount}</td>
                <td className="p-2 border capitalize">{tx.status}</td>
                <td className="p-2 border">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-2 border text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 border rounded ${
                filters.page === idx + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
