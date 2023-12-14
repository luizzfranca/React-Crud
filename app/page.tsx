"use client";

import Image from "next/image";
import logoImage from "../assets/react4.png";
import { FormEvent } from "react";
import { login } from "@/utils/authService";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    try {
      await login(emailInput.value, passwordInput.value);
      router.push("/Todo");
    } catch (error) {
      alert("Ocorreu um erro ao tentar efetuar seu login.");
    }
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <Image
          className="w-full h-full object-cover"
          src={logoImage}
          alt="logo"
        />
      </div>
      <div
        className="bg-gray-800 flex flex-col justify-center"
        //@ts-ignore
        onSubmit={handleLogin}
      >
        <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Entrar
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>E-mail</label>
            <input
              id="email"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Senha</label>
            <input
              id="password"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Lembrar usuário{" "}
            </p>
            <p>Esqueceu a senha?</p>
          </div>
          <button
            type="submit"
            className="font-semibold rounded-lg w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
