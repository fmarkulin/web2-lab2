"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const { user, isLoading, error } = useUser();
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && user) {
      document.cookie = `sub=${user.sub}; path=/;`;
    } else {
      document.cookie = `sub=; path=/;`;
    }
  }, [user, isLoading]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement;
    if (messageRef.current) {
      messageRef.current.innerHTML = input.value;
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-5">Public Chat Room</h1>
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Enter your message" />
          <Button type="submit">Submit</Button>
        </form>
        <div id="message" ref={messageRef}></div>
      </div>
    </>
  );
}
