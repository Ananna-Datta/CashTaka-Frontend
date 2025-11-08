import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth_api";

export function AppSidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { data } = useUserInfoQuery(undefined);
  const role = data?.data?.role?.toLowerCase() || "user";

  const commonLinks = [
    { path: "/", label: "Home" }
  ];

  const userLinks = [
    { path: "/dashboard/DashboardOverview", label: "Overview" },
    { path: "/dashboard/depositMoney", label: "Deposit Money" },
    { path: "/dashboard/withdrawMoney", label: "Withdraw Money" },
    { path: "/dashboard/SendMoney", label: "Send Money" },
    { path: "/dashboard/TransactionHistory", label: "Transactions" },
    { path: "/dashboard", label: "Profile" },
  ];

  const agentLinks = [
    { path: "/dashboard/AgentDashboardOverview", label: "Agent Overview" },
    { path: "/dashboard/AgentDeposit", label: "Add Money to User" },
    { path: "/dashboard/AgentWithdraw", label: "Withdraw for User" },
    { path: "/dashboard/AgentTransactions", label: "Agent Transactions" },
    { path: "/dashboard", label: "Profile" },
  ];

  const adminLinks = [
    { path: "/dashboard/AdminOverview", label: "Overview" },
    { path: "/dashboard/AllUsers", label: "Manage Users" },
    { path: "/dashboard/TransactionsPage", label: "All Transactions" },
    { path: "/dashboard", label: "Profile" },
  ];

  // Select links based on role
  const links =
    role === "agent"
      ? [...commonLinks, ...agentLinks]
      : role === "admin"
      ? [...commonLinks, ...adminLinks]
      : [...commonLinks, ...userLinks];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-16"
      } bg-gray-800 text-white min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {open && <h2 className="text-lg font-semibold">Dashboard</h2>}
        <button onClick={() => setOpen(!open)} className="text-gray-300">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block p-2 rounded-md hover:bg-gray-700 transition ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {open ? link.label : link.label[0]}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        {open && "© 2025 Wallet System"}
      </div>
    </aside>
  );
}
