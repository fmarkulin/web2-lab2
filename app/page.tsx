"use client";

import Chat from "@/components/Chat";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      document.cookie = `sub=${user.sub}; path=/;`;
    } else {
      document.cookie = `sub=; path=/;`;
    }
  }, [user, isLoading]);

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-5">Public Chat Room</h1>
        {!user && <p>Please login to use chat</p>}
        {user && <Chat user={user} />}
      </div>
    </>
  );
}
