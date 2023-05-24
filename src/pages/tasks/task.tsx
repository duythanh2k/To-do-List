import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const TaskManagementPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    getTasks();
  }, [router.isReady]);

  async function getTasks() {
    try {
      const res = await axios.get("http://localhost:8000/tasks/done");
      const data = res.data;
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {todos.map((todo) => {
        <p>{todo}</p>;
      })}
    </>
  );
};
