import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row sm:space-x-8  ",
        month: "space-y-6 w-full ",
        caption: "flex items-center justify-between w-full px-4", // Use flex for alignment
        caption_label: "text-lg font-semibold", // Center and style label
        nav: "flex items-center space-x-2", // Ensure navigation buttons are inline
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-0 flex items-center justify-center opacity-70 hover:opacity-100" // Size and alignment
        ),
        table: "w-full border-collapse space-y-2",
        head_row: "flex justify-around",
        head_cell:
          "text-neutral-500 rounded-md w-full font-medium text-sm dark:text-neutral-400 text-center",
        row: "flex justify-around w-full",
        cell: cn(
          "relative p-1 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-200 [&:has([aria-selected].day-outside)]:bg-neutral-200/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-700 dark:[&:has([aria-selected].day-outside)]:bg-neutral-700/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-medium aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#ff593f] text-white hover:bg-[#ff593f] hover:text-white focus:bg-[#ff593f] focus:text-white", // Updated background color
        day_today:
          "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-600",
        day_outside:
          "day-outside text-neutral-500 aria-selected:bg-neutral-200/50 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:bg-neutral-700/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-200 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-700 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      disabled={[
        { before: new Date() }, // Disable past dates
        (day) => day.getDay() === 5, // Disable Fridays (getDay() === 5)
      ]}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} /> // Adjust size
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} /> // Adjust size
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
