const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// You can fill in a day you missed, but not one that hasn't happened; anything else means today
export function resolveCheckInDate(requested: string | undefined, today: string): string {
    if (!requested || !DATE_PATTERN.test(requested) || requested > today) return today;
    return requested;
}
