import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "@/components/provideres/theme-provider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      animate={{
        rotate: theme === "dark" ? 180 : 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      className="rounded-full p-2 size-10 !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none"
    >
      <motion.div
        initial={false}
        className="relative w-full h-full !border-none"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? (
          <Sun
            className={`absolute inset-0 h-full w-full transition-all  text-yellow-500`}
          />
        ) : (
          <Moon
            className={`absolute inset-0 h-full w-full transition-all  text-slate-900 dark:text-white`}
          />
        )}
      </motion.div>
    </motion.button>
  );
}
