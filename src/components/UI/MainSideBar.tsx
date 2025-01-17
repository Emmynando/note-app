"use client";
import Sidebar from "./sidebar";
import { useTask } from "@/store/AddListProvider";

export default function MainSideBar() {
  const { openAddListModal } = useTask();
  return <Sidebar onClick={openAddListModal} />;
}
