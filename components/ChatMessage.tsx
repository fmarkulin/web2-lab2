import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

export default function ChatMessage({
  message,
  user,
}: {
  message: Message;
  user: UserProfile;
}) {
  return (
    <Card
      className={`w-3/4 border-primary ${
        message.sub === user.sub ? "self-end" : ""
      }`}
    >
      <CardHeader>
        <CardDescription>{message.email}</CardDescription>
        <CardContent className="p-0">
          <div dangerouslySetInnerHTML={{ __html: message.content }} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
