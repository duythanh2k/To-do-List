import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TaskManagementPage } from "./tasks/task";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchTodos();
  }, [router.isReady]);

  async function fetchTodos() {
    try {
      const res = await axios.get("http://localhost:8000/tasks/done");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="relative flex place-items-center after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[600px]">
        <Image
          className="relative"
          src="/to-do.png"
          alt="Todo Logo"
          width={300}
          height={37}
          priority
        />
      </div>

      <div className="flex justify-between w-52">
        <button className="border bg-red-800">
          <Link href="/register">Sign Up</Link>
        </button>
        <button>
          <Link href="/login">Sign In</Link>
        </button>
      </div>
    </main>
  );
}
