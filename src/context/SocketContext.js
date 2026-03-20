"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "@/hooks/useAuth";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("join", user._id);
    });

    newSocket.on("feed:update", (data) => {
      setNotifications((prev) => [data, ...prev].slice(0, 20));
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave", user._id);
      newSocket.disconnect();
    };
  }, [user]);

  const clearNotifications = () => setNotifications([]);

  return (
    <SocketContext.Provider value={{ socket, notifications, clearNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;