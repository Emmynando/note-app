import clsx from "clsx";
import { navProjects } from "../../constant";
import NavItems from "../sidebar/NavItemsComp";

export default function Projects() {
  return (
    <main className="container">
      <h2 className="text-xs text-white">Projects</h2>
      <div className="pl-2">
        {navProjects.map((item) => (
          <NavItems
            key={item.id}
            text={item.text}
            count={item.count}
            icon={
              <item.icon
                className={clsx(
                  Number(item.id) % 2 === 0 ? "text-[#14AE5C]" : "text-priText"
                )}
              />
            }
          />
        ))}
      </div>
    </main>
  );
}
