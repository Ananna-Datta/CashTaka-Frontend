/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSendMoneyMutation } from "@/redux/features/auth/auth_api";

const SendMoney: React.FC = () => {
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toUserId) return toast.error("Enter recipient ID/email");
    if (amount <= 0) return toast.error("Enter a valid amount");

    try {
      const result = await sendMoney({ toUserId, amount }).unwrap();
      toast.success(result.message);
      setToUserId("");
      setAmount(0);
    } catch (err: any) {
      toast.error(err?.data?.message || "Transaction failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Recipient ID / Email"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={1}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Money"}
        </Button>
      </form>
    </div>
  );
};

export default SendMoney;
