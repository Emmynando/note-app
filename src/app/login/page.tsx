"use client";
import Link from "next/link";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { api } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/UserReducer";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginDeets, setLoginDeets] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginDeets((prevDeets) => ({
      ...prevDeets,
      [name]: value,
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loginDeets.email || loginDeets.password.length < 2) {
      toast.error("Invalid Details");
      return;
    }

    // Regular expression to check if input is an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginDeets.email);

    try {
      setLoading(true);
      const result = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Use email if valid, else username
          [isEmail ? "email" : "username"]: loginDeets.email,
          password: loginDeets.password,
        }),
      });
      if (!result.ok) {
        toast.error("Authentcation Failed");
        setLoginDeets({
          email: "",
          password: "",
        });
        return;
      }
      const data = await result.json();
      const { id, accessToken } = data;

      // Store userId in localStorage
      localStorage.setItem("userId", id);
      localStorage.setItem("userToken", accessToken);
      if (id) {
        toast.success("Login Successful");
        dispatch(setUserInfo({ userId: id, userToken: accessToken }));
        router.replace("/");
      }
    } catch (error) {
      toast.error("Server Error");
      setLoginDeets({
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-inherit">
      <section className="h-[95%] w-[35.7rem] rounded-2xl bg-white px-[2.5rem] py-[2rem]">
        <h2 className="mb-[0.5rem] text-center font-golos text-2xl font-semibold text-[#2f3136] mt-[10%]">
          Login Your Account
        </h2>

        <form onSubmit={handleLogin} method="POST">
          <span>
            <label
              htmlFor="email"
              className="text-normal font-sm block leading-[24px] text-[#2f3136] mt-[10%]">
              Username/email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={loginDeets.email}
              onChange={handleChange}
              className="mb-[0.5rem] h-[3rem] w-full rounded-[32px] border 
              border-[#e1e1e1] px-2 pl-4 outline-none text-[#2f3136]"
              required
            />
          </span>

          <span className="relative">
            <label
              htmlFor="password"
              className="text-normal font-sm block leading-[24px] text-[#2f3136]">
              Password
            </label>
            <span className="flex w-full">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginDeets.password}
                onChange={handleChange}
                className="mb-[0.5rem] h-[3rem] text-[#2f3136] w-[95%] rounded-s-[32px] border 
                border-r-0 border-[#e1e1e1] px-2 pl-4 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev: boolean) => !prev)}
                className="h-[3rem] rounded-e-[32px] border-y border-r border-[#e1e1e1] pr-2 text-gray-500">
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </span>
          </span>

          <button
            type="submit"
            className="w-full h-[3rem] rounded-[32px] bg-[#2f3136] 
          py-2 font-golos text-white mt-[20%]">
            {!loading ? "Login" : "Loading"}
          </button>
        </form>
        <p className="mt-1 text-center text-sm text-[#2f3136]">
          New User?{" "}
          <Link href="/signup" className="text-[#00B4FF]">
            SignUp
          </Link>
        </p>
      </section>
    </main>
  );
}

// const refreshAccessToken = async () => {
//   const res = await fetch(`${api}/refresh`, { method: "POST", credentials: "include" });
//   const data = await res.json();
//   if (res.ok) {
//     localStorage.setItem("accessToken", data.accessToken);
//   }
// };

// export const handleLogout = (req: Request, res: Response) => {
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "Strict",
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// };
