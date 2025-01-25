import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
}

export default function NoData({
  icon,
  title,
  className,
  iconClassName,
  titleClassName,
}: Props) {
  return (
    <div
      className={cn(
        "empty__case space-y-6 md:p-28 p-theme-xl bg-theme-main-white",
        className
      )}
    >
      <div className={cn("flex justify-center items-center", iconClassName)}>
        {icon}
      </div>
      <h2
        className={cn(
          "text-center text-theme-inputField-placeholder  sm:text-theme-2xl text-theme-md font-medium capitalize sm:leading-theme-xl leading-theme-lg",
          titleClassName
        )}
      >
        {title}
      </h2>
    </div>
  );
}
