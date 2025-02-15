import { FiStar } from "react-icons/fi";
import TextEditor from "./TextEditor";

export default function GeneralIndex({
  taskTitle,
  setTaskTitle,
  taskbody,
  setTaskBody,
}) {
  return (
    <main className="pt-4 px-4 pb-2 ">
      <div className="flex gap-2 items-center w-full pb-2 border-b border-[#393a3b]">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 bg-inherit py-2 shadow-custom px-1 focus:ring-2 focus:ring-transparent
           outline-none placeholder:text-2xl placeholder:text-fadeWhite"
          required
        />

        <FiStar className="text-[1.5rem]" />
      </div>
      <div className="pt-4">
        <p>Note</p>
        <TextEditor taskbody={taskbody} setTaskBody={setTaskBody} />
      </div>
    </main>
  );
}
