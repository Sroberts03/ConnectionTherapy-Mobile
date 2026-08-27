import { View } from "react-native"
import { HabitCategory } from "../habits.types"
import HabitPillarContainer from "./HabitPillarContainer"

interface HabitAreaProps {
    date: Date
    setError: (error: string) => void
}

export default function HabitArea({ date }: HabitAreaProps) {
    const pillars = [HabitCategory.SPIRITUAL, HabitCategory.PHYSICAL, HabitCategory.SOCIAL, HabitCategory.INTELLECTUAL]
    
    return (
        <View>
            {pillars.map((pillar) => {
                return (
                    <HabitPillarContainer
                        key={pillar}
                        category={pillar}
                        date={date}
                    />
                )
            })}
        </View>
    )
}