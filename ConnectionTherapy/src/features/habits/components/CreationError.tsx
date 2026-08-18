import { CreationError } from "../errors/CreationError";
import { Text, View } from "react-native";

interface ErrorMessageProps {
    error: CreationError | null
    place: string
    className?: string
}

export default function CreationErrorMessage({ error, place, className }: ErrorMessageProps) {
    if (!error || error.place !== place) return null
    return (
        <Text className={className}>
            {error.message}
        </Text>
    )
}