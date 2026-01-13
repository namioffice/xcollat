'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear admin-related data from localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("admin");

    // Optional: clear other app states or context if needed

    toast.success("Logged out successfully");

    // Redirect to admin login page
    router.push("/admin-login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-(--color1) w-[200px] text-black px-4 font-bold text-xs py-2 rounded-md hover:bg-red-700 hover:text-white transition"
      aria-label="Logout Admin"
    >
      Logout Admin
    </button>
  );
};

export default LogoutButton;
