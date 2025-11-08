import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDepositMoneyMutation } from "@/redux/features/auth/auth_api";
// import { useDepositMoneyMutation } from "@/redux/features/auth/auth_api";

interface DepositForm {
  amount: number;
}

const DepositMoney: React.FC = () => {
  const [form, setForm] = useState<DepositForm>({ amount: 0 });
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ( form.amount <= 0) {
      toast.error("Please provide a valid amount.");
      return;
    }

    try {
      const result = await depositMoney({ amount: form.amount }).unwrap();

      // Access nested data
      const balance = result.data.amount;
      const currency = result.data.currency;

      toast.success(`Deposit successful! New balance: ${balance} ${currency}`);

      setForm({ amount: 0 });
    } catch (err: unknown) {
      let message = "Deposit failed. Try again.";

      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }

      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Deposit Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <Input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min={1}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Deposit"}
        </Button>
      </form>
    </div>
  );
};

export default DepositMoney;
