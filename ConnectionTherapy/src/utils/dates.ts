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

export function formatJournalDate(date: string): string {
    const dateObj = new Date(`${date}T00:00:00`);
    const options: Intl.DateTimeFormatOptions = {month: 'long', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
}

// Reads a "YYYY-MM-DD" string as a local date; null (no date chosen yet) falls back to today
export function parseDateString(date: string | null): Date {
    if (!date) return new Date();
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}

// Whole days from one "YYYY-MM-DD" date to a later one; rounding absorbs daylight-saving shifts
export function daysBetween(from: string, to: string): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((parseDateString(to).getTime() - parseDateString(from).getTime()) / msPerDay);
}

export function addDays(date: string, days: number): string {
    const result = parseDateString(date);
    result.setDate(result.getDate() + days);
    return formatDate(result);
}
