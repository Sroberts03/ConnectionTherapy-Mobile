export function getFirstName(displayName?: string | null): string {
    if (!displayName) {
        return "User";
    }
    const nameParts = displayName.split(" ");
    return nameParts.length > 0 ? nameParts[0] : displayName;
}