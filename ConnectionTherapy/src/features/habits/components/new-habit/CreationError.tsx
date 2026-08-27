import { Text } from "react-native";
import { CreationError } from "../../errors/CreationError";

interface ErrorMessageProps {
    error: CreationError | null
    place: string
    className?: string
}

export default function CreationErrorMessage({ error, place, className }: ErrorMessageProps) {
    if (!error || error.place !== place) return null
    return (
        <Text className={className ? className : "text-red-500 text-xs font-medium mb-2"}>
            {error.message}
        </Text>
    )
}