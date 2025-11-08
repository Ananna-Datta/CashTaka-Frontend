/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/auth/auth_api";
import { toast } from "sonner";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const users = data?.data?.data ?? [];

  const handleToggleUserStatus = async (user: any) => {
    try {
      if (user.role === "USER") {
        if (user.IsActive === "BLOCKED") {
          await unblockUser(user._id).unwrap();
          toast.success(`${user.name} has been unblocked`);
        } else {
          await blockUser(user._id).unwrap();
          toast.success(`${user.name} has been blocked`);
        }
      } else if (user.role === "AGENT") {
        if (user.status === "approved") {
          await suspendAgent(user._id).unwrap();
          toast.success(`${user.name} has been suspended`);
        } else if (user.status === "suspended" || user.status === "pending") {
          await approveAgent(user._id).unwrap();
          toast.success(`${user.name} has been approved`);
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Action failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border capitalize">{user.role}</td>
              <td className="p-2 border capitalize">
                {user.role === "USER" ? user.IsActive : user.status}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleToggleUserStatus(user)}
                  className={`px-3 py-1 text-sm rounded ${
                    user.role === "USER"
                      ? user.IsActive === "BLOCKED"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : user.status === "approved"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {user.role === "USER"
                    ? user.IsActive === "BLOCKED"
                      ? "Unblock"
                      : "Block"
                    : user.status === "approved"
                    ? "Suspend"
                    : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
