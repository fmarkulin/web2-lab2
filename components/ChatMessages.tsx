"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Card, CardContent } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/data/firebase";
import dayjs from "dayjs";
import ChatMessage from "./ChatMessage";
import useSecure from "@/hooks/useSecure";

export default function ChatMessages({ user }: { user: UserProfile }) {
  const { secure } = useSecure();

  const [messages, setMessages] = useState<Message[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          timestamp: dayjs(data.timestamp),
        } as Message;
      });

      const last10Messages = newMessages
        .sort((a, b) => {
          if (a.timestamp.isBefore(b.timestamp)) {
            return -1;
          } else if (a.timestamp.isAfter(b.timestamp)) {
            return 1;
          } else {
            return 0;
          }
        })
        .slice(-20);

      setMessages(last10Messages);
    });

    return () => unsubscribe();
  }, [secure]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="p-2 ">
      <CardContent
        ref={contentRef}
        className="flex h-[350px] flex-col gap-2 p-1 overflow-auto"
      >
        {messages
          .sort((a, b) => {
            if (a.timestamp.isBefore(b.timestamp)) {
              return -1;
            } else if (a.timestamp.isAfter(b.timestamp)) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((message) => (
            <ChatMessage key={message.id} message={message} user={user} />
          ))}
      </CardContent>
    </Card>
  );
}
