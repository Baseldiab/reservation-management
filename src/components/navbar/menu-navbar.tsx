// react
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// utils

// framer-motion imports
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

// lib
import { cn } from "@/lib/utils";

// hooks
import { useDimensions } from "@/hooks/use-dimensions";

// constants
import { NavbarMenu, navbarMenuArray } from "@/lib/constants/navbar";

// icons

//components
import LogoutBtn from "@/components/navbar/logout-btn";

interface MenuNavbarProps {
  className?: string;
}

export default function MenuNavbar({ className }: MenuNavbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  // state
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sidebarVariants = {
    open: {
      x: 0,
      y: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 100,
      },
    },
    closed: {
      x: "100%",
      y: "-100%",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <div className={cn("", className)}>
      {" "}
      {/* Only show on mobile */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="relative"
      >
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-theme-background-dark/50 dark:bg-theme-background-dark/90 z-40"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
          />
        )}
        <motion.div
          className={cn(
            "fixed end-0 top-0 h-full w-[300px] bg-white dark:bg-black border-l z-50 shadow-xl"
          )}
          dir={"ltr"}
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <Navigation
            items={navbarMenuArray}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </motion.div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 p-2"
        >
          <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <Path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <Path
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </svg>
        </button>
      </motion.nav>
    </div>
  );
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({
  items,
  activeSection,
  setActiveSection,
}: {
  items: NavbarMenu[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  // Memoize the navigation items to prevent unnecessary re-renders
  const memoizedItems = React.useMemo(() => items, [items]);

  return (
    <motion.ul className="pt-20 px-6" variants={navVariants}>
      {memoizedItems.map((item) => (
        <MenuItem
          key={item.id}
          activeSection={activeSection}
          onClick={() => setActiveSection(item.id)}
          item={item}
          label={item.text}
        />
      ))}

      <motion.li
        style={listItem}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-4 font-bold text-base md:text-xl"
      >
        <LogoutBtn className="rounded-xl p-2 h-10 w-full  !bg-gray-200 dark:!bg-gray-800 !border-none focus:outline-none flex justify-center items-center gap-2 text-slate-900 dark:text-white font-bold text-base md:text-xl" />
      </motion.li>
    </motion.ul>
  );
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({
  item,
  label,
  activeSection,
  onClick,
}: {
  item: NavbarMenu;
  label: string;
  activeSection: string;
  onClick: () => void;
}) => {
  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mb-4 font-bold text-base md:text-xl"
    >
      <Link
        to={item.link}
        onClick={onClick}
        className={cn(
          "hover:underline link-hover  uppercase",
          activeSection === item.id &&
            "text-accent text-gradient dark:text-gradient"
        )}
      >
        {label}
      </Link>
    </motion.li>
  );
};

const backdropVariants = {
  open: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
      delay: 2,
    },
  },
  closed: {
    opacity: 1,
    transition: {
      restDelta: 2,
      delay: 2,
      type: "spring",
      stiffness: 20,
      //   damping: 20,
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

/**
 * ==============   Styles   ================
 */

const listItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 0,
  margin: 0,
  listStyle: "none",
  marginBottom: 20,
  cursor: "pointer",
};

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
