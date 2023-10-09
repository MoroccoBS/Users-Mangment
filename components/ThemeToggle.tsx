"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  const variants = {
    initial: {
      opacity: 0,
      x: "0%",
      y: "-50%",
    },
    animate: {
      opacity: 1,
      x: "-50%",
      y: "-50%",
    },
    exit: {
      opacity: 0,
      x: "-100%",
      y: "-50%",
    },
  };
  return (
    <div
      className="p-6 rounded-full w-max outline outline-2 outline-foreground flex cursor-pointer"
      onClick={handleThemeChange}
    >
      {theme == "light" && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
          }}
          className="absolute m-auto"
        >
          <Sun className="w-full h-full" />
        </motion.div>
      )}

      {theme == "dark" && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
          }}
          className="absolute m-auto -translate-x-1/2 -translate-y-1/2"
        >
          <Moon className="w-full h-ful" />
        </motion.div>
      )}
    </div>
  );
}
