/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

interface DepositData {
  amount: number;
  currency: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
}

interface DepositResponse {
  success: boolean;
  message: string;
  data: DepositData;
}

interface Wallet {
  _id: string;
  user: string;
  amount: number;
  currency: string;
  isBlocked: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Transaction {
  _id: string;
  user: User;
  wallet: Wallet;
  type: "deposit" | "withdraw" | "send";
  amount: number;
  status: string;
  method?: string;
  receiver?: User;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TransactionResponse {
  success: boolean;
  message: string;
  data: Transaction[];
  pagination: Pagination;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/v1/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    DepositMoney: builder.mutation<DepositResponse, { amount: number }>({
      query: (data) => ({
        url: "/api/v1/user/deposit",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    withdrawMoney: builder.mutation<DepositResponse, { amount: number }>({
      query: (data) => ({
        url: "/api/v1/user/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"], // refresh user info after withdraw
    }),

    getTransactions: builder.query<
      TransactionResponse,
      {
        page?: number;
        limit?: number;
        type?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => ({
        url: "/api/v1/user/transactions",
        method: "GET",
        params: { page, limit, type, startDate, endDate },
      }),
      providesTags: ["USER"],
    }),

    sendMoney: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { success: boolean; message: string; data?: any },
      { toUserId: string; amount: number }
    >({
      query: (payload) => ({
        url: "/api/v1/user/sent", // API endpoint for sending money
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"], // updates cache after sending
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/update-profile",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    agentDeposit: builder.mutation({
      query: (payload: { email: string; amount: number }) => ({
        url: "/api/v1/user/agentDeposit",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    agentWithdraw: builder.mutation({
      query: (payload: { email: string; amount: number }) => ({
        url: "/api/v1/user/agentWithdraw",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    
    getAgentTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: "/api/v1/user/agentTransactions",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; message: string; data: Transaction[] }) => response.data,
      providesTags: ["USER"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/update-password",
        method: "PUT",
        data,
      }),
    }),

    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/api/v1/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    approveAgent: builder.mutation({
      query: (userId: string) => ({
        url: `/api/v1/user/approve-agent/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    suspendAgent: builder.mutation({
      query: (userId: string) => ({
        url: `/api/v1/user/suspend-agent/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    blockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/api/v1/user/block-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/api/v1/user/unblock-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    getAllTransactions: builder.query<TransactionResponse, any>({
      query: (filters) => ({
        url: "/api/v1/transection",
        method: "GET",
        params: filters,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
  useGetTransactionsQuery,
  useSendMoneyMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useAgentDepositMutation,
  useAgentWithdrawMutation,
  useGetAgentTransactionsQuery,
  useGetAllUsersQuery,
  useSuspendAgentMutation,
  useApproveAgentMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetAllTransactionsQuery
} = authApi;
