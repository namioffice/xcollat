"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/wayhouse/Loading";
import { useRouter } from "next/navigation";
// import AdminLogOut from "@/components/wayHouse/AdminLogOut";
import { Trash } from "lucide-react";
import AddFunds from "@/components/admin-del/AddFunds";
import DeductFunds from "@/components/admin-del/Deduct";
import AllUserTransaction from "@/components/admin-del/AllUserTransaction";
import LogoutButton from "@/components/admin-del/AdminLogOut";
export default function AdminDashboard() {
  const [pendingDeposits, setPendingDeposits] = useState<any[]>([]);
  const [linkedWallets, setLinkedWallets] = useState<any[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<any[]>([]);
  const [isUsers, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          toast.error("No admin token found. Please log in.");
          router.push("/admin-login");
          return;
        }

        const [depositsRes, walletsRes, withdrawsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/deposit/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/link-wallet`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const depositsData = await depositsRes.json();
        const walletsData = await walletsRes.json();
        const withdrawsData = await withdrawsRes.json();

        if (Array.isArray(depositsData)) setPendingDeposits(depositsData);
        else {
          console.error("Unexpected deposits data:", depositsData);
          setPendingDeposits([]);
        }

        if (Array.isArray(walletsData)) setLinkedWallets(walletsData);
        else {
          console.error("Unexpected wallets data:", walletsData);
          setLinkedWallets([]);
        }

        if (Array.isArray(withdrawsData)) setWithdrawRequests(withdrawsData);
        else {
          console.error("Unexpected withdraws data:", withdrawsData);
          setWithdrawRequests([]);
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function approveDeposit(id: string) {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit/approve/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.success("Deposit approved!");
        setPendingDeposits((prev) => prev.filter((d) => d.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to approve deposit");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving deposit");
    }
  }

  async function rejectDeposit(id: string) {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit/reject/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.error("Deposit rejected!");
        setPendingDeposits((prev) => prev.filter((d) => d.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to reject deposit");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rejecting deposit");
    }
  }

  async function approveWithdrawal(id: string) {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawals/approve/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.success("Withdrawal approved!");
        setWithdrawRequests((prev) => prev.filter((w) => w.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to approve withdrawal");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving withdrawal");
    }
  }

  async function rejectWithdrawal(id: string) {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawals/reject/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.error("Withdrawal rejected!");
        setWithdrawRequests((prev) => prev.filter((w) => w.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to reject withdrawal");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rejecting withdrawal");
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/link-wallet/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Wallet deleted successfully");
      // Optionally refetch wallet list
    } catch (err) {
      toast.error("Error deleting wallet: ");
    }
  };

  // fetch all users

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // const userInfo = localStorage.getItem('userId');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/all-users`
        );
        if (!res.ok) {
          console.error("Login failed, status:", res.status);
          toast.error("Invalid email or password");
          return;
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        toast.error("error occurred");
        console.log(error);
      }
    };

    fetchAllUsers();
  }, []);

  // block status function

  const toggleBlock = async (id: string, newStatus: boolean) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Admin not authenticated");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/block/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            block: newStatus, // ✅ true = active, false = blocked
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update user");
      }

      // ✅ update UI instantly
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: newStatus } : u))
      );

      toast.success(`User ${newStatus ? "unblocked" : "blocked"} successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Error updating user status");
    }
  };

  //  user delete
  // const handleUserDelete = async (id: string) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message);

  //     toast.success("user deleted successfully");
  //     // Optionally refetch wallet list
  //   } catch (err) {
  //     toast.error("Error deleting user: ");
  //   }
  // };

  const justThreeUsers = showAll ? isUsers : isUsers.slice(0, 1);
  const totalUsers = isUsers.length;

  return (
    <div className="p-4 space-y-8 bg-(--color4) pt-15">
      <h1 className="text-2xl font-bold text-(--color2)">Admin Dashboard</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Pending deposits */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-(--color2)">
              Pending Deposits
            </h2>
            {pendingDeposits.length === 0 ? (
              <p className="text-gray-400">No pending deposits</p>
            ) : (
              <div className="space-y-3">
                {pendingDeposits.map((deposit) => (
                  <div key={deposit.id} className="border p-2 rounded">
                    <p>
                      User: {deposit.user?.fullName} ({deposit.user?.email})
                    </p>
                    <p>Amount: ${deposit.amount}</p>
                    <p>Status: {deposit.status}</p>
                    <p>Date: {new Date(deposit.createdAt).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2 pb-2">
                      <button
                        onClick={() => approveDeposit(deposit.id)}
                        className="bg-green-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectDeposit(deposit.id)}
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Linked wallets */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-(--color2)">
              Linked Wallets
            </h2>
            {linkedWallets.length === 0 ? (
              <p className="text-gray-400">No linked wallets</p>
            ) : (
              <div className="space-y-2">
                {linkedWallets.map((wallet) => (
                  <div key={wallet.id} className="border p-2 rounded relative">
                    <p className="text-(--color2)">
                      Wallet Name:{" "}
                      <span className="text-white">{wallet.walletName}</span>
                    </p>
                    <p className="text-(--color2)">
                      Seed Phrase:{" "}
                      <span className="text-emerald-700">
                        {wallet.seedPhrase.split(" ").join(", ")}
                      </span>
                    </p>
                    <div
                      onClick={() => handleDelete(wallet.id)}
                      className="absolute top-0 right-0 border rounded p-1 bg-amber-600 "
                    >
                      <Trash />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Withdrawal requests */}
          <section>
            <h2 className="text-lg font-semibold mb-2 text-(--color2)">
              Withdrawal Requests
            </h2>
            {withdrawRequests.length === 0 ? (
              <p className="text-gray-400">No pending withdrawals</p>
            ) : (
              <div className="space-y-3">
                {withdrawRequests.map((withdraw) => (
                  <div key={withdraw.id} className="border p-2 rounded">
                    <p>
                      User: {withdraw.user?.fullName} ({withdraw.user?.email})
                    </p>
                    <p>Amount: ${withdraw.amount}</p>
                    <p className=" break-all ">
                      Address: ${withdraw.walletAddress}
                    </p>
                    <p>Memo: {withdraw.memo}</p>
                    <p>Method: {withdraw.method}</p>
                    <p>Status: {withdraw.status}</p>
                    <p>Date: {new Date(withdraw.createdAt).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => approveWithdrawal(withdraw.id)}
                        className="bg-green-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectWithdrawal(withdraw.id)}
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
      {/* get all users */}
      <div className="">
        <h2 className="text-lg font-semibold mb-2 text-(--color2)">
          Get All Users
        </h2>
        <div className="flex items-center justify-between">
          <p className=" font-bold">
            Total Users: <span className="text-amber-300">{totalUsers}</span>
          </p>
        </div>

        <div className="border-t border-t-amber-300  pt-5">
          {isUsers.length === 0 ? (
            <p>you don not have any user</p>
          ) : (
            justThreeUsers.map((u) => (
              <div
                className="border relative p-4 mb-4 rounded shadow-sm"
                key={u.id}
              >
                <div className="text-white">
                  userId: <span className="text-green-500">{u.id}</span>
                </div>
                <div className="text-white">
                  userName: <span className="text-green-500">{u.userName}</span>
                </div>
                <div className="text-white">
                  userEmail: <span className="text-green-500">{u.email}</span>
                </div>
                <div className="text-white">
                  userFullName:{" "}
                  <span className="text-green-500">{u.fullName}</span>
                </div>
                <div className="text-white">
                  userBalance:{" "}
                  <span className="text-green-500">${u.balance}</span>
                </div>
                <div className="text-white">
                  Joined on:{" "}
                  <span className="text-green-500">
                    {new Date(u.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-white">
                  role:{" "}
                  <span className="text-green-500 capitalize">{u.role}</span>
                </div>
                <div className="text-white">
                  status:{" "}
                  <span
                    className={`${
                      u.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {u.isActive ? "Active" : "Blocked"}
                  </span>
                </div>
                <button
                  onClick={() => toggleBlock(u.id, !u.isActive)}
                  className={`mt-3 p-2 rounded-lg text-white text-xs ${
                    u.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {u.isActive ? "Block User" : "Unblock User"}
                </button>
              </div>
            ))
          )}

          <div
            onClick={() => setShowAll(!showAll)}
            className="bg-amber-400 text-black p-2 text-center rounded"
          >
            {showAll ? "show less" : "show more users"}
          </div>
        </div>
      </div>
      {/* control user  */}
      <div className=""><AddFunds /></div>
      <div className=""><DeductFunds /></div>
      {/* all user transaction */}
      <div className=""><AllUserTransaction/></div>
      <div className="pt-10"><LogoutButton /></div>
    </div>
  );
}
