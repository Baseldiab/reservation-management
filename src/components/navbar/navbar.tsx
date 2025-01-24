import { Link } from "react-router-dom";

// components
import ThemeToggle from "@/components/navbar/theme_toggle";

// assets
import MainLogoIcon from "@/components/icons/MainLogoIcon";

// hooks
import { useTheme } from "@/components/provideres/theme-provider";

export default function Navbar() {
  const { theme } = useTheme();
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

        <ThemeToggle />
      </div>
    </nav>
  );
}
