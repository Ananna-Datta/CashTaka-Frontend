import About from "@/pages/About";
import App from "@/App";
import { createBrowserRouter } from "react-router";
import login from "@/pages/login";
import register from "@/pages/register";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import DepositMoney from "@/pages/DepositMoney";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import WithdrawMoney from "@/pages/WithdrawMoney";
import TransactionHistory from "@/pages/TransactionHistory";
import SendMoney from "@/pages/SendMoney";
import ProfilePage from "@/pages/ProfilePage";
import DashboardOverview from "@/pages/DashboardOverview";
import AgentDeposit from "@/pages/AgentDeposit";
import AgentWithdraw from "@/pages/AgentWithdraw";
import AgentTransactions from "@/pages/AgentTransactions";
import AgentDashboardOverview from "@/pages/AgentDashboardOverview";
import AllUsers from "@/pages/AllUsers";
import TransactionsPage from "@/pages/TransactionsPage ";
import AdminOverview from "@/pages/AdminOverview";

export const router = createBrowserRouter([
    {
        Component: App,
        path:"/",
        children:[
            {
                Component:Home,
                path:"/"
            },
            {
                Component:About,
                path:"/about"
            },
            {
                Component:Features,
                path:"/features"
            },
            {
                Component:Contact,
                path:"/contact"
            },{
                Component:FAQ,
                path:"/FAQ"
            }
        ]
    },
    {
        Component:DashboardLayout,
        path:"/dashboard",
        children:[
            {
                Component:ProfilePage,
                path:""
            },
            {
                Component:DepositMoney,
                path:'depositMoney'
            },
            {
                Component:WithdrawMoney,
                path:'withdrawMoney'
            },
            {
                Component:TransactionHistory,
                path:'TransactionHistory'
            },
            {
                Component:SendMoney,
                path:'SendMoney'
            },
            {
                Component:DashboardOverview,
                path:'DashboardOverview'
            },
            {
                Component:AgentDeposit,
                path:'AgentDeposit'
            },
            {
                Component:AgentWithdraw,
                path:'AgentWithdraw'
            },
            {
                Component:AgentTransactions,
                path:'AgentTransactions'
            },
            {
                Component:AgentDashboardOverview,
                path:'AgentDashboardOverview'
            },
            {
                Component:AllUsers,
                path:'AllUsers'
            },
            {
                Component:TransactionsPage,
                path:'TransactionsPage'
            },
            {
                Component:AdminOverview,
                path:'AdminOverview'
            },
        ]
    },
    {
        Component:login,
        path:"/login"
    },
    {
        Component:register,
        path:"/register"
    },
])