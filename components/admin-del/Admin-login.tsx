"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Login response from backend:", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (!data.accessToken) {
        throw new Error("No access token received from server");
      }

      // ✅ Save token to localStorage
      localStorage.setItem("adminToken", data.accessToken);

      setMessage("Logged in successfully!");

      // ✅ Redirect to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-(--color4) mt-56 ">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2 rounded text-(--textColor)"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2 rounded text-(--textColor)"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--color1) text-black py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && (
          <p
            className={`text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="mt-5 flex items-center justify-end ">
      <Link
            href="/admin-signup"
            className="text-(--color1) hover:underline underline "
          >
            Sign Up
          </Link>
      </div>
    </div>
  );
}
