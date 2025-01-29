"use client";
import AuthComp from "@/components/Layout/Auth/AuthComp";
import { useState } from "react";

export default function Login() {
  const [loginDeets, setLoginDeets] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginDeets((prevDeets) => ({
      ...prevDeets,
      [name]: value,
    }));
  }

  return (
    <main>
      <AuthComp
        email={loginDeets.email}
        username={loginDeets.username}
        password={loginDeets.password}
        confirmPassword={loginDeets.confirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onChange={handleChange}
      />
    </main>
  );
}
