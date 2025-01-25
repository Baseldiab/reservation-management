import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

// constants
import { NavbarMenu } from "@/lib/constants/navbar";

// assets
import MainLogoIcon from "@/components/icons/MainLogoIcon";
import { User as ProfileImg } from "lucide-react";

// hooks
import { useTheme } from "@/hooks/use-theme";

// ui imports
import { Button } from "@/components/ui/button";

// components imports
import BreathAnimation from "@/components/common/breath-animation";
import MenuNavbar from "@/components/navbar/menu-navbar";
import ThemeToggle from "@/components/navbar/theme_toggle";
import LogoutBtn from "@/components/navbar/logout-btn";
import { UserType } from "@/api/enums/enums";
import { User } from "@/api/types/user";

export default function Navbar() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user } = useQuery<User>({
    queryKey: ["user"],
  });

  const navbarMenuArray: NavbarMenu[] = [
    {
      link: "/",
      id: "home",
      text: "Home",
    },
    ...(user?.user_type === UserType.ADMIN
      ? [
          {
            link: "/users",
            id: "users",
            text: "Users",
          },
        ]
      : []),
  ];

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
        {user?.user_type === UserType.ADMIN && (
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
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BreathAnimation>
            <LogoutBtn className="max-lg:hidden" />
          </BreathAnimation>

          <MenuNavbar
            navbarMenuArray={navbarMenuArray}
            className={`lg:hidden`}
          />

          {/* <Avatar className="size-10 !bg-gray-200 dark:!bg-gray-800">
            <AvatarFallback className="text-slate-900 dark:text-white font-semibold text-base"></AvatarFallback>
          </Avatar> */}

          <BreathAnimation>
            <Button
              className={
                "rounded-full p-2 size-10  !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none flex justify-center items-center gap-2 text-slate-900 dark:text-white "
              }
              title="Logout"
              onClick={() => navigate("/profile")}
            >
              <ProfileImg className="size-5 text-slate-900 dark:text-white" />
            </Button>
          </BreathAnimation>
        </div>
      </div>
    </nav>
  );
}
