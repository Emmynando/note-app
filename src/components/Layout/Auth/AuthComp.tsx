"use client";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

interface AuthProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthComp({
  email,
  username,
  password,
  confirmPassword,
  showPassword,
  setShowPassword,
  onChange,
  onSubmit,
}: AuthProps) {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-inherit">
      <section
        className="h-[95%] w-[35.7rem] rounded-2xl bg-white px-[2.5rem] py-[2rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <h2 className="mb-[0.5rem] text-center font-golos text-2xl font-semibold text-[#2f3136]">
          Create Your Account
        </h2>

        <form onSubmit={onSubmit} method="POST">
          <span>
            <label className="text-normal font-sm block leading-[24px] text-secFade">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="mb-[0.5rem] h-[3rem] w-full rounded-[32px] border 
              border-[#e1e1e1] px-2 pl-4 outline-none text-[#2f3136]"
            />
          </span>
          <span>
            <label className="text-normal font-sm block leading-[24px] text-secFade">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="mb-[0.5rem] h-[3rem] text-[#2f3136] w-full rounded-[32px] 
              border border-[#e1e1e1] px-2 pl-4 outline-none"
            />
          </span>

          <span className="relative">
            <label className="text-normal font-sm block leading-[24px] text-secFade">
              Password
            </label>
            <span className="flex w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                className="mb-[0.5rem] h-[3rem] text-[#2f3136] w-[95%] rounded-s-[32px] border 
                border-r-0 border-[#e1e1e1] px-2 pl-4 outline-none"
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

          <span className="relative">
            <label className="text-normal font-sm block leading-[24px] text-secFade">
              Confirm Password
            </label>
            <span className="flex w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                className="mb-[0.5rem] h-[3rem] w-[95%] text-[#2f3136] rounded-s-[32px]
                 border border-r-0 border-[#e1e1e1] px-2 pl-4 outline-none"
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
            className="w-full h-[3rem] rounded-[32px] bg-[#2f3136] py-2 font-golos text-white mb-auto"
            type="submit">
            Create Your Account
          </button>
        </form>
        {/* <p className="mt-1 text-center text-sm ">
          Already have an account?{" "}
          <Link href="" className="text-[#00B4FF]">
            Login
          </Link>
        </p> */}
      </section>
    </main>
  );
}
