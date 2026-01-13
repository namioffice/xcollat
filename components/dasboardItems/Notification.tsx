"use client";

import React, { useEffect, useState } from "react";
import { Clock, Trash } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "../wayhouse/Loading";


type NotificationType = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

const Notification = () => {
  const [isNotify, setNotify] = useState<NotificationType[]>([]);

  const handleNotificationData = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/user/${userId}`
      );
      if (!res.ok) {
        toast.error("Failed to fetch notification data");
        return;
      }
      const data = await res.json();
      console.log("✅ Notification data:", data);
      setNotify(data);
    } catch (err) {
      toast.error("Error fetching notifications");
    }
  };

  // Delete Notification
  const deleteNotification = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete");

      setNotify((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notification deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete notification");
    }
  };

  useEffect(() => {
    handleNotificationData();
  }, []);

  return (
    <div className="space-y-4 mr-5 ">
      {isNotify.length === 0 ? (
       <p className="text-(--color2) font-bold text-sm md:text-lg" >YOU HAVE NO NOTIFICATION!!.....</p> 
      ) : (
        isNotify.map((notify) => (
          
          <div
            key={notify.id}
            className="bg-(--color2) text-white border-l-4 border-(--color1) p-5 shadow-md rounded-md relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-(--color1) font-semibold text-sm">
                  {notify.title}
                </h3>
                <p className="text-sm mt-1 ">{notify.message}</p>
              </div>
            </div>
            <div
              className="absolute top-2 right-2 cursor-pointer bg-neutral-950 p-1 rounded-full"
              onClick={() => deleteNotification(notify.id)}
            >
              <Trash size={20} className="text-red-600 " />
            </div>

            <span className="text-xs text-gray-400 flex items-center gap-1 w-[100px] pt-5">
              <Clock className="w-3 h-3" />
              {new Date(notify.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
