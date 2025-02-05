"use client";
import { useSelector } from "react-redux";
import Sidebar from "./sidebar";
import { useTask } from "@/store/AddListProvider";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

export default function MainSideBar() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const { openAddListModal } = useTask();
  function handleModal() {
    if (!userId) {
      toast.warn("You are not Logged in");
      return;
    }
    openAddListModal();
  }
  return <Sidebar onClick={handleModal} />;
}
