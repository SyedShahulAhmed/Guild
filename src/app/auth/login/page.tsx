"use client"

import { LoginData, LoginSchema } from "@/validators/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }
      toast.success("Welcome Back");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (e) {
        console.log(e)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border backdrop-blur-sm p-8 transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>

          <p className="mt-2 text-muted">Sign in to continue to Guild.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-foreground">Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                {...register("email")}
                type="email"
                placeholder="john@gmail.com"
                className="w-full rounded-lg border border-border bg-background-secondary pl-12 pr-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-foreground">Password</label>

              {/* <button
                type="button"
                className="text-xs text-accent hover:underline"
              >
                Forgot Password?
              </button> */}
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="w-full rounded-lg border border-border bg-background-secondary pl-12 pr-12 py-3 text-foreground outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 hover:text-accent"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}

            {!loading && (
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="ml-2 text-accent transition-all duration-300 hover:underline hover:opacity-80"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}
