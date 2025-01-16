import { FiStar } from "react-icons/fi";

export default function GeneralIndex() {
  return (
    <main className="pt-4 px-4 pb-2 border-b border-[#393a3b]">
      <div className="flex gap-2 items-center w-full pb-2">
        <input
          placeholder="Title "
          className="flex-1 bg-inherit py-2 shadow-custom px-1 focus:ring-2 focus:ring-[#393a3b]"
        />

        <FiStar className="text-[1.5rem]" />
      </div>
      <div></div>
    </main>
  );
}
