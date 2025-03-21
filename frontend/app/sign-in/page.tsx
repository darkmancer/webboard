"use client";
import { useState } from "react";
import axiosClient from "../axios/axiosClient";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axiosClient.post("/users/sign-in", { username });
      const { access_token, user } = response.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 401) {
        alert("User not found");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex md:flex-row md:justify-between w-full justify-between bg-green-500">
      <div className=" bg-green-500 pl-4 pr-4  pb-[143px] md:pb-[0px] md:flex md:items-center md:mx-auto md:flex-shrink-0 md:w-[384px]">
        <div className="w-full md:max-w-[384px] ">
          <h1 className="text-white text-[28px] font-semibold mb-10">
            Sign in
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-text-secondary"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleSignIn}
            className="mt-4 bg-success w-full md:max-w-[384px] text-white py-2 rounded-md ibmplex-small font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className=" w-full items-center justify-center bg-green-300 rounded-bl-[36px] rounded-br-[36px] md:rounded-br-[0px] pt-[76px] pb-[153px] md:pt-0 md:pb-0 md:flex  md:w-[45%]  md:rounded-tl-[36px] md:rounded-bl-[36px]">
        <div className="text-center   w-full">
          <img
            src="/stationaries.svg"
            alt="Board Illustration"
            className="w-[20vw] max-w-lg min-w-[150px] object-contain mx-auto"
          />
          <p className="text-white italic mt-4 text-center castoro-base-italic">
            a Boarda
          </p>
        </div>
      </div>
    </div>
  );
}
