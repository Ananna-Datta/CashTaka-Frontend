import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery, useGetTransactionsQuery } from "@/redux/features/auth/auth_api";
import { ArrowUpCircle, ArrowDownCircle, Send } from "lucide-react";
import { Link } from "react-router";

const DashboardOverview: React.FC = () => {
  const { data: userData, isLoading: userLoading } = useUserInfoQuery({});
  const { data: transactionsData, isLoading: txLoading } = useGetTransactionsQuery({
    page: 1,
    limit: 5,
  });

  if (userLoading || txLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  const wallet = userData?.data?.wallet || {};
  const transactions = transactionsData?.data || [];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {/* Wallet Balance */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-green-600">
              {wallet?.amount?.toFixed(2)} {wallet?.currency || "USD"}
            </p>
            <p className="text-gray-500">Available Balance</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/depositMoney">
              <Button variant="default" className="flex items-center gap-2">
                <ArrowDownCircle className="w-4 h-4" /> Deposit
              </Button>
            </Link>
            <Link to="/dashboard/withdrawMoney">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4" /> Withdraw
              </Button>
            </Link>
            <Link to="/dashboard/sendMoney">
              <Button variant="secondary" className="flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Money
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No transactions found</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Type</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 capitalize">
                      {tx.type === "deposit" && <span className="text-green-600">Deposit</span>}
                      {tx.type === "withdraw" && <span className="text-red-600">Withdraw</span>}
                      {tx.type === "send" && <span className="text-blue-600">Send</span>}
                    </td>
                    <td className="py-2 font-semibold">{tx.amount.toFixed(2)} {tx.wallet.currency}</td>
                    <td className="py-2">{tx.status}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
