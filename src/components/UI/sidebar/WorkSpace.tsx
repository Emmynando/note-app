import { navWorkspace } from "../../../../components/constant";
import NavItems from "../../../../components/UI/sidebar/NavItemsComp";

export default function WorkSpace() {
  return (
    <main className="container">
      <h2 className="text-xs text-white">Workspace</h2>
      <div className="pl-2">
        {navWorkspace.map((item) => (
          <NavItems
            key={item.id}
            text={item.text}
            count={item.count}
            icon={<item.icon />}
          />
        ))}
      </div>
    </main>
  );
}
