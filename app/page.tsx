"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";

export default function Home() {
  const messageRef = useRef<HTMLDivElement>(null);
  const hello = "Hello World";

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
        <div ref={messageRef}></div>
        <div>
          <script>alert(hello)</script>
        </div>
      </div>
    </>
  );
}
