"use client";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthChanged } from "@/utils/authService";

interface Todo {
  id: string;
  title: string;
  details: string;
  dueDate: string;
  isCompleted: boolean;
}

export default function Todo() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  async function addTodoToFirebase(
    title: string,
    details: string,
    dueDate: string
  ) {
    try {
      const data = await addDoc(collection(db, "todos"), {
        title: title,
        details: details,
        dueDate: dueDate,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("Erro ao adicionar o todo: ", error);
    }
  }

  async function fetchTodosFirestore(): Promise<Todo[]> {
    const collectionTodos = collection(db, "todos");
    const querySnapshot = await getDocs(
      query(collectionTodos, orderBy("createdAt", "desc"))
    );
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      const dataTodo = doc.data();
      //@ts-ignore
      todos.push({ id: doc.id, ...dataTodo });
    });

    return todos;
  }

  async function deleteTodoFirestore(todoId: string) {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      return todoId;
    } catch (error) {
      console.log("Erro ao deletar o todo: ", error);
    }
  }

  const handleCompleteClick = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

      const todoRef = doc(db, "todos", todo.id);
      await updateDoc(todoRef, updatedTodo);

      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? updatedTodo : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Erro ao marcar a tarefa como concluída:", error);
    }
  };

  async function fetchTodos() {
    const todos = await fetchTodosFirestore();
    setTodos(todos);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (isUpdateMode && selectTodo) {
        const updateTodo = {
          title,
          details,
          dueDate,
        };

        const todoRef = doc(db, "todos", selectTodo.id);
        await updateDoc(todoRef, updateTodo);

        setTitle("");
        setDetails("");
        setDueDate("");
        setSelectTodo(null);
        setIsUpdateMode(false);
        alert("Lista de Tarefas atualizadas!");
      } else {
        await addTodoToFirebase(title, details, dueDate);
        setTitle("");
        setDetails("");
        setDueDate("");
        alert("Nova tarefa adicionada!");
      }
    } catch (error) {
      console.error("Erro ao atualizar/adicionar todo:", error);
    }
  };

  const handleUpdateClick = (todo: any) => {
    setTitle(todo.title || "");
    setDetails(todo.details || "");
    setDueDate(todo.dueDate || "");

    setSelectTodo(todo);
    setIsUpdateMode(true);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="flex flex-1 items-center justify-center flex-col md:flex-row min-h-screen">
      <section className="flex-1 flex md:flex-col items-center md:justify-start mx-auto">
        <div className="absolute top-4 left-4">
          <Image src="/image/todo.svg" alt="logo" width={100} height={100} />
        </div>
        <div className="p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white">
          <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
            {isUpdateMode ? "Atualize sua tarefa" : "Criar uma tarefa"}
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Título"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Título
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Descrição da tarefa
              </label>
              <div className="mt-2">
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  autoComplete="off"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Data
              </label>
              <div className="mt-2">
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  autoComplete="off"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700"
              >
                {isUpdateMode ? "Atualizar tarefas" : " Criar uma nova tarefa"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="md:w-1/2 md:max-h-screen overflow-y-auto md:ml-10 mt-20 mx-auto">
        <div className="p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white">
          <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
            Lista de tarefas
          </h2>
          <div className="mt-5 flex justify-around">
            <button
              type="button"
              className={`px-3 py-1 text-sm font-semibold rounded-md ${
                showPending
                  ? "bg-red-500 hover:bg-red-300"
                  : "text-gray-800 bg-gray-300"
              }`}
              onClick={() => {
                setShowPending(true);
                setShowCompleted(false);
              }}
            >
              Tarefas pendentes
            </button>
            <button
              type="button"
              className={`px-3 py-1 text-sm font-semibold rounded-md ${
                showCompleted
                  ? "bg-green-500 hover:bg-green-200"
                  : "text-gray-800 bg-gray-300"
              }`}
              onClick={() => {
                setShowPending(false);
                setShowCompleted(true);
              }}
            >
              Tarefas concluídas
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {todos
              .filter((todo) =>
                showPending
                  ? !todo.isCompleted
                  : showCompleted
                  ? todo.isCompleted
                  : true
              )
              .map((todo) => (
                <div
                  key={todo.id}
                  className={`border p-4 rounded-md shadow-md ${
                    todo.isCompleted ? "bg-green-300" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 break-words">
                    {todo.title}
                  </h3>
                  <p className="text-sm text-gray-500">Data: {todo.dueDate}</p>
                  <p className="text-gray-700 multiline break-words ">
                    {todo.details}
                  </p>
                  <div className="mt-4 flex space-x-6">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                      onClick={() => handleUpdateClick(todo)}
                    >
                      Atualizar tarefa
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md"
                      onClick={async () => {
                        const deletedTodoId = await deleteTodoFirestore(
                          todo.id
                        );
                        if (deletedTodoId) {
                          const updateTodos = todos.filter(
                            (t) => t.id !== deletedTodoId
                          );
                          setTodos(updateTodos);
                        }
                      }}
                    >
                      Deletar tarefa
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-1 text-sm font-semibold text-white ${
                        todo.isCompleted
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-green-500 hover:bg-green-600"
                      } rounded-md`}
                      onClick={() => handleCompleteClick(todo)}
                    >
                      {todo.isCompleted ? "Concluído" : "Marcar como concluído"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
