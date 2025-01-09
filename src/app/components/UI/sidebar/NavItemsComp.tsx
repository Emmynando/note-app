import { ReactNode } from "react";

interface NavItemsProps {
  id: string;
  icon: ReactNode;
  text: string;
  count: string;
}

export default function NavItems({ icon, text, count, id }: NavItemsProps) {
  return (
    <div className="flex justify-between py-2">
      <p className="flex items-center gap-2 hover:text-priText text-base">
        {icon}
        {text}
      </p>
      <span className="flex items-center justify-center bg-[#383a3d] p-2 rounded-full size-8">
        {" "}
        {count}
      </span>
    </div>
  );
}
