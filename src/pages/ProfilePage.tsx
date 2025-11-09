/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useUserInfoQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/auth/auth_api";

const ProfilePage: React.FC = () => {
  const { data, isLoading, refetch } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: updatingPassword }] = useUpdatePasswordMutation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (data?.data) {
      setForm({
        name: data.data.name || "",
        phone: data.data.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name: form.name, phone: form.phone }).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      await updatePassword({ password: form.password }).unwrap();
      toast.success("Password updated successfully");
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  if (isLoading) return <p className="text-center py-6 dark:text-gray-200">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 space-y-8 rounded-2xl shadow-lg 
    bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition">
      
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
        Profile Management
      </h2>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <Input value={data?.data?.email || ""} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
        </div>

        <Button type="submit" disabled={updatingProfile} className="w-full">
          {updatingProfile ? "Updating..." : "Update Profile"}
        </Button>
      </form>

      <hr className="dark:border-gray-700" />

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Change Password</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        </div>

        <Button type="submit" disabled={updatingPassword} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {updatingPassword ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
