import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { db } from "@/data/firebase";
import { FormEvent } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function ChatNewMessage({ user }: { user: UserProfile }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !user.email || !user.sub) {
      toast.error("You must be logged in to send a message");
      return;
    }
    const ref = doc(collection(db, "messages"));
    const newMessage: Message = {
      id: ref.id,
      content: e.currentTarget.message.value,
      email: user.email,
      sub: user.sub,
      timestamp: dayjs().toISOString(),
    };
    const addPromise = setDoc(ref, newMessage);
    toast.promise(
      addPromise,
      {
        loading: "Sending message...",
        success: "Message sent!",
        error: "Error sending message",
      },
      {
        position: "bottom-right",
      }
    );
    try {
      await addPromise;
      (document.getElementById("messageBox") as HTMLInputElement)!.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        id="messageBox"
        type="text"
        name="message"
        placeholder="Type your message here..."
      />
      <Button id="messageSubmit" type="submit">
        Send
      </Button>
    </form>
  );
}
