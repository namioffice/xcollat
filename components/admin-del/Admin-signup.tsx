"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // ✅ Save token
      // localStorage.setItem("adminToken", data.access_token);
      toast.success("Admin registered successfully!");

      // ✅ Redirect to admin dashboard
      router.push("/admin-login");
    } catch (err: any) {
      toast.error(err.message);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-(--color4) pt-60 ">
      <h1 className="text-2xl font-bold mb-4">x Admin Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key}
            type={key.includes("password") ? "password" : "text"}
            className="w-full border px-3 py-2 rounded text-(--textColor)"
            required
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--color1) text-black py-2 rounded"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
