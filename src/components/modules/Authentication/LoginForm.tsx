/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password"; // 👈 your custom password field
import { Link, useNavigate } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/auth/auth_api";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
  try {
    const res = await login(data).unwrap();
    console.log(res);
    // Save token in localStorage for axios interceptor
    localStorage.setItem("accessToken", res.data.accessToken);

    // Optional: get user info immediately
    const meRes = await axiosInstance.get("/api/v1/user/me");
    console.log("User info:", meRes.data);

    toast.success("Logged in successfully");
    navigate("/dashboard");
  } catch (err: any) {
    toast.error(err?.data?.message || "Login failed");
  }
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email and password below to access your account
        </p>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your login email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password (with toggle) */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} placeholder="********" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your login password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
