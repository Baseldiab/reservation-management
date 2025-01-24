// lib
import { cn } from "@/lib/utils";

import { BeatLoader } from "react-spinners";

interface LoadingProps {
  // rest?: React.ReactNode;
  className?: string;
}
function Loading({ className = "" }: LoadingProps) {
  return (
    <section
      className={cn(
        "text-center items-center h-screen flex justify-center ",
        className
      )}
    >
      <BeatLoader color="#3394d0" size={10} />
    </section>
  );
}

export default Loading;
