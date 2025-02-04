"use client";
import Image from "next/image";
import Link from "next/link";
import userIcon from "../../../../public/svg/userIcon.svg";
import { FiSidebar, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { PiUserSwitch } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { clearUserInfo } from "@/store/UserReducer";
import { useRouter } from "next/navigation";

gsap.registerPlugin(Flip);

interface ProfileProps {
  showList: boolean;
  handleToggle: () => void;
}

export default function Profile({ showList, handleToggle }: ProfileProps) {
  const router = useRouter();
  useGSAP(
    () => {
      if (showList) {
        const state = Flip.getState("#toggleList");
        // get initial state
        Flip.from(state, {
          targets: "#toggleList",
          duration: 1,
          display: "block",
          scale: true,
        });

        // Trigger additional animations (like opacity)
        gsap.fromTo(
          "#toggleList",
          { opacity: 0 },
          { opacity: 1, duration: 2.5, ease: "elastic.out(1,0.3)" }
        );
      }
    },
    { dependencies: [showList], revertOnUpdate: true }
  );

  async function handleLogout() {
    clearUserInfo();
    router.replace("/login");
  }

  return (
    <main className="px-4 py-2">
      <section className="flex items-center justify-between py-2">
        <div className="flex items-center gap-1">
          <span className="inline-flex size-[36px]">
            <Image
              src={userIcon}
              width={0}
              height={0}
              layout="responsive"
              alt="note"
            />
          </span>
          <p className="mr-4">Emnotes</p>
          <button className="h-max" onClick={handleToggle}>
            {showList ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
        <div>
          <button>
            <FiSidebar />
          </button>
        </div>
      </section>
      {/* hidden section */}
      {showList && (
        <section id="toggleList" className={"shadow-inner pt-2"}>
          <ul>
            <li id="list">
              <button className="flex items-center gap-2 text-xs mb-2">
                <PiUserSwitch />
                <p>Switch Account</p>
              </button>
            </li>
            <li>
              <Link href="" className="flex items-center gap-2 text-xs mb-2">
                <IoSettingsOutline />
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="flex items-center gap-2 text-xs mb-2 border-b border-gray-500 pb-2">
                <FiHelpCircle />
                <p>Help Center</p>
              </Link>
            </li>
            <li className="">
              <button
                className="flex items-center gap-2 text-xs text-[#ef4444]"
                onClick={handleLogout}>
                <FiLogOut />
                <p>Log out</p>
              </button>
            </li>
          </ul>
        </section>
      )}
    </main>
  );
}
