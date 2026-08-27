interface DateInputStyle {
    mainButtonClass: string;
    calendarIconColor: string;
    dateTextClass: string;
    chevron: "chevron-up" | "chevron-down";
    chevronIconColor: string;
}

export function getDateInputStyle(showDatePicker: boolean): DateInputStyle {
    if (showDatePicker) {
        return {
            mainButtonClass: "flex-row items-center justify-between bg-neutral-50 border 'border-teal-500' rounded-2xl px-4 py-4",
            calendarIconColor: "#14b8a6",
            dateTextClass: "text-base font-medium ml-3 text-teal-700",
            chevron: "chevron-up" ,
            chevronIconColor: "#14b8a6"
        };
    } else {
        return {
            mainButtonClass: "flex-row items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4",
            calendarIconColor: "#9ca3af",
            dateTextClass: "text-base font-medium ml-3 text-neutral-700",
            chevron: "chevron-down",
            chevronIconColor: "#9ca3af"
        };
    }
}
