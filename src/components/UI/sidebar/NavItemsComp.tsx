import { ReactNode } from "react";
import Link from "next/link";

interface NavItemsProps {
  icon: ReactNode;
  text: string;
  count: string;
  href?: string;
}

export default function NavItems({ icon, text, count, href }: NavItemsProps) {
  return (
    <div className="flex justify-between items-center py-2">
      {href ? (
        // Render a Link if href exists
        <Link
          href={href}
          className="flex items-center gap-2 hover:text-priText text-base">
          {icon}
          <span>{text}</span>
        </Link>
      ) : (
        // Render a button if href does not exist
        <button className="flex items-center gap-2 hover:text-priText text-base">
          {icon}
          <span>{text}</span>
        </button>
      )}

      {/* Display the count */}
      <span className="flex items-center justify-center bg-[#383a3d] p-2 rounded-full w-8 h-8 text-center">
        {count}
      </span>
    </div>
  );
}
