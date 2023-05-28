import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsFillCheckSquareFill, BsHourglassSplit } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

export default function TaskManagementPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!router.isReady) return;
    getTasks();
  }, [router.isReady]);

  useEffect(() => {
    // Fetch the todos using your GET API endpoint
    // Set the todos in the state variable
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      // Send a POST request to your create todo API with the new todo data
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          title: title,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Upon successful creation, update the todos state variable with the newly created todo
      if (res.status === 200) {
        const newTask = res.data;
        const copy = [...tasks, newTask];
        setTasks(copy);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (task_id: number, is_done: boolean) => {
    try {
      // Send a PATCH request to your update todo API with the updated data for a specific todo
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task_id}`,
        {
          is_done,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Upon successful update, update the todos state variable with the modified todo
      if (res.status === 200) {
        const updatedTask = res.data;
        const updatedTodos = tasks.map((task: any) =>
          task.task_id === updatedTask.task_id ? updatedTask : task
        );
        setTasks(updatedTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (task_id: number) => {
    try {
      // Send a DELETE request to your delete todo API for a specific todo
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Upon successful deletion, update the todos state variable by removing the deleted todo
      if (res.status === 200) {
        const updatedTodos = tasks.filter(
          (task: any) => task.task_id !== task_id
        );
        setTasks(updatedTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMainInputChange = async (evt: any) => {
    setMainInput(evt.target.value);
  };

  const handleKeyDown = async (evt: any) => {
    if (evt.key === "Enter") {
      if (mainInput.length > 0) {
        handleAddTask(mainInput);
        setMainInput("");
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tasks]);

  return (
    <div className="flex justify-center align-top">
      <div className="flex flex-col w-5/12 h-screen relative">
        {/* Render the list of todos */}
        <div className="scroll absolute w-full top-4 h-5/6 overflow-auto">
          <ul>
            {tasks.map((task: any) => (
              <li key={task.task_id}>
                <div className="flex justify-between bg-slate-200 text-black mb-5 p-3 rounded-md shadow-md shadow-black">
                  <span className="font-bold text-xl">{task.title}</span>
                  <div className="flex justify-between w-2/12">
                    <button
                      onClick={() =>
                        handleUpdateTask(task.task_id, !task.is_done)
                      }
                    >
                      {task.is_done ? (
                        <BsHourglassSplit className="text-yellow-600 text-2xl" />
                      ) : (
                        <BsFillCheckSquareFill className="text-green-700 text-xl" />
                      )}
                    </button>
                    <button onClick={() => handleDeleteTask(task.task_id)}>
                      <FaTrashAlt className="text-red-700 text-xl" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Add todo input and button */}
        <input
          className="text-black p-3 rounded-md shadow-inner shadow-black absolute w-full bottom-4"
          type="text"
          placeholder="What's next?"
          value={mainInput}
          onChange={(evt: any) => handleMainInputChange(evt)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
