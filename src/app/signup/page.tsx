"use client";
import AuthComp from "@/components/Layout/Auth/AuthComp";
import { useState } from "react";
import { api } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/UserReducer";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signupDeets, setSignupDeets] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      toast.error("Password do not match");
      setSignupDeets({
        ...signupDeets,
        confirmPassword: "",
        password: "",
      });
      return;
    }

    if (
      !signupDeets.email ||
      signupDeets.password.length < 2 ||
      signupDeets.username.length < 2
    ) {
      toast.error("invalid Details");
      setSignupDeets({
        ...signupDeets,
        confirmPassword: "",
        password: "",
      });
      return;
    }

    try {
      setLoading(true);
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
        toast.error("Signup Failed");
        setSignupDeets({
          ...signupDeets,
          confirmPassword: "",
          password: "",
        });
        return;
      }
      const data = await result.json();
      const { responseData, accessToken } = data;

      // Store userId in localStorage
      localStorage.setItem("userId", responseData.id);
      localStorage.setItem("userToken", accessToken);

      if (responseData) {
        toast.success("Signup Successful");
        dispatch(
          setUserInfo({ userId: responseData.id, userToken: accessToken })
        );
        router.replace("/");
      }
    } catch {
      toast.error("Authentication Failed");
      setSignupDeets({
        ...signupDeets,
        confirmPassword: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <AuthComp
        loading={loading}
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
