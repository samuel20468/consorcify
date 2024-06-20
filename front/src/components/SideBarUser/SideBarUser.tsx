"use client";

// Esilos y componentes
import { itemsNavbarUser } from "@/utils/data";
import { ContainerSideBar } from "../ui";

// Hooks
import Link from "next/link";
import { usePathname } from "next/navigation";

// -----------------------

const SideBarUser = () => {
  const pathname = usePathname();

  return (
    <ContainerSideBar>
      <nav className="flex flex-col h-full justify-evenly">
        {itemsNavbarUser.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              href={item.link}
              key={item.id}
              className={`flex flex-col items-center text-xs lg:text-base py-2 ${
                isActive
                  ? "bg-gradient-to-r from-bluee via-slate-200 to-slate-200"
                  : ""
              }`}
            >
              <div>{item.icon}</div>
              <h1>{item.title}</h1>
            </Link>
          );
        })}
      </nav>
    </ContainerSideBar>
  );
};

export default SideBarUser;
