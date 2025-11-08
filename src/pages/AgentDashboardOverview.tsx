import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useGetAgentTransactionsQuery, useUserInfoQuery } from "@/redux/features/auth/auth_api";

const AgentDashboardOverview: React.FC = () => {
  const { data: userData, isLoading: userLoading } = useUserInfoQuery({});
  const { data: transactions = [], isLoading: txLoading } = useGetAgentTransactionsQuery();

  // Always define hooks before any early returns
  const { totalCashIn, totalCashOut } = useMemo(() => {
  let cashIn = 0;
  let cashOut = 0;
  transactions.forEach((tx) => {
    if (tx.type === "deposit") cashIn += tx.amount;
    if (tx.type === "withdraw") cashOut += tx.amount;
  });
  return { totalCashIn: cashIn, totalCashOut: cashOut };
}, [transactions]);


  if (userLoading || txLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {/* Cash-in / Cash-out Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-green-600" /> Total Cash-In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {totalCashIn.toFixed(2)} {userData?.data?.wallet?.currency || "USD"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ArrowUpCircle className="w-5 h-5 text-red-600" /> Total Cash-Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {totalCashOut.toFixed(2)} {userData?.data?.wallet?.currency || "USD"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No transactions handled yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">User</th>
                    <th className="py-2 px-4 border">Method</th>
                    <th className="py-2 px-4 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((tx) => (
                    <tr key={tx._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 capitalize">
                        {tx.type === "deposit" && <span className="text-green-600">Deposit</span>}
                        {tx.type === "withdraw" && <span className="text-red-600">Withdraw</span>}
                        </td>
                        <td className="py-2 px-4 font-semibold">
                        {tx.amount.toFixed(2)} {tx.wallet?.currency || "USD"}
                        </td>
                        <td className="py-2 px-4">{tx.user?.name || tx.user?.email}</td>
                        <td className="py-2 px-4">{tx.method || "-"}</td>
                        <td className="py-2 px-4 text-gray-500">
                        {new Date(tx.createdAt).toLocaleString()}
                        </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboardOverview;
