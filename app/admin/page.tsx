"use client";

import checkAdminSub from "@/hooks/checkAdminSub";
import useSecure from "@/hooks/useSecure";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const checkAuth = async (sub: string) => {
  return await checkAdminSub(sub);
};

export default function AdminPage() {
  const { user, isLoading, error } = useUser();
  const { secure } = useSecure();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log("auth check trigger");
    if (secure === undefined) return;

    if (secure === false) {
      setChecking(false);
      return;
    }

    if (isLoading) return;

    (async () => {
      if (user) {
        const isAdmin = await checkAuth(user.sub || "");
        console.log("isAdmin", isAdmin);
        if (!isAdmin) {
          toast("You're not supposed to be here", {
            icon: "🧐",
          });
          router.push("/");
          return;
        } else {
          setChecking(false);
        }
      } else {
        toast.error("Please log in");
        router.push("/");
        return;
      }
    })();
  }, [user, secure, isLoading]);

  if (checking) return <div>Checking...</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-5">Admin Page</h1>
      <p>{"If you're an admin, hello!"}</p>
      <p>{"If you're not, then you shouldn't be here 🧐"}</p>
    </div>
  );
}
