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

  // ✅ Prefill data when loaded
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

  // ✅ Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update profile info
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name: form.name, phone: form.phone }).unwrap();
      toast.success("Profile updated successfully");
      refetch(); // refresh user info
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  // ✅ Update password
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

  if (isLoading) return <p className="text-center py-6">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-center">Profile Management</h2>

      {/* --- Profile Info Update --- */}
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input value={data?.data?.email || ""} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <Button type="submit" disabled={updatingProfile} className="w-full">
          {updatingProfile ? "Updating..." : "Update Profile"}
        </Button>
      </form>

      <hr className="my-6" />

      {/* --- Password Update --- */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h3 className="text-xl font-medium">Change Password</h3>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <Input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>

        <Button
          type="submit"
          disabled={updatingPassword}
          className="w-full bg-blue-600 text-white"
        >
          {updatingPassword ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
