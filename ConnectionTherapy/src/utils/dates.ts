export function getToday() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDay = String(today.getDate()).padStart(2, '0');
    return `${todayYear}-${todayMonth}-${todayDay}`;
}

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getStartOfWeek(): string {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day;
    const beginingOfWeek = new Date(today.setDate(diff));
    return formatDate(beginingOfWeek)
}
