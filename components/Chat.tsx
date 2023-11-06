import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChatMessages from "./ChatMessages";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import ChatNewMessage from "./ChatNewMessage";

export default function Chat({ user }: { user: UserProfile }) {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Chat Box</CardTitle>
        <CardDescription>Last 20 messages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChatMessages user={user} />
      </CardContent>
      <CardFooter>
        <ChatNewMessage user={user} />
      </CardFooter>
    </Card>
  );
}
