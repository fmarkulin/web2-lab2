"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import useSecure from "@/hooks/useSecure";

export default function ChatMessage({
  message,
  user,
}: {
  message: Message;
  user: UserProfile;
}) {
  const { secure } = useSecure();

  return (
    <Card
      className={`w-3/4 border-primary ${
        message.sub === user.sub ? "self-end" : ""
      }`}
    >
      <CardHeader>
        <CardDescription>{message.email}</CardDescription>
        <CardContent className="p-0 break-words">
          {!secure && (
            <div dangerouslySetInnerHTML={{ __html: message.content }} />
          )}
          {secure && <p>{message.content}</p>}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
