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
            mainButtonClass: "flex-row items-center justify-between bg-neutral-50 border border-primary-500 rounded-2xl px-4 py-4",
            calendarIconColor: "#5f7a61",
            dateTextClass: "text-base font-medium ml-3 text-primary-700",
            chevron: "chevron-up" ,
            chevronIconColor: "#5f7a61"
        };
    } else {
        return {
            mainButtonClass: "flex-row items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4",
            calendarIconColor: "#7d756b",
            dateTextClass: "text-base font-medium ml-3 text-neutral-700",
            chevron: "chevron-down",
            chevronIconColor: "#7d756b"
        };
    }
}
