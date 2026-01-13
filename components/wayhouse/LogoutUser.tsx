"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const   LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Optional: clear other user-related states here

    toast.success("Logged out successfully");

    // Redirect to login or home page
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-(--color3) w-[100px] text-black px-4 font-bold text-xs  py-2  rounded-md hover:bg-lime-100 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
