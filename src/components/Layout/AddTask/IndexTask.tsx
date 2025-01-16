import General from "./General";
import TaskHeader from "./TaskHeader";

export default function IndexTask() {
  return (
    <main
      className="absolute z-50 flex items-center justify-center w-[100%] h-dvh 
    top-0 overflow-hidden bg-bgBlur">
      <div className="h-3/4 w-4/5 bg-[#1e1e20] rounded-md border border-[#393a3b]">
        <TaskHeader />
        <General />
      </div>
    </main>
  );
}
