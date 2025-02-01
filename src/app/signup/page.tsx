"use client";
import AuthComp from "@/components/Layout/Auth/AuthComp";
import { useState } from "react";
import { api } from "@/utils/baseUrl";

export default function Login() {
  const [signupDeets, setSignupDeets] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignupDeets((prevDeets) => ({
      ...prevDeets,
      [name]: value,
    }));
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (signupDeets.password !== signupDeets.confirmPassword) {
      console.log("Password do not match");
      return;
    }

    if (
      !signupDeets.email ||
      signupDeets.password.length < 2 ||
      signupDeets.username.length < 2
    ) {
      console.log("invalid Details");
      return;
    }

    try {
      const result = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupDeets.email,
          username: signupDeets.username,
          password: signupDeets.password,
        }),
      });
      if (!result.ok) {
        throw new Error("Login Failed");
      }
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <main>
      <AuthComp
        email={signupDeets.email}
        username={signupDeets.username}
        password={signupDeets.password}
        confirmPassword={signupDeets.confirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onChange={handleChange}
        onSubmit={handleSignup}
      />
    </main>
  );
}
