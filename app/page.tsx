"use client";
import { useSession } from "next-auth/react";
import UserCard from "@/components/userCard";
import { NextUIProvider } from "@nextui-org/system";
import TextAreaComponent from "@/components/textAreaComponent";
import NoteList from "@/components/noteList";

export default function Home() {
  const session = useSession();

  return (
    <NextUIProvider>
      <main className="min-w-screen h-screen p-16">
        <UserCard session={session} />
        <div className="grid grid-cols-2 gap-4 my-4 h-full">
          <div className="space-y-4 bg-background/30 border-white/20 border-1 rounded-large p-4 overflow-x-scroll">
            <NoteList />
          </div>
          <TextAreaComponent />
        </div>
        <div className="absolute flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      </main>
    </NextUIProvider>
  );
}
