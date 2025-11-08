/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { useGetAllTransactionsQuery, useGetAllUsersQuery } from '@/redux/features/auth/auth_api';

const AdminOverview: React.FC = () => {
  // Fetch all transactions — pass empty object to satisfy required arg
  const { data: transactionsData, isLoading: isLoadingTx } = useGetAllTransactionsQuery({});

  // Fetch all users — no args needed
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();

  const isLoading = isLoadingTx || isLoadingUsers;

  // Compute overview
  const overview = useMemo(() => {
    const transactions = transactionsData?.data ?? [];
    const usersArray = Array.isArray(usersData?.data?.data) ? usersData.data.data : [];

    const totalUsers = usersArray.filter((u: { role: string; }) => u.role === 'USER').length;
    const totalAgents = usersArray.filter((u: { role: string; }) => u.role === 'AGENT').length;
    const totalTransactions = transactions.length;
    const totalVolume = transactions.reduce((sum: number, tx: any) => sum + tx.amount, 0);

    return { totalUsers, totalAgents, totalTransactions, totalVolume };
  }, [transactionsData, usersData]);

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{overview.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Agents</p>
          <p className="text-2xl font-bold">{overview.totalAgents}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Transactions</p>
          <p className="text-2xl font-bold">{overview.totalTransactions}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Volume</p>
          <p className="text-2xl font-bold">${overview.totalVolume.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
