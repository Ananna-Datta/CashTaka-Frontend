import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDepositMoneyMutation } from "@/redux/features/auth/auth_api";

interface DepositForm {
  amount: number;
}

const DepositMoney: React.FC = () => {
  const [form, setForm] = useState<DepositForm>({ amount: 0 });
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.amount <= 0) {
      toast.error("Please provide a valid amount.");
      return;
    }

    try {
      const result = await depositMoney({ amount: form.amount }).unwrap();
      const balance = result.data.amount;
      const currency = result.data.currency;

      toast.success(`Deposit successful! New balance: ${balance} ${currency}`);
      setForm({ amount: 0 });
    } catch (err: unknown) {
      let message = "Deposit failed. Try again.";
      if (err instanceof Error) message = err.message;
      else if (typeof err === "string") message = err;
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md 
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Deposit Money
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
            Amount
          </label>
          <Input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min={1}
            required
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Deposit"}
        </Button>
      </form>
    </div>
  );
};

export default DepositMoney;
