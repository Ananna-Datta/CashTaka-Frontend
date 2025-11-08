import { useState } from "react";
import { useAgentWithdrawMutation } from "@/redux/features/auth/auth_api";
import { toast } from "sonner";

const AgentWithdraw = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const [agentWithdraw, { isLoading }] = useAgentWithdrawMutation();

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await agentWithdraw({ email, amount }).unwrap();
      toast.success(res.message || "Withdrawal Successful ✅");
      setEmail("");
      setAmount(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to withdraw ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Agent Cash-Out (Withdraw)
      </h1>

      <form onSubmit={handleWithdraw} className="space-y-4">
        {/* User Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            User Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Amount
          </label>
          <input
            type="number"
            required
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-md transition"
        >
          {isLoading ? "Processing..." : "Withdraw Money"}
        </button>
      </form>
    </div>
  );
};

export default AgentWithdraw;
