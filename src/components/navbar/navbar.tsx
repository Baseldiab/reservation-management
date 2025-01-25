import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";

// constants
import { navbarMenuArray } from "@/lib/constants/navbar";

// assets
import MainLogoIcon from "@/components/icons/MainLogoIcon";
import { LogOut } from "lucide-react";

// hooks
import { useTheme } from "@/components/provideres/theme-provider";

// ui imports
import { Button } from "../ui/button";

// utils imports
import { secureStorage } from "@/utils/secure-storage";

// components imports
import BreathAnimation from "@/components/common/breath-animation";
import MenuNavbar from "@/components/navbar/menu-navbar";
import ThemeToggle from "@/components/navbar/theme_toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return (
    <nav className="my-4">
      <div className="flex justify-between items-center container py-4 sm:px-8 px-6 bg-theme-background-main dark:bg-theme-background-dark rounded-full  border border-grey-200 dark:border-grey-200">
        <Link to={"/"}>
          {theme === "light" ? (
            <MainLogoIcon fill="#000" className="md:w-48 w-40" />
          ) : (
            <MainLogoIcon fill="#fff" className="md:w-48 w-40" />
          )}
        </Link>

        {/* desktop menu */}
        <ul className="flex justify-end items-end gap-8 text-theme-text-main dark:text-theme-text-dark font-semibold text-base md:text-xl max-lg:hidden">
          {navbarMenuArray.map((item) => (
            <li key={item.id} className="!p-0 !m-0 ">
              <BreathAnimation>
                <NavLink
                  to={item.link}
                  className={clsx(
                    "hover:underline link-hover  uppercase",
                    location.pathname === item.link &&
                      "underline underline-offset-2 text-theme-text-primary dark:text-theme-text-primary"
                  )}
                >
                  {item.text}
                </NavLink>
              </BreathAnimation>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            className="rounded-xl p-2 h-10 w-fit  !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none flex justify-center items-center gap-2 text-slate-900 dark:text-white max-lg:hidden"
            title="Logout"
            onClick={() => {
              secureStorage.remove();
              queryClient.invalidateQueries({ queryKey: ["user"] });
              navigate("/login");
            }}
          >
            <LogOut className="size-5 text-slate-900 dark:text-white" />
            logout
          </Button>

          <MenuNavbar className={`lg:hidden`} />

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
