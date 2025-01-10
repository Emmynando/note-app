import { FiPlus } from "react-icons/fi";
import { navCalander } from "../constant";
import NavItems from "../UI/sidebar/NavItemsComp";
import { FiSearch } from "react-icons/fi";

export default function AddTask() {
  return (
    <main className="container border-b border-gray-500">
      <button className="flex items-center gap-4 text-priText text-2xl my-4">
        <FiPlus /> Add Task
      </button>
      <div className="relative w-full max-w-md mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-10 py-2 rounded-md bg-secClr
          focus:outline-none shadow-custom"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FiSearch />
        </button>
      </div>

      {navCalander.map((item) => (
        <NavItems
          key={item.id}
          text={item.text}
          count={item.count}
          icon={<item.icon />}
        />
      ))}
    </main>
  );
}
