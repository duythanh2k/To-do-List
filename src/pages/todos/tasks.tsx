import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsFillCheckSquareFill, BsHourglassSplit } from "react-icons/bs";
import { FaTrashAlt, FaUser, FaUserInjured } from "react-icons/fa";

// Define data type
type User = {
  user_id: number;
  username: string;
  password: string;
}
type Task = {
  task_id: number;
  title: string;
  due_date: Date;
  priority: string;
  note: string;
  is_done: boolean;
};

export default function TaskManagementPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mainInput, setMainInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const isNewTaskAdded = useRef(false);

  useEffect(() => {
    if (!router.isReady) return;
    getUser();
    getTasks();
  }, [router.isReady]);

  useEffect(() => {
    if (isNewTaskAdded.current) {
      // Scroll to the bottom only when reload the page or a new task is added
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      isNewTaskAdded.current = false;
    }
  }, [tasks]);

  const getTasks = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setTasks(res.data);
      isNewTaskAdded.current = true;
    } catch (error) { console.error(error); }
  };

  const handleAddTask = async (title: string) => {
    try {
      // Send a POST request to your create todo API with the new todo data
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          title: title,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Upon successful creation, update the todos state variable with the newly created todo
      if (res.status === 201) {
        const newTask = res.data;
        const copy = [...tasks, newTask];
        setTasks(copy);
        isNewTaskAdded.current = true;
      }
    } catch (error) { console.error(error); }
  };

  const handleUpdateTask = async (task_id: number, is_done: boolean) => {
    try {
      // Send a PATCH request to your update todo API with the updated data for a specific todo
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task_id}`, {
          is_done,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Upon successful update, update the todos state variable with the modified todo
      if (res.status === 200) {
        const updatedTask = res.data;
        const updatedTodos = tasks.map((task) =>
          task.task_id === updatedTask.task_id ? updatedTask : task
        );
        setTasks(updatedTodos);
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteTask = async (task_id: number) => {
    try {
      // Send a DELETE request to your delete todo API for a specific todo
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Upon successful deletion, update the todos state variable by removing the deleted todo
      if (res.status === 200) {
        const updatedTodos = tasks.filter((task) => task.task_id !== task_id);
        setTasks(updatedTodos);
      }
    } catch (error) { console.error(error); }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        setProfile(res.data);
      }
    } catch (error) { console.error(error) }
  }


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

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/", undefined, { shallow: true });
  };

  return (
    <div className="flex justify-center align-top relative">
      <div className="flex flex-col w-6/12 h-screen relative">
        {/* Render the list of todos */}
        <div className="scroll absolute flex justify-center w-full top-4 h-5/6 overflow-scroll">
          <ul className="w-11/12">
            {tasks.map((task) => (
              <li key={task.task_id}>
                <div
                  className="flex justify-between bg-slate-200 text-black mb-5 p-3 rounded-md shadow-md shadow-violet-300"
                  ref={scrollRef}
                >
                  <span className="font-bold text-xl w-10/12 pr-1">{task.title}</span>
                  <div className="flex justify-between w-2/12">
                    <button onClick={() =>
                        handleUpdateTask(task.task_id, !task.is_done)
                      }
                    >
                      {task.is_done ? (
                        <BsFillCheckSquareFill className="text-green-700 text-xl" />
                      ) : (
                        <BsHourglassSplit className="text-yellow-600 text-2xl" />
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
        <div className="flex justify-center absolute w-full bottom-4">
          <input
            className="text-lg text-black p-3 rounded-md shadow-inner shadow-violet-950 w-11/12"
            type="text"
            placeholder="What's next?"
            value={mainInput}
            onChange={(evt: any) => handleMainInputChange(evt)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-10">
        <div className="relative cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ?
            <FaUserInjured className="text-4xl" /> : 
            <FaUser className="text-4xl" />
          }
        </div>
        {isVisible && (
          <div className="flex-col w-fit bg-white absolute bottom-0 left-full rounded-md pl-3 pr-3">
            <div className="text-black pt-2 pb-1">{profile?.username}</div>
            <hr />
            <div className="flex justify-start text-red-700 pt-1 pb-2">
              <button onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
