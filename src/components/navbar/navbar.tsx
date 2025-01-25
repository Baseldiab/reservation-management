import { Link, useNavigate } from "react-router-dom";

// components
import ThemeToggle from "@/components/navbar/theme_toggle";

// assets
import MainLogoIcon from "@/components/icons/MainLogoIcon";

// hooks
import { useTheme } from "@/components/provideres/theme-provider";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { secureStorage } from "@/utils/secure-storage";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const { theme } = useTheme();
  const navigate = useNavigate();
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
        {/* <ul className="flex justify-end items-end gap-8 text-theme-text-main dark:text-theme-text-dark font-bold text-base md:text-xl max-lg:hidden">
          {navbarMenuArray.map((item) => (
            <li key={item.id} className="!p-0 !m-0 ">
              <BreathAnimation>
                <Link
                  href={item.link}
                  onClick={() => setActiveSection(item.id)}
                  className={clsx(
                    "hover:underline link-hover  uppercase",
                    activeSection === item.id &&
                      "text-accent text-gradient dark:text-gradient"
                  )}
                >
                  {t(item.text)}
                </Link>
              </BreathAnimation>
            </li>
          ))}
        </ul> */}

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            className="rounded-xl p-2 h-10 w-fit  !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none flex justify-center items-center gap-2 text-slate-900 dark:text-white"
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

          {/* <MenuNavbar  className={`lg:hidden`} /> */}
        </div>
      </div>
    </nav>
  );
}
