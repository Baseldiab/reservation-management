import { cn } from "@/lib/utils";
import { Button } from "../button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NumberedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRTL?: boolean;
}

export const NumberedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isRTL = false,
}: NumberedPaginationProps) => {
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div
      className={cn("flex gap-2 items-center", isRTL && "flex-row-reverse")}
      dir='ltr'
    >
      <Button
        variant='outline'
        size='icon'
        className='h-10 w-10 rounded-lg'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PrevIcon className='h-4 w-4' />
      </Button>

      {getPageNumbers().map((pageNumber, idx) => (
        <Button
          key={idx}
          variant={pageNumber === currentPage ? "default" : "outline"}
          size='icon'
          className={cn(
            "h-10 w-10 rounded-lg",
            pageNumber === currentPage && "bg-theme-main-primary text-white",
            pageNumber === "..." && "cursor-default hover:bg-transparent"
          )}
          onClick={() => {
            if (typeof pageNumber === "number") {
              onPageChange(pageNumber);
            }
          }}
          disabled={pageNumber === "..."}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant='outline'
        size='icon'
        className='h-10 w-10 rounded-lg'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextIcon className='h-4 w-4' />
      </Button>
    </div>
  );
};
