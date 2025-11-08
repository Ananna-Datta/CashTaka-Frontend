import { useAgentDepositMutation } from "@/redux/features/auth/auth_api";
import { useState } from "react";
import { toast } from "sonner";

const AgentDeposit = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const [agentDeposit, { isLoading }] = useAgentDepositMutation();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await agentDeposit({ email, amount }).unwrap();
      toast.success(res.message || "Deposit Successful ✅");
      setEmail("");
      setAmount(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to deposit ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Agent Cash-In (Deposit)
      </h1>

      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            User Email
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md transition"
        >
          {isLoading ? "Processing..." : "Deposit Money"}
        </button>
      </form>
    </div>
  );
};

export default AgentDeposit;
